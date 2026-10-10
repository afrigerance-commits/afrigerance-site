"use client";
import { useState } from "react";
import Link from "next/link";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
import chapters from "../../../data/quran/chapters-meta.json";
const empty: number[] = [];
function parseFavorites(raw: string | null): number[] {
  try { const data = JSON.parse(raw ?? "[]"); return Array.isArray(data) ? [...new Set(data.filter(n=>Number.isInteger(n)&&n>=1&&n<=114))] : []; } catch { return []; }
}
export function QuranFavorites() {
  const favorites = useDeviceStore("mirath:quran:favorites:v1",empty,parseFavorites);
  const [chapter,setChapter] = useState(1);
  return <section className="rounded-3xl border border-border bg-surface p-5"><h2 className="font-display text-2xl text-primary">Mes sourates favorites</h2><p className="mt-3 text-sm text-muted">Des raccourcis personnels, conservés sur cet appareil.</p><div className="mt-5 flex flex-wrap gap-3"><label className="min-w-0 flex-1 text-sm"><span className="sr-only">Sourate à ajouter</span><select value={chapter} onChange={e=>setChapter(Number(e.target.value))} className="min-h-11 w-full rounded-xl border border-border bg-background px-3">{chapters.map(c=><option value={c.number} key={c.number}>{c.number}. {c.nameFrench}</option>)}</select></label><button type="button" disabled={!favorites.ready || favorites.value.includes(chapter)} onClick={()=>favorites.save([...favorites.value,chapter])} className="min-h-11 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground disabled:opacity-50">Ajouter</button></div><ul className="mt-5 space-y-3">{favorites.value.map(n=><li key={n} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"><Link href={`/coran/${n}`} className="min-h-11 flex-1 py-2 font-medium text-primary">{n}. {chapters[n-1].nameFrench}</Link><button type="button" aria-label={`Retirer ${chapters[n-1].nameFrench} des favoris`} onClick={()=>favorites.save(favorites.value.filter(v=>v!==n))} className="min-h-11 px-3 text-sm text-muted">Retirer</button></li>)}</ul>{!favorites.value.length&&<p className="mt-5 text-sm text-muted">Ajoutez une sourate pour la retrouver en un geste.</p>}{favorites.error&&<p role="status" className="mt-4 text-sm">{favorites.error}</p>}</section>;
}
