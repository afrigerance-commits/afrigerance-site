import { getPublishedArticles } from "@/lib/data/published-articles";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = (await getPublishedArticles())
    .map(
      (a) => `
    <item>
      <title>${escapeXml(a.titre)}</title>
      <link>${siteConfig.url}/blog/${a.slug}</link>
      <guid>${siteConfig.url}/blog/${a.slug}</guid>
      <description>${escapeXml(a.resume)}</description>
      ${a.datePublication ? `<pubDate>${new Date(a.datePublication).toUTCString()}</pubDate>` : ""}
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)} — Blog</title>
    <link>${siteConfig.url}/blog</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>fr</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
