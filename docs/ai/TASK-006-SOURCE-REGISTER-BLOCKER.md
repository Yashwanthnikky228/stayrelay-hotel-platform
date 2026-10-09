# TASK-006 — Source Register blocker

**Status:** Blocked before external-register mutation  
**Audit date:** 2026-10-09  
**Dependency:** TASK-002 complete on `task-002/canonical-planning` at `4a3d92441b7999ce964f333cecdbd3e0b84c6a4a`  
**Current branch:** `task-006-source-register`

## Roadmap scope

Roadmap v3 TASK-006 requires every external factual source already listed in the master dossier to be entered in the Project Control Center Source Register with source URL, source date, scope, jurisdiction/property/channel applicability, and next-review date. The controlling workbook is [`03 — StayRelay Project Control Center`](https://docs.google.com/spreadsheets/d/1boSoVj9wFJmawBzgYcYPUpY0RzVZk6vo4cPd3aQYJDM/edit), identified in [`SOURCES.md`](SOURCES.md). The audited Roadmap v3 and source precedence are recorded in the same source map.

## Repository handshake

- **Repository:** `Yashwanthnikky228/stayrelay-hotel-platform`.
- **Base:** TASK-002 commit `4a3d92441b7999ce964f333cecdbd3e0b84c6a4a`; live audited main `d7991ea5add5c01c1cc681f59e2285ab6bfea3ee`.
- **Branch:** `task-006-source-register`.
- **Migration/schema head:** none.
- **Governance read:** `docs/ai/SOURCES.md`, `docs/ai/TASK-002-CANONICAL-PLANNING-SET.md`, and `docs/ai/STATE.md`.
- **Controlling source reviewed:** Roadmap v3 TASK-006, Project Control Center workbook README/Source Register excerpt in the user-supplied compilation, and the canonical project source map.
- **Files changed:** this blocker record and `docs/ai/STATE.md` only.
- **Invariant impact:** none. No register rows, source claims, verification dates, or review dates were fabricated.

## Exact blocker

No Google Drive connector or spreadsheet-editing tool is available in this session. The Drive workbook is identified by URL, but its live contents and edit state cannot be read or changed here. The supplied compilation is a text snapshot and not an editable or current substitute for that workbook. Creating a parallel repository register would establish a competing source of truth and is intentionally not treated as completion.

## Evidence required and next action

1. Make the Google Drive connector available for this session, or provide an editable copy of the current Project Control Center workbook and authorize updates to it.
2. Read the live `Source Register` and existing source IDs before writing; preserve IDs and existing rows.
3. Reconcile dossier citations against that live register, then add only missing external factual sources with their source URL, source/publication date or an explicit unknown status, precise applicability, verification status/date, and an owner-approved next-review date.
4. Save the workbook and capture its updated revision/link in the task evidence. Do not mark this task complete until the workbook change is verified.

Until those conditions are met, TASK-006 remains blocked. Its independent dependency on TASK-002 is satisfied, but the required target system is unavailable. TASK-005 remains blocked on TASK-004 as recorded on its separate branch. The GitHub API 403 also prevents opening a review PR from this environment; a branch push is not a PR.
