"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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

export async function createArticle(_prevState: ArticleFormState, formData: FormData): Promise<ArticleFormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Vous devez être connecté." };

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
  const supabase = await createClient();

  const statut = String(formData.get("statut") ?? "brouillon") as EditorialStatusDb;

  const { error } = await supabase
    .from("articles")
    .update({
      titre: String(formData.get("titre") ?? ""),
      resume: String(formData.get("resume") ?? ""),
      contenu_html: String(formData.get("contenu_html") ?? ""),
      statut,
    })
    .eq("id", id);

  if (error) {
    return {
      error: error.message.includes("Seul un administrateur")
        ? error.message
        : `Impossible d’enregistrer : ${error.message}`,
    };
  }

  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
  return {};
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}
