# StayRelay working templates

**Task:** TASK-0014  
**Recorded:** 2026-10-10  
**Owner role:** Technical Program Lead

Use these templates with the canonical tracker, repository instructions, source hierarchy, decision rights, change control, and task-specific controls. Replace every bracketed field or state `Not applicable` with a reason. Never insert secrets, real identity/reservation documents, unsupported approval names, or fabricated provider/deployment evidence.

## Task record template

```markdown
# [TASK-####] — [title]

Date: [UTC date/time]
Branch: [task-####/slug]
Base commit: [full SHA]
Owner role: [one accountable role]
Environment: [local/preview/staging/production + exact verified identity]
Status: [not started/in progress/blocked/done]

## Objective and boundary
- Canonical tracker objective: [exact objective]
- In scope: [bounded result]
- Out of scope: [explicit exclusions]
- Dependencies: [task IDs and evidence]
- Change class: [standard/controlled/production/emergency]

## Sources and invariants
- Controlling sources/ADRs: [links + relevant sections]
- Owned command/data boundary: [server/domain/provider authority]
- Invariants preserved: [evidence, eligibility, risk, money, time, access]
- Conflicts/open decisions: [owner + blocked gate]

## Implementation
- Files/migrations/generated artifacts: [exact list]
- Provider/account/project/region/mode: [verified read or unverified]
- Failure state: [fail-closed behavior]
- Security/privacy/accessibility impact: [assessment]

## Acceptance evidence
| Requirement | Check/artifact | Result |
| --- | --- | --- |
| [criterion] | [command/link] | [pass/fail/blocked] |

- Negative/failure cases: [named cases]
- Commands executed: [exact commands + counts]
- Unrun/skipped checks: [why]
- Review/approval: [authoritative record or pending]

## Rollback and continuation
- Rollback/recovery: [steps + trigger + owner]
- External effects to reverse: [IDs or none]
- Blockers/risks: [risk IDs + next safe action]
- Next dependency-ready task: [TASK-####]
```

## ADR template

```markdown
# ADR-[####] — [decision]

Date: [UTC date]
Status: [proposed/accepted/conditional/superseded]
Decision owner: [accountable role]
Related tasks: [TASK-####]
Supersedes: [ADR or none]
Review/expiry: [date/event if conditional]

## Context
[Problem, current evidence, constraints, source conflicts and affected environments.]

## Decision
[Chosen boundary and exact authoritative behavior.]

## Invariants and failure behavior
- [Server-owned transition/invariant]
- [UNKNOWN/AMBER/RED or unavailable behavior]
- [Security/privacy/money/evidence requirements]

## Alternatives considered
| Alternative | Evidence/tradeoff | Reason not selected |
| --- | --- | --- |
| [option] | [facts] | [reason] |

## Consequences
- Positive: [outcome]
- Cost/risk: [impact]
- Required tests/operations: [checks]
- Provider/external gates: [approval required]

## Rollback/revisit
[Reversal path, migration/data implications, trigger and owner.]

## Evidence
- Sources: [links + versions]
- Validation: [commands/artifacts]
- Approvals: [record or pending; never invented]
```

## Incident template

```markdown
# INC-[date-sequence] — [short title]

Classification: [security/privacy/availability/data/money/evidence/provider]
Severity: [declared level]
Status: [investigating/contained/recovering/resolved/reviewed]
Incident commander role: [role]
Started/detected: [UTC timestamps]
Affected environment/account/project: [exact identity]

## Customer and system impact
- Observed impact: [evidence-backed facts]
- Potential impact: [clearly labelled uncertainty]
- Affected records/transactions: [IDs/counts without sensitive payloads]
- Current fail-closed state: [disabled/unavailable/paused behavior]

## Timeline
| UTC time | Actor/role | Observation/action | Evidence/result |
| --- | --- | --- | --- |
| [time] | [role] | [event] | [link/ID] |

## Containment and recovery
- Immediate containment: [authorized reversible action]
- Integrity/reconciliation checks: [data/money/provider state]
- Recovery/rollback target: [verified artifact/state]
- Monitoring and exit criteria: [signals/thresholds]

## Authority and communication
- Runbook/approval used: [link]
- Required notifications: [owner/status; no message claimed before sent]
- Legal/privacy/security escalation: [owner/status]

## Resolution and review
- Root cause: [verified cause or pending]
- Corrective/preventive tasks: [TASK IDs, owners, due gates]
- Residual risk/accepted risk: [signed authority + expiry or unaccepted]
- Evidence retained: [logs, deployments, audits; no secrets]
```

## Handoff template

```markdown
# StayRelay handoff state

Updated: [UTC date/time]
Repository/branch/head: [repository, branch, full SHA]
Canonical tracker: [path + status counts]
Active task: [TASK-####]

## Completed in this increment
| Task | Content commit | Scope | Executed evidence |
| --- | --- | --- | --- |
| [ID] | [SHA] | [bounded result] | [checks/counts] |

## Authoritative current state
- Product/runtime behavior: [what is actually verified]
- Environment/provider identities: [exact verified reads or unverified]
- Schema/migration/generated types: [heads/state]
- PR/review/CI/deployment status: [authoritative evidence only]
- External/customer/money effects: [IDs or none]

## Persistent blockers and risks
- [Risk ID]: [blocked gate, evidence, owner, next safe action]

## Continuation
1. Read: [required sources/ADRs]
2. Preserve: [unrelated changes/stashes/external state]
3. Next dependency-ready task: [TASK-#### + acceptance]
4. Required access/approval: [specific operation]
5. Verification and rollback: [commands/target]

Do not claim: [explicit unverified production/provider/legal/security states]
```

## Completion rules

- Templates organize evidence; they do not create evidence or approval.
- Link durable artifacts and exact commits. Avoid screenshots as the sole proof when an authoritative API, log, or repository artifact exists.
- Keep passed, failed, blocked, skipped and unrun outcomes distinct.
- Record the exact continuation point and next safe action even when a task is blocked.
- Tracker status changes only after the task acceptance criteria and required external effects are evidenced.

Rollback is removal of this template set and reversal of the TASK-0014 tracker fields. Existing records created from a template remain historical evidence and must not be silently rewritten.
