import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { VideoCard } from "@/components/content/video-card";
import { YoutubeIcon } from "@/components/icons/youtube-icon";
import { videos } from "@/lib/data/videos";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Vidéothèque",
  description: "Les enseignements vidéo du fondateur, hébergés sur YouTube.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal className="flex flex-col gap-4 text-center">
        <span className="mx-auto text-sm font-medium text-accent-text">Vidéothèque</span>
        <h1 className="font-display text-4xl font-semibold sm:text-5xl">Nos enseignements en vidéo</h1>
        <p className="mx-auto max-w-2xl text-muted">
          Les vidéos restent hébergées sur YouTube ; cette page facilite leur découverte et leur mise en lien avec
          les articles et cours de la plateforme.
        </p>
        {siteConfig.social.youtube && (
          <Link
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto inline-flex w-fit items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-accent hover:text-primary"
          >
            <YoutubeIcon className="h-4 w-4" /> Voir la chaîne YouTube
          </Link>
        )}
      </Reveal>
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.filter((video) => video.youtubeId).map((video, i) => (
          <Reveal key={video.slug} delay={i * 0.05}>
            <VideoCard video={video} />
          </Reveal>
        ))}
      </div>
      {!videos.some((video) => video.youtubeId) && (
        <p className="mt-8 rounded-xl border border-border bg-surface p-6 text-center text-sm text-muted">
          Les vidéos seront ajoutées lorsque leurs liens authentiques auront été fournis.
        </p>
      )}
    </div>
  );
}
