# SR versioned Passport transfer and arrival simulation

Status: Review
Branch: task/sr-passport-transitions
Base commit: b501ff44efb8cbe062e77d8e35c9ae5c7346f280
Content commit: 0df8af0
Provider mode: isolated synthetic development; no payment, reservation transfer or hotel integration
Last updated: 2026-10-11 05:05 IST

## Objective and invariants

A protected local operator can advance a synthetic Reservation Passport through an ordered demonstration lifecycle. Every command supplies the expected server version. Stale versions, invalid jumps, missing records, unauthenticated callers and customer-role callers fail closed.

Allowed path: `payment_confirmation_pending` → `under_review` → `eligible_for_transfer` → `transfer_in_progress` → `transfer_confirmed` → `ready_for_arrival` → `checked_in`.

Each accepted transition appends an immutable state event and audit event. The buyer projection reads the latest event. Arrival guidance is unlocked only for the final two synthetic states, and no QR credential is generated. All labels explicitly state that no live payment, reservation transfer or hotel check-in occurred.

## Verification

- Typecheck, both builds and 17/17 unit/API tests pass.
- Tests cover the full path, stale-version conflict, invalid terminal transition and buyer projection.
- Chromium proves operator advancement through all six commands and the mobile buyer Passport projection at `checked_in`.

## Remaining work

Add failure/recovery branches, claims, cancellation/refund simulation, reason codes, support escalation and managed hosted persistence before any production workflow claim.
