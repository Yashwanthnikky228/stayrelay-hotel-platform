# StayRelay completion evidence checklist

**Task:** TASK-0009  
**Status:** Accepted for repository execution  
**Owner:** Technical Program Lead  
**Effective:** 2026-10-10

A StayRelay task cannot close from narrative, code presence, a green command, a screenshot, or a branch push alone. Evidence must prove the current task's deliverable and acceptance criteria at the correct repository commit and environment without hiding an unresolved critical issue.

## Mandatory evidence for every task

- Exact current `TASK-NNNN`, title, dependency state, owner role, environment and launch-gate value from the canonical workbook.
- Dedicated branch based on the accepted predecessor, clean pre-edit status, base commit and content commit.
- Controlling source paths/sections and any source conflict, missing source or assumption.
- Bounded scope, changed files, deliberate exclusions and rollback/revert path.
- Acceptance-criterion mapping from each criterion to an inspectable artifact or executed result.
- Exact commands and results; passed, failed, skipped, disabled and unrun checks remain distinct.
- Negative/failure-state evidence where the task affects trust, permissions, evidence, inventory, money or external dependencies.
- Provider/environment identity and mode, or an explicit statement that none was used or verified.
- Migration head and generated database-type version, including `None` when verified absent.
- Evidence document, tracker status/evidence/commit fields and `docs/ai/STATE.md` handoff update.
- Secret/unrelated-diff review and confirmation that only processes started by the task were stopped.
- PR, review, CI, preview and production evidence when applicable; unavailable stages remain blockers, not implied success.

## Evidence classes

| Task class | Minimum additional proof | Insufficient substitutes |
| --- | --- | --- |
| Governance/documentation | Source comparison, link/path checks, explicit authority, conflicts, owner and next gate | Prose without sources or an unreviewed generated plan |
| Toolchain/build | Pinned manifest/lock/runtime, frozen install, typecheck, build and relevant tests | Package installation alone or an uncommitted lock change |
| UI/UX | Route/state matrix, keyboard and responsive checks, loading/empty/error states, accessibility evidence and final rendered inspection | Source diff, design mock-up or one desktop screenshot |
| API/domain | Request/response contract, authorization boundary, state invariants, validation, idempotency where needed, and negative tests | Type definitions or a successful health endpoint |
| Database/migration | Verified non-production project, ordered migration, pre/post schema, RLS/grants, generated types, rollback/recovery and negative access tests | SQL file presence, local parsing or a public key |
| Authentication/admin | Exact Auth project, server-owned roles, session policy, MFA, ordinary-user/anonymous denial and audited bootstrap/revocation | Client-side route guards, editable user metadata or hard-coded credentials |
| Evidence/storage | Private bucket/policy, signed access, file validation, retention/redaction and cross-user denial | Public URL, local fixture or filename validation only |
| Inventory/eligibility/risk | Version-bound evidence and policy, separate eligibility/risk decisions, UNKNOWN/AMBER/RED fail-closed tests | UI badge, fixture, model output or operator narrative |
| Payments/ledger | Approved sandbox/provider identity, signed webhook, idempotency/replay, uncertain states, reconciliation, balanced immutable entries and recovery | Browser redirect, provider dashboard screenshot or arithmetic unit test alone |
| External integration | Exact account/project/environment/scopes, harmless read, timeout/retry/idempotency, redaction, degraded state and kill switch | Connector label, environment-variable name or SDK dependency |
| Security/privacy | Threat/control mapping, negative tests, data classification, logging/redaction, retention and named review where required | Checklist assertion without executed evidence |
| Accessibility/performance | Defined target, representative flows/devices, tool output plus manual checks, thresholds and defects | Lighthouse score alone or unverified WCAG claim |
| Deployment/release | Exact project/deployment ID, commit, environment, build/check state, smoke tests, rollback and domain/alias evidence | Local build, config file, branch push or generated preview URL |
| Production/launch | Explicit human authorization, provider/legal/financial gates, monitoring, backups, rollback drill and no unresolved P0/P1 | Preview success, synthetic transactions or self-approval |

## Required command policy

Use commands that actually exist at the inspected commit. The current foundation requires:

```sh
pnpm typecheck
pnpm build
pnpm test:unit
```

The repository does not currently expose a root `pnpm test`, lint, format, integration, E2E, migration or security-audit command. Do not claim those gates ran until a bounded task adds and executes them. Documentation-only tasks may reuse unchanged-code results only when they identify the exact validated parent and run task-specific path, workbook and diff checks.

## Server-authority and fail-closed proof

Any task touching reservation evidence, eligibility, risk, listing, quote, payment, transfer, arrival, claim, refund or payout must prove:

1. the browser cannot authorize the transition;
2. the server checks actor, role, current version and allowed prior state;
3. UNKNOWN, AMBER, conflicting, stale or insufficient evidence cannot become sellable;
4. eligibility does not imply risk, payment, transfer, arrival or payout approval;
5. retries and duplicate external events cannot duplicate state or money;
6. the audit record excludes secrets and sensitive raw evidence; and
7. dependency outage or uncertain provider state produces a safe explicit state.

## Completion decision

| Decision | Meaning |
| --- | --- |
| Done | Every applicable criterion has linked evidence; required checks pass; no hidden critical issue; tracker and handoff are current. |
| Review | Implementation evidence exists, but required human, PR, security, legal, design or provider review is outstanding. |
| Blocked | A prerequisite, credential, approval, authoritative source or verified environment prevents required proof. |
| In progress | Bounded implementation or verification is incomplete. |
| Not started | No accepted current-task evidence exists. |

Evidence from a historical branch can accelerate a task but cannot close it until revalidated against the current row, commit, environment and acceptance criteria. A task marked Done on a feature branch is not merged, deployed or production-certified unless those separate facts are also evidenced.

## Acceptance and next action

This checklist prevents narrative-only closure and makes authoritative, negative, environment and blocker evidence explicit. TASK-0010 may use it to create the project-control risk register with severity, likelihood, owner, mitigation and gate.
