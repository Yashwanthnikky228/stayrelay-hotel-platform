# TASK-0008 — Map the roadmap and task IDs

**Phase:** P01 — Governance and repository control  
**Workstream:** Project control and source governance  
**Branch:** `task-0008/roadmap-crosswalk`  
**Content commit:** `0c7c869821a33ae615262bbccf1af7c183eaaf5a`  
**Depends on:** TASK-0007  
**Owner:** Technical Program Lead

## Deliverable

[Roadmap and task-ID crosswalk](../project-control/ROADMAP-CROSSWALK.md) maps all 19 current phases and exact TASK-0001–TASK-1100 ranges, groups retained earlier-roadmap branches by evidence type, assigns candidate current destinations, and defines revalidation rules without renumbering historical work.

## Acceptance evidence

- Current phase ranges total 1,100 unique task IDs.
- The canonical tracker has no missing dependency IDs.
- Historical branch groups remain explicitly historical and preserved.
- Similar numbers or titles do not confer current completion.
- Reuse requires the current objective, deliverable, acceptance, dependency, environment and launch-gate checks.
- The active TASK-0001–TASK-0025 sequence and independent TASK-0026 entry are explicit.

## Validation and rollback

Validation compared the canonical workbook's phase boundaries, IDs, dependencies, workstreams and current status with the TASK-0005 branch inventory, TASK-0006 reconciliation, Git origin branches and durable handoff. Path review and `git diff --check` passed. No code, provider, deployment, task identifier, dependency or historical branch changed.

Rollback is a bounded revert of the crosswalk, this evidence record, TASK-0008 tracker fields and handoff row. Historical artifacts remain unchanged.

## Handoff

TASK-0009 is next and should define the minimum evidence package for every current task class.
