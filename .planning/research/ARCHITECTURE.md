# Architecture Patterns

**Domain:** Bilingual static B2B industrial product website
**Project:** Union B+C — TEMP-COAT TC101 distributor website
**Researched:** 2026-02-12
**Confidence:** MEDIUM (based on training data; web search unavailable for live verification)

## Recommended Architecture

### High-Level Overview

```
                         +------------------+
                         |   Build System   |
                         |  (Astro / SSG)   |
                         +--------+---------+
                                  |
                    +-------------+-------------+
                    |                           |
              +-----v-----+             +------v------+
              |  /cs/...   |             |  /en/...    |
              | Czech pages|             | English pg  |
              +-----+------+             +------+------+
                    |                           |
              +-----v---------------------------v------+
              |        Shared Component Library        |
              |  Layout / Nav / Footer / Calculator    |
              +-----+---------------------------+------+
                    |                           |
              +-----v------+             +------v------+
              | Content     |             | Static      |
              | Collections |             | Assets      |
              | (i18n JSON/ |             | (PDFs, img, |
              |  MDX)       |             |  fonts)     |
              +--------------+             +-------------+
```

The site is a **statically generated**, **folder-based bilingual** website. Every page exists as two physical HTML files (one Czech, one English). There is no runtime server -- the build system produces the final HTML/CSS/JS output that deploys to a CDN or static host.

### URL Structure

```
unionbc.cz/                     -> 302 redirect to /cs/ (default language)
unionbc.cz/cs/                  -> Czech homepage
unionbc.cz/cs/produkt/          -> Czech product page (TC101)
unionbc.cz/cs/kalkulacka/       -> Czech calculator
unionbc.cz/cs/faq/              -> Czech FAQ
unionbc.cz/cs/certifikaty/      -> Czech certificates & downloads
unionbc.cz/cs/kontakt/          -> Czech contact

unionbc.cz/en/                  -> English homepage
unionbc.cz/en/product/          -> English product page (TC101)
unionbc.cz/en/calculator/       -> English calculator
unionbc.cz/en/faq/              -> English FAQ
unionbc.cz/en/certificates/     -> English certificates & downloads
unionbc.cz/en/contact/          -> English contact
```

**Why folder-based i18n (not subdomain or query param):**
- Best SEO practice: each language version has a clean, crawlable URL
- Google treats `/cs/` and `/en/` as separate pages with proper `hreflang` tags
- No server-side logic needed -- static host serves files from folders
- Subdomains (cs.unionbc.cz) require DNS config and split domain authority
- Query params (?lang=en) are worst for SEO and caching

### Component Boundaries

| Component | Responsibility | Communicates With | Technology |
|-----------|---------------|-------------------|------------|
| **Build System** | Generates all static HTML/CSS/JS from source | Content, Components, Assets | Astro SSG |
| **Layout Shell** | Page wrapper: `<html>`, `<head>`, nav, footer | All pages, i18n system | Astro layout component |
| **Navigation** | Site nav with language switcher | Layout, i18n routing | Astro/HTML component |
| **Page Templates** | Per-page structure (Home, Product, FAQ, etc.) | Layout, Content, Components | Astro pages |
| **Content Layer** | All translatable text, structured data | Page Templates, Calculator | JSON/TypeScript i18n files |
| **Calculator** | Interactive savings calculator (client-side) | Content Layer (for labels), own formula logic | Island component (Preact/Svelte/vanilla) |
| **SEO Module** | Meta tags, hreflang, structured data, sitemap | Layout, Content Layer | Astro head, build-time generation |
| **Static Assets** | PDFs, images, fonts, favicons | Pages (links/references) | Public directory, optimized images |
| **Contact Section** | Company info display, optional form | Content Layer | Static HTML or minimal island |

### Component Boundary Rules

1. **Layout Shell owns the `<html>` element.** It receives the current locale as a prop and passes it down. Every page renders inside the layout.
2. **Content Layer is the single source of truth for all text.** No hardcoded strings in components. Every visible string comes from the content layer, keyed by locale.
3. **Calculator is an island.** It is the only component that requires client-side JavaScript. Everything else is static HTML/CSS.
4. **Pages are thin orchestrators.** A page template imports the layout, fetches locale-specific content, and composes components. Pages contain no business logic.
5. **SEO Module runs at build time only.** It generates meta tags, sitemap.xml, robots.txt, and structured data (JSON-LD). No runtime SEO logic.

## Data Flow

### Build-Time Data Flow (main flow)

```
1. Astro reads /src/pages/[lang]/[page].astro
2. Page template determines locale from URL parameter [lang]
3. Page imports content: import { t } from '@/i18n/utils'
4. t('product.title', 'cs') -> returns Czech string from content files
5. Page composes components, passing translated strings as props
6. Astro renders to static HTML at /cs/produkt/index.html
7. Repeat for /en/product/index.html
8. SEO module generates sitemap.xml with all URLs and hreflang mappings
```

### Runtime Data Flow (calculator only)

```
1. User lands on /cs/kalkulacka/ (static HTML loads)
2. Astro hydrates the Calculator island component (client:visible)
3. Calculator reads UI labels from embedded props (already translated at build time)
4. User inputs: surface area (m2), surface type (dropdown), current insulation status
5. Calculator computes: estimated energy savings, cost of TC101, payback period
6. Results render in-component (no API calls, no server, purely client-side math)
```

### i18n Data Flow (critical path)

```
/src/i18n/
  cs.json          <- Czech translations (flat or nested key-value)
  en.json          <- English translations
  utils.ts         <- t() helper, locale detection, language config

Flow:
1. Page URL determines locale:  /cs/* -> 'cs',  /en/* -> 'en'
2. t('key', locale) looks up string in the correct JSON file
3. Build-time: all t() calls resolve to static strings in HTML output
4. hreflang tags link /cs/produkt/ <-> /en/product/ bidirectionally
5. Language switcher link: on /cs/produkt/, link to /en/product/ (mapped explicitly)
```

### Content Structure

```
/src/i18n/
  cs.json
  en.json
  routes.ts          <- Maps route slugs between languages

/src/content/         <- Structured content (optional, for longer prose)
  faq/
    cs.mdx           <- Czech FAQ content (Markdown with components)
    en.mdx           <- English FAQ content

/public/
  documents/
    certifikat-tc101.pdf
    bezpecnostni-list.pdf
    test-results-*.pdf
  images/
    tc101-product.webp
    application-*.webp
    logo.svg
```

## i18n Architecture (detailed)

### Translation File Structure

Use **flat keys with dot-separated namespaces** in JSON. This is simpler to maintain than deeply nested objects and easier to search/replace.

```json
// cs.json
{
  "site.title": "TEMP-COAT TC101 | Union B+C",
  "site.description": "Tekuta keramicka tepelna izolace pro prumysl a stavebnictvi",
  "nav.home": "Domov",
  "nav.product": "Produkt TC101",
  "nav.calculator": "Kalkulacka",
  "nav.faq": "Casto kladene dotazy",
  "nav.certificates": "Certifikaty",
  "nav.contact": "Kontakt",
  "home.hero.title": "Tekuta keramicka tepelna izolace",
  "home.hero.subtitle": "Uspora energie az 40 % bez leseni a odstávek",
  "product.specs.conductivity.label": "Tepelna vodivost",
  "product.specs.conductivity.value": "0.001 W/m.K",
  "calculator.input.area": "Plocha povrchu (m2)",
  "calculator.result.savings": "Odhadovana rocni uspora"
}
```

```json
// en.json
{
  "site.title": "TEMP-COAT TC101 | Union B+C",
  "site.description": "Liquid ceramic thermal insulation for industry and construction",
  "nav.home": "Home",
  "nav.product": "Product TC101",
  "nav.calculator": "Calculator",
  "nav.faq": "FAQ",
  "nav.certificates": "Certificates",
  "nav.contact": "Contact",
  "home.hero.title": "Liquid ceramic thermal insulation",
  "home.hero.subtitle": "Save up to 40% energy with no scaffolding or downtime",
  "product.specs.conductivity.label": "Thermal conductivity",
  "product.specs.conductivity.value": "0.001 W/m.K",
  "calculator.input.area": "Surface area (m2)",
  "calculator.result.savings": "Estimated annual savings"
}
```

### Route Mapping Between Languages

```typescript
// /src/i18n/routes.ts
export const routeMap: Record<string, Record<string, string>> = {
  cs: {
    home: '',
    product: 'produkt',
    calculator: 'kalkulacka',
    faq: 'faq',
    certificates: 'certifikaty',
    contact: 'kontakt',
  },
  en: {
    home: '',
    product: 'product',
    calculator: 'calculator',
    faq: 'faq',
    certificates: 'certificates',
    contact: 'contact',
  },
};

// getLocalizedPath('product', 'en') -> '/en/product/'
// getLocalizedPath('product', 'cs') -> '/cs/produkt/'
export function getLocalizedPath(page: string, locale: string): string {
  return `/${locale}/${routeMap[locale][page]}/`;
}

// getAlternatePath('/cs/produkt/', 'en') -> '/en/product/'
export function getAlternatePath(currentPath: string, targetLocale: string): string {
  // Reverse-lookup current page key, then map to target locale
}
```

### hreflang Implementation

Every page includes in `<head>`:

```html
<!-- On /cs/produkt/ -->
<link rel="alternate" hreflang="cs" href="https://unionbc.cz/cs/produkt/" />
<link rel="alternate" hreflang="en" href="https://unionbc.cz/en/product/" />
<link rel="alternate" hreflang="x-default" href="https://unionbc.cz/cs/produkt/" />
```

The `x-default` points to Czech (primary market). This is generated at build time from the route map.

### Language Detection and Switching

**No automatic redirection based on browser language.** Reasons:
- Static sites cannot reliably detect `Accept-Language` without a server
- Auto-redirect harms SEO (Googlebot may see different content)
- B2B users often use English OS but want Czech content (and vice versa)

**Instead:**
- Root URL (`/`) redirects to `/cs/` via a simple `<meta http-equiv="refresh">` or a tiny client-side redirect
- Language switcher in the header links to the equivalent page in the other language
- Language preference can be stored in `localStorage` for the root redirect only

## Patterns to Follow

### Pattern 1: Astro Island Architecture

**What:** The entire site is static HTML. Only the calculator hydrates as an interactive "island" component. Everything else is zero-JavaScript.

**When:** Always for this project. Only the calculator needs interactivity.

**Why:** Fastest possible page loads. Industrial B2B users often have slower corporate networks. Zero JS on content pages means instant rendering.

**Example:**
```astro
---
// /src/pages/cs/kalkulacka.astro
import Layout from '@/layouts/Layout.astro';
import Calculator from '@/components/Calculator.svelte';
import { useTranslations } from '@/i18n/utils';

const t = useTranslations('cs');
---
<Layout locale="cs" title={t('calculator.title')}>
  <h1>{t('calculator.heading')}</h1>
  <Calculator
    client:visible
    locale="cs"
    labels={{
      area: t('calculator.input.area'),
      surfaceType: t('calculator.input.surfaceType'),
      calculate: t('calculator.button.calculate'),
      savings: t('calculator.result.savings'),
      payback: t('calculator.result.payback'),
    }}
  />
</Layout>
```

### Pattern 2: Content/Presentation Separation

**What:** All translatable content lives in `/src/i18n/*.json` files. Components never contain hardcoded text. Longer-form content (FAQ answers, product descriptions) can use MDX files in `/src/content/`.

**When:** Every component, every page, no exceptions.

**Why:** Adding a third language later requires only adding a new JSON file and content files -- no component changes. Also makes content review by non-developers possible (they edit JSON/MDX, not Astro components).

### Pattern 3: Static-First SEO

**What:** All SEO metadata (title, description, Open Graph, structured data, sitemap) is generated at build time. No client-side SEO logic.

**When:** Every page.

**Example:**
```astro
---
// In Layout.astro
const { locale, title, description, page } = Astro.props;
const canonicalUrl = `https://unionbc.cz${Astro.url.pathname}`;
const alternateLocale = locale === 'cs' ? 'en' : 'cs';
const alternatePath = getAlternatePath(Astro.url.pathname, alternateLocale);
---
<html lang={locale}>
<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <link rel="alternate" hreflang={locale} href={canonicalUrl} />
  <link rel="alternate" hreflang={alternateLocale} href={`https://unionbc.cz${alternatePath}`} />
  <link rel="alternate" hreflang="x-default" href={canonicalUrl.replace(`/${locale}/`, '/cs/')} />
  <!-- Open Graph -->
  <meta property="og:locale" content={locale === 'cs' ? 'cs_CZ' : 'en_US'} />
  <meta property="og:type" content="website" />
  <!-- JSON-LD structured data -->
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
</head>
```

### Pattern 4: Shared Layout with Locale Prop

**What:** A single `Layout.astro` component wraps every page. It receives the locale and adjusts `<html lang>`, navigation labels, footer text, and SEO tags accordingly.

**When:** Every page uses the same layout.

**Why:** Single source of truth for site chrome. Changes to header/footer propagate everywhere. Locale-specific differences are handled through the content layer, not through separate layout files.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Separate Codebases per Language

**What:** Creating `/pages-cs/` and `/pages-en/` with duplicated page templates that only differ in content.

**Why bad:** Content drift -- when you update the Czech product page structure, you must remember to update the English one. Doubles maintenance burden. Bugs get fixed in one language but not the other.

**Instead:** One set of page templates parameterized by locale. Content comes from the i18n layer.

### Anti-Pattern 2: Client-Side Language Switching (SPA-style)

**What:** Loading all translations for both languages and switching in the browser with JavaScript.

**Why bad:** Doubles the payload. Breaks SEO (crawlers see only the default language). Adds unnecessary JavaScript to a content site. Flash of untranslated content on slow connections.

**Instead:** Each language is a separate set of static HTML pages. Language switcher is a regular `<a>` link to the other language's page.

### Anti-Pattern 3: Over-Engineering the Calculator

**What:** Building the calculator as a full React/Vue SPA with state management, API calls, and complex routing.

**Why bad:** The calculator is a single-page form with ~3 inputs and ~3 outputs. A simple formula. No persistence needed. No API needed. A full framework adds bundle size and complexity for no benefit.

**Instead:** Use a lightweight island component (Svelte, Preact, or even vanilla JS with Astro's `<script>` tags). Keep the formula in a pure function. All labels are passed as props at build time.

### Anti-Pattern 4: Hardcoded Czech/English Conditional Logic

**What:** `{locale === 'cs' ? 'Domov' : 'Home'}` scattered throughout components.

**Why bad:** Unmaintainable. Adding a third language requires touching every component. Easy to miss spots. Impossible to hand off content editing to non-developers.

**Instead:** Always use `t('nav.home')` which resolves from the JSON content files.

### Anti-Pattern 5: PDF/Document Duplication per Language

**What:** Storing Czech and English versions of the same certificate as separate unrelated files.

**Instead:** Use a structured asset manifest that maps document IDs to files per language:
```typescript
export const documents = {
  'cert-tc101': { cs: '/documents/certifikat-tc101.pdf', en: '/documents/certificate-tc101.pdf' },
  'safety-sheet': { cs: '/documents/bezpecnostni-list.pdf', en: '/documents/safety-data-sheet.pdf' },
};
```

## Component Dependency Graph and Build Order

```
Phase 1: Foundation (no dependencies)
  ├── Project scaffolding (Astro init, TypeScript config, directory structure)
  ├── i18n system (JSON files, t() utility, route map)
  └── Static assets pipeline (image optimization, PDF hosting)

Phase 2: Layout Shell (depends on: Phase 1)
  ├── Layout.astro (html lang, head, nav, footer)
  ├── Navigation component (with language switcher)
  ├── Footer component
  └── SEO module (meta tags, hreflang, JSON-LD)

Phase 3: Content Pages (depends on: Phase 2)
  ├── Home page
  ├── Product page (TC101)
  ├── FAQ page
  ├── Certificates/Downloads page
  └── Contact page

Phase 4: Interactive Feature (depends on: Phase 2, can parallel Phase 3)
  └── Savings Calculator (island component)

Phase 5: Polish and Optimization (depends on: Phase 3, Phase 4)
  ├── Sitemap generation
  ├── Performance optimization (Core Web Vitals)
  ├── Cross-browser testing
  └── Final SEO audit (hreflang validation, structured data testing)
```

### Build Order Rationale

1. **i18n system must come first** because every subsequent component depends on it. If the translation utility and content structure are not established early, components will be built with hardcoded strings and refactored later (waste).

2. **Layout before pages** because all pages render inside the layout. Building pages without a layout means rebuilding them when the layout is ready.

3. **Calculator can parallel content pages** because it is an independent island. It shares the layout but has no dependency on other page content. Starting it alongside content pages is efficient.

4. **SEO module with layout, not at the end.** hreflang tags and meta generation are part of the layout head. Building them in Phase 2 means every page created in Phase 3 automatically gets correct SEO from day one, rather than retrofitting later.

## Scalability Considerations

| Concern | Current (6 pages x 2 langs) | If 20+ pages added | If 3rd language added |
|---------|------------------------------|--------------------|-----------------------|
| Build time | Trivial (<5s) | Still trivial (<15s) | Add one JSON file + content files, rebuild all |
| Content management | JSON files + MDX, manageable | May want to split JSON by page namespace | Route map grows linearly, manageable |
| Bundle size | Near-zero JS (only calculator) | Same -- static pages add no JS | Same architecture, just more HTML output |
| SEO maintenance | Manual hreflang via route map | Route map grows but remains straightforward | Add third hreflang per page, route map entry |
| Deployment | Single static build -> CDN | Same pipeline | Same pipeline |

**Note:** This project is explicitly small-scope (6 pages, 2 languages, no CMS, no blog). The architecture is intentionally simple. Do not over-engineer for hypothetical scale. If scope grows significantly, consider a headless CMS for content management -- but that is out of scope now.

## Hosting and Deployment Architecture

```
Source (Git repo)
    |
    v
Build (Astro build -> /dist/)
    |
    v
Deploy (static files to hosting)
    |
    v
CDN / Static Host
    |
    +-- unionbc.cz/ (root redirect to /cs/)
    +-- unionbc.cz/cs/* (Czech pages)
    +-- unionbc.cz/en/* (English pages)
    +-- unionbc.cz/documents/* (PDFs)
    +-- unionbc.cz/images/* (optimized images)
    +-- unionbc.cz/sitemap.xml
    +-- unionbc.cz/robots.txt
```

**Hosting options (ordered by recommendation):**
1. **Cloudflare Pages** -- free for static sites, global CDN, custom domain, automatic HTTPS, fast builds
2. **Vercel** -- free tier works, excellent Astro support, but primarily designed for server-rendered apps
3. **Netlify** -- free tier, good static hosting, slightly slower CDN than Cloudflare
4. **Traditional hosting (existing)** -- if unionbc.cz already has hosting, deploy /dist/ via FTP/SFTP

**Root redirect:** Since this is a static site, the root `/` -> `/cs/` redirect can be handled by:
- Cloudflare Pages: `_redirects` file (`/ /cs/ 302`)
- An `index.html` at root with `<meta http-equiv="refresh" content="0;url=/cs/">`

## Sources and Confidence

| Topic | Confidence | Basis |
|-------|------------|-------|
| Folder-based i18n URL structure | HIGH | Established SEO best practice, Google documentation |
| Astro island architecture | MEDIUM | Training data (web search unavailable for version verification) |
| hreflang implementation | HIGH | Google Search Central documentation (well-established standard) |
| Calculator as island component | HIGH | Standard pattern for isolated interactivity in static sites |
| Build order dependencies | HIGH | Logical dependency analysis of this specific project |
| Hosting recommendations | MEDIUM | Training data (pricing/features may have changed) |

**Note:** Web search and Context7 were unavailable during this research session. All recommendations are based on training data and established patterns. Stack-specific version numbers and API details should be verified against current Astro documentation before implementation.
