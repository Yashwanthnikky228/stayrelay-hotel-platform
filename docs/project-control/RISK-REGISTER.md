# StayRelay project-control risk register

**Task:** TASK-0010  
**Status:** Accepted for repository execution  
**Owner:** Technical Program Lead  
**Reviewed:** 2026-10-10

Severity reflects potential harm if the risk occurs; likelihood reflects current evidence. An owner role is accountable for mitigation but does not imply a named person has accepted the role. A gate names the earliest condition that must remain closed.

| ID | Risk | Severity | Likelihood | Accountable owner | Mitigation and evidence | Gate/status |
| --- | --- | --- | --- | --- | --- | --- |
| R-001 | Unmerged stacked branches diverge from `main` and reviewers mistake branch behavior for deployed behavior | High | High | Technical Program Lead | Preserve exact base/head SHAs, one bounded branch per task, reviewed merge sequence, rerun checks after integration | Merge and preview blocked pending GitHub API/review access |
| R-002 | GitHub API denial hides PR, review, CI, protection and deployment state | High | High | Release Manager | Obtain read/write repository API access; reconcile refs before creating PRs; require checks and protected review rules | PR/CI claims blocked; native Git only |
| R-003 | Canonical Drive documents, approval registers or source versions are stale/unavailable | Critical | High | Technical Program Lead | Connect read-only Drive, verify document IDs, owner/status/version and record conflicts; fail closed on missing authority | Business/legal/provider decisions blocked |
| R-004 | Human accountability is represented by roles without named acceptance or signatures | Critical | High | Founder and Release Manager | Record named owners and approval scope through an approved private control surface; separate advice from final authority | TASK-0012 and consequential approvals blocked |
| R-005 | Legal, tax, transferability or customer-protection assumptions are implemented before Indian counsel/finance approval | Critical | High | Founder and Compliance Lead | Complete P02 evidence, jurisdiction/applicability, policy versions and signed decisions; disable unsupported routes/claims | Listing, checkout and public claims blocked |
| R-006 | No verified Supabase organization/project/region/schema/RLS/backup state exists | Critical | High | Principal Engineer | Verify approved non-production project with harmless reads; ordered migrations, generated types, RLS negative tests, backup/recovery | Persistence, Auth, evidence storage and realtime blocked |
| R-007 | Operations/admin data or actions leak into the public customer surface | Critical | Medium | Identity and Security Engineer | Separate applications, server-owned RBAC, MFA, ordinary/anonymous denial, no public admin registration, audit grants | Privileged portal enablement blocked |
| R-008 | Stale, conflicting or insufficient evidence becomes sellable | Critical | Medium | Marketplace Domain Lead | Version reservation/policy/evidence; independent eligibility and risk approvals; UNKNOWN/AMBER/RED denial tests | Listing publication and checkout blocked |
| R-009 | Payment redirects/webhooks/retries create duplicate or unreconciled money state | Critical | Medium | Payments Engineering Lead | Approved sandbox, signed webhooks, idempotency/replay tests, uncertain states, double-entry ledger and reconciliation | Payments, refunds and payouts blocked |
| R-010 | Reserve, risk-capacity or payout assumptions exceed approved capital/operations limits | Critical | High | Risk Operations Lead | Approved exposure model, independent capacity decision, immutable limits, emergency pause and post-stay payout gates | Risk approval and paid inventory blocked |
| R-011 | Evidence uploads expose reservation, identity or financial data | Critical | Medium | Quality and Security Lead | Data classification, private storage, short signed access, malware/type/size validation, retention/redaction and cross-user denial | Real evidence upload blocked |
| R-012 | Hosting configuration is mistaken for an exact preview or production deployment | High | High | Release Manager | Verify Vercel team/project, deployment ID/commit, environment names, domains, smoke checks and rollback | Preview/production claims blocked |
| R-013 | Maps, CRM, email, SMS, AI or monitoring integrations receive excess data or authority | High | Medium | Integrations Lead | Verify exact non-production accounts/scopes; data minimization, outbox, signatures, redaction, rate/timeout limits and kill switches | Each provider feature disabled until owned task passes |
| R-014 | Generated or fictional media appears to represent real inventory, evidence, reviews or partners | High | Medium | Creative Technology Lead | IMG registry provenance/rights/class, truthful labels, property-photo authorization and publication review | Media publication blocked |
| R-015 | Accessibility or responsive defects prevent transaction/support use | High | Medium | Quality Engineering Lead | WCAG 2.2 AA design/tests, keyboard/screen reader/zoom/reduced-motion checks and representative devices | Release candidate blocked |
| R-016 | Missing E2E, load, security, backup and rollback automation leaves release risk unseen | Critical | High | Quality and Security Lead | Add bounded real commands and execute Playwright, API/RLS negatives, k6, restore and rollback drills | Controlled beta and production blocked |
| R-017 | Pnpm runtime drift (`11.25.0` observed versus `11.19.0` pinned) undermines reproducibility | Medium | High | Principal Engineer | Use the pinned package-manager version or explicitly update/relock in a bounded toolchain task; rerun frozen checks | Toolchain certification pending; local checks currently pass |
| R-018 | The 140-image pipeline publishes unlicensed, unreviewed or misleading assets | High | High | Creative Technology Lead | Recover original prompts, verify rights/classification/alt text/slot, optimize and approve each IMG ID | All image slots remain unpublished |
| R-019 | Production is opened without monitoring, backup, rollback or emergency marketplace pause | Critical | High | Founder and Release Manager | Require monitored beta, alerts, restore evidence, rollback rehearsal, incident ownership and tested pause controls | TASK-1000/1100 blocked |

## Scoring and review rules

- Critical risks can block the affected gate regardless of likelihood.
- High or Critical risks require an explicit mitigation owner and evidence before launch-gate completion.
- Accepted risk requires the accountable human, scope, expiry/review date and rollback trigger; silence is not acceptance.
- A mitigation plan is not mitigation evidence. Link the executed test, reviewed decision, provider read or recovery drill.
- Update this register when a task changes likelihood, severity, owner, mitigation or gate; retain prior decisions in Git history.
- Never lower a rating merely because access is unavailable. Missing authoritative evidence generally increases uncertainty.

## Current posture

No risk above is closed. Repository-local fail-closed foundation work may continue, but all external, privileged, money, real-evidence, preview and production gates remain constrained by their rows. TASK-0011 may derive the dependency and critical path using these gates and the canonical workbook.
