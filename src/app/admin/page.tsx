import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { EditorialStatusBadge } from "@/components/islamic/reliability-badge";
import { editorialStatuses } from "@/lib/site-config";

export const metadata: Metadata = { title: "Tableau de bord", robots: { index: false } };

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: articles } = await supabase.from("articles").select("statut");
  const counts = editorialStatuses.reduce<Record<string, number>>((acc, status) => {
    acc[status] = articles?.filter((a) => a.statut === status).length ?? 0;
    return acc;
  }, {});

  const pendingReview = (counts["en_cours_de_verification"] ?? 0) + (counts["references_a_completer"] ?? 0);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Tableau de bord</h1>
        <p className="mt-1 text-sm text-muted">Vue d’ensemble de l’activité éditoriale.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-5">
          <p className="text-2xl font-semibold">{articles?.length ?? 0}</p>
          <p className="text-sm text-muted">Articles au total</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-semibold">{counts["publie"] ?? 0}</p>
          <p className="text-sm text-muted">Publiés</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-semibold">{pendingReview}</p>
          <p className="text-sm text-muted">En attente de vérification</p>
        </Card>
        <Card className="p-5">
          <p className="text-2xl font-semibold">{counts["brouillon"] ?? 0}</p>
          <p className="text-sm text-muted">Brouillons</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Répartition par statut</h2>
        <ul className="flex flex-col gap-2">
          {editorialStatuses.map((status) => (
            <li key={status} className="flex items-center justify-between text-sm">
              <EditorialStatusBadge status={status} />
              <span className="font-medium">{counts[status] ?? 0}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/brouillons" className="text-sm font-medium text-primary hover:underline">
          Relire les quatre articles sourcés →
        </Link>
        <Link href="/admin/articles/nouveau" className="text-sm font-medium text-primary hover:underline">
          Rédiger un nouvel article →
        </Link>
        <Link href="/admin/videos" className="text-sm font-medium text-primary hover:underline">
          Ajouter une vidéo →
        </Link>
      </div>
    </div>
  );
}
