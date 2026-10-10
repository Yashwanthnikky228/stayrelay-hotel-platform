import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import type { PropertyOffer } from '@stayrelay/domain';
import { EconomicsBreakdown } from '../components/marketplace/EconomicsBreakdown';
import { previewOffers } from '../data/previewOffers';
import { accountApi } from '../services/account';
import { searchPropertyOffers } from '../services/marketplace';

export function PropertyDetailPage() {
  const { propertyId } = useParams();
  const [searchParams] = useSearchParams();
  const previewOffer = previewOffers.find((candidate) => candidate.property.id === propertyId);
  const [liveOffer, setLiveOffer] = useState<PropertyOffer>();
  const [loading, setLoading] = useState(!previewOffer);
  const [message, setMessage] = useState<string>();
  const returnHref = `/${searchParams.size ? `?${searchParams.toString()}` : ''}`;

  useEffect(() => {
    if (previewOffer) return;
    const checkIn = searchParams.get('checkIn') ?? ''; const checkOut = searchParams.get('checkOut') ?? ''; const guests = Number(searchParams.get('guests'));
    if (!checkIn || !checkOut || !Number.isInteger(guests)) { setLoading(false); return; }
    void searchPropertyOffers({ destination: searchParams.get('destination') ?? '', checkIn, checkOut, guests }).then((offers) => setLiveOffer(offers.find((candidate) => candidate.property.id === propertyId))).catch(() => setLiveOffer(undefined)).finally(() => setLoading(false));
  }, [previewOffer, propertyId, searchParams]);

  const offer = previewOffer ?? liveOffer;
  async function simulateCheckout() {
    if (!liveOffer) return;
    setMessage(undefined);
    try { await accountApi.checkout(liveOffer.id); setMessage('Synthetic order created. Your Reservation Passport is ready.'); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Checkout simulation could not be created.'); }
  }

  if (loading) return <p className="rounded-card border border-divider bg-surface p-6" role="status">Loading the approved synthetic stay…</p>;

  if (!offer) {
    return (
      <section className="mx-auto max-w-2xl rounded-card border border-divider bg-surface p-6 shadow-sm md:p-10">
        <p className="text-sm font-semibold text-attention-800">Stay unavailable</p>
        <h1 className="mt-2 font-editorial text-4xl text-ink-900">This property preview cannot be found.</h1>
        <p className="mt-4 leading-7 text-ink-600">It may have been removed or the link may be incomplete. No reservation or payment has been created.</p>
        <Link className="mt-6 inline-grid min-h-11 place-items-center rounded-control bg-ink-900 px-5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2" to={returnHref}>Return to discovery</Link>
      </section>
    );
  }

  const { property } = offer;
  return (
    <div className="space-y-6 md:space-y-8">
      <Link className="inline-flex min-h-11 items-center rounded-control text-sm font-semibold text-brand-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600" to={returnHref}>← Back to search results</Link>

      <section className="overflow-hidden rounded-signature border border-divider bg-surface shadow-sm">
        <div className="relative grid min-h-72 place-items-end overflow-hidden bg-gradient-to-br from-brand-50 via-[#dce8e2] to-[#d7c7b2] p-6 md:min-h-[28rem] md:p-10">
          <div aria-hidden="true" className="absolute -right-16 -top-20 h-72 w-72 rounded-full border border-white/60" />
          <div aria-hidden="true" className="absolute left-12 top-12 h-24 w-40 rounded-[50%] bg-white/25 blur-2xl" />
          <div className="relative w-full rounded-card border border-white/60 bg-white/90 p-5 backdrop-blur-sm md:max-w-2xl md:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-attention-800">{previewOffer ? 'Fictional design preview · not bookable' : 'Approved synthetic demo · no real reservation'}</p>
            <p className="mt-4 text-sm text-ink-600">{property.destination}</p>
            <h1 className="mt-1 font-editorial text-4xl leading-tight text-ink-900 md:text-6xl">{property.name}</h1>
            <p className="mt-4 max-w-xl leading-7 text-ink-600">{property.summary}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-6">
          <section className="rounded-card border border-divider bg-surface p-5 md:p-7">
            <p className="text-sm font-semibold text-brand-700">What this preview demonstrates</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">A clear stay summary before any transaction</h2>
            <p className="mt-3 leading-7 text-ink-600">This fictional property shows layout, navigation and price presentation only. It is not a real hotel, verified reservation or available offer. StayRelay will require booking-specific evidence, separate eligibility and risk decisions, and a server-confirmed transfer route before a live listing can appear.</p>
            <ul aria-label="Example amenities" className="mt-5 flex flex-wrap gap-2">
              {property.amenities.map((amenity) => <li className="rounded-full bg-canvas px-3 py-2 text-sm text-ink-600" key={amenity}>{amenity}</li>)}
            </ul>
          </section>

          <section className="rounded-card border border-divider bg-ink-900 p-5 text-white md:p-7">
            <h2 className="text-xl font-semibold">How a real transfer would be protected</h2>
            <ol className="mt-5 grid gap-4 text-sm leading-6 text-divider sm:grid-cols-3">
              <li><strong className="block text-white">1. Evidence review</strong>Reservation and policy evidence must be current and sufficient.</li>
              <li><strong className="block text-white">2. Separate decisions</strong>Eligibility never substitutes for risk approval.</li>
              <li><strong className="block text-white">3. Confirmed handoff</strong>Buyer-specific proof is required before transfer confirmation.</li>
            </ol>
          </section>
        </div>

        <aside className="space-y-4" aria-label="Stay summary">
          <EconomicsBreakdown offer={offer} />
          <div className="rounded-card border border-attention-800/20 bg-attention-50 p-5 text-sm leading-6 text-attention-800"><strong className="block">Demo action only</strong>{previewOffer ? 'Checkout is intentionally unavailable for this illustrative record.' : 'This creates a synthetic order and Passport status only.'} No money moves and no real reservation is created.</div>
          {previewOffer ? <button className="min-h-12 w-full cursor-not-allowed rounded-control bg-divider px-5 font-semibold text-ink-600" type="button" disabled>Request unavailable in preview</button> : <button className="min-h-12 w-full rounded-control bg-brand-600 px-5 font-semibold text-white" type="button" onClick={() => void simulateCheckout()}>Create checkout simulation</button>}
          {message && <p className="rounded-control bg-brand-50 p-3 text-sm text-brand-700" role="status">{message} {message.includes('ready') && <Link className="font-semibold underline" to="/passport">Open Passport</Link>}</p>}
        </aside>
      </div>
    </div>
  );
}

export default PropertyDetailPage;
