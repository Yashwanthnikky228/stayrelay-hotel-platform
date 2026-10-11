# Public synthetic demo release

PR #7 merged as be3793cb83b9593762146ebf62e096170e20cc75.
Existing customer project deployment dpl_6Pe5DstE3yA4b8KpvCv3zFLWs1fd reached
READY and lists stayrelay-hotel-platform.vercel.app as an alias. No new project.

Visible change: illustrated editorial hero, explicit synthetic disclosure and
Mumbai/Hyderabad/Bengaluru selectors tied to existing search and property details.
Support navigation is now public but its backend is deliberately unavailable.

27 local tests, typecheck and both builds passed. Both GitHub validate checks passed
for 9b63c17. Hosted preview city/detail and disabled support checked before merge.
Public browser verified homepage, city selection, detail navigation, all portal
shells, mobile navigation and no overflow at 320/390/768/1280px.
Screenshots: /workspace/stayrelay-live-desktop.png and stayrelay-live-mobile.png.

Chromium did not trust the environment proxy CA. Browser requests were fulfilled
with curl-downloaded responses from the exact hosted origin; curl TLS validation
remained enabled. No protection or TLS validation was disabled.

Post-release API smoke exposed HTTP 500 on serverless adapters. Native Node
reproduces ERR_MODULE_NOT_FOUND for responses.ts importing ./health without an
extension. Follow-up explicitly imports ./health.ts and adds a native Node test
without tsx resolution. That extension change alone did not fix hosted execution.
Self-contained adapters in dda7e54 then returned expected preview JSON statuses:
health 200, inventory 503, unknown auth 404. Both GitHub validation jobs passed.
PR #8 merged as ce906b04af6e026d9424f59bb0faabef3e313895; existing production
deployment dpl_H3ZU5eLT1e2t9WiFMYYLozj3GRwx reached READY.

CI intermittent failure was traced via check annotations to import-time default
SQLite creation across workers; app.ts now exports only the factory, server.ts
owns startup, and contract tests inject an isolated memory database.

Accounts, synthetic documents, review, checkout and recovery remain local-only.
No hosted database/private storage, live payment, transfer or identity collection
has been activated. Remaining tracker work is not claimed complete.
