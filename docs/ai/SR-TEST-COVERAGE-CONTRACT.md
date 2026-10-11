# SR-576 / SR-577 — Unit, contract and data-flow coverage

## Scope audit (SR-576)

Existing checks live in `tests/unit`, run by `pnpm test:unit`:

- `apiResponses.test.ts`: local/serverless disabled inventory and method contracts.
- `destinationContext.test.ts`: exact supported destination resolution.
- `previewEconomics.test.ts`: integer money, currency and arithmetic guardrails;
  calculations are not provider settlement or real accounting certification.
- `searchService.test.ts`: cancellation and malformed response boundaries.
- `testAuthFlow.test.ts`: HTTP account/session/draft isolation, synthetic private
  evidence, separate eligibility/risk, demo publication, checkout/Passport,
  support/recovery permissions and version checks, notification feed preference.
- `supportPersistence.test.ts`: SQLite reopen, stale writes, rollback on audit
  failure, owner-scoped updates and disconnected delivery attempt records.

`tests/recovery-selection.browser.cjs` is a repeatable UI contract check with
mocked responses. It proves selection and rendering behavior, not hosted backend
behavior. Prior screenshots alone are not reproducible integration test suites.

Shared contracts: `packages/domain/src/index.ts`. Server boundaries:
`apps/api/src/testAccountRoutes.ts`, `testStore.ts`, `responses.ts`; hosted adapter
`api/not-found.ts` does not activate the local SQLite write service.

Known gaps: HTTP tests share ordered fixtures; missing comprehensive recovery
draft/timeline tests, seller recovery permissions, storage failure compensation,
concurrent checkout contention, real PostgreSQL/RLS/hosted identity integration,
automated accessibility analysis and full end-to-end browser persistence tests.
Existing broad tracker closure does not supply these missing checks.

## Requirements contract (SR-577)

1. CI must run the committed frozen lockfile with pinned Node/pnpm, all existing
   unit/API tests, strict type checks and both application builds. Failure in any
   executed command fails the job. No credentials or real provider calls required.
2. Fixture records use reserved synthetic accounts and disposable local storage.
   Tests must not depend on production accounts, documents, payment rails or secrets.
3. Server-boundary acceptance covers anonymous denial, cross-account denial,
   stale version rejection, invalid transition rejection and unchanged persisted
   records after rejected commands, not just successful HTTP responses.
4. Audit-critical writes require injected audit-failure rollback and retry checks.
   Persistence claims require a second connection or database reopen assertion.
5. Mocked browser tests, local SQLite integration, hosted API checks and human
   approval are separate evidence categories. A passing build proves none of them.
6. Test output must report actual executed counts. Skips, absent coverage and
   failing checks remain visible; no blanket package completion from a green run.

`.github/workflows/validate.yml` implements requirement 1. Its remote execution
must be verified separately; creating a workflow is not evidence of a passed run.
Branch-protection configuration and independent review are not changed here.
Rollback is a code revert; no schema or external service mutation is required.
