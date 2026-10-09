import type { Money, UnitEconomicsPreview } from '@stayrelay/domain';

/** Fictional display arithmetic only; never approves pricing or moves money. */
export function calculatePreviewEconomics(model: UnitEconomicsPreview) {
  const inputs: Money[] = Object.values(model);
  if (inputs.some(({ amountMinor, currency }) => !Number.isSafeInteger(amountMinor)
    || amountMinor < 0 || currency !== model.sellerRequested.currency)) {
    throw new RangeError('Preview amounts must be nonnegative minor units in one currency.');
  }
  const platformGross = model.buyerMarketplaceFee.amountMinor + model.sellerMarketplaceFee.amountMinor;
  const sellerProceeds = model.sellerRequested.amountMinor - model.sellerMarketplaceFee.amountMinor;
  const contributionBeforeOperatingCostsAndClaims = platformGross - model.paymentProcessingEstimate.amountMinor;
  const reserveCashAllocation = model.riskReserveAllocation.amountMinor;
  if (![platformGross, sellerProceeds, contributionBeforeOperatingCostsAndClaims].every(Number.isSafeInteger)
    || sellerProceeds < 0) throw new RangeError('Preview totals are outside the supported range.');
  return { platformGross, sellerProceeds, contributionBeforeOperatingCostsAndClaims, reserveCashAllocation };
}
