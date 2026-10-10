# TASK-0007 — Baseline the live state

**Phase:** P01 — Governance and repository control  
**Workstream:** Project control and source governance  
**Branch:** `task-0007/live-state-baseline`  
**Content commit:** `bee6ac94f01c584e58395445f1a2ee606cf62da3`  
**Depends on:** TASK-0006  
**Owner:** Technical Program Lead

## Deliverable

[Verifiable live-state baseline](../project-control/LIVE-STATE-BASELINE.md) records repository URLs and commits, tool versions, frozen dependency/test/build state, exact local service requests, environment boundaries, enabled fail-closed capabilities, and all unverified preview, provider, and production states.

## Acceptance evidence

| Criterion | Evidence |
| --- | --- |
| URLs are captured | Repository origin and every checked local service URL are recorded; absent preview/production URLs are explicit. |
| Commits are captured | Default main, predecessor, active task branch, and unmerged-chain boundaries are recorded. |
| Versions are captured | Node, pnpm, TypeScript, and Vite requirements/observations are recorded, including pnpm drift. |
| Tests are captured | Frozen install, strict typecheck, both builds, and 9 passing unit tests are recorded from the unchanged predecessor code. |
| Runtime is exercised | Customer, Passport, disabled operations route, separate operations shell, API health, inventory 503, and unknown-route 404 were requested locally. |
| Environment status is bounded | Local, GitHub, Vercel, Supabase, Cloudflare, Drive, and production states are separate; unknowns remain unverified. |
| Critical gaps are visible | Authentication, database, providers, money, transfer, communications, monitoring, backup, legal, deployment, and production remain disabled or unverified. |

## Validation and rollback

`pnpm dev` started customer 5173, operations 5174, and API 3000. All documented local requests returned the recorded status and contracts. The task stopped only its own services and verified the checked customer port no longer responded. Repository path/ref/version/configuration inspection and `git diff --check` passed. No provider, deployment, production, secret, data, or money mutation occurred.

Rollback is a bounded revert of the baseline, this evidence record, TASK-0007 tracker fields, and the handoff row. Runtime processes are already stopped.

## Handoff

TASK-0008 is next on the active governance chain and should build a non-conflicting crosswalk between the current 1,100-task ledger and retained earlier-roadmap evidence.
