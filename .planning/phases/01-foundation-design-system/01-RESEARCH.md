# Phase 1: Foundation & Design System - Research

**Researched:** 2026-02-13
**Domain:** Astro 5 static site scaffolding, Tailwind CSS 4 design system, i18n architecture, Cloudflare Pages deployment
**Confidence:** HIGH

## Summary

Phase 1 establishes the structural backbone that every subsequent page will use: project scaffolding with Astro 5 + TypeScript + Tailwind CSS 4 + Biome, a bilingual i18n system with URL-based routing (/cs/, /en/), a shared layout shell (header, footer, navigation with language switcher), an industrial design system with dark tones and technical typography, and deployment to Cloudflare Pages with HTTPS. It also prepares a redirect map from the old site's URLs.

The stack is well-established and verified. Astro 5.17.x is the current stable release. Tailwind CSS 4 uses a fundamentally different setup than v3 -- the old `@astrojs/tailwind` integration is deprecated; instead use the `@tailwindcss/vite` plugin directly. Design tokens are defined in CSS via `@theme` directive, not in `tailwind.config.js`. Biome has jumped to v2.3 with type-aware linting. pnpm is now at v10.x. These version changes from earlier research documents are significant and affect configuration.

**Primary recommendation:** Start with Astro 5.17.x + Tailwind CSS 4 via `@tailwindcss/vite` plugin + Biome 2.x. Build the i18n system (routing + translation utility + route mapping + hreflang) as the very first functional piece, then layer the design system and layout shell on top. Deploy an empty shell to Cloudflare Pages early to validate the pipeline.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | ^5.17.x | Static site generator | Zero JS by default, built-in i18n routing, islands architecture. Current stable. Astro 6 is in beta -- avoid for production. |
| TypeScript | ^5.x | Type safety | First-class Astro support. Types for translation keys and design tokens prevent bugs. |
| Tailwind CSS | ^4.x | Utility-first CSS with design tokens | CSS-first configuration via `@theme`. Generates utilities from design tokens. Vite plugin integration. |
| @tailwindcss/vite | ^4.x | Tailwind Vite integration | Official way to use Tailwind v4 with Astro. Replaces deprecated `@astrojs/tailwind`. |
| Biome | ^2.3.x | Linting + formatting | Rust-based, replaces ESLint + Prettier. v2 adds type-aware linting, Astro file support (experimental), HTML formatting. |
| pnpm | ^10.x | Package manager | Strict dependency resolution, fast, disk-efficient. Current major is v10. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/preact | ^4.1.x | Preact island integration | Only needed when adding interactive components (Phase 3 calculator). Install in Phase 1 to validate island architecture. |
| preact | ^10.x | Lightweight UI framework | 3KB React alternative for interactive islands. |
| @astrojs/sitemap | ^3.x | Sitemap generation | Add during scaffolding. Generates sitemap.xml with bilingual alternate URLs at build time. |
| astro-seo | ^1.1.x | SEO meta tag component | Actively maintained (last release: Jan 2026). Handles Open Graph, Twitter cards, canonical URLs. |
| @fontsource-variable/inter | latest | Body font (self-hosted WOFF2) | Variable font, full Czech diacritics support, GDPR-compliant self-hosting. |
| @fontsource-variable/space-grotesk | latest | Heading font (self-hosted WOFF2) | Geometric technical feel, full Czech diacritics support (63 languages), designed by Florian Karsten (Czech designer). |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind CSS 4 | Tailwind CSS 3.4.x | Stable fallback if v4 Astro integration has issues. Uses `tailwind.config.js` instead of CSS `@theme`. |
| Biome 2.x | ESLint + Prettier | More plugins available, but multiple deps and slower. Biome v2 Astro support is experimental. |
| @fontsource-variable/space-grotesk | @fontsource-variable/plus-jakarta-sans | Alternative distinctive sans-serif. Space Grotesk is preferred for its Czech origin and geometric/technical feel. |
| astro-seo | Manual `<meta>` tags | Zero dependency. For a small site, manual meta tags in the layout are equally viable. |
| pnpm | npm | npm works fine. pnpm is faster and stricter but adds learning curve. |

**Installation:**
```bash
# Create project
pnpm create astro@latest -- --template minimal --typescript strict

# Core dependencies
pnpm add tailwindcss @tailwindcss/vite
pnpm add @astrojs/preact preact
pnpm add @astrojs/sitemap
pnpm add astro-seo

# Fonts (self-hosted, GDPR-compliant)
pnpm add @fontsource-variable/inter @fontsource-variable/space-grotesk

# Dev dependencies
pnpm add -D @biomejs/biome typescript
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  components/          # Reusable Astro components (Header, Footer, LanguageSwitcher, etc.)
  layouts/
    BaseLayout.astro   # Single shared layout: <html lang>, <head>, nav, footer
  pages/
    index.astro        # Root redirect to /cs/ (default locale)
    cs/                # Czech pages
      index.astro      # Homepage
    en/                # English pages
      index.astro      # Homepage
  i18n/
    cs.json            # Czech UI strings (flat dot-separated keys)
    en.json            # English UI strings
    routes.ts          # Route slug mapping between languages
    utils.ts           # t() helper, getLocaleFromUrl(), getAlternatePath()
  styles/
    global.css         # @import "tailwindcss" + @theme design tokens
  assets/              # Images, SVGs (processed by Astro's build)
public/
  _redirects           # Cloudflare Pages redirect rules
  fonts/               # Alternative: place WOFF2 here if not using @fontsource
  robots.txt
astro.config.mjs
biome.json
tsconfig.json
package.json
wrangler.jsonc         # Cloudflare Pages config (optional, for wrangler CLI)
```

### Pattern 1: Tailwind CSS 4 via Vite Plugin (NOT @astrojs/tailwind)

**What:** Tailwind CSS 4 uses `@tailwindcss/vite` as a Vite plugin, configured directly in `astro.config.mjs` under `vite.plugins`. The old `@astrojs/tailwind` integration is deprecated for Tailwind v4.

**When to use:** Always for this project. This is the only supported method for Tailwind v4.

**Example:**
```javascript
// astro.config.mjs
// Source: https://tailwindcss.com/docs/guides/astro
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.unionbc.cz",
  integrations: [preact(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "cs",
    locales: ["cs", "en"],
    routing: {
      prefixDefaultLocale: true,  // Both /cs/ and /en/ get explicit prefixes
    },
  },
});
```

### Pattern 2: CSS-First Design Tokens with @theme

**What:** Tailwind v4 defines design tokens in CSS using the `@theme` directive instead of `tailwind.config.js`. Tokens become both CSS custom properties and Tailwind utilities automatically.

**When to use:** For the industrial design system -- define the color palette, typography scale, spacing, and other tokens.

**Example:**
```css
/* src/styles/global.css */
/* Source: https://tailwindcss.com/docs/theme */
@import "tailwindcss";

@theme {
  /* Industrial color palette */
  --color-surface-900: oklch(0.15 0.01 250);   /* Near-black background */
  --color-surface-800: oklch(0.20 0.01 250);   /* Dark card background */
  --color-surface-700: oklch(0.28 0.01 250);   /* Lighter dark surface */
  --color-surface-100: oklch(0.95 0.005 250);  /* Light text area */
  --color-surface-50: oklch(0.98 0.002 250);   /* Near-white */

  --color-accent-500: oklch(0.65 0.18 250);    /* Primary accent (industrial blue) */
  --color-accent-400: oklch(0.72 0.15 250);    /* Lighter accent */
  --color-accent-600: oklch(0.55 0.18 250);    /* Darker accent */

  --color-warn-500: oklch(0.75 0.18 65);       /* Warning/highlight (amber) */
  --color-text-primary: oklch(0.95 0.005 250); /* Primary text on dark */
  --color-text-secondary: oklch(0.70 0.01 250);/* Secondary text on dark */
  --color-text-dark: oklch(0.20 0.01 250);     /* Text on light surfaces */

  /* Typography */
  --font-heading: "Space Grotesk Variable", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter Variable", ui-sans-serif, system-ui, sans-serif;

  /* Spacing base */
  --spacing: 4px;

  /* Breakpoints (mobile-first) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
}
```

### Pattern 3: i18n with Astro Built-in Routing + Custom Translation Utility

**What:** Astro's built-in i18n handles URL routing (`/cs/`, `/en/`), locale detection from URL, and provides `getRelativeLocaleUrl()` for link generation. A custom lightweight `t()` utility reads from JSON translation files. A route map connects localized slugs between languages.

**When to use:** Always. This is the i18n architecture for the entire project.

**Example:**
```typescript
// src/i18n/utils.ts
// Source: Astro docs + custom pattern
import cs from "./cs.json";
import en from "./en.json";

const translations = { cs, en } as const;
export type Locale = keyof typeof translations;
export const locales: Locale[] = ["cs", "en"];
export const defaultLocale: Locale = "cs";

export function t(locale: Locale, key: string): string {
  const keys = key.split(".");
  let value: unknown = translations[locale];
  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Fallback: return key itself
    }
  }
  return typeof value === "string" ? value : key;
}

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split("/");
  if (locale in translations) return locale as Locale;
  return defaultLocale;
}
```

```typescript
// src/i18n/routes.ts
import type { Locale } from "./utils";

// Maps logical page name -> localized slug for each language
export const routeMap: Record<Locale, Record<string, string>> = {
  cs: {
    home: "",
    product: "produkt",
    faq: "faq",
    certificates: "certifikaty",
    contact: "kontakt",
  },
  en: {
    home: "",
    product: "product",
    faq: "faq",
    certificates: "certificates",
    contact: "contact",
  },
};

export function getLocalizedPath(page: string, locale: Locale): string {
  const slug = routeMap[locale]?.[page] ?? page;
  return `/${locale}/${slug ? slug + "/" : ""}`;
}

export function getAlternatePath(currentPath: string, targetLocale: Locale): string {
  const sourceLocale: Locale = currentPath.startsWith("/en/") ? "en" : "cs";
  const sourceSlug = currentPath.replace(`/${sourceLocale}/`, "").replace(/\/$/, "");

  // Reverse lookup: find the logical page name from the source slug
  const sourceMap = routeMap[sourceLocale];
  const pageKey = Object.entries(sourceMap).find(([, slug]) => slug === sourceSlug)?.[0];

  if (!pageKey) return `/${targetLocale}/`;
  return getLocalizedPath(pageKey, targetLocale);
}
```

### Pattern 4: Shared Layout with Locale Prop and hreflang

**What:** A single `BaseLayout.astro` wraps every page. It receives the locale and page key, generates `<html lang>`, hreflang tags, canonical URLs, and renders shared chrome (nav, footer).

**Example:**
```astro
---
// src/layouts/BaseLayout.astro
// Source: Astro i18n docs + hreflang best practice
import { getAbsoluteLocaleUrl } from "astro:i18n";
import { getLocaleFromUrl, t, locales, type Locale } from "../i18n/utils";
import { getAlternatePath } from "../i18n/routes";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import "../styles/global.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";

interface Props {
  title: string;
  description: string;
  pageKey?: string; // Logical page name for route mapping
}

const { title, description, pageKey } = Astro.props;
const locale = getLocaleFromUrl(Astro.url) as Locale;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site).href;
---
<!doctype html>
<html lang={locale === "cs" ? "cs" : "en"}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />

  {/* hreflang tags for all locales */}
  {locales.map((loc) => {
    const altPath = loc === locale
      ? Astro.url.pathname
      : getAlternatePath(Astro.url.pathname, loc);
    const altUrl = new URL(altPath, Astro.site).href;
    return <link rel="alternate" hreflang={loc} href={altUrl} />;
  })}
  <link rel="alternate" hreflang="x-default" href={new URL(
    getAlternatePath(Astro.url.pathname, "cs"), Astro.site
  ).href} />

  <slot name="head" />
</head>
<body class="bg-surface-900 text-text-primary font-body">
  <Header locale={locale} pageKey={pageKey} />
  <main>
    <slot />
  </main>
  <Footer locale={locale} />
</body>
</html>
```

### Pattern 5: Root Redirect via _redirects

**What:** The root URL `/` should redirect to `/cs/` (Czech, the default locale). On Cloudflare Pages, use a `_redirects` file in the `public/` directory.

**Example:**
```
# public/_redirects
/ /cs/ 302
```

Additionally, create a `src/pages/index.astro` fallback:
```astro
---
// src/pages/index.astro
// Fallback redirect for local dev and non-Cloudflare environments
return Astro.redirect("/cs/", 302);
---
```

### Anti-Patterns to Avoid

- **Using deprecated `@astrojs/tailwind` with Tailwind v4:** This will not work correctly. Use `@tailwindcss/vite` plugin instead.
- **Creating `tailwind.config.js` for Tailwind v4:** Config is now CSS-first via `@theme` in your CSS file. No JS config needed.
- **Separate layout files per language:** Use one `BaseLayout.astro` parameterized by locale, not `LayoutCS.astro` and `LayoutEN.astro`.
- **Hardcoded strings in components:** Every visible string must use `t(locale, "key")`. No inline Czech or English text in `.astro` files.
- **Auto-redirecting based on browser language:** Static sites cannot reliably detect `Accept-Language`. It harms SEO and confuses users on corporate networks with English OS but Czech content preference.
- **Installing Biome v1.x:** Current version is v2.3. Use `@biomejs/biome` v2.x and run `npx @biomejs/biome migrate --write` if starting from v1 configs.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| i18n URL routing | Custom route parser | Astro built-in `i18n` config with `prefixDefaultLocale: true` | Handles locale detection, URL generation, middleware. Battle-tested. |
| Locale-aware URLs | String concatenation for `/cs/` prefix | `getRelativeLocaleUrl()` from `astro:i18n` | Handles edge cases (trailing slashes, base paths) correctly. |
| Sitemap with hreflang | Manual XML generation | `@astrojs/sitemap` | Automatically discovers all pages and generates bilingual alternate URLs. |
| Image optimization | Manual Sharp pipeline | Astro built-in `<Image />` component | Handles WebP/AVIF conversion, responsive srcsets, lazy loading. |
| Font loading | Manual `@font-face` declarations | `@fontsource-variable/*` packages | Pre-packaged WOFF2 with optimal `font-display`, subsetting, variable font support. |
| CSS purging | Manual unused CSS removal | Tailwind v4 automatic content detection | Scans all files for class usage automatically. No `content` config needed in v4. |
| Linting + formatting | ESLint + Prettier + config packages | Biome 2.x single tool | One dependency, one config file, 100x faster. |
| SEO meta tags | Manual `<meta>` in every page | `astro-seo` component or centralized layout | Prevents missing OG tags, validates required fields. |
| Redirects on Cloudflare | Cloudflare Workers function | `_redirects` file in `public/` | Simple text file, no code needed. Up to 2000 static + 100 dynamic redirects. |

**Key insight:** The Astro ecosystem provides first-party solutions for nearly every infrastructure concern in this phase. The custom code is limited to: translation JSON files, the `t()` helper, and the route mapping between localized slugs.

## Common Pitfalls

### Pitfall 1: Using Deprecated @astrojs/tailwind with Tailwind v4
**What goes wrong:** Installing `@astrojs/tailwind` and expecting it to work with Tailwind CSS v4. The integration is deprecated for v4 and will either fail or produce incorrect output.
**Why it happens:** Older tutorials and the prior STACK.md research reference `@astrojs/tailwind`. Tailwind v4 changed its architecture fundamentally.
**How to avoid:** Use `@tailwindcss/vite` plugin in `astro.config.mjs` under `vite.plugins`. CSS file uses `@import "tailwindcss"` and `@theme` for design tokens.
**Warning signs:** `tailwind.config.js` file exists in project root. `@astrojs/tailwind` appears in `integrations` array.

### Pitfall 2: Tailwind v4 @theme vs :root Confusion
**What goes wrong:** Defining design tokens as regular CSS custom properties in `:root` instead of using `@theme`. The variables exist but no Tailwind utilities are generated for them.
**Why it happens:** Developers familiar with CSS custom properties don't realize `@theme` is a special Tailwind directive that generates utility classes.
**How to avoid:** Use `@theme { --color-brand: ...; }` for any token that should produce utilities like `bg-brand`, `text-brand`. Use `:root` only for non-utility variables.
**Warning signs:** Classes like `bg-brand` don't work despite `--color-brand` being defined in CSS.

### Pitfall 3: i18n Route Slug Mismatch Between Page Files and Route Map
**What goes wrong:** The Astro page file is at `src/pages/cs/produkt.astro` but the route map says `product: "produkty"`. URLs and language switcher break.
**Why it happens:** Route slugs are defined in two places: the filesystem (page file names) and the route map (for language switching). They must match exactly.
**How to avoid:** Establish a naming convention. Page file names ARE the slugs. The route map maps logical names to those same slugs. Document the mapping in a single place.
**Warning signs:** Language switcher links to 404 pages. hreflang tags point to non-existent URLs.

### Pitfall 4: Missing hreflang x-default Tag
**What goes wrong:** Every page has `hreflang="cs"` and `hreflang="en"` but no `hreflang="x-default"`. Google does not know what to show users whose language preference is neither Czech nor English.
**Why it happens:** Developers implement the two language alternates but forget the x-default specification.
**How to avoid:** Include `<link rel="alternate" hreflang="x-default" href="...">` on every page, pointing to the Czech version (primary market).
**Warning signs:** Google Search Console shows hreflang warnings.

### Pitfall 5: Cloudflare Pages Node.js Version
**What goes wrong:** Build fails on Cloudflare Pages because it defaults to an old Node.js version (v12.18.0) that Astro does not support.
**Why it happens:** Cloudflare's default Node.js version is very old for backward compatibility.
**How to avoid:** Set the `NODE_VERSION` environment variable to `20` (or `22`) in Cloudflare Pages build settings.
**Warning signs:** Build error mentioning unsupported Node.js features or syntax errors in node_modules.

### Pitfall 6: Biome v2 Breaking Changes from v1 Config
**What goes wrong:** Copying a `biome.json` from a v1 tutorial produces errors or unexpected behavior in v2.
**Why it happens:** Biome v2 changed configuration structure and some rule names.
**How to avoid:** Initialize fresh with `pnpm biome init` for v2, or run `pnpm biome migrate --write` to auto-upgrade a v1 config. Use v2 documentation only.
**Warning signs:** Biome CLI prints deprecation warnings or config validation errors.

### Pitfall 7: Font Flash (FOUT) on First Load
**What goes wrong:** Page renders with system fonts, then flashes to the custom font. Visually jarring, especially on the industrial dark theme where font weight differences are prominent.
**Why it happens:** Self-hosted fonts load asynchronously by default. On first visit with empty cache, there is a font swap.
**How to avoid:** Import `@fontsource-variable/*` in the layout's frontmatter (processed at build time). Add `font-display: swap` (fontsource default). Preload critical font files with `<link rel="preload" as="font" type="font/woff2" crossorigin>` for above-the-fold text.
**Warning signs:** CLS (Cumulative Layout Shift) score above 0 in Lighthouse. Visual font flash during testing.

### Pitfall 8: Design System Without Real Czech Content
**What goes wrong:** Design system is built and tested with English lorem ipsum or short English text. Czech text is 15-30% longer than English equivalents and uses diacritics (hacky, carky) that affect line height and character spacing. Design breaks when real content is inserted.
**Why it happens:** Developers test with the language they think in.
**How to avoid:** Test every component with real Czech strings from day one. Czech navigation labels are longer ("Certifikaty a dokumenty" vs "Certificates"). Czech body text needs more line-height due to diacritics reaching above the baseline.
**Warning signs:** Navigation wraps to second line on mobile only with Czech text. Buttons clip Czech labels.

## Code Examples

### Astro Config (Complete Phase 1)
```javascript
// astro.config.mjs
// Source: https://docs.astro.build/en/guides/internationalization/
//         https://tailwindcss.com/docs/guides/astro
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.unionbc.cz",
  integrations: [
    preact(),
    sitemap({
      i18n: {
        defaultLocale: "cs",
        locales: {
          cs: "cs",
          en: "en",
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: "cs",
    locales: ["cs", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
```

### Biome Configuration (v2)
```json
// biome.json
// Source: https://biomejs.dev/
{
  "$schema": "https://biomejs.dev/schemas/2.3.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab",
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double",
      "semicolons": "always"
    }
  }
}
```

### Translation Files Structure
```json
// src/i18n/cs.json
{
  "site.title": "TEMP-COAT TC101 | Union B+C",
  "site.description": "Tekuta keramicka tepelna izolace pro prumysl a stavebnictvi",
  "nav.home": "Domov",
  "nav.product": "Produkt TC101",
  "nav.faq": "FAQ",
  "nav.certificates": "Certifikaty",
  "nav.contact": "Kontakt",
  "nav.language": "English",
  "footer.company": "Union B+C s.r.o.",
  "footer.address": "Jiskrova 1566, Brandys nad Labem, 250 01",
  "footer.phone": "+420 777 832 348",
  "footer.email": "info@unionbc.cz"
}
```

```json
// src/i18n/en.json
{
  "site.title": "TEMP-COAT TC101 | Union B+C",
  "site.description": "Liquid ceramic thermal insulation for industry and construction",
  "nav.home": "Home",
  "nav.product": "Product TC101",
  "nav.faq": "FAQ",
  "nav.certificates": "Certificates",
  "nav.contact": "Contact",
  "nav.language": "Cesky",
  "footer.company": "Union B+C s.r.o.",
  "footer.address": "Jiskrova 1566, Brandys nad Labem, 250 01",
  "footer.phone": "+420 777 832 348",
  "footer.email": "info@unionbc.cz"
}
```

### Cloudflare Pages _redirects (Old Site URLs)
```
# public/_redirects
# Root redirect to Czech (default locale)
/ /cs/ 302

# Old Czech pages -> new Czech pages (301 permanent)
/index.html /cs/ 301
/home.html /cs/ 301
/tepelna-izolace---tc-101.html /cs/produkt/ 301
/o-tekute-izolaci.html /cs/produkt/ 301
/jak-to-funguje-.html /cs/produkt/ 301
/temp-coat-vyhody.html /cs/produkt/ 301
/faq.html /cs/faq/ 301
/certifikaty.html /cs/certifikaty/ 301
/certifikat-usa.html /cs/certifikaty/ 301
/kontakty.html /cs/kontakt/ 301
/nase-testy.html /cs/certifikaty/ 301
/media.html /cs/ 301
/ostatni.html /cs/ 301
/quick-gun.html /cs/ 301
/zvukova-izolace---silent-running.html /cs/ 301
/bezoplachovy-odrezova----q2.html /cs/ 301
/polski.html /cs/ 301
/imsitemap.html /cs/ 301

# Old English pages -> new English pages (301 permanent)
/eng/index2.html /en/ 301
/eng/insulating-coating---tc-101.html /en/product/ 301
/eng/faq.html /en/faq/ 301
/eng/certificates.html /en/certificates/ 301
/eng/certifikat-usa.html /en/certificates/ 301
/eng/contacts.html /en/contact/ 301
/eng/others---other-brands.html /en/ 301
/eng/others---temp-coat-brand.html /en/ 301
/eng/quick-gun.html /en/ 301
/eng/-silent-running.html /en/ 301
/eng/imsitemap.html /en/ 301

# Old sitemap
/sitemap.xml /sitemap-index.xml 301

# PHP pages (old site had these)
/pro-distributory.php /cs/ 301
```

### Wrangler Configuration (Optional, for CLI deploy)
```jsonc
// wrangler.jsonc
// Source: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/
{
  "name": "unionbc-website",
  "compatibility_date": "2026-02-13",
  "pages_build_output_dir": "./dist"
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `@astrojs/tailwind` integration | `@tailwindcss/vite` Vite plugin | Tailwind v4.0 (Jan 2025) | **Must change config.** Remove `@astrojs/tailwind` from integrations. Add to `vite.plugins` instead. |
| `tailwind.config.js` for theming | `@theme` directive in CSS | Tailwind v4.0 (Jan 2025) | **Design tokens are CSS-first.** No JS config file needed. Automatic content detection (no `content` array). |
| Biome v1.x | Biome v2.3 | Biome v2.0 (2025) | **Breaking config changes.** Run `biome migrate --write`. New type-aware linting, monorepo support, experimental Astro file support. |
| pnpm v9.x | pnpm v10.x | pnpm v10.0 (late 2025) | Minor -- mostly internal improvements. Commands are the same. |
| Astro 4.x i18n | Astro 5.x i18n (stable) | Astro 5.0 (Dec 2024) | i18n API is stable and mature. `getRelativeLocaleUrl()` and other helpers well-documented. |
| Manual font hosting | `@fontsource-variable/*` packages | Ongoing | Variable fonts preferred over static weights. Single WOFF2 file covers all weights. |

**Deprecated/outdated:**
- `@astrojs/tailwind`: Deprecated for Tailwind v4. Only works with Tailwind v3.x.
- `tailwind.config.js` / `tailwind.config.ts`: Not needed with Tailwind v4. Configuration is CSS-first.
- Biome v1 config format: Must be migrated to v2 with `biome migrate`.
- `<ViewTransitions />` component: Renamed to `<ClientRouter />` in recent Astro versions.

## Old Site URL Inventory

Complete inventory of old site URLs that need 301 redirects. Sourced from filesystem and `sitemap.xml` at `C:\Users\Evgenij Bogdanovič\Documents\web\www\tcold\`.

### Czech Pages (18 files)
| Old URL | Content | New Destination |
|---------|---------|-----------------|
| `/index.html` | Homepage (redirect) | `/cs/` |
| `/home.html` | Homepage content | `/cs/` |
| `/tepelna-izolace---tc-101.html` | TC101 product page | `/cs/produkt/` |
| `/o-tekute-izolaci.html` | About liquid insulation | `/cs/produkt/` |
| `/jak-to-funguje-.html` | How it works | `/cs/produkt/` |
| `/temp-coat-vyhody.html` | TC101 advantages | `/cs/produkt/` |
| `/faq.html` | FAQ | `/cs/faq/` |
| `/certifikaty.html` | Certificates | `/cs/certifikaty/` |
| `/certifikat-usa.html` | USA certificate | `/cs/certifikaty/` |
| `/nase-testy.html` | Test results | `/cs/certifikaty/` |
| `/kontakty.html` | Contact page | `/cs/kontakt/` |
| `/media.html` | Media/video | `/cs/` |
| `/ostatni.html` | Other products | `/cs/` |
| `/quick-gun.html` | Quick Gun product (out of scope) | `/cs/` |
| `/zvukova-izolace---silent-running.html` | Silent Running (out of scope) | `/cs/` |
| `/bezoplachovy-odrezova----q2.html` | Q2 product (out of scope) | `/cs/` |
| `/polski.html` | Polish page | `/cs/` |
| `/imsitemap.html` | HTML sitemap | `/cs/` |

### English Pages (11 files)
| Old URL | Content | New Destination |
|---------|---------|-----------------|
| `/eng/index2.html` | English homepage | `/en/` |
| `/eng/insulating-coating---tc-101.html` | TC101 product page | `/en/product/` |
| `/eng/faq.html` | FAQ | `/en/faq/` |
| `/eng/certificates.html` | Certificates | `/en/certificates/` |
| `/eng/certifikat-usa.html` | USA certificate | `/en/certificates/` |
| `/eng/contacts.html` | Contact | `/en/contact/` |
| `/eng/others---other-brands.html` | Other brands | `/en/` |
| `/eng/others---temp-coat-brand.html` | Other TC products | `/en/` |
| `/eng/quick-gun.html` | Quick Gun (out of scope) | `/en/` |
| `/eng/-silent-running.html` | Silent Running (out of scope) | `/en/` |
| `/eng/imsitemap.html` | HTML sitemap | `/en/` |

### Other Resources
| Old URL | Type | Action |
|---------|------|--------|
| `/pro-distributory.php` | PHP login page | 301 to `/cs/` |
| `/sitemap.xml` | Old sitemap | 301 to new sitemap |
| `/files/*` | PDFs, documents | Preserve paths or redirect to `/documents/` |
| `/images/*` | Product images | Not needed (new images will be used) |

**Total redirects needed:** ~31 static redirects (well within Cloudflare Pages' 2000 limit).

## Open Questions

1. **View Transitions -- include in Phase 1 or defer?**
   - What we know: Astro has built-in `<ClientRouter />` for SPA-like page transitions. Zero JS cost for static pages. Adds polish to language switching.
   - What's unclear: Whether it interacts poorly with the language switcher (switching from /cs/ to /en/ is a cross-page navigation). Browser support is broad but not universal.
   - Recommendation: Add `<ClientRouter />` to the layout in Phase 1 as a progressive enhancement. It can be removed with one line if issues arise.

2. **Font pairing confirmation**
   - What we know: Space Grotesk (headings) + Inter (body) both support Czech diacritics. Space Grotesk was designed by Czech designer Florian Karsten.
   - What's unclear: How the pairing looks at various sizes on the dark theme. This needs visual testing.
   - Recommendation: Install both fonts in Phase 1. Test with real Czech content. Can swap fonts easily since they're centralized in `@theme`.

3. **Cloudflare Workers vs Pages for this project**
   - What we know: Cloudflare is moving towards Workers as the unified platform (their docs say "Cloudflare recommends Workers over Pages for new projects"). For pure static output, Pages still works fine.
   - What's unclear: Whether Pages will be deprecated in favor of Workers.
   - Recommendation: Use Cloudflare Pages for now. It is simpler for static sites. If Cloudflare deprecates Pages, migration to Workers is straightforward since the output is the same static files.

4. **Old site domain DNS configuration**
   - What we know: `unionbc.cz` is the existing domain. It currently points to some hosting provider.
   - What's unclear: Current DNS provider, whether Cloudflare will manage DNS or just Pages, whether `www.unionbc.cz` and `unionbc.cz` both need to work.
   - Recommendation: Plan to use Cloudflare DNS (free) for the domain. Configure both apex (`unionbc.cz`) and `www` subdomain. This is a deployment-time task, not a code task.

## Sources

### Primary (HIGH confidence)
- [Astro i18n Routing Docs](https://docs.astro.build/en/guides/internationalization/) - i18n configuration, routing API, helper functions
- [Astro i18n API Reference](https://docs.astro.build/en/reference/modules/astro-i18n/) - Complete `astro:i18n` module API
- [Tailwind CSS Astro Installation Guide](https://tailwindcss.com/docs/guides/astro) - Vite plugin setup, `@import "tailwindcss"`, no `@astrojs/tailwind`
- [Tailwind CSS @theme Documentation](https://tailwindcss.com/docs/theme) - Design tokens, CSS-first configuration, all namespaces
- [Astro Cloudflare Deployment Guide](https://docs.astro.build/en/guides/deploy/cloudflare/) - Static deployment, no adapter needed, build settings
- [Cloudflare Pages _redirects](https://developers.cloudflare.com/pages/configuration/redirects/) - Redirect file syntax, limitations (2000 static + 100 dynamic)
- [Cloudflare Pages Astro Guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) - Dashboard configuration, NODE_VERSION env var
- [@astrojs/preact Docs](https://docs.astro.build/en/guides/integrations-guide/preact/) - v4.1.3, installation, hydration directives
- [Biome v2 Release Blog](https://biomejs.dev/blog/biome-v2/) - Breaking changes, migration, type-aware linting, Astro support

### Secondary (MEDIUM confidence)
- [Astro Releases (GitHub)](https://github.com/withastro/astro/releases) - Current stable: 5.17.x
- [Astro January 2026 Blog](https://astro.build/blog/whats-new-january-2026/) - Latest features and version info
- [Biome 2026 Roadmap](https://biomejs.dev/blog/roadmap-2026/) - Planned Astro/Vue/Svelte support improvements
- [Space Grotesk by Florian Karsten](https://fonts.floriankarsten.com/space-grotesk) - Czech diacritics support confirmed, 63 languages
- [Fontsource Inter](https://fontsource.org/fonts/inter/install) - Variable font installation
- [astro-seo npm](https://www.npmjs.com/package/astro-seo) - v1.1.0, actively maintained (last publish: Jan 2026)

### Tertiary (LOW confidence)
- Astro 6 beta status - Astro 6 is in beta (Feb 2026). Avoid for production. Monitor for stable release timeline.
- Cloudflare Pages vs Workers future - Cloudflare recommends Workers for new projects. Pages still supported. Migration path is straightforward.

### Old Site Analysis (HIGH confidence)
- Old site files at `C:\Users\Evgenij Bogdanovič\Documents\web\www\tcold\` - Direct filesystem analysis
- `sitemap.xml` - 18 Czech URLs, timestamps from 2012-12-06
- English pages at `\www\tcold\eng\` - 11 HTML files

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All versions verified against current official sources. Astro 5.17.x, Tailwind CSS v4 Vite plugin, Biome v2.3, pnpm v10.
- Architecture: HIGH - i18n routing is built-in Astro, Tailwind @theme is official v4 approach, patterns are from official docs.
- Pitfalls: HIGH - Tailwind v4 breaking changes are well-documented. Biome v2 migration path is clear. Cloudflare NODE_VERSION is a known issue.
- Old site inventory: HIGH - Direct filesystem analysis of all HTML files and sitemap.xml.

**Research date:** 2026-02-13
**Valid until:** 2026-03-15 (stable stack, low churn expected)
