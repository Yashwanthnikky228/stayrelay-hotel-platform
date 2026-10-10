# TASK-077 — Execution plans and bounded flow

**Branch:** `task-077/execution-plans`
**Dependency:** TASK-076 repository instructions

## Result

`PLANS.md` defines when a living ExecPlan is mandatory and the facts, ownership, invariants, milestones, evidence, rollback, and handoff each plan must contain. `.github/ISSUE_TEMPLATE/bounded-flow.md` provides the matching bounded task intake without requesting secrets or inventing labels and assignees.

Both files use the tested pnpm commands and distinguish local evidence, provider access, preview activity, and prohibited production effects.

## Acceptance and rollback

Acceptance is a documentation diff review against `AGENTS.md`, the current manifests, ADR-0002, and ADR-0003. No application, dependency, provider, or deployment state changes. Rollback is a bounded revert of the three TASK-077 files.

