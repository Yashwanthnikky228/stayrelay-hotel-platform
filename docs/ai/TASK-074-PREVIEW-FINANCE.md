# TASK-074B — Preview finance audit repair

2026-10-09; branch `task-074/preview-finance-repair`; base `00b144d`.
Read: [audit](TASK-074-REPOSITORY-AUDIT.md), ADR-0002, shared Money/UnitEconomicsPreview, fixture data, EconomicsBreakdown, audited V04/V05 finance semantics (reserve cash is capital; realized costs/losses are expenses).
Expected changes: preview helper/component, focused unit test, this record, STATE.md. No migrations, generated DB types or verified providers; no lifecycle transitions or live pricing changed.

Correct preview contribution to gross marketplace fees minus processing expense. Show reserve cash as an independent earmark; do not subtract it as a realized expense. This remains fictional, non-bookable arithmetic and omits operating costs, claims and tax rather than inventing approved model rules.

Acceptance: five unit tests cover reserve independence, negative contribution, currency mismatch, invalid/unsafe minor units and overflow. Run `node --import tsx --test tests/unit/previewEconomics.test.ts`, `npm run typecheck`, `npm run build`, `git diff --check`. Rollback: revert this bounded content commit; no provider/data state to reverse.
