# StayRelay verifiable live-state baseline

**Task:** TASK-0007  
**Status:** Accepted for repository execution  
**Owner:** Technical Program Lead  
**Observed:** 2026-10-10  
**Evidence scope:** active branch and local cloud environment only

This baseline separates Git, local runtime, default-branch, deployment, database, provider, and production facts. A successful local request does not establish preview or production behavior.

## Repository identity and commits

| Item | Observed state |
| --- | --- |
| Repository | `https://github.com/Yashwanthnikky228/stayrelay-hotel-platform.git` |
| Default branch | `main` at `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee` |
| Accepted predecessor branch | `task-0006/reconcile-artifacts` at `0526c072056c7cdc9e42e6ddba8ab07f96551930` |
| Active task branch | `task-0007/live-state-baseline` based on TASK-0006 |
| Working tree before baseline edit | Clean |
| Pull-request state | Unverified; native Git works, GitHub GraphQL and REST return `Forbidden` |
| Branch protection and CI | Unverified |

`main` does not contain the current TASK-0001–0007 control chain. No merge was performed.

## Toolchain and installed state

| Component | Manifest or repository requirement | Observed runtime |
| --- | --- | --- |
| Node.js | `>=24.19.0 <25`; `.node-version` 24.19.0 | `v24.19.0` |
| Package manager | `pnpm@11.19.0` | pnpm `11.25.0`; version drift is explicit |
| TypeScript | `6.0.3` | Frozen install and strict typecheck passed on the predecessor chain |
| Vite | `8.3.4` | Both application builds passed on the predecessor chain |
| Unit tests | Root Node test runner | 9 passed, 0 failed, 0 skipped on the predecessor chain |
| Database migrations | None | No migration directory or SQL migration found |
| Generated database types | None | No generated type artifact found |

The frozen pnpm lock passed supply-chain policy verification. The active pnpm binary differs from the manifest pin and must be reconciled by a bounded toolchain task; it did not modify the lockfile.

## Local services and requests

`pnpm dev` started the customer application, operations application, and API. The following checks ran from the same cloud environment:

| Local URL | Result | Interpretation |
| --- | --- | --- |
| `http://127.0.0.1:5173/` | HTTP 200 | Customer marketplace shell is locally reachable. |
| `http://127.0.0.1:5173/passport` | HTTP 200 | Reservation Passport empty/disabled surface is locally reachable. |
| `http://127.0.0.1:5173/operations` | HTTP 200 | Public explanatory/disabled route is reachable; this is not privileged access. |
| `http://127.0.0.1:5174/` | HTTP 200 | Separate operations shell is locally reachable with no privileged records or enabled actions. |
| `http://127.0.0.1:3000/api/health` | HTTP 200 | Local API process returned its health response. |
| `http://127.0.0.1:3000/api/properties` | HTTP 503 `INVENTORY_NOT_CONFIGURED` | Inventory remains fail-closed. |
| `http://127.0.0.1:3000/api/unknown` | HTTP 404 `NOT_FOUND` | Unknown API route contract remains fail-closed. |

Only the services started for this baseline were stopped. No local service remains listening on the checked customer port.

## Deployment and environment status

| Environment | Verified state |
| --- | --- |
| Local/cloud task | Working checkout, frozen dependencies, successful checks, and successful local requests as recorded above |
| GitHub | Native fetch/push works; PR, review, CI, protection, and deployment API reads are forbidden |
| Vercel preview | Unverified; configuration files exist, but no project binding, deployment ID, URL, alias, commit status, or environment binding is available |
| Vercel production | Unverified and unauthorized |
| Supabase development/preview | No verified organization, project, region, schema, migration head, Auth, Storage, RLS, backup, or recovery state |
| Supabase production | Unverified and unauthorized |
| Cloudflare | No verified account, zone, Worker, route, or deployment |
| Google Drive sources | Linked artifacts exist, but current contents/freshness are unavailable until the requested connector is installed and authorized |

Relevant environment-variable names were inspected without reading values. No StayRelay provider binding or project identity was established. Generic credentials supplied by the cloud platform do not prove application authority.

## Enabled and disabled capabilities

Verified locally enabled:

- customer and operations application shells,
- fictional non-bookable marketplace previews,
- Passport and operations disabled/empty states,
- health and fail-closed API contracts, and
- strict compilation, application builds, and unit tests.

Not verified or intentionally disabled:

- customer authentication, workspace switching, administrator access, MFA, or server roles,
- real reservation evidence, eligible inventory, database persistence, or realtime publication,
- maps/geocoding, checkout, payments, webhooks, ledger, refunds, payouts, claims, or transfer confirmation,
- CRM, email, SMS, AI assistance, monitoring, backups, recovery, or production rollback, and
- any preview, public domain, production deployment, provider account, partner approval, legal/tax approval, or public beta.

## Baseline conclusion

The branch-local development foundation is reproducible and fail-closed, but there is no evidence of a usable preview or production system. The exact external gaps are disclosed rather than hidden. TASK-0008 may map the 1,100-task roadmap to retained historical evidence without treating similar IDs as completed work.
