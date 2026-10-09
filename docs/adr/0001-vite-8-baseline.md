# ADR-0001: Pin the Vite 8.3 baseline

- **Status:** Accepted for the current repository baseline
- **Date:** 2026-10-09
- **Roadmap task:** TASK-003
- **Decision owner:** Founder-authorized implementation work

## Context

The audited technical specification corrects an earlier Vite 7 baseline to Vite 8.x, but retains a stale comparison-table row naming Vite 7. The audited Master Index and Roadmap v3 identify Vite 8.x as the current direction. The repository already declared `^8.0.0`, but had no lockfile, so neither the resolved patch nor a reproducible installation was evidenced.

Official Vite sources list `8.3.4` as the latest Vite release on 2026-10-09 and identify the Vite 8.3 line as the regularly patched current supported version. Vite 8 supports Node.js 20.19+ and 22.12+; this baseline was verified with Node `24.19.0`.

## Decision

Use Vite `8.3.4` for the current repository baseline and pin it exactly in `package.json` and `package-lock.json`. Keep the npm lockfile committed and use `npm ci` for reproducible CI/deployment installs.

This decision resolves only the Vite 7/8 contradiction for the current starter. It does not decide or certify the wider React Router, Cloudflare Workers, Supabase, TypeScript, or deployment architecture. Those remain subject to their roadmap tasks and compatibility evidence. In particular, the existing manifest still declares React Router DOM `^7.0.0`; TASK-004 must verify the full target stack.

## Verification evidence

Environment:
- Node.js `v24.19.0`
- npm `11.9.0`
- Vite `8.3.4`

Commands:
- `npm install --package-lock-only --ignore-scripts --no-audit --no-fund` — succeeded; generated the lockfile.
- `npm ci --no-audit --no-fund` — succeeded; installed 301 packages.
- `npm ls vite --depth=0` — succeeded; resolved `vite@8.3.4`.
- `npm run build` — succeeded; its `npm run typecheck` step and Vite production build both passed.

npm printed a non-blocking warning that the environment's `http-proxy` config key is unknown. No provider configuration or production environment was changed. These checks do not establish browser E2E, Cloudflare runtime, payment, or pilot readiness.

## Sources

- [Vite 8.3.4 official release](https://github.com/vitejs/vite/releases/tag/v8.3.4)
- [Vite supported release lines](https://vite.dev/releases)
- [Vite 8 announcement and Node support](https://vite.dev/blog/announcing-vite8)
- [StayRelay canonical source map](../ai/SOURCE-OF-TRUTH.md)
