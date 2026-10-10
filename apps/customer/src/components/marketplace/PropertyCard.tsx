import type { MarketplaceOffer } from '@stayrelay/domain';
import { Link } from 'react-router';
import { formatMoney } from './formatMoney';

interface PropertyCardProps {
  offer: MarketplaceOffer;
  selected: boolean;
  detailsHref: string;
  onSelect: (offer: MarketplaceOffer) => void;
}

export function PropertyCard({ offer, selected, detailsHref, onSelect }: PropertyCardProps) {
  const { property } = offer;
  const cover = property.media[0];
  return (
    <article className={`overflow-hidden rounded-card border bg-surface transition-shadow ${selected ? 'border-brand-600 ring-2 ring-brand-600/20 shadow-md' : 'border-divider shadow-sm hover:shadow-md'}`}>
      <button
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-inset"
        type="button"
        aria-pressed={selected}
        onClick={() => onSelect(offer)}
      >
        <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br from-brand-50 via-canvas to-divider p-5">
          {cover && <img className="absolute inset-0 h-full w-full object-cover" src={cover.url} alt={cover.alt} loading="lazy" decoding="async" />}
          <span className="rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900">{offer.isPreview ? 'Illustrative sample · Not bookable' : 'Eligible for transfer'}</span>
          <span className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full border border-white/80 bg-white/90 text-sm font-semibold text-ink-900" aria-hidden="true">{selected ? '✓' : '＋'}</span>
        </div>
        <div className="space-y-3 p-5">
          <div>
            <p className="text-sm text-ink-600">{property.destination}</p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink-900">{property.name}</h3>
          </div>
          <p className="min-h-12 text-sm leading-6 text-ink-600">{property.summary}</p>
          <ul aria-label="Example amenities" className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => <li className="rounded-full bg-canvas px-2.5 py-1 text-xs text-ink-600" key={amenity}>{amenity}</li>)}
          </ul>
          <div className="border-t border-divider pt-3">
            <p className="text-xs text-ink-600">{offer.isPreview ? 'Example total · not a live quote' : 'Total for these exact dates'}</p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-ink-900">{formatMoney(offer.buyerTotal)}</p>
          </div>
        </div>
      </button>
      <div className="px-5 pb-5">
        <Link className="grid min-h-11 w-full place-items-center rounded-control border border-brand-600 bg-brand-50 px-4 text-sm font-semibold text-brand-700 hover:bg-[#E2E9FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2" to={detailsHref}>
          View stay details
        </Link>
      </div>
    </article>
  );
}
