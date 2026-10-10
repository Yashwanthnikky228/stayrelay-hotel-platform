# StayRelay Canonical Planning Sources

**Purpose:** TASK-002 source-of-truth and planning-set record  
**Recorded:** 2026-10-09  
**Repository:** https://github.com/Yashwanthnikky228/stayrelay-hotel-platform  
**Baseline:** `task-001/repository-baseline` at `085f2944c5a0e519ee4b92b2be923d14eeb891c7`  
**Roadmap:** Final Pending Task List & Project Roadmap v3; 180 tasks, verified dependency graph.

This file links the sources that govern repository work. It does not copy the dossier into Git, approve unapproved business decisions, or turn planning documents into evidence of production behavior or external authorization. Re-read the relevant source sections for every task.

## Authority and conflict handling

### Execution order

The [Roadmap v3](https://docs.google.com/spreadsheets/d/1YNKI5HK_CFAhP63FGPTPthzTRDddeWg-8IcOLfCTaYs/edit) is the dependency-ordered execution register. Preserve TASK-001 through TASK-180 and follow its dependencies and Audit Completion Crosswalk. Do not mark a task complete without its required evidence.

### Product and technical decisions

Apply the newest explicitly audited or founder-approved source. For current planning:

1. The [Audited Master Index and Current Plan](https://docs.google.com/document/d/1CePhROvhZDjGuFaCoPX3H_2Zc67nGrPCtpg8pJ_FgJE/edit), [Roadmap v3](https://docs.google.com/spreadsheets/d/1YNKI5HK_CFAhP63FGPTPthzTRDddeWg-8IcOLfCTaYs/edit), and [Complete Business Platform Master Blueprint (Audited Volume 12)](https://docs.google.com/document/d/1gPti4J3qkQVYZhXXWLSWQLbG2anECheHrGwhzsTYuvs/edit) establish the current plan, task sequence, and cross-domain platform requirements.
2. The [Master Technical & Interactive Design Specification v1](https://docs.google.com/document/d/1yhsU7JrUpC9t7LqcBKTXIv967jxpcINQ/edit), [UI/UX Design Blueprint](https://drive.google.com/file/d/1gCE68qD1UiK0eoRNoU_RGTUJLs7lHHlF/view), [Next-Gen UI/UX Architecture & Pixel-Perfect Audit (2026-10-09)](https://docs.google.com/document/d/12BblQyR3RLA5HXsic8e-lqRFfh-kjQgJzbqG3zaIGKw/edit), and audited domain volumes V01–V11 govern their respective technical, design, and domain details.
3. The [Master Control Index](https://docs.google.com/document/d/1A8i7wvG1jRgYUpFaKeXRJEn9gbdWJIwPXcM1RITHS0s/edit) is the source-navigation and domain-ownership guide. The [Platform Control Matrix](https://docs.google.com/spreadsheets/d/1iQOVkSXN4CYgwS5BIMmeOKTAGkYS9UnYMo4han2ETMU/edit) holds page/workflow, RBAC, notification, exception/refund, integration, and data-domain matrices.
4. The [Pre-Build Deep Diagnostic](https://docs.google.com/document/d/1uq_FQ3NVcQvePwd4nerazA4qNDVOj3ibZHNaF-DADuE/edit) records gap and dependency-repair rationale. It is planning context; Roadmap v3 is the live execution register.
5. Original dossier files, raw research, duplicate copies, and prototypes are historical or illustrative unless a current audited source explicitly promotes a specific item. When sources conflict, preserve the conflict in the task notes and resolve it with an accountable decision; do not silently choose or invent business, legal, risk, financial, state-machine, or provider semantics.

**Status discipline:** Roadmap v3, Master Control Index, V11, Deep Diagnostic, V12 Blueprint, and Platform Control Matrix are marked APPROVED in the audited Project Control Center. The Master Index, Master Technical Specification, UI/UX Blueprint, and V01–V10 appear as IN_REVIEW in that control-center register. The UI/UX audit is dated 2026-10-09, marked APPROVED in the Project Index, and explicitly distinguishes source-supported findings from inferred design recommendations. These statuses are not interchangeable: a planning source can guide implementation without proving that every recommendation is an approved business decision.

## Canonical planning set

### Control, integration, and execution

- [Roadmap v3 — 180-task dependency-ordered execution register](https://docs.google.com/spreadsheets/d/1YNKI5HK_CFAhP63FGPTPthzTRDddeWg-8IcOLfCTaYs/edit) — approved; includes the Audit Completion Crosswalk.
- [Master Index and Current Plan — audited 2026-10-09](https://docs.google.com/document/d/1CePhROvhZDjGuFaKeXRJEn9gbdWJIwPXcM1RITHS0s/edit) — executive/founder operating thesis and pilot direction; currently marked IN_REVIEW in the Project Control Center.
- [Master Control Index — build navigation and source of truth](https://docs.google.com/document/d/1A8i7wvG1jRgYUpFaKeXRJEn9gbdWJIwPXcM1RITHS0s/edit) — approved navigation, domain owners, canonical truth chain, roles, external gates, and pre-code rules.
- [Complete Business Platform Master Blueprint — Audited Volume 12](https://docs.google.com/document/d/1gPti4J3qkQVYZhXXWLSWQLbG2anECheHrGwhzsTYuvs/edit) — approved cross-domain completion layer; supplements rather than replaces V01–V11.
- [Pre-Build Deep Diagnostic and Master Execution Plan](https://docs.google.com/document/d/1uq_FQ3NVcQvePwd4nerazA4qNDVOj3ibZHNaF-DADuE/edit) — approved gap analysis and dependency-repair rationale.
- [V11 — Pre-Mortem & AI Execution Strategy](https://docs.google.com/document/d/100RRZPlh2t2Knil2BIgKAIZ86gVHWyEs00C5AHt9Xfo/edit) — mandatory repository-truth, chunking, migration, testing, provider, and handoff safety protocol.
- [StayRelay Project Control Center](https://docs.google.com/spreadsheets/d/1boSoVj9wFJmawBzgYcYPUpY0RzVZk6vo4cPd3aQYJDM/edit) — source index, claims/evidence, gaps, risks, decisions, changes, deliverables, and workspace map.
- [StayRelay Platform Control Matrix](https://docs.google.com/spreadsheets/d/1iQOVkSXN4CYgwS5BIMmeOKTAGkYS9UnYMo4han2ETMU/edit) — approved workflow, role, notification, exception, integration, and data-domain matrices.

### Technical and experience specifications

- [Master Technical & Interactive Design Specification v1](https://docs.google.com/document/d/1yhsU7JrUpC9t7LqcBKTXIv967jxpcINQ/edit) — canonical editable technical planning document; source register lists v1 and notes the Vite-version contradiction (GAP-0010). Resolve it through TASK-003; do not assume the package manifest is the approved baseline.
- [StayRelay UI/UX Design Blueprint](https://drive.google.com/file/d/1gCE68qD1UiK0eoRNoU_RGTUJLs7lHHlF/view) — internal design intent and screen/state requirements; not external hotel, legal, or financial evidence.
- [Next-Gen UI/UX Architecture & Pixel-Perfect Audit — 2026-10-09](https://docs.google.com/document/d/12BblQyR3RLA5HXsic8e-lqRFfh-kjQgJzbqG3zaIGKw/edit) — current design audit; separates source-supported findings from recommendations and states that the prototype is not a production system.
- [Interactive Design Prototype](https://drive.google.com/file/d/1xokKOUfv_L427o16DSPrDxzcAoPaq16O/view) — illustrative local interactions and fixtures only; never evidence of live inventory, backend state, or integrations.

### Recorded repository decisions

- [ADR-0001 — Pin the Vite 8.3 baseline](../adr/0001-vite-8-baseline.md) resolves TASK-003 to Vite `8.3.4`, locked and tested with Node `24.19.0`. It resolves only the Vite line; TASK-004 still owns verification of the broader framework/toolchain and provider assumptions.
- [ADR-0002 — Architecture decision register](../adr/0002-architecture-decision-register.md) records the modular-monolith, trust-chain, risk, payout, AI, provider-adapter, and conditional provider decisions.
- [ADR-0003 — Foundation runtime and hosting boundaries](../adr/0003-foundation-runtime-and-hosting-boundaries.md) records the tested pnpm/Router workspace and a time-bounded, unverified Vercel preview exception. It authorizes no provider or production action.
- [TASK-078 architecture review](TASK-078-ARCHITECTURE-REVIEW.md) rechecks the three ADRs without duplicating them. Its [provider inventory](PROVIDER-INTEGRATION-INVENTORY.md) records the verified OpenAI Platform, Supabase, and HubSpot capability gaps and authority boundaries.

### Audited domain volumes V01–V10

These are the current audited domain documents. Re-read the volume owning the active roadmap task. Their current register status is IN_REVIEW; treat them as domain specifications, not as evidence that external assumptions are approved.

- [V01 — Strategy, Business Model & Investment Thesis](https://docs.google.com/document/d/1QnbD1HNXTMB6ZKJXd5FEpOd2Yl5rVLvN4vWrumTVLeQ/edit)
- [V02 — Market, Customer, Liquidity, Events & Competition](https://docs.google.com/document/d/1G6OK3o5MeFpPS4yl5vkXB1YJ8yZmWTasR5fjgY1A7xw/edit)
- [V03 — Hotel/OTA Transferability, Policy & Legal Evidence](https://docs.google.com/document/d/1DIufpDBZAo9AA-zYyg8YXdSobpcPi6bPLTWJOM1K-PI/edit)
- [V04 — Revenue, Unit Economics, Payments & Tax](https://docs.google.com/document/d/1KGTXWQnOCDUqlUeQz-5gXEdZu1itr7WFIXnw11JcyJY/edit)
- [V05 — Risk, Reserves, Claims & Recovery](https://docs.google.com/document/d/1S6NhR4b2Bx7y2YSUJwHJFKsRaYRMOyUsxlRk7pxrXLs/edit)
- [V06 — Customer Product, Buyer/Seller UI & UX](https://docs.google.com/document/d/163g_jEAOqietc1Oh8_ec1Zdo4GlnspW9POIw51wubPk/edit)
- [V07 — Operations SOPs, Partnerships & Claims](https://docs.google.com/document/d/1nUVvbrHHyLPetBHn5QlUDuNT0AXk9QSNjzZeIuIDXF8/edit)
- [V08 — Engineering, Architecture, APIs & Data Security](https://docs.google.com/document/d/1L98Xa90ny-rsfo-tQ3_Rm6TDAYLhgMxyS2h1hyfOHu0/edit)
- [V09 — Pilot Execution, Growth Metrics & Scale](https://docs.google.com/document/d/16BSUyEfojXZ9HBrLPHegvfz6BJctmBEbq8E4-3xhDi0/edit)
- [V10 — QA Templates, Registers & Governance](https://docs.google.com/document/d/1lhCzCuv-maE7Mft-O0NKtwDDgX839UBVPiovr6Nqdu0/edit)

[V11 — AI execution safety](https://docs.google.com/document/d/100RRZPlh2t2Knil2BIgKAIZ86gVHWyEs00C5AHt9Xfo/edit) and [V12 — Complete Business Platform Blueprint](https://docs.google.com/document/d/1gPti4J3qkQVYZhXXWLSWQLbG2anECheHrGwhzsTYuvs/edit) are listed above because they control execution and cross-volume integration; they do not replace the domain volumes.

## Historical and non-authoritative materials

The earlier Next.js/microservices/AWS/Redis/Twilio architecture is classified as historical research in [TASK-007](TASK-007-SUPERSEDED-ARCHITECTURE.md). A new ADR is required to revive any of those implementation choices.

- Original volumes in `StayRelay_Dossier_Library/03_ORIGINAL_SOURCE_VOLUMES` and the original Master Index are preserved as historical source copies. Use them only when an audited source points to specific retained material.
- Raw research, duplicate pasted-research copies, and original control-source copies under `99_ARCHIVE/Historical/2026-10-09_Workspace_Cleanup` are not current architecture.
- The prototype is not a backend contract or production implementation. Any synthetic fixtures must be clearly identified and non-bookable.
- Research and internal design documents do not prove India legal classification, tax treatment, payment-provider approval, hotel/OTA transfer permission, reserve funding, executed tests, or pilot success.

## Product invariants carried into every task

- Pilot only: one approved Indian city/event/date cluster, selected properties, GREEN inventory, human verification, separate human risk approval, approved payment rails, auditable transfer evidence, claims/recovery support, and exposure controls.
- UNKNOWN, AMBER, conflicting, stale, or insufficient evidence fails closed; no sale.
- Reservation, evidence, policy version, route, eligibility, risk, quote, order, payment/ledger, transfer, arrival/check-in, claim/refund/recovery, payout, and completion are separate server-authoritative persisted states.
- Frontend surfaces project server truth. They cannot approve, finalize, or simulate operational success.
- An unresolved external authority/provider decision remains an explicit blocker and disabled feature gate.
