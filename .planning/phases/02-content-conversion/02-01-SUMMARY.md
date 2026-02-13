---
phase: 02-content-conversion
plan: 01
subsystem: product-pages
tags:
  - content
  - product-page
  - homepage
  - i18n
  - components
dependency_graph:
  requires:
    - 01-01 (i18n infrastructure)
    - 01-02 (route map)
    - 01-03 (design system)
  provides:
    - product page components
    - enhanced homepage
    - 140+ translation keys
  affects:
    - navigation (product link now resolves)
    - language switcher (product page mapping)
tech_stack:
  added:
    - shared/SectionHeading.astro
    - product/* component suite
  patterns:
    - composition (page files compose section components)
    - prop-passing (locale prop to all components)
    - native content writing (not translation)
key_files:
  created:
    - src/components/shared/SectionHeading.astro
    - src/components/product/HeroSection.astro
    - src/components/product/SpecsTable.astro
    - src/components/product/HowItWorks.astro
    - src/components/product/AdvantagesList.astro
    - src/components/product/ComparisonTable.astro
    - src/pages/cs/produkt.astro
    - src/pages/en/product.astro
  modified:
    - src/i18n/cs.json (+140 keys)
    - src/i18n/en.json (+140 keys)
    - src/pages/cs/index.astro (5 sections)
    - src/pages/en/index.astro (5 sections)
decisions:
  - "Product page uses component composition pattern - each section is standalone component accepting locale prop"
  - "All technical specs include measurement context (e.g., '50× lower than mineral wool') per QUAL-02"
  - "Czech and English content written independently with native phrasing (not translated) per QUAL-01 and QUAL-03"
  - "Homepage value proposition ('1mm replaces 50mm') prominently displayed for 10-second comprehension per PROD-01"
  - "Industries section uses pill tags (not detailed examples) to establish breadth of use"
metrics:
  duration: 8 min
  tasks_completed: 2
  files_created: 8
  files_modified: 4
  translation_keys_added: 140
  components_created: 6
  commits: 2
  completed_at: 2026-02-13
---

# Phase 02 Plan 01: Product Page and Enhanced Homepage Summary

**One-liner:** Product page with 5 ceramic insulation sections + enhanced homepage with value prop and industry trust signals

## Objective Achieved

Created the product page as a composition of five section components (hero, specs table, how-it-works, advantages, comparison) and enhanced the homepage from placeholder into full landing page with value proposition, stats, benefits, industries, and CTA sections. All content written natively in Czech and English.

## Tasks Completed

### Task 1: Create product page with five section components

**Status:** Complete
**Commit:** 7d5b08e

**What was built:**

- **SectionHeading.astro** - Reusable heading component used by all product sections
- **HeroSection.astro** - Product hero with value prop, key stat (1mm = 50mm), and CTA button
- **SpecsTable.astro** - Technical specifications table with 8 parameters (density, conductivity, heat capacity, temp range, vapor permeability, weight, elongation, consumption), each with measurement context
- **HowItWorks.astro** - 3-step explanation of ceramic microsphere technology (microspheres → radiation reflection → thin-film application)
- **AdvantagesList.astro** - Grid of 8 advantage cards (time saving, no scaffolding, fire resistant, lightweight, anti-corrosion, vapor permeable, flexible, wide temp range)
- **ComparisonTable.astro** - Side-by-side comparison with conventional insulation (8 rows: thickness, weight, install time, CUI risk, maintenance, scaffolding, fire rating, flexibility)
- **cs/produkt.astro** and **en/product.astro** - Thin page shells composing all 5 section components
- **120+ translation keys** added to cs.json and en.json with native phrasing

**Verification passed:**
- `pnpm build` succeeded with zero errors
- `pnpm check` passed (0 errors, 2 hints)
- `pnpm lint` passed after formatting fixes
- Built output contains `/cs/produkt/index.html` and `/en/product/index.html`
- Both pages contain 2 table elements (specs and comparison)
- All `product.*` keys exist in both language files

**Key technical decisions:**
- All spec values include `.context` subkey with human-readable comparison (e.g., "Lighter than water – won't stress structures")
- Comparison table highlights TC101 column in accent-400 to draw attention
- Czech content references "Certifikát výrobku" for certification claims (QUAL-02)
- English and Czech written independently, not translated between each other

### Task 2: Enhance homepage from placeholder to full content

**Status:** Complete
**Commit:** ae65339

**What was built:**

- **Enhanced hero section** - Added value proposition line ("1 mm replaces 50 mm"), dual CTAs (primary: contact, secondary: learn more link to product page)
- **Expanded stats section** - From 3 to 4 cards, added "Certified in CZ" card
- **Why TC101 section** - 3-column feature highlights: saves time, saves money, proven technology (on bg-surface-800 background)
- **Industries section** - Pill-tag list of 7 industries (cement, refinery, food, brewery, paper, construction, marine)
- **CTA section** - Full-width call-to-action band before footer ("Ready to reduce energy costs?")
- **20+ new translation keys** added for Czech and English with native phrasing
- **Removed home.coming_soon** placeholder key

**Verification passed:**
- `pnpm build` succeeded with zero errors
- `pnpm check` passed (0 errors, 2 hints)
- `pnpm lint` passed after formatting fixes
- Homepage at /cs/ and /en/ both have 5 distinct sections
- Czech headings verified: "Proč TC101", "Důvěra napříč odvětvími", "Připraveni snížit náklady"
- English headings verified: "Why TC101", "Trusted across industries", "Ready to reduce energy costs"

**Key technical decisions:**
- Homepage uses alternating bg-surface-800 backgrounds for visual separation (hero → stats on bg-900 → why on bg-800 → industries on bg-900 → CTA on bg-800)
- Industries section uses lightweight pill tags, not detailed examples (detail deferred to resources page in 02-02)
- Value proposition prominently displayed in hero for 10-second comprehension per PROD-01
- Czech "Why" content emphasizes ROI ("Investice se vrátí díky snížení nákladů na energie")
- English "Why" content focuses on practical benefits ("Installation takes hours instead of days")

## Content Quality Notes

**Czech content characteristics:**
- Modern industrial Czech (not overly technical)
- Framed around Czech certifications ("Certifikováno v ČR podle platných norem")
- Natural phrasing for procurement managers ("Kontaktujte nás pro nezávaznou konzultaci")
- Uses "nanášení" and "aplikace" interchangeably for variety

**English content characteristics:**
- Professional but accessible (not marketing fluff)
- Active voice ("Apply like paint", "Saves time", not "Can be applied", "Time is saved")
- Concrete numbers ("1mm coating weighs a fraction", not "lightweight coating")
- Industry-standard terminology (CUI, thermal conductivity, elongation)

Both languages independently written to sound native, not translated from each other.

## Deviations from Plan

None - plan executed exactly as written. All components created, all translation keys added, all verification steps passed, both pages render correctly with all specified sections.

## Verification Results

**Overall verification (from PLAN.md):**
- `pnpm build` produces /cs/index.html, /en/index.html, /cs/produkt/index.html, /en/product/index.html with zero errors ✓
- `pnpm check` and `pnpm lint` both pass clean ✓
- Product page contains all 5 sections rendered from dedicated components ✓
- Homepage contains 5 content sections (hero, stats, why, industries, CTA) ✓
- Navigation "Produkt TC101" / "Product TC101" link resolves to product page (no 404) ✓
- Language switcher on product page correctly maps between /cs/produkt/ and /en/product/ ✓
- All visible text on both pages comes from translation JSON files ✓

**Success criteria coverage:**
- PROD-01: Homepage shows value proposition, key stats, and contact CTA within 10 seconds ✓
- PROD-02: Technical specs in structured data table ✓
- PROD-03: How it works explanation ✓
- PROD-04: Structured advantages list ✓
- PROD-05: Side-by-side comparison ✓
- QUAL-01: Content from scratch in modern Czech ✓
- QUAL-02: Claims framed around Czech certifications ✓
- QUAL-03: Native English parity ✓

## Self-Check: PASSED

**Files created - verification:**
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/components/shared/SectionHeading.astro
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/components/product/HeroSection.astro
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/components/product/SpecsTable.astro
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/components/product/HowItWorks.astro
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/components/product/AdvantagesList.astro
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/components/product/ComparisonTable.astro
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/pages/cs/produkt.astro
- [FOUND] C:/Users/Evgenij Bogdanovič/Documents/web/src/pages/en/product.astro

**Commits - verification:**
- [FOUND] 7d5b08e - feat(02-01): create product page with five section components
- [FOUND] ae65339 - feat(02-01): enhance homepage from placeholder to full content

**Build output - verification:**
- [FOUND] dist/cs/produkt/index.html
- [FOUND] dist/en/product/index.html
- [FOUND] dist/cs/index.html (5 sections)
- [FOUND] dist/en/index.html (5 sections)

All claimed artifacts verified to exist.

## Next Steps

- Plan 02-02: Resources page (PDF embeds, industry examples, certifications showcase)
- Plan 02-03: FAQ page (technical questions, application guidance, certification details)

## Notes for Future Work

- Calculator integration deferred to Phase 3 (needs domain expert formula validation)
- Resources page should link to actual PDF certificates from /cs/certifikaty/ page
- Consider adding structured data (JSON-LD) for product specifications in future SEO phase
