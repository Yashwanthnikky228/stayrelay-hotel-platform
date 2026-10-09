import type {
  PropertyOffer,
  PropertySearchFilters,
  PropertySearchResponse,
} from '@stayrelay/domain';

export type ApiErrorCode =
  | 'ABORTED'
  | 'NETWORK_ERROR'
  | 'TIMEOUT'
  | 'INVENTORY_NOT_CONFIGURED'
  | 'HTTP_ERROR'
  | 'INVALID_RESPONSE';

export class ApiError extends Error {
  readonly code: ApiErrorCode;
  readonly status?: number;
  readonly retryable: boolean;

  constructor(message: string, options: { code: ApiErrorCode; status?: number; retryable?: boolean }) {
    super(message);
    this.name = 'ApiError';
    this.code = options.code;
    this.status = options.status;
    this.retryable = options.retryable ?? false;
  }
}

function isMoney(value: unknown): value is { amountMinor: number; currency: 'INR' | 'USD' } {
  if (!value || typeof value !== 'object') return false;
  const money = value as Record<string, unknown>;
  return Number.isSafeInteger(money.amountMinor) && Number(money.amountMinor) >= 0
    && (money.currency === 'INR' || money.currency === 'USD');
}

function isPropertyMedia(value: unknown): boolean {
  if (!value || typeof value !== 'object') return false;
  const media = value as Record<string, unknown>;
  const safeUrl = typeof media.url === 'string'
    && ((media.url.startsWith('/') && !media.url.startsWith('//')) || (() => {
      try { return new URL(media.url).protocol === 'https:'; } catch { return false; }
    })());
  return typeof media.id === 'string'
    && safeUrl
    && typeof media.alt === 'string'
    && ['4:3', '16:10', '1:1'].includes(String(media.aspectRatio));
}

function isPropertyOffer(value: unknown): value is PropertyOffer {
  if (!value || typeof value !== 'object') return false;
  const offer = value as Record<string, unknown>;
  if (typeof offer.id !== 'string' || !Number.isInteger(offer.guestCapacity) || Number(offer.guestCapacity) < 1 || !isMoney(offer.buyerTotal)) return false;
  if (typeof offer.isPreview !== 'boolean' || !offer.property || typeof offer.property !== 'object') return false;

  const property = offer.property as Record<string, unknown>;
  if (
    typeof property.id !== 'string'
    || typeof property.name !== 'string'
    || typeof property.destination !== 'string'
    || typeof property.timezone !== 'string'
    || typeof property.summary !== 'string'
    || !Array.isArray(property.media)
    || !property.media.every(isPropertyMedia)
    || !Array.isArray(property.amenities)
    || !property.amenities.every((amenity) => typeof amenity === 'string')
    || !['under_review', 'eligible', 'ineligible', 'unknown'].includes(String(property.inventoryDecision))
  ) return false;

  if (!offer.isPreview) {
    // Internal seller fees, payment costs and reserve assumptions must never be sent to guest clients.
    return offer.unitEconomicsPreview === undefined;
  }
  if (!offer.unitEconomicsPreview || typeof offer.unitEconomicsPreview !== 'object') return false;
  const economics = offer.unitEconomicsPreview as Record<string, unknown>;
  const amounts = ['sellerRequested', 'buyerMarketplaceFee', 'sellerMarketplaceFee', 'paymentProcessingEstimate', 'riskReserveAllocation']
    .map((key) => economics[key]);
  if (!amounts.every(isMoney)) return false;
  const moneyAmounts = amounts as Array<{ amountMinor: number; currency: 'INR' | 'USD' }>;
  return moneyAmounts.every((amount) => amount.currency === offer.buyerTotal.currency)
    && offer.buyerTotal.amountMinor === (moneyAmounts[0].amountMinor + moneyAmounts[1].amountMinor);
}

export function isPropertySearchResponse(value: unknown): value is PropertySearchResponse {
  if (!value || typeof value !== 'object') return false;
  const result = value as Record<string, unknown>;
  return Array.isArray(result.offers) && result.offers.every(isPropertyOffer)
    && (result.nextCursor === undefined || typeof result.nextCursor === 'string');
}

function searchQuery(filters: PropertySearchFilters): string {
  const query = new URLSearchParams({
    destination: filters.destination.trim(),
    checkIn: filters.checkIn,
    checkOut: filters.checkOut,
    guests: String(filters.guests),
  });
  if (filters.maxBuyerTotal) {
    query.set('maxAmountMinor', String(filters.maxBuyerTotal.amountMinor));
    query.set('currency', filters.maxBuyerTotal.currency);
  }
  return query.toString();
}

export async function searchPropertyOffers(
  filters: PropertySearchFilters,
  signal?: AbortSignal,
): Promise<PropertyOffer[]> {
  let response: Response;
  try {
    const timeoutSignal = AbortSignal.timeout(10_000);
    response = await fetch(`/api/properties?${searchQuery(filters)}`, {
      headers: { Accept: 'application/json' },
      signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('The search was cancelled.', { code: 'ABORTED' });
    }
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new ApiError('The search took too long. Please try again.', { code: 'TIMEOUT', retryable: true });
    }
    throw new ApiError('Stay search is temporarily unavailable.', { code: 'NETWORK_ERROR', retryable: true });
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError('The StayRelay service returned an unreadable response.', {
      code: 'INVALID_RESPONSE',
      status: response.status,
      retryable: response.status >= 500,
    });
  }

  if (!response.ok) {
    const body = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
    const bodyError = body.error && typeof body.error === 'object' ? body.error as Record<string, unknown> : {};
    const code = bodyError.code === 'INVENTORY_NOT_CONFIGURED' ? 'INVENTORY_NOT_CONFIGURED' : 'HTTP_ERROR';
    const message = typeof bodyError.message === 'string' ? bodyError.message : 'Stay search is temporarily unavailable.';
    throw new ApiError(message, { code, status: response.status, retryable: response.status >= 500 });
  }

  if (!isPropertySearchResponse(payload)) {
    throw new ApiError('The StayRelay service returned data in an unexpected format.', {
      code: 'INVALID_RESPONSE',
      status: response.status,
    });
  }

  // Only server-confirmed eligible inventory may be presented as marketplace results.
  return payload.offers.filter((offer) => !offer.isPreview && offer.property.inventoryDecision === 'eligible');
}
