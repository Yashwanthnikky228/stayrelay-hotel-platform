# TASK-0010 — Create the risk register

**Branch:** `task-0010/risk-register`  
**Content commit:** `afd5d24ac87cb90418ede91227e8bf75212b83e7`  
**Depends on:** TASK-0009  
**Owner:** Technical Program Lead

## Deliverable and acceptance

[Project-control risk register](../project-control/RISK-REGISTER.md) records 19 current risks with severity, likelihood, accountable owner role, concrete mitigation/evidence and affected gate. Critical gaps cover Git/review, canonical sources, named authority, legal/tax, Supabase, admin security, evidence/eligibility, payments, risk capital, private uploads, hosting, integrations, media truth, accessibility, release automation, toolchain drift and production operations.

No risk is marked resolved from narrative. Missing authority remains a blocker while safe repository-local work continues. Source/link checks and `git diff --check` passed; runtime code did not change, and TASK-0009's typecheck, builds and 9 unit tests remain the validated parent.

Rollback is a bounded revert of the register, this record, tracker fields and handoff row. TASK-0011 is next.
