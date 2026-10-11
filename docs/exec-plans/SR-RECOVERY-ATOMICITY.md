# Recovery durability repair

Continue from 179187c; preserve existing synthetic-only behavior. Recovery decisions
and notification preferences must commit with their audits or roll back together.
No schema migration, provider change, financial outcome, or hosted activation.

Acceptance: injected audit failures leave records unchanged; retry succeeds;
reopened connections observe committed versions and reject stale commands.
Run unit tests, typecheck and both builds. Existing broader recovery acceptance
does not establish draft editing, timelines, evidence attachment or payout behavior.
Rollback: revert this bounded repair; no persisted schema change.
