# TASK-0004 — Define decision rights

**Phase:** P01 — Governance and repository control
**Workstream:** Project control and source governance
**Branch:** `task-0004/decision-rights`
**Depends on:** TASK-0003
**Owner:** Technical Program Lead

## Deliverable

[Decision-rights register](../project-control/DECISION-RIGHTS.md) defines three decision classes, the proposal/consultation/approval path for repository, product, design, domain, data, identity, evidence, eligibility, risk, money, provider, AI, operations, production, and external-authority decisions, plus blocking, escalation, and emergency rules.

## Acceptance evidence

| Criterion | Evidence |
| --- | --- |
| Approval responsibilities are clear | Decision matrix names one final accountable role for each decision class. |
| Consultation responsibilities are clear | Required consultation column identifies specialist review without shared accountability. |
| Escalation responsibilities are clear | Escalation path names domain, technical, and external-authority levels and keeps unassigned authority blocked. |
| Production/external authority is protected | Class C requires the named accountable human or authoritative external evidence. |
| Emergency authority is bounded | Emergency section permits narrow containment while requiring audit, recovery and post-incident review. |

## Validation and rollback

Validation consists of workbook dependency/row inspection, comparison with the charter and ownership matrix, single-final-approver review, Markdown path review, and `git diff --check`.

No access, provider, production, payment, administrator, or emergency action is performed. Rollback is a bounded revert of the register, evidence record, tracker row, and handoff update.

