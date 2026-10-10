# ADR-0003 — Foundation runtime and hosting boundaries

**Date:** 2026-10-10  
**Roadmap tasks:** TASK-075, TASK-078  
**Status:** Accepted for development and preview preparation; provider deployment remains conditional  
**Supersedes:** The npm/Vite starter assumptions recorded in ADR-0001 where this decision is more specific

## Context

StayRelay now has a tested pnpm workspace with separate customer, operations, and API applications. The audited architecture still targets a provider-reviewed edge and data design, while the repository needs a reproducible local and preview-capable foundation before provider accounts, environments, and deployment settings are verified.

The current repository contains no database migration head, generated database types, authenticated operations data, live inventory, valid Reservation Passport credential, payment rail, or production deployment evidence. A hosting configuration in source control therefore defines an integration boundary; it does not prove that a Vercel, Cloudflare, or Supabase environment is linked or suitable.

## Decision

### Runtime and workspace

- Use Node.js `24.19.0` and pnpm `11.19.0` as the tested development baseline.
- Keep one pnpm monorepo with `apps/customer`, `apps/operations`, `apps/api`, `packages/domain`, and `packages/ui`.
- Use frozen lockfile installation, strict TypeScript checks, framework builds, and focused contract tests as the foundation verification path.

### Frontend boundaries

- Use React Router `8.4.0` Framework Mode with `ssr: false` for the customer and operations applications.
- Build the customer and operations applications as separate static outputs. The operations URL is an application boundary only; server authorization must protect every privileged record and command.
- Keep operations records and actions disabled until authenticated roles, ownership evidence, and server enforcement exist.

### API and hosting boundary

- Keep the Express application as the local API host and share response contracts with the Vercel function adapters.
- For a future customer preview, the Vercel project root must be the repository root so `api/` functions and `apps/customer/build/client` are available together. Unknown `/api/*` paths must return a typed API `404` before the customer SPA fallback.
- Treat `apps/operations` as a separate Vercel project only after its project settings, access controls, and permission to include `packages/ui` outside its root are verified.
- The checked-in Vercel configuration is a temporary preview integration path. It is not the final production runtime decision and authorizes no deployment.

### Target provider gates

- PostgreSQL remains the system-of-record direction. Supabase Mumbai remains conditional on verified organization ownership, project ID, region, environment, plan, migration head, RLS posture, backups, recovery, and data-handling requirements.
- Cloudflare remains an edge candidate. Worker compute is not selected until the actual account, plan, runtime compatibility, observability, limits, and failure behavior are verified.
- Application code must retain provider-neutral domain and adapter boundaries so a preview host does not become an accidental business-system authority.

## Temporary exception and expiry

The Vercel static applications plus Node function adapters are accepted only to unblock local development and a later approved preview. Revisit or replace this exception before TASK-081 establishes isolated deployment environments and before TASK-098 begins transaction-capable implementation. An accountable architecture review must then either:

1. verify this topology against the selected providers and security requirements,
2. replace it with the approved Cloudflare/API topology, or
3. record a new time-bounded exception with owner, evidence, rollback, and expiry.

Until that review, production deploys, production variables, production provider mutations, real inventory, authentication authority, transaction writes, and privileged operations remain disabled.

## Consequences

- Local development has explicit ports: customer `5173`, operations `5174`, API `3000`.
- Customer and operations builds can be evaluated independently while sharing audited interface tokens.
- The API returns `503 INVENTORY_NOT_CONFIGURED` for property inventory and uses no write routes.
- A passing local build or checked-in routing file is not evidence of a linked provider project, preview behavior, production readiness, security review, or accessibility conformance.
- Provider identity, account ownership, environment class, region, scopes, secrets, and deployment result must be recorded from harmless reads before relying on them.

## Verification evidence

The foundation slices recorded in `docs/ai/TASK-075-FOUNDATION.md` verified:

- frozen pnpm installation with the committed lockfile,
- strict TypeScript type generation and type checking,
- separate customer and operations framework builds,
- customer navigation and disabled operations-shell browser behavior,
- shared Express and serverless response contracts,
- API health `200`, disabled inventory `503`, unknown API `404`, and unsupported method `405`, and
- nine focused unit tests after the marketplace search-state repair.

Vercel project settings and deployed routing were not verified. Supabase and Cloudflare project configuration was not changed.

## Rollback

Revert this ADR and the bounded TASK-075 foundation commits before replacing package, framework, or hosting boundaries. Preserve domain contracts and audited source history. Do not reset provider state because this decision created none.

## References

- [Architecture decision register](0002-architecture-decision-register.md)
- [TASK-075 foundation record](../ai/TASK-075-FOUNDATION.md)
- [Repository audit](../ai/TASK-074-REPOSITORY-AUDIT.md)
- [Canonical planning sources](../ai/SOURCE-OF-TRUTH.md)

