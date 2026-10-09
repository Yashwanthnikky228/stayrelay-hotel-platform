# TASK-003 — Resolve the Vite baseline

**Status:** Complete for Vite version selection, exact pin, and repository build evidence  
**Date:** 2026-10-09  
**Branch/base:** `task-003/vite-baseline`, based on `task-002/canonical-planning` at `4a3d92441b7999ce964f333cecdbd3e0b84c6a4a`  
**Current implementation decision:** Vite 8.3.4, exact-pinned; see [ADR-0001](../adr/0001-vite-8-baseline.md).

## Task scope and controlling sources

Roadmap v3 TASK-003 requires resolving the Vite 7 versus Vite 8 contradiction and pinning the tested exact patch in the lockfile and an ADR. Controlling evidence reviewed:

- `06_PRODUCT_AND_REQUIREMENTS/Technical_Specifications/StayRelay_Master_Technical_Interactive_Specification_v1/`, toolchain baseline section (Vite 8.x; earlier Vite 7 baseline superseded).
- `12_REPORTS/Research_Report/StayRelay_Master_Dossier/StayRelay_Dossier_Library/01_CANONICAL_AUDITED_VOLUMES/08 — StayRelay V08 — Engineering Architecture APIs Data Security — Audited 2026-10-09.docx`, implementation-audit addendum (Vite 8.x baseline).
- Roadmap v3 TASK-003 and canonical precedence in [`SOURCES.md`](SOURCES.md).

## Repository handshake

- **Repository:** `Yashwanthnikky228/stayrelay-hotel-platform`, `origin` fetch remote `https://github.com/Yashwanthnikky228/stayrelay-hotel-platform.git`.
- **Base commit:** TASK-002 state commit `4a3d92441b7999ce964f333cecdbd3e0b84c6a4a`; live audited `main` remains `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee`; TASK-001 baseline is `085f2944c5a0e519ee4b92b2be923d14eeb891c7`.
- **Branch:** `task-003/vite-baseline`.
- **Migration/schema head:** none; no migrations or generated database types exist in the baseline tree.
- **Governance files:** `docs/ai/STATE.md`, `SOURCES.md`, and TASK-002 record were read. No `AGENTS.md`, `PLANS.md`, `INVARIANTS.md`, or pre-existing ADR was present; TASK-003 adds Vite-only ADR-0001.
- **Files read:** root `package.json`, `README.md`, `vite.config.ts`, workspace package manifests, domain/API source tree listing, TASK-001 baseline, TASK-002 source map/handshake, and relevant audited specification text.
- **Files changed:** root `package.json`, generated `package-lock.json`, `docs/adr/0001-vite-8-baseline.md`, this task record, and `docs/ai/STATE.md`.
- **Domain invariants / transitions:** none changed; this is toolchain and documentation work only.
- **Provider mode / external assumptions:** no provider was used or configured. The Vite documentation release page returned HTTP 403; registry metadata and audited project specifications supplied the version/runtime evidence instead.
- **Acceptance commands:** exact resolved Vite version check, `npm ci`, `npm run typecheck`, `npm run build`, and local web/API startup with HTTP smoke requests. Outcomes are recorded in `STATE.md`.

## Resolution and remaining scope

The earlier Vite 7 table is superseded by the later audited Vite 8 direction. Registry evidence on the audit date listed Vite 8.3.4 and declared Node `^20.19.0 || >=22.12.0`; the environment ran Node 24.19.0. Vite is now exact-pinned at 8.3.4 and the npm lockfile resolves the full dependency tree. This task does not settle React Router v8, the broader React/TypeScript baseline, Cloudflare/Supabase service state, or any provider approval; those stay in their roadmap tasks.
