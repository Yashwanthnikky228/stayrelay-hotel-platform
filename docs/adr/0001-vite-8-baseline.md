# ADR-0001: Vite 8 baseline and exact patch

- **Status:** Accepted for the Vite toolchain decision only
- **Date:** 2026-10-09
- **Roadmap task:** TASK-003
- **Decision owner:** Engineering implementation record; does not replace founder approval for broader architecture decisions

## Context

The audited technical specification documents an older Vite 7 table as superseded and directs the project to the current Vite 8.x line; its implementation audit addendum also identifies Vite 8.x as the baseline. The repository manifest already declared `^8.0.0`, but the repository had no lockfile, so it did not identify an exact tested patch. Roadmap v3 TASK-003 requires resolving this discrepancy with evidence and pinning the tested patch in the lockfile and an ADR.

The controlling references are in [the canonical source map](../ai/SOURCES.md): the Technical Specification v1 toolchain section, the Volume 08 implementation audit addendum, and Roadmap v3 TASK-003.

## Decision

Use Vite **8.3.4** for this repository baseline. Pin it exactly in the root development dependencies and `package-lock.json`. Retain npm as the package manager already declared by the repository scripts and README. Do not infer that this resolves the other toolchain questions: React Router, TypeScript, React, deployment target, database, and edge-provider decisions remain governed by their own roadmap tasks.

## Evidence

- Audited Technical Specification v1 says Vite 8.x is current and its earlier Vite 7 baseline is superseded; the Volume 08 addendum repeats Vite 8.x as canonical baseline.
- The live repository manifest before this task declared Vite `^8.0.0` and Node `>=22.12.0`, with no lockfile.
- On 2026-10-09, `npm view vite@8 version --json` reported the 8.x release line through `8.3.4`; `npm view vite@8.3.4 engines --json` reported Node `^20.19.0 || >=22.12.0`.
- The execution runtime was Node `v24.19.0` and npm `11.9.0`.
- Installed/locked Vite resolved to `8.3.4` and `@vitejs/plugin-react` to `6.1.2`.
- Reproducibility and compatibility checks passed: `npm ci`, `npm run typecheck`, and `npm run build`.
- `https://vite.dev/releases` returned HTTP 403 from this environment; the version decision is cross-supported by the audited specification and registry package metadata. This HTTP response is not recorded as product or provider approval.

## Consequences

- `package.json` now exactly pins Vite 8.3.4; `package-lock.json` records the complete resolved npm dependency tree.
- Reproduce dependencies with `npm ci`, then run `npm run typecheck` and `npm run build`.
- Dependency updates must refresh the lockfile and rerun these checks.
- The package's engine range is compatible with Node 24.19.0. The product repository's broader Node/React/React Router/TypeScript runtime baseline is not fully resolved by this Vite-only ADR.
- Vite 7 is not the current implementation baseline; any future rollback requires a new, tested decision.
