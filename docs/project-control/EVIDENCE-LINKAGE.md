# Repository and external evidence linkage

**Task:** TASK-0016  
**Recorded:** 2026-10-10  
**Owner:** Technical Program Lead  
**Scope:** Completed project-control work through TASK-0015

This register links each completed task to durable repository evidence and separates repository facts from external provider claims. A link proves only the scope stated in its task record. It does not prove review, merge, deployment, provider configuration, or production readiness unless a current authoritative read establishes that state.

## Evidence states

| State | Required proof |
| --- | --- |
| Repository verified | The path exists, the recorded commit resolves, and the commit is an ancestor of the current task base. |
| Server verified | A current read from the system that owns the state returns the exact identity and value. |
| User-supplied handoff | The user supplied a precise external record, but this runtime could not repeat the authoritative read. |
| Blocked / unverified | The required authority, credential, endpoint, or successful read is absent. |

Screenshots, configuration files, environment-variable names, and narrative handoffs are supporting context. They are not server verification by themselves.

## Completed-task traceability

All rows below passed the repository verification rule on 2026-10-10. Each content commit exists and is an ancestor of the TASK-0016 base `c2e337e4a083ceac61e890c4c02d6d7865c9edf6`.

| Task | Durable evidence | Content commit |
| --- | --- | --- |
| TASK-0001 | [Governing charter](GOVERNING-CHARTER.md); [acceptance record](../ai/TASK-0001-GOVERNING-CHARTER.md) | `fcdfb4a76c73fade8eeb39588979113d37ae6ca2` |
| TASK-0002 | [Source hierarchy](SOURCE-HIERARCHY.md); [acceptance record](../ai/TASK-0002-CANONICAL-SOURCES.md) | `c737348a496b911362ff32cf51dfb30413ac4bb5` |
| TASK-0003 | [Ownership matrix](OWNERSHIP-MATRIX.md); [acceptance record](../ai/TASK-0003-ACCOUNTABLE-OWNERS.md) | `8550fa85d412d0aac27ee1d32256eb28d7a6b819` |
| TASK-0004 | [Decision rights](DECISION-RIGHTS.md); [acceptance record](../ai/TASK-0004-DECISION-RIGHTS.md) | `5d8fd36ca5fb19fdb3f8088f31d6c12e7a9b9a22` |
| TASK-0005 | [Artifact inventory](ARTIFACT-INVENTORY.md); [acceptance record](../ai/TASK-0005-ARTIFACT-INVENTORY.md) | `929113eb9c500d4ef161708684cdd2e00013f1bd` |
| TASK-0006 | [Artifact reconciliation](ARTIFACT-RECONCILIATION.md); [acceptance record](../ai/TASK-0006-ARTIFACT-RECONCILIATION.md) | `7c6ab63ae0c13a140b330c23a7e14c60cf796796` |
| TASK-0007 | [Live-state baseline](LIVE-STATE-BASELINE.md); [acceptance record](../ai/TASK-0007-LIVE-STATE-BASELINE.md) | `bee6ac94f01c584e58395445f1a2ee606cf62da3` |
| TASK-0008 | [Roadmap crosswalk](ROADMAP-CROSSWALK.md); [acceptance record](../ai/TASK-0008-ROADMAP-CROSSWALK.md) | `0c7c869821a33ae615262bbccf1af7c183eaaf5a` |
| TASK-0009 | [Completion checklist](COMPLETION-EVIDENCE-CHECKLIST.md); [acceptance record](../ai/TASK-0009-COMPLETION-EVIDENCE.md) | `8d30f0f7e3ec5bf587288ecf6ac9c69a8fd5f02a` |
| TASK-0010 | [Risk register](RISK-REGISTER.md); [acceptance record](../ai/TASK-0010-RISK-REGISTER.md) | `afd5d24ac87cb90418ede91227e8bf75212b83e7` |
| TASK-0011 | [Dependency and critical path](DEPENDENCY-CRITICAL-PATH.md); [acceptance record](../ai/TASK-0011-DEPENDENCY-CRITICAL-PATH.md) | `985f272916f5c7793416912bed72ecad681df9ba` |
| TASK-0012 | [Branch and environment policy](BRANCH-ENVIRONMENT-POLICY.md); [acceptance record](../ai/TASK-0012-BRANCH-ENVIRONMENT-POLICY.md) | `a8c6a8d745d3f439e9ab525afa5660f3b8241599` |
| TASK-0013 | [Change-control procedure](CHANGE-CONTROL-PROCEDURE.md); [acceptance record](../ai/TASK-0013-CHANGE-CONTROL.md) | `62d8b6ec03ea1dacde8f52dc2537a16153387083` |
| TASK-0014 | [Working templates](WORKING-TEMPLATES.md); [acceptance record](../ai/TASK-0014-WORKING-TEMPLATES.md) | `73a6d9d662e269fba08fd9a6b521f2f51f5b741a` |
| TASK-0015 | [Control register](CONTROL-REGISTER.md); [acceptance record](../ai/TASK-0015-CONTROL-REGISTER.md) | `a79ce602ea422858421f6ad5a4cb4b182daad508` |

The canonical status and evidence fields remain in [the 1,100-task tracker](StayRelay_Exact_1100_Task_Production_Tracker.xlsx). Git history preserves subsequent tracker and handoff commits without replacing the content commit recorded for each row.

## External authority ledger

| System / claim | Authoritative source | Evidence observed for this task | State | Consequence |
| --- | --- | --- | --- | --- |
| Git default branch | Remote Git ref | `refs/heads/main` resolved by `git ls-remote` to `c2e337e4a083ceac61e890c4c02d6d7865c9edf6` | Server verified | TASK-0016 is based on the current remote main observed on 2026-10-10. |
| TASK-0015 remote branch | Remote Git ref | `refs/heads/task-0015/control-register` resolved to the same commit | Server verified | The predecessor evidence commit is durable on the remote. |
| GitHub PR, review, CI and protection state | GitHub API / hosted rules | Prior API reads returned `Forbidden`; native Git does not expose review or check conclusions | Blocked / unverified | No PR, review, CI, mergeability, or branch-protection claim is made. |
| Customer Vercel deployment | Vercel project/deployment API | User handoff identifies `dpl_7sUV3h6XqR1hmZ7u4Aaajdpp5mZS` as READY from `c2e337e4...`; this runtime has no `VERCEL_*` variables and its outbound proxy rejected the public request | User-supplied handoff | Preserve the exact ID, but repeat an authenticated Vercel read before using it as release evidence. |
| Operations Vercel deployment | Vercel project/deployment API | User handoff identifies `dpl_85XV8nEBF8pMpFnGKPLP35jdDeYt` as READY from `c2e337e4...`; current authenticated verification is unavailable | User-supplied handoff | Preserve the exact ID, but repeat an authenticated Vercel read before using it as release evidence. |
| Supabase database/auth | Supabase project API, migration history and generated types | No verified project identity, migration head, schema or generated types | Blocked / unverified | Database, auth and persistence work remains fail closed. |
| HubSpot | HubSpot account API and object/property reads | No callable authenticated read in this runtime | Blocked / unverified | No CRM schema, synchronization or production-connection claim is made. |
| OpenAI Platform | OpenAI project/API authority | No callable authenticated project read in this runtime | Blocked / unverified | No model, key, project or production-integration claim is made. |

The failed public Vercel requests in this runtime returned a proxy `CONNECT 403` before reaching the sites. That result describes this environment's egress and is not evidence that either deployment is unavailable.

## Authority required by evidence class

| Evidence class | Source that can confirm it |
| --- | --- |
| Repository path and commit ancestry | Local Git object database plus remote Git refs for durability |
| PR approval, checks and branch rules | GitHub API or the hosted repository UI |
| Deployment identity, source commit and readiness | Vercel deployment/project API |
| Database schema, migration and auth configuration | Supabase project API, database migration state and generated contracts |
| Payment, ledger, reservation and transfer state | The owning transactional service and immutable audit records |
| Human/legal/business approval | Named approver record in the designated approval system |

## Open critical issues

- GitHub review, CI, mergeability and protection state cannot be queried with the current API access.
- The two Vercel deployment IDs are precise user-supplied evidence, but have not been authenticated again in this runtime.
- Supabase, HubSpot and OpenAI provider identities and configured state remain unverified.
- Named human approvals, payment authority, hotel inventory authority and production release approval are absent.
- No row in this register authorizes a production mutation or upgrades a blocked release gate.

## Maintenance rule

Update this register when a completed task's source evidence moves, a remote ref changes, or an authoritative provider read changes an external state. Record the exact source, identity, timestamp/date, result and responsible task. Never replace a failed or unavailable server read with configuration intent.

Rollback is deletion of this derived register and reversal of the TASK-0016 tracker fields. Earlier task evidence and Git history remain intact.
