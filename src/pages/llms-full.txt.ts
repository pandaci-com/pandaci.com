import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const header = `
<SYSTEM>This is the full developer documentation for PandaCI (https://pandaci.com).</SYSTEM>

# Start of PandaCI documentation`;

export const GET: APIRoute = async ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);

  let txt = header.trim();

  const docs = await getCollection("docs").then((docs) =>
    docs.sort((a, b) => {
      const aParts = a.id.split(".");
      const bParts = b.id.split(".");

      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        if (aParts[i] === bParts[i]) {
          continue;
        }
        return aParts[i].localeCompare(bParts[i]);
      }

      return 0;
    }),
  );

  for (const doc of docs) {
    const link = ("/" + doc.id).replace(/\/\d{2}-/g, "/").toLowerCase();
    txt += `\n\n# [${doc.data.title}](https://pandaci.com/docs${link})\n\n${doc.data.description}\n\n${doc.body}`;
  }

  return new Response(txt);
};
