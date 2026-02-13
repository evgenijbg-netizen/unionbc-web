# Phase 2: Content & Conversion - Research

**Researched:** 2026-02-13
**Domain:** Astro 5 content pages, bilingual content architecture, UI components (accordion, data tables, sticky CTA), PDF downloads, image optimization
**Confidence:** HIGH

## Summary

Phase 2 transforms the Phase 1 site shell into a content-rich bilingual product website. The existing foundation (Astro 5.17.x, Tailwind CSS 4, i18n routing with flat JSON keys, BaseLayout with header/footer/hreflang) is solid and constrains the patterns we use. The main challenge is not technical -- it is content volume: we must create from-scratch bilingual text for ~8 distinct content sections (homepage hero, product specs, how-it-works, advantages, comparison, FAQ, certificates/documents, application examples, test results, application guide, contact page) while ensuring every string flows through the existing `t(locale, key)` i18n system.

The old site's content (analyzed from `www/tcold/`) provides the factual substrate: technical parameters (density 410 kg/m3, thermal conductivity 0.001 W/m.C, temp range -60 to +260C), ~22 FAQ questions, 5 test result PDFs, certificate images (Certifikat vyrobku, STO, Bezpecnostni list), ~12 downloadable PDF documents, and application examples across industries. However, the old Czech text is clearly translated from Russian with awkward phrasing and must be completely rewritten. The English version follows the same pattern.

The technical approach is straightforward: add new `.astro` page files under `src/pages/cs/` and `src/pages/en/`, expand the translation JSON files with all new content keys, add route entries to `routes.ts`, use native HTML `<details>/<summary>` for FAQ accordion (zero JS), Astro's built-in `<Image>` component for optimized images, and `public/documents/` for downloadable PDFs. A persistent sticky CTA is pure CSS (`fixed bottom-0`). No new dependencies are needed beyond what Phase 1 installed.

**Primary recommendation:** Keep it simple -- all content in flat JSON translation files, all pages as static `.astro` files, zero new npm dependencies. The complexity is in content quality, not architecture.

## Standard Stack

### Core (Already Installed in Phase 1)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Astro | ^5.17.x | Static site generator, page routing | Installed |
| Tailwind CSS | ^4.x | Styling via utility classes and @theme tokens | Installed |
| @tailwindcss/vite | ^4.x | Tailwind Vite integration | Installed |
| TypeScript | ^5.x | Type safety | Installed |
| Preact | ^10.x | Interactive islands (NOT needed in Phase 2) | Installed |

### Supporting (Already Installed)

| Library | Version | Purpose | Phase 2 Usage |
|---------|---------|---------|---------------|
| @fontsource-variable/inter | latest | Body font | Already working |
| @fontsource-variable/space-grotesk | latest | Heading font | Already working |
| @astrojs/sitemap | ^3.x | Sitemap generation | Auto-discovers new pages |
| @biomejs/biome | ^2.3.x | Linting + formatting | Already configured |

### New Dependencies Needed

**None.** Phase 2 requires no new npm packages. All needed capabilities exist in Astro core:
- `<Image />` and `<Picture />` from `astro:assets` (built-in)
- `<details>/<summary>` HTML elements (browser-native)
- `position: fixed` CSS (built-in)
- PDF downloads via `<a href>` pointing to `public/documents/` (basic HTML)

## Architecture Patterns

### New Pages and Routes

Phase 2 adds these pages to the existing structure:

```
src/pages/
  cs/
    index.astro          # EXISTING -- enhance with full homepage content
    produkt.astro        # NEW -- product page (specs, how-it-works, advantages, comparison)
    faq.astro            # NEW -- categorized FAQ with accordion
    certifikaty.astro    # EXISTING route -- enhance with documents, test results, app examples, guide
    kontakt.astro        # NEW -- dedicated contact page
  en/
    index.astro          # EXISTING -- enhance (mirror of cs/)
    product.astro        # NEW
    faq.astro            # NEW
    certificates.astro   # NEW
    contact.astro        # NEW
```

**Route map additions** in `src/i18n/routes.ts`:
```typescript
// Already exists:  home, product, faq, certificates, contact
// These are already defined in routeMap -- no new route entries needed!
// Just create the corresponding .astro files.
```

The route map from Phase 1 already defines all five routes (home, product, faq, certificates, contact). Phase 2 only needs to create the actual page files.

### Content Architecture: Flat JSON Translation Keys

**Decision (Phase 1):** Flat dot-separated keys, not nested objects.

The existing pattern is:
```json
{
  "section.subsection.item": "Translation text"
}
```

For Phase 2, the translation files will grow significantly. Recommended key naming convention:

```json
{
  "product.meta.title": "TEMP-COAT TC101 - Tekuta keramicka tepelna izolace",
  "product.meta.description": "...",
  "product.hero.title": "TEMP-COAT TC101",
  "product.hero.subtitle": "...",
  "product.specs.title": "Technicke parametry",
  "product.specs.density.label": "Hustota",
  "product.specs.density.value": "410 kg/m3",
  "product.specs.conductivity.label": "Tepelna vodivost",
  "product.specs.conductivity.value": "0.001 W/m.C",
  "product.howItWorks.title": "Jak to funguje",
  "product.howItWorks.paragraph1": "...",
  "product.advantages.title": "Vyhody",
  "product.advantages.item1": "...",
  "faq.category.application": "Aplikace",
  "faq.q1.question": "Kde je tento nater pouzivan?",
  "faq.q1.answer": "...",
  "faq.q1.category": "application"
}
```

**Key insight:** Technical specification values (numbers, units) are the SAME in both languages. Only labels and descriptions differ. Use the same value keys in both `cs.json` and `en.json`.

### Pattern 1: Content-Heavy Page with Section Components

**What:** Break large pages (product, FAQ) into section components to keep page files manageable.
**When to use:** When a page has 4+ distinct content sections.

```
src/components/
  product/
    HeroSection.astro         # Hero with value prop + CTA
    SpecsTable.astro           # Technical specifications data table
    HowItWorks.astro           # How ceramic microspheres work
    AdvantagesList.astro        # Structured advantages list
    ComparisonTable.astro       # Side-by-side comparison
  faq/
    FaqAccordion.astro          # Categorized accordion
  shared/
    StickyCtaBar.astro          # Persistent consultation CTA
    SectionHeading.astro        # Consistent section headings
    DocumentCard.astro          # Downloadable document card
```

**Example page composition:**
```astro
---
// src/pages/cs/produkt.astro
import BaseLayout from "../../layouts/BaseLayout.astro";
import HeroSection from "../../components/product/HeroSection.astro";
import SpecsTable from "../../components/product/SpecsTable.astro";
import HowItWorks from "../../components/product/HowItWorks.astro";
import AdvantagesList from "../../components/product/AdvantagesList.astro";
import ComparisonTable from "../../components/product/ComparisonTable.astro";
import StickyCtaBar from "../../components/shared/StickyCtaBar.astro";
import { getLocaleFromUrl, t } from "../../i18n/utils";

const locale = getLocaleFromUrl(Astro.url);
---
<BaseLayout
  title={t(locale, "product.meta.title")}
  description={t(locale, "product.meta.description")}
  pageKey="product"
>
  <HeroSection locale={locale} />
  <SpecsTable locale={locale} />
  <HowItWorks locale={locale} />
  <AdvantagesList locale={locale} />
  <ComparisonTable locale={locale} />
  <StickyCtaBar locale={locale} />
</BaseLayout>
```

### Pattern 2: FAQ Accordion with Native HTML `<details>/<summary>`

**What:** Use `<details>` with `name` attribute for exclusive accordion behavior. Zero JavaScript, fully accessible, supported in all modern browsers (Chrome 120+, Safari 17.2+, Firefox 130+).
**When to use:** FAQ page with categorized questions.

```astro
---
// src/components/faq/FaqAccordion.astro
import { type Locale, t } from "../../i18n/utils";

interface Props {
  locale: Locale;
}

const { locale } = Astro.props;

// Define FAQ structure -- categories and question IDs
const categories = [
  { id: "application", questions: ["q1", "q2", "q3", "q4", "q5"] },
  { id: "maintenance", questions: ["q6", "q7", "q8"] },
  { id: "compatibility", questions: ["q9", "q10", "q11"] },
  { id: "safety", questions: ["q12", "q13", "q14"] },
];
---
{categories.map((cat) => (
  <section class="mb-12">
    <h2 class="text-2xl font-heading font-bold text-text-primary mb-6">
      {t(locale, `faq.category.${cat.id}`)}
    </h2>
    {cat.questions.map((qId) => (
      <details
        name={`faq-${cat.id}`}
        class="border-b border-surface-700 group"
      >
        <summary class="py-4 px-2 cursor-pointer text-text-primary hover:text-accent-400 transition-colors font-medium flex justify-between items-center">
          <span>{t(locale, `faq.${qId}.question`)}</span>
          <svg class="w-5 h-5 text-text-secondary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div class="pb-4 px-2 text-text-secondary leading-relaxed">
          {t(locale, `faq.${qId}.answer`)}
        </div>
      </details>
    ))}
  </section>
))}
```

### Pattern 3: Technical Specifications Data Table

**What:** Structured data table for product specs. Pure HTML `<table>` with Tailwind styling, using semantic `<th>` and `<td>`.
**When to use:** Displaying technical parameters (PROD-02).

```astro
---
import { type Locale, t } from "../../i18n/utils";

interface Props { locale: Locale; }
const { locale } = Astro.props;

const specs = [
  { key: "density", unit: "kg/m3" },
  { key: "conductivity", unit: "W/m.C" },
  { key: "heatCapacity", unit: "kJ/kg.C" },
  { key: "tempRange", unit: "C" },
  { key: "emissivity", unit: "" },
  { key: "weight", unit: "kg/L" },
  { key: "vaporPermeability", unit: "mg/m.h.Pa" },
];
---
<table class="w-full border-collapse">
  <thead>
    <tr class="border-b-2 border-accent-500">
      <th class="text-left py-3 px-4 text-text-secondary font-medium">
        {t(locale, "product.specs.parameterLabel")}
      </th>
      <th class="text-right py-3 px-4 text-text-secondary font-medium">
        {t(locale, "product.specs.valueLabel")}
      </th>
    </tr>
  </thead>
  <tbody>
    {specs.map((spec) => (
      <tr class="border-b border-surface-700 hover:bg-surface-800/50">
        <td class="py-3 px-4 text-text-primary">
          {t(locale, `product.specs.${spec.key}.label`)}
        </td>
        <td class="py-3 px-4 text-right text-accent-400 font-heading font-semibold">
          {t(locale, `product.specs.${spec.key}.value`)}
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

### Pattern 4: Sticky CTA Bar

**What:** A persistent "Request consultation" CTA that stays visible as users scroll. Uses CSS `fixed` positioning.
**When to use:** All pages (CONV-03 requirement).

```astro
---
// src/components/shared/StickyCtaBar.astro
import { getLocalizedPath } from "../../i18n/routes";
import { type Locale, t } from "../../i18n/utils";

interface Props { locale: Locale; }
const { locale } = Astro.props;
---
<div class="fixed bottom-0 left-0 right-0 z-40 bg-surface-800/95 backdrop-blur-sm border-t border-surface-700 py-3 px-6 md:hidden">
  <a
    href={getLocalizedPath("contact", locale)}
    class="block w-full text-center bg-accent-500 hover:bg-accent-400 text-surface-900 font-heading font-semibold py-3 rounded-sm transition"
  >
    {t(locale, "cta.consultation")}
  </a>
</div>
```

**Note:** Show on mobile only (`md:hidden`) since desktop has the CTA visible in the header/hero. On desktop, use a smaller floating CTA or keep the header sticky with the CTA. This prevents the sticky bar from covering content on large screens where it is less necessary.

### Pattern 5: Downloadable Documents

**What:** PDFs served from `public/documents/` with descriptive cards. No processing needed.
**When to use:** Certificates (CONT-02), test results (CONT-04).

```
public/
  documents/
    certifikat-vyrobku.pdf
    stavebni-technicke-osvedceni.pdf
    bezpecnostni-list.pdf
    manual-aplikace.pdf
    test01.pdf
    test02.pdf
    test03.pdf
    test04.pdf
    test05.pdf
```

**Document card pattern:**
```astro
<a
  href="/documents/certifikat-vyrobku.pdf"
  target="_blank"
  rel="noopener"
  class="block bg-surface-800 border border-surface-700 rounded p-6 hover:border-accent-500 transition group"
>
  <div class="flex items-center gap-4">
    <svg class="w-10 h-10 text-accent-500 shrink-0" ...><!-- PDF icon --></svg>
    <div>
      <p class="font-heading font-semibold text-text-primary group-hover:text-accent-400 transition">
        {t(locale, "certificates.doc1.title")}
      </p>
      <p class="text-sm text-text-secondary">PDF, 245 KB</p>
    </div>
  </div>
</a>
```

### Pattern 6: Side-by-Side Comparison Table

**What:** Comparison of TC101 vs conventional insulation (PROD-05). A two-column table with highlighted differences.

```astro
---
const comparisons = [
  "thickness", "weight", "installTime", "cuiRisk", "maintenance",
  "scaffolding", "fireRating", "flexCurved"
];
---
<div class="overflow-x-auto">
  <table class="w-full min-w-[600px]">
    <thead>
      <tr class="border-b-2 border-accent-500">
        <th class="text-left py-3 px-4">{t(locale, "comparison.parameter")}</th>
        <th class="text-center py-3 px-4 text-accent-400">{t(locale, "comparison.tc101")}</th>
        <th class="text-center py-3 px-4 text-text-secondary">{t(locale, "comparison.conventional")}</th>
      </tr>
    </thead>
    <tbody>
      {comparisons.map((key) => (
        <tr class="border-b border-surface-700">
          <td class="py-3 px-4">{t(locale, `comparison.${key}.label`)}</td>
          <td class="py-3 px-4 text-center text-accent-400 font-semibold">
            {t(locale, `comparison.${key}.tc101`)}
          </td>
          <td class="py-3 px-4 text-center text-text-secondary">
            {t(locale, `comparison.${key}.conventional`)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### Pattern 7: Image Handling for Application Examples and Test Results

**What:** Use Astro's built-in `<Image />` component for optimized images. Store images in `src/assets/` for build-time optimization.

```astro
---
import { Image } from "astro:assets";
import thermalImg from "../../assets/images/thermal-test-01.jpg";
---
<Image
  src={thermalImg}
  alt={t(locale, "tests.test1.imageAlt")}
  width={800}
  class="rounded"
/>
```

For thermal imaging photos and application example photos, use `<Picture />` for multi-format support:

```astro
---
import { Picture } from "astro:assets";
import appExample from "../../assets/images/application-cement-plant.jpg";
---
<Picture
  src={appExample}
  formats={["avif", "webp"]}
  alt={t(locale, "applications.cement.imageAlt")}
  width={600}
  class="rounded"
/>
```

### Recommended Component Structure

```
src/
  components/
    product/
      HeroSection.astro
      SpecsTable.astro
      HowItWorks.astro
      AdvantagesList.astro
      ComparisonTable.astro
    faq/
      FaqAccordion.astro
    resources/
      DocumentCard.astro
      TestResultCard.astro
      ApplicationCard.astro
      ApplicationGuide.astro
    shared/
      StickyCtaBar.astro
      SectionHeading.astro
      PageHero.astro
    Header.astro          # EXISTING
    Footer.astro          # EXISTING
    LanguageSwitcher.astro # EXISTING
  pages/
    cs/
      index.astro         # EXISTING -- expand
      produkt.astro       # NEW
      faq.astro           # NEW
      certifikaty.astro   # NEW
      kontakt.astro       # NEW
    en/
      index.astro         # EXISTING -- expand
      product.astro       # NEW
      faq.astro           # NEW
      certificates.astro  # NEW
      contact.astro       # NEW
  i18n/
    cs.json               # EXISTING -- expand significantly
    en.json               # EXISTING -- expand significantly
    routes.ts             # EXISTING -- already has all routes
    utils.ts              # EXISTING -- no changes needed
  assets/
    images/               # NEW -- product/application/thermal photos
  layouts/
    BaseLayout.astro      # EXISTING -- minor change: add StickyCtaBar
```

### Anti-Patterns to Avoid

- **Putting long content directly in .astro page files:** Keep page files as composition shells. Long text goes in JSON translation keys. Section layout goes in section components. Page files wire them together.
- **Using content collections for this use case:** Content collections (with `defineCollection` + `file()` loader) are designed for many similar entries (blog posts, product catalog). For this site with ~5 unique pages, each with different structure, direct Astro components + JSON translations are simpler and more maintainable.
- **Creating separate TypeScript data files for specs/FAQ:** Since all text must be bilingual anyway, put everything in the translation JSONs. No need for a separate data layer -- the i18n system IS the data layer.
- **Using a JS framework for the FAQ accordion:** Native `<details>/<summary>` with the `name` attribute provides exclusive accordion behavior with zero JS. No Preact island needed.
- **Hardcoding content in .astro files instead of translation keys:** Even for "obvious" content like phone numbers or addresses, use `t(locale, key)`. This ensures the content quality review in Plan 02-03 can audit all content from a single source.
- **Using markdown/MDX for page content:** These pages have custom layouts per section, not uniform prose. Astro components with translation keys give more control than markdown.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FAQ accordion | Custom JS toggle logic | `<details>/<summary>` with `name` attr | Zero JS, accessible, browser-native. Supported Chrome 120+, Safari 17.2+, Firefox 130+. |
| Image optimization | Sharp pipeline or manual WebP | Astro `<Image />` / `<Picture />` | Auto WebP/AVIF, prevents CLS, lazy loading built-in |
| PDF download links | Custom download handler | `<a href="/documents/file.pdf" target="_blank">` | Basic HTML. No JS needed for file downloads. |
| Sticky CTA positioning | IntersectionObserver scroll logic | CSS `fixed bottom-0` | Pure CSS, no JS, works everywhere |
| Responsive tables | Custom JS table component | CSS `overflow-x-auto` + native `<table>` | Semantic HTML, horizontally scrollable on mobile |
| Comparison highlighting | JS-based cell coloring | Tailwind utility classes on `<td>` | Static styling decided at build time |

**Key insight:** Phase 2 is almost entirely a content + layout phase. The only "interactive" element (FAQ accordion) is handled by native HTML. No JavaScript islands needed until Phase 3 (calculator).

## Common Pitfalls

### Pitfall 1: Russian-Translated Phrasing Leaking into New Content
**What goes wrong:** Content writers (or AI) unconsciously mirror the old site's sentence structure, producing Czech/English text that sounds translated rather than native. Phrases like "Tento nater je vynikajici predevsim diky zpusobu aplikaci" (from the old FAQ) are grammatically correct but read as translated Russian.
**Why it happens:** Using the old site as a direct source for what to write, then lightly editing rather than rewriting from scratch.
**How to avoid:** The old site content is a REFERENCE for FACTS ONLY (technical values, product capabilities, certifications). All text must be written from scratch. Review: "Would a Czech engineer write it this way?" If it sounds like a translation, rewrite.
**Warning signs:** Long compound sentences, unusual word order, passive voice where active is more natural in Czech.

### Pitfall 2: Translation JSON Growing Unmanageably
**What goes wrong:** The flat JSON file becomes hundreds of keys with no organization, making it hard to find, update, or verify content completeness.
**Why it happens:** Adding keys ad-hoc without a naming convention.
**How to avoid:** Use strict prefix convention: `{page}.{section}.{element}`. Keep keys alphabetically sorted within prefixes. The naming convention documented in Architecture Patterns above prevents chaos.
**Warning signs:** Keys like `text1`, `paragraph`, `description2`. Keys that do not clearly indicate which page/section they belong to.

### Pitfall 3: CZ/EN Content Parity Drift
**What goes wrong:** Czech content is complete but English is missing keys, has placeholder text, or uses shorter versions. Or vice versa. Discovered only during final review.
**Why it happens:** Implementing one language first, then "translating" later. Easy to miss keys.
**How to avoid:** Always add both `cs.json` and `en.json` entries at the same time. After each plan, verify both files have exactly the same set of keys. A simple script `Object.keys(cs).sort().join('\n') === Object.keys(en).sort().join('\n')` catches drift immediately.
**Warning signs:** `t()` function returns the raw key (its fallback behavior) on any page.

### Pitfall 4: Route/Page File Mismatch
**What goes wrong:** Page file is `src/pages/cs/produkt.astro` but route map says `product: "produkty"`. Language switcher links to 404.
**Why it happens:** Route map was defined in Phase 1 but page files created in Phase 2 use a different slug.
**How to avoid:** The route map already defines: cs=`produkt`, en=`product`, cs=`certifikaty`, en=`certificates`, cs=`kontakt`, en=`contact`, cs=`faq`, en=`faq`. Page file names MUST match these slugs exactly.
**Warning signs:** Language switcher produces 404 errors. hreflang tags point to non-existent URLs.

### Pitfall 5: Sticky CTA Overlapping Footer or Content on Mobile
**What goes wrong:** The fixed-position CTA bar covers the last paragraph of content or overlaps with the footer, creating a dead zone where text is visible but not scrollable past the CTA.
**Why it happens:** Fixed elements are taken out of document flow. Content does not know about them.
**How to avoid:** Add `pb-20` (padding-bottom) to `<main>` when the sticky CTA is visible, ensuring content can scroll past it. Alternatively, use `sticky` instead of `fixed` within a specific container.
**Warning signs:** Last line of content is hidden behind the CTA bar on mobile. Footer buttons unreachable.

### Pitfall 6: PDF Documents Not in public/ Directory
**What goes wrong:** PDFs placed in `src/assets/` get processed by Astro's build pipeline, producing hashed filenames that break bookmarks and direct links. Or PDFs in a non-existent path return 404.
**Why it happens:** Developers put all assets in `src/assets/` by habit.
**How to avoid:** PDFs go in `public/documents/`. They are served as-is with stable URLs. Images for optimization go in `src/assets/images/`. Clear separation.
**Warning signs:** PDF download links include hash strings like `manual-abc123.pdf`.

### Pitfall 7: Technical Specifications Without Measurement Context
**What goes wrong:** Displaying "Thermal conductivity: 0.001 W/m.C" without explaining what this means relative to conventional insulation. Numbers without context are meaningless to non-experts.
**Why it happens:** Copying raw data from the old site without adding interpretive text.
**How to avoid:** Each specification should have: the value, a comparison ("50x lower than mineral wool"), and a practical implication ("1mm of TC101 replaces 50mm of conventional insulation for radiant heat"). This is the QUAL-02 requirement: frame claims around certifications with measurement context.
**Warning signs:** A page full of numbers that a non-engineer cannot interpret.

### Pitfall 8: Duplicate Page Structures for CZ/EN
**What goes wrong:** Creating `cs/produkt.astro` and `en/product.astro` with duplicated layout logic. When the layout changes, both files must be updated.
**Why it happens:** The different filenames (localized slugs) make developers think they need different content.
**How to avoid:** Both language versions of a page should use the same section components. The ONLY difference between `cs/produkt.astro` and `en/product.astro` is the import path and `getLocaleFromUrl()` result. The `locale` prop drives all content differences via `t()`.
**Warning signs:** A change to the product page layout requires editing two files.

## Code Examples

### Adding New Pages (Complete Pattern)

```astro
---
// src/pages/cs/produkt.astro
// Czech product page -- identical structure to en/product.astro
import BaseLayout from "../../layouts/BaseLayout.astro";
import { getLocaleFromUrl, t } from "../../i18n/utils";

const locale = getLocaleFromUrl(Astro.url);
---
<BaseLayout
  title={t(locale, "product.meta.title")}
  description={t(locale, "product.meta.description")}
  pageKey="product"
>
  <!-- Page content uses t(locale, ...) for all text -->
</BaseLayout>
```

```astro
---
// src/pages/en/product.astro
// English product page -- IDENTICAL structure, only locale differs
import BaseLayout from "../../layouts/BaseLayout.astro";
import { getLocaleFromUrl, t } from "../../i18n/utils";

const locale = getLocaleFromUrl(Astro.url);
---
<BaseLayout
  title={t(locale, "product.meta.title")}
  description={t(locale, "product.meta.description")}
  pageKey="product"
>
  <!-- Identical markup to cs/produkt.astro -->
</BaseLayout>
```

### Translation Key Structure (Expanded)

```json
// cs.json additions (illustrative subset)
{
  "product.meta.title": "TEMP-COAT TC101 - Tekuta keramicka tepelna izolace | Union B+C",
  "product.meta.description": "Prumyslova tekuta tepelna izolace. Technicky parametry, princip fungovani, vyhody oproti konvencni izolaci.",
  "product.hero.title": "TEMP-COAT TC101",
  "product.hero.subtitle": "Tekuta keramicka tepelna izolace",
  "product.hero.description": "...",
  "product.specs.title": "Technicke parametry",
  "product.specs.density.label": "Hustota (suchy stav)",
  "product.specs.density.value": "410 kg/m3",
  "product.specs.density.context": "Lehci nez voda -- nezatezuje izolovanou konstrukci",
  "product.howItWorks.title": "Jak TC101 funguje",
  "product.howItWorks.intro": "...",
  "product.advantages.title": "Vyhody TC101",
  "product.advantages.timeSaving.title": "Uspora casu",
  "product.advantages.timeSaving.description": "...",
  "product.comparison.title": "Srovnani s konvencni izolaci",
  "product.comparison.thickness.label": "Tloustka izolacni vrstvy",
  "product.comparison.thickness.tc101": "1-3 mm",
  "product.comparison.thickness.conventional": "50-150 mm",
  "faq.meta.title": "FAQ - Caste otazky | TEMP-COAT TC101",
  "faq.category.application": "Aplikace a pouziti",
  "faq.category.maintenance": "Udrzba a cisteni",
  "faq.category.compatibility": "Kompatibilita materialu",
  "faq.category.safety": "Bezpecnost a certifikace",
  "faq.q1.question": "Na jake povrchy lze TC101 aplikovat?",
  "faq.q1.answer": "...",
  "certificates.meta.title": "Certifikaty a dokumenty | TEMP-COAT TC101",
  "contact.meta.title": "Kontakt | Union B+C s.r.o.",
  "contact.name": "Halina Bogdanovich",
  "contact.role": "Jednatelka / Distributor TEMP-COAT pro CR"
}
```

### i18n Key Parity Check Script

```bash
# Add to package.json "scripts" or run manually
node -e "
const cs = Object.keys(require('./src/i18n/cs.json')).sort();
const en = Object.keys(require('./src/i18n/en.json')).sort();
const missing_en = cs.filter(k => !en.includes(k));
const missing_cs = en.filter(k => !cs.includes(k));
if (missing_en.length) console.log('Missing in en.json:', missing_en);
if (missing_cs.length) console.log('Missing in cs.json:', missing_cs);
if (!missing_en.length && !missing_cs.length) console.log('All keys match!');
"
```

### StickyCtaBar with Padding Compensation

```astro
---
// In BaseLayout.astro, add StickyCtaBar import and padding
import StickyCtaBar from "../components/shared/StickyCtaBar.astro";
---
<body class="bg-surface-900 text-text-primary font-body min-h-screen flex flex-col">
  <Header locale={locale} pageKey={pageKey} />
  <main class="flex-1 pb-16 md:pb-0">
    <!-- pb-16 on mobile accounts for sticky CTA height -->
    <slot />
  </main>
  <Footer locale={locale} />
  <StickyCtaBar locale={locale} />
</body>
```

## Content Inventory (from Old Site Analysis)

### Technical Specifications (Source: old site tepelna-izolace---tc-101.html)
| Parameter | Czech Label | Value | Unit |
|-----------|-------------|-------|------|
| Density (dry) | Hustota Y0 | 410 | kg/m3 |
| Heat capacity | Merna tepelna kapacita C0 | 1.10 | kJ/kg.C |
| Thermal conductivity | Soucinitel tepelne vodivosti | 0.001 | W/m.C |
| Water content (operational) | Obsah vody | ~5 | % |
| Heat absorption (24h) | Absorpce tepla | 2 | W/m2.C |
| Vapor permeability | Propustnost vodni pary | 0.02 | mg/m.h.Pa |
| Heat absorption coeff | Koeficient absorpce tepla | 1.6-3.0 | W/m2.C |
| Heat transfer coeff | Soucinitel prestupu tepla | 2.0-5.0 | W/m2.C |
| Temperature range | Teplotni rozsah | -60 to +260 | C |
| Weight | Hmotnost | 0.65 | kg/L |
| Application consumption | Spotreba | ~0.34 kg/m2 at 0.5mm | |
| Elongation | Prodlouzeni | up to 80 | % |

### FAQ Questions (Source: old site faq.html) -- ~22 Questions
Categorized by topic:
1. **Application** (8): Where used, how much to apply, how applied, layer thickness, primer needed, primer on steel, application equipment, how to avoid overspray
2. **Technical** (4): Temperature range, expansion/contraction, weight after application, drying time
3. **Maintenance** (3): Can it get dirty, cleaning, curing time
4. **Compatibility** (4): Corrosion protection, adhesion on aluminum/stainless, top coats, damaging materials
5. **Safety** (3): Personal protection, flammability, shelf life

### Documents for Download (Source: old site files/ directory)
**Certificates:**
- Certifikat vyrobku (product certificate) -- image, needs PDF version
- Stavebni Technicke Osvedceni (STO) -- image, needs PDF version
- Bezpecnostni list (safety data sheet) -- existing PDF

**Technical documents:**
- manual.pdf -- Application guide
- plase-of-use--cz.pdf -- Application examples
- industrial.pdf -- Industrial applications
- expert-audit.pdf -- Expert assessment

**Test results:**
- test01.pdf through test05.pdf -- 5 test result PDFs
- mereni-teplot1.pdf, mereniteplot2.pdf -- Temperature measurements
- testy-domku--cz.pdf -- Thermal conductivity calculations
- metod-cz.pdf -- Calculation methodology
- PROTOKOL-cz.pdf -- Pipe insulation protocol

### Application Examples (Source: old site)
Industries mentioned: Cementarna (cement plant), Zasobni nadrz (storage tank), Vyroba pneu (tire manufacturing), Potravinarsky prumysl (food industry), Rafinerie (refinery), Potrubi (pipes), Cukrovar (sugar factory), Papirny (paper mills), Pivovar (brewery), Izolace domu (house insulation), Izolace lednicek (fridge insulation), Izolace privesu pro prevoz koni (horse trailer insulation)

These can be grouped into 3 categories per requirement CONT-03:
1. **Industry:** Cement, refinery, sugar, brewery, food, tire, paper
2. **Construction:** Houses, facades, roofs
3. **Marine/Transport:** Horse trailers, marine applications

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom JS accordion | `<details name>` exclusive accordion | Chrome 120 (Dec 2023), Firefox 130 (Aug 2024) | Zero JS needed for FAQ. All modern browsers support it. |
| `@astrojs/image` package | Built-in `astro:assets` `<Image />` | Astro 3.0 (Aug 2023) | No separate package needed. Import from `astro:assets`. |
| Multiple image format tags | `<Picture />` component | Astro 3.0+ | Single component generates `<source>` for AVIF, WebP with fallback. |
| JS IntersectionObserver sticky | CSS `position: fixed` | Always available | No JS needed for sticky CTA. |

## Open Questions

1. **Placeholder images vs real product photos**
   - What we know: The old site has images in `www/tcold/images/` but they are low-quality, small, and from 2013. Thermal imaging photos may exist in the test PDFs.
   - What's unclear: Whether the client has high-resolution product/application/thermal photos available.
   - Recommendation: Use placeholder images during development with correct aspect ratios. Mark all image slots clearly for client to provide final photos. Do not block development on photo availability.

2. **Number of FAQ questions to include**
   - What we know: Old site has ~22 questions. Some overlap, some are very specific. Requirement says "categorized FAQ" but does not specify quantity.
   - What's unclear: Whether all 22 questions are still relevant, or if some should be merged/removed.
   - Recommendation: Curate to ~15-18 high-quality questions across 4 categories. Remove redundant ones (several questions about primers can be merged). Quality over quantity.

3. **Application guide as a page section vs separate page**
   - What we know: CONT-05 requires "web-native application guide (steps, surface prep, drying times, equipment)". This could be a section on the certificates page or a standalone page.
   - What's unclear: How long the guide content will be.
   - Recommendation: Include as a section on the resources/certificates page. If it grows too large during content writing, extract to its own page. Start integrated, split if needed.

4. **How to handle the "new route" pages that do not exist yet**
   - What we know: The route map defines `certificates` as a logical page, but Phase 1 research mapped test results, application examples, and the application guide ALL to the certificates page.
   - What's unclear: Whether these should be separate pages or sections within a single "Resources" page.
   - Recommendation: Use a single rich "Resources" page (at the `certifikaty`/`certificates` URL) with sections for: certificates/documents, test results, application examples, and application guide. This matches the existing route and avoids adding new navigation items. Each section can be deep-linked with `#anchors`.

5. **New pages for the navigation**
   - What we know: The header navigation has 5 items: Home, Product TC101, FAQ, Certificates, Contact. These were defined in Phase 1.
   - What's unclear: Whether the expanded content justifies changing navigation labels or adding sub-items.
   - Recommendation: Keep the 5-item navigation. Rename "Certificates" to "Resources" (or "Certifikaty a dokumenty" / "Resources & Documents") since it now contains much more than just certificates.

## Sources

### Primary (HIGH confidence)
- [Astro Images Guide](https://docs.astro.build/en/guides/images/) -- `<Image />` and `<Picture />` API, src/ vs public/ guidance
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) -- `file()` loader, schema validation (concluded NOT needed for this use case)
- [MDN: HTML Details Exclusive Accordions](https://developer.mozilla.org/en-US/blog/html-details-exclusive-accordions/) -- `name` attribute, browser support (Chrome 120+, Safari 17.2+, Firefox 130+)
- [Tailwind CSS Position](https://tailwindcss.com/docs/position) -- `fixed`, `sticky` utility classes
- Old site filesystem (`www/tcold/`) -- Direct analysis of all HTML files, PDFs, images

### Secondary (MEDIUM confidence)
- [web.dev: Details and Summary](https://web.dev/learn/html/details) -- Accessibility best practices for details/summary
- [Accessible Astro Components](https://github.com/markteekman/accessible-astro-components) -- Reviewed but NOT recommended (native HTML is sufficient)
- [Astro i18n Recipe](https://docs.astro.build/en/recipes/i18n/) -- Confirmed existing i18n approach is standard
- Phase 1 RESEARCH.md -- Verified existing patterns and decisions

### Tertiary (LOW confidence)
- None identified. All findings verified against primary sources.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- No new dependencies. All tools already installed and verified in Phase 1.
- Architecture: HIGH -- Patterns follow existing Phase 1 conventions. Component composition and i18n patterns are standard Astro.
- Content structure: HIGH -- Old site analyzed directly. All technical data, FAQ content, document inventory extracted.
- Pitfalls: HIGH -- Based on direct analysis of old site content quality, Phase 1 conventions, and standard web development practices.

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (stable -- no dependency changes expected, content patterns are evergreen)
