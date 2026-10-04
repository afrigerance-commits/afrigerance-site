import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { siteUrl } from "@/lib/site-url";

/** Les moteurs de recherche n'explorent ni l'administration ni les points d'envoi des formulaires. */
export default async function robots(): Promise<MetadataRoute.Robots> {
  await connection();
  const base = siteUrl();
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ...(base ? { sitemap: new URL("/sitemap.xml", base).toString(), host: base.origin } : {}),
  };
}
