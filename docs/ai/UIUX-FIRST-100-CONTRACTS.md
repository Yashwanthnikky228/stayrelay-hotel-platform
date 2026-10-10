# UI/UX-first product contracts

**Brief tasks:** 004–008  
**Date:** 2026-10-10  
**Status:** Complete as design and product contracts; runtime enforcement remains a later task.

## 004 — Atomic branch policy

- One brief task or bounded subtask per branch and commit.
- Visual changes require a preview or equivalent local route evidence before review.
- Do not mass-close tasks or overwrite historical tracker evidence.
- Provider/auth/database changes require their owning authority and a rollback record.
- Future UI code should use `task-uiux-<brief-task>-<slug>` branches.

## 005 — Product-state glossary

| State | Meaning | UI rule |
| --- | --- | --- |
| Reservation | A seller-submitted booking record with source evidence | Never imply transferability from text alone |
| Evidence | Versioned source material supporting reservation facts | Show review status and access boundary |
| Eligibility | Reservation-specific decision that a transfer route may be possible | Separate from risk approval |
| Risk | Exposure/capacity decision for StayRelay | Never derive from eligibility |
| Listing | A reviewed marketplace presentation | Only server-authorized records may be live |
| Quote | Versioned price calculation | Store integer minor units and currency |
| Transfer | Operational handoff between parties | Only authoritative events may advance it |
| Arrival | Pre-arrival and check-in state | Never show ready until recheck passes |
| Claim | Support/recovery event after a problem | Preserve audit trail and reason |
| Payout | Seller settlement after approved completion | Not enabled without payment/legal controls |

## 006 — Roles and permissions

| Role | Allowed surface | Server-owned actions |
| --- | --- | --- |
| Buyer | Public discovery, buyer workspace, own Passport | Own profile, saved stays, support requests |
| Seller | Public discovery, seller workspace | Own drafts, evidence submission, support |
| Support | Support queues and scoped customer help | Case notes and approved support actions |
| Operator | Review and operational queues | Scoped review decisions with reason |
| Administrator | Admin settings and access workflows | Role grants, flags and emergency actions with audit |
| Auditor | Read-only audit/report surface | No state-changing action |

The browser cannot grant roles. Authorization must be checked server-side from protected role state and every state-changing action must produce an audit event.

## 007 — Route inventory

| Surface | Planned routes | Current state |
| --- | --- | --- |
| Public | `/`, `/how-it-works`, `/safety`, `/support`, `/privacy`, `/terms`, `/admin/login` | Marketplace exists; most planned routes are not yet implemented |
| Auth | `/sign-up`, `/sign-in`, `/verify-email`, `/reset-password`, `/auth/callback` | Not connected; provider required |
| Buyer | `/buyer`, `/buyer/saved`, `/buyer/alerts`, `/passport`, `/buyer/help`, `/account` | Passport shell exists; other routes pending |
| Seller | `/seller`, `/seller/submit`, `/seller/drafts`, `/seller/status`, `/seller/support` | Pending |
| Operations | Separate app `/`, `/admin/login`, review/catalogue/access/audit/settings routes | Disabled shell exists; login and protected routes pending |

## 008 — Content truth rules

- Use `Demo · not bookable` for synthetic fixtures.
- Never invent hotel names, exact prices, availability, room types, policies, photographs, ownership or transfer eligibility.
- Use `server-confirmed`, `under review`, `not configured`, `not enabled for this pilot`, and `unknown` precisely.
- Eligibility never implies risk approval, payment, transfer confirmation, arrival readiness or payout.
- Deferred integrations must explain the next safe action and must not display false success.
