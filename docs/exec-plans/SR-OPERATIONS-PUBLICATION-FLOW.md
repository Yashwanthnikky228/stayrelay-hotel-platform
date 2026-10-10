# SR operations review and demo publication

Status: Review
Owner: Engineering Lead; security/privacy review unassigned
Repository: Yashwanthnikky228/stayrelay-hotel-platform
Branch: task/sr-operations-publication-flow
Base commit: d50eec143cc2f812c27527262aa25344a52aeebe
Content commit: 83a930b
Provider/environment mode: isolated local synthetic development; hosted backends disabled
Migration head: local development schema embedded in `TestStore`; no hosted migration
Last updated: 2026-10-11 01:30 IST

## Objective and user outcome

A synthetic seller attaches a generated test document to a private draft. A separately authenticated local operator reviews it, records eligibility and risk independently, and publishes only when both decisions approve and clean evidence exists. Buyer search then returns the eligible synthetic offer for exact dates.

## Requirements and boundaries

- Seller, operator and anonymous permissions are enforced by the server; the customer client cannot grant roles or publish.
- `operator@stayrelay.test` is a reserved local-only identity and cannot be registered through the customer endpoint.
- The seller UI generates the fixed watermarked fixture. It has no real-document file picker.
- Eligibility and risk begin pending and are changed by separate commands. A rejection or absent clean evidence removes publication.
- Every account, session, upload, decision and publication command writes an audit event without document content.
- Local SQLite and private files are not Vercel-compatible persistence. Hosted account, upload and operations controls remain visibly disabled and public inventory remains fail-closed.
- No live payment, identity verification, transfer, or real reservation is enabled.

## Verification and recovery

- `pnpm typecheck`, `pnpm build`, and `pnpm test:unit` must pass.
- API coverage proves role denial, separate decisions, pre-approval invisibility, publication after dual approval, and withdrawal after rejection.
- Chromium proves seller evidence UI, protected operations approval and mobile buyer visibility with synthetic records.
- Rollback is a bounded code revert. Local test database and evidence files are disposable synthetic artifacts; hosted state is unchanged.

## Progress

- [x] Implemented generated seller fixture attachment and visible hosted safety lock.
- [x] Implemented operator-only queue, separate eligibility/risk commands, audit events and fail-closed publication projection.
- [x] Added buyer search projection for exact dates, destination, guests and total-price filter.
- [x] Passed typecheck, both builds and 15/15 unit/API tests.
- [x] Passed Chromium seller → operations → buyer journey at desktop and 390px mobile widths.
- [ ] External security review, hosted identity/database/private storage and production approval remain open.
