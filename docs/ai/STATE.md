# StayRelay AI Handoff State

**Active task:** TASK-004 — Runtime, framework, provider, and standards recheck
**Status:** Partially verified; blocked on current React Router migration evidence and provider/standards verification.
**Branch:** `task-004-environment-baseline`
**Base commit:** `5814d7b77651d136df1edbfc57e6eabc93ee9b03` (`task-003/vite-baseline`)
**Audited main:** `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee`
**TASK-004 evidence commit:** `2097e206d760cdfadc33100440bd163fcd8e146f` (`docs: record TASK-004 environment evidence`).

## Canonical and task evidence

- Source hierarchy and archive locations: [`SOURCES.md`](SOURCES.md).
- TASK-001 audit: [`TASK-001-BASELINE.md`](TASK-001-BASELINE.md) on its baseline branch.
- TASK-002 source map and record: [`SOURCES.md`](SOURCES.md), [`TASK-002-CANONICAL-PLANNING-SET.md`](TASK-002-CANONICAL-PLANNING-SET.md).
- TASK-003 decision and verification: [`ADR-0001`](../adr/0001-vite-8-baseline.md), [`TASK-003-VITE-BASELINE.md`](TASK-003-VITE-BASELINE.md).
- TASK-004 evidence and exact blockers: [`TASK-004-ENVIRONMENT-BASELINE.md`](TASK-004-ENVIRONMENT-BASELINE.md).

## Verified repository/runtime state

- **Runtime:** Node `v24.19.0`, npm `11.9.0`.
- **Resolved:** React/React DOM `19.3.0`, React Router DOM `7.18.4`, TypeScript `5.9.3`, Vite `8.3.4`.
- **Migration/schema head:** none; no migrations or generated DB types.
- **Provider configuration:** Supabase and Cloudflare project/account state not present or verified; no provider was contacted or changed.
- **Standards evidence:** audited specification targets OWASP ASVS 5.0 and WCAG 2.2 AA; current official requirements were not rechecked from this network.
- **Files changed this task:** `docs/ai/TASK-004-ENVIRONMENT-BASELINE.md` and this state file only.
- **Tests:** no code changes or tests. Registry queries and read-only documentation requests are detailed in TASK-004 record.
- **External action IDs:** none.

## Review and branch status

TASK-002 commits `865f56684a79e4fe0871bc565f55a86a0bd3e47f` and `4a3d92441b7999ce964f333cecdbd3e0b84c6a4a` are pushed on `task-002/canonical-planning`. TASK-003 commits `2f20d665067d63026f5698623545a13c03bdfc13` and `5814d7b77651d136df1edbfc57e6eabc93ee9b03` are pushed on `task-003/vite-baseline`. GitHub push works, but `gh` read-only PR API calls return 403 Forbidden, so no PRs were created and no branch was merged.

The older local scaffold from `work` at `1880cc686d7e033669fbe089beed251d778a4639` remains preserved in the named stash `preserve prior local StayRelay scaffold before TASK-002 baseline switch`. It is not part of these task branches and must be reconciled deliberately.

## Blockers and next eligible work

- TASK-004 cannot be marked complete until evidence listed in its task record is obtained; no account-specific provider state is assumed.
- TASK-005 depends on TASK-004 and is blocked.
- TASK-006 depends only on TASK-002 and is independently eligible for source-register work.
- PR creation remains blocked by GitHub API 403. Continue pushing review branches only; do not merge.
- No production deployment, live inventory, checkout, payment, refund, payout, or database mutation has occurred.
