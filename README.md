# StayRelay

StayRelay is an evidence-backed hotel reservation transfer marketplace in development. Current marketplace cards are fictional, non-bookable design fixtures. No real reservation transfer, Passport credential, operations record, payment or seller payout is enabled.

## Workspace

- `apps/customer` — React Router 8 Framework Mode customer app (SPA output `build/client`), marketplace and Passport
- `apps/operations` — separate Framework Mode operations app; access and data disabled pending server authorization
- `apps/api` — local Express API; inventory returns `503 INVENTORY_NOT_CONFIGURED`
- `api/` — Vercel API adapters, to be reviewed against final hosting mode
- `packages/domain` — typed shared contracts
- `packages/ui` — audited colors, typography, shape tokens and CSS

## Local development

Node 24.19.0 and pnpm 11.19.0 are the tested versions (`.node-version`, root `packageManager`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The customer app starts on port 5173, operations on 5174, and API on 3000. The customer Vite server proxies `/api` to the local API. `GET /api/health` returns 200; `GET /api/properties` returns 503 until verified inventory and backend gates exist.

```sh
pnpm typecheck
pnpm build
pnpm test:unit
```

Build output is `apps/customer/build/client` and `apps/operations/build/client`. Neither output enables live transactions. Repository state, source precedence and current blockers are in [`docs/ai/STATE.md`](docs/ai/STATE.md) and [`docs/ai/SOURCE-OF-TRUTH.md`](docs/ai/SOURCE-OF-TRUTH.md).
