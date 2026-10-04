import Link from "next/link";
import { Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import type { Video } from "@/lib/types/content";

export function VideoCard({ video }: { video: Video }) {
  const hasLink = Boolean(video.youtubeId);
  const thumbnail = hasLink
    ? `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
    : null;

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative flex aspect-video items-center justify-center bg-surface-muted">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted">
            <YoutubeIcon className="h-8 w-8" />
            <span className="text-xs">Vidéo à configurer</span>
          </div>
        )}
        {hasLink && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink-950/20">
            <Play className="h-10 w-10 text-ivory-50" fill="currentColor" />
          </div>
        )}
      </div>
      <CardContent className="flex flex-1 flex-col gap-2 pt-4">
        <Badge variant="outline" className="w-fit">
          {video.categorie}
        </Badge>
        <h3 className="font-display text-base font-semibold leading-snug">{video.titre}</h3>
        <p className="line-clamp-3 text-sm text-muted">{video.description}</p>
        <div className="mt-auto pt-2">
          {hasLink ? (
            <Link
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Regarder sur YouTube <YoutubeIcon className="h-4 w-4" />
            </Link>
          ) : (
            <span className="text-xs text-muted">Lien YouTube non encore configuré par l’administration.</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
