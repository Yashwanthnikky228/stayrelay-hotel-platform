# Recovery selection and notification preference

Implementation commit: a7b88dd, based on a22e5a3.

- Recovery requires explicit selection of an owned Passport; no implicit first order.
- Pending requests are guarded against repeated submission. Failed refresh clears
  stale Passport choices. Existing server ownership enforcement remains unchanged.
- Disabling the in-app preference suppresses update projections server-side without
  deleting cases/audits. Re-enabling restores the saved history.

Validation: 27 unit/API tests pass; typecheck and both builds pass. API assertions
cover suppressed feed, preserved case state, stale preference rejection and restore.
`node tests/recovery-selection.browser.cjs` passes: no-selection/no-write, second
order selection, duplicate guard, failed-refresh clearing and no horizontal overflow
at 320/390/768/1280px. Browser test uses mocked responses to test UI contracts; it
does not establish hosted auth/persistence. Screenshot inspected:
`/workspace/stayrelay-recovery-selection.png`.

Remaining: recovery draft editing/submission state, participant timeline, seller
initiation, evidence linkage and payout simulation. No broad package completion or
new tracker Done claims. Production is unchanged; review/merge and protected preview
inspection remain external access gates.
