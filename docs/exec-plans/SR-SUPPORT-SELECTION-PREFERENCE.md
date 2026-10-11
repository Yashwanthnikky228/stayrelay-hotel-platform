# Support selection and preference correctness

Base a22e5a3. Two bounded defects: recovery selects the first Passport without
consent; persisted notification preference does not control the feed.
Implement explicit selection and pending guard; clear stale selection after
failed refresh. Enforce preference in the authenticated feed projection without
deleting audit history. UI refreshes from server after toggling.

Acceptance: browser no-selection/no-write, second-order selection, duplicate guard,
failed refresh and responsive widths; API disabled/enabled feed restoration and
preserved case history; unit suite, typecheck and builds. No schema/provider change.
Rollback via code revert; persisted preferences and audit history remain intact.
Cross-module exception includes UI/API/test/evidence files, not new architecture.
