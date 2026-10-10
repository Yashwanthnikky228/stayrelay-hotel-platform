# StayRelay artifact reconciliation record

**Task:** TASK-0006  
**Status:** Accepted for repository execution  
**Owner:** Technical Program Lead  
**Observed:** 2026-10-10  
**Predecessor:** [TASK-0005 artifact inventory](ARTIFACT-INVENTORY.md)

This record resolves which existing artifact controls each kind of claim while retaining every known historical copy. Reconciliation changes precedence and labels; it does not delete branches, workbooks, links, commits, or external records.

## Reconciliation decisions

| Conflict or duplicate set | Canonical item for current work | Retained history | Resolution and boundary |
| --- | --- | --- | --- |
| Uploaded 1,100-task workbook versus repository workbook | `docs/project-control/StayRelay_Exact_1100_Task_Production_Tracker.xlsx` on the latest reviewed control branch | Uploaded `StayRelay_Exact_1100_Task_Production_Tracker (1).xlsx`, SHA-256 `8ccc89f637f4a7825d8f89bddae652c1233952afb519e8a35edeab4fb12045a7` | The uploaded copy is the original task definition; the committed copy is the durable status ledger because it adds verified evidence without changing IDs or dependencies. Never overwrite the original upload or backfill status without task evidence. |
| Current 1,100-task controller versus Roadmap v3 | The 1,100-task repository workbook controls future IDs, dependencies, status, and launch gates | Roadmap v3 and branches using the earlier numbering remain implementation evidence | Similar numbers or titles do not imply equivalence. A current task must map and revalidate an older artifact before reuse. |
| `main` versus stacked control chain | Latest reviewed TASK-000x branch controls ongoing bounded work until review/merge | `main` at `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee` remains the deployed/default-branch candidate only when deployment evidence points to it | Unmerged branch behavior is not main behavior. Do not reset either history or describe the control chain as deployed. |
| Current TASK-0001–0005 branches versus older TASK-001–078 branches | TASK-0001–0005 branches satisfy the matching rows in the 1,100-task workbook | All older branches and commits remain historical foundation evidence | Do not rename, squash away, or bulk-merge historical branches merely to align numbers. Reuse only exact commits with current acceptance checks. |
| Parallel older branches for the same earlier task | The newest audited chain recorded in `docs/ai/STATE.md` is the continuation point | Parallel branches such as the two TASK-002, two TASK-003, and two TASK-004 variants remain origin history | Preserve variants until their unique commits are mapped. Branch presence alone is not acceptance. |
| PR refs versus branch tips | Exact PR head ref establishes only the commit submitted at that ref | Later branch tips remain separate Git evidence | PR state, review, CI, mergeability, and relationship to later commits remain unverified while GitHub API access is forbidden. Do not create duplicate PRs to compensate. |
| Root and operations Vercel configuration versus live deployment | Exact deployment/provider read, when available, controls live hosting claims | `vercel.json` files remain reviewed configuration intent | Config files do not prove project binding, successful preview, domain alias, environment values, or production state. |
| Provider proposals versus provider state | Harmless reads from the exact approved account/project/environment control external state | ADRs and `PROVIDER-INTEGRATION-INVENTORY.md` retain intended roles and required gates | Proposed variables, SDK choices, or connector labels do not prove access, approval, region, schema, scope, or production authority. |
| Linked Drive planning sources versus repository summaries | The newest accessible audited source controls its owned decision after freshness and status are checked | Repository source maps preserve links, recorded status, and prior interpretation | When Drive content is unavailable, use the repository evidence for safe local work and keep external claims unverified. Do not manufacture a replacement source register. |
| Referenced stash objects versus current stash list | A recoverable stash ref/object verified in the active repository would control its own contents | Prior handoff retains the two historical object identifiers | The current environment lists no local stashes. Do not claim recovery, apply, drop, or recreate them without object verification and a preservation step. |

## Canonical continuation state

The accepted control sequence is:

1. TASK-0001 governing charter.
2. TASK-0002 canonical source hierarchy.
3. TASK-0003 accountable ownership matrix.
4. TASK-0004 decision-rights register.
5. TASK-0005 existing artifact inventory.
6. This TASK-0006 reconciliation record.

`main` remains behind this chain. Review and merge are separate actions; neither branch creation nor push proves acceptance on `main`.

## Preservation rules

- Preserve all 1,100 task IDs, dependencies, acceptance criteria, and launch gates.
- Update only the active task's status/evidence fields after its acceptance evidence exists.
- Keep original workbook uploads, historical branch tips, PR refs, linked-source URLs, ADRs, and audit notes discoverable.
- Never delete or rewrite an unknown external artifact to make the inventory appear clean.
- Never copy credentials, personal data, reservation evidence, provider tokens, or environment values into a reconciliation record.
- Use checksums, commit SHAs, task IDs, and exact paths to distinguish versions.
- Record supersession explicitly; do not erase the superseded artifact or imply it was wrong for its historical context.

## Remaining unresolved sets

The following cannot be fully reconciled without additional access or authority:

- GitHub PR/review/CI/deployment records require read-only GitHub API access.
- Vercel projects, previews, production aliases, environment bindings, and rollback state require the approved Vercel team/project connection.
- Supabase, HubSpot, OpenAI Platform, maps, payment, email/SMS, and monitoring projects require exact approved non-production account reads.
- Linked Google Drive source contents and their current approval/freshness require Google Drive access.
- Named human owners, legal/tax positions, payment-provider approval, production domains, and administrator bootstrap identity require accountable human evidence.

These gaps remain blockers only for claims or tasks that depend on them. They do not prevent safe repository-local governance, test, and fail-closed foundation work.

## Acceptance and next action

The canonical item and retained history are now explicit for every duplicate or conflicting set observed in TASK-0005. No artifact was deleted, rewritten, merged, deployed, or promoted to external truth. TASK-0007 may baseline the live state using the reconciled continuation chain and must continue to separate local, branch, default-branch, preview, provider, and production evidence.
