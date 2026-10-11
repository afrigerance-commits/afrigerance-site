import "server-only";
import { books, getBook } from "@/lib/data/books";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { Book } from "@/lib/types/content";
export async function getLibraryBooks():Promise<Book[]> {
  if(!isSupabaseConfigured)return books;
  const client=await createClient();
  const {data,error}=await client.from("books").select("*").eq("published",true);
  // Preserve the local library while the optional schema has not been activated.
  if(error)return books;
  const remote:Book[]=(data||[]).filter(row=>row.droits!=="droits_non_verifies").map(row=>({slug:row.slug,titreFrancais:row.titre_francais,titreOriginal:row.titre_original||row.titre_francais,auteur:row.auteur||"Auteur non précisé",discipline:row.discipline_label||"Bibliothèque",langue:row.langue||"Non précisée",edition:row.edition||undefined,presentation:row.presentation||"",droits:row.droits,lienConsultationExterne:row.lien_consultation_externe||undefined,fichierPdf:row.pdf_path ? `/api/books/${row.slug}/pdf` : undefined,lectureHref:row.pdf_path ? `/bibliotheque/${row.slug}/lire` : undefined}));
  return [...remote,...books.filter(local=>!remote.some(row=>row.slug===local.slug))];
}
export async function getLibraryBook(slug:string){return (await getLibraryBooks()).find(book=>book.slug===slug)||getBook(slug);}
