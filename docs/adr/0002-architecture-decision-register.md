# ADR-0002 — StayRelay architecture decision register

**Date:** 2026-10-09  
**Roadmap task:** TASK-005  
**Status:** Architecture baseline recorded; provider and external approval gates remain conditional  
**Supersedes:** None

This register translates the audited Master Control Index, V08, Volume 12, Roadmap v3, and TASK-004 recheck into repository decisions. “Accepted” means an internal product/engineering baseline. It does not constitute legal advice, provider approval, a configured service, or authorization to launch a real-money pilot.

## Decision register

### ADR-0002.1 — Modular monolith with explicit domain boundaries

**Status: Accepted.**

Build the first production architecture as a TypeScript modular monolith. Domain services own their business rules and sanctioned commands/read models; deploy boundaries may change later without changing domain ownership.

**Rationale:** Audited V08 defines this as the smallest safe production system. It avoids premature service splitting while requiring clear ownership and interfaces.

**Consequences:** Keep domain packages/modules explicit; do not let UI or direct table CRUD own policy. Add separate services only when measured operational or scaling needs justify them.

### ADR-0002.2 — Separate customer and operations product surfaces

**Status: Accepted for product boundaries; deployment separation deferred.**

Provide distinct customer/seller and operations/admin interfaces with separate route groups, permission checks, and task-appropriate data projections. Do not expose privileged operations by hiding controls in a shared client. Whether they deploy as separate frontend applications remains open.

**Rationale:** Volume 12 defines customer and operations projections as separate parts of the product and specifies role-separated operational workflows. The Platform Control Matrix controls page/workflow and RBAC detail.

**Consequences:** Enforce authorization in server actions/APIs. A separate URL, menu, or React route is not a security boundary.

### ADR-0002.3 — Supabase Mumbai as the preferred database platform, pending account verification

**Status: Conditional; no project exists in the connected account.**

Use PostgreSQL as the system of record. Supabase Mumbai (`ap-south-1`) is the preferred hosted database candidate only after project, plan, region, security settings, backup/recovery, and data-handling requirements are verified. The connected account listed no projects during TASK-004.

**Rationale:** The audited architecture names Supabase Mumbai and PostgreSQL; current Supabase documentation lists Mumbai as a specific region.

**Consequences:** Do not create tables, migrations, auth configuration, or production secrets against an assumed project. Keep the data layer and application contracts portable. A region choice is not by itself a legal/privacy compliance determination.

### ADR-0002.4 — Cloudflare limited to an edge role until compute fit is proven

**Status: Conditional; account/plan and runtime compatibility unverified.**

Cloudflare is the planned edge layer for the roles supported by the final deployment design (such as DNS, CDN, WAF, or routing). Do not assume that the existing Node/Express API can run as a Cloudflare Worker. Select Worker compute only after reviewing runtime compatibility, workload, plan limits, observability, and failure behavior against the actual account.

**Rationale:** Volume 12 names Cloudflare edge, while TASK-004 found Workers limits are plan-dependent and no account/project configuration is available.

**Consequences:** Keep the API runtime decision open in the deployment ADR. Never infer account capacity from public limits alone.

### ADR-0002.5 — Release seller funds only after approved post-stay completion

**Status: Accepted as a release invariant; timing and provider mechanics open.**

Seller payout eligibility follows the approved post-stay completion rule. Keep seller payable, platform fee, refunds/adjustments, and recovery entries separately auditable. Provider settlement/reconciliation must not be mistaken for the internal ledger state.

**Rationale:** The audited business blueprint requires delayed payout until post-stay conditions are satisfied.

**Consequences:** No immediate seller payout at booking or transfer. Exact wait period, claim window, release authority, reserve treatment, and PSP capability require business, finance, legal, and provider evidence before activation.

### ADR-0002.6 — Eligibility and risk capacity are independent mandatory gates

**Status: Accepted.**

Eligibility answers whether this specific reservation can be transferred under current reservation evidence, property/channel/rate policy, and a valid route. Risk capacity answers whether StayRelay may carry the exposure under current limits. A listing can proceed only when both decisions independently pass and remain current.

**Rationale:** V08 and Volume 12 distinguish transfer legitimacy from platform exposure capacity.

**Consequences:** Persist separate versioned decisions and reasons. Evidence, policy, route, exposure, or limit changes invalidate dependent stale decisions. Neither an eligibility pass nor a risk pass implies the other.

### ADR-0002.7 — AI may assist evidence extraction but cannot be an authority

**Status: Accepted for the pilot.**

OCR/AI may suggest candidate values for review. A person or independently authoritative source must confirm every material value used in transfer, eligibility, risk, payment, refund, payout, or recovery decisions. AI cannot approve or override those decisions.

**Rationale:** Volume 12 explicitly requires human confirmation or independent authority for material extracted fields in the pilot; the platform truth chain is server-authoritative.

**Consequences:** Preserve source evidence, extraction output, confirmation actor/source, and decision version. Missing or uncertain verification fails closed.

### ADR-0002.8 — Provider-neutral payment and payout adapters

**Status: Accepted as an application boundary; provider selection/activation blocked on approval.**

Keep internal order, payment, refund, payout, and ledger contracts provider-neutral. Isolate provider-specific authorization, capture, refunds, settlement, webhook, and payout behavior behind adapters. The internal ledger remains the financial record and is reconciled to provider state.

**Rationale:** Roadmap v3 requires provider-neutral payment adapters. Volume 12 limits the India pilot to rails the approved PSP enables for StayRelay's actual merchant/marketplace structure.

**Consequences:** Do not name a PSP, expose a rail, accept live funds, or simulate successful money movement without documented provider onboarding, business/legal approval, idempotency, reconciliation, refund, dispute, and failure evidence.

### ADR-0002.9 — Persist the reservation truth chain as versioned server state

**Status: Accepted.**

The authoritative lifecycle is Reservation + Evidence + PolicyVersion → TransferRoute → EligibilityDecision → RiskApproval → Listing/PriceQuote → Order → Payment/Ledger → TransferExecution → Pre-arrival → Check-in → Claim/Refund/Recovery → SellerPayout → Completion. Persist distinct states, actors, source/version links, idempotency keys, and append-only audit history. Clients project state; they cannot create operational success.

**Rationale:** The Master Control Index names this chain; V08 defines versioned decisions, idempotent payments, and append-only audit history; Volume 12 requires server-authoritative truth.

**Consequences:** Commands must revalidate relevant versions and concurrency conditions. Retries cannot double charge, reserve, refund, transfer, or pay. Stale, unknown, conflicting, or insufficient evidence fails closed.

## Gates and revisit conditions

The following decisions are architecture direction, not permission to transact. Keep live booking, payment, transfer, and payout features disabled until the relevant evidence exists.

- **Supabase:** project identity/owner, Mumbai region, plan, access/RLS, backups, recovery, and privacy/data handling verified.
- **Cloudflare:** account/plan, edge and compute responsibilities, runtime support, limits, logs, and failure model verified.
- **Transferability:** property × channel × rate × reservation-condition authority and reservation-specific confirmation path are evidenced.
- **Payments and payouts:** provider approves the actual marketplace/merchant model and enabled rails; legal/tax/finance review, ledger mapping, reconciliation, claims, refunds, reserves, chargebacks, payout controls, and operational owners are documented.
- **Pilot:** only the approved city/date cluster and GREEN inventory, with human route/eligibility verification, separate human risk approval, buyer-specific evidence, pre-arrival revalidation, urgent support, and signed go/no-go.
- **Security/accessibility:** verify implementation against OWASP ASVS 5.0.0 and WCAG 2.2 AA; this ADR does not claim either audit complete.

## Source record

- [Roadmap v3 — TASK-005](https://docs.google.com/spreadsheets/d/1YNKI5HK_CFAhP63FGPTPthzTRDddeWg-8IcOLfCTaYs/edit)
- [Master Control Index](https://docs.google.com/document/d/1A8i7wvG1jRgYUpFaKeXRJEn9gbdWJIwPXcM1RITHS0s/edit)
- [Audited Engineering Architecture, V08](https://docs.google.com/document/d/1L98Xa90ny-rsfo-tQ3_Rm6TDAYLhgMxyS2h1hyfOHu0/edit)
- [Audited Volume 12 — Business Platform Blueprint](https://docs.google.com/document/d/1gPti4J3qkQVYZhXXWLSWQLbG2anECheHrGwhzsTYuvs/edit)
- [Platform Control Matrix](https://docs.google.com/spreadsheets/d/1iQOVkSXN4CYgwS5BIMmeOKTAGkYS9UnYMo4han2ETMU/edit)
- [TASK-004 platform and standards recheck](../ai/TASK-004-PLATFORM-RECHECK.md)
