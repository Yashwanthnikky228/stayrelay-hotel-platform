# Visible demo release

User authorises visible synthetic demo deployment to existing public project.
Replace the homepage hero with a responsive illustrated discovery entry and
interactive city selectors, retaining existing search and fictional property detail.
No external images, real listings or new provider integration. Existing hosted
write boundaries remain disabled. Cross-module exception includes a CI fix:
remove import-time default SQLite creation, which raced across test workers.
API process still creates its store at server startup; tests inject private stores.

Acceptance: tests/typecheck/build, browser mobile/desktop city selection and detail
navigation; GitHub checks; protected same-project preview; normal PR integration
then verify production assets against the release deployment. Revert merge to roll
back. No live financial, identity or reservation functionality is authorised.
