# API

Add one Vercel Node.js function per route under this folder. Keep domain services, authorization, idempotency, validation and persistence on the server. Do not make the client the source of truth for booking, payment, eligibility, risk, transfer, arrival or payout states.

`health.ts` is a deployment smoke-check only; it does not indicate that marketplace services are operational.
