# TASK-0003 — Assign accountable owners

**Phase:** P01 — Governance and repository control
**Workstream:** Project control and source governance
**Branch:** `task-0003/accountable-owners`
**Depends on:** TASK-0002
**Owner:** Technical Program Lead

## Deliverable

[Accountability and artifact ownership matrix](../project-control/OWNERSHIP-MATRIX.md) assigns exactly one accountable role to every current control, repository, product, experience, domain, data, money, transfer, service, external-system, production, and external-authority artifact class.

The matrix separates accountability from implementation and required review. It assigns unmapped repository artifacts to the Technical Program Lead by default, preventing gaps without inventing human identities. The named-assignment register leaves every unevidenced person `Unassigned` and identifies the production effects that remain blocked.

## Acceptance evidence

| Criterion | Evidence |
| --- | --- |
| Every decision/artifact has one accountable owner | Each matrix row has one accountable role; the default ownership rule covers unmapped repository artifacts. |
| Missing people are not invented | Named-assignment register uses `Unassigned in repository evidence`. |
| External authority remains explicit | Legal, tax, transfer policy, payment onboarding, account/domain, and first-admin evidence are separate gates. |
| Security and review are preserved | Responsible/reviewer columns require specialist evidence without creating shared accountability. |

## Validation and rollback

Validation consists of workbook dependency/row inspection, coverage review against the governing charter and provider inventory, single-accountable-role review, Markdown path review, and `git diff --check`.

No person, provider account, permission, secret, administrator, deployment, or production owner is created. Rollback is a bounded revert of the matrix, task evidence, tracker row, and handoff update.

