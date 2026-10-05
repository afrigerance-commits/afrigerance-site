"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, BookmarkCheck, Copy, Check, Trash2 } from "lucide-react";
const key="mirath:hadith:saved";
interface Saved { href:string; title:string }
function readSaved():Saved[] { try {const list:unknown=JSON.parse(localStorage.getItem(key)??"[]");return Array.isArray(list)?list.filter((i):i is Saved=>typeof i?.title==="string"&&typeof i?.href==="string"&&/^\/hadith\/[\w-]+\/\d+(?:\?page=\d+)?#hadith-\d+$/.test(i.href)).slice(0,100):[]}catch{return []} }
function writeSaved(list:Saved[]) {localStorage.setItem(key,JSON.stringify(list));window.dispatchEvent(new Event("mirath:saved-hadiths"))}
export function HadithActions({ href,title,text }:Saved&{text:string}) {
  const [saved,setSaved]=useState(false);const [copied,setCopied]=useState(false);const [error,setError]=useState("");
  useEffect(()=>{const update=()=>setSaved(readSaved().some(i=>i.href===href));queueMicrotask(update);window.addEventListener("mirath:saved-hadiths",update);return()=>window.removeEventListener("mirath:saved-hadiths",update)},[href]);
  function bookmark(){try{const list=readSaved();writeSaved(saved?list.filter(i=>i.href!==href):[{href,title},...list.filter(i=>i.href!==href)].slice(0,100));setError("")}catch{setError("La sauvegarde n’est pas disponible sur cet appareil.")}}
  async function copy(){try{await navigator.clipboard.writeText(`${text}\n\n${title}\n${window.location.origin}${href}`);setCopied(true);setError("")}catch{setError("La copie a échoué. Vous pouvez sélectionner le texte.")}}
  return <div className="flex flex-wrap items-center gap-3 border-t border-border px-6 py-4 text-xs sm:px-10"><button type="button" onClick={bookmark} aria-pressed={saved} className="inline-flex min-h-9 items-center gap-2 rounded-full border border-border px-3 text-primary hover:bg-surface-muted">{saved?<BookmarkCheck className="size-3.5"/>:<Bookmark className="size-3.5"/>}{saved?"Enregistré":"Garder ce hadith"}</button><button type="button" onClick={copy} className="inline-flex min-h-9 items-center gap-2 rounded-full px-3 text-muted hover:bg-surface-muted">{copied?<Check className="size-3.5"/>:<Copy className="size-3.5"/>}{copied?"Copié avec sa référence":"Copier avec sa référence"}</button>{error&&<p role="status" className="w-full text-muted">{error}</p>}</div>;
}
export function SavedHadiths() {
  const [items,setItems]=useState<Saved[]>([]);
  useEffect(()=>{const update=()=>setItems(readSaved());queueMicrotask(update);window.addEventListener("mirath:saved-hadiths",update);window.addEventListener("storage",update);return()=>{window.removeEventListener("mirath:saved-hadiths",update);window.removeEventListener("storage",update)}},[]);
  if(!items.length)return null;
  return <details className="mb-9 rounded-2xl border border-accent/30 bg-surface p-5"><summary className="cursor-pointer text-sm font-semibold text-primary">Mes hadiths enregistrés · {items.length}</summary><p className="mt-2 text-xs text-muted">Conservés sur cet appareil.</p><ul className="mt-4 divide-y divide-border">{items.map(item=><li key={item.href} className="flex items-center gap-4 py-3"><Link href={item.href} className="flex-1 text-sm hover:underline">{item.title}</Link><button type="button" aria-label={`Retirer ${item.title}`} onClick={()=>{try{writeSaved(readSaved().filter(i=>i.href!==item.href))}catch{/* Optional storage. */}}} className="p-2 text-muted hover:text-primary"><Trash2 className="size-4"/></button></li>)}</ul></details>;
}
