# TASK-0006 — Reconcile duplicates and stale copies

**Phase:** P01 — Governance and repository control  
**Workstream:** Project control and source governance  
**Branch:** `task-0006/reconcile-artifacts`  
**Content commit:** `7c6ab63ae0c13a140b330c23a7e14c60cf796796`  
**Depends on:** TASK-0005  
**Owner:** Technical Program Lead

## Deliverable

[Artifact reconciliation record](../project-control/ARTIFACT-RECONCILIATION.md) selects the controlling artifact for current execution while preserving the original uploaded workbook, earlier roadmap, default branch, stacked branches, historical branch variants, pull-request refs, hosting configuration, provider proposals, linked planning sources, and historical stash references.

## Acceptance evidence

| Criterion | Evidence |
| --- | --- |
| Canonical items are named | Current task control, repository continuation, deployed/provider truth, and linked-source authority each have an explicit controlling item. |
| Retained history is documented | Every conflicting set records the retained workbook, branch, ref, configuration, link, or historical identifier. |
| No data loss is introduced | No branch, workbook, ref, source link, commit, provider record, or stash object was deleted, reset, merged, or overwritten. |
| Numbering conflicts are contained | Earlier-roadmap branches remain reusable evidence but cannot satisfy 1,100-task rows without explicit mapping and revalidation. |
| External uncertainty is preserved | GitHub, deployment, provider, Drive, human-owner, legal, payment, domain, and administrator facts remain unverified until authoritative reads or approvals exist. |

## Validation and rollback

Validation compared the TASK-0005 inventory, canonical source hierarchy, repository handoff, exact workbook hashes/status, origin branch and PR refs, hosting files, provider inventory, and current environment limitations. Link/path checks and `git diff --check` passed. This documentation-only task does not alter runtime code; the frozen install, typecheck, both builds, and 9 unit tests passed on its TASK-0005 parent.

Rollback is a bounded revert of the reconciliation record, this evidence record, TASK-0006 tracker fields, and the handoff row. Reverting does not delete either workbook or any Git/external history.

## Handoff

TASK-0007 is next on the active governance chain and should baseline local, branch, main, preview, provider, and production state separately.
