// @ts-check
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

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
