# UI/UX brief TASK-092–TASK-100 — API and release readiness

**Date:** 2026-10-10

## Contract and data readiness

### TASK-092 — API contracts

The current API boundary has typed health and disabled-inventory responses. Future contracts must validate public catalogue/location reads, profiles, saved stays, seller drafts, evidence metadata, review queues and audit entries at the server boundary. Mutations require authorization, input validation, idempotency where relevant, safe errors and audit events.

### TASK-093 — RLS matrix

| Data | Owner scope | Operator scope | Public |
| --- | --- | --- | --- |
| Profile | Own profile only | Scoped support/admin view | None |
| Roles | Server/admin only | Read only where needed | None |
| Property | Server catalogue | Approved operator scope | Verified projection only |
| Reservation/evidence | Seller/buyer relation | Assigned review scope | None |
| Listing/decisions | Related parties | Review/risk scope | Eligible projection only |
| Saved stays/alerts | Own account | None | None |
| Audit events | None | Read scoped events | None |

No migration or RLS policy is applied because no approved non-production Supabase project is connected.

### TASK-094 — Data models

Blocked until a connected non-production database is confirmed. Fixtures remain visibly fictional and non-bookable.

### TASK-095 — Realtime/polling

The safe interim contract is read-only polling with abortable requests, stale-state messaging, reconnect backoff and permission-change handling. No realtime provider is enabled.

### TASK-096 — Error taxonomy

Existing API responses cover `NOT_FOUND`, `METHOD_NOT_ALLOWED` and `INVENTORY_NOT_CONFIGURED`. UI copy maps these to truthful route-not-found, read-only, and live-inventory-not-connected states. Future errors must include validation, forbidden, conflict, rate-limit, unavailable and unexpected categories without leaking secrets or record existence.

## Quality and release evidence

### TASK-097

`PNPM_CONFIG_STORE_DIR=/tmp/stayrelay-pnpm-store pnpm typecheck`, `pnpm build`, and `pnpm test:unit` pass on the current branch; the unit suite reports 9 passing tests. No claim is made for a missing lint, e2e, migration or RLS command.

### TASK-098

Responsive and accessible patterns are implemented in the shared primitives and route shells: skip links, focus rings, minimum targets, reduced-motion CSS, labelled states and mobile reflow. A full 320/768/1024/1440 visual review requires a browser capture tool that is not available in this runtime.

### TASK-099

Current builds use route code splitting and lazy media loading with explicit dimensions. Remaining review items are font loading, LCP/CLS measurement, map deferral and consent-aware analytics; no production performance budget is claimed.

### TASK-100 — Release-candidate report

The current branch is a UI/UX release-candidate foundation, not a public launch. Completed surfaces include marketplace, public information, safe auth screens, buyer/seller shells, Passport, operations shells, shared primitives and fail-closed API behavior. Deferred items include Supabase auth/database/RLS, private evidence storage, maps, email, payment, live inventory, transfer confirmation, payout, GitHub review/CI verification and Vercel deployment verification.

Rollback is the last bounded commit on `task-0016/evidence-linkage`; no provider or production state was mutated.
