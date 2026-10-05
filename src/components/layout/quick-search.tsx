"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, BookOpen, ScrollText, CirclePlay } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function QuickSearch() {
  const [open,setOpen]=useState(false);
  useEffect(()=>{const handler=(event:KeyboardEvent)=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();setOpen(current=>!current)}};window.addEventListener("keydown",handler);return()=>window.removeEventListener("keydown",handler)},[]);
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild><button type="button" aria-label="Rechercher" className="flex h-10 items-center gap-2 rounded-full px-3 text-muted transition-colors hover:bg-surface-muted hover:text-primary"><Search className="size-4" /><kbd className="hidden rounded border border-border px-1.5 text-[10px] xl:inline">Ctrl K</kbd></button></DialogTrigger>
    <DialogContent className="w-[calc(100%_-_2rem)] max-w-xl rounded-3xl p-7"><DialogTitle className="text-2xl">Que souhaitez-vous explorer ?</DialogTitle><DialogDescription className="mt-2">Recherchez une sourate, un livre ou un thème.</DialogDescription>
      <form action="/recherche" className="mt-6 flex items-center gap-2 rounded-xl border border-border bg-background p-2"><Search className="ml-2 size-4 text-primary"/><input name="q" aria-label="Votre recherche" autoFocus required placeholder="Un thème, un ouvrage…" className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none"/><button type="submit" aria-label="Rechercher" className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ArrowUpRight className="size-4"/></button></form>
      <p className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-muted">Accès direct</p><div className="grid grid-cols-3 gap-2">{[{href:"/coran",label:"Coran",Icon:BookOpen},{href:"/hadith",label:"Hadiths",Icon:ScrollText},{href:"/videos",label:"Vidéos",Icon:CirclePlay}].map(({href,label,Icon})=><Link key={href} href={href} onClick={()=>setOpen(false)} className="flex flex-col items-center gap-3 rounded-xl border border-border p-4 text-sm font-medium transition-colors hover:border-accent hover:bg-surface-muted"><Icon className="size-5 text-primary"/>{label}</Link>)}</div>
    </DialogContent>
  </Dialog>;
}
