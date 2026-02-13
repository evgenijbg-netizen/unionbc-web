import cs from "./cs.json";
import en from "./en.json";

const translations = { cs, en } as const;

export type Locale = keyof typeof translations;
export const locales: Locale[] = ["cs", "en"];
export const defaultLocale: Locale = "cs";

export function t(locale: Locale, key: string): string {
	const dict = translations[locale] as Record<string, string>;
	// Direct lookup for flat dot-separated keys (e.g., "nav.home")
	if (key in dict) {
		return dict[key];
	}
	return key; // Fallback: return key itself
}

export function getLocaleFromUrl(url: URL): Locale {
	const [, locale] = url.pathname.split("/");
	if (locale in translations) return locale as Locale;
	return defaultLocale;
}
