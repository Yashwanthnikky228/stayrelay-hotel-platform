/** Canonical types shared by the web client and Node API. */
export type EntityId = string;
export type ISODate = string;
export type ISODateTime = string;
export type CurrencyCode = 'INR' | 'USD';

export interface Money {
  /** Integer minor units (paise for INR and cents for USD). */
  amountMinor: number;
  currency: CurrencyCode;
}

export type InventoryDecision = 'under_review' | 'eligible' | 'ineligible' | 'unknown';
export type RiskDecision = 'pending' | 'approved' | 'paused' | 'declined';
export type TransferRoute =
  | 'lead_guest_replacement'
  | 'ota_guest_amendment'
  | 'authorised_additional_guest'
  | 'property_approved_substitution'
  | 'group_block_substitution'
  | 'partner_api_transfer'
  | 'none';

export interface PropertyMedia {
  id: EntityId;
  url: string;
  alt: string;
  aspectRatio: '4:3' | '16:10' | '1:1';
}

export interface Property {
  id: EntityId;
  name: string;
  destination: string;
  timezone: string;
  summary: string;
  media: PropertyMedia[];
  amenities: string[];
  inventoryDecision: InventoryDecision;
  policyReviewedAt?: ISODateTime;
}

export interface UnitEconomicsPreview {
  /** The seller's requested amount before StayRelay fees. */
  sellerRequested: Money;
  buyerMarketplaceFee: Money;
  sellerMarketplaceFee: Money;
  paymentProcessingEstimate: Money;
  riskReserveAllocation: Money;
}

interface PropertyOfferBase {
  id: EntityId;
  property: Property;
  guestCapacity: number;
  buyerTotal: Money;
}

/** Server-returned offer. Contains buyer-facing quote data only. */
export interface PropertyOffer extends PropertyOfferBase {
  isPreview: false;
}

/** Design-only fixture. Never accepted from the API or offered for purchase. */
export interface PreviewPropertyOffer extends PropertyOfferBase {
  isPreview: true;
  unitEconomicsPreview: UnitEconomicsPreview;
}

export type MarketplaceOffer = PropertyOffer | PreviewPropertyOffer;

export interface PropertySearchFilters {
  destination: string;
  checkIn: ISODate;
  checkOut: ISODate;
  guests: number;
  maxBuyerTotal?: Money;
}

export interface PropertySearchResponse {
  offers: PropertyOffer[];
  /** Opaque server-side cursor; never infer inventory count from partial pages. */
  nextCursor?: string;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    requestId?: string;
  };
}

export interface StayDates {
  checkIn: ISODate;
  checkOut: ISODate;
}

export interface Booking {
  id: EntityId;
  propertyId: EntityId;
  sellerId: EntityId;
  dates: StayDates;
  guestCount: number;
  roomDescription: string;
  buyerTotal?: Money;
  sellerPayout?: Money;
  eligibility: InventoryDecision;
  risk: RiskDecision;
  paymentStatus:
    | 'not_started'
    | 'confirmation_pending'
    | 'authorized'
    | 'captured'
    | 'refund_initiated'
    | 'refund_completed'
    | 'failed';
  transferStatus: 'not_started' | 'in_progress' | 'confirmed' | 'could_not_be_completed';
  arrivalStatus: 'not_ready' | 'ready_for_arrival' | 'checked_in' | 'not_checked_in';
  transferRoute: TransferRoute;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type UserRole = 'guest' | 'seller' | 'operator' | 'admin';
export interface User {
  id: EntityId;
  email: string;
  displayName: string;
  roles: UserRole[];
  emailVerifiedAt?: ISODateTime;
  createdAt: ISODateTime;
}

export interface SyntheticAccount {
  id: EntityId;
  email: string;
  displayName: string;
  createdAt: ISODateTime;
}

export interface SellerReservationDraft {
  id: EntityId;
  ownerId: EntityId;
  hotelName: string;
  city: string;
  checkIn: ISODate;
  checkOut: ISODate;
  guestCount: number;
  status: 'draft';
  synthetic: true;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export type PassportStatus =
  | 'under_review'
  | 'more_information_needed'
  | 'eligible_for_transfer'
  | 'transfer_in_progress'
  | 'transfer_confirmed'
  | 'ready_for_arrival'
  | 'checked_in'
  | 'transfer_could_not_be_completed'
  | 'payment_confirmation_pending'
  | 'refund_initiated'
  | 'refund_completed';

/** Customer-facing projection of server-authoritative reservation states. */
export interface ReservationPassport {
  id: EntityId;
  bookingId: EntityId;
  ownerId: EntityId;
  status: PassportStatus;
  version: number;
  statusUpdatedAt: ISODateTime;
  nextAction?: {
    label: string;
    owner: 'guest' | 'seller' | 'stayrelay_operations' | 'payment_provider';
    dueAt?: ISODateTime;
  };
  reservationReferenceMasked?: string;
  arrivalGuideAvailable: boolean;
}
