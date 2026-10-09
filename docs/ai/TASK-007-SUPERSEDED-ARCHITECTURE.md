# TASK-007 — Superseded research architecture

Date 2026-10-09. Branch `task-007/superseded-research`; base `f4876d4`. Dependency TASK-005 is recorded in [ADR-0002](../adr/0002-architecture-decision-register.md). Scope: classify research; no source deletion, dependency, provider, schema, or lifecycle change.

Read Roadmap v3 TASK-007, [canonical source map](SOURCE-OF-TRUTH.md), Technical Specification v1 frozen architecture/toolchain section, audited V08 implementation addendum, and V11 architecture-drift control. The historical example is `02_SOURCE_MATERIAL/12_StayRelay_Raw_Source_Archive/01_Research_Briefs/Research_Secondary_Hotel_Reservation_Marketplace_Feasibility_Unit_Economics_Operational_Architecture_2026-10-05.txt` in the supplied archive. The controlling technical file is `06_PRODUCT_AND_REQUIREMENTS/Technical_Specifications/StayRelay_Master_Technical_Interactive_Specification_v1/01_Canonical_Editable/StayRelay_Master_Technical_Interactive_Specification_v1_2026-10-05.docx`; V08 is under `12_REPORTS/.../01_CANONICAL_AUDITED_VOLUMES/`.

| Earlier research option | Current engineering baseline | Treatment |
| --- | --- | --- |
| Next.js presentation tier | React 19.3, React Router 8 Framework Mode, Vite 8 | Historical alternative. No Next.js application should be added without a new ADR. |
| Node/Python microservices | Modular TypeScript monolith with owned domain modules | Historical alternative. Do not split pilot commands into independent services by default. |
| AWS-first hosting stack | Cloudflare edge direction, Supabase Mumbai candidate, Node API/Vercel adapters under a time-limited exception | Historical hosting proposal, not a verified deployed provider state. TASK-078 records the exception and revisit gate. |
| Redis inventory locks/session cache | Atomic durable reservation/checkout design remains to be decided after approved DB/provider evidence | Historical implementation suggestion. Do not treat a cache lock as proof of exclusive inventory. |
| Twilio/Exotel messaging gateway | Provider-neutral notifications boundary, disabled until approved provider/use case and privacy controls | Historical vendor suggestion; no vendor agreement, credentials, or channel capability verified. |

These classifications apply to raw source copies, original volumes, duplicates and interactive prototypes when they repeat the earlier stack. Preserve them for provenance. A future component can be revived only by a bounded ADR with owner, current evidence, dependency impact, tests and rollback. This record does not claim the frozen provider choices are configured or legally approved. DEC-0001–0008 remain Proposed in the source control register until accountable signatures exist.

Files expected/changed: this record, one source-map link and STATE.md. Migration/generated DB types: none. Acceptance: source-path/link inspection and `git diff --check`; no code tests for a classification-only change. Next engineering work follows TASK-075/076/077/078, while canonical Drive registers remain separately gated.
