# StayRelay

StayRelay hotel reservation platform starter: Vite + React + TypeScript guest marketplace, local Express API, and shared domain contracts.

## Product guardrails

- Pilot inventory is reviewed and eligible before it can be shown as bookable.
- `unknown` and unresolved inventory is never sellable.
- Eligibility, risk capacity, payment, transfer, arrival, refund and payout are separate states.
- The Reservation Passport is a projection of server truth; browser state cannot approve or complete a transaction.
- Operations requires separate server-side authorization and an audit trail.
- Do not invent inventory, partner logos, reviews, ratings, urgency or savings claims.

## Run locally

Requires Node.js 22.12+ and npm.

```sh
npm install
npm run dev
```

The web app and Express API start together. Vite proxies `/api/*` to `apps/api` on port 3000. The API returns a typed not-configured response until a verified inventory source is connected. Vercel deploys files in `api/` as Node.js functions.

## Useful scripts

```sh
npm run typecheck
npm run build
npm run preview
```

## Workspace packages

- `src/` — Vite guest-facing app
- `apps/api/` — local Express API
- `packages/domain/` — shared TypeScript domain contracts
- `api/` — Vercel Node.js function adapters

## Project handoff and canonical sources

The active planning set and source precedence are maintained in [`docs/ai/SOURCES.md`](docs/ai/SOURCES.md). Read [`docs/ai/STATE.md`](docs/ai/STATE.md) for the current task, branch, verification evidence, migration status, and blockers. The dossier is referenced by source path and Drive link; it is not copied into this repository.

## Initial routes

- `/` — interactive exact-date search, sample cards and price breakdown preview
- `/passport` — Reservation Passport empty state
- `/operations` — privileged operations workspace placeholder

The marketplace cards are fictional, clearly labelled design fixtures until verified inventory is connected. No booking, authentication, payment, QR credential or operator action is enabled yet.
