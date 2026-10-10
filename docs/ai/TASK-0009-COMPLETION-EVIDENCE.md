# TASK-0009 — Define completion evidence

**Phase:** P01 — Governance and repository control  
**Workstream:** Project control and source governance  
**Branch:** `task-0009/completion-evidence`  
**Content commit:** `8d30f0f7e3ec5bf587288ecf6ac9c69a8fd5f02a`  
**Depends on:** TASK-0008  
**Owner:** Technical Program Lead

## Deliverable

[Completion evidence checklist](../project-control/COMPLETION-EVIDENCE-CHECKLIST.md) defines universal evidence, task-class additions, actual command policy, fail-closed proof, environment/provider boundaries and Done/Review/Blocked/In-progress decisions.

## Acceptance evidence

- Narrative, code presence, one green command, screenshots and branch pushes are explicitly insufficient alone.
- Every task maps acceptance criteria to inspectable artifacts or executed results.
- Server-authority and negative proof is mandatory for trust and money transitions.
- Historical evidence requires current-row revalidation.
- PR, preview, deployment and production facts remain separate.
- The checklist names the repository's real `pnpm test:unit` command and rejects nonexistent-gate claims.
- `pnpm typecheck`, `pnpm build` and all 9 unit tests passed before the documentation change; task-specific link/path and diff checks passed.

## Rollback and handoff

Rollback is a bounded revert of the checklist, this evidence record, TASK-0009 tracker fields and handoff row. TASK-0010 is next and should create the risk register using the checklist's severity, ownership, mitigation and gate evidence.
