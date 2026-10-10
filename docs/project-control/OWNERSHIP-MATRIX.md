# StayRelay accountability and artifact ownership matrix

**Task:** TASK-0003
**Status:** Accepted for repository execution; named human assignments remain pending where stated
**Owner of this matrix:** Technical Program Lead
**Effective date:** 2026-10-10

Each decision and durable artifact class has exactly one accountable role. Contributors may implement or review, but they do not silently replace the accountable role. A named individual is not inferred from a job title, connector, Git identity, or document author.

## Ownership rules

1. **Accountable** means the one role that accepts the decision and evidence for its owned domain.
2. **Responsible** means the role performing the work; multiple responsible roles may exist.
3. Required reviewers provide specialist evidence but do not become co-accountable.
4. The Technical Program Lead owns any repository artifact not explicitly mapped below until this matrix assigns it.
5. Product code cannot grant business, legal, financial, security, or provider authority.
6. A role assignment permits repository work only. Production action still requires the evidence and approvals in the governing charter and task ledger.

## Control and repository artifacts

| Decision or artifact class | Accountable role | Responsible roles | Required review/evidence |
| --- | --- | --- | --- |
| 1,100-task controller, dependency status, task evidence | Technical Program Lead | Task implementer, QA Lead | Exact commit/PR/preview evidence; dependency and acceptance check |
| Governing charter and source hierarchy | Technical Program Lead | Product Lead, System Architect | User authority; current audited source and conflict record |
| Architecture decision records and temporary exceptions | System Architect | Technical Program Lead, owning engineer | Security/Data/SRE review where affected; expiry and rollback |
| Repository configuration, workspaces, lockfile, build commands | Platform Engineering Lead | Frontend/API engineers | Reproducible install, typecheck, build, focused tests |
| Git branches, PR boundaries, release notes, handoff state | Technical Program Lead | Task implementer, Release Manager | Clean diff, evidence links, no hidden blockers |
| CI policy, required checks, dependency/secret scanning | Security Engineering Lead | Platform Engineering Lead, QA Lead | Enforced branch checks and retained results |

## Product and experience artifacts

| Decision or artifact class | Accountable role | Responsible roles | Required review/evidence |
| --- | --- | --- | --- |
| Product scope, roadmap outcome, buyer/seller/admin boundaries | Product Lead | Technical Program Lead, Design Lead | Governing charter and approved product evidence |
| Customer marketplace and account experience | Customer Product Lead | Frontend Engineering Lead, Design Lead | Server-authoritative contract, usability/accessibility evidence |
| Seller submission, evidence review, listing workflow | Seller Product Lead | Frontend/API/Data engineers | Privacy, eligibility, risk and operations review |
| Operations/admin portal behavior and queues | Operations Lead | Operations Product Lead, Frontend/API engineers | RBAC, reason codes, audit and negative authorization tests |
| Visual system, typography, interaction and responsive layout | Design Lead | Frontend Engineering Lead | Design tokens, browser/responsive review, accessibility review |
| Destination, property and image-system truth/rights | Content and Media Lead | Design Lead, Location Product Lead | Rights, provenance, truthful labeling, moderation evidence |
| Accessibility acceptance and exception decisions | Accessibility Lead | Design/Frontend/QA leads | WCAG-targeted evidence, keyboard/screen-reader/zoom/contrast tests |

## Domain and data artifacts

| Decision or artifact class | Accountable role | Responsible roles | Required review/evidence |
| --- | --- | --- | --- |
| Shared domain contracts and state-machine semantics | Domain Engineering Lead | API/Product/Operations leads | Owning ADR/spec, transition and stale-state tests |
| Reservation evidence model and retention | Data Protection Lead | Data/API/Operations leads | Privacy/legal basis, access, retention and deletion evidence |
| Property catalogue, geocoding, map/radius behavior | Location Product Lead | Data/API/Frontend engineers | Provider terms, coordinate provenance, list/map consistency |
| Transferability policy and reservation eligibility | Eligibility Policy Lead | Operations/API engineers | Property × channel × rate evidence and versioned reason codes |
| Risk limits, reserve policy and exposure approval | Risk Lead | Finance/Product/API engineers | Approved limits, independent risk decision and audit evidence |
| PostgreSQL schema, migrations, generated types and RLS | Data Engineering Lead | API/Security engineers | Exact project/environment, migration head, rollback and negative RLS tests |
| Authentication, sessions, role model and MFA | Identity and Access Lead | API/Security/Frontend engineers | Threat model, server authorization, recovery and negative access tests |
| Audit history, outbox, idempotency and reconciliation data | Domain Engineering Lead | Data/API/SRE engineers | Append-only semantics, dedupe/replay and recovery tests |

## Money, transfer and service artifacts

| Decision or artifact class | Accountable role | Responsible roles | Required review/evidence |
| --- | --- | --- | --- |
| Price, fee, reserve and seller-payable calculations | Finance Lead | Product/API engineers | Currency/minor-unit tests and approved economic policy |
| Payment-provider integration and webhook handling | Payments Lead | API/Security/SRE engineers | Provider approval, signatures, idempotency, reconciliation and outage tests |
| Internal ledger, refunds, recovery and payout release | Finance Lead | Payments/API/Data engineers | Balanced entries, provider reconciliation, claims and post-stay release approval |
| Transfer execution and buyer-specific confirmation | Transfer Operations Lead | Operations/API engineers | Authoritative evidence, versioned steps, failure recovery |
| Reservation Passport and arrival readiness | Arrival Product Lead | Transfer Operations/API/Frontend engineers | Pre-arrival recheck, status semantics and credential security |
| Claims, disputes and recovery decisions | Claims Lead | Operations/Finance/Support leads | Reason codes, evidence, authority, deadlines and ledger impact |
| Support cases, escalation and customer communications | Support Lead | Operations/Product engineers | Privacy-safe templates, consent, delivery and escalation evidence |

## External systems and production artifacts

| Decision or artifact class | Accountable role | Responsible roles | Required review/evidence |
| --- | --- | --- | --- |
| Supabase organization/project, region, backups and recovery | Data Engineering Lead | Security/SRE leads | Company ownership, MFA, environment, RLS, restore evidence |
| Vercel/Cloudflare project topology, domains and runtime | SRE Lead | Platform/Security engineers | Exact project/account, environment separation, runtime and rollback evidence |
| HubSpot CRM mapping and asynchronous synchronization | CRM Operations Lead | API/Data Protection engineers | Approved objects/fields, scopes, consent/legal basis, outbox and dedupe |
| OpenAI-assisted operational workflow | Responsible AI Lead | Operations/Security/Data Protection engineers | Approved use case, redaction, retention, evaluation, human review and kill switch |
| Monitoring, incident response, backups and emergency pause | SRE Lead | Security/Operations/Data leads | Alerts, runbooks, restore drill, pause/recovery drill |
| Production release and rollback decision | Release Manager | Technical Program Lead, SRE/QA/Security leads | TASK-1000 gate, exact artifact/deployment, go/no-go and rollback evidence |
| Production stability certification | Release Manager | All domain leads | TASK-1100 evidence and no unresolved P0/P1 defects |

## External authority artifacts

| Decision or artifact class | Accountable role | Required evidence before enablement |
| --- | --- | --- |
| Legal classification, terms, privacy notices and seller/guest obligations | Legal Counsel | Written jurisdiction-specific review and approved text/version |
| Tax, GST/TDS/TCS and accounting treatment | Tax and Finance Lead | Written tax/accounting review and configured reporting controls |
| Hotel/OTA/channel transfer permissions | Partnerships Lead | Current authoritative policy/property evidence and permitted transfer route |
| Payment/marketplace onboarding and enabled rails | Payments Lead | Provider approval for StayRelay's actual merchant/marketplace model |
| Corporate accounts, domain ownership and production credentials | Founder / Account Owner | Company-controlled account, MFA, recovery owners and least-privilege grants |
| First production administrator identity | Founder / Account Owner | Approved administrator email and protected invitation/bootstrap record |

## Named-assignment register

| Role | Named individual | Current effect |
| --- | --- | --- |
| Founder / Account Owner | Unassigned in repository evidence | Blocks company-account, domain, production credential and first-admin claims |
| Technical Program Lead | Unassigned in repository evidence | Role owns repository control under current user instruction; human sign-off remains external |
| All other accountable roles | Unassigned in repository evidence | Local implementation may proceed within the charter; production/domain approval remains blocked |

Named assignments must be added through a reviewed change with the person's consent and scope. Do not put private emails, credentials, MFA secrets, or recovery codes in this matrix.

