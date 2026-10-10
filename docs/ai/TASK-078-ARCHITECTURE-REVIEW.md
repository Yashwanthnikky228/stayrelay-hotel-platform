# TASK-078 — Frozen architecture and exception review

**Branch:** `task-078/architecture-and-integrations`
**Dependencies:** TASK-075, TASK-076, TASK-077
**Status:** Repository decision set reviewed; external provider decisions remain conditional

## Decision set

| Record | Accepted repository decision | Remaining gate |
| --- | --- | --- |
| ADR-0001 | Vite `8.3.4` baseline | Its npm install language is superseded by ADR-0003 |
| ADR-0002 | Modular monolith, separate product surfaces, trust chain, distinct eligibility/risk gates, post-stay payout rule, AI non-authority, provider-neutral money adapters | Provider, legal, risk, security, accessibility, and pilot evidence named in the ADR |
| ADR-0003 | Node/pnpm workspace, React Router Framework Mode apps, separate builds, shared disabled API contract | Provider-hosted preview unverified; temporary Vercel adapter expires before the earlier of TASK-081 or TASK-098 |

No duplicate ADR was created for decisions already covered by ADR-0001 through ADR-0003. A future material change must update the owning ADR or create a new record with evidence, owner, expiry, and rollback.

## Provider overlay

[Provider integration capability inventory](PROVIDER-INTEGRATION-INVENTORY.md) records the requested OpenAI Platform, Supabase, and HubSpot roles and the active session's lack of callable provider methods. The inventory is a sanitized capability record, not configuration or approval.

Supabase remains the conditional data/auth/storage candidate. HubSpot is restricted to derived CRM projections. OpenAI is optional assistance under human authority. None is enabled in code or verified against an account.

## Review evidence

- inspected root and app manifests, pnpm lock references, source environment access, API behavior, ADR-0001 through ADR-0003, source map, repository instructions, and execution-plan contract;
- confirmed no provider SDK/config/migration/generated-type paths by repository search;
- inspected active tool capability names and found no callable methods for the requested providers; and
- made no provider, deployment, schema, secret, production, or external-message change.

## Revisit and rollback

Revisit ADR-0003 before the earlier of TASK-081 environment establishment or TASK-098 preview/staging deployment. Provider-specific implementation also requires the roadmap dependencies and exact gates in the capability inventory.

This task changes documentation only. Rollback is a bounded revert of the TASK-078 records; there is no external rollback because no external state was created.

