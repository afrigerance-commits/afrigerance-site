import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { EditorialStatusBadge } from "@/components/islamic/reliability-badge";

export const metadata: Metadata = { title: "Articles", robots: { index: false } };

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, titre, statut, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Articles</h1>
        <Button asChild>
          <Link href="/admin/articles/nouveau">
            <Plus className="h-4 w-4" /> Nouvel article
          </Link>
        </Button>
      </div>

      {!articles || articles.length === 0 ? (
        <p className="text-sm text-muted">Aucun article pour l’instant.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-surface-muted text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-4 py-3">Titre</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Mis à jour</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {articles.map((article) => (
                <tr key={article.id} className="transition-colors hover:bg-surface-muted/50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/articles/${article.id}`} className="font-medium hover:text-primary">
                      {article.titre}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <EditorialStatusBadge status={article.statut} />
                  </td>
                  <td className="px-4 py-3 text-muted">{new Date(article.updated_at).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
