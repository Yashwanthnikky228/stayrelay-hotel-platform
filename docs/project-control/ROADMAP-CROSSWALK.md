# StayRelay roadmap and task-ID crosswalk

**Task:** TASK-0008  
**Status:** Accepted for repository execution  
**Owner:** Technical Program Lead  
**Observed:** 2026-10-10

The repository contains current TASK-0001–TASK-1100 identifiers and historical branches from an earlier 180-task roadmap. This crosswalk preserves both systems without renumbering, collision, or unsupported completion credit.

## Current execution ranges

| Phase | Current task range | Tasks | Scope |
| --- | --- | ---: | --- |
| P01 | TASK-0001–TASK-0050 | 50 | Governance and repository control |
| P02 | TASK-0051–TASK-0100 | 50 | Business, legal and pilot evidence |
| P03 | TASK-0101–TASK-0150 | 50 | Architecture and platform foundation |
| P04 | TASK-0151–TASK-0225 | 75 | World-class design and dynamic experience |
| P05 | TASK-0226–TASK-0275 | 50 | Identity and access control |
| P06 | TASK-0276–TASK-0350 | 75 | Location, maps and property catalogue |
| P07 | TASK-0351–TASK-0425 | 75 | Media and 140-image production pipeline |
| P08 | TASK-0426–TASK-0500 | 75 | Seller reservation and listing workflow |
| P09 | TASK-0501–TASK-0575 | 75 | Operations and administration |
| P10 | TASK-0576–TASK-0650 | 75 | Buyer marketplace experience |
| P11 | TASK-0651–TASK-0700 | 50 | Pricing, listing and inventory state |
| P12 | TASK-0701–TASK-0775 | 75 | Checkout, payments and ledger |
| P13 | TASK-0776–TASK-0825 | 50 | Transfer, Passport and arrival |
| P14 | TASK-0826–TASK-0875 | 50 | Claims, recovery and seller payout |
| P15 | TASK-0876–TASK-0915 | 40 | CRM, notifications and responsible intelligence |
| P16 | TASK-0916–TASK-0955 | 40 | Security, privacy, accessibility and reliability |
| P17 | TASK-0956–TASK-0985 | 30 | Full-system QA and launch rehearsal |
| P18 | TASK-0986–TASK-1000 | 15 | Production launch and monitored operations |
| P19 | TASK-1001–TASK-1100 | 100 | Final design, page and production certification |

The ranges contain exactly 1,100 unique IDs. The tracker has no missing dependency IDs. As of this task's predecessor, TASK-0001–TASK-0007 are Done; TASK-0008 and TASK-0026 are dependency-ready.

## Historical evidence mapping

Historical IDs are always written with their branch and commit context. They never update a current row merely because their number or title appears similar.

| Historical branch group | Preserved evidence | Candidate current destination | Revalidation required |
| --- | --- | --- | --- |
| `task-001/repository-baseline` | Repository, remote, runtime and source observations | P01 repository controls; P03 foundation | Refresh commits, environments, providers and acceptance criteria |
| `task-002/*` | Canonical planning/source map | P01 source governance | Compare against current hierarchy and current Drive contents |
| `task-003/*` | Vite baseline and lockfile work | P03 application toolchain | Verify current package/lock, Node/pnpm, builds and official compatibility |
| `task-004*` | Platform and standards rechecks | P03 architecture/foundation; P16 hardening | Refresh framework, provider and standards evidence |
| `task-005/architecture-decisions` | Architecture decision register | P03 architecture | Confirm current controlling sources and exception expiry |
| `task-006-source-register` | Source-register attempt and access blocker | P01 source governance | Requires callable canonical source; do not create a parallel register |
| `task-007/superseded-research` | Historical architecture classification | P01/P03 source and architecture governance | Retain classification; revive only through a current ADR |
| `task-074/*` | Repository audit and bounded marketplace repairs | P03 foundation; P10/P11 marketplace behavior | Re-run exact tests on the current chain and map to current acceptance criteria |
| `task-075/*` | pnpm/Router workspace, customer/operations shells, API contracts, tests and hosting boundaries | P03 foundation plus later owned product tasks | Revalidate frozen install, strict checks, hosting/provider boundaries and current task dependencies |
| `task-076` | Repository execution instructions | P01 governance | Keep `AGENTS.md` current and test instructions against the active branch |
| `task-077` | ExecPlan contract | P01 governance | Use for work exceeding bounded-task rules; plan is not completion evidence |
| `task-078` | Architecture/provider integration review | P03 architecture and P15 integrations | Refresh exact provider accounts, scopes, environments and approved use cases |

## ID and evidence rules

1. The committed 1,100-task workbook is the only current status ledger.
2. A current row retains its exact `TASK-NNNN` identifier for branch, commit, evidence, PR and handoff records.
3. A historical task is cited as `historical <branch>@<commit>`; it is never silently renamed to a current ID.
4. Reused code or evidence must satisfy the current row's objective, deliverable, acceptance criteria, dependency, environment and launch-gate requirements.
5. Current completion evidence records the new validation commit even when it links a historical implementation commit.
6. One historical artifact may support several current tasks, but each current task requires its own bounded acceptance decision.
7. One current task may require several historical artifacts; conflicts follow the canonical source hierarchy and remain visible until resolved.
8. `main`, preview and production status are separate from branch completion.

## Active workstream sequence

The current Project control and source governance workstream is TASK-0001–TASK-0025. TASK-0001–TASK-0007 have verified current evidence. TASK-0008 is this crosswalk. TASK-0009 defines completion evidence next; no later row in the workstream is marked Done early.

The parallel Repository and deployment baseline workstream begins at TASK-0026. Its lack of a dependency permits work to start, but it does not bypass the current governance chain or convert historical repository tasks into current completion.

## Acceptance and next action

Every current phase and task range is mapped, every observed historical branch group has a candidate destination and revalidation rule, and no conflicting identifier is created. TASK-0009 may now define the evidence required to mark current tasks complete.
