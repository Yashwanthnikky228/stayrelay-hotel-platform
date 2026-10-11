# Synthetic cancellation and recovery flow evidence

Date: 2026-10-11. Environment: local Express, SQLite and Chromium. This is a synthetic demo; no provider, payment rail, hotel, or external message is contacted.

## Flow

1. A buyer with an owned synthetic Passport submits one bounded recovery request: cancellation, refund review, transfer failure, arrival issue, seller payout hold, or evidence dispute.
2. The server resolves the linked synthetic order and seller draft, validates buyer ownership, stores the explanation with a bounded length, and appends `recovery_case.submitted` audit data.
3. The buyer sees only cases where they are buyer or linked seller. An unrelated account receives an empty projection or a safe not-found response.
4. A reserved operator reviews the queue and may move `submitted → under_review → recovery_pending → approved_synthetic_refund`, or reject/close through the allowed state machine. Expected versions are required.
5. `approved_synthetic_refund` is a synthetic status only. It never calls a payment provider or changes the order's payment state.

## Checks

- `pnpm typecheck`: passed.
- `pnpm test:unit`: 24 passed, zero failed/skipped, including buyer/seller/operator ownership, invalid transitions, stale versions, audit events, database persistence and no-payment assertions.
- `pnpm build`: customer and operations production builds passed.
- Chromium buyer flow at 390px: synthetic cancellation submitted and Recovery status rendered with provider refund disabled. Screenshot: `/workspace/stayrelay-recovery-buyer.png`.
- Chromium operations flow at 1280px: protected Recovery cases queue rendered. Screenshot: `/workspace/stayrelay-recovery-operations.png`.
- Existing support activity/feed checks remain green; customer layout remains no-overflow at 320/768/1280.

## Boundaries and rollback

The local route is gated by `STAYRELAY_TEST_AUTH=enabled`. Unset it to return synthetic account, Passport, support, recovery and operations routes to the safety lock. The recovery table is created with the existing local SQLite setup and no applied migration or hosted schema is changed. A synthetic approval does not authorize a refund, payout, transfer, or public launch.
