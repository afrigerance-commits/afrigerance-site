import type { MetadataRoute } from "next";
import { siteConfig, disciplines } from "@/lib/site-config";
import { articles } from "@/lib/data/articles";
import { books } from "@/lib/data/books";
import { scholars } from "@/lib/data/scholars";
import { siraEvents } from "@/lib/data/sira";
import { fiqhCourses } from "@/lib/data/fiqh";
import { learningPaths } from "@/lib/data/learning-paths";

const staticRoutes = [
  "",
  "/explorer-le-savoir",
  "/fiqh",
  "/fiqh/malikite",
  "/sira",
  "/compagnons",
  "/bibliotheque",
  "/videos",
  "/blog",
  "/apprendre",
  "/a-propos",
  "/a-propos/fondateur",
  "/a-propos/referentiel-malikite",
  "/a-propos/politique-editoriale",
  "/contact",
  "/confidentialite",
  "/conditions-utilisation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: url(path),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  disciplines.forEach((d) => entries.push({ url: url(`/explorer-le-savoir/${d.slug}`) }));
  // Seul le contenu publié a vocation à être indexé.
  articles.filter((a) => a.statut === "publie").forEach((a) => entries.push({ url: url(`/blog/${a.slug}`) }));
  books.forEach((b) => entries.push({ url: url(`/bibliotheque/${b.slug}`) }));
  scholars.filter((s) => s.statut === "publie").forEach((s) => entries.push({ url: url(`/compagnons/${s.slug}`) }));
  siraEvents.filter((e) => e.statut === "publie").forEach((e) => entries.push({ url: url(`/sira/${e.slug}`) }));
  learningPaths.forEach((p) => entries.push({ url: url(`/apprendre/${p.slug}`) }));
  fiqhCourses
    .filter((c) => c.statut === "publie")
    .forEach((c) => {
      entries.push({ url: url(`/fiqh/malikite/${c.slug}`) });
      c.lessons
        .filter((l) => l.statut === "publie")
        .forEach((l) => entries.push({ url: url(`/fiqh/malikite/${c.slug}/${l.slug}`) }));
    });

  return entries;
}
