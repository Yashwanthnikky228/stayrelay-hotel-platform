# Provider integration capability inventory

**Observed:** 2026-10-10
**Mode:** repository and connector capability inspection only
**Production actions:** prohibited

This record covers the OpenAI Platform, Supabase, and HubSpot capabilities requested for StayRelay. A composer label, plugin reference, environment name, or public client key is not evidence of an authenticated account, project, scope, or safe write target.

## Repository baseline

- No OpenAI, Supabase, or HubSpot SDK is declared in a manifest or the pnpm lockfile.
- No provider adapter, migration, generated database type, RLS policy, storage policy, CRM outbox, provider webhook, or AI endpoint exists.
- No `.env.example` or committed provider configuration exists. Environment files are ignored.
- `API_PORT` is the only application environment variable referenced in source.
- The API health route is enabled; property inventory deliberately returns `503 INVENTORY_NOT_CONFIGURED`.
- Provider identities, projects, regions, environments, schema heads, scopes, budgets, and retention settings are unverified.

## Connector capability result

The active session exposed no callable OpenAI Platform, Supabase, or HubSpot methods and no connector discovery tool. No harmless provider read could therefore be executed. No account, project, portal, environment, schema, or permission claim is made, and no external state was changed.

| Provider | Permitted product role | Current verified state | Required harmless reads before implementation |
| --- | --- | --- | --- |
| Supabase | Candidate PostgreSQL system of record, authentication, and private evidence storage | No connector, SDK, project ID, region, environment, migration head, generated types, or RLS evidence | organization owner, exact project reference, Mumbai region, environment/branch, production flag, API capability, migration head, auth/storage/RLS posture, backups and recovery |
| HubSpot | Derived asynchronous CRM for approved hotel/property leads, seller organizations, onboarding, and privacy-safe case references | No connector, SDK, portal, authentication mode, object mapping, pipeline, team, or scope evidence | portal/account, granted scopes, objects/properties, pipelines, teams, webhook capability, rate limits, and whether every inspected record set is non-production or approved |
| OpenAI Platform | Optional redacted, human-reviewed operations assistance for an approved use case | No connector, SDK, API project, model policy, budget, retention setting, or approved application flow | organization/project, usable API capability, approved model, spend/rate limits, retention/data controls, and the specific roadmap/privacy-approved use case |

## Authority boundaries

### Supabase

The server remains authoritative for commands and audit state. Every exposed table requires explicit RLS and least-privilege grants, with negative tests for anonymous, guest, seller, operations, admin, service, cross-user, and privilege-downgrade access. Use ordered reviewed migrations against a verified disposable development or preview environment. Never edit an applied migration or infer production permission from a publishable key.

### HubSpot

CRM synchronization is derived and asynchronous. HubSpot cannot own reservation evidence, identity, eligibility, risk, inventory, quote, order, payment, ledger, transfer, check-in, claim, refund, or payout truth. Keep booking documents, Passport/ID data, card/bank data, authentication secrets, and unnecessary guest PII out. Use an outbox, external IDs, provenance, consent/legal basis where required, signed webhook verification, deduplication, idempotency, bounded retries, redacted logs, and a kill switch. CRM failure cannot decide booking success.

### OpenAI Platform

Model output cannot decide identity, transfer eligibility, risk/capital approval, fraud, payment, refund, payout, legal compliance, or another consequential transition. An approved implementation must run server-side, minimize and redact input, treat documents and CRM text as untrusted, validate structured output, cite source evidence, enforce budget/rate/timeout limits, fail closed, and require human review. Do not send real customer data until provider terms, retention, privacy, and the data flow are approved.

## Proposed configuration contract

These names are a design proposal only. They are absent and have no values.

| Provider | Non-secret configuration | Server-only secrets |
| --- | --- | --- |
| Supabase | `STAYRELAY_SUPABASE_ENABLED`, `STAYRELAY_SUPABASE_URL`, `STAYRELAY_SUPABASE_PROJECT_REF`, `STAYRELAY_SUPABASE_REGION` | `STAYRELAY_SUPABASE_SERVICE_ROLE_KEY`, `STAYRELAY_SUPABASE_DATABASE_URL` |
| HubSpot | `STAYRELAY_HUBSPOT_SYNC_ENABLED`, `STAYRELAY_HUBSPOT_PORTAL_ID` | approved private-app token or OAuth client secret after the authentication mode is selected |
| OpenAI Platform | `STAYRELAY_OPENAI_ASSIST_ENABLED`, `STAYRELAY_OPENAI_PROJECT_ID`, `STAYRELAY_OPENAI_MODEL`, `STAYRELAY_OPENAI_TIMEOUT_MS` | `STAYRELAY_OPENAI_API_KEY` |

If browser Supabase authentication is later approved, public URL/key names must be documented separately. A public key still grants no business authority and does not replace RLS or server checks. Pipeline/property mappings belong in versioned configuration after HubSpot inspection, not guessed environment variables.

## Implementation order and blockers

1. Complete the controlling ownership, provider, environment, and architecture tasks in the roadmap.
2. Verify each connection with harmless reads and record the exact non-production target.
3. Add provider-neutral server interfaces and validated configuration without enabling features.
4. Implement one reviewed adapter slice with timeouts, bounded retries, correlation IDs, idempotency, redaction, degraded state, and kill switch.
5. Add contract, authorization, replay/deduplication, prompt-injection where applicable, and provider-outage tests.
6. Apply migrations or external writes only to the exact approved development/preview target, after reviewing the diff and rollback.

Current blockers are the absence of callable connectors and verified provider targets, plus the roadmap dependencies for Supabase environments, schema/auth/RLS, CRM data mapping, and an approved OpenAI use case. These blockers do not prevent provider-neutral local design work.

