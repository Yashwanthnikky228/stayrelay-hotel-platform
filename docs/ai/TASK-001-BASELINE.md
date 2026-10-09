# TASK-001 Repository Baseline

**Task:** TASK-001 — Canonical baseline  
**Audit date:** 2026-10-09  
**Repository:** https://github.com/Yashwanthnikky228/stayrelay-hotel-platform  
**Default branch:** `main`  
**Observed base commit:** `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee`  
**Audit mode:** Read-only GitHub/Vercel inspection before documentation-only change  
**Scope:** Repository and deployment evidence only; no product behavior or external provider settings changed.

## Executive finding

The connected GitHub repository is the StayRelay code repository. It contains an early Vite/React/TypeScript guest marketplace, an Express API scaffold, shared TypeScript domain contracts, and Vercel function adapters. A Vercel project is linked and reports a READY deployment for the observed `main` commit.

This is implementation evidence for a starter/prototype, not evidence of a production-ready reservation platform. The inspected repository has no database migrations, generated database types, lockfile, automated test suite, CI workflow, or recorded GitHub Actions run for the observed commit. Inventory, authentication, booking, payments, reservation transfer, check-in verification, claims, and payouts are not established as working server-authoritative flows by the inspected code or deployment metadata.

## Repository facts observed

### Source and history

- Repository URL: https://github.com/Yashwanthnikky228/stayrelay-hotel-platform
- Visibility: public; authenticated connection reports admin/push access.
- Default branch: `main`; branch protection is disabled and no required checks are configured.
- HEAD: `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee` — “Separate live offers from design fixtures.”
- The available workspace does not contain a local Git checkout, so no local working-tree status or terminal Git commands were available.

### Toolchain and package manager

- Root package declares npm workspaces for `packages/domain` and `apps/api`; scripts and README use `npm`.
- No `packageManager` field or lockfile (`package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`) is present. Exact resolved dependency versions are therefore unverified.
- `package.json` declares Node `>=22.12.0`, React/React DOM `^19.3.0`, React Router DOM `^7.0.0`, Vite `^8.0.0`, TypeScript `~5.9.0`, Tailwind CSS `^3.4.17`, Express `^5.1.0`, and `@vercel/node` `^5.0.0`.
- These are declared ranges, not confirmation of the current TASK-003/TASK-004-approved versions. TASK-003/TASK-004 remain open.

### Root tree

```text
.
├── api/                         Vercel health and property function adapters
├── apps/api/                    Local Express API workspace
├── packages/domain/             Shared TypeScript domain contracts
├── src/
│   ├── components/marketplace/  Search, property cards, economics preview
│   ├── data/                    Design-preview fixtures
│   ├── layouts/                 Application shell
│   ├── pages/                   Marketplace, Passport, Operations
│   ├── services/                Marketplace API client
│   └── types/                   Frontend types
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

The complete recursive tree was inspected. No `AGENTS.md`, `PLANS.md`, ADR directory, `.github/workflows/`, migration directory, generated database types, `.env.example`, or lockfile is present.

### Implemented modules observed

- Marketplace: destination/date/guest search, filtering, property cards, and a unit-economics preview for clearly identified fictional design fixtures.
- Passport: empty-state page only.
- Operations: placeholder page only.
- API: local Express health endpoint; property search returns a typed not-configured response unless verified inventory is implemented. Vercel function adapters exist under `api/`.
- Domain: shared TypeScript contracts. No database is present to establish persisted records or state transitions.
- The README explicitly says no booking, authentication, payment, QR credential, or operator action is enabled.

### Tests, CI, and environment

- Declared checks: `npm run typecheck` and `npm run build`; API workspace declares `npm run dev`.
- No `test` script, test files, or CI workflow were found.
- GitHub Actions reports no workflow runs associated with the observed commit.
- These commands were not executed: there is no local checkout in the available workspace, and remote GitHub inspection does not execute repository commands.
- Known failing tests: none are recorded in repository CI because no workflow runs/tests were found. This does not establish that the code passes.
- No tracked environment example or provider configuration was found. The ignored `.env*` pattern is present in `.gitignore`; actual runtime variables/provider modes were not inspected or inferred.

### Deployment configuration observed

- `vercel.json` declares `npm run build`, output directory `dist`, and an SPA rewrite to `/index.html`.
- Vercel project `stayrelay-hotel-platform` exists and is linked to the repository.
- Vercel reports deployment `dpl_Gjeq3h3JJZXoQCpeeKARbe6LRrQN` as READY/production for commit `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee`: https://stayrelay-hotel-platform-j2byuiy6k-yashwanthnikky228.vercel.app
- A READY deployment confirms deployment status only; no end-to-end inventory, booking, database, provider, security, or pilot behavior was verified.

## Comparison with canonical baseline

The inspected starter aligns with the planning baseline in using a Vite/React frontend, modular Node API, and shared contracts, and it fails closed when verified inventory is not configured. The deployment and repository are now linked evidence and should be treated as existing assets, not as proof that production implementation or launch gates are complete.

Open baseline gaps for later roadmap tasks include exact dependency lock/pinning, the Vite/toolchain decision, canonical architecture decisions, database and migration evidence, generated database types, CI/test evidence, role and environment configuration, and verified server-authoritative transaction flows. Do not resolve these gaps by guessing during TASK-001.

## Discovery record

Read-only calls inspected the repository list/metadata, default branch, recursive Git tree, recent commit metadata, key manifests/configuration/README/API files, GitHub workflow runs for the observed SHA, Vercel project listing, and Vercel deployments. No database, provider, deployment, or source configuration was mutated during discovery.
