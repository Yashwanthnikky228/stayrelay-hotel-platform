# TASK-0002 — Map canonical sources

**Phase:** P01 — Governance and repository control
**Workstream:** Project control and source governance
**Branch:** `task-0002/canonical-source-hierarchy`
**Depends on:** TASK-0001
**Owner:** Technical Program Lead

## Deliverable

[Canonical source hierarchy](../project-control/SOURCE-HIERARCHY.md) defines the precedence and proof boundaries for direct authority, the 1,100-task controller, implemented repository evidence, server/provider truth, audited control documents, current specifications, official external documentation, historical work, and research/prototypes.

The existing [planning-source map](SOURCE-OF-TRUTH.md) remains the detailed link register. This task adds the conflict-resolution rules needed to use it with the new controller without renumbering or discarding prior evidence.

## Acceptance evidence

| Criterion | Evidence |
| --- | --- |
| Current audited sources outrank drafts and duplicates | Hierarchy sections 4, 5, and 8 define audited, specification, research, prototype, duplicate, and historical status. |
| Server-confirmed state is authoritative | Sections 2 and 3 distinguish commit/runtime evidence from exact provider/server reads and reject screenshots, badges, redirects, fixtures, CRM, AI, and QR previews as authority. |
| Evidence is linked | The hierarchy links the planning map; this record and the tracker link the hierarchy and exact content commit. |
| Critical issues are visible | “Known source gaps” records the missing embedded sourcebook, unavailable Drive/provider reads, linked-only documents, and GitHub API denial. |
| Prior work is preserved | Section 7 keeps the earlier 180-task evidence without treating similar numbers/titles as automatic completion. |

## Validation and rollback

Validation consists of workbook dependency/row inspection, comparison with the existing source map, Markdown path review, and `git diff --check`. No provider, deployment, database, credential, or production state changes.

Rollback is a bounded revert of the hierarchy, task evidence, source-map reference, tracker row, and handoff update.

