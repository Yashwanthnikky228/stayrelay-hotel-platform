# SR approved demo checkout and Reservation Passport

Status: Review
Branch: task/sr-checkout-passport
Base commit: 772ecb25275ac2aba23ff42f5244c00683cd3906
Provider mode: isolated local synthetic development; hosted transaction backend disabled
Last updated: 2026-10-11 04:55 IST

## Objective and requirements

An authenticated synthetic buyer can open a currently published demo offer, create one checkout simulation, and receive an owner-scoped Reservation Passport. The server, not the client, verifies publication and ownership. Sellers cannot buy their own listing; duplicates, unknown offers, anonymous access and cross-account reads fail closed.

The order stays `confirmation_pending` and the Passport stays `payment_confirmation_pending`. No payment instrument is collected, no authorization/capture occurs, no payout is created, and arrival credentials remain locked. Local SQLite is test persistence only; the hosted UI shows the capability as unavailable because no durable hosted transaction service is configured.

## Verification and recovery

- Typecheck, both builds and 16/16 unit/API tests pass.
- Chromium proves seller submission → operator dual approval → buyer account → offer details → checkout simulation → mobile Passport.
- Rollback is a bounded code revert; the explicit local test database is disposable synthetic data and hosted state is unchanged until reviewed integration.

## Remaining work

Add reason/version conflict handling, simulated provider callbacks, cancellation/refund transitions, accessibility/performance evidence and hosted managed persistence before any production transaction claim.
