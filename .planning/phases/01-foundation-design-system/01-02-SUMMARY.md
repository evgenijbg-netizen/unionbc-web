---
phase: 01-foundation-design-system
plan: 02
subsystem: i18n, ui
tags: [i18n, translation, layout, header, footer, language-switcher, hreflang, astro-components, responsive]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Astro 5.17 scaffold with Tailwind CSS 4 design tokens, i18n routing config"
provides:
  - "Type-safe i18n translation system with t() helper and flat dot-separated JSON keys"
  - "Route mapping between Czech and English URL slugs (getLocalizedPath, getAlternatePath)"
  - "BaseLayout.astro with html lang, hreflang tags, canonical URLs, header, footer"
  - "Responsive header with navigation, mobile hamburger menu, language switcher"
  - "Footer with three-column layout: company info, contact links, quick navigation"
  - "Bilingual homepage placeholders at /cs/ and /en/"
affects: [01-03, 02-content, 03-calculator, 04-seo]

# Tech tracking
tech-stack:
  added: ["@astrojs/check@0.9.6"]
  patterns: [flat-json-i18n-keys, t-function-translation, route-map-slug-mapping, astro-biome-override-unused-vars]

key-files:
  created:
    - src/i18n/utils.ts
    - src/i18n/routes.ts
    - src/i18n/cs.json
    - src/i18n/en.json
    - src/layouts/BaseLayout.astro
    - src/components/Header.astro
    - src/components/Footer.astro
    - src/components/LanguageSwitcher.astro
    - src/pages/en/index.astro
  modified:
    - src/pages/cs/index.astro
    - tsconfig.json
    - biome.json
    - package.json

key-decisions:
  - "Flat dot-separated JSON keys (not nested objects) -- simpler t() lookup, direct property access"
  - "Biome override disables noUnusedImports/noUnusedVariables for .astro files (false positives from experimental Astro support)"
  - "Added @astrojs/check for TypeScript verification of Astro components"
  - "Excluded www/ directory from TypeScript checking via tsconfig exclude"

patterns-established:
  - "Pattern: All visible text via t(locale, 'key') -- zero hardcoded strings in .astro files"
  - "Pattern: Each page derives locale from URL via getLocaleFromUrl(Astro.url)"
  - "Pattern: BaseLayout wraps every page with shared chrome (header, footer, hreflang)"
  - "Pattern: Language switcher uses getAlternatePath() for correct cross-locale URL mapping"
  - "Pattern: Active nav link highlighted with text-accent-400 via pageKey prop comparison"

# Metrics
duration: 5min
completed: 2026-02-13
---

# Phase 1 Plan 2: i18n System and Layout Shell Summary

**Bilingual i18n system with type-safe t() translation helper, responsive layout shell (header with nav + language switcher, footer with contact info), and Czech/English homepage placeholders at /cs/ and /en/**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-13T00:42:10Z
- **Completed:** 2026-02-13T00:47:34Z
- **Tasks:** 2
- **Files modified:** 13

## Accomplishments
- i18n translation system with 19 keys per language, type-safe t() function, and flat dot-separated JSON structure
- Route mapping system translating between Czech (/cs/produkt/) and English (/en/product/) URL slugs
- Shared BaseLayout with correct html lang attribute, three hreflang tags (cs, en, x-default), canonical URLs
- Responsive header with desktop horizontal nav, mobile hamburger menu, and language switcher
- Three-column footer with company info, clickable phone/email contact links, and navigation
- Both /cs/ and /en/ homepages render with translated hero section and design system styling

## Task Commits

Each task was committed atomically:

1. **Task 1: i18n translation system with type-safe utilities** - `f3401d0` (feat)
2. **Task 2: Layout shell, header, footer, language switcher, bilingual homepages** - `a2698f4` (feat)

## Files Created/Modified
- `src/i18n/cs.json` - Czech translation strings (19 keys: nav, footer, CTA, hero)
- `src/i18n/en.json` - English translation strings (19 keys, same structure)
- `src/i18n/utils.ts` - t() translation helper, getLocaleFromUrl(), Locale type, locales array
- `src/i18n/routes.ts` - routeMap, getLocalizedPath(), getAlternatePath() for URL mapping
- `src/layouts/BaseLayout.astro` - Shared layout with html lang, hreflang tags, header, footer, fonts
- `src/components/Header.astro` - Responsive header with nav links, mobile menu, language switcher
- `src/components/Footer.astro` - Three-column footer with company info, contact, quick links
- `src/components/LanguageSwitcher.astro` - Language toggle link using getAlternatePath()
- `src/pages/cs/index.astro` - Czech homepage with translated hero section (replaced test page)
- `src/pages/en/index.astro` - English homepage with translated hero section
- `tsconfig.json` - Added resolveJsonModule, excluded www/ from checking
- `biome.json` - Added .astro override for false-positive unused variable warnings
- `package.json` - Added @astrojs/check dependency

## Decisions Made
- Used flat dot-separated JSON keys (`"nav.home"`) instead of nested objects -- simpler direct-access t() function, avoids deep traversal
- Added Biome override to disable `noUnusedImports` and `noUnusedVariables` for `.astro` files because Biome's experimental Astro support only analyzes the frontmatter script block, not the template section where variables are actually used
- Installed `@astrojs/check` (0.9.6) for TypeScript verification of Astro components
- Excluded `www/`, `dist/`, `node_modules/`, `.astro/` from TypeScript checking to avoid false errors from old site files

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed t() function for flat dot-separated JSON keys**
- **Found during:** Task 1 (i18n utilities creation)
- **Issue:** Research pattern used nested object traversal (`key.split(".").walk()`), but JSON files use flat dot-separated keys as literal property names (e.g., `"nav.home"` is one key, not `nav.home` nested). Walking by dot would fail to find any key.
- **Fix:** Changed t() to direct property lookup (`dict[key]`) instead of nested traversal
- **Files modified:** src/i18n/utils.ts
- **Verification:** `t("cs", "nav.home")` correctly returns "Domu" via Node.js test
- **Committed in:** f3401d0 (Task 1 commit)

**2. [Rule 3 - Blocking] Installed @astrojs/check for TypeScript verification**
- **Found during:** Task 1 verification
- **Issue:** `pnpm check` (astro check) required `@astrojs/check` package which was not installed
- **Fix:** Installed `@astrojs/check` via pnpm
- **Files modified:** package.json, pnpm-lock.yaml
- **Verification:** `pnpm check` passes with 0 errors, 0 warnings
- **Committed in:** f3401d0 (Task 1 commit)

**3. [Rule 1 - Bug] Added tsconfig exclude for www/ directory**
- **Found during:** Task 1 verification
- **Issue:** `astro check` was analyzing old site JavaScript files in www/ directory, producing false errors from legacy code
- **Fix:** Added `"exclude": ["www", "dist", "node_modules", ".astro"]` to tsconfig.json
- **Files modified:** tsconfig.json
- **Verification:** `pnpm check` reports 0 errors from 5 files (only src/ files checked)
- **Committed in:** f3401d0 (Task 1 commit)

**4. [Rule 1 - Bug] Added Biome override for .astro false positives**
- **Found during:** Task 2 (lint verification)
- **Issue:** Biome's experimental Astro support only analyzes frontmatter script, not template section. All template-used variables reported as "unused" -- false positives
- **Fix:** Added `overrides` section in biome.json disabling `noUnusedImports` and `noUnusedVariables` for `**/*.astro` files
- **Files modified:** biome.json
- **Verification:** `pnpm lint` passes with 0 errors
- **Committed in:** a2698f4 (Task 2 commit)

---

**Total deviations:** 4 auto-fixed (2 bugs, 2 blocking)
**Impact on plan:** All auto-fixes necessary for correct operation. The research t() pattern assumed nested JSON but the plan specified flat keys -- an internal inconsistency fixed inline. Biome Astro support limitations are a known issue documented in Biome v2 release notes.

## Issues Encountered
- Biome's experimental Astro file support (v2.3) cannot analyze template expressions, only frontmatter script blocks. This means import/variable usage in Astro templates is invisible to Biome. Workaround: disable unused-variable rules for .astro files specifically.
- Old site files in www/ directory confuse TypeScript checker. Workaround: explicit exclude in tsconfig.json.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- i18n system operational -- every future page uses t() for translation and BaseLayout for shell
- Route map ready for new pages -- add entries to routeMap when creating product, FAQ, certificates, contact pages
- Design system applied -- industrial dark theme with Space Grotesk headings and Inter body text
- Language switching works -- users can toggle between /cs/ and /en/ on any page
- Ready for Plan 03 (remaining Phase 1 tasks) and Phase 2 content pages

## Self-Check: PASSED

- All 9 created files verified present on disk
- All 4 modified files verified present on disk
- Both commit hashes verified in git log (f3401d0, a2698f4)
- `pnpm build` succeeds with 0 errors, generates /cs/index.html and /en/index.html
- `pnpm check` passes with 0 errors, 0 warnings
- `pnpm lint` passes with 0 errors
- Both pages contain correct hreflang tags (cs, en, x-default)
- Language switcher links verified correct (/cs/ -> /en/, /en/ -> /cs/)
- All visible text derived from translation JSON files

---
*Phase: 01-foundation-design-system*
*Completed: 2026-02-13*
