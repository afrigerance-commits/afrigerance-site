"use client";
import Link from "next/link";
import { ArrowUpRight, Bookmark, Headphones, BookOpen } from "lucide-react";
import { ReadingResume } from "@/components/islamic/reading-resume";
import type { QuranChapterMeta } from "@/lib/quran/data";
import { useDeviceStore } from "@/lib/hooks/use-device-store";
import { initialPlan, parseReadingPlan, localDate, goalVerseCount } from "@/lib/quran/reading-plan";
export function ReadingHub({chapters}:{chapters:QuranChapterMeta[]}) {
 const plan=useDeviceStore("mirath:reading-plan:v1",initialPlan,parseReadingPlan);
 const p=plan.value;const target=goalVerseCount(p.unit,p.target,Math.min(6236,p.completed+1));const read=p.logs[localDate()]??0;
 return <section className="premium-container atelier-hub" aria-label="Mon espace de lecture">
   <div className="atelier-hub-heading"><p className="eyebrow">Votre fil de lecture</p><Link href="/ma-bibliotheque" className="atelier-text-link">Mon espace <ArrowUpRight className="size-4" aria-hidden="true" /></Link></div>
   <ReadingResume chapters={chapters}/>
   <div className="atelier-action-rows">
    {[{href:'/coran/lecture/page/1',icon:BookOpen,title:'Lire le mushaf',text:'Page par page, comme un livre'},{href:'/coran/1#verset-1',icon:Headphones,title:'Lire et écouter',text:'Choisir une voix et une langue'},{href:'/ma-bibliotheque',icon:Bookmark,title:'Mes repères',text:'Signets, notes et téléchargements'}].map(item=><Link key={item.href} href={item.href} className="atelier-action-row"><item.icon className="size-5" aria-hidden="true"/><span><strong>{item.title}</strong><small>{item.text}</small></span><ArrowUpRight className="size-4" aria-hidden="true"/></Link>)}
   </div>
   <Link href="/mon-suivi" className="atelier-goal"><span>Mon rendez-vous du jour</span><progress aria-label="Objectif en versets déclarés lus" value={Math.min(read,target)} max={Math.max(1,target)}/><span>{plan.ready?`${read} / ${target} versets déclarés lus`:'Mon objectif de lecture'} <span aria-hidden="true">↗</span></span></Link>
 </section>;
}
