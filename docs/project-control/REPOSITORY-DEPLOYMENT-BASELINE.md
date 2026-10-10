# Repository and deployment baseline

**Scope:** TASK-0026 through TASK-0050  
**Recorded:** 2026-10-10  
**Owner:** Technical Program Lead

This baseline applies the project-control standard to the current StayRelay monorepo. It is repository evidence, not a claim that GitHub, Vercel, Supabase or production systems are configured.

## Baseline facts

- Repository: `Yashwanthnikky228/stayrelay-hotel-platform`.
- Remote `main` observed at `c2e337e4a083ceac61e890c4c02d6d7865c9edf6`.
- Customer, operations and API workspaces are present in the current remote main tree.
- The canonical execution ledger is [StayRelay_Exact_1100_Task_Production_Tracker.xlsx](StayRelay_Exact_1100_Task_Production_Tracker.xlsx).
- Customer and operations deployment IDs supplied in the handoff remain user-supplied until an authenticated Vercel read is possible.
- No production secret, provider record, database migration or deployment mutation was made.

## TASK-0026 through TASK-0044 evidence map

| Task range | Repository baseline evidence |
| --- | --- |
| 0026 charter | Scope is this repository and its deployment boundary; production mutations and provider claims are excluded without authority. |
| 0027 sources | `docs/ai/SOURCE-OF-TRUTH.md`, `docs/project-control/SOURCE-HIERARCHY.md`, the canonical tracker and Git remote refs define precedence. |
| 0028 owners | `docs/project-control/OWNERSHIP-MATRIX.md` assigns one accountable role per artifact class. |
| 0029 rights | `docs/project-control/DECISION-RIGHTS.md` defines approval, consultation, blocking and escalation. |
| 0030 inventory | `docs/project-control/ARTIFACT-INVENTORY.md` records repository, branches, workbook, hosting configuration and provider gaps. |
| 0031 reconciliation | `docs/project-control/ARTIFACT-RECONCILIATION.md` preserves canonical and historical artifacts without deletion. |
| 0032 live baseline | `docs/project-control/LIVE-STATE-BASELINE.md` records local runtime checks and explicitly unverified hosted state. |
| 0033 roadmap | `docs/project-control/ROADMAP-CROSSWALK.md` maps the exact 1,100-task ledger and historical identifiers. |
| 0034 completion proof | `docs/project-control/COMPLETION-EVIDENCE-CHECKLIST.md` defines universal, task-class and fail-closed evidence. |
| 0035 risks | `docs/project-control/RISK-REGISTER.md` records open severity, likelihood, owner, mitigation and gate. |
| 0036 dependencies | `docs/project-control/DEPENDENCY-CRITICAL-PATH.md` records the graph, ready set and convergence gates. |
| 0037 environments | `docs/project-control/BRANCH-ENVIRONMENT-POLICY.md` separates task, review, preview, staging and production. |
| 0038 change control | `docs/project-control/CHANGE-CONTROL-PROCEDURE.md` defines standard, controlled, production, emergency and rollback paths. |
| 0039 templates | `docs/project-control/WORKING-TEMPLATES.md` provides task, ADR, incident and handoff structures. |
| 0040 register | `docs/project-control/CONTROL-REGISTER.md` provides queryable control status, evidence, owner and next action. |
| 0041 evidence | `docs/project-control/EVIDENCE-LINKAGE.md` links completed work to durable paths and commits and classifies external claims. |
| 0042 questions | `docs/project-control/GOVERNANCE-CONTINUATION.md` records unresolved legal, provider, privacy and release questions. |
| 0043 security | `docs/project-control/GOVERNANCE-CONTINUATION.md` records data classes, minimum controls and blocked authority. |
| 0044 access | `docs/project-control/GOVERNANCE-CONTINUATION.md` records customer/operations separation and the hosted verification gap. |

## Deployment boundary

The repository supports local validation and branch-level review. A release requires, at minimum, an authenticated read of the intended Vercel projects and deployments, GitHub review/check evidence, approved environment variables, a verified non-production database/auth target, and named release approval. Configuration intent cannot satisfy those requirements.

## Gate tasks 0045–0050

These tasks remain blocked at this baseline. Repository links and local checks establish only part of end-to-end traceability and rollback. Hosted checks, multidisciplinary signoff, critical-gap closure, and a phase-gate approval require authorities not available in the current environment. The exact blockers are retained in [GOVERNANCE-CONTINUATION.md](GOVERNANCE-CONTINUATION.md) and [EVIDENCE-LINKAGE.md](EVIDENCE-LINKAGE.md).

## Rollback

Remove this derived baseline and revert its tracker rows. Earlier governance artifacts, content commits and the canonical ledger remain preserved.
