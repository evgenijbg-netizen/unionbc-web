# Project Research Summary

**Project:** Union B+C -- TEMP-COAT TC101 Product Website Redesign
**Domain:** B2B industrial product presentation, bilingual (CZ/EN), static site with interactive calculator
**Researched:** 2026-02-12
**Confidence:** MEDIUM-HIGH

## Executive Summary

This project is a straightforward B2B industrial product website replacing a dated 2013-era site generated with Xara HTML. The domain is well-understood: a static, bilingual (Czech/English) product presentation for a single liquid ceramic insulation product (TC101), with an interactive savings calculator as the primary differentiator. Experts build these as statically generated sites with zero-JS content pages and isolated interactive "islands" for the calculator. Astro is the clear framework choice -- it was purpose-built for this exact use case and ships zero JavaScript by default, which matters for performance on corporate networks where B2B buyers operate.

The recommended approach is content-first development. All four research streams converge on the same conclusion: the biggest risk is not technical -- it is content quality. The existing site contains Russian-origin text translated into awkward Czech, inconsistent technical data across pages (four different temperature ranges for the same product), and uncontextualized manufacturer claims that Czech engineers will dismiss. The technology stack (Astro + Preact + Tailwind + Cloudflare Pages) is mature, low-risk, and well-documented. The architecture (folder-based i18n with shared components) is a solved problem. But the content must be written from scratch, not migrated, and the calculator formulas must be validated against actual Czech certification data before shipping.

The key mitigation strategy is phase ordering: establish the bilingual architecture and i18n system first (retrofitting is a partial rewrite), ship the core product presentation site with rewritten content before tackling the calculator, and defer the calculator to a phase where its formulas can be properly validated. A wrong calculator actively hurts sales more than having no calculator at all.

## Key Findings

### Recommended Stack

The stack is purpose-built for a content-heavy static site with a single interactive element. Every choice optimizes for minimal JavaScript, fast page loads, GDPR compliance in the Czech/EU market, and developer productivity for a small team. See `STACK.md` for full rationale and alternatives matrix.

**Core technologies:**
- **Astro 5.x**: Static site generator -- ships zero JS by default, built-in i18n routing (`/cs/`, `/en/`), island architecture for the calculator. The only SSG with native bilingual routing support.
- **Preact 10.x**: Calculator island -- 3KB React-compatible alternative. The only component that needs client-side interactivity.
- **Tailwind CSS 4.x**: Utility-first styling -- purged CSS for tiny bundles, easy to enforce consistent dark industrial design system. Fallback to v3.4 if v4 has stability issues.
- **TypeScript 5.x**: Type safety for calculator logic and translation key completeness.
- **Cloudflare Pages**: Static hosting -- free tier with unlimited bandwidth, global CDN with European edge locations, automatic HTTPS, Git-based deploys.
- **Self-hosted WOFF2 fonts**: GDPR compliance -- eliminates Google Fonts data transfer concerns for Czech/EU market.
- **Chart.js 4.x** (conditional): Only if visual charts genuinely help conversion in the calculator. Start with styled numbers, add charts if needed.

**Critical version notes:** Astro 5.x and Tailwind CSS 4.x versions should be verified against current releases before project kickoff (research was based on training data with May 2025 cutoff).

### Expected Features

**Must have (table stakes) -- without these, the site fails to replace the old one:**
- Responsive layout (old site is fixed 955px)
- Product overview page with clear value proposition (not buried in translated prose)
- Technical specifications as structured data tables
- How-it-works explanation with diagrams (the product's mechanism is unconventional)
- Certificates and documents for download (non-negotiable for Czech B2B procurement)
- FAQ section (rewritten from the existing ~20 questions)
- Contact information prominent on every page (phone + email + address)
- Bilingual CZ/EN with proper routing and hreflang from day one
- SEO fundamentals (semantic HTML, meta tags, structured data)
- Application examples by industry segment

**Should have (differentiators) -- these make it a sales tool, not just a brochure:**
- Energy savings calculator (the crown jewel -- but needs validated formulas)
- Industrial-grade design (dark tones, data-focused, not template-looking)
- Conventional insulation comparison page (kills the #1 buyer objection)
- Test results / evidence page with thermal imaging photos
- Sticky contact CTA
- Application guide (web-native, not just a PDF link)
- Structured data for B2B SEO (Product, Organization, FAQPage schemas)

**Defer (v2+):**
- Contact form (phone/email is sufficient initially; forms add spam/CAPTCHA/GDPR complexity)
- Distributor network map (data likely stale, needs verification first)
- Analytics integration (choose cookieless solution like Plausible when ready)
- Additional products beyond TC101

**Explicit anti-features (do NOT build):**
- E-commerce / online ordering
- Blog / news section
- CMS / admin panel
- User accounts
- Chat widget
- Multi-product catalog architecture

### Architecture Approach

The site follows a statically generated, folder-based bilingual architecture. Every page exists as two physical HTML files (`/cs/...` and `/en/...`) generated at build time from shared page templates parameterized by locale. All translatable content lives in JSON files with a lightweight `t()` helper function -- no i18n library needed for two languages with approximately 100 strings. The calculator is the single interactive "island" that hydrates client-side; everything else is zero-JavaScript static HTML. See `ARCHITECTURE.md` for full component boundaries, data flow diagrams, and code examples.

**Major components:**
1. **Build System (Astro SSG)** -- generates all static HTML/CSS/JS from source, handles image optimization via Sharp
2. **Layout Shell** -- single shared layout receiving locale as prop; owns `<html>`, nav, footer, SEO meta, hreflang tags
3. **Content Layer (i18n JSON + MDX)** -- single source of truth for all translatable text; flat dot-separated keys in `cs.json`/`en.json`
4. **Route Map** -- explicit mapping between language-specific slugs (e.g., `produkt` <-> `product`), powers language switcher and hreflang
5. **Calculator Island** -- Preact component with `client:visible` hydration; receives pre-translated labels as props; all computation is client-side
6. **SEO Module** -- build-time generation of meta tags, hreflang links, JSON-LD structured data, and sitemap.xml
7. **Static Assets** -- PDFs, optimized images, self-hosted fonts in `/public/`

**Key architectural rules:**
- No hardcoded strings in components -- everything from the content layer
- Pages are thin orchestrators -- they import layout, fetch locale content, compose components, contain no business logic
- Calculator labels are passed as props at build time (no runtime translation loading)
- No automatic browser language detection (harms SEO, unreliable on static sites)

### Critical Pitfalls

The top five pitfalls, ordered by severity and likelihood for this specific project:

1. **Russian-origin content carried over instead of rewritten** -- The existing content reads as foreign propaganda, not Czech industrial copy. Sentences reference US/Japanese military, use non-standard Czech phrasing, and even mention competing brand names. Prevention: treat content as a from-scratch writing project using the old site only as a topic outline. Content phase must take at least 40% of total project time.

2. **Unverifiable technical claims destroying credibility** -- The site claims lambda = 0.001 W/m.K (35x better than mineral wool) without measurement methodology or certification context. Czech engineers will dismiss this as snake oil. Prevention: frame all claims around actual Czech certifications, explain that TC101 is a radiant heat barrier (not bulk insulation), present parameters WITH their measurement standard.

3. **Bilingual architecture as afterthought** -- The old site treated CZ/EN as separate websites. Building Czech first and "adding English later" leads to inconsistent URLs, missing hreflang, and broken language switching. Prevention: URL structure (`/cs/`, `/en/`) and i18n system must be established in the first phase before any pages are built.

4. **Calculator with wrong formulas** -- An oversimplified or inaccurate savings calculator hurts credibility more than having none. Prevention: defer calculator to Phase 2, base formulas on Czech certification data (not manufacturer marketing), include clear assumptions and disclaimers, default to current Czech energy prices from ERU.

5. **SEO migration losing existing rankings** -- Changing all URLs without 301 redirects loses whatever organic traffic the 10+ year old domain has. Prevention: crawl old site for complete URL inventory, create redirect map before launch, submit new sitemap immediately.

## Implications for Roadmap

Based on combined research, the project naturally divides into five phases with clear dependency chains. Content work is the critical path and must start before or alongside development.

### Phase 1: Foundation and Content Architecture
**Rationale:** All four research files agree: i18n architecture and content structure must come first. Retrofitting bilingual support is a partial rewrite (PITFALLS). The i18n system is a dependency for every subsequent component (ARCHITECTURE). Content defines page structure, so design decisions cannot be finalized without it (PITFALLS).
**Delivers:** Project scaffolding (Astro + TypeScript + Tailwind + Biome), i18n system (JSON translation files, `t()` helper, route map), shared layout with nav/footer/hreflang/SEO, directory structure for both languages, static assets pipeline (image optimization, PDF hosting), and old site content audit with full URL inventory for redirect map.
**Addresses features:** Responsive layout foundation, bilingual CZ/EN structure, SEO fundamentals (hreflang, semantic HTML, meta tags), SSL/HTTPS.
**Avoids pitfalls:** Bilingual afterthought (Pitfall 3), hardcoded strings (Anti-pattern 4), inconsistent technical data (Pitfall 8 -- by creating shared spec data file).

### Phase 2: Core Content Pages
**Rationale:** Once the layout shell and i18n system exist, content pages can be built. Content must be written from scratch (not migrated) and reviewed against certification documents for technical accuracy. This phase replaces the old website with a functional, credible product presentation.
**Delivers:** Home page with hero and value proposition, product page (TC101) with specs/advantages/how-it-works, certificates and documents download page, contact page with company details, basic FAQ section (rewritten, categorized, accordion UI).
**Addresses features:** Product overview, technical specifications, how-it-works explanation, product advantages, certificates/documents, contact information, application examples, FAQ.
**Avoids pitfalls:** Russian-origin content (Pitfall 1 -- from-scratch writing), unverifiable claims (Pitfall 2 -- certification-backed specs), PDF documents left behind (Pitfall 7 -- renamed and organized), inconsistent technical data (Pitfall 8 -- single source of truth).

### Phase 3: Differentiator Content and Comparison
**Rationale:** With the core product presentation live, add the content that makes the site a sales tool. These pages build on the product knowledge established in Phase 2 (the comparison page needs the how-it-works explanation; the evidence page supplements the specs).
**Delivers:** Conventional insulation comparison page (TC101 vs mineral wool/glass wool/foam), test results / evidence page with thermal imaging and downloadable reports, web-native application guide, structured data for B2B SEO (Product, Organization, FAQPage schemas).
**Addresses features:** Conventional insulation comparison, test results/evidence, application guide, structured data.
**Avoids pitfalls:** Template-looking design (Pitfall 6 -- content-first design, real Czech text in mockups), ignoring old site knowledge (Pitfall 11 -- rewriting all FAQ and test content).

### Phase 4: Interactive Calculator
**Rationale:** The calculator is the crown jewel differentiator but also the highest-risk feature. It requires validated thermal engineering formulas, current Czech energy prices, and proper disclaimers. Deferring it to Phase 4 allows the core site to launch while formulas are validated. It has no dependency on other pages (it shares only the layout) and can be developed in parallel with Phase 3 if formula validation is completed.
**Delivers:** Interactive savings calculator (Preact island with `client:visible`), input fields (surface area, surface type, operating temperature, current insulation, energy source, energy price), output display (estimated annual savings, payback period), optional Chart.js visualization, "Request detailed calculation" CTA for complex cases, disclaimer text.
**Addresses features:** Energy savings calculator (the key differentiator).
**Avoids pitfalls:** Calculator with wrong formulas (Pitfall 4 -- based on certification data, shows assumptions, includes disclaimer), over-engineering (Anti-pattern 3 -- lightweight island, not a SPA).

### Phase 5: Launch Preparation and SEO Migration
**Rationale:** The final phase handles the transition from old site to new. This is where the redirect map (prepared in Phase 1) gets implemented, final SEO audit happens, and cross-browser/device testing is completed.
**Delivers:** 301 redirect map implementation (every old URL to new equivalent), sitemap.xml with bilingual alternate URLs, robots.txt, final performance audit (target: 100/100 Lighthouse), cross-browser and mobile device testing, analytics setup (cookieless: Plausible or Umami), privacy policy page (both languages), DNS/hosting cutover to Cloudflare Pages.
**Addresses features:** Fast page load, SSL/HTTPS, SEO fundamentals (final audit).
**Avoids pitfalls:** SEO migration disaster (Pitfall 5 -- complete redirect map), language switcher without content parity (Pitfall 9 -- verify both language versions are complete).

### Phase Ordering Rationale

- **i18n first, always.** Three of four research files independently flag this. The architecture requires locale-parameterized templates. The pitfalls warn that retrofitting is a partial rewrite. The features list confirms bilingual must be structural, not cosmetic.
- **Content before calculator.** The calculator depends on validated technical data (FEATURES dependency graph). The content phase establishes the spec data file (PITFALLS Pitfall 8) that the calculator will reference. Shipping a wrong calculator is worse than shipping no calculator (PITFALLS Pitfall 4).
- **Content before design finalization.** Czech text is longer than English and has diacritics. Designing with placeholder text produces layouts that break with real content (PITFALLS Pitfall 6). Content-first design is explicitly recommended.
- **SEO migration as final phase.** Redirect maps can only be finalized when new URL structure is confirmed (PITFALLS Pitfall 5). But the URL inventory of the old site should happen in Phase 1 so nothing is forgotten.
- **Calculator can parallel Phase 3.** The calculator is an independent island (ARCHITECTURE) with no dependency on comparison/evidence/application-guide content. If formula validation completes early, calculator development can start alongside Phase 3.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Calculator):** Thermal engineering formulas, Czech energy pricing data (ERU reference values), calculator UX patterns for industrial B2B. The exact formula methodology needs domain expert input -- this is not a standard web development problem.
- **Phase 2 (Content):** Czech industrial terminology standards (CSN norms), certification document review for accurate technical claims. May need external review by someone in the Czech insulation/construction industry.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Astro scaffolding, i18n setup, Tailwind configuration -- all extremely well-documented with official guides and templates.
- **Phase 5 (Launch):** 301 redirects, sitemap generation, Lighthouse optimization, Cloudflare Pages deployment -- all standard, well-documented procedures.
- **Phase 3 (Differentiator Content):** Standard content pages, structured data (JSON-LD) -- established patterns with official Google documentation.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro for static sites is an established, consensus choice. All technology selections are mature with low lifecycle risk. Minor version numbers need verification (Astro 5.x, Tailwind 4.x). |
| Features | MEDIUM-HIGH | Table stakes and anti-features are well-validated against PROJECT.md and old site analysis. Differentiator assessment could be strengthened with live competitor analysis (web search was unavailable). |
| Architecture | MEDIUM-HIGH | Folder-based i18n, island architecture, and build-time SEO are established patterns. Astro-specific API details should be verified against current docs. |
| Pitfalls | HIGH | Pitfalls are derived from direct analysis of existing site content (Russian-origin text, inconsistent specs, broken links). These are observed facts, not speculation. |

**Overall confidence:** MEDIUM-HIGH

The architectural and technology recommendations are HIGH confidence -- this is a well-trodden path. The MEDIUM factors are: (1) exact library versions need verification against current releases, (2) competitor landscape assertions are based on domain knowledge rather than live analysis, and (3) calculator formula methodology needs domain expert input that research alone cannot provide.

### Gaps to Address

- **Calculator formulas:** No thermal engineering formula specification exists yet. The research identifies this as critical but cannot provide the formulas themselves. Need: consultation with the product distributor (Halina Bogdanovich) or manufacturer technical documentation to establish validated calculation methodology.
- **Current Czech energy prices:** Calculator defaults need current ERU (Energy Regulatory Office) reference values for gas and electricity. These change periodically and were not available during research.
- **Certification document currency:** Research identified that certificates exist but could not verify expiration dates or current validity. Must audit actual PDF documents before publishing.
- **Competitor website analysis:** FEATURES.md competitive positioning is based on domain knowledge, not live analysis of Rockwool CZ, Isover CZ, or other Czech insulation supplier sites. Validating differentiator claims against actual competitors would strengthen the feature prioritization.
- **Tailwind CSS v4 + Astro integration stability:** Recommended as primary with v3.4 as fallback. Verify current integration status before project kickoff.
- **Old site traffic baseline:** No analytics data from the old site was available to quantify the SEO migration risk. Check if Google Search Console or the legacy GA (UA-29897996-1) has historical data.

## Sources

### Primary (HIGH confidence)
- Old website source files: `C:\Users\Evgenij Bogdanovič\Documents\web\www\tcold\*.html` -- direct content analysis of all pages in both languages
- PROJECT.md requirements and constraints -- validated project scope and decisions
- Domain expertise in B2B industrial marketing, bilingual website architecture, Czech market specifics

### Secondary (MEDIUM confidence)
- Training data (cutoff May 2025) -- Astro, Preact, Tailwind, Cloudflare Pages capabilities and best practices
- B2B industrial website patterns -- established and stable domain, patterns have not changed significantly
- Czech GDPR/ePrivacy requirements -- well-established EU regulatory framework

### Tertiary (needs validation)
- Exact library versions (Astro 5.x, Tailwind 4.x, Biome 1.x) -- verify against current releases
- Cloudflare Pages free tier specifics -- verify current limits and features
- Competitive positioning claims -- validate against live competitor sites when web access is available

---
*Research completed: 2026-02-12*
*Ready for roadmap: yes*
