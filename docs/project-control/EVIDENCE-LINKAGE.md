# Repository and external evidence linkage

**Task:** TASK-0016  
**Recorded:** 2026-10-10  
**Owner role:** Technical Program Lead  
**Repository baseline:** `c2e337e4a083ceac61e890c4c02d6d7865c9edf6`

This register links every completed canonical task to durable repository evidence and separates source intent, executed repository proof, provider state, and unresolved external authority. A link proves only what its evidence class supports.

## Evidence classes

| Class | Authority | Permitted claim |
| --- | --- | --- |
| Canonical controller | Exact tracker row and dependency state | Task identity, order, owner role, requested deliverable and recorded status |
| Repository artifact | Versioned file at an exact commit | The documented control or implementation existed at that commit |
| Execution record | Command output summarized in a task evidence file | The named check ran with the recorded result; not broader certification |
| Provider read | Exact account/project/deployment response | The observed provider state at the read time |
| External source | Stable source ID plus owner/status/version evidence | Intended policy/design/business input within its recorded authority |
| Human/external approval | Signed or provider-owned approval tied to exact scope | The approved decision only; silence and repository authorship do not qualify |

## Completed-task traceability

All paths below are repository-relative. The canonical tracker stores the same artifact/evidence paths and the content commit. The evidence commit follows the content commit to avoid a self-referential SHA.

| Task | Durable artifact | Execution/evidence record | Content commit | Linkage result |
| --- | --- | --- | --- | --- |
| TASK-0001 | [Governing charter](GOVERNING-CHARTER.md) | [Task evidence](../ai/TASK-0001-GOVERNING-CHARTER.md) | `fcdfb4a76c73fade8eeb39588979113d37ae6ca2` | Resolved |
| TASK-0002 | [Source hierarchy](SOURCE-HIERARCHY.md) | [Task evidence](../ai/TASK-0002-CANONICAL-SOURCES.md) | `c737348a496b911362ff32cf51dfb30413ac4bb5` | Resolved |
| TASK-0003 | [Ownership matrix](OWNERSHIP-MATRIX.md) | [Task evidence](../ai/TASK-0003-ACCOUNTABLE-OWNERS.md) | `8550fa85d412d0aac27ee1d32256eb28d7a6b819` | Resolved; named humans remain unassigned |
| TASK-0004 | [Decision rights](DECISION-RIGHTS.md) | [Task evidence](../ai/TASK-0004-DECISION-RIGHTS.md) | `5d8fd36ca5fb19fdb3f8088f31d6c12e7a9b9a22` | Resolved |
| TASK-0005 | [Artifact inventory](ARTIFACT-INVENTORY.md) | [Task evidence](../ai/TASK-0005-ARTIFACT-INVENTORY.md) | `929113eb9c500d4ef161708684cdd2e00013f1bd` | Resolved; provider gaps retained |
| TASK-0006 | [Artifact reconciliation](ARTIFACT-RECONCILIATION.md) | [Task evidence](../ai/TASK-0006-ARTIFACT-RECONCILIATION.md) | `7c6ab63ae0c13a140b330c23a7e14c60cf796796` | Resolved; no provenance deleted |
| TASK-0007 | [Live-state baseline](LIVE-STATE-BASELINE.md) | [Task evidence](../ai/TASK-0007-LIVE-STATE-BASELINE.md) | `bee6ac94f01c584e58395445f1a2ee606cf62da3` | Resolved for recorded local state; hosted state updated below |
| TASK-0008 | [Roadmap crosswalk](ROADMAP-CROSSWALK.md) | [Task evidence](../ai/TASK-0008-ROADMAP-CROSSWALK.md) | `0c7c869821a33ae615262bbccf1af7c183eaaf5a` | Resolved |
| TASK-0009 | [Completion checklist](COMPLETION-EVIDENCE-CHECKLIST.md) | [Task evidence](../ai/TASK-0009-COMPLETION-EVIDENCE.md) | `8d30f0f7e3ec5bf587288ecf6ac9c69a8fd5f02a` | Resolved |
| TASK-0010 | [Risk register](RISK-REGISTER.md) | [Task evidence](../ai/TASK-0010-RISK-REGISTER.md) | `afd5d24ac87cb90418ede91227e8bf75212b83e7` | Resolved; risks are not thereby closed |
| TASK-0011 | [Dependency map](DEPENDENCY-CRITICAL-PATH.md) | [Task evidence](../ai/TASK-0011-DEPENDENCY-CRITICAL-PATH.md) | `985f272916f5c7793416912bed72ecad681df9ba` | Resolved |
| TASK-0012 | [Branch/environment policy](BRANCH-ENVIRONMENT-POLICY.md) | [Task evidence](../ai/TASK-0012-BRANCH-ENVIRONMENT-POLICY.md) | `a8c6a8d745d3f439e9ab525afa5660f3b8241599` | Resolved; enforcement evidence remains separate |
| TASK-0013 | [Change control](CHANGE-CONTROL-PROCEDURE.md) | [Task evidence](../ai/TASK-0013-CHANGE-CONTROL.md) | `62d8b6ec03ea1dacde8f52dc2537a16153387083` | Resolved |
| TASK-0014 | [Working templates](WORKING-TEMPLATES.md) | [Task evidence](../ai/TASK-0014-WORKING-TEMPLATES.md) | `73a6d9d662e269fba08fd9a6b521f2f51f5b741a` | Resolved |
| TASK-0015 | [Control register](CONTROL-REGISTER.md) | [Task evidence](../ai/TASK-0015-CONTROL-REGISTER.md) | `a79ce602ea422858421f6ad5a4cb4b182daad508` | Resolved |

Automated linkage validation found 15 completed rows, 30 existing evidence files, 15 resolvable Git commits, and no missing path or commit.

## Repository and deployment evidence

Native Git reads verified GitHub `main` at `c2e337e4a083ceac61e890c4c02d6d7865c9edf6`. All TASK-0001 through TASK-0015 branch heads were pushed before the authorized fast-forward of `main`.

Authenticated Vercel API reads recorded two separate production projects at that exact commit:

| Surface | Project boundary | Deployment | State | Source |
| --- | --- | --- | --- | --- |
| Customer + API | Repository root; `stayrelay-hotel-platform` | `dpl_7sUV3h6XqR1hmZ7u4Aaajdpp5mZS` | `READY` | `main` at `c2e337e4a083ceac61e890c4c02d6d7865c9edf6` |
| Operations | `apps/operations`; `stayrelay-operations` | `dpl_85XV8nEBF8pMpFnGKPLP35jdDeYt` | `READY` | `main` at `c2e337e4a083ceac61e890c4c02d6d7865c9edf6` |

The API also reported the production aliases `stayrelay-hotel-platform.vercel.app` and `stayrelay-operations.vercel.app`. `READY` and alias assignment prove provider build/promotion state, not application smoke behavior, authorization correctness, accessibility, security, or launch certification. Direct HTTP smoke requests from the prior cloud session were blocked by its outbound allowlist; the saved environment draft adds `*.vercel.app` but requires publication/restart before that check can run.

## Canonical external-source links

The detailed source IDs, recorded approval/review status, precedence and conflicts live in [SOURCE-OF-TRUTH.md](../ai/SOURCE-OF-TRUTH.md) and [SOURCE-HIERARCHY.md](SOURCE-HIERARCHY.md). They include the audited Master Index, Roadmap v3, Master Control Index, V12, V11, Platform Control Matrix, technical/design specifications and V01–V10.

These stable Google document/file IDs are durable locators, but this session has no callable Google Drive connector and therefore has not re-read current owner, version, sharing, or modification state. The recorded source status remains usable as repository provenance, while decisions requiring fresh external authority remain blocked.

## Unresolved authority and evidence

- GitHub native Git read/push works; authoritative PR review, CI, protection and mergeability API evidence remains unavailable.
- Named human assignments and signatures are not stored in an approved private control surface.
- Supabase organization/project/region, migrations, generated types, RLS, backups and recovery are unverified.
- Legal, tax, property/channel/rate transferability, payment-provider, hotel/OTA and partner approvals are absent.
- No live inventory, real reservation evidence, valid Passport, privileged operation, payment, refund, payout or customer communication is enabled or evidenced.
- Figma, Codex Security and OpenAI Developers were user-confirmed as installed, but their callable tools require verification in the active session before use.

## Maintenance and rollback

For each newly completed task, add its durable artifact, evidence record and content commit; update provider rows only from harmless authoritative reads. Never replace an unresolved item with inference. If a link moves, preserve the former ID/path and record the reviewed replacement.

Rollback is removal of this derived linkage register and reversal of the TASK-0016 tracker fields. The underlying artifacts, commits and external systems remain unchanged.
