import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { validPdfPath } from "@/lib/books/validation";
export async function GET(_request:Request,{params}:{params:Promise<{slug:string}>}){
  if(!isSupabaseConfigured)return new Response("Bibliothèque distante indisponible",{status:503});
  const {slug}=await params;const client=await createClient();
  const {data:book}=await client.from("books").select("pdf_path,droits,published").eq("slug",slug).eq("published",true).maybeSingle();
  if(!book?.pdf_path||!validPdfPath(book.pdf_path)||!["librement_diffusable","diffusion_autorisee"].includes(book.droits))return new Response("Livre indisponible",{status:404});
  const {data,error}=await client.storage.from("mirath-books").download(book.pdf_path);
  if(error||!data)return new Response("Fichier indisponible",{status:503});
  if(data.size>30*1024*1024||await data.slice(0,5).text()!=="%PDF-")return new Response("Fichier invalide",{status:422});
  return new Response(data,{headers:{"Content-Type":"application/pdf","Content-Disposition":"inline; filename=ouvrage.pdf","Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
}
