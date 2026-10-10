# SR evidence milestone — private synthetic uploads

Status: Review
Owner: Engineering Lead; security/privacy review unassigned
Repository: Yashwanthnikky228/stayrelay-hotel-platform
Branch: task/sr-private-synthetic-evidence
Base commit: 670123c5c8324aaf9999a12a21451db8f4dbc240
Current head: 045ae47
Pull request: Not created
Controlling sources: `AGENTS.md`; `PLANS.md`; ADR-0002.7 and ADR-0002.9; supplemental SR-251–SR-300
Provider/environment mode: local isolated synthetic development; hosted storage/scanner unverified
Migration head: local development schema embedded in `TestStore`; no hosted migration
Generated database types: None
Last updated: 2026-10-11 01:15 IST

## Objective and user outcome

An authenticated synthetic seller can attach a visibly watermarked test document to a draft. The API stores bytes outside the public application tree, records owner-scoped metadata, simulates a fail-closed scan result and denies every other account.

## Scope and non-goals

Included: bounded text/PDF uploads, owner authorization, private filesystem adapter, metadata lifecycle, quarantine/clean simulation, content download, append-only audit events and API tests. Excluded: real documents, public URLs, OCR, hosted object storage, real antivirus, operations review and production activation.

## Current facts and data flow

The local API has server-owned opaque sessions, SQLite accounts/drafts and owner checks. Upload bytes will flow through the authenticated API to an explicit local storage root using server-generated names. Metadata belongs to the draft owner. Missing watermark, unsupported type, excess size or unavailable scan remains quarantined; only simulated-clean synthetic files are downloadable.

## Invariants and transitions

- No anonymous or cross-account read/write.
- Accepted content types are bounded; filenames never choose a filesystem path.
- Required text: `SYNTHETIC TEST DOCUMENT — NOT VALID FOR IDENTIFICATION.`
- Lifecycle is `quarantined` → `simulated_clean`; missing watermark or scanner unavailability never becomes clean.
- Raw document bytes never enter logs, audit rows or public routes.

## Milestones, tests and recovery

1. Add private storage/metadata commands and upload/list/download routes. Test valid clean, missing watermark, scanner unavailable, cross-account denial and signed-out denial.
2. Run typecheck/build/unit tests, update tracker and state, then push for review. Remove the exact temporary test storage/database after tests. Rollback is a bounded code revert plus removal of explicitly configured local test artifacts; no provider recovery applies.

## Progress

- [x] 2026-10-11 01:15 IST — verified auth milestone head and created bounded evidence plan.
- [x] 2026-10-11 01:25 IST — private storage, metadata lifecycle, simulated scan and owner authorization implemented.
- [x] 2026-10-11 01:30 IST — typecheck, both builds and 14/14 unit/API tests passed; tracker and handoff updated.

## Security, privacy, accessibility, and money impact

Synthetic content only; no identity, reservation or financial documents. Server authorization and path isolation are mandatory. No UI in this bounded server milestone, and no money behavior.

## Handoff and next task

Content head `045ae47`; PR not created. Hosted storage, real scanning, privacy retention approval and operations review remain blocked. No service remains running. Next task is seller upload UI followed by the protected operations review queue.
