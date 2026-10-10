# Project-control register

**Task:** TASK-0015  
**Recorded:** 2026-10-10  
**Register owner:** Technical Program Lead  
**Scope:** Project control and source governance

This register makes each control's status, evidence, accountable role, affected gate and next action queryable in one place. Detailed sources remain authoritative at their linked paths. `Implemented` means the repository control exists; it does not imply named-human acceptance, hosted enforcement, merge, deployment, or production certification.

## Control status vocabulary

| Status | Meaning |
| --- | --- |
| Implemented | Repository artifact exists and its task evidence passed |
| Partial | Some evidence exists; the stated gate remains open/blocked |
| Blocked | Required authority, access, environment or evidence is absent |
| Superseded | Retained for history; a newer linked control governs |

## Maintained controls

| Control ID | Control | Status | Accountable role | Evidence | Gate / next action |
| --- | --- | --- | --- | --- | --- |
| CTRL-001 | Governing charter | Implemented | Technical Program Lead | [Charter](GOVERNING-CHARTER.md), TASK-0001 | Apply to every task; obtain named production authority before launch |
| CTRL-002 | Canonical source hierarchy | Implemented | Technical Program Lead | [Hierarchy](SOURCE-HIERARCHY.md), TASK-0002 | Revalidate linked external sources when access exists |
| CTRL-003 | Artifact accountability | Partial | Technical Program Lead | [Ownership matrix](OWNERSHIP-MATRIX.md), TASK-0003 | Named people/acceptance remain external and unverified |
| CTRL-004 | Decision rights | Implemented | Technical Program Lead | [Decision register](DECISION-RIGHTS.md), TASK-0004 | Collect exact controlled/production approvals when required |
| CTRL-005 | Artifact inventory | Implemented | Technical Program Lead | [Inventory](ARTIFACT-INVENTORY.md), TASK-0005 | Refresh after merge/provider/deployment changes |
| CTRL-006 | Duplicate/stale reconciliation | Implemented | Technical Program Lead | [Reconciliation](ARTIFACT-RECONCILIATION.md), TASK-0006 | Preserve provenance; review new conflicts before promotion |
| CTRL-007 | Live-state baseline | Partial | Platform Engineering Lead | [Baseline](LIVE-STATE-BASELINE.md), TASK-0007 | Refresh exact hosted/provider state; local foundation only is verified |
| CTRL-008 | Roadmap/task crosswalk | Implemented | Technical Program Lead | [Crosswalk](ROADMAP-CROSSWALK.md), TASK-0008 | Map historical evidence before reuse; never renumber silently |
| CTRL-009 | Completion evidence | Implemented | Technical Program Lead | [Checklist](COMPLETION-EVIDENCE-CHECKLIST.md), TASK-0009 | Apply task-class proof before tracker closure |
| CTRL-010 | Risk management | Implemented | Technical Program Lead | [Risk register](RISK-REGISTER.md), TASK-0010 | Reassess on evidence/status changes; no current risk is closed |
| CTRL-011 | Dependency/critical path | Implemented | Technical Program Lead | [Dependency map](DEPENDENCY-CRITICAL-PATH.md), TASK-0011 | Recompute ready set after every tracker update |
| CTRL-012 | Branch/environment separation | Partial | Technical Program Lead | [Policy](BRANCH-ENVIRONMENT-POLICY.md), TASK-0012 | Enforce via GitHub/Vercel after exact identities and review access |
| CTRL-013 | Change control | Implemented | Technical Program Lead | [Procedure](CHANGE-CONTROL-PROCEDURE.md), TASK-0013 | Classify and approve every controlled/production mutation |
| CTRL-014 | Working templates | Implemented | Technical Program Lead | [Templates](WORKING-TEMPLATES.md), TASK-0014 | Use without treating a populated template as proof |
| CTRL-015 | Canonical execution ledger | Implemented | Technical Program Lead | `StayRelay_Exact_1100_Task_Production_Tracker.xlsx` | Maintain status/evidence/commit/notes with exact task evidence |
| CTRL-016 | Repository handoff | Implemented | Technical Program Lead | `../ai/STATE.md` | Update after every bounded task with exact continuation state |
| CTRL-017 | Architecture decisions | Partial | System Architect | `../adr/0001-vite-8-baseline.md`; `../adr/0002-architecture-decision-register.md`; `../adr/0003-foundation-runtime-and-hosting-boundaries.md` | Revisit conditional hosting/provider decisions at named gates |
| CTRL-018 | Customer/operations isolation | Partial | Identity and Access Lead | ADR-0003; local TASK-0007 evidence; TASK-0016 hosted-project read | Distinct projects are verified; server auth and privileged negative tests remain blocked |
| CTRL-019 | GitHub review/CI authority | Blocked | Release Manager | Native refs/push work; API reads remain `Forbidden` | Restore API access, reconcile PRs/checks/protection before merge claims |
| CTRL-020 | Vercel customer project | Partial | SRE Lead | TASK-0016 exact project/deployment/commit read | Publish live-domain allowlist and execute HTTP smoke/negative checks |
| CTRL-021 | Vercel operations project | Implemented | SRE Lead | TASK-0016 exact `apps/operations` project/deployment/commit read | Publish live-domain allowlist and execute HTTP smoke; privileged features remain disabled |
| CTRL-022 | Database/auth environment | Blocked | Data Engineering Lead | No verified Supabase project, migration head or generated types | Verify approved non-production project/region/access before schema work |
| CTRL-023 | External business authority | Blocked | Founder / Account Owner | Named legal/tax/hotel/payment approvals absent | Complete P02 evidence and signed decisions before affected enablement |
| CTRL-024 | Production release | Blocked | Release Manager | No reviewed immutable release, full gates, rollback drill or go/no-go | Complete launch dependencies through TASK-1000 and explicit approval |
| CTRL-025 | Final production certification | Blocked | Release Manager | TASK-1100 not reached | Complete all dependencies with no unresolved P0/P1 and certify exact live state |

## Maintenance procedure

1. Update a row when its status, accountable role, evidence, gate, or next action changes.
2. Link the task/commit that changed the control; retain prior state in Git history.
3. Use `Partial` when repository implementation exists but external or enforcement evidence is missing.
4. Do not mark a control `Implemented` merely because a configuration, variable name, screenshot, or plan exists.
5. A Critical/High risk, missing named authority, or failed provider read keeps the affected gate blocked.
6. Reconcile this view against the canonical tracker, risk register and `STATE.md` at each project-control checkpoint.

## Current query results

- Repository/provider controls implemented: CTRL-001, 002, 004–006, 008–011, 013–016, 021.
- Partially implemented: CTRL-003, 007, 012, 017, 018, 020.
- Blocked external/release controls: CTRL-019, 022–025.
- No row currently proves production launch or final certification.

Rollback is deletion of this derived register and reversal of TASK-0015 tracker fields. Source controls and their Git history remain intact.
