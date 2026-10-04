"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { editorialDrafts } from "@/lib/data/editorial-drafts";
import type { EditorialStatusDb } from "@/lib/supabase/database.types";

export interface ArticleFormState {
  error?: string;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function getEditor() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: roles, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
  if (error || !roles?.some(({ role }) => ["administrateur", "redacteur", "verificateur", "responsable_scientifique"].includes(role))) return null;
  return { supabase, user, canPublish: roles.some(({ role }) => role === "administrateur" || role === "responsable_scientifique") };
}

export async function importEditorialDraft(slug: string, _prevState: ArticleFormState): Promise<ArticleFormState> {
  void _prevState;
  const editor = await getEditor();
  if (!editor) return { error: "Accès éditorial requis." };
  const draft = editorialDrafts.find((item) => item.slug === slug);
  if (!draft) return { error: "Brouillon introuvable." };

  const { data: existing, error: lookupError } = await editor.supabase.from("articles").select("id").eq("slug", slug).maybeSingle();
  if (lookupError) return { error: lookupError.message };
  if (existing) redirect(`/admin/articles/${existing.id}`);

  const { data, error } = await editor.supabase.from("articles").insert({
    slug: draft.slug,
    titre: draft.titre,
    resume: draft.resume,
    contenu_html: draft.contenuHtml,
    author_id: editor.user.id,
    temps_lecture_minutes: draft.tempsLectureMinutes,
    statut: "en_cours_de_verification",
    is_demo: false,
  }).select("id").single();
  if (error) return { error: `Import impossible : ${error.message}` };
  revalidatePath("/admin/articles");
  redirect(`/admin/articles/${data.id}`);
}

export async function createArticle(_prevState: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
  const editor = await getEditor();
  if (!editor) return { error: "Accès éditorial requis." };
  const { supabase, user } = editor;

  const titre = String(formData.get("titre") ?? "").trim();
  if (!titre) return { error: "Le titre est requis." };

  const { data, error } = await supabase
    .from("articles")
    .insert({
      titre,
      slug: slugify(titre),
      resume: String(formData.get("resume") ?? ""),
      contenu_html: String(formData.get("contenu_html") ?? ""),
      author_id: user.id,
      statut: "brouillon",
    })
    .select("id")
    .single();

  if (error) return { error: `Impossible de créer l’article : ${error.message}` };

  revalidatePath("/admin/articles");
  redirect(`/admin/articles/${data.id}`);
}

export async function updateArticle(id: string, _prevState: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
  const editor = await getEditor();
  if (!editor) return { error: "Accès éditorial requis." };
  const { supabase } = editor;

  const statut = String(formData.get("statut") ?? "brouillon") as EditorialStatusDb;
  const allowed: EditorialStatusDb[] = ["brouillon", "references_a_completer", "en_cours_de_verification", "verifie", "approuve", "publie", "a_reviser", "archive"];
  if (!allowed.includes(statut)) return { error: "Statut invalide." };
  if (["approuve", "publie"].includes(statut)) {
    if (!editor.canPublish) return { error: "Seul un administrateur ou un responsable scientifique peut approuver ou publier." };
    if (formData.get("review_confirmed") !== "yes") return { error: "Confirmez la relecture du texte et de ses sources avant publication." };
  }

  const { data: existing, error: readError } = await supabase.from("articles").select("statut, is_demo, published_at").eq("id", id).maybeSingle();
  if (readError || !existing) return { error: "Article introuvable ou accès refusé." };
  if (statut === "publie" && existing.is_demo) return { error: "Un article de démonstration ne peut pas être publié." };
  const titre = String(formData.get("titre") ?? "").trim();
  const contenu = String(formData.get("contenu_html") ?? "").trim();
  if (!titre || !contenu) return { error: "Titre et contenu requis." };

  const { data: saved, error } = await supabase
    .from("articles")
    .update({
      titre,
      resume: String(formData.get("resume") ?? ""),
      contenu_html: contenu,
      statut,
      published_at: statut === "publie" ? existing.published_at ?? new Date().toISOString() : null,
    })
    .eq("id", id)
    .select("id, statut")
    .maybeSingle();

  if (error) {
    return {
      error: error.message.includes("Seul un administrateur")
        ? error.message
        : `Impossible d’enregistrer : ${error.message}`,
    };
  }
  if (!saved || saved.statut !== statut) return { error: "Le statut n’a pas été enregistré. Vérifiez vos droits et réessayez." };

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/rss.xml");
  redirect(`/admin/articles/${id}`);
}

export async function deleteArticle(id: string) {
  const editor = await getEditor();
  if (!editor) throw new Error("Accès éditorial requis.");
  const { error } = await editor.supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/rss.xml");
  redirect("/admin/articles");
}
