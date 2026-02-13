# Domain Pitfalls

**Domain:** B2B industrial product website (bilingual, technical insulation product)
**Project:** Union B+C s.r.o. -- TEMP-COAT TC101 liquid ceramic insulation
**Researched:** 2026-02-12
**Confidence:** HIGH (based on direct analysis of existing site content + domain expertise)

---

## Critical Pitfalls

Mistakes that cause rewrites, lost credibility, or project failure.

---

### Pitfall 1: Carrying Over Russian-Origin Content Instead of Rewriting From Scratch

**What goes wrong:** The existing site content is a direct translation from Russian source material. Sentences like "Velkymi odberateli tohoto materialu jsou armady, namornctvo a namorni pechota USA a Japonska" (large buyers include the armies, navy, and marines of USA and Japan) read as foreign propaganda rather than Czech industrial copy. The FAQ still references "Themal-Tec" (the old competing brand name) in one answer. Technical descriptions use non-standard Czech phrasing ("citilne klesaji", "cimz prespiva") that a Czech B2B buyer would find off-putting or unprofessional. The English pages show similar problems -- awkward phrasing clearly translated from Russian via Czech rather than written natively.

**Why it happens:** Content migration feels faster than content creation. The temptation is to "clean up" existing text rather than write new content, because the source material covers all the topics. But polishing a bad translation produces polished-sounding bad text, not good text.

**Consequences:**
- Czech industrial buyers (engineers, facility managers) immediately recognize non-native text and lose trust
- Technical inaccuracies survive from the original Russian context (e.g., military references irrelevant to Czech market)
- SEO suffers because phrasing does not match how Czech professionals actually search for insulation products
- English version remains unusable for international credibility

**Warning signs:**
- Content phase takes less than 40% of total project time
- Pages contain sentences that can be traced back to existing HTML
- Technical terms do not match Czech industry standards (CSN norms terminology)
- References to military, Russian case studies, or non-European contexts remain

**Prevention:**
- Treat content as a FROM-SCRATCH writing project, using old site only as a topic outline
- Create a terminology glossary first: map Russian-origin terms to proper Czech building/industrial terminology (e.g., "substrat" to standard Czech equivalents)
- Have each page reviewed against the question: "Would a Czech stavbyvedouci (site manager) find this natural?"
- Write English content independently, not as a translation of Czech content
- Remove ALL references to Russian/military context; replace with Czech/European industrial examples

**Phase mapping:** Content writing phase -- must happen BEFORE design/development, not in parallel. Content defines page structure.

**Severity:** CRITICAL -- this is the single most important pitfall for this specific project

---

### Pitfall 2: Unverifiable Technical Claims Destroying Credibility

**What goes wrong:** The existing site claims thermal conductivity of lambda = 0.001 W/m.K for TEMP-COAT TC101. This is an extraordinary claim -- standard mineral wool insulation has lambda ~0.035 W/m.K, meaning TC101 would supposedly be 35x better than mineral wool in a 0.5mm layer. The site presents this without context, citation methodology, or comparison to values a Czech engineer would recognize. B2B industrial buyers in the Czech Republic know CSN/EN standards and will immediately question unsupported superlative claims.

**Why it happens:** Product distributors inherit marketing claims from manufacturers. The original TEMP-COAT manufacturer makes specific claims about reflective insulation properties that work differently from bulk insulation (low emissivity vs. R-value). But presenting raw numbers without explaining the measurement methodology or the difference between reflective and resistive insulation makes the claims look like snake oil.

**Consequences:**
- Engineers dismiss the entire site as marketing nonsense
- Purchasing managers who need to justify procurement cannot cite unsupported claims
- Competitors or industry professionals may publicly challenge claims, damaging reputation
- Potential regulatory issues if claims cannot be substantiated under Czech advertising law

**Warning signs:**
- Technical parameters are copied from manufacturer data sheets without Czech/EU certification context
- Lambda values are presented without specifying measurement standard (ISO, ASTM, or proprietary)
- No distinction between "bulk thermal conductivity" and "effective emissivity/reflectance"
- Comparisons to conventional insulation that do not explain the different mechanisms

**Prevention:**
- Frame technical claims around Czech certifications that the product actually has
- Explain the mechanism clearly: TC101 works primarily as a radiant heat barrier (low emissivity), not as bulk insulation -- a different category than mineral wool
- Present parameters WITH their measurement context: "Measured according to [standard], certificate [number]"
- Include the actual Czech certification documents prominently, not buried in download links
- Use "independent test results" framing rather than manufacturer marketing claims
- Add a clear section explaining: "How liquid ceramic insulation differs from conventional insulation" so engineers understand the comparison framework

**Phase mapping:** Content writing phase. Technical content must be reviewed against available certification documents before going live.

**Severity:** CRITICAL -- wrong technical framing makes the entire site counterproductive

---

### Pitfall 3: Bilingual Architecture as Afterthought

**What goes wrong:** The existing site handles CZ/EN as completely separate page trees under different directories (`/tcold/` for Czech, `/tcold/eng/` for English). The English version has different page structures, different navigation items (more product sub-pages), and uses a completely different Google Analytics tracking ID. The two versions are effectively separate websites that happen to share hosting.

Building the new site and then "adding English" later creates one of two bad outcomes: (a) English pages are inferior translations rushed to completion, or (b) the architecture does not properly support bilingual routing, hreflang tags, or shared components.

**Why it happens:** Developers build the primary language first and treat the second language as a feature to add. Bilingual architecture requires upfront decisions about URL structure, content model, shared vs. per-language components, and language switching UX.

**Consequences:**
- URL structure becomes inconsistent (e.g., `/produkty/tc-101` vs `/en/products/tc-101` -- but one was not planned)
- Missing hreflang tags = Google indexes wrong language for wrong country
- Language switcher breaks or links to non-existent translated pages
- Content updates require remembering to update both languages -- one falls behind
- SEO for English queries is wasted if English pages are not properly structured

**Warning signs:**
- Language switching is discussed as a "nice to have" or deferred feature
- URL structure for second language is decided after page templates are built
- No hreflang specification in the initial technical plan
- Content model does not have a "translation status" concept

**Prevention:**
- Decide URL structure upfront: `unionbc.cz/cs/...` and `unionbc.cz/en/...` (subdirectory approach)
- Implement hreflang tags from day one in the template
- Build language switching into the base layout component, not as an addon
- Both language versions must be content-complete before launch (even if English is shorter)
- For a static site: ensure the build process generates both language trees from a shared content source (e.g., JSON/YAML content files with `cs` and `en` keys)

**Phase mapping:** Architecture/scaffolding phase. URL structure and i18n approach must be decided in Phase 1 before any pages are built.

**Severity:** CRITICAL -- retrofitting i18n is a partial rewrite

---

### Pitfall 4: Calculator With Wrong Formulas or Missing Context

**What goes wrong:** The savings calculator is a key differentiator for this site -- it gives visitors a concrete reason to engage. But an industrial savings calculator for insulation must handle real physics: surface type (pipe diameter, flat surface, tank), temperature differential, current insulation state, energy cost, and the specific insulation mechanism of TC101 (reflective barrier, not R-value bulk insulation). Getting formulas wrong, oversimplifying to the point of uselessness, or presenting unrealistic savings will damage credibility more than having no calculator at all.

**Why it happens:** Developers build a simple "enter area, get savings" calculator without consulting thermal engineering principles. The manufacturer may provide simplified marketing formulas that do not account for Czech energy prices, local climate conditions, or the variety of industrial use cases.

**Consequences:**
- An engineer calculates savings for their specific use case and gets a number that does not match their experience -- they dismiss the product
- Over-promising savings leads to post-sale disappointment and complaints
- Under-promising (due to overly conservative defaults) kills deals
- Calculator becomes a liability rather than a sales tool

**Warning signs:**
- Calculator uses a single generic "savings percentage" for all scenarios
- No input for ambient temperature, surface geometry, or current insulation state
- Energy cost defaults do not reflect Czech energy prices (which are specific to CZK/kWh for gas, electricity)
- Output is a single number without confidence range or assumptions stated
- No disclaimers about "indicative calculation, actual savings depend on conditions"

**Prevention:**
- Base calculator on actual test data from Czech certifications, not manufacturer marketing percentages
- Include clear inputs: surface area, surface type (pipe/flat/curved), operating temperature, ambient temperature, current insulation (none/partial), energy source (gas/electricity), energy price
- Show calculation assumptions transparently ("Based on: 4000 heating hours/year, outdoor temperature -3C average heating season")
- Include a "Request detailed calculation" CTA for complex cases -- this is also a lead generation tool
- Default Czech energy prices to current ERU (Energy Regulatory Office) reference values
- Add disclaimer: "Orientacni vypocet. Pro presnou kalkulaci nas kontaktujte."
- Consider making the calculator a Phase 2 feature, shipping a simpler "request a quote" form in Phase 1

**Phase mapping:** Phase 2 (after core content site is live). Calculator needs verified formulas and is a distinct feature.

**Severity:** CRITICAL -- a wrong calculator actively hurts sales

---

## Moderate Pitfalls

---

### Pitfall 5: SEO Migration Disaster -- Losing Existing Search Rankings

**What goes wrong:** The old site at unionbc.cz has been indexed since ~2013. It has existing (albeit poor) rankings for terms like "tekuta izolace", "TEMP-COAT", "keramicka izolace". A redesign that changes all URLs without proper redirects will lose whatever organic traffic exists. The old site uses flat URL structures (`/tepelna-izolace---tc-101.html`), and the new site will likely use hierarchical paths (`/cs/produkty/tc-101`).

**Prevention:**
- Crawl the old site to create a complete URL inventory before launch
- Create a 301 redirect map: every old URL to its new equivalent
- Preserve the Google Search Console property and submit new sitemap immediately after launch
- Do NOT change the domain -- keep unionbc.cz
- Migrate Google Analytics from legacy `ga.js` (UA-29897996-1) to GA4 before or during launch
- Submit old sitemap with `<lastmod>` dates and new sitemap simultaneously
- Monitor Search Console for 404 spikes in the first 4 weeks post-launch

**Warning signs:**
- No redirect map document exists before development starts
- Old URLs return 404 after launch
- Search Console shows indexing errors in first week
- Organic traffic drops more than 30% in first month

**Phase mapping:** Pre-launch checklist (final phase). Redirect map should be created in content phase when new URL structure is finalized.

**Severity:** MODERATE -- old site has limited traffic, but any existing ranking should be preserved

---

### Pitfall 6: Industrial Design That Looks Like a Template

**What goes wrong:** "Industrial design with dark tones" is the stated goal, but B2B industrial sites frequently fall into two traps: (a) using a generic dark corporate template that looks like every other "serious" website, or (b) going so heavy on the industrial aesthetic (rust textures, machinery photos, gradient metal effects) that it looks dated on arrival.

The target audience -- Czech engineers, facility managers, procurement staff -- visits dozens of supplier sites. They need to find information fast, not admire design. Over-designing or under-designing both fail.

**Prevention:**
- Study actual Czech B2B industrial supplier sites (Hilti CZ, Rockwool CZ, BASF Czech) -- they are clean, information-dense, and fast
- Prioritize information architecture over visual flair: clear navigation, scannable content, prominent technical specs
- Use dark tones (dark gray/navy backgrounds) for headers and hero sections, but keep content areas light for readability
- Product photos should be real application photos (pipes with TC101 applied, before/after), not stock industrial imagery
- Mobile-first: Czech industrial buyers increasingly check supplier sites on phones during site visits
- Typography must handle Czech diacritics perfectly (hacky, carky) -- test with real Czech content, not lorem ipsum

**Warning signs:**
- Design mockups use placeholder English text instead of real Czech content
- Product page design is finalized before content is written
- No real product photos are available, only manufacturer stock images
- Design review does not include checking on actual mobile devices

**Phase mapping:** Design phase. Must happen AFTER content outline is ready (content-first design).

**Severity:** MODERATE -- bad design hurts trust but does not kill the project

---

### Pitfall 7: PDF Documents Left Behind

**What goes wrong:** The existing site links to many PDF documents: safety data sheets, test results, application manuals, expert opinions, certifications. These files have names like `Rekonstr_Dom_sravnit_analiz.pdf`, `Rezervuary_sravnit_analiz.pdf` -- clearly Russian-origin filenames. Some link to external `tempcoat.com` URLs that may no longer work. These PDFs are critical trust signals for B2B buyers (engineers need to download data sheets for procurement justification), but they are easy to forget during a redesign.

**Prevention:**
- Inventory ALL existing PDF files and external document links before redesign
- Verify which PDFs are still current and relevant (some may be outdated test results)
- Rename files to professional Czech/English names (`bezpecnostni-list-tc101.pdf`, `certifikat-EU-tc101.pdf`)
- Host all documents locally -- do not depend on tempcoat.com links
- Create a dedicated "Documents and Certificates" section with clear categorization
- Ensure PDFs are accessible (text-based, not scanned images) for SEO
- Check that all Czech certifications are current (not expired)

**Warning signs:**
- PDF links return 404 after launch
- Document section is a flat list without categorization
- Files still have Russian/cryptic filenames
- External links to tempcoat.com are broken

**Phase mapping:** Content audit phase (early). PDF inventory and curation should happen alongside content writing.

**Severity:** MODERATE -- missing documents block B2B procurement decisions

---

### Pitfall 8: Inconsistent Technical Data Across Pages

**What goes wrong:** The existing site already shows this problem: the Czech product page states temperature range as "-60 to +260C", the "about" page says "-60 to +200C", the FAQ says "-50 to +260C" with a note about +177C for continuous use, and the English page says "-50 to +200C". Four different pages, four different numbers. This kind of inconsistency is fatal for a technical product site -- an engineer who finds conflicting specs on the same site will not trust any of the numbers.

**Prevention:**
- Create a single "source of truth" document with ALL technical parameters, referenced from one place
- Every page that mentions a technical value should pull from this single source (in a static site context: a shared data file or content variable)
- Cross-reference all values against the actual Czech certification documents
- Include a "Technical Data Sheet" page that is the canonical reference, and link other pages to it
- During content review, specifically check: temperature ranges, lambda values, density, coverage rates, drying times, elongation percentages

**Warning signs:**
- Content is written page-by-page rather than from a shared specification document
- Technical values differ between pages (search the content for all temperature and lambda mentions)
- No single "canonical" technical specification section exists

**Phase mapping:** Content writing phase. Create the specification data file FIRST, then reference it in all content.

**Severity:** MODERATE -- but compounds into CRITICAL for credibility if not caught

---

## Minor Pitfalls

---

### Pitfall 9: Language Switcher Without Content Parity

**What goes wrong:** The Czech site will naturally have richer content (it is the primary market). If the English version is a skeleton with only basic product info while the Czech version has detailed FAQ, multiple case studies, and comprehensive technical specs, the language switcher creates an embarrassing experience. An English-speaking visitor switches to English and finds half the content missing.

**Prevention:**
- Define a minimum content parity list: which pages MUST exist in both languages
- It is acceptable for English to be shorter (fewer FAQ questions, fewer case studies) as long as the core pages are complete
- If a Czech page has no English equivalent, either do not show the switcher on that page or show a "This page is available in Czech only" notice
- Never show a 404 when switching languages

**Phase mapping:** Content phase. Define the bilingual content matrix early.

**Severity:** MINOR for Czech-focused business, but embarrassing for international credibility

---

### Pitfall 10: Contact Form Complexity for B2B

**What goes wrong:** B2B industrial product sites either have no contact mechanism beyond an email address, or they build complex "request a quote" forms with 15 fields. Both extremes fail. A bare email address (as on the current site: info@unionbc.cz + phone number) works for warm leads but loses data. An over-complex form discourages initial inquiries.

**Prevention:**
- Simple contact form: name, company, email, phone (optional), message, checkbox for "I'm interested in: [TC101 information / price quote / technical consultation / calculator for my project]"
- Show phone number and email prominently on every page (not hidden behind a "contact" link)
- For a static site: use a form backend service (Formspree, Netlify Forms, or similar) rather than building server-side processing
- Response time commitment: display "We respond within 24 hours" and mean it

**Phase mapping:** Phase 1 (core site). Contact is a must-have from day one.

**Severity:** MINOR -- but a common oversight

---

### Pitfall 11: Ignoring the Old Site's Accumulated Knowledge

**What goes wrong:** The impulse to "start fresh" can mean discarding the ~20 FAQ questions, multiple test result documents, and detailed application examples on the old site. This content represents years of customer questions and use cases. Throwing it away and writing "3 FAQ questions" for the new site loses institutional knowledge.

**Prevention:**
- Extract and catalog ALL content from the old site before starting the redesign (text, PDFs, images)
- Treat old FAQ questions as a customer research document -- these are real questions real customers asked
- Rewrite all of them in proper Czech (and English), but do not reduce the quantity
- Check if old application examples (cement plants, breweries, refineries) are relevant to Czech market and keep the relevant ones

**Phase mapping:** Pre-project content audit. Do this before writing a single line of new content.

**Severity:** MINOR -- more of an opportunity cost than a failure mode

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Content audit | Skipping PDF/document inventory | Create full asset inventory spreadsheet before any new work |
| Content writing | Copying/polishing old text instead of rewriting | Set a hard rule: zero sentences carried over verbatim |
| Content writing | Inconsistent technical data across pages | Create shared specification data file first |
| Content writing | Czech text still reads as translated Russian | Have a native Czech speaker (ideally in the industry) review |
| Architecture | Bilingual URL structure decided too late | Decide `/cs/` and `/en/` prefix strategy in Phase 1 scaffolding |
| Architecture | No hreflang or language meta tags | Include in base template from day one |
| Design | Using English placeholder text in mockups | Design with real Czech content (it is longer than English) |
| Design | Template-looking industrial design | Reference real Czech B2B industrial sites, not Dribbble |
| Calculator | Shipping wrong or oversimplified formulas | Defer calculator to Phase 2; verify formulas against certification data |
| Calculator | Czech energy prices hardcoded and outdated | Make energy prices configurable, document data source |
| SEO | No 301 redirect map from old URLs | Create redirect map during content phase when new URLs are known |
| SEO | Missing meta descriptions in Czech | Write unique meta descriptions for every page, both languages |
| Launch | PDFs with Russian filenames or broken links | Audit and rename all documents pre-launch |
| Launch | Google Analytics not migrated (still using legacy ga.js) | Set up GA4 property, add measurement ID in Phase 1 |
| Post-launch | English content falls behind Czech updates | Establish a content update checklist that includes both languages |

---

## Sources

- Direct analysis of existing site files at `C:\Users\Evgenij Bogdanovič\Documents\web\www\tcold\`
- PROJECT.md requirements and constraints
- Domain expertise: B2B industrial marketing, bilingual website architecture, Czech market specifics
- Existing content comparison: Czech product page, English product page, FAQ, "Jak to funguje" page, "O tekute izolaci" page -- all showing translation-origin issues and data inconsistencies
- Confidence level: HIGH for pitfalls derived from direct site analysis; MEDIUM for market/competitor assertions (based on domain knowledge, not live competitor analysis)
