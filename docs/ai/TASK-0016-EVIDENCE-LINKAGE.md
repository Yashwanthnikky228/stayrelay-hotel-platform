# TASK-0016 — Repository and external evidence linkage

**Status:** Complete  
**Date:** 2026-10-10  
**Branch:** `task-0016/evidence-linkage`  
**Owner:** Technical Program Lead

## Delivered

- Added the maintained [evidence linkage register](../project-control/EVIDENCE-LINKAGE.md).
- Linked every completed canonical task from TASK-0001 through TASK-0015 to its two repository artifacts and recorded content commit.
- Classified evidence as repository verified, server verified, user-supplied handoff, or blocked/unverified.
- Recorded exact remote Git state and exact user-supplied Vercel deployment identifiers without promoting either Vercel claim to current server verification.
- Kept GitHub review/CI, Vercel authentication, provider identity and production authority gaps visible.

## Acceptance mapping

| Acceptance criterion | Evidence |
| --- | --- |
| Every completed item points to durable source evidence | The register contains 15 completed-task rows. All 30 linked paths exist. |
| Evidence is linked | Each row links its control artifact and task acceptance record; the tracker remains the canonical execution ledger. |
| Authoritative state is server-confirmed | Remote `main` and `task-0015/control-register` were confirmed through native Git. External states that could not be authoritatively read are explicitly classified below server verified. |
| No unresolved critical issue is hidden | The external authority ledger and open-issues section retain GitHub, Vercel, provider, human-approval and release blockers. |

## Verification performed

- Read TASK-0016 directly from the canonical workbook and confirmed dependency TASK-0015 is `Done`.
- Confirmed all 30 evidence paths for TASK-0001 through TASK-0015 exist.
- Confirmed all 15 recorded content commits resolve and are ancestors of the TASK-0016 base.
- Confirmed remote `main` and `task-0015/control-register` both resolved to `c2e337e4a083ceac61e890c4c02d6d7865c9edf6` on 2026-10-10.
- Confirmed no `VERCEL_*` variables are present in this runtime. Public URL attempts were stopped by an outbound proxy `CONNECT 403`, so they were not treated as deployment results.
- Reviewed repository links and the bounded diff. Application code and dependencies are unchanged; the validated TASK-0015 application checks are reused under the documentation-only rule in the completion checklist.

## External state decision

The user handoff supplies exact customer and operations Vercel deployment IDs and reports both READY from the current Git commit. Those records are retained as user-supplied external evidence. An authenticated Vercel read is still required before they can satisfy a release or production gate.

No provider mutation, deployment, merge, production approval, or secret change was performed.

## Rollback

Delete the evidence linkage register, remove `CTRL-026`, and revert the TASK-0016 tracker and handoff fields. Existing task evidence remains unchanged.
