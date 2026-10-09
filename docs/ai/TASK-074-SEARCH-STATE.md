# TASK-074C — Search cancellation and empty result repair

Date 2026-10-09. Branch `task-074/search-state-repair`; base `0e87d86` (stacked after TASK-075 foundation). Read TASK-074 audit, marketplace page/service, shared search response, current fixture and strict scripts. No schema, generated DB types, account/provider change or real offer enabled.

An aborted or superseded request must never replace current results or errors. Guard success/error commits by controller identity and abort state; classify JSON decoding after cancellation as ABORTED. Invalid URL filters clear prior live results. A server-empty response shows one accurate empty state without claiming sample cards are below. Fictional cards remain nonbookable.

Expected files: page, service, focused tests and this note, plus handoff. Acceptance: cancellation during delayed JSON, malformed non-aborted JSON, seven existing contract/finance tests plus two new search tests, strict typecheck/build and local browser invalid/empty state check. Rollback: revert this bounded commit; no data/provider operation to reverse.

Executed: pnpm typecheck, pnpm test:unit (9 pass), pnpm build. Chromium confirmed a synthetic empty HTTP result shows the correct single empty state; an invalid URL then clears the stale server result and shows example cards, with no page errors.
