import type { MetadataRoute } from "next";
import { siteConfig, disciplines } from "@/lib/site-config";
import { getPublishedArticles } from "@/lib/data/published-articles";
import { invocationTopics } from "@/lib/data/invocation-topics";
import { books } from "@/lib/data/books";
import { prophets } from "@/lib/data/prophets";
import { scholars } from "@/lib/data/scholars";
import { siraEvents } from "@/lib/data/sira";
import { fiqhCourses } from "@/lib/data/fiqh";
import { learningPaths } from "@/lib/data/learning-paths";
import { getPartitions } from "@/lib/quran/partitions";
import { getChapters } from "@/lib/quran/data";
import { hadithCollections, getBooks } from "@/lib/hadith/data";

const staticRoutes = [
  "",
  "/explorer-le-savoir",
  "/fiqh",
  "/fiqh/malikite",
  "/coran",
  "/hadith",
  "/invocations",
  "/invocations/dettes-difficultes-financieres",
  "/sira",
  "/prophetes",
  "/routine",
  "/compagnons",
  "/bibliotheque",
  "/videos",
  "/blog",
  "/apprendre",
  "/a-propos",
  "/a-propos/referentiel-malikite",
  "/a-propos/politique-editoriale",
  "/contact",
  "/confidentialite",
  "/conditions-utilisation",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string) => `${siteConfig.url}${path}`;

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: url(path),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  invocationTopics.forEach(topic => entries.push({ url: url(`/invocations/${topic.slug}`), changeFrequency: "monthly" }));
  prophets.forEach(p => entries.push({ url: url(`/prophetes/${p.slug}`) }));
  disciplines.forEach((d) => entries.push({ url: url(`/explorer-le-savoir/${d.slug}`) }));
  getChapters().forEach((c) => entries.push({ url: url(`/coran/${c.number}`), changeFrequency: "yearly" }));
  (["juz", "hizb"] as const).forEach(type => getPartitions(type).forEach(p => entries.push({ url: url(`/coran/lecture/${type}/${p.number}`), changeFrequency: "yearly" })));
  hadithCollections.forEach((c) => {
    entries.push({ url: url(`/hadith/${c.slug}`) });
    getBooks(c.slug).forEach((b) => entries.push({ url: url(`/hadith/${c.slug}/${b.number}`), changeFrequency: "yearly" }));
  });
  // Seul le contenu publié a vocation à être indexé.
  (await getPublishedArticles()).forEach((a) => entries.push({ url: url(`/blog/${a.slug}`) }));
  books.forEach((b) => entries.push({ url: url(`/bibliotheque/${b.slug}`) }));
  scholars.filter((s) => s.statut === "publie").forEach((s) => entries.push({ url: url(`/compagnons/${s.slug}`) }));
  siraEvents.filter((e) => e.statut === "publie").forEach((e) => entries.push({ url: url(`/sira/${e.slug}`) }));
  learningPaths.forEach((p) => {
    entries.push({ url: url(`/apprendre/${p.slug}`) });
    p.lessons.forEach(lesson => entries.push({ url: url(`/apprendre/${p.slug}/${lesson.slug}`) }));
  });
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
