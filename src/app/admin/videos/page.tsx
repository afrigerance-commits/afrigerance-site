import type { Metadata } from "next";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { VideoAddForm } from "@/components/admin/video-add-form";
import { deleteVideo } from "@/lib/actions/videos";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = { title: "Vidéos", robots: { index: false } };

export default async function AdminVideosPage({ searchParams }: PageProps<"/admin/videos">) {
  const { added } = await searchParams;
  const supabase = await createClient();
  const { data: videos } = await supabase.from("videos").select("id, titre, youtube_id").order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-2xl font-semibold">Vidéos</h1>
      <p className="text-sm text-muted">
        Collez le lien d’une vidéo YouTube ou d’un Short. Après l’ajout, elle apparaît sur la{" "}
        <Link href="/videos" className="font-medium text-primary underline">vidéothèque publique</Link>.
      </p>
      <VideoAddForm />
      {added === "1" && <p role="status" className="rounded-lg border border-emerald-600/30 bg-emerald-600/10 p-3 text-sm text-emerald-800 dark:text-emerald-200">Vidéo ajoutée et visible dans la vidéothèque publique.</p>}

      {videos && videos.length > 0 && (
        <ul className="flex flex-col gap-2">
          {videos.map((video) => (
            <li key={video.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
              <span>
                {video.titre} <span className="text-muted">({video.youtube_id || "sans lien"})</span>
              </span>
              <form action={deleteVideo.bind(null, video.id)}>
                <Button type="submit" variant="ghost" size="icon" aria-label="Supprimer">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
