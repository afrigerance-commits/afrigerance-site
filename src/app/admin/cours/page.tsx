import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { EditorialStatusBadge } from "@/components/islamic/reliability-badge";

export const metadata: Metadata = { title: "Cours", robots: { index: false } };

export default async function AdminCoursPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase.from("courses").select("id, titre, niveau, statut").order("titre");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Cours</h1>
      <p className="text-sm text-muted">
        Structure des cours et de leurs leçons (Académie de fiqh malikite et futures disciplines). L’éditeur de
        leçon complet (texte arabe, traduction, QCM, ressources complémentaires) est prévu dans une prochaine
        itération — voir docs/BILAN.md.
      </p>
      {courses && courses.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {courses.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3 text-sm">
              <span className="font-medium">
                {c.titre} <span className="text-muted">({c.niveau})</span>
              </span>
              <EditorialStatusBadge status={c.statut} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">Aucun cours enregistré pour l’instant.</p>
      )}
    </div>
  );
}
