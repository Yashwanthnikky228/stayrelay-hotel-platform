# TASK-0005 — Inventory existing artifacts

**Phase:** P01 — Governance and repository control  
**Workstream:** Project control and source governance  
**Branch:** `task-0005/artifact-inventory`  
**Content commit:** `929113eb9c500d4ef161708684cdd2e00013f1bd`  
**Depends on:** TASK-0004  
**Owner:** Technical Program Lead

## Deliverable

[Existing artifact inventory](../project-control/ARTIFACT-INVENTORY.md) records the canonical repository and checkout, default and active branch chains, historical branches, observable pull-request refs, deployment configuration and evidence gaps, canonical and uploaded workbook versions, linked planning artifacts, provider-project gaps, and retained repository controls.

## Acceptance evidence

| Criterion | Evidence |
| --- | --- |
| Repository is identified | HTTPS origin, checkout root, `main` commit, active stacked chain, migration head, and generated-type state are recorded. |
| Branches are identified | All 33 observed origin task branches are classified into the current 1,100-task control chain or preserved earlier-roadmap evidence. |
| Pull-request evidence is bounded | Git refs for PRs 1–5 are recorded; API-protected titles, status, reviews, CI, and mergeability remain explicitly unverified. |
| Deployments are identified honestly | Customer/API and operations Vercel configuration is recorded; the absence of verified projects, deployment IDs, preview URLs, aliases, CI, and production state is explicit. |
| Workbooks are identified | Canonical and uploaded workbook hashes, task counts, status counts, and authority classifications are recorded without overwriting either copy. |
| Provider projects are identified | Supabase, Vercel, GitHub, HubSpot, OpenAI Platform, maps, payments, communications, and monitoring have verified repository evidence, external-identity status, and required harmless reads. |
| Critical gaps are visible | GitHub API access, deployments, provider targets, linked Drive source freshness, legal/payment approvals, and named human owners remain disclosed and fail closed. |

## Validation and rollback

Validation used native Git origin/ref reads, repository and configuration inspection, relevant environment-variable-name inspection without values, workbook structure/status/hash checks, existing ADR/source/provider records, link/path review, and `git diff --check`. A frozen pnpm install, strict typecheck, both application builds, and all 9 unit tests passed on the TASK-0005 branch. The active pnpm binary reported 11.25.0 while the manifest pins 11.19.0; the frozen lock remained unchanged, and the version mismatch is retained for later reconciliation. GitHub GraphQL and REST reads returned `Forbidden`; no PR, CI, deployment, provider, production, or secret mutation occurred.

Rollback is a bounded revert of the inventory, this evidence record, the TASK-0005 tracker fields, and the handoff row. Both workbook histories and every remote branch remain preserved.

## Handoff

TASK-0006 is dependency-ready and should reconcile duplicate and stale copies without deleting provenance or silently promoting unverified external artifacts.
