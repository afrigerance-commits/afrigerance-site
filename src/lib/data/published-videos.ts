import { videos as localVideos } from "@/lib/data/videos";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Video } from "@/lib/types/content";

/** Les vidéos enregistrées dans l'administration alimentent la vidéothèque publique. */
export async function getPublishedVideos(): Promise<Video[]> {
  const local = localVideos.filter((video) => video.youtubeId && !video.demonstration);
  if (!isSupabaseConfigured) return local;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("videos")
    .select("slug, titre, description, youtube_id")
    .eq("is_demo", false)
    .not("published_at", "is", null)
    .order("published_at", { ascending: false });
  if (error) throw new Error(`Lecture des vidéos impossible : ${error.message}`);

  const remote = (data ?? [])
    .filter((row) => /^[\w-]{11}$/.test(row.youtube_id ?? ""))
    .map((row): Video => ({
      slug: row.slug,
      titre: row.titre,
      description: row.description ?? "",
      youtubeId: row.youtube_id!,
      categorie: "Vidéo",
    }));
  return [...remote, ...local.filter((video) => !remote.some((row) => row.slug === video.slug))];
}
