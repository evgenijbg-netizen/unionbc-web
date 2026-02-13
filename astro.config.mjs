// @ts-check
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
