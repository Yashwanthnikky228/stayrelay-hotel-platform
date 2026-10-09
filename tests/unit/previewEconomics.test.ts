import assert from 'node:assert/strict';
import { test } from 'node:test';
import type { UnitEconomicsPreview } from '@stayrelay/domain';
import { calculatePreviewEconomics } from '../../apps/customer/src/components/marketplace/previewEconomics';

const model: UnitEconomicsPreview = {
  sellerRequested: { amountMinor: 800_000, currency: 'INR' },
  buyerMarketplaceFee: { amountMinor: 50_000, currency: 'INR' },
  sellerMarketplaceFee: { amountMinor: 80_000, currency: 'INR' },
  paymentProcessingEstimate: { amountMinor: 20_000, currency: 'INR' },
  riskReserveAllocation: { amountMinor: 40_000, currency: 'INR' },
};

test('reserve earmarking does not reduce contribution or seller proceeds', () => {
  for (const allocation of [0, 40_000, 5_000_000]) {
    const result = calculatePreviewEconomics({ ...model, riskReserveAllocation: { amountMinor: allocation, currency: 'INR' } });
    assert.equal(result.contributionBeforeOperatingCostsAndClaims, 110_000);
    assert.equal(result.sellerProceeds, 720_000);
    assert.equal(result.reserveCashAllocation, allocation);
  }
});

test('a processing expense can produce negative contribution', () => {
  assert.equal(calculatePreviewEconomics({ ...model, paymentProcessingEstimate: { amountMinor: 150_000, currency: 'INR' } })
    .contributionBeforeOperatingCostsAndClaims, -20_000);
});

test('mixed currencies fail instead of combining incompatible money', () => {
  assert.throws(() => calculatePreviewEconomics({ ...model, buyerMarketplaceFee: { amountMinor: 100, currency: 'USD' } }), RangeError);
});

test('fractional, negative, and unsafe minor units fail', () => {
  for (const amountMinor of [0.5, -1, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => calculatePreviewEconomics({ ...model, riskReserveAllocation: { amountMinor, currency: 'INR' } }), RangeError);
  }
});

test('unsafe total arithmetic and negative seller proceeds fail', () => {
  assert.throws(() => calculatePreviewEconomics({ ...model,
    buyerMarketplaceFee: { amountMinor: Number.MAX_SAFE_INTEGER, currency: 'INR' },
  }), RangeError);
  assert.throws(() => calculatePreviewEconomics({ ...model,
    sellerMarketplaceFee: { amountMinor: 800_001, currency: 'INR' },
  }), RangeError);
});
