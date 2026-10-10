# Branch and environment policy

**Task:** TASK-0012  
**Recorded:** 2026-10-10  
**Owner role:** Technical Program Lead  
**Status:** Repository standard; hosted environments remain unverified

This policy separates source-control progress from deployed-environment authority. A pushed branch is not a pull request, a merged release, a deployment, or production approval.

## Branch classes

| Branch/ref | Purpose | Permitted outcome |
| --- | --- | --- |
| `task-####/<slug>` | One canonical tracker task | Reviewable bounded commit(s) with task evidence |
| Pull-request merge ref | Review and required checks | Evidence of the reviewed candidate only |
| Default `main` | Accepted integration baseline | Source for an approved deployment candidate |
| Tag/release ref | Immutable release identity | Promotion candidate after environment gates |

Task branches begin from the accepted predecessor commit unless a reviewed merge policy requires rebasing onto a newer `main`. Stacked branches must preserve predecessor order and declare that they are stacked. Never force-push reviewed history or mix unrelated task rows into one branch.

## Change bounds and reviews

- One roadmap task per branch; default maximum one migration, five hand-edited files, and about 300 net non-generated lines.
- Changes crossing auth/RLS, money, evidence, provider authority, or architecture boundaries require the relevant human review and an ExecPlan when repository instructions require it.
- Required repository gates are frozen install when dependencies may differ, `pnpm typecheck`, `pnpm build`, and focused `pnpm test:unit` where behavior changes.
- `pnpm test` is not a repository script and must not be reported as executed.
- A content commit precedes the evidence/tracker commit so the tracker can hold a stable content SHA without self-reference.
- GitHub API evidence for PR state, reviews, CI, and mergeability must be collected before describing a branch as reviewed or merge-ready.

## Environment classes

| Environment | Source | Data and provider mode | Promotion authority |
| --- | --- | --- | --- |
| Local | Checked-out task branch | Synthetic, non-bookable; provider calls disabled unless separately verified | Engineer may run harmless local checks |
| Preview | Exact PR/content commit | Isolated non-production resources; no production secrets or real customer/payment actions | Reviewed preview request |
| Staging | Reviewed `main` or immutable release candidate | Staging-only resources and redacted/synthetic test data | Release owner after required checks |
| Production | Immutable reviewed release commit | Exact verified production accounts/projects, least-privilege secrets, monitoring and rollback | Explicit launch-task approval and accountable sign-off |

Environment identity must be established by harmless provider reads: account/team, project, region, environment class, commit, deployment ID/URL, variable-name inventory, and applicable scopes. A config file, CLI installation, environment-variable name, or successful local health check is not sufficient.

## Application isolation

- Customer and API preview: repository-root Vercel project using root `vercel.json`, subject to provider verification.
- Operations preview: distinct project using `apps/operations/vercel.json`, subject to root-directory/shared-package and access-control verification.
- The public customer `/operations` route remains disabled explanatory copy; it is never the privileged operations workspace.
- Operations authorization is server-enforced. A separate project or URL is not an authorization control.
- Preview and staging must not receive production database, payment, identity, CRM, hotel, or messaging credentials.

## Promotion gates

Promotion is one-way by evidence, not an automatic branch side effect:

`task branch → reviewed PR → main → preview acceptance → staging acceptance → production approval`

Every promotion records the source commit, build/test results, environment identity, deployed artifact or deployment ID, smoke/negative checks, approver, timestamp, rollback target, and observed result. A failed or unverified gate stops promotion and leaves server-owned features disabled.

Production additionally requires:

1. exact Vercel and downstream provider identities and authorized scopes;
2. reviewed immutable commit and provenance from accepted `main`;
3. approved secrets/variables with no value disclosure;
4. database migration, compatibility, backup, restore, and rollback evidence when applicable;
5. customer/operations/API isolation, auth, security, accessibility, reliability, and observability acceptance;
6. launch-task approval, incident owners, monitoring, rollback decision threshold, and post-deploy verification.

Documentation-only task completion does not trigger a hosted deployment. Preview or production deployment occurs only when its tracker row and launch gate call for it and all prerequisites are evidenced.

## Failure and rollback

- Deployment failure: preserve logs and exact deployment ID, disable promotion, and roll back to the last verified immutable deployment when authorized.
- Provider uncertainty or unavailable dependency: fail closed with the defined unavailable state; do not fabricate success or reuse production authority in preview.
- Branch error: use a new corrective commit. Do not rewrite published evidence history.
- Secret exposure: stop deployment, revoke/rotate through the provider, preserve incident evidence without secret values, and revalidate every affected environment.
- Environment mismatch: stop immediately; do not mutate, migrate, or deploy until the exact target is verified.

## Current enforcement state

The local workspace and branch convention are verified. Native Git branch read/push works. GitHub API review/CI evidence is unavailable. Vercel CLI, link metadata, authenticated account/team/project, hosted environment, deployment ID/URL, production variables, monitoring, and rollback target are absent or unverified. Therefore preview, staging, and production promotion remain blocked.

Rollback of this policy is a repository revert plus a tracker correction. It creates no external rollback because TASK-0012 performs no deployment or provider mutation.
