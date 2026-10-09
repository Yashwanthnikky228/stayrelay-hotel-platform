import type { PropertyOffer } from '@stayrelay/domain';

/** Clearly labelled design fixtures; never eligible, live, or purchasable. */
export const previewOffers: PropertyOffer[] = [
  {
    id: 'preview-art-district',
    isPreview: true,
    guestCapacity: 2,
    buyerTotal: { amountMinor: 1_640_000, currency: 'INR' },
    unitEconomicsPreview: {
      sellerRequested: { amountMinor: 1_600_000, currency: 'INR' },
      buyerMarketplaceFee: { amountMinor: 40_000, currency: 'INR' },
      sellerMarketplaceFee: { amountMinor: 40_000, currency: 'INR' },
      paymentProcessingEstimate: { amountMinor: 33_000, currency: 'INR' },
      riskReserveAllocation: { amountMinor: 20_000, currency: 'INR' },
    },
    property: {
      id: 'preview-property-a',
      name: 'Example Art District Hotel',
      destination: 'Mumbai, India',
      timezone: 'Asia/Kolkata',
      summary: 'Illustrative city stay with a quiet reading lounge and a courtyard café.',
      media: [],
      amenities: ['Wi-Fi', 'Restaurant', 'Accessible entry'],
      inventoryDecision: 'unknown',
    },
  },
  {
    id: 'preview-riverside',
    isPreview: true,
    guestCapacity: 2,
    buyerTotal: { amountMinor: 1_925_000, currency: 'INR' },
    unitEconomicsPreview: {
      sellerRequested: { amountMinor: 1_875_000, currency: 'INR' },
      buyerMarketplaceFee: { amountMinor: 50_000, currency: 'INR' },
      sellerMarketplaceFee: { amountMinor: 50_000, currency: 'INR' },
      paymentProcessingEstimate: { amountMinor: 38_500, currency: 'INR' },
      riskReserveAllocation: { amountMinor: 25_000, currency: 'INR' },
    },
    property: {
      id: 'preview-property-b',
      name: 'Example Riverside Hotel',
      destination: 'Hyderabad, India',
      timezone: 'Asia/Kolkata',
      summary: 'Illustrative riverside stay with a garden terrace and an all-day dining room.',
      media: [],
      amenities: ['Wi-Fi', 'Garden', 'Breakfast room'],
      inventoryDecision: 'unknown',
    },
  },
  {
    id: 'preview-garden-court',
    isPreview: true,
    guestCapacity: 3,
    buyerTotal: { amountMinor: 1_480_000, currency: 'INR' },
    unitEconomicsPreview: {
      sellerRequested: { amountMinor: 1_450_000, currency: 'INR' },
      buyerMarketplaceFee: { amountMinor: 30_000, currency: 'INR' },
      sellerMarketplaceFee: { amountMinor: 30_000, currency: 'INR' },
      paymentProcessingEstimate: { amountMinor: 29_600, currency: 'INR' },
      riskReserveAllocation: { amountMinor: 15_000, currency: 'INR' },
    },
    property: {
      id: 'preview-property-c',
      name: 'Example Garden Court',
      destination: 'Bengaluru, India',
      timezone: 'Asia/Kolkata',
      summary: 'Illustrative garden-side stay with a small fitness room and step-free lobby.',
      media: [],
      amenities: ['Wi-Fi', 'Fitness room', 'Step-free lobby'],
      inventoryDecision: 'unknown',
    },
  },
];
