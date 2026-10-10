# Dependency and critical-path map

**Task:** TASK-0011  
**Controller:** `StayRelay_Exact_1100_Task_Production_Tracker.xlsx`  
**Recorded:** 2026-10-10  
**Owner role:** Technical Program Lead

This map distinguishes dependency permission from implementation readiness. A predecessor marked `Done` permits dependency progression only when its linked evidence is valid. It does not imply review, merge, preview, provider, staging, launch, or production approval.

## Verified graph

The canonical `Tasks` sheet contains 1,100 unique task IDs, 1,122 dependency edges, and two roots. Every dependency resolves to a ledger row, the graph is acyclic, and every task is reachable from a root.

| Property | Verified result |
| --- | --- |
| Roots | TASK-0001 and TASK-0026 |
| Completed rows at analysis time | TASK-0001 through TASK-0010 |
| Dependency-ready rows | TASK-0011 and TASK-0026 |
| Longest dependency chain | 537 tasks, TASK-0001 through TASK-1100 |
| Maximum fan-in | 3 predecessors |
| Terminal certification row | TASK-1100 |

The longest-chain result is structural, not a schedule forecast. The ledger has no duration or capacity estimates, so calendar critical path, float, and finish dates cannot be claimed from it.

## Structural critical chain

The 537-node longest chain compresses to these inclusive ranges:

`0001–0025 → 0050–0075 → 0100–0125 → 0150–0175 → 0225–0250 → 0275–0300 → 0350–0375 → 0425–0450 → 0500–0525 → 0575–0600 → 0650–0675 → 0700–0725 → 0775–0800 → 0825–0850 → 0875–0895 → 0915–0935 → 0955–0970 → 0985–1100`

This chain repeatedly passes a convergence gate, selects one downstream workstream, and converges again. A task outside the chain can still block its next convergence gate and therefore the release.

## Parallel work and convergence gates

- TASK-0011 may proceed now because TASK-0010 is `Done` with linked evidence.
- TASK-0026 is the second currently ready root and may proceed independently on its own branch. It must not be mixed into TASK-0011.
- Within later phases, the ledger opens two or three parallel 25-task workstreams. Each phase gate waits for the specified terminal task from every required stream.
- TASK-0050, 0100, 0150, 0275, 0700, 0825, and 0875 have two predecessors.
- TASK-0225, 0350, 0425, 0500, 0575, 0650, and 0775 have three predecessors and are the highest-fan-in release gates.
- TASK-0915, 0955, and 0985 each join two streams before the final launch/certification sequence.

## Phase entry and exit control

| Phase | Range | Entry streams | Convergence / exit |
| --- | --- | ---: | --- |
| P01 Governance | 0001–0050 | 2 | TASK-0050 |
| P02 Business/legal/pilot evidence | 0051–0100 | 2 | TASK-0100 |
| P03 Platform foundation | 0101–0150 | 2 | TASK-0150 |
| P04 Design and dynamic experience | 0151–0225 | 3 | TASK-0225 |
| P05 Identity and access | 0226–0275 | 2 | TASK-0275 |
| P06 Location/maps/catalogue | 0276–0350 | 3 | TASK-0350 |
| P07 Media pipeline | 0351–0425 | 3 | TASK-0425 |
| P08 Seller workflow | 0426–0500 | 3 | TASK-0500 |
| P09 Operations/admin | 0501–0575 | 3 | TASK-0575 |
| P10 Buyer marketplace | 0576–0650 | 3 | TASK-0650 |
| P11 Pricing/inventory | 0651–0700 | 2 | TASK-0700 |
| P12 Payments/ledger | 0701–0775 | 3 | TASK-0775 |
| P13 Transfer/Passport/arrival | 0776–0825 | 2 | TASK-0825 |
| P14 Claims/recovery/payout | 0826–0875 | 2 | TASK-0875 |
| P15 CRM/notifications/intelligence | 0876–0915 | 2 | TASK-0915 |
| P16 Security/privacy/accessibility/reliability | 0916–0955 | 2 | TASK-0955 |
| P17 Full-system QA/rehearsal | 0956–0985 | 2 | TASK-0985 |
| P18 Production launch | 0986–1000 | 1 | TASK-1000 |
| P19 Final certification | 1001–1100 | 1 | TASK-1100 |

Entry streams count phase-local task sequences that start without a same-phase predecessor. It does not authorize parallel changes that share files, migrations, environments, providers, or approval owners.

## Fail-closed scheduling rules

1. Select only rows whose every declared predecessor is `Done` and whose evidence still resolves.
2. Use one task per branch and preserve the repository change bounds.
3. Treat provider identity, human approval, legal evidence, review, merge, preview, staging, and production as separate gates.
4. Do not route around a blocked predecessor by marking its dependent task complete.
5. A parallel row may continue only if it does not rely on the blocked authority, shared mutation, or unresolved decision.
6. Recompute the ready set after every tracker update; never infer readiness from numeric adjacency alone.
7. Production tasks remain blocked until exact account/project/environment, reviewed commit, rollback, monitoring, and launch authority are evidenced.

## Current blockers that affect sequencing

- GitHub native branch transport works, but API-based PR, review, CI, and mergeability evidence is unavailable.
- Vercel CLI, project linkage, authenticated project identity, and deployed URLs are absent from the current environment.
- Supabase project identity, migration head, generated types, RLS, backups, and recovery remain unverified.
- Human accountable identities and signatures are not evidenced; role ownership does not substitute for approval.
- External legal, transferability, payment, hotel, and provider decisions remain gates, not implementation assumptions.

These blockers do not prevent planning/evidence rows with no dependency on the missing authority. They do prevent claims that a branch is reviewed, deployed, production-ready, or live.

## Reproduction and rollback

Reproduce the graph from the `Tasks` sheet using exact `TASK-####` references in `Depends On`; verify unique IDs, resolved edges, a full topological ordering, roots, dependency-ready rows, and longest predecessor depth. The workbook remains the controller; this document is a derived review view.

Rollback is deletion of this derived map and reversal of the TASK-0011 tracker fields. Never delete or rewrite other task history to change the graph. Any dependency correction requires its own reviewed tracker change with the reason and downstream impact recorded.
