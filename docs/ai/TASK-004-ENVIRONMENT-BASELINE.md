# TASK-004 — Runtime, framework, provider, and standards recheck

**Status:** Partially verified; blocked on authoritative documentation/provider evidence for several checklist items  
**Date:** 2026-10-09  
**Branch/base:** `task-004-environment-baseline`, based on `task-003/vite-baseline` at `5814d7b77651d136df1edbfc57e6eabc93ee9b03`  
**Scope:** Read-only environment and version audit; no dependency or provider configuration changes.

## Roadmap requirement and controlling references

Roadmap v3 TASK-004 calls for a current recheck of Node 24, React 19.3, React Router v8, Vite 8, TypeScript 6.0 / 5.9 fallback, Supabase Mumbai availability, Cloudflare limits, OWASP ASVS 5.0, and WCAG 2.2 before bootstrap. Canonical source precedence and artifact paths are in [`SOURCES.md`](SOURCES.md); the technical specification and Volume 08 addendum set the audited planning baseline.

## Repository handshake

- **Repository:** `Yashwanthnikky228/stayrelay-hotel-platform`, remote `origin`.
- **Base commit:** `5814d7b77651d136df1edbfc57e6eabc93ee9b03`, TASK-003 branch; audited `main` is `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee`; TASK-001 baseline is `085f2944c5a0e519ee4b92b2be923d14eeb891c7`.
- **Current branch:** `task-004-environment-baseline`.
- **Migration/schema head:** none; no migrations or generated database types.
- **Governance read:** `docs/ai/STATE.md`, `SOURCES.md`, TASK-001/002/003 records, and ADR-0001. No `AGENTS.md`, `PLANS.md`, `INVARIANTS.md`, or other ADR was found at the TASK-001 baseline.
- **Files read:** root `package.json`, `package-lock.json`, current domain/API/web source-tree inventory, Node release page, package registry metadata, and the Roadmap v3 TASK-004 and relevant audited toolchain sections.
- **Files changed:** this read-only audit record and `docs/ai/STATE.md` only.
- **Domain invariants / transitions:** none changed. No provider or application configuration changed.

## Evidence verified

| Area | Current evidence | Result |
| --- | --- | --- |
| Node.js | Runtime `v24.19.0`; root engine range is `>=22.12.0`; the official Node previous-releases page was reachable and identifies the 24 line as Krypton. | Runtime satisfies the declared range and the documented 24.x target. Exact runtime pinning/CI remains open. |
| React | Registry reports `react@19.3.0`; lock resolves `react` and `react-dom` to `19.3.0`; manifest range is `^19.3.0`. | Version line is present and installed. |
| React Router | Registry provides `react-router@8.4.0` (Node `>=22.22.0`, React/React DOM `>=19.2.7`), but `react-router-dom@8` has no matching release. Current lock resolves `react-router-dom@7.18.4`, and source imports the v7 package. | **Mismatch:** audited Framework Mode target is v8, but this checkout remains on v7 and needs an explicit package/API migration decision. No migration was attempted in this audit task. |
| Vite | Exact pin `8.3.4`; TASK-003 ADR and lock evidence. | Verified and tested on Node 24.19.0. |
| TypeScript | Registry lists `6.0.2` and `6.0.3`; repository currently resolves `5.9.3` from `~5.9.0`. | TS 6 is available, but project compatibility CI for TS 6 has not been run. TS 5.9 fallback remains unverified as an intentional fallback decision. |
| Supabase / Mumbai | Volume 08 audited addendum records `ap-south-1` (Mumbai) as the intended region. No Supabase project/configuration is present in this checkout. | The historical planning claim is recorded; current regional documentation and actual project/account region were not verified. |
| Cloudflare | Audited docs identify Cloudflare as intended edge direction; this repo has Vercel config and no Wrangler/project config. | Current limits and account/project configuration were not verified. |
| OWASP ASVS | The technical specification names ASVS 5.0.0. | The current official release/checklist was not rechecked; no compliance evidence is present. |
| WCAG | The technical specification targets WCAG 2.2 AA. | Current W3C success criteria were not rechecked; no accessibility audit evidence is present. |

## Source-access outcomes and exact blockers

- Successful registry checks: `npm view react@19.3 version --json`; `npm view react-router@8.4.0 engines peerDependencies --json`; `npm view typescript@6 version --json`; and `npm view react-router-dom@7.18.4 engines peerDependencies --json`.
- The `react-router-dom@8` registry lookup returned npm 404: the package name has no v8 version. A React Router v8 change therefore needs to use and validate the documented v8 package/API, or a written decision to retain v7. It must not be guessed as a one-line package rename.
- Read-only requests to official React, React Router, Supabase, Cloudflare, OWASP, and W3C documentation returned curl status `000` (no HTTP response from this environment). Only the official Node release page returned HTTP 200. The Vite page's earlier HTTP 403 is documented in ADR-0001.
- No authenticated Supabase or Cloudflare account/status connector is available in this task. Public documentation alone would not establish the configured project region, account limits, or enabled services.

**Evidence needed to close the blocked parts:** reachable current official React Router migration/framework-mode documentation and compatibility build; current official Supabase region page plus read-only project-region evidence or a documented “no project yet”; current Cloudflare Workers limits page plus read-only plan/config evidence or a documented “not selected”; current OWASP ASVS 5.0 release/checklist; current W3C WCAG 2.2 criteria. Do not request or place credentials in chat/source control. If provider accounts do not exist, record that explicitly rather than fabricating configuration.

## Controls and next work

No dependency changes, provider calls, migrations, database selection, or feature enablement occurred. Live listing, checkout, payment, passport verification, refunds, payouts, and privileged operations remain disabled. TASK-005 depends on TASK-004 and must wait until the decision inputs are resolved. TASK-006 independently depends on TASK-002 and remains eligible for source-register work.
