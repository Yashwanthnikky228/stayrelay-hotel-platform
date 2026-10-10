# SR authentication milestone — persistent synthetic seller drafts

Status: Review
Owner: Engineering Lead; security review unassigned
Repository: Yashwanthnikky228/stayrelay-hotel-platform
Branch: task/sr-test-auth-persistent-drafts
Base commit: 6b70567f5c8f41badfc964dee448fcb45c585b8c
Current head: 847db21
Pull request: Not created
Controlling sources: `AGENTS.md`; `PLANS.md`; ADR-0002.1, ADR-0002.2, ADR-0002.3 and ADR-0002.9; supplemental SR-151–SR-175, SR-201–SR-250 and SR-501–SR-550
Provider/environment mode: local isolated synthetic development; hosted identity and database unverified
Migration head: None; first local development schema pending
Generated database types: None
Last updated: 2026-10-11 00:50 IST

## Objective and user outcome

A contributor can create a synthetic `.test` account, receive a server-validated session, open one customer account surface, switch between buyer and seller workspaces, create a seller reservation draft, sign out and back in, and recover the same draft. A second synthetic account cannot read or mutate that draft.

## Scope and non-goals

Included: local SQLite persistence, synthetic account records, opaque HttpOnly session cookies, server-side ownership checks, buyer/seller workspace projections, seller draft creation/listing, sign-out, denial tests, refresh/browser evidence and audit-shaped events.

Excluded: passwords, social login, email delivery, production auth, hosted Supabase claims, real reservation evidence, file uploads, operations permissions, live inventory, payments, payouts and production deployment.

## Current facts

The API exposes health and deliberately unavailable inventory only. There is no database schema, migration, auth provider, session, account route or seller-draft command. Customer and operations applications are separate. Node 24 provides `node:sqlite`; this avoids a new database dependency and remains local-only. Vercel API verification is blocked by DNS `EAI_AGAIN`; that does not block local implementation.

## Module ownership and data flow

`apps/api` owns account creation, sessions, draft commands, authorization and persistence. The customer app sends same-origin API requests and projects returned state. A test-auth account request accepts only synthetic `.test` email domains, creates an opaque random session, stores only its SHA-256 digest and sends the raw token in an HttpOnly, SameSite=Lax cookie. Draft queries bind the authenticated account ID in SQL; callers never choose an owner ID. Audit records are appended beside account, session and draft changes.

## Invariants and transitions

- Test auth is enabled only when `STAYRELAY_TEST_AUTH=enabled`; otherwise every test-auth endpoint fails closed.
- Only reserved `.test` email addresses and explicitly synthetic display names are accepted.
- Raw session tokens are never persisted or returned in JSON.
- A draft begins as `draft`; no route can publish, approve, transfer or transact.
- Draft reads and mutations are scoped to the authenticated account.
- Sign-out revokes the current server session; missing, expired or revoked sessions return 401.
- Audit entries are append-only in the local schema.

## External assumptions and gates

No hosted provider is assumed. Supabase identity, project, region, RLS, backups and recovery remain unverified. Production auth stays disabled. Vercel needs functioning DNS/egress to `api.vercel.com` in a refreshed cloud runtime before preview verification can resume.

## Milestone plan

1. **Local server boundary:** add the SQLite store, test-auth/session and draft endpoints, cookie controls and API tests. Negative cases: disabled adapter, invalid domain, unauthenticated access, cross-account access and revoked session. Rollback: revert schema/store/routes; delete only the explicitly configured local test database.
2. **Customer workspace:** add sign-in/account UI, buyer/seller switching and draft form/list projection. Browser cases: create, refresh, sign out/in, second-account isolation and protected-route redirect. Rollback: revert customer routes/components; server remains fail closed.
3. **Evidence and tracking:** run typecheck/build/unit/browser checks, update supplemental rows and `STATE.md`, then push the feature branch for review. No main merge or deployment claim without remote evidence.

## Progress

- [x] 2026-10-11 00:50 IST — verified clean branch `6b70567`, remote parity, current API boundary and absence of migration/generated types.
- [x] 2026-10-11 01:00 IST — local server boundary: SQLite accounts/sessions/drafts/audit schema, opaque cookie session, owner-scoped commands and negative API tests.
- [x] 2026-10-11 01:05 IST — customer workspace and browser journey: create, switch workspace, save, refresh, sign out/in, isolate second account and deny signed-out API.
- [x] 2026-10-11 01:10 IST — evidence and tracker updated; hosted review remains pending.

## Decisions

- Use Node's built-in SQLite only for isolated local development. This avoids inventing a hosted project and keeps the future PostgreSQL adapter decision open.
- Use opaque random sessions rather than passwords. This is a test identity adapter, not production authentication or custom password cryptography.
- Keep buyer and seller as workspaces for the same customer account. Administrative permissions remain separate and absent.

## Discoveries

- React Router development requests `/favicon.ico`, which currently produces a non-blocking 404 in the server log.
- The local SQLite file persists through API restarts when the same explicit `STAYRELAY_DEV_DB_PATH` is used. It is not a hosted durability claim.

## Security, privacy, accessibility, and money impact

Only synthetic `.test` profiles and fictional reservation fields are accepted. Cookies are HttpOnly and SameSite=Lax; Secure is configurable for HTTPS. SQL statements are parameterized. Authorization is server-side and negative-tested. UI controls must remain keyboard reachable with named errors. No money, identity document, real address or external message is accepted.

## Tests and evidence

- `pnpm typecheck`: passed.
- `pnpm build`: customer and operations builds passed.
- `pnpm test:unit`: 13/13 passed, including disabled adapter, invalid real-domain account, persistence, ownership isolation, revoked session and re-sign-in.
- Chromium: create account, switch to seller, save draft, refresh, sign out/in, recover draft, second-account empty state and signed-out API 401 passed.
- Evidence: `docs/ai/evidence/sr-auth-persistent-draft.png` contains synthetic data only.

## Rollback and recovery

Revert the bounded server and client commits. Stop services started for testing. Remove only the exact local database file named by `STAYRELAY_DEV_DB_PATH` after preserving any required synthetic test evidence. No provider, production or money recovery exists in this scope.

## Handoff, blockers, and next task

Branch `task/sr-test-auth-persistent-drafts`; content head `847db21`; PR not created. Hosted authentication/database and Vercel preview remain unverified. Services started for testing were stopped. After this milestone, the next connected task is private synthetic evidence upload with quarantine/scanner simulation and owner-only access.
