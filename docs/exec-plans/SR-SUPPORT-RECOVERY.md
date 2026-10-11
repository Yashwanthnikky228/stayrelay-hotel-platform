# Synthetic support and recovery execution plan

## Boundary

Add a local-only support-case workflow for synthetic Reservation Passports. A signed-in customer may create a case using a constrained category and an optional Passport they own. A reserved local operator may view all cases and move an open case to escalated or resolved using optimistic version checks.

This workflow does not accept free-form sensitive data, submit a real claim, promise a refund, contact a hotel, move money, or unlock a transfer/arrival state. Hosted use remains disabled with `STAYRELAY_TEST_AUTH` unless a durable managed identity, database, private storage, and reviewed authorization model are configured.

The customer Case updates feed projects the latest 100 saved support audit events, filtered by authenticated case owner. It exposes only event ID, case ID, constrained event name and UTC timestamp. It sends no email, SMS, push or webhook. External notification preferences and delivery adapters remain unfinished; no case transition implies an external message was sent.

## Owned state and commands

- `synthetic_support_cases` is the local SQLite projection and command store.
- Customer reads are filtered by authenticated owner ID.
- An attached Passport must belong to the authenticated owner.
- Operator reads and transitions require the reserved operator role.
- Transitions use `expectedVersion`; stale and terminal writes fail closed.
- Audit events record actor, action, reason, correlation, target, and UTC timestamp without document contents.

## Acceptance evidence

1. Unit/API tests cover authentication, ownership, invalid category, operator authorization, successful escalation/resolution, stale versions, and terminal-state denial.
2. Typecheck, production builds, and the complete unit suite pass.
3. Browser checks cover customer create/list/reload and operator queue/transition at desktop and narrow widths.
4. Supplemental tracker rows are updated only after their row-specific evidence exists.

## Recovery and rollback

### Continuation: persistence and failure fixtures

SR-464/465/467 cover deterministic support scenarios, restart persistence and failed audit writes. Wrap support creation and transitions with their audit inserts in a SQLite transaction; inject audit failures in isolated test databases and prove both state and audit roll back. Reopen an on-disk database and verify owner isolation and stale-version denial using a second connection. No hosted schema or provider is changed. Notification delivery remains a separate unfinished slice.

The feature is isolated behind `STAYRELAY_TEST_AUTH=enabled`. Disable that flag to return every account, Passport, operations, and support endpoint to a `503` safety lock. Code rollback removes the route/UI and table initialization; local synthetic databases and files contain no real customer or identity data and may be discarded through the existing test-environment cleanup process.
