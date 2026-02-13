import type { Locale } from "./utils";

/** Maps logical page name to localized URL slug for each language */
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

/** Returns the localized path for a logical page name */
export function getLocalizedPath(page: string, locale: Locale): string {
	const slug = routeMap[locale]?.[page] ?? page;
	return `/${locale}/${slug ? `${slug}/` : ""}`;
}

/** Converts a path in one locale to the equivalent path in another locale */
export function getAlternatePath(currentPath: string, targetLocale: Locale): string {
	const sourceLocale: Locale = currentPath.startsWith("/en/") ? "en" : "cs";
	const sourceSlug = currentPath.replace(`/${sourceLocale}/`, "").replace(/\/$/, "");

	// Reverse lookup: find the logical page name from the source slug
	const sourceMap = routeMap[sourceLocale];
	const pageKey = Object.entries(sourceMap).find(([, slug]) => slug === sourceSlug)?.[0];

	if (!pageKey) return `/${targetLocale}/`;
	return getLocalizedPath(pageKey, targetLocale);
}
