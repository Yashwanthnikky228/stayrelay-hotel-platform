# UI/UX brief TASK-001 — Route audit

**Date:** 2026-10-10  
**Scope:** Customer, operations and API route audit  
**Repository:** `Yashwanthnikky228/stayrelay-hotel-platform`

This is the first task from `StayRelay_UI_UX_First_100_Task_Build_Brief.txt`. It is intentionally separate from the canonical 1,100-task governance IDs and does not overwrite historical TASK-0001 evidence.

## Executed route checks

Checks were made against the existing local development processes. The API process started for this audit; customer and operations processes were already listening on their configured ports.

| Surface | Route | Result | Observed state |
| --- | --- | ---: | --- |
| Customer | `/` | 200 | Marketplace renders fictional preview cards when verified inventory is unavailable. |
| Customer | `/passport` | 200 | Empty Passport state; no QR or operational credential is shown. |
| Customer | `/operations` | 200 | Public explanatory disabled state; no privileged records shown. |
| Customer | `/admin/login` | 404 | No customer-side admin login route exists yet. |
| Operations | `/` | 200 | Separate operations shell shows access unavailable and no records. |
| Operations | `/admin/login` | 404 | Hardened admin login landing is not implemented. |
| API | `/api/health` | 200 | Health contract responds. |
| API | `/api/properties` | 503 | `INVENTORY_NOT_CONFIGURED`; fail-closed inventory behavior is correct. |
| API | `/api/missing` | 404 | `NOT_FOUND`; unknown API route behavior is correct. |

## Findings

### Working and truthful

- The marketplace distinguishes server-verified results from fictional, non-bookable examples.
- Passport does not invent a valid reservation, QR credential or arrival status.
- The customer operations route does not expose privileged data.
- The API does not return unverified inventory as bookable data.
- Unknown API paths return a structured 404.

### Broken, empty or misleading for the UI/UX brief

1. `/admin/login` is missing from both customer and operations route maps. The brief requires a quiet public entry to `/admin/login` and a hardened login landing without self-registration.
2. The customer navigation is a foundation shell, not the brief’s complete navigation: Find a stay, Sell a reservation, How it works, Help, Sign in, Get started, and Admin Access are not all present.
3. The Passport page is an empty shell only. Authentication and server-confirmed buyer status are not connected.
4. The operations root is intentionally disabled, but the brief requires a protected portal shell with role-aware queues once identity configuration is supplied.
5. No browser screenshot or visual regression artifact was captured in this environment; the available audit evidence is route-level HTTP output and source inspection.

## Safety decisions retained

- Do not add fake admin records, availability, pricing, transfer confirmation, QR credentials, payment states or payout states to make screens appear complete.
- Keep inventory, authentication, admin authorization, evidence upload, payment and transfer flows disabled until their owning server/provider evidence exists.
- Add `/admin/login` as a safe entry surface only; it must not reveal administrative data or permit public self-registration.

## Reproduction

```text
GET http://localhost:5173/                 -> 200
GET http://localhost:5173/passport         -> 200
GET http://localhost:5173/operations       -> 200
GET http://localhost:5173/admin/login      -> 404
GET http://localhost:5174/                 -> 200
GET http://localhost:5174/admin/login      -> 404
GET http://localhost:3000/api/health       -> 200
GET http://localhost:3000/api/properties   -> 503 INVENTORY_NOT_CONFIGURED
GET http://localhost:3000/api/missing      -> 404 NOT_FOUND
```

## Next bounded UI/UX task

TASK-002 from the brief should reconcile this audit with the existing governance continuation and preserve the current fail-closed behavior. The first implementation candidate is a public `/admin/login` landing shell with no authentication claim or privileged data.
