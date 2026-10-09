import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';
import type { MarketplaceOffer, PropertyOffer, PropertySearchFilters } from '@stayrelay/domain';
import { EconomicsBreakdown } from '../components/marketplace/EconomicsBreakdown';
import { PropertyCard } from '../components/marketplace/PropertyCard';
import { SearchFilters, type MarketplaceSearchValues } from '../components/marketplace/SearchFilters';
import { previewOffers } from '../data/previewOffers';
import { ApiError, searchPropertyOffers } from '../services/marketplace';

const initialValues: MarketplaceSearchValues = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: 2,
  maxTotal: '',
};

function valuesFromUrl(params: URLSearchParams): MarketplaceSearchValues {
  const parsedGuests = Number(params.get('guests'));
  return {
    destination: params.get('destination') ?? '',
    checkIn: params.get('checkIn') ?? '',
    checkOut: params.get('checkOut') ?? '',
    guests: Number.isInteger(parsedGuests) && parsedGuests >= 1 && parsedGuests <= 6 ? parsedGuests : 2,
    maxTotal: params.get('maxTotal') ?? '',
  };
}

type SearchState = 'idle' | 'loading' | 'success' | 'error';

function toFilters(value: MarketplaceSearchValues): PropertySearchFilters {
  const destination = value.destination.trim();
  const checkIn = value.checkIn;
  const checkOut = value.checkOut;
  if (!checkIn || !checkOut) throw new Error('Choose both check-in and check-out dates.');
  const isValidDate = (date: string) => /^\d{4}-\d{2}-\d{2}$/.test(date)
    && !Number.isNaN(Date.parse(`${date}T00:00:00Z`))
    && new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date;
  if (!isValidDate(checkIn) || !isValidDate(checkOut)) throw new Error('Enter valid check-in and check-out dates.');
  if (checkOut <= checkIn) throw new Error('Check-out must be after check-in.');
  if (!Number.isInteger(value.guests) || value.guests < 1 || value.guests > 6) throw new Error('Choose between one and six guests.');
  if (destination.length > 100) throw new Error('Destination must be 100 characters or fewer.');

  const maxTotalText = value.maxTotal.trim();
  let maxBuyerTotal: PropertySearchFilters['maxBuyerTotal'];
  if (maxTotalText) {
    const amount = Number(maxTotalText.replaceAll(',', ''));
    if (!Number.isFinite(amount) || amount <= 0 || amount > Number.MAX_SAFE_INTEGER / 100) {
      throw new Error('Enter a valid maximum total greater than zero.');
    }
    maxBuyerTotal = { amountMinor: Math.round(amount * 100), currency: 'INR' };
  }

  return {
    destination,
    checkIn,
    checkOut,
    guests: value.guests,
    ...(maxBuyerTotal ? { maxBuyerTotal } : {}),
  };
}

export function MarketplacePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<MarketplaceSearchValues>(() => valuesFromUrl(searchParams));
  const [fieldError, setFieldError] = useState<string>();
  const [searchMessage, setSearchMessage] = useState<string>();
  const [searchState, setSearchState] = useState<SearchState>('idle');
  const [serverOffers, setServerOffers] = useState<PropertyOffer[] | null>(null);
  const [selectedOfferId, setSelectedOfferId] = useState<string>(previewOffers[0]?.id ?? '');
  const searchController = useRef<AbortController | null>(null);
  const searchFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => () => searchController.current?.abort(), []);

  const runSearch = useCallback(async (searchFilters: PropertySearchFilters) => {
    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;
    setFieldError(undefined);
    setSearchMessage(undefined);
    setSearchState('loading');
    setServerOffers(null);

    try {
      const offers = await searchPropertyOffers(searchFilters, controller.signal);
      setServerOffers(offers);
      setSearchState('success');
      setSearchMessage(offers.length === 0
        ? 'No eligible stays were returned for these exact dates and filters.'
        : `${offers.length} eligible ${offers.length === 1 ? 'stay' : 'stays'} returned for your exact dates.`);
      setSelectedOfferId(offers[0]?.id ?? '');
    } catch (error) {
      if (error instanceof ApiError && error.code === 'ABORTED') return;
      setSearchState('error');
      setServerOffers(null);
      setSelectedOfferId(previewOffers[0]?.id ?? '');
      setSearchMessage(error instanceof ApiError && error.code === 'INVENTORY_NOT_CONFIGURED'
        ? 'Live inventory is not connected yet. The sample cards below are design examples only.'
        : 'We could not reach verified inventory. The sample cards below are design examples only. Please retry your search later.');
    } finally {
      if (!controller.signal.aborted) setSearchState((state) => state === 'loading' ? 'idle' : state);
    }
  }, []);

  useEffect(() => {
    const query = searchParams.toString();
    if (!query) {
      searchController.current?.abort();
      setServerOffers(null);
      setSearchState('idle');
      setSearchMessage(undefined);
      return;
    }
    const urlValues = valuesFromUrl(searchParams);
    setFilters(urlValues);
    try {
      const parsed = toFilters(urlValues);
      void runSearch(parsed);
    } catch (error) {
      searchController.current?.abort();
      setFieldError(error instanceof Error ? error.message : 'Check your search details.');
      setSearchState('idle');
    }
    // A URL change represents an applied search; clean up any request for the previous query.
    return () => searchController.current?.abort();
  }, [searchParams, runSearch]);

  const visibleOffers = useMemo(() => {
    if (serverOffers !== null) return serverOffers;
    const destination = filters.destination.trim().toLocaleLowerCase();
    const maxTotal = filters.maxTotal.trim() ? Number(filters.maxTotal.replaceAll(',', '')) * 100 : undefined;
    return previewOffers.filter((offer) => {
      const matchesDestination = !destination
        || `${offer.property.name} ${offer.property.destination}`.toLocaleLowerCase().includes(destination);
      const matchesGuests = offer.guestCapacity >= filters.guests;
      const matchesPrice = maxTotal === undefined || offer.buyerTotal.amountMinor <= maxTotal;
      return matchesDestination && matchesGuests && matchesPrice;
    });
  }, [filters.destination, filters.guests, filters.maxTotal, serverOffers]);

  const selectedOffer = visibleOffers.find((offer) => offer.id === selectedOfferId);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldError(undefined);
    setSearchMessage(undefined);

    let searchFilters: PropertySearchFilters;
    try {
      searchFilters = toFilters(filters);
    } catch (error) {
      setFieldError(error instanceof Error ? error.message : 'Check your search details.');
      return;
    }

    const query = new URLSearchParams({
      destination: searchFilters.destination,
      checkIn: searchFilters.checkIn,
      checkOut: searchFilters.checkOut,
      guests: String(searchFilters.guests),
    });
    if (searchFilters.maxBuyerTotal) {
      query.set('maxTotal', (searchFilters.maxBuyerTotal.amountMinor / 100).toString());
    }
    if (query.toString() === searchParams.toString()) {
      void runSearch(searchFilters);
    } else {
      setSearchParams(query);
    }
  }

  function resetSearch() {
    searchController.current?.abort();
    setFilters(initialValues);
    setFieldError(undefined);
    setSearchMessage(undefined);
    setServerOffers(null);
    setSearchState('idle');
    setSelectedOfferId(previewOffers[0]?.id ?? '');
    setSearchParams({}, { replace: true });
  }

  function updateFilters(value: MarketplaceSearchValues) {
    searchController.current?.abort();
    setFilters(value);
    setFieldError(undefined);
    setSearchMessage(undefined);
    setSearchState('idle');
    setServerOffers(null);
    setSelectedOfferId(previewOffers[0]?.id ?? '');
  }

  function selectOffer(offer: MarketplaceOffer) {
    setSelectedOfferId(offer.id);
  }

  const showingPreview = serverOffers === null;
  const resultHeading = showingPreview ? 'Example property cards' : 'Eligible stays';

  return (
    <div className="space-y-8 md:space-y-10">
      <section className="relative overflow-hidden rounded-signature bg-ink-900 px-6 py-8 text-white md:px-10 md:py-11">
        <div aria-hidden="true" className="absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div aria-hidden="true" className="absolute -right-7 -top-14 h-56 w-56 rounded-full border border-white/10" />
        <p className="relative text-sm font-medium text-brand-50">StayRelay · quiet hospitality, precise transactions</p>
        <h1 className="relative mt-3 max-w-3xl font-editorial text-4xl leading-tight md:text-6xl">Find a stay. Know what happens next.</h1>
        <p className="relative mt-4 max-w-2xl leading-7 text-divider">Search exact dates and review the total price. Only reservations with a confirmed, authorised transfer route can appear as eligible stays.</p>
      </section>

      <SearchFilters
        value={filters}
        formRef={searchFormRef}
        isSearching={searchState === 'loading'}
        errorMessage={fieldError}
        onChange={updateFilters}
        onSubmit={handleSubmit}
        onReset={resetSearch}
      />

      {searchMessage && (
        <div className={`rounded-card border px-4 py-3 text-sm leading-6 ${searchState === 'error' ? 'border-attention-800/20 bg-attention-50 text-attention-800' : 'border-brand-600/20 bg-brand-50 text-ink-900'}`} role="status" aria-live="polite">
          <p>{searchMessage}</p>
          {searchState === 'error' && <button className="mt-2 font-semibold underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600" type="button" onClick={() => searchFormRef.current?.requestSubmit()}>Retry live search</button>}
        </div>
      )}

      <section aria-labelledby="property-results-heading" className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-ink-600">{showingPreview ? 'Design preview' : 'Server-verified results'}</p>
            <h2 id="property-results-heading" className="mt-1 text-2xl font-semibold tracking-tight">{resultHeading}</h2>
          </div>
          {showingPreview && <span className="rounded-full bg-attention-50 px-3 py-1.5 text-xs font-semibold text-attention-800">Fictional · not live inventory</span>}
        </div>

        {searchState === 'loading' && (
          <p className="rounded-card border border-divider bg-surface p-5 text-sm text-ink-600" role="status">Checking current eligible inventory for your exact dates…</p>
        )}

        {serverOffers?.length === 0 && (
          <p className="rounded-card border border-divider bg-surface p-5 text-sm leading-6 text-ink-600">No eligible stays are currently available for these search criteria. Sample cards below are unrelated design fixtures and are not date-matched.</p>
        )}

        {visibleOffers.length > 0 ? (
          <>
            {showingPreview && <p className="rounded-control border border-attention-800/20 bg-attention-50 px-4 py-3 text-sm leading-6 text-attention-800">These fictional examples demonstrate card selection and price presentation only. They are not real hotels, verified reservations, available inventory, or purchasable offers. Date filters do not apply to these examples.</p>}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleOffers.map((offer) => (
                <PropertyCard key={offer.id} offer={offer} selected={selectedOfferId === offer.id} onSelect={selectOffer} />
              ))}
            </div>
          </>
        ) : searchState !== 'loading' ? (
          <p className="rounded-card border border-divider bg-surface p-5 text-sm text-ink-600" role="status">No sample cards match the destination, guest count and maximum total. Adjust the filters or reset the search.</p>
        ) : null}
      </section>

      <section aria-label="Price details" className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.8fr)]">
        <div className="rounded-card border border-divider bg-surface p-5 md:p-6">
          <h2 className="text-lg font-semibold">Why the eligibility label matters</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">Reservation eligibility and risk capacity are separate checks. A property card will not imply that a guest change is complete, that payment is settled, or that arrival is guaranteed.</p>
          <ul className="mt-4 grid gap-3 text-sm text-ink-600 sm:grid-cols-3">
            <li className="rounded-control bg-canvas p-3"><strong className="block text-ink-900">Policy checked</strong>Booking-specific route and evidence</li>
            <li className="rounded-control bg-canvas p-3"><strong className="block text-ink-900">Total price</strong>Exact dates and fees together</li>
            <li className="rounded-control bg-canvas p-3"><strong className="block text-ink-900">Server status</strong>UI never invents transaction progress</li>
          </ul>
        </div>
        <EconomicsBreakdown offer={selectedOffer} />
      </section>
    </div>
  );
}

export default MarketplacePage;
