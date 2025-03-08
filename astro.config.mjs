// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

import markdoc from "@astrojs/markdoc";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://pandaci.com",
  vite: {
    plugins: [tailwind()],
  },
  redirects: {
    "/docs": "/docs/platform/overview/quick-start",
  },
  integrations: [svelte(), markdoc(), mdx(), sitemap()],
});