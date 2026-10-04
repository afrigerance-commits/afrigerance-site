"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { extractYoutubeId } from "@/lib/youtube";

export interface VideoFormState {
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

export async function addVideo(_prevState: VideoFormState, formData: FormData): Promise<VideoFormState> {
  const titre = String(formData.get("titre") ?? "").trim();
  const lien = String(formData.get("lien") ?? "").trim();
  if (!titre || !lien) return { error: "Le titre et le lien YouTube sont requis." };
  const youtubeId = extractYoutubeId(lien);
  if (!youtubeId) return { error: "Lien YouTube invalide. Utilisez une URL de vidéo, Shorts ou un identifiant de 11 caractères." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Reconnectez-vous pour ajouter une vidéo." };
  const { data, error } = await supabase.from("videos").insert({
    titre,
    slug: `${slugify(titre)}-${Date.now().toString(36)}`,
    description: String(formData.get("description") ?? ""),
    youtube_id: youtubeId,
    published_at: new Date().toISOString(),
  }).select("id").single();

  if (error || !data) return { error: `Impossible d’ajouter la vidéo : ${error?.message ?? "enregistrement non confirmé"}` };

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  redirect("/admin/videos?added=1");
}

export async function deleteVideo(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) throw new Error(`Suppression impossible : ${error.message}`);
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}
