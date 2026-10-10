# StayRelay existing artifact inventory

**Task:** TASK-0005  
**Status:** Accepted for repository execution  
**Owner:** Technical Program Lead  
**Observed:** 2026-10-10  
**Environment:** Planning and evidence; no production or provider mutation

This inventory records the artifacts that were directly observable for StayRelay. It identifies repository, branch, pull-request-ref, deployment, workbook, planning-source, and provider-project evidence without treating a link, branch, local build, configuration file, or environment-variable name as proof of live external state.

## Repository and checkout

| Item | Verified observation | Authority and limitation |
| --- | --- | --- |
| Canonical Git repository | `https://github.com/Yashwanthnikky228/stayrelay-hotel-platform.git` | Native Git read succeeded. This is the only project checkout found below `/workspace`. |
| Checkout | `/workspace/stayrelay-hotel-platform` | Git root resolves inside `/workspace`; the separate `/workspace/.git` directory is platform metadata and does not resolve as a repository. |
| Default branch | `main` at `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee` | `main` contains the older npm/Vite starter and does not contain the accepted 1,100-task control chain. |
| Active control chain | `task-0001/governing-charter` through `task-0004/decision-rights` | The chain is stacked and unmerged. TASK-0004 head is `6abb1077e8de570b18a45282a626cc2423158fde`. |
| Current bounded task branch | `task-0005/artifact-inventory` from TASK-0004 | Local branch created for this inventory. No main merge or deployment was performed. |
| Migration head | None | No SQL migration or Supabase configuration exists in the inspected chain. |
| Generated database types | None | No generated database-type artifact exists. |

## Remote branch inventory

Thirty-three task branches were read from the origin. They fall into two numbering systems and must not be conflated.

### Current 1,100-task control branches

| Branch | Tip | Recorded purpose |
| --- | --- | --- |
| `task-0001/governing-charter` | `b1c7de112a98a430ae51834ce847f36154d0196c` | TASK-0001 charter plus tracker evidence |
| `task-0002/canonical-source-hierarchy` | `255760f029de9d745174c610ef68d89ec53b7a0b` | TASK-0002 source hierarchy plus tracker evidence |
| `task-0003/accountable-owners` | `de7cd943976f76b28359e5f1143fddfa0891cb3b` | TASK-0003 ownership matrix plus tracker evidence |
| `task-0004/decision-rights` | `6abb1077e8de570b18a45282a626cc2423158fde` | TASK-0004 decision-rights register plus tracker evidence |

### Preserved earlier-roadmap and foundation branches

The following origin branches remain historical implementation evidence: `task-001/repository-baseline`; `task-002/canonical-planning`; `task-002/canonical-source-map`; `task-003/vite-8-baseline`; `task-003/vite-baseline`; `task-004-environment-baseline`; `task-004/platform-recheck`; `task-005/architecture-decisions`; `task-006-source-register`; `task-007/superseded-research`; the three `task-074/*` repair/audit branches; the thirteen `task-075/*` foundation branches; `task-076/repository-instructions`; `task-077/execution-plans`; and `task-078/architecture-and-integrations`.

These branches contain useful framework, API, test, hosting-boundary, and governance work, but their older task numbers do not satisfy same-numbered rows in the 1,100-task controller. Reuse requires a current task to map and revalidate the exact evidence.

## Pull-request and review evidence

Native Git exposes pull-request heads and merge-test refs for PRs 1 through 5:

| PR ref | Head commit | What can be established |
| --- | --- | --- |
| `refs/pull/1/head` | `085f2944c5a0e519ee4b92b2be923d14eeb891c7` | A PR ref exists for the earlier repository baseline. |
| `refs/pull/2/head` | `4a48c75d91289010f7e8fe275577b2d9161c6fb5` | A PR ref exists for the earlier canonical source map. |
| `refs/pull/3/head` | `9ee5a724767e9652115dcf57c4a24135b9cf3f23` | A PR ref exists for the earlier Vite baseline. |
| `refs/pull/4/head` | `dc3babd9c03894ef470ffc7b8e23f65f180edbd7` | A PR ref exists for the earlier platform recheck. |
| `refs/pull/5/head` | `c09fc96bfb3ee6e7f911f66cc40cf6e924dcd41d` | A PR ref exists for an earlier architecture-decision commit, not the latest branch tip. |

The configured GitHub credential permits native Git reads but GitHub GraphQL and REST requests return `Forbidden`. PR titles, open/closed state, review state, CI checks, mergeability, and whether PRs exist for TASK-0001 through TASK-0004 are therefore unverified. A branch push is not recorded as a pull request.

## Deployment and hosting artifacts

| Surface | Observed artifact | Verified state and gap |
| --- | --- | --- |
| Customer/API Vercel adapter | Root `vercel.json` builds the pnpm workspace and points to `apps/customer/build/client`; `/api/*` fails closed through the serverless adapter boundary. | Configuration exists in Git. No `.vercel` project metadata, Vercel CLI, verified project, deployment ID, preview URL, alias, environment, CI result, or production state is available. |
| Operations Vercel adapter | `apps/operations/vercel.json` builds the separate operations shell. | Configuration exists in Git. No verified operations project or deployment exists. |
| Local runtime | Customer `5173`, operations `5174`, API `3000` are documented and were historically tested on the foundation chain. | Local behavior is not deployment evidence. Current-task checks must be rerun when code changes. |
| Cloudflare | Conditional architecture option in ADR evidence. | No account, zone, Worker, deployment, route, or permission was verified. |

GitHub deployment discovery is also blocked by the current API credential. No public or production deployment may be inferred from repository configuration.

## Workbook and control artifacts

| Artifact | SHA-256 | Observed state | Classification |
| --- | --- | --- | --- |
| `docs/project-control/StayRelay_Exact_1100_Task_Production_Tracker.xlsx` at TASK-0004 | `2450e7f6f5c6a6fef880603dfcc82d284c6b5831944e6df380ff1c969156c12a` | 1,100 unique task IDs; TASK-0001–0004 Done; 1,096 Not started; 140 image slots awaiting audit | Canonical execution controller for the active branch |
| Uploaded `StayRelay_Exact_1100_Task_Production_Tracker (1).xlsx` | `8ccc89f637f4a7825d8f89bddae652c1233952afb519e8a35edeab4fb12045a7` | 1,100 unique task IDs; all 1,100 Not started | Earlier supplied copy; retained as source input, not current status authority |
| Earlier 180-task Roadmap v3 | Linked from `docs/ai/SOURCE-OF-TRUTH.md` | Content not callable in this session | Historical implementation evidence only |
| Project Control Center and Platform Control Matrix | Linked from `docs/ai/SOURCE-OF-TRUTH.md` | Content not callable in this session | Audited control links; freshness and current rows unverified |

The differing hashes and status counts are intentional provenance, not a reason to overwrite either copy. TASK-0006 owns duplicate/stale-copy reconciliation.

## Provider and external-system inventory

| Provider or authority | Repository evidence | Verified external identity | Required next harmless read |
| --- | --- | --- | --- |
| Supabase | No SDK, config directory, migrations, generated types, RLS policies, storage policies, or app environment-variable use | None | Organization owner; exact project reference; Mumbai region; environment; migration head; Auth, Storage, RLS, backup, and recovery posture |
| Vercel | Two configuration files as described above | None | Team and project IDs, environment class, exact deployment commit/status, domains, environment-variable names/status, and rollback capability |
| GitHub | HTTPS origin, 33 task branches, PR refs 1–5 | Repository Git read works; API scope does not | Read-only PR, review, CI, branch-protection, and deployment access |
| HubSpot | No SDK, adapter, portal mapping, webhook, outbox, or app environment-variable use | None | Portal, scopes, approved non-production objects/properties, pipelines, teams, webhook capability, and rate limits |
| OpenAI Platform | No SDK, adapter, project configuration, approved use-case implementation, or app environment-variable use | None | Organization/project, approved model/use case, budget/rate limit, and retention/data controls |
| Maps/geocoding | No provider SDK or key use | None | Approved provider/account, billing and quota, allowed origins, privacy settings, and development project |
| Payment provider | No provider selected or integrated | None | Legal/commercial approval, sandbox account, supported marketplace flow, webhook and reconciliation capabilities |
| Email/SMS | No provider selected or integrated | None | Approved provider and non-production account, sender/domain status, consent/retention policy, webhook and rate-limit capability |
| Monitoring/error tracking | No external service configured | None | Approved project/environment and redaction/retention settings |

Environment inspection checked relevant variable names without reading values. Generic cloud/GitHub variables exist in the machine, but no StayRelay provider binding or project identity was established. Secret values must be entered only through approved environment settings and never recorded in Git or chat.

## Retained repository artifacts

- `AGENTS.md` and `PLANS.md` define the bounded execution and evidence contract.
- `docs/adr/0001` through `0003` record the tested Vite baseline, architecture decisions, and time-bounded hosting boundaries.
- `docs/ai/STATE.md` is the durable handoff pointer, not an independent source of external truth.
- `docs/ai/PROVIDER-INTEGRATION-INVENTORY.md` records the existing provider capability gaps.
- `apps/customer`, `apps/operations`, `apps/api`, `api`, `packages/domain`, and `packages/ui` are the implemented modular-monolith surfaces on the active chain.
- No local stash is listed in this environment. Two stash object IDs referenced by the prior handoff are historical claims here; their recovery must be reverified before relying on them.

## Acceptance, risks, and next action

The repository, remote branches, observable PR refs, deployment configuration, workbooks, planning links, and provider-project gaps are identified. The highest-risk unresolved facts are explicit: GitHub review/CI state, every provider account/project, every deployment, all canonical Drive source contents, legal/payment approval, and named human ownership remain unverified. Features continue to fail closed, and no production action is authorized.

TASK-0006 may now reconcile duplicates and stale copies using this inventory. It must preserve both workbook histories, the older-roadmap branch evidence, and unresolved external artifacts rather than deleting or promoting them without proof.
