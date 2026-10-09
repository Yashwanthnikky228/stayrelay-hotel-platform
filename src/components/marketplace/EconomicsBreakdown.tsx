import type { MarketplaceOffer } from '@stayrelay/domain';
import { formatMoney } from './formatMoney';

interface EconomicsBreakdownProps {
  offer?: MarketplaceOffer;
}

export function EconomicsBreakdown({ offer }: EconomicsBreakdownProps) {
  if (!offer) {
    return (
      <aside className="rounded-card border border-divider bg-surface p-5 md:p-6">
        <h2 className="text-lg font-semibold">Transaction breakdown preview</h2>
        <p className="mt-2 text-sm leading-6 text-ink-600">Select an illustrative sample card to see how seller proceeds, marketplace fees and modelled costs could be presented.</p>
      </aside>
    );
  }

  if (!offer.isPreview) {
    return (
      <aside aria-labelledby="economics-title" className="rounded-card border border-divider bg-surface p-5 md:p-6">
        <p className="text-sm font-medium text-success-700">Server-confirmed quote</p>
        <h2 id="economics-title" className="mt-1 text-lg font-semibold">Your price</h2>
        <p className="mt-3 text-sm text-ink-600">This is the buyer total returned for the exact search. Internal seller, payment and reserve calculations are not exposed here.</p>
        <p className="mt-4 text-2xl font-semibold tabular-nums">{formatMoney(offer.buyerTotal)}</p>
      </aside>
    );
  }

  const economics = offer.unitEconomicsPreview;
  const platformGross = economics.buyerMarketplaceFee.amountMinor + economics.sellerMarketplaceFee.amountMinor;
  const estimatedContribution = platformGross - economics.paymentProcessingEstimate.amountMinor - economics.riskReserveAllocation.amountMinor;
  const money = (amountMinor: number) => formatMoney({ amountMinor, currency: offer.buyerTotal.currency });

  return (
    <aside aria-labelledby="economics-title" className="rounded-card border border-divider bg-surface p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-brand-700">Example only · assumptions are not approved pricing</p>
          <h2 id="economics-title" className="mt-1 text-lg font-semibold">Transaction breakdown preview</h2>
        </div>
        <span className="rounded-full bg-attention-50 px-3 py-1 text-xs font-semibold text-attention-800">Not a live offer</span>
      </div>
      <dl className="mt-5 divide-y divide-divider text-sm">
        <div className="flex justify-between gap-4 py-3"><dt className="text-ink-600">Seller requested amount</dt><dd className="font-medium tabular-nums">{formatMoney(economics.sellerRequested)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt className="text-ink-600">Illustrative buyer marketplace fee</dt><dd className="font-medium tabular-nums">{formatMoney(economics.buyerMarketplaceFee)}</dd></div>
        <div className="flex justify-between gap-4 py-3 font-semibold"><dt>Example buyer total</dt><dd className="tabular-nums">{formatMoney(offer.buyerTotal)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt className="text-ink-600">Illustrative seller marketplace fee</dt><dd className="font-medium tabular-nums">−{formatMoney(economics.sellerMarketplaceFee)}</dd></div>
        <div className="flex justify-between gap-4 py-3 font-semibold"><dt>Example seller proceeds</dt><dd className="tabular-nums">{money(economics.sellerRequested.amountMinor - economics.sellerMarketplaceFee.amountMinor)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt className="text-ink-600">Modelled payment processing</dt><dd className="font-medium tabular-nums">−{formatMoney(economics.paymentProcessingEstimate)}</dd></div>
        <div className="flex justify-between gap-4 py-3"><dt className="text-ink-600">Illustrative risk reserve allocation</dt><dd className="font-medium tabular-nums">−{formatMoney(economics.riskReserveAllocation)}</dd></div>
        <div className="flex justify-between gap-4 py-3 font-semibold"><dt>Example contribution before operating costs and claims</dt><dd className="tabular-nums">{money(estimatedContribution)}</dd></div>
      </dl>
      <p className="mt-4 text-xs leading-5 text-ink-600">Every amount shown here is fictional design data. Actual fees, processing costs and reserve rules require approved business and payment-provider terms.</p>
    </aside>
  );
}
