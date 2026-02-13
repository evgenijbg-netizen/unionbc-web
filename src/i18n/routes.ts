import type { Locale } from "./utils";

/** Maps logical page name to localized URL slug for each language */
export const routeMap: Record<Locale, Record<string, string>> = {
	cs: {
		home: "",
		product: "produkt",
		faq: "faq",
		certificates: "certifikaty",
		applications: "aplikace",
		contact: "kontakt",
	},
	en: {
		home: "",
		product: "product",
		faq: "faq",
		certificates: "certificates",
		applications: "applications",
		contact: "contact",
	},
};

/** Base path from Astro config (e.g. "/unionbc-web" or "") */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Returns the localized path for a logical page name */
export function getLocalizedPath(page: string, locale: Locale): string {
	const slug = routeMap[locale]?.[page] ?? page;
	return `${base}/${locale}/${slug ? `${slug}/` : ""}`;
}

/** Converts a path in one locale to the equivalent path in another locale */
export function getAlternatePath(currentPath: string, targetLocale: Locale): string {
	// Strip base path before matching
	const path = base ? currentPath.replace(base, "") : currentPath;
	const sourceLocale: Locale = path.startsWith("/en/") ? "en" : "cs";
	const sourceSlug = path.replace(`/${sourceLocale}/`, "").replace(/\/$/, "");

	// Reverse lookup: find the logical page name from the source slug
	const sourceMap = routeMap[sourceLocale];
	const pageKey = Object.entries(sourceMap).find(([, slug]) => slug === sourceSlug)?.[0];

	if (!pageKey) return `/${targetLocale}/`;
	return getLocalizedPath(pageKey, targetLocale);
}
