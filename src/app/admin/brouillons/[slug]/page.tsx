import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { editorialDrafts } from "@/lib/data/editorial-drafts";
import { withHeadingIds } from "@/lib/content-html";
import { SourceReferenceList } from "@/components/islamic/source-reference";
import { DraftImportForm } from "@/components/admin/draft-import-form";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Prévisualisation éditoriale", robots: { index: false, follow: false } };

export default async function EditorialDraftPage({ params }: PageProps<"/admin/brouillons/[slug]">) {
  const { slug } = await params;
  const draft = editorialDrafts.find((item) => item.slug === slug);
  if (!draft) notFound();
  const supabase = await createClient();
  const { data: imported } = await supabase.from("articles").select("id, statut").eq("slug", slug).maybeSingle();
  const { html } = withHeadingIds(draft.contenuHtml);

  return (
    <div className="max-w-3xl">
      <Link href="/admin/brouillons" className="text-sm text-primary hover:underline">← Tous les brouillons</Link>
      <div className="my-8 rounded-xl border border-accent/40 bg-surface-muted p-5 text-sm">
        <strong>Prévisualisation interne.</strong> Source et pages repérées dans le PDF original ;
        validation religieuse humaine et décision de publication encore nécessaires.
        {imported ? (
          <p className="mt-3"><Link href={`/admin/articles/${imported.id}`} className="font-semibold text-primary underline">Ouvrir l’article dans l’éditeur ({imported.statut})</Link></p>
        ) : <DraftImportForm slug={slug} />}
      </div>
      <h1 className="font-display text-3xl font-semibold">{draft.titre}</h1>
      <p className="mt-3 text-muted">{draft.resume}</p>
      <div
        className="prose-content mt-10 space-y-4 text-foreground/90 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_p]:leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="mb-4 font-display text-lg font-semibold">Sources à examiner</h2>
        <SourceReferenceList sources={draft.sources ?? []} />
      </section>
    </div>
  );
}
