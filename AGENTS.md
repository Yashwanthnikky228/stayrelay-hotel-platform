# StayRelay repository instructions

These instructions apply to the whole repository. Read `docs/ai/STATE.md`, `docs/ai/SOURCE-OF-TRUTH.md`, and the ADRs relevant to the active task before editing.

## Product boundary

StayRelay is an evidence-backed hotel reservation transfer marketplace in development. Current cards and workflows are fictional, non-bookable previews. No live inventory, valid Reservation Passport, privileged operations data, payment, refund, or seller payout is enabled.

Follow the dependency-ordered roadmap and use the newest audited source for the active domain. Research, prototypes, old Next.js/AWS proposals, and fixture behavior do not override the canonical planning set. Record unresolved conflicts rather than silently choosing business, legal, financial, risk, or provider behavior.

## Tested foundation

- Node.js `24.19.0` from `.node-version`
- pnpm `11.19.0` from the root `packageManager`
- React `19.3.0`
- React Router Framework Mode `8.4.0` with `ssr: false`
- Vite `8.3.4`
- TypeScript `6.0.3`

Use the committed lockfile. In this cloud environment, set `PNPM_CONFIG_STORE_DIR=/tmp/stayrelay-pnpm-store` when the default pnpm store is unavailable. Do not commit that machine-specific path.

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm test:unit
pnpm dev
pnpm dev:customer
pnpm dev:operations
pnpm dev:api
```

`pnpm dev` starts customer `5173`, operations `5174`, and API `3000`. `pnpm preview` serves the customer build on `4173`. There is currently no root lint, format, integration-test, end-to-end-test, or migration command. Add a real command in a bounded task before claiming that gate exists.

## Current module ownership

- `apps/customer`: customer marketplace and Reservation Passport. Its `/operations` route is disabled public explanatory copy.
- `apps/operations`: separate privileged-console shell. It contains no privileged records or enabled actions.
- `apps/api`: local Express host and server-owned HTTP boundary.
- `api`: Vercel function adapters sharing API response contracts.
- `packages/domain`: shared domain types and contracts; it does not authorize state changes.
- `packages/ui`: audited tokens and shared CSS.

The UI projects server truth. Only an owned domain/API command may change business state. The operations UI must never write tables directly. Provider adapters translate external events; they do not own internal ledger or lifecycle truth.

## Required trust states

Keep these states distinct in types, APIs, copy, and tests:

1. reservation verified,
2. eligible for transfer,
3. transfer in progress,
4. transfer confirmed only with authoritative buyer-specific evidence, and
5. ready for arrival only after the required pre-arrival recheck.

Do not collapse them into one success badge. `UNKNOWN`, `AMBER`, conflicting, stale, or insufficient evidence fails closed. Eligibility does not imply risk approval, payment, transfer confirmation, arrival readiness, or payout approval. Eligibility and risk capacity are separate mandatory decisions.

A QR or Passport preview is not an operational credential. Synthetic fixtures must remain visibly fictional and non-bookable.

## Data, money, and time invariants

- Store money as integer minor units with an explicit currency.
- Keep price, platform fee, reserve treatment, refund, adjustment, seller payable, provider settlement, and internal ledger entries distinct.
- Use idempotency keys and reconcile server state with provider state. A browser redirect is never payment authority.
- Release seller payout only after the approved post-stay rule and its human/server gates pass.
- Persist timestamps in UTC and carry the hotel's explicit timezone for local rules and display.
- Version reservation evidence, policy, eligibility, risk, and other decisions that can become stale.
- Append-only audit history is a required future invariant; do not claim it exists until implemented and verified.

## Security and provider controls

Never put credentials, production tokens, service-role keys, real reservation documents, identity documents, seller bank details, or payment secrets in source, prompts, fixtures, tests, logs, screenshots, or handoffs. Do not weaken authentication, authorization, RLS, WAF, signature verification, or negative tests to make a check pass.

Before relying on an external system, prove the exact account, organization, project, region, environment, scopes, and operation with a harmless read. A connector label, environment variable name, public key, local fixture, or successful health check is not evidence of authority.

- Supabase remains conditional until its organization, project, Mumbai region, environment, migration head, RLS, backups, and recovery are verified.
- HubSpot may hold approved asynchronous CRM projections only. It is not the source of truth for reservations, identity, eligibility, inventory, money, claims, or payouts.
- OpenAI may assist with an approved, redacted, human-reviewed workflow. It cannot decide identity, eligibility, risk, fraud, refunds, payouts, legal compliance, or another consequential transition.
- Vercel configuration is an unverified preview adapter. Cloudflare remains conditional on account and runtime evidence. Neither authorizes production deployment.

Production deploys, main-branch merges, real customer/payment activity, provider production mutations, external messages, and claims of partner approval require explicit evidence and authorization.

## Change workflow

Use one roadmap task or bounded subtask per branch. Default bound: at most one migration, five hand-edited files, and about 300 net non-generated lines. Split work or create an ExecPlan when the task exceeds that bound, crosses modules, changes auth/RLS/money/evidence, or introduces an architecture exception.

Before editing:

1. inspect the working tree and preserve unrelated changes,
2. identify the controlling source sections and ADRs,
3. record current provider/environment and migration/generated-type state,
4. identify the owned command/data boundary and failure state, and
5. state the acceptance evidence and rollback.

Keep generated artifacts separate from hand edits. Never edit an applied migration. Do not manufacture approvals, provider IDs, test results, source-register updates, or live behavior.

## Definition of done

A bounded change is complete only when applicable evidence is recorded:

- required existing checks pass (`pnpm typecheck`, `pnpm build`, and focused `pnpm test:unit` where behavior changed),
- risk-critical paths include named negative and failure cases,
- changed files, commands, provider/environment mode, and migration state are explicit,
- P0, money, evidence, auth, provider, and migration work includes rollback or recovery,
- UI work includes applicable keyboard, responsive, accessibility, loading, empty, error, and screenshot/browser evidence,
- payment, auth, evidence, RLS, and migration work receives the required human review,
- `docs/ai/STATE.md` is updated with exact commit/evidence and honest blockers, and
- no production, provider, legal, security, or accessibility claim exceeds the executed evidence.

