# Governance continuation: open questions, security, access and gates

**Scope:** TASK-0017 through TASK-0025  
**Recorded:** 2026-10-10  
**Owner:** Technical Program Lead

This record extends the project-control evidence chain after TASK-0016. It records what is known, what must be answered by an accountable authority, and which gates remain closed.

## TASK-0017 — Open questions

| ID | Question | Owner | Evidence needed | Gate |
| --- | --- | --- | --- | --- |
| Q-001 | Which legal entity and jurisdiction will contract with guests, sellers and hotels? | Founder / Account Owner | Signed legal and tax decision | Production, payments |
| Q-002 | Which inventory source is authoritative for availability, transferability and expiry? | Hotel Partnerships Lead | Approved source contract and API identity | Booking |
| Q-003 | Which payment processor, settlement currency and refund authority are approved? | Finance / Payments Lead | Processor account and signed policy | Payments |
| Q-004 | Which Supabase project, region, retention policy and migration owner are approved? | Data Engineering Lead | Project identity, access and migration head | Database/auth |
| Q-005 | Which named humans can approve release, emergency rollback and privileged operations? | Release Manager | Named approver matrix | All controlled gates |
| Q-006 | Are the customer and operations Vercel deployments the same commit and intended projects? | SRE Lead | Authenticated Vercel project/deployment reads | Preview/release |
| Q-007 | What retention, deletion and subject-rights policy applies to passport and identity evidence? | Privacy Lead | Approved privacy and retention decision | Identity/passport |

No question is treated as answered by a draft, environment variable, screenshot or user narrative.

## TASK-0018 — Data and security governance review

| Data / action | Minimum control | Current evidence | Status |
| --- | --- | --- | --- |
| Reservation passport and QR material | Minimize claims, short-lived verification, no secret in URL, audit verification result | Local contract and fail-closed application behavior | Partial |
| Guest contact data | Purpose limitation, access scope, retention and deletion path | Policy decision not supplied | Blocked |
| Seller and hotel evidence | Private storage, malware/content review, explicit reviewer role | Provider/storage authority not verified | Blocked |
| Operations actions | Server-side authorization, actor scope, idempotency and audit event | Operations shell exists; hosted auth not verified | Partial |
| Payment and payout records | Immutable ledger, reconciliation, least privilege and dispute trail | No processor or ledger authority verified | Blocked |

## TASK-0019 — Access and segregation review

The repository separates customer and operations applications and keeps privileged actions behind backend boundaries. The review cannot certify least privilege or separation of duties until GitHub, Vercel, database/auth and provider identities are readable. No production secret or privileged mutation was performed.

## TASK-0020 — End-to-end traceability test

The traceability path is established for repository-governance tasks: tracker row → task evidence → durable artifact → content commit → remote branch. Hosted PR/check/deployment and transactional paths remain unverified because their authoritative systems are unavailable. This is sufficient for repository traceability and insufficient for a release gate.

## TASK-0021 — Recovery and rollback

Safe repository rollback is documented as reverting the bounded task commits or deleting the derived task records while preserving earlier evidence. No database, provider, deployment or production rollback was attempted. A production recovery drill remains open until the environment owners provide a non-production target and approval.

## TASK-0022 — Multidisciplinary review

The review record covers product, design, engineering, security, operations, data and release concerns through the open questions and control tables above. Named-human signoff is absent; therefore this record is a review preparation and evidence map, not a claimed approval.

## TASK-0023 — Critical governance gaps

The following P0/P1 gaps remain unresolved: named legal/payment authority, verified database/auth project, provider identities, hosted review/CI state, authenticated deployment state, retention policy, and release approvers. TASK-0023 is **blocked** because its acceptance requires that no unresolved critical control block downstream execution.

## TASK-0024 — Governance runbook

Continuation order is: read `SOURCE-OF-TRUTH.md`, `CONTROL-REGISTER.md`, this record and `STATE.md`; select a dependency-ready tracker row; create the required branch; preserve the source hierarchy; implement only bounded changes; run applicable checks; record exact evidence and commit; push for review; and leave blocked external authority visible. The runbook does not grant provider access or approval.

## TASK-0025 — Governance gate

The governance gate is **blocked**. Repository control artifacts and traceability are in place, but unresolved P0/P1 external authority and hosted-state gaps prevent approval. TASK-0026 and other independent dependency roots may proceed only within their own scope and without treating this blocked gate as passed.
