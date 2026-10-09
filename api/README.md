# Vercel API adapters

Vercel deploys each TypeScript module here as a Node.js function. The web app calls these same `/api/*` paths in local development through the Vite proxy to `apps/api`.

`health.ts` is a runtime smoke check. `properties.ts` returns a typed `INVENTORY_NOT_CONFIGURED` response until a verified inventory provider and policy checks are connected. Neither endpoint presents local fixtures as real availability.
