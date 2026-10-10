# Synthetic connected-flow contracts

Recorded: 2026-10-11. Scope: local test adapter only. Activation flag: server-owned `STAYRELAY_TEST_AUTH=enabled`, default off. No browser flag can enable it. Hosted adapters remain disabled.

## Records and sensitivity

| Record | Keys and ownership | Lifecycle | Sensitivity/retention boundary |
| --- | --- | --- | --- |
| Account/session | UUID account; SHA-256 session-token digest; account owner | created → active → revoked/expired | synthetic `.test` identity only; raw token only in HttpOnly cookie |
| Seller draft/evidence | UUID; owner and draft foreign keys; server filename | draft; evidence quarantined or simulated-clean | generated watermarked fixture; bytes private and excluded from logs |
| Review/listing | draft key; separate operator reviewers | pending → approved/rejected; published only while both approved and clean evidence exists | synthetic policy decisions; rejection withdraws the listing |
| Order/Passport | order, buyer and draft keys; Passport owner | confirmation pending; append-only Passport versions | synthetic transaction metadata; no payment instrument or money movement |
| Passport event | Passport/version unique key; operator actor | payment pending → review → eligible → transfer in progress → transferred → arrival ready → checked in | synthetic status only; no hotel credential or real transfer |
| Audit event | UUID and correlation UUID; actor, reason, action and target | append only | document contents, tokens and secrets prohibited |

Local rows and files are disposable test data. Hosted retention, backup, deletion and recovery remain unverified and therefore disabled.

## State and command rules

- Unknown records, missing sessions, customer access to operator commands, cross-owner reads, seller self-purchase and duplicate checkout fail closed.
- Evidence without the exact synthetic watermark or with an unavailable simulated scanner remains quarantined.
- Listing publication requires clean evidence plus independent eligibility and risk approval. Any rejection withdraws it.
- Passport commands require the exact current version. Stale versions, repeated commands, skipped states and terminal-state commands return conflict without appending an event.
- No client response or local browser state grants authority; every projection is rebuilt from server records.

## API contract

Stable local routes are `/api/test-auth/*`, `/api/account`, `/api/seller-drafts*`, `/api/synthetic-evidence*`, `/api/operations/reviews*`, `/api/properties`, `/api/checkout-simulations`, `/api/passports`, and `/api/operations/passports*`. Validation errors use `{ error: { code, message } }`; permission failures are 401/403, missing owned resources are 404, and state/version conflicts are 409. Production/serverless inventory remains `503 INVENTORY_NOT_CONFIGURED`; local-only routes remain unavailable when the activation flag is off.

## Deterministic fixtures and negative states

Fixtures use `Demo` names, reserved `.test` emails, exact dates and the watermark `SYNTHETIC TEST DOCUMENT — NOT VALID FOR IDENTIFICATION.` Tests cover real-domain rejection, other-account denial, revoked session denial, scanner unavailable, watermark rejection, customer/operator role separation, pre-approval invisibility, withdrawal after rejection, unknown offer, self-purchase, duplicate order, stale Passport version and invalid terminal transition.

## Recovery

Stop the local services and remove only the explicitly configured temporary SQLite database and private-evidence directory. Code rollback is a bounded revert. Never treat local deletion as proof of hosted deletion or provider recovery.
