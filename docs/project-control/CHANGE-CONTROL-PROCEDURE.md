# Change-control procedure

**Task:** TASK-0013  
**Recorded:** 2026-10-10  
**Owner role:** Technical Program Lead  
**Status:** Repository procedure; human identities and hosted enforcement remain unverified

This procedure controls repository, configuration, provider, data, and production changes. It applies the [decision-rights register](DECISION-RIGHTS.md), [risk register](RISK-REGISTER.md), and [branch/environment policy](BRANCH-ENVIRONMENT-POLICY.md). Possession of a credential, a successful build, or a user request to “go ahead” does not replace an exact high-risk or production approval record.

## Change classes

| Class | Examples | Minimum approval |
| --- | --- | --- |
| Standard | Bounded docs or implementation within accepted contracts; no external mutation | Owning repository role; applicable checks |
| Controlled | Architecture, schema/migration, RLS, auth, evidence, money, state transitions, provider adapters, security or accessibility exception | Accountable domain role plus required specialist reviewers and ExecPlan/ADR when applicable |
| Production | Production deploy/config/data/provider mutation, real customer or money effect, domain/DNS, destructive recovery | Release Manager plus named accountable human(s), exact target evidence and go/no-go |
| Emergency | Narrow reversible containment under an approved runbook | Authorized incident commander/SRE role; mandatory post-incident review |

Unclassified changes default to the higher-risk applicable class. A mixed change takes the strictest class and may be split only when the pieces are independently safe and reversible.

## Required change record

Before implementation, record:

1. tracker/task ID, owner role, requester, purpose, scope and exclusions;
2. controlling source/ADR and affected invariant, service, data, provider and environment;
3. exact base commit, proposed branch, files/migrations and dependency impact;
4. risk class, risk-register rows, security/privacy/money/evidence implications;
5. acceptance checks, negative cases, monitoring and evidence locations;
6. rollback/recovery steps, last known-good artifact, trigger and decision owner;
7. required reviewers/approvers and any time-bounded exception/expiry.

Named people, signatures, provider IDs, deployment IDs and secrets must use approved private control surfaces. Never manufacture them in repository evidence. Secret values are never part of a change record.

## Workflow

1. **Intake:** verify the canonical task, dependencies and current source hierarchy. Reject duplicate or obsolete instructions.
2. **Classify:** select the strictest change class, identify affected risks and decide whether an ExecPlan, ADR, migration plan or incident plan is required.
3. **Authorize implementation:** confirm scope authority. External or production authority is not needed for safe preparation, but is required before its mutation stage.
4. **Implement:** one bounded task branch; server-authoritative and fail-closed behavior; no hidden scope expansion.
5. **Verify:** execute real repository checks and risk-specific negative/failure tests. Preserve exact command outcomes and artifacts.
6. **Review:** collect required domain/specialist review and resolve findings without self-approval.
7. **Promote:** verify exact source commit and target environment, then follow preview, staging and production gates separately.
8. **Observe and close:** record deployment/result, smoke and negative checks, monitoring, incidents, rollback status, evidence links and tracker state.

A task may be repository-complete while promotion remains blocked. The task record must say so; it must not use `Done` to imply an unexecuted external or production result required by its acceptance criteria.

## Approval paths

### Standard

The owning role confirms scope and acceptance evidence. The implementer may commit and push. Review/merge state is reported only from authoritative GitHub evidence.

### Controlled

The accountable domain role approves the design and recovery plan. Security, Data Protection, Finance, Risk, Accessibility, SRE, or other specialists have blocking rights within their discipline. Schema/auth/money/evidence/provider changes require relevant negative cases before promotion.

### Production

The Release Manager assembles a go/no-go record tied to one immutable commit and exact account/team/project/environment. Required domain owners confirm their gates; the named production authority approves the operation. Approval must specify action, target, window, rollback owner and expiry. Any mismatch or stale approval stops the change.

### Emergency

Containment may disable a feature, isolate a queue, revoke a session, or roll back to a verified artifact when the approved runbook authorizes it. Preserve actor, reason, target and timestamps. Emergency authority never permits bypassing auth/RLS/signatures, inventing transaction success, or exposing secrets. Complete post-incident review and corrective tasks.

## Stop and rollback conditions

Stop before mutation when target identity, authority, dependency, backup, rollback, monitoring, secret scope, migration head, or acceptance evidence is missing or conflicts. Stop during/after mutation on unexpected target, integrity or authorization errors, elevated failures, security/privacy exposure, unreconciled money, stale evidence, or breached rollback thresholds.

Rollback uses the pre-recorded method and verified target. If rollback could worsen data or money integrity, disable the affected capability and escalate instead of improvising. Record partial execution and provider state; never mark rollback complete from a CLI exit code alone.

## Current external gate

Native Git read/push works, while GitHub API review/CI state remains unavailable. On 2026-10-10, proxy-bound Vercel identity returned `404 User not found`, and configured team, customer-project and operations-project reads each returned `403 Not authorized`. No Vercel link, deployment, or production mutation is authorized from this state. The safe next action is to correct the Vercel credential/project bindings in environment settings and repeat harmless identity reads.

Rollback of this procedure is a repository revert plus a tracker correction. TASK-0013 performs no external mutation.
