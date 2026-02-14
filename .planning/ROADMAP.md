# Roadmap: Union B+C -- TEMP-COAT TC101 Website

## Overview

This roadmap delivers a modern bilingual (CZ/EN) product website for TEMP-COAT TC101, replacing the outdated 2013-era Xara-generated site. The project progresses from bilingual architecture foundation, through content-first page development, and concludes with SEO migration and launch. The critical constraint is that i18n architecture must come first (retrofitting is a partial rewrite) and content must be written from scratch (not migrated from Russian originals).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Design System** - Bilingual architecture, responsive layout, industrial design system, hosting
- [x] **Phase 2: Content & Conversion** - All product pages, resources, FAQ, contact, CTAs with from-scratch bilingual content
- [x] **Phase 02.1: Visual Refresh & Content Accuracy (INSERTED)** - Light palette, real images, factual claims audit
- [x] **Phase 02.2: Content Restructuring & Product Image (INSERTED)** - Dedicated applications page, TC101 bucket image
- [x] **Phase 02.3: Messaging Rewrite & Tone of Voice (INSERTED)** - Problem-first messaging, new sections, CTA rewrite, reference placeholder
- [ ] **Phase 02.4: ROI Calculator App (INSERTED)** - Internal tool behind login: ROI calculations, graphical output, PDF export on Union B+C letterhead
- [ ] **Phase 3: Launch & SEO Migration** - Structured data, SEO audit, 301 redirects, go-live

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: Visitors can navigate a responsive, bilingual site shell with industrial design -- the structural backbone every page will use
**Depends on**: Nothing (first phase)
**Requirements**: TECH-01, TECH-02, TECH-04, TECH-05, TECH-06
**Success Criteria** (what must be TRUE):
  1. Site renders correctly on mobile (375px), tablet (768px), and desktop (1440px) with no horizontal scroll or broken layouts
  2. Visitor can switch between Czech and English using a header language switcher, with URL routing (/cs/, /en/) and proper hreflang tags on every page
  3. All pages share a consistent industrial design system -- dark backgrounds, technical typography, accent colors -- that signals "serious manufacturer"
  4. Any page loads in under 2 seconds on a throttled connection (static assets optimized, minimal JS shipped)
  5. Site is served over HTTPS with a valid SSL certificate on Cloudflare Pages
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md -- Project scaffolding (Astro 5 + TypeScript + Tailwind CSS 4 + Biome 2), design system tokens, old-site redirects
- [x] 01-02-PLAN.md -- i18n translation system, shared layout shell (header, footer, language switcher), bilingual homepage placeholders
- [x] 01-03-PLAN.md -- Homepage polish, build verification, Cloudflare Pages deployment, human visual sign-off

### Phase 2: Content & Conversion
**Goal**: Visitors can understand what TC101 is, why it works, see evidence, download documents, and know who to contact -- in both Czech and English
**Depends on**: Phase 1
**Requirements**: PROD-01, PROD-02, PROD-03, PROD-04, PROD-05, CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONV-01, CONV-03, QUAL-01, QUAL-02, QUAL-03
**Success Criteria** (what must be TRUE):
  1. Visitor lands on the homepage and within 10 seconds sees what TC101 is, its key stats, and a contact CTA
  2. Visitor can navigate to a product page showing technical specs in a data table, how-it-works explanation, advantages list, and side-by-side comparison with conventional insulation
  3. Visitor can browse categorized FAQ (accordion UI), download certificates/documents as PDF, view application examples by industry, see test results with thermal imaging, and read an application guide
  4. Contact information (phone, email, address) is visible in the footer on every page and on a dedicated contact page, plus a persistent sticky "Request consultation" CTA during scroll
  5. All content reads as native modern Czech (and native English) written from scratch -- no Russian-translated phrasing, all technical claims backed by Czech certifications with measurement context
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md -- Product page (specs, how-it-works, advantages, comparison) and enhanced homepage with full content
- [x] 02-02-PLAN.md -- FAQ page with categorized accordion and Resources page (certificates, test results, application examples, guide)
- [x] 02-03-PLAN.md -- Contact page, sticky CTA bar, i18n parity verification, human content review

### Phase 02.1: Visual Refresh & Content Accuracy (INSERTED)

**Goal:** Site uses a professional light color palette with real product imagery, and all technical claims are verified and internally consistent
**Depends on:** Phase 2
**Success Criteria** (what must be TRUE):
  1. Site uses a light professional color palette (not dark industrial) while preserving the same design system token structure
  2. Product pages include real product images (migrated from old site) optimized via Astro Image component
  3. All technical claims in i18n files are verified -- fire classification contradiction resolved, thermal conductivity qualified, temperature range clarified
  4. Site builds without errors and looks professional on all viewports
  5. Messaging leads with credible benefits (safety, accessibility, visual inspection) not inflated thermal claims
**Plans:** 5 plans

Plans:
- [x] 02.1-01-PLAN.md -- Light color palette transformation (@theme + 22 component files)
- [x] 02.1-02-PLAN.md -- Technical claims audit (fire classification fix, thermal conductivity qualifier, temperature range clarification)
- [x] 02.1-03-PLAN.md -- Legacy image migration with Astro Image component + human visual approval
- [x] 02.1-04-PLAN.md -- Credible messaging rewrite (safety-first positioning, remove inflated thermal claims)
- [x] 02.1-05-PLAN.md -- Brand manual alignment (Outfit font, navy/teal palette, Union B+C logo)

### Phase 02.2: Content Restructuring & Product Image (INSERTED)

**Goal:** Application areas and application guide have their own dedicated page (not buried in certificates), and the site features a professional TC101 product bucket photo
**Depends on:** Phase 02.1
**Success Criteria** (what must be TRUE):
  1. "Oblasti použití" (application examples by industry) and "Jak se používá" (application guide) are on a dedicated page, not on the certificates page
  2. Certificates page contains only documents and test results
  3. New page is accessible from main navigation in both CZ and EN
  4. TC101 bucket product image (from zdrojové obrázky/tc101.png) is optimized via Astro Image and visible on product page or homepage
  5. Site builds without errors and navigation works correctly
**Plans:** 1 plan

Plans:
- [x] 02.2-01-PLAN.md -- Move application sections to dedicated page, add TC101 bucket image, update nav

### Phase 02.3: Messaging Rewrite & Tone of Voice (INSERTED)

**Goal:** Site communicates as a technical partner solving industrial problems, not a product catalog — with problem-first messaging, concrete use cases, and credible CTA language
**Depends on:** Phase 02.2
**Success Criteria** (what must be TRUE):
  1. Homepage hero leads with problem/solution ("Snižujeme tepelné ztráty bez odstávky") not product description ("TC101 je izolační nátěr")
  2. Homepage includes "Pro koho je řešení určeno" section (target industries) and "Proč UNION B+C" section (differentiators)
  3. Product page benefits are rewritten as customer outcomes (safety, no downtime, corrosion protection) not feature descriptions
  4. Product page includes "Postup spolupráce" (cooperation workflow: consultation → assessment → proposal → realization)
  5. All CTAs say "Požádejte o technickou konzultaci" / "Request technical consultation" not generic "Kontaktujte nás"
  6. Reference section exists with structured placeholder (will be populated with real data later)
  7. No marketing superlatives — tone is factual, technical, solution-oriented
  8. All changes in both CZ and EN, site builds with 0 errors
**Plans:** 3 plans

Plans:
- [x] 02.3-01-PLAN.md -- Homepage messaging rewrite (problem-first hero, new sections, CTA language)
- [x] 02.3-02-PLAN.md -- Product page rewrite (outcome benefits, cooperation workflow, product CTA)
- [x] 02.3-03-PLAN.md -- Global CTA harmonization, reference placeholder, tone audit, i18n cleanup

### Phase 02.4: ROI Calculator App (INSERTED)

**Goal:** Internal sales tool behind a simple login where Union B+C staff can calculate ROI for TEMP-COAT TC101 on various objects, view results graphically, and export professional PDF reports on Union B+C letterhead to send to customers
**Depends on:** Phase 02.3
**Success Criteria** (what must be TRUE):
  1. Calculator is accessible at a dedicated route (e.g., /app/calculator) behind a simple shared-password login
  2. User can input object parameters and get ROI calculation results (formulas from Excel — to be provided)
  3. Results are displayed graphically (charts, visual breakdown) in a professional layout
  4. User can export the calculation as a PDF on Union B+C branded letterhead (logo, contact info, professional formatting)
  5. Application works on desktop and tablet (mobile optional for internal tool)
  6. Login session persists (cookie-based) so user doesn't re-enter password on every visit
  7. No calculation history in MVP (may be added later)
  8. Site builds with 0 errors, public pages unaffected
**Plans:** TBD (awaiting Excel formulas from user)

Plans:
- [ ] 02.4-01: TBD — Auth middleware, login page, protected route structure
- [ ] 02.4-02: TBD — Calculator UI and logic (formulas from Excel)
- [ ] 02.4-03: TBD — Graphical results display and PDF export with Union B+C letterhead

### Phase 3: Launch & SEO Migration
**Goal**: The new site replaces the old one without losing search engine rankings, with full structured data enabling rich snippets
**Depends on**: Phase 02.4 (all content and features must exist before final SEO work)
**Requirements**: TECH-03, TECH-07
**Success Criteria** (what must be TRUE):
  1. Every page has semantic HTML, proper heading hierarchy, meta descriptions, and targets relevant keywords (tekuta izolace, keramicka izolace, tepelna izolace, TEMP-COAT)
  2. Pages include JSON-LD structured data for Product, Organization, and FAQPage schemas that validate in Google Rich Results Test
  3. Every old site URL returns a 301 redirect to its new equivalent (no 404s for previously indexed pages)
  4. Sitemap.xml with bilingual alternate URLs is submitted, robots.txt is configured, and Lighthouse scores 90+ across all categories
**Plans**: TBD

Plans:
- [ ] 03-01: Structured data (JSON-LD), SEO meta tags, sitemap, robots.txt, 301 redirects, final audit and DNS cutover

## Progress

**Execution Order:**
Phases execute in numeric order: 1 --> 2 --> 02.1 --> 02.2 --> 02.3 --> 02.4 --> 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 3/3 | Complete | 2026-02-13 |
| 2. Content & Conversion | 3/3 | Complete | 2026-02-13 |
| 02.1. Visual Refresh & Content Accuracy | 5/5 | Complete | 2026-02-13 |
| 02.2. Content Restructuring & Product Image | 1/1 | Complete | 2026-02-13 |
| 02.3. Messaging Rewrite & Tone of Voice | 3/3 | Complete | 2026-02-13 |
| 02.4. ROI Calculator App | 0/3 | Blocked (awaiting Excel formulas) | - |
| 3. Launch & SEO Migration | 0/1 | Not started | - |
