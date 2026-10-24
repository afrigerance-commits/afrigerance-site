import { notFound } from "next/navigation";
import Link from "next/link";
import data from "@/../data/study/risala";
import { ArabicText } from "@/components/islamic/arabic-text";
export const metadata={title:"La Risâla — lecture arabe en révision",robots:{index:false,follow:false}};
export default async function RisalaPage({searchParams}: {searchParams:Promise<{chapitre?:string}>}) {
 if(process.env.MIRATH_STUDY_PREVIEW!=="1") notFound();
 const {chapitre}=await searchParams;
 const n=Number(chapitre??0);const c=data.chapters.find(c=>c.number===n);if(!c)notFound();
 return <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
 <Link href="/fiqh/malikite" className="text-sm underline">Retour au fiqh malikite</Link>
 <h1 className="mt-6 font-display text-3xl">La Risâla</h1><p className="mt-3 text-sm text-muted">Ibn Abî Zayd al-Qayrawânî · texte de fiqh, comprenant les enseignements de l’auteur.</p>
 <p className="my-6 rounded-xl border border-border bg-surface p-4 text-sm">Brouillon de révision documentaire. Texte arabe importé ; traduction française et contrôle scientifique chapitre par chapitre encore en attente.</p>
 <details className="my-6"><summary className="cursor-pointer font-medium">Sommaire · {data.chapters.length} parties</summary><ol className="mt-4 space-y-3">{data.chapters.map(ch=><li key={ch.number}><Link href={`?chapitre=${ch.number}`} aria-current={ch.number===n?"page":undefined} className="block rounded-lg border border-border p-3 text-right" dir="rtl">{ch.title}</Link></li>)}</ol></details>
 <article className="rounded-2xl border border-gold-500/35 bg-surface p-6 sm:p-10"><h2><ArabicText className="mb-8 text-2xl leading-loose">{c.title}</ArabicText></h2><ArabicText className="whitespace-pre-line text-2xl leading-[2.4]">{c.text}</ArabicText></article>
 <nav aria-label="Chapitres" className="my-8 flex justify-between gap-4">{n>0?<Link className="underline" href={`?chapitre=${n-1}`}>Partie précédente</Link>:<span/>}{n<data.chapters.length-1&&<Link className="underline" href={`?chapitre=${n+1}`}>Partie suivante</Link>}</nav>
 <p className="text-xs leading-relaxed text-muted">Transcription OpenITI, version JK000171-ara1 nettoyée. Adaptation MIRÂTH : retrait des marqueurs techniques et découpage par parties. <a href={data.source} className="underline">Source et métadonnées</a> · <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" className="underline">CC BY-NC-SA 4.0</a>. Attribution, partage sous la même licence et usage non commercial pour ce texte adapté.</p>
 </main>;
}
