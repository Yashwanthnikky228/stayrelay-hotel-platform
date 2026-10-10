# TASK-0012 — Branch and environment policy evidence

**Date:** 2026-10-10  
**Branch:** `task-0012/branch-environment-policy` (stacked on TASK-0011)  
**Content commit:** `a8c6a8d745d3f439e9ab525afa5660f3b8241599`  
**Environment:** Planning / evidence; local cloud checkout  
**Migration state:** None; no generated database types

## Acceptance result

PASS for the repository policy. [The branch and environment standard](../project-control/BRANCH-ENVIRONMENT-POLICY.md) separates task branches, reviewed integration, immutable releases, local, preview, staging, and production. It defines promotion evidence, application isolation, failure behavior, and rollback.

Hosted enforcement is not claimed. Vercel CLI/link/account/project/deployment evidence is absent, GitHub API-backed PR/review/CI evidence is unavailable, and production promotion is blocked.

## Executed evidence

| Check | Result |
| --- | --- |
| Repository/ADR/config inspection | Root and operations Vercel boundaries mapped; provider state remains unverified |
| Branch and environment negative cases | Production secrets in preview, unreviewed promotion, environment mismatch, secret exposure, and deployment failure fail closed |
| `pnpm typecheck` | Pass |
| `pnpm build` | Pass; customer and operations production builds |
| `pnpm test:unit` | Pass; 9 tests, 0 failures |
| `git diff --check` | Pass before content commit |

The repository has no `pnpm test` script; `pnpm test:unit` is the real test gate.

## Change and rollback

This task changes documentation, handoff state, and its tracker row only. It does not install a provider CLI, create/link a project, set a secret, deploy, merge, or mutate an external environment.

Rollback is a repository revert plus reversal of TASK-0012 tracker fields. No external rollback is required.
