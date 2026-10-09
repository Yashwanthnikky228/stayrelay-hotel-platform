import { useEffect, useRef, type FormEvent, type RefObject } from 'react';

export interface MarketplaceSearchValues {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  maxTotal: string;
}

interface SearchFiltersProps {
  value: MarketplaceSearchValues;
  formRef: RefObject<HTMLFormElement | null>;
  isSearching: boolean;
  errorMessage?: string;
  onChange: (value: MarketplaceSearchValues) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

const controlClass = 'mt-1 min-h-12 w-full rounded-control border border-divider bg-surface px-3 text-ink-900 placeholder:text-ink-600 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand-600 focus-visible:ring-offset-2';

export function SearchFilters({ value, formRef, isSearching, errorMessage, onChange, onSubmit, onReset }: SearchFiltersProps) {
  const errorRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (errorMessage) errorRef.current?.focus();
  }, [errorMessage]);

  function update<K extends keyof MarketplaceSearchValues>(key: K, next: MarketplaceSearchValues[K]) {
    onChange({ ...value, [key]: next });
  }

  return (
    <form ref={formRef} aria-describedby={errorMessage ? 'marketplace-search-error' : undefined} className="rounded-card border border-divider bg-surface p-5 shadow-sm md:p-6" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <label className="field-label xl:col-span-2">
          Destination
          <input className={controlClass} name="destination" placeholder="City or area" autoComplete="off" value={value.destination} onChange={(event) => update('destination', event.currentTarget.value)} />
        </label>
        <label className="field-label">
          Check in
          <input className={controlClass} name="checkIn" type="date" required value={value.checkIn} onChange={(event) => update('checkIn', event.currentTarget.value)} />
        </label>
        <label className="field-label">
          Check out
          <input className={controlClass} name="checkOut" type="date" required value={value.checkOut} onChange={(event) => update('checkOut', event.currentTarget.value)} />
        </label>
        <label className="field-label">
          Guests
          <select className={controlClass} name="guests" value={value.guests} onChange={(event) => update('guests', Number(event.currentTarget.value))}>
            {[1, 2, 3, 4, 5, 6].map((guests) => <option key={guests} value={guests}>{guests} {guests === 1 ? 'guest' : 'guests'}</option>)}
          </select>
        </label>
        <label className="field-label">
          Max total <span className="font-normal text-ink-600">(optional, INR)</span>
          <input className={controlClass} name="maxTotal" inputMode="decimal" placeholder="Any total" value={value.maxTotal} onChange={(event) => update('maxTotal', event.currentTarget.value)} />
        </label>
      </div>
      {errorMessage && <p ref={errorRef} id="marketplace-search-error" className="mt-4 rounded-control bg-error-50 px-3 py-2 text-sm text-error-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-700" role="alert" tabIndex={-1}>{errorMessage}</p>}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button className="min-h-12 rounded-control bg-brand-600 px-5 font-semibold text-white transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70" type="submit" disabled={isSearching}>
          {isSearching ? 'Searching…' : 'Search eligible stays'}
        </button>
        <button className="min-h-12 rounded-control border border-divider bg-surface px-4 font-medium text-ink-900 hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2" type="button" onClick={onReset}>
          Reset filters
        </button>
        <p className="basis-full text-sm text-ink-600 md:basis-auto">Exact dates only. No flexible-date assumptions.</p>
      </div>
    </form>
  );
}
