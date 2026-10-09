# TASK-004 — Platform and standards recheck

**Checked:** 2026-10-09  
**Repository baseline:** TASK-003 branch, Vite 8.3.4 lockfile  
**Scope:** Recheck the runtime/framework/toolchain and platform assumptions in Roadmap v3. This records current public evidence and observed repository/account state. It does not certify provider availability, production readiness, legal compliance, or standards conformance.

## Findings

| Area | Current source / observed state | Decision and limit |
|---|---|---|
| Node.js | Node 24 is LTS on the official release table. Local verification used Node v24.19.0 and npm 11.9.0. `package.json` requires Node >=22.12.0. | Keep Node 24 as the verified development baseline; retain the existing engine range pending the deployment/runtime ADR. Production should use an Active or Maintenance LTS line. |
| Vite | TASK-003 pins Vite 8.3.4 and verifies install, typecheck, and build with Node 24.19.0. | Resolved by ADR-0001. |
| React | React 19.3.0 is declared and resolves from the lockfile. React's official 19.3 release is available. | Current baseline is aligned. |
| React Router | Official changelog lists 8.4.0. The repository declares `react-router-dom` ^7.0.0; the lock resolves 7.18.4. | **Version mismatch.** Do not claim Router v8 support. Keep current version until a bounded migration reviews API changes, route behavior, and tests. No router upgrade in this task. |
| TypeScript | Official TypeScript 6.0 release notes are published. Repository declares `~5.9.0`; the lock resolves 5.9.3. The roadmap allows a 5.9 fallback. | Keep 5.9.3 as the tested compatibility fallback. Schedule TypeScript 6 as a separate compatibility slice; do not promote it without typecheck/build evidence. |
| Supabase region | Official region documentation lists South Asia (Mumbai), AWS `ap-south-1`, as a specific region. The connected Supabase integration returned zero projects. | Mumbai is publicly available, but there is no configured StayRelay project to verify its actual region, plan, settings, or data residency. Create/configure nothing as part of this recheck. |
| Cloudflare Workers | Official limits page documents plan-dependent limits. For example, HTTP request CPU time is 10 ms on Workers Free and defaults to 30 seconds on Workers Paid; the paid maximum can be raised to five minutes. Request body limits depend on the Cloudflare account plan. | No Cloudflare project/plan configuration is present in this repository or accessible through the connected tools. Do not assume limits or architecture fit; confirm account plan and target workload before selecting Workers for API workloads. |
| Application security | OWASP reports ASVS 5.0.0 released 2025-05-30. | Use ASVS 5.0.0 as a verification checklist baseline. This repository has not been audited against it; citing a standard is not a compliance claim. |
| Accessibility | WCAG 2.2 is a W3C Recommendation dated 2024-12-12. | Adopt WCAG 2.2 AA as the product verification target per planning guidance. No repository-level or human accessibility audit has established conformance. |

## Evidence and verification

- Repository inspection: `node --version`, `npm --version`, `npm ls vite react react-dom react-router-dom typescript --depth=0`.
- Observed versions: Node `v24.19.0`, npm `11.9.0`, Vite `8.3.4`, React/React DOM `19.3.0`, React Router DOM `7.18.4`, TypeScript `5.9.3`.
- Supabase account-level check: connected integration returned an empty project list.
- Public references:
  - [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
  - [React 19.3 release](https://react.dev/blog/2026/09/09/react-19-3)
  - [React Router changelog](https://reactrouter.com/changelog)
  - [TypeScript 6.0 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
  - [Supabase available regions](https://supabase.com/docs/guides/platform/regions)
  - [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
  - [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
  - [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/)

This task was documentation and read-only account inspection. No dependencies, provider settings, database schema, migrations, secrets, or deployments were changed.

## Follow-up

- Carry the Router 7 → 8 mismatch into the routing compatibility task; validate on an isolated branch before changing the router.
- Evaluate TypeScript 6 separately against the existing strict typecheck and build; retain 5.9.3 if a real incompatibility blocks the upgrade.
- Before backend/provider implementation, verify the actual Supabase project/region and Cloudflare account plan/settings. Keep provider-dependent features disabled until required configuration and approvals are evidenced.
- Maintain WCAG 2.2 AA and ASVS 5.0.0 as verification targets; schedule actual automated and human review during implementation.
