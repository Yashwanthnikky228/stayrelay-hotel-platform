# StayRelay canonical source hierarchy

**Task:** TASK-0002
**Status:** Accepted for repository execution
**Owner:** Technical Program Lead
**Effective date:** 2026-10-10

This hierarchy determines which evidence controls when StayRelay sources conflict. It separates execution order, product intent, implemented repository truth, deployed/provider truth, and historical research.

## 1. Direct current authority and execution controller

The current user's explicit instructions define authorized work and external-action boundaries. The committed `StayRelay_Exact_1100_Task_Production_Tracker.xlsx` controls TASK-0001 through TASK-1100 identifiers, dependencies, status fields, acceptance criteria, and production gates.

Neither source proves that a provider account, legal conclusion, payment approval, partner relationship, production deployment, or business transition exists. Those claims require their own authoritative evidence.

## 2. Implemented repository truth

For code and local behavior, the exact reviewed commit, lockfile, migration head, generated types, tests, build output, and runtime result outrank prose that describes intended behavior. `docs/ai/STATE.md` points to the active evidence but does not replace it.

Examples:

- `package.json`, `pnpm-lock.yaml`, and executed version commands control the installed toolchain claim.
- Migrations and generated types control the implemented schema claim.
- Server handlers plus executed contract checks control API behavior claims.
- A UI fixture or screenshot cannot prove live inventory, transfer, payment, check-in, or payout state.

Repository evidence is limited to the commit and environment where it was observed. An unmerged branch does not establish `main`; a local build does not establish a Vercel preview or production deployment.

## 3. Server, database, and provider truth

For live or external state, a harmless read from the exact verified account, organization, project, region, environment, deployment, database, or provider object outranks repository assumptions and screenshots.

Record the target identity, environment class, operation, timestamp, result, and permission limitation without exposing secrets. Examples include:

- exact deployment ID and commit for hosting state,
- exact project and migration head for database state,
- server-owned roles and MFA state for administrator access,
- provider event plus internal ledger reconciliation for money state, and
- buyer-specific authoritative evidence for transfer confirmation.

A connector badge, environment variable name, public key, browser redirect, CRM record, model output, QR preview, or successful local health check is not authoritative external state.

## 4. Audited control and cross-domain sources

The current audited control set governs product structure, domain ownership, safety invariants, and cross-domain decisions:

1. Master Control Index
2. Audited Volume 12 — Complete Business Platform Blueprint
3. V11 — Pre-Mortem & AI Execution Strategy
4. Platform Control Matrix
5. Project Control Center
6. current architecture decision records in `docs/adr`

Use the newest explicitly audited or user-approved version. Planning approval does not prove that an external dependency or production behavior exists.

## 5. Current technical, experience, and domain specifications

Use the current Master Technical & Interactive Design Specification, UI/UX Blueprint, current UI/UX audit, and audited domain volumes V01 through V10 for their owned details. The repository [canonical planning map](../ai/SOURCE-OF-TRUTH.md) retains the known document links and recorded review statuses.

When these sources conflict with the audited control set, preserve the conflict and resolve it through the owning task or ADR. Do not silently choose business rules, state transitions, risk limits, money behavior, identity policy, legal claims, or provider capabilities.

## 6. Current official external documentation

Official provider, framework, security, accessibility, and standards documentation controls facts that change outside the repository, subject to verification against the actual selected account and plan.

Examples include supported runtime versions, API contracts, service regions, plan limits, OWASP ASVS, and WCAG. Record the source URL, retrieval date, exact relevance, and uncertainty. Public documentation cannot prove the configuration or approval of StayRelay's account.

## 7. Historical implementation evidence

The earlier 180-task roadmap, its branches, commits, tests, ADR inputs, and handoffs remain historical evidence. They may satisfy or accelerate a new task only when the new task's acceptance criteria are explicitly mapped to the exact evidence and still hold in the current repository/environment.

Do not bulk-mark the new ledger from matching task numbers or similar titles. The numbering systems are distinct.

## 8. Research, prototypes, duplicates, and generated material

Raw research, original dossier copies, duplicate exports, archived proposals, prototypes, generated UI, and synthetic fixtures are supporting or historical material unless a current audited source promotes a specific item.

- The old Next.js/AWS/Redis/Twilio proposal remains historical.
- Prototype interactions do not define backend contracts.
- Generated imagery cannot represent a real property, document, review, partner approval, or transaction evidence.
- Search fixtures remain fictional and non-bookable.

## Conflict-resolution procedure

For every material conflict:

1. identify the exact claims and source versions,
2. classify each source using this hierarchy,
3. inspect current repository and provider truth where relevant,
4. name the owning task, accountable owner, affected feature gate, and evidence needed,
5. keep unsafe or uncertain behavior disabled,
6. record the resolution in the task evidence and an ADR when architectural, and
7. update the tracker without deleting superseded provenance.

Actual implementation or provider state can disprove a planning claim, but it cannot authorize an unsafe or unapproved business transition. The applicable policy and accountable approval still control whether the feature may be enabled.

## Known source gaps

- The uploaded 1,100-task workbook contains the summary, task ledger, image registry, and visual rules. It does not embed the referenced full production sourcebook.
- Google Drive source registers and current provider accounts are not callable in this session.
- Several canonical documents remain linked rather than stored in the repository; their current content/status cannot be independently refreshed here.
- GitHub API access is `Forbidden`, although native Git read and push work.

These gaps are explicit. Work may continue using verified repository evidence and available audited sources, but no missing source, provider state, review, or approval may be invented.

