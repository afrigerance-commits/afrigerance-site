import type { Metadata } from "next";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { VideoAddForm } from "@/components/admin/video-add-form";
import { deleteVideo } from "@/lib/actions/videos";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Vidéos", robots: { index: false } };

export default async function AdminVideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase.from("videos").select("id, titre, youtube_id").order("created_at", { ascending: false });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-display text-2xl font-semibold">Vidéos</h1>
      <p className="text-sm text-muted">
        Les vidéos restent hébergées sur YouTube. Collez le lien complet ou l’identifiant ; l’intégration directe via
        l’API YouTube pourra être ajoutée plus tard.
      </p>
      <VideoAddForm />

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
