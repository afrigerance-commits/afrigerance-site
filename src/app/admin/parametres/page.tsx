import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Paramètres", robots: { index: false } };

export default function AdminParametresPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Paramètres du site</h1>
      <Badge variant="muted" className="w-fit">
        Lecture seule pour l’instant
      </Badge>
      <p className="text-sm text-muted">
        Ces réglages proviennent aujourd’hui de <code className="rounded bg-surface-muted px-1">src/lib/site-config.ts</code>,
        modifiable directement dans le code pour garder le nom de marque, les liens sociaux et les menus facilement
        configurables avant de brancher une table <code className="rounded bg-surface-muted px-1">site_settings</code> et un
        formulaire d’administration dédié — voir docs/BILAN.md.
      </p>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border p-4">
          <dt className="text-xs text-muted">Nom (provisoire)</dt>
          <dd className="font-medium">{siteConfig.name}</dd>
        </div>
        <div className="rounded-lg border border-border p-4">
          <dt className="text-xs text-muted">Référentiel juridique</dt>
          <dd className="font-medium">École {siteConfig.madhhab.name}</dd>
        </div>
        <div className="rounded-lg border border-border p-4">
          <dt className="text-xs text-muted">Chaîne YouTube</dt>
          <dd className="font-medium">{siteConfig.social.youtube || "Non configurée"}</dd>
        </div>
      </dl>
    </div>
  );
}
