# TASK-074 — Existing repository audit and history reconciliation

Date: 2026-10-09. Repository: `Yashwanthnikky228/stayrelay-hotel-platform`.
Branch: `task-074/repository-reconciliation`; base: `b99bc058dcdc2a97de1a125b7b7bfaf82439a899`.
Scope: read-only discovery, local installation/validation, and this record. No provider change.

## Controlling sources and handshake

Read Roadmap v3 TASK-074/075, audited V08 and V11, technical specification frozen decisions/tree, [source map](SOURCE-OF-TRUTH.md), [TASK-001](TASK-001-BASELINE.md), [TASK-004](TASK-004-PLATFORM-RECHECK.md), [ADR-0001](../adr/0001-vite-8-baseline.md), [ADR-0002](../adr/0002-architecture-decision-register.md), manifests, lockfile, API, shared contracts, routes, services, and prior branches' handoffs.

No migrations, generated database types, AGENTS.md, PLANS.md, or INVARIANTS.md exist at this base. Expected changes in this chunk: this audit and STATE.md only. Lifecycle transitions and live capabilities stay disabled.

## Live history supersedes the reported handoff

- Default branch `main` remains `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee`.
- Newer canonical chain: `task-002/canonical-source-map` → `task-003/vite-8-baseline` → `task-004/platform-recheck` → `task-005/architecture-decisions`.
- Latest architecture head: `b99bc058dcdc2a97de1a125b7b7bfaf82439a899`; it contains completed TASK-002/003/004/005 records. Continue from it; do not recreate those tasks or copy the parallel source map.
- Git `refs/pull/1/head` through `refs/pull/5/head` prove PRs exist. Observed PR heads: 1=`085f294`, 2=`4a48c75`, 3=`9ee5a72`, 4=`dc3babd`, 5=`c09fc96`. PR #5 ref differs from latest architecture branch head; current review/check/state requires API inspection.
- `gh pr list` and direct REST reads still fail with proxy/API Forbidden. Open/closed state and CI are unverified here. Do not create duplicate PRs for these tasks.
- Earlier parallel branches and their commits remain preserved remotely. The TASK-006 blocker remains valid: no callable Google Drive/spreadsheet connector is available. No canonical workbook was edited or duplicated.
- Named stash `preserve prior local StayRelay scaffold before TASK-002 baseline switch`, object `c18fe81`, remains intact. Its tracked README and untracked 43-file scaffold were inspected through Git objects, without applying or dropping it.

## Implemented capabilities and differences

| Area | Observed implementation | Required follow-up |
| --- | --- | --- |
| Web | Root `src/` Vite SPA, marketplace search and fictional non-bookable cards; passport empty state; operations disabled | Canonical specification uses `apps/customer`, `apps/operations`, `apps/api`, pnpm, Router 8 Framework Mode |
| API | Express 5; health 200, inventory 503, unknown routes 404; Vercel adapters under `api/` | Keep disabled inventory and privileged writes; verify API-first hosting before any preview |
| Domain | Shared TypeScript contracts, integer minor-unit Money, distinct eligibility/risk/payment/transfer/arrival | Persistence, version binding, auth and command invariants await dependent tasks |
| Toolchain | Node 24.19.0/npm 11.9.0; locked Vite 8.3.4, React 19.3.0, Router DOM 7.18.4, TS 5.9.3 | Exact runtime pin; pnpm lock; bounded Router 8/TS 6 compatibility repair |
| Providers | No verified current account/project/deployment configuration in this session | Earlier zero-project Supabase observation is historical, not a fresh account check |
| Tests | No committed test runner or CI at this base | Add meaningful local foundation checks within TASK-075; TASK-097 remains separately gated |

The stale scaffold contains reusable demo-only layouts, API client boundaries, and separate reserve-cash semantics. It also has incompatible Vite 6/Tailwind 4 and unsigned demonstration QR logic. Do not transplant its package files, simulated verification, operational metrics, or demo inventory as live truth. Reconcile useful concepts in bounded reviewed repairs; keep the stash as provenance.

Audit defects: the preview contribution subtracts earmarked reserve cash as an expense; aborted search results need request-identity checks. Hosting rewrites are a verification risk, not evidence of a deployed failure. Passport/operations disabled states are intentional until authorization and backend dependencies exist.

## Current official baseline crosscheck

Retrieved 2026-10-09 with TLS validation intact. Direct documentation sites are proxy-blocked; official GitHub source mirrors and registry metadata work. These support the existing TASK-004 findings; they do not verify provider accounts or certify conformance.

- Router `react-router@8.4.0` removes `react-router-dom`. Matching `@react-router/dev` supports Vite 7/8 and TS 5/6/7. [Tagged upgrade](https://raw.githubusercontent.com/remix-run/react-router/react-router%408.4.0/docs/upgrading/v7.md) and [SPA Framework guide](https://raw.githubusercontent.com/remix-run/react-router/react-router%408.4.0/docs/how-to/spa.md) establish `ssr:false`, build-time root prerender, and `build/client` output. Node minimum is 22.22.0.
- TS 6.0.3 passes a scratch strict compiler run on the existing app; [official notes](https://raw.githubusercontent.com/microsoft/TypeScript-Website/v2/packages/documentation/copy/en/release-notes/TypeScript%206.0.md). Adoption still needs the integrated framework build.
- Node 24.19.0 is the tested runtime, not the newest 24 patch; [official release index](https://nodejs.org/dist/index.json) identifies 24.21.0. No runtime upgrade in this audit.
- [Supabase region data](https://raw.githubusercontent.com/supabase/supabase/eeae6027d5dc658932c6bd496a8c13e0277b7fdb/packages/shared-data/regions.ts) lists Mumbai `ap-south-1`; project identity/selected region remain unverified.
- [Cloudflare production limits](https://raw.githubusercontent.com/cloudflare/cloudflare-docs/b55f5bdc6f5b36790bfc16dcb8ab7e842fc9df19/src/content/docs/workers/platform/limits.mdx): CPU free 10 ms/paid default 30 s/max 300 s; memory 128 MB/isolate. These are not Vercel quotas or actual account capacity.
- [ASVS stable release](https://raw.githubusercontent.com/OWASP/ASVS/5cf9b032440be53ce345ab3c130fda46ba1ce7a2/README.md) identifies 5.0.0; [WCAG recommendation configuration](https://raw.githubusercontent.com/w3c/wcag/1dfe1647bdecf32fb4f76b9ce1cc33139505630c/guidelines/respec-config.js) establishes REC/2024-12-12. Use stable releases rather than development branches.

## Executed acceptance

- `npm ci` with cache `/tmp/stayrelay-npm-cache`: passed, 301 packages.
- `npm run typecheck` and `npm run build`: passed, Vite 8.3.4, 34 modules.
- `npm exec --package=typescript@6.0.3 -- tsc --noEmit`: passed; separate `--version` confirmed 6.0.3. Manifest/lock unchanged.
- `npm run dev`: web 5173 and API 3000 started. Local requests: `/`, `/passport`, `/operations` HTML 200; `/api/health` JSON 200; `/api/properties` JSON 503; `/api/unknown` JSON 404. Stopped only this session's services.
- These HTTP checks verify startup and safe API responses, not browser hydration/accessibility or production routing.

Next: bounded audit repairs, then TASK-075 workspace/toolchain migration, TASK-076/077/078. TASK-079/080 require TASK-026 ownership/legal evidence; downstream schema, auth, transaction and preview tasks cannot be closed through synthetic fixtures.
