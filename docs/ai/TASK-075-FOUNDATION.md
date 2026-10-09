# TASK-075 — Existing workspace repair

Controlling sources: Roadmap v3 TASK-075, Technical Specification frozen toolchain/tree, audited V08, [ADR-0002](../adr/0002-architecture-decision-register.md), [TASK-074 audit](TASK-074-REPOSITORY-AUDIT.md). Provider mode unverified; migration/schema head and generated DB types absent; all transaction/privileged gates stay disabled.

## 075A — pnpm and runtime

Branch `task-075/pnpm-runtime-baseline`; base `5179f67`. Read root/workspace manifests, npm lock, installed runtime/package-manager metadata. Expected changes: root/API manifests, pnpm workspace YAML, runtime file, generated pnpm lock (replaces npm lock), this record and handoff.

Pin tested Node24.19.0 and pnpm11.19.0 (Node>=22.13). Import the existing npm lock rather than re-resolving unrelated packages. Root scripts use pnpm and explicit workspace references. Do not call Node24.19 the newest patch. pnpm package-manager integrity is retained; no registry/TLS/signature bypass.

Acceptance: `pnpm --config.store-dir=/tmp/stayrelay-pnpm-store import`, `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm build`, preview-economics unit tests; lockfile immutability and clean diff check. Rollback: revert this bounded migration and reinstall the previous npm lock.

TASK-075 remains in progress until separate customer/operations apps and Router8 Framework Mode/TS6 have passed integrated validation. No provider, account, production or external-register mutation.

075A results: frozen install passed after explicitly approving only the locked esbuild installation scripts (`allowBuilds.esbuild: true`); TLS/integrity/supply-chain checks retained. Typecheck/build and 5 unit tests passed. This sandbox requires `PNPM_CONFIG_STORE_DIR=/tmp/stayrelay-pnpm-store` on pnpm commands (including inherited subprocesses); npm_config_store_dir is not recognized by pnpm11. No machine-specific store path is committed.

## 075B — Move the existing customer app

Branch `task-075/customer-workspace`; base `310f68b`. Read existing frontend, Tailwind/PostCSS, Vite proxy, root compiler and unit-test import paths. Move existing src/index/Vite/Tailwind files unchanged into apps/customer; create its workspace manifest; update root orchestration/compiler/test paths. This preserves audited tokens and current service behavior without a second bootstrap. Four source/config files are hand-edited; moves are mechanical. API stays port3000; customer port5173 is explicit/strict. Acceptance: frozen pnpm lock/install, strict typecheck, customer build, finance tests. Hosting output remains a later slice; no deployment occurs. Rollback by reverting the move and reinstalling the previous lock.

## 075C1 — Framework dependency preparation

Branch `task-075/framework-dependencies`; base `468dfa7`. Read official tagged Router8.4 SPA/upgrade docs and package peers, existing pages and strict compiler. Expected source changes: root/customer manifests and three default page exports; generated lock plus record/handoff. Add exact Router/dev/node8.4 and TS6.0.3. Existing RouterDOM7 entry remains temporarily in use until the next bounded migration, so no mixed router contexts are introduced. Typecheck/build and five unit tests must pass; this preparation alone is not Framework Mode completion. No provider/migration/feature change.

## 075C2 — Consistent Router8 imports

Branch `task-075/router-eight-imports`; base is the preceding075C1 handoff. Read all four RouterDOM imports and official v8 package exports. Switch all existing router/context imports together to react-router8; remove the customer's DOM7 dependency. The root still temporarily retains unused DOM7 until toolchain cleanup. Five source files changed, generated lock updated; no cross-version router context remains. Acceptance: strict TS6 typecheck, Vite build, finance tests. This is an intermediate Declarative Mode app; Framework conversion is next.

## 075C3 — Customer Framework Mode

Branch `task-075/customer-framework`; base is075C2 handoff. Read the tagged SPA/root/route docs and existing shell/pages. Five hand-edited source/config files: root route/document, route manifest, Router config, Vite plugin config, customer scripts. Remove superseded BrowserRouter entry/App/index mechanically. SPA Framework Mode uses ssr:false; root prerenders at build time; output is build/client. Express API stays independent and disabled for inventory. This temporary static hosting/Node API arrangement must be revisited before081/098, with exact exception/rollback in078; no Cloudflare runtime fit asserted. Acceptance: typegen, strict typecheck, build/prerender, finance tests, browser/deep-link hydration in final validation.

075C3 results: typegen/TS6 typecheck/framework build passed; root prerender generated build/client/index.html. Router tooling added isbot5 (locked5.2.2). Chromium runtime checks passed direct /,/passport,/operations,/missing, navigation/back, language attribute and zero page errors; 320px document had no horizontal overflow. An initial startup collided with a prior process from this session; identified and stopped its concurrently process, then retested the correct app. No production-host or accessibility-conformance claim.

## 075C4 — Compiler and output hygiene

Branch `task-075/compiler-hygiene`; base075C3 handoff. Read generated route types, scripts, compiler and ignored outputs. Five hand-edited config files: root/customer manifests, root/customer compilers, gitignore. Each app checks its generated route types using its own rootDirs; root checks API/domain/tests. Remove unused root RouterDOM7/React/plugin declarations; exact-pin generated isbot dependency. Add verified local unit/typegen scripts and recursive app build. Generated build and .react-router output are ignored. Frozen install, typegen/strict typecheck/fullbuild and five unit tests must pass; no provider/database transition.
