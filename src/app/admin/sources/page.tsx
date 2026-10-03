import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { SourceTypeBadge } from "@/components/islamic/reliability-badge";

export const metadata: Metadata = { title: "Sources", robots: { index: false } };

export default async function AdminSourcesPage() {
  const supabase = await createClient();
  const { data: sources } = await supabase.from("sources").select("id, type, titre, auteur").order("titre");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Sources</h1>
      <p className="text-sm text-muted">
        Bibliothèque de références (Coran, recueils de hadith, ouvrages de fiqh et d’histoire). La création de
        nouvelles sources et de citations précises (sourate/verset, numéro de hadith, page) se fait pour l’instant
        directement via l’éditeur SQL Supabase ou une prochaine itération de cette interface — voir
        docs/BILAN.md.
      </p>
      {sources && sources.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {sources.map((s) => (
            <li key={s.id} className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm">
              <SourceTypeBadge type={s.type} />
              <span className="font-medium">{s.titre}</span>
              {s.auteur && <span className="text-muted">— {s.auteur}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">Aucune source enregistrée pour l’instant.</p>
      )}
    </div>
  );
}
