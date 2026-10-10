# TASK-0011 — Dependency and critical-path evidence

**Date:** 2026-10-10  
**Branch:** `task-0011/dependency-critical-path`  
**Content commit:** `985f272916f5c7793416912bed72ecad681df9ba`  
**Environment:** Planning / evidence; local cloud checkout  
**Migration state:** No migration or generated database type exists or changed

## Acceptance result

PASS. The canonical 1,100-row ledger was parsed as a directed graph. All 1,122 dependency references resolve, the graph has two roots and no cycle, and blocking versus parallel work is documented in [the dependency map](../project-control/DEPENDENCY-CRITICAL-PATH.md). The two currently dependency-ready rows are TASK-0011 and independent root TASK-0026.

The computed 537-task longest chain is a structural dependency chain only. No task durations exist, so this is not represented as a calendar schedule or proof of available capacity.

## Executed checks

| Check | Result |
| --- | --- |
| Workbook ID, dependency, root and topological validation | 1,100 unique tasks; 1,122 resolved edges; 2 roots; 1,100-node ordering |
| Longest-predecessor calculation | 537 nodes; terminal TASK-1100 |
| Current ready-set calculation | TASK-0011 and TASK-0026 |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; customer and operations production builds |
| `pnpm test:unit` | Pass; 9 tests, 0 failures |
| `git diff --check` | Pass before content commit |

The repository has no `pnpm test` script. The real, repository-defined test gate is `pnpm test:unit`; no nonexistent command is claimed.

## Boundaries and negative cases

- Readiness requires every declared predecessor to be `Done`; numeric adjacency is insufficient.
- A completed planning dependency does not prove review, merge, deployment, provider state, or production authority.
- Parallel tasks cannot bypass shared authority, environment, migration, provider, or approval gates.
- Vercel CLI, checkout linkage, account/project identity, deployment, and live URL remain unverified.
- GitHub native read/push transport works; API-backed PR/review/CI evidence remains unavailable.

## Files and rollback

Hand-edited files in the TASK-0011 record: the dependency map, this evidence record, `STATE.md`, and the canonical tracker. No application code, dependency, provider, environment, schema, or migration changed.

Rollback the documentation and TASK-0011 tracker cells together. Do not rewrite dependency history or mark downstream work ready without a separately reviewed controller correction.
