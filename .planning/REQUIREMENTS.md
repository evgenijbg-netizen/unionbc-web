# Requirements: Union B+C — TEMP-COAT TC101 Website

**Defined:** 2026-02-12
**Core Value:** Visitor understands what TEMP-COAT TC101 is, why it works, how much it saves — and knows who to contact.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Product Presentation

- [ ] **PROD-01**: Visitor sees a clear product overview page with 1-liner value proposition, key stats, and contact CTA within 10 seconds of landing
- [ ] **PROD-02**: Visitor can view technical specifications (thermal conductivity, density, temperature range, weight, emisivity) in a structured data table
- [ ] **PROD-03**: Visitor can understand how TC101 works (ceramic microspheres, heat reflection vs R-value) through text with diagrams or infographics
- [ ] **PROD-04**: Visitor can see a structured list of product advantages with clear benefit statements (time savings, no scaffolding, anticorrosion, lightweight, fire-resistant)
- [ ] **PROD-05**: Visitor can compare TC101 side-by-side with conventional insulation (mineral wool, glass wool, foam) on thickness, weight, installation time, CUI risk, and maintenance

### Content & Resources

- [ ] **CONT-01**: Visitor can browse a categorized FAQ section (application, maintenance, compatibility, safety) with accordion UI, rewritten in modern Czech
- [ ] **CONT-02**: Visitor can download certificates and documents as PDF (product certificate, STO, safety data sheet)
- [ ] **CONT-03**: Visitor can see application examples grouped by industry segment (industry, construction, marine/transport) with descriptions and relevant images
- [ ] **CONT-04**: Visitor can view a test results / evidence page with thermal imaging photos, measurement summaries, and downloadable PDF reports
- [ ] **CONT-05**: Visitor can read a web-native application guide with steps, surface preparation, drying times, and equipment needed (supplements PDF download)

### Interactivity & Conversion

- [ ] **CONV-01**: Visitor can find contact information (phone, email, address) prominently on every page (footer) and on a dedicated contact page
- [ ] **CONV-02**: Visitor can use an interactive energy savings calculator — inputs: surface area (m2), surface type (pipe/tank/wall/roof), operating temperature, current insulation, energy source, energy price — outputs: estimated annual savings (kWh/year), cost savings (CZK/year), payback period
- [ ] **CONV-03**: Visitor sees a persistent sticky contact CTA ("Request consultation" / "Get a quote") visible during scroll on all pages

### Technical Foundation

- [ ] **TECH-01**: Site is fully responsive and mobile-first, working on phones, tablets, and desktop (replacing fixed 955px layout)
- [ ] **TECH-02**: Site is bilingual (Czech + English) with URL-based routing (/cs/, /en/), language switcher in header, proper hreflang tags, and content parity between languages
- [ ] **TECH-03**: All pages have SEO fundamentals — semantic HTML, proper heading hierarchy, meta descriptions, and target keywords (tekuta izolace, keramicka izolace, tepelna izolace, TEMP-COAT)
- [ ] **TECH-04**: Pages load in under 2 seconds on typical corporate networks (static site, optimized images, minimal JS)
- [ ] **TECH-05**: Site serves over HTTPS with valid SSL certificate
- [ ] **TECH-06**: Site uses an industrial-grade design system — dark backgrounds, accent colors, technical typography — signaling "serious manufacturer" not "small distributor"
- [ ] **TECH-07**: Pages include structured data (JSON-LD) for Product, Organization, and FAQPage schemas to enable rich snippets in search results

### Content Quality

- [ ] **QUAL-01**: All content is written from scratch in modern Czech (not carried over from Russian-translated originals), with natural phrasing and relevant Czech/European context
- [ ] **QUAL-02**: All technical claims are framed around actual Czech certifications with measurement methodology context — no unattributed manufacturer marketing claims
- [ ] **QUAL-03**: English content is native-quality, not machine-translated, with full content parity to Czech version

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Extended Features

- **EXT-01**: Contact form with email forwarding (Formspree or similar) — only if phone/email proves insufficient
- **EXT-02**: Distributor network list — verify current data first, then add as simple list
- **EXT-03**: Cookieless analytics integration (Plausible or Umami)
- **EXT-04**: Privacy policy page (both languages)
- **EXT-05**: Additional products beyond TC101 (Silent Running, Q2)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| E-commerce / online ordering | Sales are B2B offline; product requires consultation for correct application |
| Blog / news section | Small team cannot maintain; empty blog signals "abandoned" |
| CMS / admin panel | Static site is correct for content that changes annually at most |
| User accounts / login | No use case; adds GDPR complexity for zero value |
| Chat widget / chatbot | Small team cannot staff; bot responses for technical niche would damage credibility |
| Multi-product catalog architecture | YAGNI — build TC101-specific pages, refactor if more products added later |
| Animated product videos / 3D | Expensive, slow, unnecessary — embed existing YouTube if relevant |
| Complex cookie consent banner | Use cookieless analytics or no analytics to avoid consent requirement |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| PROD-01 | Phase 2: Content & Conversion | Pending |
| PROD-02 | Phase 2: Content & Conversion | Pending |
| PROD-03 | Phase 2: Content & Conversion | Pending |
| PROD-04 | Phase 2: Content & Conversion | Pending |
| PROD-05 | Phase 2: Content & Conversion | Pending |
| CONT-01 | Phase 2: Content & Conversion | Pending |
| CONT-02 | Phase 2: Content & Conversion | Pending |
| CONT-03 | Phase 2: Content & Conversion | Pending |
| CONT-04 | Phase 2: Content & Conversion | Pending |
| CONT-05 | Phase 2: Content & Conversion | Pending |
| CONV-01 | Phase 2: Content & Conversion | Pending |
| CONV-02 | Phase 3: Interactive Calculator | Pending |
| CONV-03 | Phase 2: Content & Conversion | Pending |
| TECH-01 | Phase 1: Foundation & Design System | Complete |
| TECH-02 | Phase 1: Foundation & Design System | Complete |
| TECH-03 | Phase 4: Launch & SEO Migration | Pending |
| TECH-04 | Phase 1: Foundation & Design System | Complete |
| TECH-05 | Phase 1: Foundation & Design System | Deferred (deploy pending) |
| TECH-06 | Phase 1: Foundation & Design System | Complete |
| TECH-07 | Phase 4: Launch & SEO Migration | Pending |
| QUAL-01 | Phase 2: Content & Conversion | Pending |
| QUAL-02 | Phase 2: Content & Conversion | Pending |
| QUAL-03 | Phase 2: Content & Conversion | Pending |

**Coverage:**
- v1 requirements: 23 total
- Mapped to phases: 23
- Unmapped: 0

---
*Requirements defined: 2026-02-12*
*Last updated: 2026-02-13 after roadmap creation*
