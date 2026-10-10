# TASK-076 — Repository instructions

**Branch:** `task-076/repository-instructions`
**Dependency:** TASK-075 foundation decision
**Scope:** root instructions for future repository work

## Inputs reviewed

- Roadmap v3 TASK-076 and the execution-safety requirements in V11/V12
- `docs/ai/SOURCE-OF-TRUTH.md` and the current handoff
- ADR-0002 and ADR-0003
- actual root and application manifests, scripts, routes, and module layout
- current fail-closed API and non-bookable interface behavior

## Result

`AGENTS.md` now records the tested toolchain and real commands, current module ownership, reservation trust vocabulary, fail-closed rules, money/time/security invariants, provider boundaries, bounded-change workflow, and evidence-based definition of done.

It deliberately does not claim lint, E2E, migration, CI, provider preview, database, auth, payment, accessibility-conformance, or production gates that are not implemented or verified.

## Acceptance and rollback

Acceptance is a documentation diff/link review against the current manifests and ADRs. No application behavior, dependencies, provider settings, or deployment state changes. Rollback is a bounded revert of `AGENTS.md` and this task record.

