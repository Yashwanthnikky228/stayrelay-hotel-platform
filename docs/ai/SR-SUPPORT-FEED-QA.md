# Support activity feed and recovery evidence

Date: 2026-10-11. Environment: isolated local SQLite/Express and Chromium. External messaging is disconnected.

## Implemented and verified

- Case creation and operator transitions commit together with their audit insert. An injected audit failure rolls back the change, and a subsequent retry succeeds.
- Separate database connections and reopened database handles preserve case status, ownership and versions. Stale and terminal commands cannot create additional events.
- The customer API projects only the authenticated owner's latest 100 case updates. Its allowlisted fields are id, caseId, event and occurredAt; operator identity, email, session tokens and document content are excluded.
- Browser: create synthetic account and case, operator escalate/resolve, customer refresh and see all three events. Aborting the refresh request clears the feed and exposes retry.
- Chromium reflow: viewport/scroll widths 320/320, 768/768 and 1280/1280. Screenshot: `/workspace/stayrelay-support-feed.png` (session artifact).
- `pnpm test:unit`: 22 passed, zero failed/skipped. `pnpm build`: strict typecheck and customer/operations production builds passed.
- Build budget: customer entry 214.70 kB < 250 KiB; shared CSS 21.79 kB < 30 KiB; support route 5.18 kB. These are local bundle checks, not hosted Web Vitals.

## Operator and recovery guide

Start from the repository root with `STAYRELAY_TEST_AUTH=enabled STAYRELAY_DEV_DB_PATH=/tmp/stayrelay-support-demo.sqlite pnpm dev`. Use reserved `.test` accounts with `Demo` display names on the customer account page. Create a case on Support, then enter local demo operations in the separate operations application and escalate or resolve it. Refresh Case updates in the customer application.

If an audit write fails, the command fails and the case remains at its previous version. Restore database write capability and reload current state before retrying. If another operator has already changed the version, reload and choose the next allowed action. Never overwrite versions to bypass a conflict.

To disable the entire local workflow, unset `STAYRELAY_TEST_AUTH` and restart the API. Roll back this branch's code to the preceding checkpoint if necessary; this batch introduces no schema migration or provider mutation. Do not delete retained synthetic databases as a substitute for investigating a failing test.

## Privacy and remaining work

The feed is an authenticated operational projection, not analytics or externally delivered messaging. No tracking transport is configured. Tests assert its exact field allowlist and cross-account exclusion. External notifications, preferences, delivery retries, hosted persistence and independent review remain unfinished. The Part 19 acceptance review must retain those gaps. This evidence does not certify the public website or change its deployment.
