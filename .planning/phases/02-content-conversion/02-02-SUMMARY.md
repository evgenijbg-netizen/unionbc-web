---
phase: 02-content-conversion
plan: 02
subsystem: content
tags: [faq, resources, certificates, documentation, native-content]
completed: 2026-02-13
duration: 9 min

dependency_graph:
  requires:
    - 02-01 (i18n utilities and BaseLayout)
    - 01-02 (translation infrastructure)
  provides:
    - FAQ page with categorized accordion
    - Resources page with 4 sections
    - 15 downloadable PDF documents
    - Web-native application guide
  affects:
    - Navigation (FAQ and Certificates links now functional)

tech_stack:
  added:
    - Native HTML details/summary for accordion
    - PDF document management in public/documents/
  patterns:
    - Zero-JS accordion with name attribute for exclusive expansion
    - Component composition for resources sections
    - Anchor-based in-page navigation

key_files:
  created:
    - src/components/faq/FaqAccordion.astro
    - src/pages/cs/faq.astro
    - src/pages/en/faq.astro
    - src/components/resources/DocumentCard.astro
    - src/components/resources/TestResultCard.astro
    - src/components/resources/ApplicationCard.astro
    - src/components/resources/ApplicationGuide.astro
    - src/pages/cs/certifikaty.astro
    - src/pages/en/certificates.astro
    - public/documents/*.pdf (15 files)
  modified:
    - src/i18n/cs.json (added FAQ and certificates keys)
    - src/i18n/en.json (added FAQ and certificates keys)

decisions:
  - key: Native details/summary accordion
    rationale: Zero JavaScript, accessible by default, browser-native behavior
    impact: Better performance and accessibility than custom JS accordion
  - key: Application guide as inline component
    rationale: Web-native content easier to update than PDF, better UX
    impact: Users can read guide without downloading, searchable content
  - key: Anchor-based section navigation
    rationale: Simple deep-linking without complex routing
    impact: Shareable direct links to specific sections

metrics:
  tasks_completed: 2
  files_created: 27
  translation_keys_added: 118
  pdf_files: 15
---

# Phase 02 Plan 02: FAQ and Resources Summary

**One-liner:** FAQ with 16 native questions and resources page with downloadable certificates, test results, application examples, and 6-step inline guide.

## What Was Built

### Task 1: FAQ Page (Commit 2080297)

Created a fully functional FAQ page with categorized accordion using native HTML `<details>/<summary>` elements.

**FaqAccordion.astro:**
- 4 categories: Application (5 questions), Technical (4 questions), Maintenance (3 questions), Safety (4 questions)
- Total: 16 curated questions with detailed answers
- Native accordion using `name` attribute for exclusive expansion within each category
- Chevron rotation indicator on open state
- Zero JavaScript required

**Content Quality:**
- All questions and answers written from scratch in native Czech and English
- No Russian-translated phrasing (pitfall avoided)
- Technical details included: specific temperatures, times, quantities
- References to Czech certifications where applicable

**Pages:**
- `/cs/faq/` and `/en/faq/` with max-w-3xl container for readability
- Meta titles and descriptions optimized for search
- Integrated with BaseLayout and navigation

### Task 2: Resources Page (Commit 4850866)

Created a comprehensive resources page with 4 sections and supporting components.

**PDFs Migrated:**
Copied 15 PDF files from old site to `public/documents/`:
- bezpecnostni-list.pdf (safety data sheet)
- manual-aplikace.pdf (application manual)
- expert-audit.pdf
- test01.pdf through test05.pdf (5 test results)
- mereni-teplot1.pdf, mereniteplot2.pdf (temperature measurements)
- testy-domku.pdf (house test)
- metod-cz.pdf, PROTOKOL-cz.pdf (methodology and protocol)
- industrial.pdf, plase-of-use.pdf

**Components Created:**

1. **DocumentCard.astro** - Downloadable document card with PDF icon, title, description, and download indicator
2. **TestResultCard.astro** - Test result card with accent border, summary, and download link
3. **ApplicationCard.astro** - Application example card with icon placeholder and description
4. **ApplicationGuide.astro** - Web-native 6-step application guide with numbered badges

**Resources Page Structure:**

**Section 1: Documents** (`#documents`)
- 3 downloadable PDFs (safety sheet, expert audit, manual)
- Product certificate note (original available on request)

**Section 2: Tests** (`#tests`)
- 10 test result cards with summaries:
  - 5 material tests (conductivity, elongation, adhesion, fire, aging)
  - 5 application measurements (temperature, thermal calculations, house test, methodology, protocol)
- Each card links to actual PDF with "Download PDF" localized button

**Section 3: Applications** (`#applications`)
- 3 industry categories:
  - **Industry:** 5 examples (cement plants, refineries, food processing, breweries, paper mills)
  - **Construction:** 3 examples (roofs, facades, industrial halls)
  - **Transport/Marine:** 2 examples (ships, containers)
- Each example: specific industry, what was insulated, key benefit

**Section 4: Guide** (`#guide`)
- 6-step inline application guide:
  1. Surface preparation (cleaning, priming requirements)
  2. Material mixing (stir, do not thin)
  3. Application method (brush, roller, airless spray)
  4. Layer thickness and consumption (0.5mm per coat, 0.34 kg/m²)
  5. Drying times (1 hour dry to touch, 2-4 hours between coats, 24-48 hours full cure)
  6. Tool cleaning (water-based, clean immediately)

**Navigation:**
- Quick jump nav at top with links to all 4 sections
- Anchor IDs enable deep-linking to specific sections

## Verification Results

All verification criteria passed:

**Build:**
- `pnpm build` succeeded with zero errors
- Generated `/cs/faq/index.html`, `/en/faq/index.html`, `/cs/certifikaty/index.html`, `/en/certificates/index.html`

**FAQ Page:**
- 16 `<details>` elements present (verified via grep)
- All `faq.*` keys exist in both cs.json and en.json
- Navigation "FAQ" link resolves correctly

**Resources Page:**
- 4 section anchor IDs verified: `#documents`, `#tests`, `#applications`, `#guide`
- 13 PDF links found in built HTML (3 docs + 10 tests)
- 15 PDF files exist in `public/documents/`

**Code Quality:**
- `pnpm check` passed (0 errors, 2 pre-existing hints)
- `pnpm lint` passed clean after auto-fix
- All translation keys properly structured

## Success Criteria Coverage

**CONT-01: Categorized FAQ with accordion UI** ✓
- 4 categories, 16 questions, native details/summary accordion

**CONT-02: Downloadable certificates/documents as PDF** ✓
- 3 PDFs linked in documents section, all accessible

**CONT-03: Application examples by industry** ✓
- 10 examples across 3 categories (Industry, Construction, Transport)

**CONT-04: Test results with measurements** ✓
- 10 test result cards with summaries + PDF downloads

**CONT-05: Web-native application guide** ✓
- 6-step inline guide (not PDF), structured and detailed

**QUAL-01/QUAL-03: Native Czech and English content** ✓
- All FAQ, test descriptions, application examples, and guide steps written from scratch in native language

## Deviations from Plan

None - plan executed exactly as written.

## Technical Notes

**FAQ Accordion Implementation:**
- Used `name` attribute on `<details>` to group questions by category
- Only one question can be open per category (exclusive accordion)
- Chevron SVG rotates using `group-open:rotate-180` Tailwind class
- No JavaScript required - fully accessible and performant

**PDF Migration:**
- Skipped non-PDF files as instructed (.DOC, .mht, .htm, .jpg, .wmv)
- Renamed files for clarity (bezpec-list_cz.pdf → bezpecnostni-list.pdf)
- Removed double dashes from filenames (plase-of-use--cz.pdf → plase-of-use.pdf)

**Translation Keys:**
- Added 118 new keys (58 FAQ + 60 certificates/guide)
- All content written independently in Czech and English (not translated)
- Technical details maintained across languages

**Component Patterns:**
- All resource components accept `locale` prop where needed for translation
- TestResultCard localizes "Download PDF" button text
- ApplicationCard uses first letter as icon placeholder (no images for now)

## Files Modified

**Created (27 files):**
- 5 Astro components (FaqAccordion, 4 resource components)
- 4 Astro pages (cs/en FAQ, cs/en certificates)
- 15 PDF files in public/documents/
- 3 translation updates (cs.json, en.json, both modified)

**Modified (2 files):**
- src/i18n/cs.json (added 118 keys)
- src/i18n/en.json (added 118 keys)

## Next Steps

Phase 02 Plan 03 will complete the content conversion with contact page and any remaining static content.

---

**Duration:** 9 minutes
**Commits:** 2 (2080297, 4850866)
**Status:** Complete ✓

## Self-Check: PASSED

**Files created:**
- ✓ FaqAccordion.astro
- ✓ cs/faq.astro
- ✓ en/faq.astro
- ✓ DocumentCard.astro
- ✓ TestResultCard.astro
- ✓ ApplicationCard.astro
- ✓ ApplicationGuide.astro
- ✓ cs/certifikaty.astro
- ✓ en/certificates.astro
- ✓ 15 PDF files in public/documents/

**Commits:**
- ✓ 2080297 (FAQ page)
- ✓ 4850866 (Resources page)

All claims verified. Summary is accurate.
