# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-12)

**Core value:** Visitor understands what TEMP-COAT TC101 is, why it works, how much it saves -- and knows who to contact.
**Current focus:** Phase 02.4: ROI Calculator App

## Current Position

Phase: 02.4 BLOCKED -- Awaiting Excel formulas from user
Plan: 0 of 3 in Phase 02.4 (plans are TBD pending input data)
Status: Phase 02.3 complete, Phase 02.4 created -- waiting for Excel with ROI calculation formulas (expected 2026-02-15)
Last activity: 2026-02-14 -- Phase 02.4 added to roadmap, hero microspheres background implemented

Progress: [█████████░] 90%

## Performance Metrics

**Velocity:**
- Total plans completed: 13
- Average duration: 5.2 min
- Total execution time: 1.08 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation-design-system | 3/3 | 15 min | 5 min |
| 02-content-conversion | 3/3 | 22 min | 7.3 min |
| 02.1-visual-refresh-content-accuracy | 5/5 | 25 min | 5 min |
| 02.2-content-restructuring-product-image | 1/1 | 5 min | 5 min |
| 02.3-messaging-rewrite-tone-of-voice | 3/3 | 12 min | 4 min |

**Recent Trend:**
- Last 5 plans: 02.2-01 (5 min), 02.3-01 (4 min), 02.3-02 (3 min), 02.3-03 (5 min)
- Trend: Recent plans averaging 4.2 min

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: i18n architecture must come first -- retrofitting bilingual support is a partial rewrite (research consensus)
- [Roadmap]: Content written from scratch, not migrated from Russian originals (research pitfall #1)
- [Roadmap]: Calculator deferred to Phase 3 -- wrong formulas hurt more than no calculator (research pitfall #4)
- [Roadmap]: Stack: Astro 5.x + Preact 10.x + Tailwind CSS 4.x + TypeScript + Cloudflare Pages (research recommendation)
- [01-01]: Used @tailwindcss/vite plugin (NOT deprecated @astrojs/tailwind) for Tailwind CSS 4
- [01-01]: CSS-first design tokens via @theme directive -- no tailwind.config.js
- [01-01]: Biome v2.3.15 with tailwindDirectives CSS parser and includes-based file scoping
- [01-01]: pnpm 10.x as package manager (installed globally during execution)
- [01-02]: Flat dot-separated JSON keys for i18n (not nested objects) -- simpler t() lookup
- [01-02]: Biome .astro override disables noUnusedImports/noUnusedVariables (false positives from experimental Astro support)
- [01-02]: Added @astrojs/check for TypeScript verification of Astro components
- [01-02]: Excluded www/ directory from TypeScript checking via tsconfig exclude
- [01-03]: Cloudflare Pages deployment deferred -- CLOUDFLARE_API_TOKEN not available, user will configure separately
- [01-03]: Homepage design approved by human review via local preview
- [Phase 02-01]: Product page uses component composition pattern - each section is standalone component accepting locale prop
- [Phase 02-01]: Czech and English content written independently with native phrasing (not translated) per QUAL-01 and QUAL-03
- [Phase 02-02]: Native HTML details/summary for FAQ accordion - zero JavaScript, accessible by default
- [Phase 02-02]: Application guide as inline component (not PDF) for better UX and searchability
- [Phase 02-02]: 118 new translation keys added - all content written from scratch in native Czech and English
- [Phase 02-03]: Sticky CTA bar visible on mobile only (md:hidden) to avoid desktop clutter
- [Phase 02-03]: Contact page emphasizes Halina Bogdanovich as primary contact person (Managing Director)
- [Phase 02-03]: Main element padding (pb-16) prevents sticky CTA from overlapping content on mobile
- [Phase 02-03]: Human checkpoint validates all Phase 2 content quality before Phase 3 begins
- [Phase 02-03]: Full i18n parity verified - 271 keys in both cs.json and en.json with zero mismatches
- [Phase 02.1-01]: Light professional OKLCH palette applied - surface-50 at oklch(0.98) for page background, text-primary inverted to dark
- [Phase 02.1-01]: Option B approach: kept semantic variable names (surface-50 = lightest) and updated both @theme values and component classes
- [Phase 02.1-01]: Dark header/footer framing pattern - bg-surface-800 with text-text-light for professional visual hierarchy
- [Phase 02.1-01]: Added text-light, surface-200, and surface-600 color tokens for light palette requirements
- [Phase 02.1-05]: Inline SVG for logo instead of img tag -- ensures Outfit Variable font renders correctly from page fontsource load
- [Phase 02.1-05]: Dark logo variant (white text) for both header and footer since both have dark navy backgrounds
- [Phase 02.1-05]: OKLCH values derived mathematically from brand hex codes: navy #1B2A4A, teal #00B8A9, cool grey #7A8599
- [Phase 02.2-01]: Content type separation - Certificates page for official documents/tests only, Applications page for usage guidance
- [Phase 02.2-01]: TC101 bucket image displayed on homepage as primary product visual
- [Phase 02.3-01]: Hero messaging leads with problem/solution statement ("Snižujeme tepelné ztráty") not product name
- [Phase 02.3-01]: Homepage restructured to 8 sections with problem-first flow (pain points → solution → target → differentiators)
- [Phase 02.3-01]: All CTAs updated to "technical consultation" language instead of generic "contact us"
- [Phase 02.3-02]: Product page benefits reduced from 8 feature-descriptions to 5 customer-outcome statements (safety, no downtime, corrosion, versatility, cost effectiveness)
- [Phase 02.3-02]: Cooperation workflow timeline pattern established - horizontal on desktop, vertical on mobile
- [Phase 02.3-02]: Product hero describes TC101 as ceramic coating with hollow microspheres (what it is) before benefits (what it does)
- [Phase 02.3-02]: Product page CTA updated from "Request a quote" to "Request technical consultation"
- [Phase 02.3-03]: All CTAs harmonized to technical consultation language across entire site (homepage, product, sticky bar, contact)
- [Phase 02.3-03]: Reference placeholder section added to homepage - signals credibility and experience before real reference data available
- [Phase 02.3-03]: Site description updated to problem-first messaging - emphasizes solution over product catalog
- [Phase 02.3-03]: Contact page reframed as "Technical Consultation" instead of generic "Contact Us"
- [Phase 02.3-03]: Marketing superlative "Extremely" removed from product advantages - more factual tone

### Roadmap Evolution

- Phase 02.1 inserted after Phase 2: Visual Refresh & Content Accuracy (URGENT) -- light color palette, images from old site + stock, factual claims audit
- Phase 02.2 inserted after Phase 02.1: Content Restructuring & Product Image -- applications page split, TC101 bucket image added
- Phase 02.3 inserted after Phase 02.2: Messaging Rewrite & Tone of Voice -- problem-first messaging, new homepage sections, CTA rewrite, reference placeholder

### Pending Todos

None yet.

### Blockers/Concerns

- Calculator formulas need domain expert input (Halina Bogdanovich or manufacturer docs) before Phase 3
- ~~Exact library versions (Astro 5.x, Tailwind 4.x) need verification against current releases at Phase 1 kickoff~~ RESOLVED: Astro 5.17.2, Tailwind CSS 4.1.18, Biome 2.3.15
- Old site traffic baseline unknown -- check Google Search Console or legacy GA (UA-29897996-1) for historical data

## Session Continuity

Last session: 2026-02-13
Stopped at: Phase 02.3 complete and verified (6/6 must-haves passed)
Resume file: .planning/phases/02.3-messaging-rewrite-tone-of-voice/02.3-VERIFICATION.md
