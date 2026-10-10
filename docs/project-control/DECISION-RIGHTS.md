# StayRelay decision-rights register

**Task:** TASK-0004
**Status:** Accepted for repository execution
**Owner:** Technical Program Lead
**Effective date:** 2026-10-10

This register defines who may propose, review, approve, block, and escalate StayRelay decisions. The accountable roles come from the [ownership matrix](OWNERSHIP-MATRIX.md). Named individuals remain unassigned until evidenced.

## Decision classes

### Class A — bounded repository implementation

The owning engineering/product role may approve a bounded change when it:

- implements an already accepted source or ADR,
- stays inside one owned module and established interfaces,
- creates no migration, provider mutation, production effect, external message, legal/money policy, or privilege expansion,
- passes applicable existing checks and negative cases, and
- has a concrete rollback.

The task implementer may commit and push the branch. Review and merge remain subject to repository policy and available GitHub access.

### Class B — cross-domain or controlled change

The accountable domain role must approve changes to architecture, schemas, generated types, RLS, authentication, authorization, evidence, state transitions, risk, money, webhooks, queues, retention, accessibility exceptions, or external adapters. The change requires an ExecPlan or equivalent task evidence, specialist review, negative/failure tests, and rollback/recovery.

An ADR is required for a durable architecture choice or temporary exception. A temporary exception must name its owner, scope, expiry, evidence, and rollback.

### Class C — external authority or production effect

Only the named accountable human or approved external authority may approve:

- production deploy, promotion, domain/DNS, production variable or production database changes;
- real customer, reservation, identity, CRM, payment, refund, payout, claim, or communication effects;
- company-account creation, ownership transfer, privileged invitation, first-admin bootstrap, credential recovery, or billing changes;
- legal/tax conclusions, hotel/OTA transfer policy, payment-provider onboarding, risk/reserve limits, and production go/no-go; or
- irreversible deletion, destructive recovery, or emergency action outside an approved runbook.

Repository roles may prepare the exact change and evidence. Silence, a connector badge, a successful local test, or possession of a credential is not approval.

## Decision matrix

| Decision | Propose / implement | Required consultation | Final approval | Minimum evidence |
| --- | --- | --- | --- | --- |
| Task scope, dependency interpretation, bounded branch | Technical Program Lead / implementer | Owning role | Technical Program Lead | Tracker row, sources, dependency and acceptance mapping |
| Product behavior and user outcome | Product/Domain Lead | Design, Operations, Engineering | Product Lead | Current specification, states, failure and accessibility behavior |
| UI tokens, layout, responsive behavior | Design/Frontend leads | Accessibility and Product leads | Design Lead | Design source, responsive/browser/accessibility evidence |
| Domain contract or state transition | Domain Engineering Lead | Product, Operations, Data, Security | Domain Engineering Lead | Owning policy/version, allowed/forbidden transition tests |
| Architecture or hosting topology | System Architect | Platform, SRE, Security, Data | System Architect | ADR, runtime/provider evidence, expiry/rollback when temporary |
| Schema, migration, generated types, RLS | Data Engineering Lead | Domain, API, Security, Data Protection | Data Engineering Lead | Exact dev/preview project, migration head, diff, rollback, negative RLS tests |
| Authentication, roles, sessions, MFA | Identity and Access Lead | Security, Product, Operations | Identity and Access Lead | Threat model, server enforcement, recovery and negative access tests |
| Evidence collection, retention, disclosure | Data Protection Lead | Legal, Security, Operations | Data Protection Lead | Data inventory, legal basis, access/retention/deletion controls |
| Eligibility policy or transfer route | Eligibility Policy Lead | Partnerships, Legal, Operations | Eligibility Policy Lead | Current property/channel/rate evidence and versioned reason codes |
| Risk limit, reserve or exposure decision | Risk Lead | Finance, Product, Operations | Risk Lead | Approved limit, independent calculation, audit/review record |
| Pricing, fee, ledger, refund or payout policy | Finance Lead | Payments, Product, Risk, Legal/Tax | Finance Lead | Approved policy, minor-unit tests, balanced entries and reconciliation |
| Payment-provider adapter behavior | Payments Lead | Security, Finance, SRE, API | Payments Lead | Provider docs/approval, idempotency, signature, reconciliation, outage tests |
| CRM mapping and sync | CRM Operations Lead | Data Protection, Product, API | CRM Operations Lead | Approved objects/fields/scopes, consent basis, outbox/dedupe/kill switch |
| OpenAI-assisted workflow | Responsible AI Lead | Security, Data Protection, Operations | Responsible AI Lead | Approved use case, redaction, retention, evaluation, human review, kill switch |
| Monitoring, backup, incident or emergency pause | SRE Lead | Security, Operations, Data | SRE Lead | Alerts/runbook, restore or pause/recovery drill |
| Production release or rollback | Release Manager | SRE, QA, Security, Product, domain owners | Release Manager | Exact artifact/deployment, gate results, go/no-go, rollback readiness |
| Legal, tax, partner or provider authority | Owning business lead | Engineering provides implementation evidence | Named external/accountable authority | Written current approval tied to the exact product model and jurisdiction/account |
| First production administrator | Identity and Access Lead prepares | Security and Founder / Account Owner | Founder / Account Owner | Approved email, protected invite/bootstrap, MFA and audit evidence |

## Consultation and blocking rights

A required reviewer may block the affected change when evidence in their owned discipline is missing or unsafe. The blocker must identify:

- the exact decision or transition,
- the missing evidence or failed control,
- the affected task and feature gate,
- the accountable owner, and
- the next safe action.

Reviewers cannot expand their block into unrelated scope. An accountable role cannot waive a specialist gate that the charter, tracker, law, provider, security policy, or ADR makes mandatory.

## Escalation path

1. The implementer records the conflict and keeps the affected feature disabled.
2. The accountable domain role resolves source interpretation within its existing authority.
3. Cross-domain conflicts go to the Technical Program Lead and System Architect with the affected accountable roles.
4. Legal, tax, financial, risk, provider, partner, company-account, domain, first-admin, and production-release issues go to their named external/accountable authority.
5. If the required person or evidence is unassigned or unavailable, the task remains blocked; no lower role may self-approve.

The newer audited source or direct current user instruction can change repository priorities, but it cannot manufacture external approval or override a mandatory safety gate.

## Emergency decisions

An approved incident runbook may authorize reversible containment such as disabling a feature, pausing the marketplace, revoking a compromised session, or isolating a queue. The SRE Lead owns technical containment; the relevant domain/accountable role owns business recovery.

Emergency action must use the narrowest verified target, preserve audit evidence, avoid duplicate money/messages, record the actor/reason/time, and receive post-incident review. No emergency process permits publishing secrets, bypassing MFA/RLS/signatures, or inventing transaction success.

