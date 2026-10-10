---
name: Bounded implementation flow
about: Plan one roadmap task or reviewable subtask with explicit evidence and rollback
title: "[TASK-###] "
---

## Task boundary

- TASK ID / bounded subtask:
- Objective and business rule:
- Controlling sources, exact sections, and ADRs:
- Repository / branch / base SHA / current head / PR:

Default bound: one subtask and branch, no more than one migration, five hand-edited files, and about 300 net non-generated lines. Split the task or create an ExecPlan when the bound is exceeded.

## Scope

- Included:
- Explicit non-goals:
- Owning modules:
- Files read:
- Expected edits:

## Current state

- Migration/schema head:
- Generated database types:
- Provider/account/project/environment verified by harmless read:
- Action type: local code | test | read-only provider check | dev/preview mutation | production-prohibited

Do not paste keys, tokens, credentials, customer data, booking evidence, identity documents, or bank details.

## Invariants and transitions

- Invariants:
- Allowed transitions:
- Forbidden transitions:
- Version/staleness checks:
- Idempotency/deduplication boundary:
- Fail-closed behavior:

## Impact review

- Security and authorization:
- Privacy, retention, and redaction:
- Data and migration:
- Money, ledger, and reconciliation:
- Accessibility, keyboard, and responsive UI:
- External provider and outage behavior:

## Acceptance evidence

- Acceptance criteria:
- Named negative/failure tests:
- Commands and environment:
- Browser/API/provider evidence:
- Human reviews required:

## Rollback and recovery

- Code rollback:
- Data/provider recovery:
- Duplicate money/message prevention:

## External blockers

- Exact missing evidence or permission:
- Accountable owner:
- Disabled feature gate:
- Next safe action:

## Definition of done

- [ ] Scope stayed bounded or an ExecPlan explains the split.
- [ ] Controlling sources and ADRs were re-read.
- [ ] Unrelated working-tree changes were preserved.
- [ ] Applicable typecheck, build, and focused tests passed.
- [ ] Negative/failure behavior was exercised for risk-critical paths.
- [ ] Migration, generated-type, provider, and environment state is explicit.
- [ ] Security, privacy, money, accessibility, and provider impacts are addressed.
- [ ] Rollback/recovery is concrete and provider IDs are verified before external action.
- [ ] Evidence and artifact links are attached without sensitive data.
- [ ] Required human review is recorded.
- [ ] `docs/ai/STATE.md` is updated with exact commit and blockers.

