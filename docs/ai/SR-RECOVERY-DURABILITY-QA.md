# Recovery durability and deployment access — 2026-10-11

Code: `12dc050` (recovery/preferences) and `1f1f511` (delivery attempts).
All three write paths commit state and audit together. Injected SQLite audit
failures prove rollback, retry and persisted version behavior. Recovery assertions
also compare unchanged order and Passport state and reject stale/invalid decisions.

Validation: 27 unit/API tests, strict typecheck and both application builds pass.
No UI changes or new browser/accessibility certification in this batch.

## Corrected deployment diagnosis

Direct Node DNS for api.vercel.com fails EAI_AGAIN even outside the sandbox.
However curl using the configured HTTPS proxy successfully authenticates:
Vercel /v2/user and the existing customer project GET both return 200. No new
token or project is required. Use the supported proxy route, not direct Node DNS.

Verified project: stayrelay-hotel-platform, Git-linked to the existing repository,
production branch main, repository root. Project environment list is empty.
Git push automatically created READY preview for exact commit
12dc05054bd31a55edcc1b7ec6752ea6aaa0d2d1:
https://stayrelay-hotel-platform-b970aupel-yashwanthnikky228.vercel.app/

Preview root and auth smoke requests returned 302 to Vercel SSO, not application
responses. Preview functionality is unverified; protection was preserved.
Public URL returns 200 but that does not prove it serves this branch.
GitHub REST fails CONNECT proxy 403; required review/check/merge state cannot be
established here. No production promotion or main merge was performed.
Minimum external change: allow api.github.com through the environment HTTPS proxy
with repository-scoped review/check access. Preview inspection needs an authorized
Vercel team session or approved automation access; do not disable protection.

## Remaining implementation gaps

Existing recovery acceptance is narrower than a complete recovery work package:
draft/edit/submit lifecycle, explicit Passport selection, participant timeline,
evidence linkage, seller initiation and payout effects remain incomplete.
Notification preference is persisted but feed enforcement remains incomplete;
delivery outcomes are disconnected records, not external provider delivery.
No additional tracker rows are marked Done by this repair.
