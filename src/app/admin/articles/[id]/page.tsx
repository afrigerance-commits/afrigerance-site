import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ArticleEditForm } from "@/components/admin/article-edit-form";

export const metadata: Metadata = { title: "Modifier l’article", robots: { index: false } };

export default async function EditArticlePage({ params }: PageProps<"/admin/articles/[id]">) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();

  if (!article) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Modifier l’article</h1>
      <ArticleEditForm article={article} />
    </div>
  );
}
