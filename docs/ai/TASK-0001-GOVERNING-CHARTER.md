# TASK-0001 — Establish the governing charter

**Phase:** P01 — Governance and repository control
**Workstream:** Project control and source governance
**Branch:** `task-0001/governing-charter`
**Owner:** Technical Program Lead
**Environment:** Planning / evidence

## Deliverable

[StayRelay governing charter](../project-control/GOVERNING-CHARTER.md) defines repository execution authority, product scope, exclusions, server-authoritative state, production boundaries, security/privacy/money rules, evidence requirements, and current blockers.

The exact 1,100-task workbook is retained in `docs/project-control/StayRelay_Exact_1100_Task_Production_Tracker.xlsx`. It supersedes the earlier 180-task roadmap for execution IDs and dependency order while preserving prior work as historical evidence.

## Acceptance evidence

| Criterion | Evidence |
| --- | --- |
| Authority is explicit | Charter “Execution authority” names routine repository authority and the external actions requiring specific evidence or approval. |
| Scope and exclusions are explicit | “Product scope,” “Production boundary,” and external-action list distinguish the intended product from currently disabled behavior. |
| Server authority is explicit | “Server-authoritative truth” records the lifecycle, distinct trust states, eligibility/risk separation, and fail-closed behavior. |
| Evidence is linked | This record links the charter; the tracker row records the repository evidence path and content commit. |
| Critical issues are visible | “Current disclosed blockers” identifies GitHub API, provider, sourcebook, database/auth/payment/legal/admin/domain/release gates. |

## Validation and rollback

Validation consists of workbook controller/row inspection, repository/branch inspection, Markdown link review, and `git diff --check`. This task changes governance artifacts only and makes no provider, deployment, schema, credential, or production mutation.

Rollback is a bounded revert of the charter, task record, source-map update, tracker addition, and handoff update. Prior historical task evidence remains preserved.

