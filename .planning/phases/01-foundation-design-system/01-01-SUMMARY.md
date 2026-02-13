---
phase: 01-foundation-design-system
plan: 01
subsystem: infra
tags: [astro, tailwindcss, biome, preact, cloudflare-pages, i18n, design-tokens]

# Dependency graph
requires: []
provides:
  - "Astro 5.17 project scaffold with TypeScript strict mode"
  - "Tailwind CSS 4 via @tailwindcss/vite with industrial design tokens (@theme)"
  - "Biome v2.3 linting and formatting configuration"
  - "i18n routing with prefixDefaultLocale: true (cs/en)"
  - "Cloudflare Pages deployment config (wrangler.jsonc)"
  - "35 old-site 301 redirect rules in _redirects"
  - "Design system tokens: surface colors, accent, typography, spacing, breakpoints"
affects: [01-02, 01-03, 02-content, 03-calculator, 04-seo]

# Tech tracking
tech-stack:
  added: [astro@5.17.2, tailwindcss@4.1.18, "@tailwindcss/vite@4.1.18", "@astrojs/preact@4.1.3", preact@10.28.3, "@astrojs/sitemap@3.7.0", "@biomejs/biome@2.3.15", typescript@5.9.3, "@fontsource-variable/inter@5.2.8", "@fontsource-variable/space-grotesk@5.2.10"]
  patterns: [tailwind-v4-vite-plugin, css-first-design-tokens, biome-v2-config, astro-i18n-prefix-routing]

key-files:
  created:
    - package.json
    - astro.config.mjs
    - tsconfig.json
    - biome.json
    - wrangler.jsonc
    - src/styles/global.css
    - public/_redirects
    - public/robots.txt
    - src/pages/index.astro
    - src/pages/cs/index.astro
    - .gitignore
  modified: []

key-decisions:
  - "Used @tailwindcss/vite plugin (NOT deprecated @astrojs/tailwind) for Tailwind CSS 4"
  - "CSS-first design tokens via @theme directive -- no tailwind.config.js"
  - "Biome v2.3.15 with tailwindDirectives CSS parser and includes-based file scoping"
  - "pnpm 10.x as package manager (installed globally during execution)"

patterns-established:
  - "Pattern: Tailwind v4 via Vite plugin in astro.config.mjs vite.plugins array"
  - "Pattern: Design tokens in src/styles/global.css @theme block generate Tailwind utilities"
  - "Pattern: Biome files.includes scopes linting to src/ and config files only"
  - "Pattern: i18n routing with /cs/ and /en/ prefixes, root redirects to /cs/"

# Metrics
duration: 6min
completed: 2026-02-13
---

# Phase 1 Plan 1: Project Scaffolding Summary

**Astro 5.17 + Tailwind CSS 4 project with industrial design tokens, Biome v2 linting, i18n routing (cs/en), and 35 old-site redirect rules for Cloudflare Pages**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-13T00:33:05Z
- **Completed:** 2026-02-13T00:39:01Z
- **Tasks:** 2
- **Files modified:** 11

## Accomplishments
- Scaffolded Astro 5.17.2 project with all Phase 1 dependencies (Tailwind CSS 4, Preact, Sitemap, fonts, Biome, TypeScript)
- Industrial design system tokens via Tailwind CSS 4 @theme: surface colors (oklch), accent palette, Space Grotesk headings + Inter body
- 35 old-site redirect rules (301 permanent) covering all Czech and English legacy URLs
- Biome v2.3.15 configured with Tailwind directive support and project-scoped file includes
- Build produces static HTML in dist/ with _redirects and robots.txt copied to output

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Astro project with all dependencies and tooling config** - `5ca7d96` (feat)
2. **Task 2: Design system tokens and static assets** - `37ffbd6` (feat)
3. **Fix: Biome v2.3.15 config migration and formatting** - `0401eca` (fix)

## Files Created/Modified
- `package.json` - Project manifest with all dependencies and scripts
- `pnpm-lock.yaml` - Locked dependency versions
- `astro.config.mjs` - Astro config with Tailwind vite plugin, Preact, sitemap, i18n routing
- `tsconfig.json` - TypeScript strict config with Preact JSX
- `biome.json` - Biome v2.3.15 linting/formatting with Tailwind directive support
- `wrangler.jsonc` - Cloudflare Pages deployment config
- `src/styles/global.css` - Tailwind CSS 4 @theme with industrial design tokens
- `src/pages/index.astro` - Root redirect fallback to /cs/
- `src/pages/cs/index.astro` - Design system test page (temporary, replaced in Plan 02)
- `public/_redirects` - 35 old-site URL redirect rules for Cloudflare Pages
- `public/robots.txt` - Allow all crawlers, reference sitemap URL
- `.gitignore` - Ignore dist/, node_modules/, .astro/, www/

## Decisions Made
- Used `@tailwindcss/vite` plugin (NOT deprecated `@astrojs/tailwind`) for Tailwind CSS 4 compatibility
- CSS-first design tokens via `@theme` directive -- no `tailwind.config.js` needed
- Installed pnpm 10.29.3 globally (was not available on the system)
- Biome v2.3.15 required migration from research config (organizeImports moved to assist.actions.source)
- Enabled `tailwindDirectives: true` in Biome CSS parser to support `@theme` and `@import "tailwindcss"`
- Scoped Biome to project files only via `files.includes` (excludes www/, .claude/, .planning/, .astro/)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] pnpm not installed globally**
- **Found during:** Task 1 (project scaffolding)
- **Issue:** `pnpm` command not found -- only npm was available
- **Fix:** Installed pnpm globally via `npm install -g pnpm` (v10.29.3)
- **Files modified:** None (global installation)
- **Verification:** `pnpm -v` returns 10.29.3
- **Committed in:** N/A (system-level fix)

**2. [Rule 3 - Blocking] Astro create command fails with Unicode path**
- **Found during:** Task 1 (project scaffolding)
- **Issue:** `pnpm create astro@latest` fails with EPERM on path containing diacritics (Bogdanovic)
- **Fix:** Manually scaffolded the project (created package.json, config files, directory structure) instead of using the template CLI
- **Files modified:** All Task 1 files
- **Verification:** `pnpm build` succeeds, project structure matches research architecture
- **Committed in:** 5ca7d96 (Task 1 commit)

**3. [Rule 1 - Bug] Biome v2.3.15 config incompatibility with research config**
- **Found during:** Overall verification
- **Issue:** Biome v2.3.15 renamed `organizeImports` to `assist.actions.source.organizeImports` and `ignore` to `includes` in `files` section. `@theme` directive unrecognized without `tailwindDirectives` parser option.
- **Fix:** Ran `biome migrate --write`, enabled `css.parser.tailwindDirectives: true`, used `files.includes` for scoping, applied Biome formatting to all project files
- **Files modified:** biome.json, astro.config.mjs, package.json, tsconfig.json, src/pages/index.astro, src/pages/cs/index.astro, src/styles/global.css
- **Verification:** `npx @biomejs/biome check .` passes with 0 errors
- **Committed in:** 0401eca (fix commit)

---

**Total deviations:** 3 auto-fixed (2 blocking, 1 bug)
**Impact on plan:** All auto-fixes necessary for correct operation. No scope creep. Research config was slightly outdated for the exact Biome v2.3.15 release.

## Issues Encountered
- `pnpm create astro` does not handle Windows paths with Unicode characters (diacritics in username). Workaround: manual project scaffolding.
- `pnpm approve-builds` requires interactive terminal input. Workaround: added `pnpm.onlyBuiltDependencies` field to package.json.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Project builds to static HTML in dist/ -- ready for layout and page development
- Design tokens generate correct Tailwind utilities -- ready for component styling
- i18n routing configured -- ready for bilingual page creation in Plan 02
- Biome operational -- ready for code quality enforcement
- _redirects and robots.txt in place -- ready for deployment when content exists

## Self-Check: PASSED

- All 12 created files verified present on disk
- All 3 commit hashes verified in git log (5ca7d96, 37ffbd6, 0401eca)
- `pnpm build` succeeds with 0 errors
- `npx @biomejs/biome check .` passes with 0 errors
- dist/_redirects and dist/robots.txt present after build
- No tailwind.config.js exists (CSS-first @theme confirmed)

---
*Phase: 01-foundation-design-system*
*Completed: 2026-02-13*
