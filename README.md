# StayRelay

Starter for the StayRelay hotel reservation platform: a Vite + React + TypeScript guest experience with a Node.js API surface for Vercel.

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

The web app and local Node API start together. Vite proxies `/api/*` to the API on port 3000. Vercel deploys files in `api/` as Node.js functions; the health function shares its response contract with the local API.

## Useful scripts

```sh
npm run typecheck
npm run build
npm run preview
```

## Initial routes

- `/` — guest marketplace and exact-date search shell
- `/passport` — Reservation Passport empty state
- `/operations` — privileged operations workspace placeholder

These screens are scaffolding; no inventory, auth, payment, QR credential, booking, or operator actions are connected yet.
