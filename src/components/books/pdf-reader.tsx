"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
const CACHE="mirath-authorized-books-v1";
interface Position {page:number;bookmarks:number[]}
const empty:Position={page:1,bookmarks:[]};
function parse(raw:string|null):Position{try{const value=JSON.parse(raw||"null");return value&&Number.isInteger(value.page)&&value.page>0&&Array.isArray(value.bookmarks)?{page:value.page,bookmarks:value.bookmarks.filter((n:number)=>Number.isInteger(n)&&n>0)}:empty;}catch{return empty;}}
export function PdfBookReader({slug,title,pages}:{slug:string;title:string;pages:number|null}){
 const store=useDeviceStore(`mirath:book:v1:${slug}`,empty,parse);
 const [url,setUrl]=useState(""),[status,setStatus]=useState("Chargement du PDF…"),[busy,setBusy]=useState(false);
 const source=`/api/books/${slug}/pdf`;
 useEffect(()=>{let cancelled=false,objectUrl="";const controller=new AbortController();
  void(async()=>{try{
   const cache="caches" in window?await caches.open(CACHE):null;
   let response:Response|undefined;
   if(navigator.onLine){try{const live=await fetch(source,{signal:controller.signal});if(live.ok)response=live;else if(live.status===404){await cache?.delete(source);throw new Error("Ce livre n’est plus disponible.");}}catch(error){if(controller.signal.aborted)throw error;if(error instanceof Error&&error.message==="Ce livre n’est plus disponible.")throw error;}}
   response=response||await cache?.match(source);
   if(!response?.ok)throw new Error("PDF indisponible. Connectez-vous pour le charger ou enregistrez-le avant de passer hors connexion.");
   const blob=await response.blob();if(cancelled)return;objectUrl=URL.createObjectURL(blob);setUrl(objectUrl);setStatus("Utilisez le numéro de page ci-dessous pour enregistrer votre position. Le défilement interne du lecteur PDF ne met pas ce repère à jour.");
  }catch(error){if(!cancelled)setStatus(error instanceof Error?error.message:"Lecture indisponible.");}})();
  return()=>{cancelled=true;controller.abort();if(objectUrl)URL.revokeObjectURL(objectUrl);};
 },[source]);
 const page=pages?Math.min(store.value.page,pages):store.value.page;
 async function saveOffline(){setBusy(true);try{
  if(!("caches" in window))throw new Error("Hors connexion indisponible dans ce navigateur.");
  const response=await fetch(source);if(!response.ok)throw new Error("Téléchargement indisponible.");
  const cache=await caches.open(CACHE);await cache.put(source,response);
  const registration=await navigator.serviceWorker.ready;registration.active?.postMessage({type:"SAVE_PAGE",path:`/bibliotheque/${slug}/lire`});
  setStatus("PDF enregistré sur cet appareil. Ouvrez aussi sa page de lecture avant de passer hors connexion.");
 }catch(error){setStatus(error instanceof Error?error.message:"Enregistrement impossible.");}finally{setBusy(false);}}
 async function removeOffline(){await(await caches.open(CACHE)).delete(source);setStatus("Copie hors connexion supprimée.");}
 return <div className="mx-auto max-w-5xl px-4 py-8"><Link href={`/bibliotheque/${slug}`} className="inline-block min-h-11 py-2 text-primary underline">← Notice</Link><h1 className="mt-4 font-display text-3xl">{title}</h1>
 <div className="mt-5 flex flex-wrap items-end gap-3"><label className="text-sm">Page de reprise<input type="number" min={1} max={pages||10000} value={page} onChange={event=>{const next=Number(event.target.value);if(Number.isInteger(next)&&next>0&&next<=(pages||10000))store.save({...store.value,page:next});}} className="ml-3 min-h-11 w-24 rounded-xl border border-border bg-background px-3"/>{pages?` / ${pages}`:""}</label><button className="min-h-11 rounded-xl border border-border px-4" onClick={()=>store.save({...store.value,bookmarks:[...new Set([...store.value.bookmarks,page])]})}>Marquer cette page</button><button disabled={busy} className="min-h-11 rounded-xl bg-primary px-4 text-primary-foreground" onClick={()=>void saveOffline()}>{busy?"Enregistrement…":"Enregistrer hors connexion"}</button><button className="min-h-11 rounded-xl border border-border px-4" onClick={()=>void removeOffline()}>Supprimer la copie hors ligne</button></div>
 <p role="status" className="mt-4 text-sm leading-7 text-muted">{status}</p>{store.error&&<p role="alert">{store.error}</p>}
 <div className="mt-3 flex flex-wrap gap-2">{store.value.bookmarks.map(mark=><span key={mark} className="flex rounded-xl border border-border"><button className="min-h-11 px-3 text-sm" onClick={()=>store.save({...store.value,page:mark})}>Page {mark}</button><button aria-label={`Retirer le signet page ${mark}`} className="min-h-11 px-3" onClick={()=>store.save({...store.value,bookmarks:store.value.bookmarks.filter(item=>item!==mark)})}>×</button></span>)}</div>
 {url&&<><iframe key={page} src={`${url}#page=${page}`} title={`Lecture de ${title}`} className="mt-6 h-[75dvh] min-h-96 w-full rounded-2xl border border-border"/><a href={`${url}#page=${page}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block min-h-11 py-2 text-primary underline">Ouvrir le PDF dans le lecteur de l’appareil</a></>}
 </div>;
}
