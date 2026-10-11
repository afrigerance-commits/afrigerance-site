"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { saveBook } from "@/lib/actions/books";
import type { Database } from "@/lib/supabase/database.types";
type BookRow=Database["public"]["Tables"]["books"]["Row"];
export function BookEditor({ book }: { book?: BookRow }) {
  const [busy,setBusy]=useState(false),[status,setStatus]=useState("");
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();setBusy(true);setStatus("");
    const form=new FormData(event.currentTarget);const file=form.get("pdf") as File|null;
    let uploaded:string|null=null; let saved=false;
    try{
      const client=createClient();
      if(file?.size){
        if(file.size>30*1024*1024 || !file.name.toLowerCase().endsWith(".pdf") || await file.slice(0,5).text()!=="%PDF-")throw new Error("Choisissez un PDF valide de 30 Mo maximum.");
        const {data:{user}}=await client.auth.getUser();if(!user)throw new Error("Connexion requise.");
        uploaded=`${user.id}/${crypto.randomUUID()}.pdf`;
        const {error}=await client.storage.from("mirath-books").upload(uploaded,file,{contentType:"application/pdf",upsert:false});
        if(error)throw new Error(`Téléversement impossible : ${error.message}`);
        form.set("pdf_path",uploaded);
      }
      form.delete("pdf");
      const result=await saveBook({},form);
      if(result.error){if(uploaded)await client.storage.from("mirath-books").remove([uploaded]);throw new Error(result.error);}
      saved=true;
      setStatus(result.success||"Enregistré.");
    }catch(error){if(uploaded&&!saved){try{await createClient().storage.from("mirath-books").remove([uploaded]);}catch{}}setStatus(error instanceof Error ? error.message : "Enregistrement impossible.");}finally{setBusy(false);}
  }
  const field="mt-2 min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2";
  return <form onSubmit={event=>void submit(event)} className="space-y-5 rounded-2xl border border-border bg-surface p-5">
    <input type="hidden" name="id" value={book?.id||""}/><input type="hidden" name="pdf_path" value={book?.pdf_path||""}/>
    <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium">Titre<input className={field} name="titre_francais" required maxLength={200} defaultValue={book?.titre_francais}/></label><label className="text-sm font-medium">Adresse du livre<input className={field} name="slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" readOnly={!!book} defaultValue={book?.slug} placeholder="mon-livre"/></label><label className="text-sm font-medium">Auteur<input className={field} name="auteur" defaultValue={book?.auteur||""}/></label><label className="text-sm font-medium">Discipline<input className={field} name="discipline" defaultValue={book?.discipline_label||""}/></label><label className="text-sm font-medium">Langue<input className={field} name="langue" defaultValue={book?.langue||"Français"}/></label><label className="text-sm font-medium">Édition / traducteur<input className={field} name="edition" defaultValue={book?.edition||""}/></label></div>
    <label className="block text-sm font-medium">Présentation<textarea className={field} name="presentation" rows={4} defaultValue={book?.presentation||""}/></label>
    <label className="block text-sm font-medium">PDF (30 Mo maximum)<input className={field} type="file" name="pdf" accept="application/pdf,.pdf"/><span className="mt-2 block text-xs text-muted">Le fichier est privé tant que sa diffusion n’est pas validée. Un PDF reçu sur Telegram ne constitue pas une autorisation.</span></label>
    <label className="block text-sm font-medium">Nombre de pages du PDF<input className={field} name="page_count" type="number" min={1} max={10000} defaultValue={book?.page_count||""}/></label>
    <label className="block text-sm font-medium">Statut des droits<select className={field} name="droits" defaultValue={book?.droits||"droits_non_verifies"}><option value="droits_non_verifies">Non vérifiés — brouillon privé</option><option value="diffusion_autorisee">Autorisation de diffusion obtenue</option><option value="librement_diffusable">Licence permettant la diffusion</option><option value="consultation_externe">Lien de consultation externe</option></select></label>
    <label className="block text-sm font-medium">Justificatif de droits<textarea className={field} name="rights_justification" rows={3} defaultValue={book?.rights_justification||""} placeholder="Titulaire, date de l’autorisation, portée, licence et référence vérifiable…"/></label>
    <label className="block text-sm font-medium">Lien de consultation externe<input className={field} name="lien_consultation_externe" type="url" defaultValue={book?.lien_consultation_externe||""} placeholder="https://…"/></label>
    <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" name="published" defaultChecked={book?.published}/>Afficher publiquement (administrateur ou responsable scientifique)</label>
    <button disabled={busy} className="min-h-11 rounded-xl bg-primary px-5 text-primary-foreground">{busy ? "Enregistrement…" : "Enregistrer le livre"}</button>{status&&<p role="status" className="text-sm leading-7">{status}</p>}
  </form>;
}
