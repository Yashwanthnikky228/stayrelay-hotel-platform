# StayRelay governing charter

**Task:** TASK-0001
**Status:** Accepted for repository execution under the current user instruction
**Owner:** Technical Program Lead
**Effective date:** 2026-10-10
**Review trigger:** a change to product scope, production authority, source hierarchy, or the 1,100-task controller

## Purpose

StayRelay is an evidence-backed marketplace and operating platform for transferring eligible hotel reservations. The product must preserve the distinction between an ordinary hotel search site and a controlled reservation-transfer system whose inventory, eligibility, risk, payment, transfer, arrival, claim, and payout states are server-authoritative and independently evidenced.

This charter governs repository work. It establishes authority, scope, exclusions, production boundaries, and evidence rules. It does not replace the domain specifications or grant external legal, financial, hotel, OTA, payment-provider, database, hosting, or production approval.

## Execution authority

The exact `TASK-0001` through `TASK-1100` ledger in `StayRelay_Exact_1100_Task_Production_Tracker.xlsx` controls task identifiers, dependencies, status, acceptance evidence, and production completion. The user's 2026-10-10 instruction authorizes routine repository implementation, focused branches, tests, commits, pushes, pull-request preparation, read-only provider inspection, and safe development/preview work.

Earlier 180-task roadmap records remain historical implementation evidence. They are not silently renumbered or discarded. The 1,100-task controller supersedes them for future execution order. TASK-0002 owns the detailed canonical-source map and conflict register.

The following actions require their specific external evidence or authority before execution:

- production deployment, production-domain changes, or a production release;
- merge to the production branch when an accountable review is required;
- production database/provider mutations or production secrets;
- real customer, reservation, identity, payment, refund, payout, or CRM activity;
- legal, tax, financial, hotel, OTA, payment-provider, or partner approval claims;
- external invitations, messages, or publication outside the approved release process; and
- irreversible recovery or deletion actions.

## Product scope

The completed product includes:

- public destination discovery and eligible StayRelay inventory;
- secure visitor registration, verification, sessions, recovery, buyer/seller workspaces, and protected administration;
- seller reservation submission, private evidence handling, verification, eligibility, risk, listing, and transfer workflows;
- buyer search, property/listing detail, inventory holds, checkout, approved payment, Passport, transfer, and arrival workflows;
- server-authoritative ledger, reconciliation, claims, refunds, recovery, and post-stay seller payouts;
- protected operations/admin queues, decisions, access reviews, and audit evidence;
- privacy-safe support, notifications, CRM projections, and optional responsible intelligence;
- accessibility, security, monitoring, backups, rollback, incident response, and emergency marketplace pause; and
- the approved destination and image system without presenting generated assets as real properties or transaction evidence.

## Server-authoritative truth

The authoritative lifecycle remains distinct and versioned:

Reservation + Evidence + Policy Version → Transfer Route → Eligibility Decision → Risk Approval → Listing/Price Quote → Order → Payment/Ledger → Transfer Execution → Pre-arrival → Check-in → Claim/Refund/Recovery → Seller Payout → Completion.

Clients display server truth and submit commands. They cannot create operational success. Provider redirects, CRM records, model output, UI badges, QR previews, and local fixtures are never transaction authority.

The following states must not be collapsed:

1. reservation verified,
2. eligible for transfer,
3. transfer in progress,
4. transfer confirmed by authoritative buyer-specific evidence, and
5. ready for arrival after the required pre-arrival recheck.

Eligibility and risk capacity are separate mandatory gates. `UNKNOWN`, `AMBER`, conflicting, stale, or insufficient evidence fails closed. A failed external dependency cannot silently create inventory, payment success, transfer confirmation, administrator access, or payout authority.

## Production boundary

The current repository is a development foundation. Synthetic marketplace fixtures are non-bookable. The Reservation Passport is not a valid credential. Operations records and actions are disabled. Inventory returns `503 INVENTORY_NOT_CONFIGURED`. No database migration head, generated database types, authenticated provider project, approved payment rail, or production deployment is evidenced.

`TASK-1000` may open only the controlled production beta defined by the ledger. `TASK-1100` may be completed only when the public product is usable within the approved scope, securely authenticated, operationally supported, monitored, rollback-ready, and free of unresolved P0 or P1 defects. A preview URL, local build, connector label, or green CI check cannot substitute for those gates.

## Security, privacy, and money rules

- Keep secrets, production credentials, reservation evidence, identity documents, seller bank details, and payment data out of source, prompts, fixtures, logs, screenshots, and handoffs.
- Enforce administrator access server-side. There is no public administrator registration or hard-coded administrator password.
- Require least privilege, MFA, audit evidence, and access review for privileged roles before production use.
- Store money as integer minor units with currency. Keep order, fee, reserve, refund, seller payable, provider settlement, and internal ledger entries distinct.
- Require idempotency, signature verification, reconciliation, and approved post-stay release before seller payout.
- Persist timestamps in UTC and retain the explicit hotel timezone for local rules and display.
- Treat uploads, CRM content, and model input as untrusted. Minimize and redact data and retain human authority for consequential decisions.
- Meet applicable keyboard, screen-reader, zoom, contrast, reduced-motion, responsive-layout, privacy, security, backup, and recovery acceptance evidence before release.

## Evidence and task completion

Every task uses its exact ledger ID and one bounded branch or documented subtask. Before marking a task done:

1. inspect its dependencies, controlling sources, repository state, provider/environment mode, and existing evidence;
2. implement the deliverable in the owning module;
3. execute the applicable type, build, unit, negative, integration, browser, security, migration, accessibility, or provider checks;
4. inspect the real result and diff for unrelated changes and secrets;
5. record the exact commit, PR or review link, environment, evidence, rollback, and unresolved blockers; and
6. update the 1,100-task ledger and durable repository handoff.

Passed, failed, skipped, blocked, expected-failure, and unrun checks remain distinct. No task is complete because a document merely says it is complete.

## Current disclosed blockers

- Git native read/push works, but the GitHub API currently returns `Forbidden`, blocking automated PR/CI inspection and PR creation.
- OpenAI Platform, Supabase, HubSpot, Vercel, and Google Drive expose no callable account/project methods in the active session; their identities, environments, scopes, and live states remain unverified.
- Supabase project/region/schema/auth/RLS, payment-provider approval, legal/tax decisions, administrator bootstrap identity, production domain, and production release authority remain external gates.
- The uploaded workbook contains the task ledger, summary, image registry, and visual rules. It does not contain the referenced 2.6-million-word sourcebook; repository audited sources remain the available detailed evidence pending TASK-0002 reconciliation.

These blockers are explicit feature gates. They do not invalidate completed local evidence and must not be hidden by mocks or unsupported claims.

