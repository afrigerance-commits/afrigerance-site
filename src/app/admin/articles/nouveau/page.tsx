import type { Metadata } from "next";
import { ArticleCreateForm } from "@/components/admin/article-create-form";

export const metadata: Metadata = { title: "Nouvel article", robots: { index: false } };

export default function NewArticlePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Nouvel article</h1>
      <p className="text-sm text-muted">
        Le brouillon est enregistré avec le statut « Brouillon ». Les statuts « Approuvé » et « Publié » exigent un
        compte administrateur ou responsable scientifique (appliqué côté base de données).
      </p>
      <ArticleCreateForm />
    </div>
  );
}
