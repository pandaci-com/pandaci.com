import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: "**/*.mdoc",
      base: "./src/content/docs",
    }),
  }),
  legal: defineCollection({
    loader: glob({
      pattern: "**/*.mdoc",
      base: "./src/content/legal",
    }),
  }),
};
