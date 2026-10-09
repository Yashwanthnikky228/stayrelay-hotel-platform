/** Shared domain contracts. IDs are opaque server-issued identifiers. */
export type EntityId = string;
export type ISODate = string;
export type ISODateTime = string;

export type CurrencyCode = 'INR' | 'USD';
export interface Money {
  /** Integer minor units (paise for INR, cents for USD). */
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

export interface Property {
  id: EntityId;
  name: string;
  /** City/region only in public discovery until an eligible stay is confirmed. */
  destination: string;
  address?: string;
  timezone: string;
  /** No reviews, ratings, partner marks or inventory counts without verified source data. */
  media: PropertyMedia[];
  amenities: string[];
  accessibilityFeatures?: string[];
  inventoryDecision: InventoryDecision;
  policyReviewedAt?: ISODateTime;
}

export interface PropertyMedia {
  id: EntityId;
  url: string;
  alt: string;
  aspectRatio: '4:3' | '16:10' | '1:1';
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
  transferStatus:
    | 'not_started'
    | 'in_progress'
    | 'confirmed'
    | 'could_not_be_completed';
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

/** Customer-facing projection of server-authoritative reservation and transfer states. */
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

export interface ReservationPassport {
  id: EntityId;
  bookingId: EntityId;
  ownerId: EntityId;
  status: PassportStatus;
  /** Versioned projection; the client must not infer transaction state locally. */
  version: number;
  statusUpdatedAt: ISODateTime;
  nextAction?: {
    label: string;
    owner: 'guest' | 'seller' | 'stayrelay_operations' | 'payment_provider';
    dueAt?: ISODateTime;
  };
  /** Masked by default; reveal only through an authorized server response. */
  reservationReferenceMasked?: string;
  arrivalGuideAvailable: boolean;
}
