"use server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { safeExternalBookUrl, validPdfPath } from "@/lib/books/validation";
import type { BookRightsStatusDb } from "@/lib/supabase/database.types";
export interface BookFormState { error?: string; success?: string }
export async function saveBook(_state:BookFormState, form:FormData):Promise<BookFormState> {
  const client=await createClient();
  const {data:{user}}=await client.auth.getUser();if(!user)return {error:"Connexion requise."};
  const {data:roles}=await client.from("user_roles").select("role").eq("user_id",user.id);
  if(!roles?.some(row=>["administrateur","responsable_scientifique","redacteur","verificateur"].includes(row.role)))return {error:"Accès éditorial requis."};
  const text=(key:string,max=4000)=>String(form.get(key)||"").trim().slice(0,max);
  const titre=text("titre_francais",200),slug=text("slug",100),id=text("id",36);
  if(!titre || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))return {error:"Titre et adresse du livre valides requis."};
  const droits=text("droits") as BookRightsStatusDb;
  if(!["droits_non_verifies","diffusion_autorisee","librement_diffusable","consultation_externe"].includes(droits))return {error:"Statut de droits invalide."};
  const published=form.get("published")==="on",justification=text("rights_justification");
  if((published || ["diffusion_autorisee","librement_diffusable"].includes(droits)) && !roles.some(row=>["administrateur","responsable_scientifique"].includes(row.role)))return {error:"Publication et validation des droits réservées à l’administration ou au responsable scientifique."};
  if(["diffusion_autorisee","librement_diffusable"].includes(droits) && justification.length<20)return {error:"Décrivez l’autorisation ou la licence applicable à cette édition (20 caractères minimum)."};
  const external=text("lien_consultation_externe",2000),url=safeExternalBookUrl(external);
  if(external && !url)return {error:"Le lien externe doit utiliser HTTPS."};
  const path=text("pdf_path",150);
  if(path && !validPdfPath(path))return {error:"Chemin du PDF invalide."};
  if(path) {
    const {data:existing}=id ? await client.from("books").select("pdf_path").eq("id",id).maybeSingle() : {data:null};
    if(path!==existing?.pdf_path && !validPdfPath(path,user.id))return {error:"Le PDF doit provenir de votre téléversement."};
  }
  const pages=Number(text("page_count"));if(pages && (!Number.isInteger(pages)||pages<1||pages>10000))return {error:"Nombre de pages invalide."};
  if(published && (droits==="droits_non_verifies" || (droits==="consultation_externe" ? !url : !path)))return {error:"La publication exige un accès réel et des droits établis."};
  const payload={titre_francais:titre,auteur:text("auteur",200),langue:text("langue",100),edition:text("edition",300),presentation:text("presentation"),discipline_label:text("discipline",150),droits,published,rights_justification:justification||null,pdf_path:path||null,page_count:pages||null,lien_consultation_externe:url};
  const result=id ? await client.from("books").update(payload).eq("id",id).select("id").single() : await client.from("books").insert({...payload,slug}).select("id").single();
  if(result.error)return {error:`Enregistrement impossible : ${result.error.message}`};
  revalidatePath("/bibliotheque");revalidatePath(`/bibliotheque/${slug}`);revalidatePath("/admin/livres");
  return {success:published ? "Ouvrage publié dans le catalogue." : "Brouillon enregistré. Le PDF reste privé."};
}
