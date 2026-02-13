# Feature Landscape

**Domain:** B2B industrial product presentation website (liquid ceramic thermal insulation)
**Researched:** 2026-02-12
**Overall confidence:** MEDIUM-HIGH (based on old site analysis, PROJECT.md requirements, and established B2B industrial website patterns)

## Table Stakes

Features users expect. Missing = product feels incomplete or unprofessional. A B2B buyer visiting a thermal insulation distributor website expects to find technical credibility, clear product information, and easy contact. Without these, they leave within seconds.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Responsive layout** | B2B buyers use tablets on-site, phones in meetings. Old site is fixed 955px. Non-responsive = unprofessional in 2026. | Low | Framework handles this. Mobile-first approach. |
| **Clear product overview (TC101)** | Visitors need to understand what this product IS in 10 seconds. The old site buries the value prop in dense paragraphs translated from Russian. | Low | Hero section with 1-liner value prop, key stats, and CTA. This is the most important single page. |
| **Technical specifications** | Engineers and facility managers need hard numbers (thermal conductivity, density, temperature range, weight). Without specs, no procurement process starts. | Low | Structured data table, not prose. Old site has specs but they're buried in running text. |
| **How it works explanation** | Ceramic insulation is unconventional -- buyers need to understand the mechanism (ceramic microspheres, heat reflection vs. R-value). Old site has this but in awkward Czech. | Med | Needs diagrams or illustrations. Text-only explanation is insufficient for a physics-based product. Consider simple SVG or static infographic. |
| **Certificates and documents (PDF downloads)** | In Czech B2B construction/industry, certificates are non-negotiable. Buyers need: product certificate (certifikat vyrobku), STO (Stavebni Technicke Osvedceni), safety data sheet (bezpecnostni list). Without these, the product cannot be specified. | Low | Download links for existing PDFs. Old site has: product certificate, STO, safety data sheet, USA certificate. Keep all. |
| **FAQ section** | Old site has ~20 detailed technical FAQ. These answer real buyer objections (corrosion protection, application on aluminum, shelf life, drying time). Removing FAQ would lose valuable SEO content and buyer education. | Med | Rewrite into modern Czech. Collapsible accordion UI. Group by category (application, maintenance, compatibility, safety). |
| **Contact information** | B2B sales are offline. The entire website's purpose is to generate phone calls and emails. Phone number + email + company address must be prominent on every page. | Low | Contact details in footer on every page. Dedicated contact page with map. Old site has: address, phone, GSM, email, Skype (drop Skype). |
| **Bilingual CZ/EN** | PROJECT.md requirement. EN version needed for international reach and professional image. Czech industrial companies increasingly expect EN availability for international procurement chains. | Med | Full content duplication, not machine translation. Language switcher in header. URL-based routing (/en/...). |
| **SEO fundamentals** | Target keywords: tekuta izolace, keramicka izolace, tepelna izolace, TEMP-COAT. Old site has zero SEO (no meta descriptions, no semantic HTML, no structured data). Must have: meta tags, semantic HTML, proper heading hierarchy, structured data (Product, Organization). | Med | Part of every page build. JSON-LD structured data for Product schema. |
| **Fast page load (performance)** | B2B buyers often access from corporate networks. Static site should load in <2s. Old site loads multiple unnecessary JS files. | Low | Static site inherently fast. Optimize images, minimal JS. |
| **SSL/HTTPS** | Basic security expectation for any website in 2026. Chrome marks HTTP as "Not secure". | Low | Hosting-level configuration, not a code feature. |
| **Application examples / use cases** | Buyers need to see their industry represented. Old site lists: cement plants, refineries, breweries, pipelines, buildings, marine, food industry. Without use cases, buyer cannot self-identify. | Med | Replace old table with visual cards/sections. Group by industry segment (industry, construction, marine/transport). Each with brief description + relevant image. |
| **Product advantages** | Clear list of why TC101 vs. conventional insulation. Old site has 10 bullet points (time savings, no scaffolding, anticorrosion, lightweight, fire-resistant). These are sales arguments that close deals. | Low | Structured benefits section with icons. Not prose paragraphs. |

## Differentiators

Features that set this website apart from competitors. Not expected by default in the Czech thermal insulation market, but would significantly increase conversion and professionalism.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Energy savings calculator** | The single most valuable differentiator. Buyer inputs: surface area (m2) + surface type (pipe, tank, wall, roof) + current temperature. Output: estimated energy savings (kWh/year), cost savings (CZK/year), payback period. Makes abstract product benefit concrete and personal. Competitors do NOT have this. | High | Client-side JavaScript. Needs validated formulas based on TC101 thermal properties. Inputs: area, surface type, operating temperature, current insulation (none/conventional). Outputs: savings estimate + payback. This is the feature that turns a brochure website into a sales tool. |
| **Industrial-grade design** | Old site looks like a hobby page from 2008. Competitors in CZ insulation market (Rockwool, Isover, Knauf) have polished corporate sites. An industrial dark-tone design with data emphasis signals "serious manufacturer" not "small distributor". | Med | Design system: dark backgrounds, accent colors, technical typography. Not a feature per se -- it's a design direction that affects all features. But it IS a differentiator vs. typical small-company websites. |
| **Conventional insulation comparison** | Side-by-side comparison: TC101 vs mineral wool/glass wool/foam. Show: thickness needed, weight, installation time, CUI (corrosion under insulation) risk, maintenance. This kills the #1 buyer objection ("why not just use normal insulation?"). | Med | Static content page with comparison table. Data exists in old site's "Jak to funguje" page but needs restructuring into clear visual comparison. |
| **Test results / evidence page** | Old site has 7 tests (5 with PDFs, 2 broken links). Consolidate into a credible "Evidence" or "Test Results" page with thermal imaging photos, measurement data, and downloadable PDF reports. Independent test results build trust faster than marketing copy. | Med | Curate from old site. Remove broken test 6 and 7. Present test results with summary + PDF download. Thermal camera images are particularly compelling. |
| **Sticky contact CTA** | Persistent "Request consultation" or "Get a quote" button visible during scroll. B2B sites that make contact effortless convert better. Most Czech industrial product sites rely on a buried contact page. | Low | Floating button or sticky header CTA. Links to contact page or triggers email/phone. |
| **Application guide / instructions** | Old site links to PDF application manual. Modern approach: create a web-native application guide page with clear steps, surface preparation requirements, drying times, equipment needed. Answers "how do I actually use this?" without downloading a PDF. | Med | Content page. Supplement (not replace) PDF download. Especially valuable for FAQ reduction -- many FAQ answers relate to application. |
| **Structured data for B2B SEO** | Product schema, Organization schema, FAQ schema (for rich snippets in Google). Most Czech industrial sites lack structured data entirely. This gives organic search advantage for "tekuta keramicka izolace" queries. | Low | JSON-LD in page head. Product, Organization, FAQPage schemas. Low effort, meaningful SEO impact. |

## Anti-Features

Features to explicitly NOT build. These are tempting but wrong for this specific project.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **E-commerce / online ordering** | Sales are B2B offline. Product requires consultation for correct application thickness. Online checkout would bypass necessary technical advice and damage product outcomes. PROJECT.md explicitly marks this out of scope. | Prominent contact CTA. "Request a quote" flow that generates email with basic project details. |
| **Blog / news section** | A small distributor team cannot maintain regular content. An empty or outdated blog signals "abandoned" and hurts more than it helps. PROJECT.md marks this out of scope. | Evergreen content only: product info, FAQ, test results. These do not need regular updates. |
| **CMS / admin panel** | Static site is the right choice for content that changes annually at most. CMS adds hosting complexity, security surface, maintenance overhead, and cost. WordPress for a 6-page site is overkill. PROJECT.md explicitly marks this out of scope. | Static site generator or hand-coded. Edit source files directly when content needs to change (rare). |
| **User accounts / login** | No use case. No personalization needed. No dealer portal (old site had "Pro distributory" behind PHP -- drop this). Accounts add GDPR complexity for zero value. | Public content only. |
| **Chat widget / chatbot** | Small team cannot staff real-time chat. Bot responses for a technical niche product would be wrong and damage credibility. | Phone number + email prominently displayed. Maybe a simple contact form. |
| **Other products (Silent Running, Q2, Quick Gun)** | Focus dilution. TC101 is the primary revenue driver. Old site had pages for 4+ products. PROJECT.md scopes to TC101 only. Other products can be added later as needed. | Brief mention in footer or "About" section that other products exist, with note to contact for details. |
| **Animated product videos / 3D** | Expensive to produce, slow to load, and unnecessary for a coating product. The old site links to a YouTube video -- that's sufficient. | Embed existing YouTube video if relevant. Use high-quality static images and diagrams instead. |
| **Cookie consent banner (complex)** | If the site uses only essential cookies (no analytics tracking, no third-party services), no consent banner is needed under GDPR/ePrivacy. A simpler approach: use privacy-respecting analytics (Plausible, Umami) that don't require consent, or no analytics at all initially. | If analytics needed: use cookieless analytics (Plausible/Umami). Avoids consent banner entirely. Revisit only if marketing tracking is required later. |
| **Contact form** | Surprising anti-feature, but deliberate: forms get spammed, require backend/email service, need CAPTCHA, and GDPR notices. For a B2B site where phone calls are preferred, a form adds complexity for limited value. The old site had no form and operated fine for years. | Display email address and phone number prominently. Mailto link is sufficient. If a form is strongly desired, make it Phase 2 with simple email-forwarding service (Formspree/Netlify Forms). |
| **Distributor network map** | Old site listed 5 distributors with GPS coordinates. This data is likely stale (some distributors may no longer be active). Maintaining distributor data is an ongoing obligation. | Single contact point (Union B+C). If distributor network still active, add as a simple list in Phase 2 after verifying current data. |
| **Multi-product catalog structure** | Building a generic product catalog architecture for a single-product website adds unnecessary abstraction. | Build pages specific to TC101. If more products are added in the future, refactor then. YAGNI. |

## Feature Dependencies

```
Responsive Layout ──> All other features (foundation)
Bilingual CZ/EN ──> All content features (content must exist in both languages)

Product Overview ──> How It Works (overview links to deeper explanation)
Product Overview ──> Technical Specifications (overview references key specs)
Product Overview ──> Application Examples (overview shows where it's used)

How It Works ──> Conventional Insulation Comparison (comparison builds on mechanism explanation)

Technical Specifications ──> Energy Savings Calculator (calculator uses spec values as constants)
Application Examples ──> Energy Savings Calculator (calculator surface types derive from use cases)

Certificates ──> (standalone, no dependencies)
FAQ ──> (standalone, draws from all product content)
Contact ──> (standalone, linked from everywhere)
Test Results ──> (standalone, supplements product credibility)

SEO Fundamentals ──> Structured Data (structured data is the advanced layer of SEO)
```

## MVP Recommendation

**Phase 1 -- Core product presentation (table stakes):**

Prioritize:
1. Responsive layout with industrial design system
2. Product overview page (TC101) with clear value proposition
3. Technical specifications (structured table)
4. How it works (with at least a simple diagram)
5. Product advantages section
6. Certificates and documents download
7. Contact page + persistent contact info in header/footer
8. Bilingual CZ/EN structure (even if EN content comes slightly later, the routing and structure must be in place from day one)
9. SEO fundamentals (semantic HTML, meta tags, proper headings)
10. SSL/HTTPS

**Phase 2 -- Content depth and interactivity:**

1. FAQ section (rewritten, categorized, with accordion UI)
2. Application examples with industry segments
3. Energy savings calculator (the key differentiator -- needs formula validation)
4. Test results / evidence page
5. Conventional insulation comparison page
6. Application guide (web-native)
7. Structured data (Product, Organization, FAQPage)
8. Sticky contact CTA

**Defer to Phase 3 or later:**
- Distributor network (verify data first)
- Contact form (only if phone/email proves insufficient)
- Analytics integration (choose cookieless solution when ready)

**Rationale for this ordering:**
- Phase 1 replaces the old website. A visitor can understand the product, verify credibility (certificates), and contact the company. This is the minimum viable replacement.
- Phase 2 adds the features that make the website a sales tool rather than a brochure. The calculator is the crown jewel but requires the most work and validated formulas, so it belongs in Phase 2 where it can be built properly.
- The bilingual structure must be Phase 1 because retrofitting i18n is painful. Content for EN can be staggered, but the routing and component architecture must support it from the start.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Table stakes features | HIGH | Based on direct analysis of old website content + PROJECT.md requirements + established B2B industrial website patterns. These are well-understood. |
| Differentiator features | MEDIUM-HIGH | Energy calculator is clearly the key differentiator based on PROJECT.md. Design differentiation is opinion-based but grounded in competitive landscape. |
| Anti-features | HIGH | Directly validated against PROJECT.md "Out of Scope" section + practical considerations for a small distributor team. |
| Dependencies | HIGH | Based on logical content relationships observed in old site structure. |
| Complexity estimates | MEDIUM | Complexity depends on chosen tech stack (not yet decided). Relative complexity is reliable; absolute effort is not. |

## Sources

- Old website analysis: `C:\Users\Evgenij Bogdanovič\Documents\web\www\tcold\*.html` (all pages examined)
- Project definition: `C:\Users\Evgenij Bogdanovič\Documents\web\.planning\PROJECT.md`
- B2B industrial website patterns: training data (stable domain, patterns have not changed significantly in recent years)
- Note: WebSearch and WebFetch were unavailable during this research session. Competitor website analysis (Rockwool CZ, Isover CZ, tempcoat.com) could further validate differentiator claims. Confidence on competitive positioning is therefore MEDIUM rather than HIGH.
