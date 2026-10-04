import type { MetadataRoute } from "next";
import { connection } from "next/server";
import { routes } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/**
 * Plan du site (pages publiques indexables uniquement).
 * Les adresses absolues reposent sur SITE_URL, lue à chaque requête (aucune reconstruction nécessaire).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const base = siteUrl() ?? new URL("http://localhost:3000");
  const pages: { path: string; priority: number }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.services, priority: 0.9 },
    { path: routes.serviceInfogerance, priority: 0.9 },
    { path: routes.serviceIntegration, priority: 0.9 },
    { path: routes.quote, priority: 0.8 },
    { path: routes.appointment, priority: 0.8 },
    { path: routes.about, priority: 0.7 },
    { path: routes.faq, priority: 0.6 },
    { path: routes.contact, priority: 0.6 },
  ];
  return pages.map(({ path, priority }) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
