# StayRelay ExecPlans

An ExecPlan is a living, self-contained implementation record for work that cannot be safely reviewed as one small change. Follow `AGENTS.md` and keep this file usable by someone who has only the repository and the plan.

## When an ExecPlan is required

Create an ExecPlan before implementation when work is multi-hour, crosses module ownership, affects a P0 path, or changes any of the following:

- migrations, schemas, generated database types, RLS, authentication, or authorization,
- money, ledger, payments, refunds, reserves, recovery, or payouts,
- reservation evidence, eligibility, risk, transfer, Passport, check-in, or claims,
- external providers, webhooks, queues, data sync, secrets, or deployment environments,
- a temporary architecture exception, or
- more than one bounded branch, one migration, five hand-edited files, or about 300 net non-generated lines.

A plan coordinates work; it does not grant legal, business, risk, provider, production, or external-message authority.

## Required header

Start every plan with:

```md
# TASK-### / bounded subtask — outcome

Status: Draft | In progress | Blocked | Review | Complete
Owner: accountable person or role; use Unassigned when unknown
Repository: Yashwanthnikky228/stayrelay-hotel-platform
Branch: task-###/...
Base commit: full SHA
Current head: full SHA or Pending
Pull request: URL or Not created
Controlling sources: exact document sections and ADR links
Provider/environment mode: local | dev | preview | production-prohibited; verified facts only
Migration head: exact version or None
Generated database types: exact artifact/version or None
Last updated: YYYY-MM-DD HH:MM TZ
```

Never include secret values, personal data, booking evidence, provider tokens, or seller bank details.

## Required sections

### Objective and user outcome

State the observable result and why it matters. Describe what a user or operator can safely do after completion.

### Scope and non-goals

Name the included modules, commands, states, and interfaces. List deliberate exclusions, especially production activity and unresolved provider/legal behavior.

### Current facts

Record only inspected facts: repository state, existing behavior, provider/environment identity, migration head, generated types, linked deployment, and known failures. Separate assumptions and unknowns.

### Module ownership and data flow

Identify the owning module for each command and record. Trace request, authorization, state transition, audit/outbox event, external adapter, and read model. Explain degraded behavior when a dependency fails.

### Invariants and transitions

List the business and security invariants. Name allowed transitions, forbidden transitions, stale/version conditions, idempotency boundary, and fail-closed state. Keep verification, eligibility, risk, payment, transfer, arrival, claim, and payout authority separate.

### External assumptions and gates

For each provider or authority, record the exact account/project/environment, harmless read used to verify access, required approval/evidence, feature gate, accountable owner, and next action. Unknown facts remain blockers.

### Milestone plan

Break work into bounded, reviewable milestones. Each milestone must include:

- intended outcome,
- files/modules expected to change,
- commands and named negative/failure cases,
- evidence to capture,
- rollback or recovery, and
- the condition for proceeding.

Prefer one branch per roadmap task or bounded subtask. A migration milestone changes at most one ordered migration and never edits an applied migration.

### Progress

Use timestamped entries and keep them current:

```md
- [ ] 2026-10-10 09:00 America/Chicago — milestone and current result
```

Mark partial, blocked, skipped, and failed work honestly. A successful command in an earlier environment is historical evidence until re-run where required.

### Decisions

Record each material decision, alternatives considered, evidence, owner, date, and revisit trigger. A temporary exception requires an ADR with explicit expiry and rollback.

### Discoveries

Capture unexpected repository behavior, provider limitations, source conflicts, performance findings, and defects. Include enough evidence to reproduce them without pasting sensitive data.

### Security, privacy, accessibility, and money impact

Describe data classes, actors, authorization, retention/redaction, logging, threat/failure cases, keyboard/responsive behavior, monetary calculations, reconciliation, and human review. Use `Not applicable` only with a reason.

### Tests and evidence

List the exact executed commands, test counts, manual/browser requests, environment, results, and artifact links. Use existing commands where applicable:

```sh
pnpm typecheck
pnpm build
pnpm test:unit
```

Do not claim lint, integration, E2E, migration, provider preview, WCAG, ASVS, or production validation unless that check exists and ran against the stated environment.

### Rollback and recovery

Give concrete, ordered steps. Separate code rollback from data/provider recovery. Resolve exact provider project, deployment, migration, and event IDs before any external reversal. Preserve audit history and prevent duplicate money or messages.

### Handoff, blockers, and next task

Record branch/head/PR, changed files, checks, open risks, exact external evidence needed, feature gates, owner, next safe action, and `docs/ai/STATE.md` update. State whether services started by the task were stopped.

## Completion rule

An ExecPlan is complete when every milestone has an evidenced result or an explicit blocker, the implementation and rollback match the final decisions, applicable human reviews are recorded, and the handoff lets another engineer continue without inventing state.

