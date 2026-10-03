"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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

function extractYoutubeId(input: string) {
  const trimmed = input.trim();
  const match = trimmed.match(/(?:youtu\.be\/|v=|embed\/)([a-zA-Z0-9_-]{6,})/);
  return match ? match[1] : trimmed;
}

export async function addVideo(_prevState: VideoFormState, formData: FormData): Promise<VideoFormState> {
  const titre = String(formData.get("titre") ?? "").trim();
  const lien = String(formData.get("lien") ?? "").trim();
  if (!titre || !lien) return { error: "Le titre et le lien YouTube sont requis." };

  const supabase = await createClient();
  const { error } = await supabase.from("videos").insert({
    titre,
    slug: `${slugify(titre)}-${Date.now().toString(36)}`,
    description: String(formData.get("description") ?? ""),
    youtube_id: extractYoutubeId(lien),
    published_at: new Date().toISOString(),
  });

  if (error) return { error: `Impossible d’ajouter la vidéo : ${error.message}` };

  revalidatePath("/admin/videos");
  revalidatePath("/videos");
  return {};
}

export async function deleteVideo(id: string) {
  const supabase = await createClient();
  await supabase.from("videos").delete().eq("id", id);
  revalidatePath("/admin/videos");
  revalidatePath("/videos");
}
