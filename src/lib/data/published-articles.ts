import { articles } from "@/lib/data/articles";
import { editorialDrafts } from "@/lib/data/editorial-drafts";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import type { Article } from "@/lib/types/content";
import sanitizeHtml from "sanitize-html";

type ArticleRow = Database["public"]["Tables"]["articles"]["Row"];

function fromDatabase(row: ArticleRow): Article {
  const original = editorialDrafts.find((draft) => draft.slug === row.slug);
  return {
    slug: row.slug,
    titre: row.titre,
    categorie: original?.categorie ?? "Article",
    resume: row.resume ?? "",
    contenuHtml: sanitizeHtml(row.contenu_html, {
      allowedTags: ["p", "h2", "h3", "strong", "em", "b", "i", "ul", "ol", "li", "blockquote", "br", "a", "sup"],
      allowedAttributes: { a: ["href", "title"] },
      allowedSchemes: ["http", "https"],
    }),
    auteur: "Rédaction MIRÂTH",
    tempsLectureMinutes: row.temps_lecture_minutes ?? original?.tempsLectureMinutes ?? 4,
    statut: "publie",
    datePublication: row.published_at ?? row.created_at,
    derniereMiseAJour: row.updated_at,
    imageCouverture: row.cover_image_url ?? undefined,
    // Les références des brouillons restent dans le corps de l'article éditable.
    // Ne pas afficher une ancienne liste de sources après une modification en base.
  };
}

/** Lecture en base uniquement pour les articles explicitement publiés. */
export async function getPublishedArticles(): Promise<Article[]> {
  const local = articles.filter((article) => article.statut === "publie" && !article.demonstration);
  if (!isSupabaseConfigured) return local;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("statut", "publie")
    .eq("is_demo", false)
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Lecture des articles publiés impossible : ${error.message}`);
  return [...(data ?? []).map(fromDatabase), ...local.filter((item) => !data?.some((row) => row.slug === item.slug))];
}

export async function getPublishedArticle(slug: string): Promise<Article | undefined> {
  return (await getPublishedArticles()).find((article) => article.slug === slug);
}
