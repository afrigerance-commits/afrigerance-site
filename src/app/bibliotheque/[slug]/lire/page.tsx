import { PdfBookReader } from "@/components/books/pdf-reader";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { OriginalBookReader } from "@/components/books/original-reader";
import { originalBookSlug, originalBookChapters } from "@/lib/books/original";
export async function generateMetadata({params}:PageProps<"/bibliotheque/[slug]/lire">){
 const {slug}=await params;
 if(slug===originalBookSlug)return {title:"Apprendre avec les sources — lecture",alternates:{canonical:`/bibliotheque/${slug}/lire`}};
 return {title:"Lecture d’un ouvrage",alternates:{canonical:`/bibliotheque/${slug}/lire`}};
}
export function generateStaticParams() { return [{ slug: originalBookSlug }]; }
export default async function Page({ params }: PageProps<"/bibliotheque/[slug]/lire">) {
  const { slug } = await params;
  if (slug === originalBookSlug) return <OriginalBookReader slug={slug} chapters={originalBookChapters} />;
  const client = await createClient();
  const { data: book } = await client.from("books").select("titre_francais,page_count,pdf_path,droits").eq("slug",slug).eq("published",true).maybeSingle();
  if(!book?.pdf_path || !["librement_diffusable","diffusion_autorisee"].includes(book.droits)) notFound();
  return <PdfBookReader slug={slug} title={book.titre_francais} pages={book.page_count}/>;
}
