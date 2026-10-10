# UI/UX-first 100-task scope reconciliation

**Brief tasks:** 002–003  
**Date:** 2026-10-10  
**Status:** Complete

The UI/UX-first brief is an execution layer for the visible product and portal foundation. It does not replace the canonical 1,100-task ledger or historical governance evidence. Brief task numbers are scoped to the brief and are recorded with the `UI/UX brief` prefix.

## Scope decision

- Preserve the evidence-backed reservation-transfer product boundary.
- Improve public discovery, buyer/seller workflows and operations entry surfaces in dependency order.
- Keep inventory, eligibility, risk, transfer, payment, payout, identity evidence and admin authorization server-owned.
- Use fictional fixtures only when visibly labelled `Demo` / `not bookable`.
- Defer provider-dependent activation until exact account, project, contract, credential and approval evidence exists.
- Treat `/admin/login` as an entry shell, never as evidence of authentication or authorization.

## Source reconciliation

The brief aligns with repository instructions, ADR-0002, ADR-0003, the source hierarchy and the current route audit. The brief's visual system may guide UI implementation, while legal, payment, provider, inventory and production decisions remain governed by the canonical control set.

## Toolchain audit (brief task 003)

| Area | Observed baseline |
| --- | --- |
| Runtime | Node `24.19.0` range; pnpm `11.19.0` manifest; lockfile present |
| Customer | React Router Framework Mode 8.4, Vite 8.3.4, TypeScript 6; `apps/customer` |
| Operations | Separate React Router/Vite app; `apps/operations` |
| API | Express 5 host in `apps/api`; `/api/health`, disabled `/api/properties` |
| Shared UI | `packages/ui` Tailwind 3.4 tokens and global CSS |
| Shared domain | `packages/domain` typed contracts |
| Commands | `pnpm typecheck`, `pnpm build`, `pnpm test:unit`; no root lint/e2e/migration command |
| Current route behavior | Captured in [TASK-001 audit](UIUX-BRIEF-TASK-001-ROUTE-AUDIT.md) |

No manifest, lockfile, dependency, or provider change was needed for these tasks.
