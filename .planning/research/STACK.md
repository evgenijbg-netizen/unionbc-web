# Technology Stack

**Project:** Union B+C / TEMP-COAT Product Website
**Domain:** B2B industrial product presentation, bilingual (CZ/EN), static site with interactive calculator
**Researched:** 2026-02-12
**Methodology note:** WebSearch, WebFetch, and Context7 were unavailable during this research session. All recommendations are based on training data (cutoff May 2025). Versions should be verified against current release notes before finalizing. Core architectural recommendations are stable and HIGH confidence regardless.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro** | ^5.x | Static site generator | Purpose-built for content-heavy static sites. Ships zero JS by default -- critical for performance and SEO. Built-in i18n routing with `astro:i18n`. Islands architecture lets us add the interactive calculator without bloating the rest of the site. Fastest static output of any modern framework. | HIGH (architecture), MEDIUM (version) |

**Why Astro over alternatives:**

- **vs Next.js:** Next.js is overkill for a static product site. It bundles React runtime even for static pages, hurting performance. Astro ships zero JS for static pages. Next.js shines for apps with authentication, dynamic data, and API routes -- none of which apply here.
- **vs Gatsby:** Gatsby is effectively deprecated. Netlify acquired it and development has stalled. Its GraphQL data layer adds unnecessary complexity for a simple product site.
- **vs Hugo/11ty:** Both are excellent SSGs, but lack the component-based architecture and island hydration that makes the savings calculator integration clean. Hugo uses Go templates (worse DX). 11ty is closest in philosophy but has a smaller ecosystem and no built-in i18n routing.
- **vs plain HTML:** A static HTML site would work but makes bilingual content management painful and eliminates component reuse.

### UI Components (Island)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Preact** | ^10.x | Interactive calculator island | Lightweight (3KB) React-compatible alternative. The savings calculator is the only interactive element -- Preact keeps the JS payload minimal. Works seamlessly as an Astro island via `@astrojs/preact`. | HIGH |

**Why Preact over alternatives:**

- **vs React:** React is 40KB+ gzipped. For a single calculator widget, that is excessive. Preact provides identical API at 3KB.
- **vs Svelte:** Svelte compiles away the framework, so bundle size is similar for small components. But Preact has broader ecosystem compatibility if we need to pull in any React-compatible charting library for calculator results.
- **vs Vue:** Same reasoning as React -- larger runtime for a single interactive widget.
- **vs Vanilla JS:** The calculator will have reactive state (input values, computed results, possibly chart output). A framework makes this maintainable; vanilla JS for reactive UIs becomes spaghetti quickly.

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Tailwind CSS** | ^4.x | Utility-first CSS | Industry standard for 2025/2026. Purges unused CSS for tiny production bundles. Excellent for industrial/serious design -- easy to enforce a consistent dark color palette. Astro has first-class Tailwind integration via `@astrojs/tailwind`. | HIGH (choice), MEDIUM (v4 specifics) |

**Tailwind v4 notes (verify current state):**
- Tailwind v4 was released in early 2025 with a new Rust-based engine (Oxide), CSS-first configuration (no more `tailwind.config.js`), and automatic content detection.
- If v4 has stability concerns at deploy time, v3.4.x is a rock-solid fallback with near-identical DX.

**Why Tailwind over alternatives:**

- **vs plain CSS / CSS Modules:** Tailwind is faster for development and produces smaller bundles due to purging. CSS Modules work but require more boilerplate for a small team.
- **vs Sass/SCSS:** Sass adds a compilation step with diminishing returns in 2026. Modern CSS has nesting, variables, and container queries natively. Tailwind abstracts this better.
- **vs styled-components/Emotion:** CSS-in-JS is for React apps. Irrelevant for mostly-static Astro pages.

### Internationalization (i18n)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro built-in i18n** | (part of Astro 5.x) | Route-based language switching | Astro's native i18n handles `/cs/` and `/en/` routing, locale detection, and `hreflang` generation out of the box. No external library needed for routing. | HIGH |
| **JSON translation files** | N/A | Content strings | Simple `cs.json` / `en.json` files with a lightweight `t()` helper function. For a 2-language site with ~50-100 strings, a full i18n library (i18next, etc.) is unnecessary overhead. | HIGH |

**Why NOT i18next or similar:**
- The site has exactly 2 languages with a small string count.
- A simple `t(key)` function reading from JSON is 10 lines of code vs. adding a 40KB dependency.
- Astro's content collections can handle bilingual long-form content (product descriptions, case studies) via directory-based organization (`/content/cs/`, `/content/en/`).

### SEO and Meta

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **astro-seo** | ^0.8.x | SEO meta tags | Community-maintained Astro component for Open Graph, Twitter cards, canonical URLs, JSON-LD structured data. Avoids manual `<meta>` tag management. | MEDIUM (version) |
| **@astrojs/sitemap** | ^3.x | XML sitemap generation | Official Astro integration. Generates sitemap.xml automatically at build time, critical for Czech market SEO. Handles bilingual alternate URLs. | HIGH |

### Animation and Interaction

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **CSS scroll-driven animations** | Native | Subtle entrance animations | Modern CSS can handle scroll-triggered reveals without JS. For an industrial B2B site, animations should be minimal and purposeful. No library needed. | HIGH |
| **View Transitions API** | (Astro built-in) | Page transition polish | Astro has built-in View Transitions support. Adds a professional feel to language switching and page navigation with zero JS cost. | HIGH |

**Why NOT GSAP, Framer Motion, or other animation libraries:**
- An industrial B2B site should feel solid and professional, not flashy. Subtle CSS animations achieve this.
- Animation libraries add 20-60KB for effects that should be restrained anyway.
- Exception: If the calculator needs animated charts, use a lightweight charting solution (see below).

### Calculator Visualization (if needed)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Chart.js** | ^4.x | Savings visualization charts | Lightweight (~60KB), canvas-based, no dependencies. Perfect for showing before/after energy cost comparisons. Works well inside a Preact island. | HIGH |

**Alternative considered:**
- **D3.js:** Far more powerful but dramatically more complex. Chart.js covers bar/line/doughnut charts which is all a savings calculator needs.
- **Recharts:** React-specific wrapper around D3. Heavier than Chart.js for this use case.
- **No chart library:** The calculator could display results as styled numbers/tables only. Start here, add Chart.js only if visual charts genuinely help conversion.

### Image Optimization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Astro built-in `<Image />`** | (part of Astro) | Automatic image optimization | Astro's `<Image>` component handles WebP/AVIF conversion, responsive srcsets, and lazy loading out of the box via Sharp. No external service or library needed. | HIGH |
| **Sharp** | (Astro dependency) | Image processing engine | Installed automatically by Astro. Handles format conversion and resizing at build time. | HIGH |

### Fonts

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Self-hosted WOFF2 fonts** | N/A | Typography | Self-hosting eliminates Google Fonts GDPR concerns (critical for Czech/EU market) and removes external requests. Use `@fontsource` packages for easy setup. | HIGH |
| **@fontsource/inter** or **@fontsource/plus-jakarta-sans** | latest | Sans-serif body font | Inter is the industry standard for clean, professional web typography. Plus Jakarta Sans is a more distinctive alternative. Both support Czech diacritics (hacky, carky). | HIGH |

**Font recommendation for industrial B2B:**
- Heading: **Inter** or **Space Grotesk** (geometric, technical feel)
- Body: **Inter** (excellent readability, full Czech character support)
- Verify Czech diacritics support before finalizing any font choice.

### Deployment and Hosting

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Cloudflare Pages** | N/A | Static hosting | Free tier covers this site easily. Global CDN with edge locations in Europe (important for Czech audience). Automatic HTTPS. Preview deployments per branch. | HIGH |

**Why Cloudflare Pages over alternatives:**

- **vs Vercel:** Both excellent, but Cloudflare's free tier is more generous and has no "Powered by Vercel" branding. Edge network is equally good for European audience.
- **vs Netlify:** Netlify's free tier has bandwidth limits (100GB/month). Cloudflare Pages has unlimited bandwidth on free tier. Both have similar DX.
- **vs Traditional Czech hosting (WEDOS, Forpsi):** These work for static files but lack automatic deployments from Git, preview URLs, and global CDN. The development workflow is worse.
- **vs GitHub Pages:** Limited to 1GB site size, no custom build commands, less flexible.

### Development Tooling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **TypeScript** | ^5.x | Type safety | Astro has first-class TypeScript support. Types for calculator logic prevent bugs. Types for translation keys prevent missing strings. | HIGH |
| **Biome** | ^1.x | Linting and formatting | Single tool replacing ESLint + Prettier. Faster (Rust-based), zero config for standard setups. Gaining rapid adoption in 2025/2026. | HIGH (choice), MEDIUM (version) |
| **pnpm** | ^9.x | Package manager | Faster and more disk-efficient than npm. Strict dependency resolution prevents phantom dependencies. | HIGH |

**Why Biome over ESLint + Prettier:**
- Single dependency vs. ESLint + dozens of plugins + Prettier + eslint-config-prettier.
- 100x faster execution (Rust vs. JavaScript).
- Format + lint in one pass.
- If the team already uses ESLint, keep it -- switching cost is not worth it for a small project. But for greenfield, Biome is the better starting point in 2026.

### Form Handling (Contact/Inquiry)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| **Formspree** or **Cloudflare Workers** | N/A | Contact form backend | Static sites need an external form handler. Formspree is zero-config. Cloudflare Workers (if hosting on CF Pages) keeps everything in one ecosystem with no additional vendor. | MEDIUM |

**Decision:** If the site has a simple contact form (name, email, message, product inquiry), Formspree's free tier (50 submissions/month) is sufficient. For higher volume or custom logic (e.g., sending the calculator results via email), a Cloudflare Worker (serverless function) is trivial to add.

---

## Complete Stack Summary

```
Framework:     Astro 5.x (static output)
Interactive:   Preact 10.x (calculator island only)
Styling:       Tailwind CSS 4.x
i18n:          Astro built-in routing + JSON translation files
SEO:           astro-seo + @astrojs/sitemap
Images:        Astro <Image> (Sharp)
Charts:        Chart.js 4.x (only if visual charts needed)
Fonts:         Self-hosted via @fontsource (Inter / Space Grotesk)
Animation:     CSS native + Astro View Transitions
Hosting:       Cloudflare Pages
Language:      TypeScript 5.x
Tooling:       Biome 1.x + pnpm 9.x
Forms:         Formspree or Cloudflare Workers
```

---

## Alternatives Considered (Full Matrix)

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| SSG Framework | Astro | Next.js | Ships React runtime for all pages, overkill for static content |
| SSG Framework | Astro | Hugo | Go templates, no island architecture for calculator |
| SSG Framework | Astro | Gatsby | Effectively deprecated, GraphQL complexity |
| SSG Framework | Astro | 11ty | No built-in i18n routing, smaller ecosystem |
| UI Island | Preact | React | 13x larger bundle for a single widget |
| UI Island | Preact | Svelte | Good option but less ecosystem for charting libs |
| UI Island | Preact | Vanilla JS | Reactive calculator state is painful without a framework |
| Styling | Tailwind CSS | CSS Modules | More boilerplate, larger output, slower development |
| Styling | Tailwind CSS | Sass/SCSS | Diminishing returns in 2026, Tailwind is more productive |
| i18n | Built-in + JSON | i18next | Overkill for 2 languages with ~100 strings |
| i18n | Built-in + JSON | Paraglide.js | Interesting but adds dependency for minimal gain |
| Charts | Chart.js | D3.js | Massive overkill for simple comparison charts |
| Hosting | Cloudflare Pages | Vercel | Both good, CF has better free tier for this use case |
| Hosting | Cloudflare Pages | Netlify | Bandwidth limits on free tier |
| Hosting | Cloudflare Pages | WEDOS/Forpsi | No CI/CD, no preview deploys, no global CDN |
| Linting | Biome | ESLint + Prettier | Multiple deps, slower, more config for same outcome |
| Package Mgr | pnpm | npm | Slower, less efficient, phantom dependency issues |

---

## Installation

```bash
# Initialize project
pnpm create astro@latest union-bc-website -- --template minimal --typescript strict

# Core Astro integrations
pnpm add @astrojs/preact @astrojs/tailwind @astrojs/sitemap

# Preact (for calculator island)
pnpm add preact

# SEO
pnpm add astro-seo

# Fonts (verify Czech diacritics support before choosing)
pnpm add @fontsource/inter @fontsource/space-grotesk

# Charts (add only when building calculator visualization)
pnpm add chart.js

# Dev dependencies
pnpm add -D @biomejs/biome typescript
```

**Post-install setup:**
```bash
# Initialize Biome config
pnpm biome init

# Tailwind CSS v4 setup (if using v4, it auto-detects -- no config file needed)
# For v3.x, run: npx tailwindcss init
```

---

## Project Structure

```
union-bc-website/
  src/
    components/         # Reusable Astro components
      Header.astro
      Footer.astro
      LanguageSwitcher.astro
      ProductCard.astro
    islands/            # Interactive Preact components
      SavingsCalculator.tsx
      CalculatorChart.tsx
    layouts/
      BaseLayout.astro  # HTML shell, meta, fonts
      ProductLayout.astro
    pages/
      cs/               # Czech pages
        index.astro
        produkt.astro
        kalkulacka.astro
        kontakt.astro
      en/               # English pages
        index.astro
        product.astro
        calculator.astro
        contact.astro
      index.astro       # Root redirect to /cs/ (default locale)
    content/            # Long-form content (MDX or JSON)
      cs/
      en/
    i18n/
      cs.json           # Czech UI strings
      en.json           # English UI strings
      utils.ts          # t() helper function
    styles/
      global.css        # Tailwind directives, custom properties
    assets/             # Images, SVGs (processed by Astro)
  public/               # Static assets (favicons, robots.txt)
  astro.config.mjs
  biome.json
  tsconfig.json
  package.json
```

---

## Configuration Snippets

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.unionbc.cz',
  integrations: [preact(), tailwind(), sitemap()],
  i18n: {
    defaultLocale: 'cs',
    locales: ['cs', 'en'],
    routing: {
      prefixDefaultLocale: true,  // /cs/ and /en/ explicit paths
    },
  },
});
```

### Minimal t() helper (src/i18n/utils.ts)

```typescript
import cs from './cs.json';
import en from './en.json';

const translations = { cs, en } as const;
type Locale = keyof typeof translations;

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locale in translations) return locale as Locale;
  return 'cs';
}
```

---

## GDPR and Czech Market Considerations

| Concern | Approach | Notes |
|---------|----------|-------|
| Cookie consent | Not needed if no tracking | Static site with self-hosted fonts and no analytics = no consent banner needed |
| Analytics | **Plausible** or **Umami** (self-hosted) | Both are GDPR-compliant, cookie-free analytics. Plausible has a hosted plan. Umami can self-host on Cloudflare Workers. |
| Font loading | Self-hosted WOFF2 | Avoids Google Fonts GDPR issue (data transfer to US) |
| Contact forms | Process data per GDPR | Privacy policy page needed in both languages |
| hreflang tags | Automatic via Astro i18n | Critical for Czech Google results |

---

## Performance Budget

Target: **100/100 Lighthouse score** (achievable with this stack)

| Metric | Target | How |
|--------|--------|-----|
| LCP | < 1.5s | Static HTML, optimized images, CDN edge serving |
| FID/INP | < 100ms | Zero JS on non-calculator pages; Preact island only where needed |
| CLS | 0 | Font preloading, explicit image dimensions |
| Total JS (non-calculator pages) | < 5KB | Astro ships zero JS; only View Transitions script if used |
| Total JS (calculator page) | < 50KB | Preact (~3KB) + calculator logic + Chart.js (~60KB if charts used) |

---

## Technology Lifecycle and Risk

| Technology | Maturity | Risk | Mitigation |
|------------|----------|------|------------|
| Astro | Mature, well-funded (YC-backed) | LOW | Large community, active development |
| Preact | Mature, stable API | LOW | Drop-in React replacement, easy to swap |
| Tailwind CSS | Industry standard | LOW | Massive adoption, long-term support guaranteed |
| Cloudflare Pages | Stable, free tier | LOW | Static output is portable to any host |
| Chart.js | Mature, stable | LOW | Well-maintained, large community |
| Biome | Newer, rapidly growing | LOW-MEDIUM | Worst case: swap back to ESLint in 30 minutes |
| Astro i18n | Built-in since v4 | LOW | First-party feature, well-documented |

---

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| **WordPress** | CMS overhead for a site that does not need content editing by non-developers. Security maintenance burden. Slower. |
| **React/Next.js** | Framework tax (runtime JS) for a site that is 95% static content. |
| **Gatsby** | Effectively abandoned. GraphQL data layer is unnecessary complexity. |
| **Bootstrap** | Opinionated component styles fight against custom industrial design. Tailwind gives more control. |
| **jQuery** | No use case in 2026. Native JS and Preact cover all needs. |
| **Google Fonts CDN** | GDPR risk for EU/Czech site. Self-host instead. |
| **Google Analytics** | GDPR consent banner requirement. Use Plausible or Umami instead. |
| **Webpack** | Astro uses Vite internally. No need to configure a bundler. |
| **CSS-in-JS** | Runtime cost, complexity, unnecessary for static pages. |
| **Contentful/Sanity/any headless CMS** | No non-developer editors. Content changes = code changes, which is fine for this project. |
| **Docker** | Static site deploys via Git push. No containerization needed. |
| **Database** | Zero dynamic data. Calculator runs client-side. |

---

## Sources and Confidence Notes

All recommendations are based on training data with cutoff May 2025. The following should be verified before project kickoff:

1. **Astro version:** Verify latest stable is 5.x at https://astro.build -- MEDIUM confidence on exact version
2. **Tailwind CSS v4:** Verify stability and Astro integration status at https://tailwindcss.com -- MEDIUM confidence on v4 specifics
3. **Biome version:** Verify latest at https://biomejs.dev -- MEDIUM confidence on version
4. **astro-seo package:** Verify still maintained at https://github.com/jonasmerlin/astro-seo -- MEDIUM confidence
5. **Cloudflare Pages free tier:** Verify current limits at https://pages.cloudflare.com -- MEDIUM confidence on specific limits

**HIGH confidence items (stable, well-established patterns):**
- Astro as the framework choice for this use case
- Preact for lightweight islands
- Tailwind for utility-first CSS
- Self-hosted fonts for GDPR compliance
- TypeScript for type safety
- JSON-based i18n for a 2-language site
- Static hosting on a CDN platform
- Chart.js for simple visualizations

**Overall stack confidence: HIGH** -- the architectural decisions are sound regardless of minor version differences. This is a well-trodden path with established best practices.
