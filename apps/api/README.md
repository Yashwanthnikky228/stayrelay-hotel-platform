# StayRelay API

Local Express API for frontend integration. Start it through the root `npm run dev` script or run this workspace's `npm run dev` command directly.

- `GET /api/health` — service smoke check.
- `GET /api/properties` — typed `503 INVENTORY_NOT_CONFIGURED` response until a verified inventory source is implemented.

Do not return unreviewed inventory as eligible. Booking, payment, transfer, arrival and payout status must remain server-authoritative.
