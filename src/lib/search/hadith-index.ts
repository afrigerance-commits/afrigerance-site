import "server-only";
import { hadithCollections, getBooks, getHadithsForBook } from "@/lib/hadith/data";
export interface SearchResult { titre: string; description: string; href: string; type: string; searchText?: string; collection?: string }
let cache: SearchResult[] | undefined;
export function hadithSearchIndex(): SearchResult[] {
  if (cache) return cache;
  cache = hadithCollections.flatMap(c=>getBooks(c.slug).flatMap(book=>getHadithsForBook(c.slug,book.number).map((h,i)=>({
    titre:`${c.nom} · ${book.titreFrancais} · n° ${h.numero}`,
    description: h.francais ? `${h.francais.slice(0,260)}${h.francais.length > 260 ? "…" : ""}` : "Texte arabe disponible dans cette édition.",
    href:`/hadith/${c.slug}/${book.number}${i >= 20 ? `?page=${Math.floor(i/20)+1}` : ""}#hadith-${h.numero}`,
    type:"Hadith", collection:c.slug,
    searchText:`${c.nom} ${c.slug} ${c.auteur} ${book.titreFrancais} ${book.titreAnglais} ${h.numero} ${h.arabe} ${h.francais}`,
  }))));
  return cache;
}
