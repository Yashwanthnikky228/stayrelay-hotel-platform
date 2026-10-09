# Vercel API adapters

`health.ts`, `properties.ts`, and `not-found.ts` use the same typed response contract as the local Express API in `apps/api/src/responses.ts`.

- `GET`/`HEAD /api/health` reports API process readiness.
- `GET`/`HEAD /api/properties` returns `503 INVENTORY_NOT_CONFIGURED` until verified reservation-specific inventory and policy controls exist.
- Unsupported methods return `405 METHOD_NOT_ALLOWED` with `Allow: GET, HEAD`.
- Responses carry `Cache-Control: no-store`.

These functions contain no inventory fixtures, authentication, transaction commands, or payment credentials. Hosting path behavior and project ownership need a verified preview deployment before being treated as deployed evidence.
