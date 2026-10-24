import Link from "next/link";
const source="https://d1.islamhouse.com/data/fr/ih_books/fr-jardindesvertueux_Kechrid.pdf";
export const metadata={title:"Riyâd as-Sâlihîn — édition française à réviser",robots:{index:false,follow:false}};
export default async function FrenchEdition({searchParams}:{searchParams:Promise<{page?:string}>}) {
 const p=(await searchParams).page;const parsed=Number(p??1);const page=Number.isFinite(parsed)?Math.max(1,Math.min(515,Math.floor(parsed))):1;
 return <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
 <Link href="/hadith" className="text-sm underline">Retour aux recueils</Link>
 <h1 className="mt-6 font-display text-3xl">Riyâd as-Sâlihîn · traduction française</h1>
 <p className="mt-4 text-sm leading-relaxed text-muted">Traduction et commentaire attribués au Dr Salahiddine Kechrid par la couverture. Copie datée du 18 novembre 2006 · 515 pages.</p>
 <aside className="my-6 rounded-xl border border-gold-500/40 bg-surface p-5"><h2 className="font-medium">Copie de travail en révision</h2><p className="mt-2 text-sm leading-relaxed">Le document contient des commentaires du traducteur, distincts des paroles prophétiques. Cette copie n’est pas présentée comme une édition validée par MIRÂTH. La lecture ci-dessous charge le PDF original externe, sans en modifier le contenu.</p>
 <details className="mt-4"><summary className="cursor-pointer text-sm font-medium">Errata repérés · page 14</summary><ul className="mt-3 space-y-2 text-sm"><li>La référence imprimée « 98:48 » correspond au passage <a className="underline" href="https://quran.com/98/5">98:5</a>.</li><li>La référence imprimée « 78:37 » correspond au passage <a className="underline" href="https://quran.com/22/37">22:37</a>.</li></ul><p className="mt-2 text-xs text-muted">Signalements éditoriaux séparés ; le PDF source reste inchangé.</p></details></aside>
 <form className="mb-5 flex flex-wrap items-center gap-3"><label htmlFor="pdf-page" className="text-sm">Page du PDF</label><input id="pdf-page" name="page" type="number" min="1" max="515" defaultValue={page} className="min-h-11 w-24 rounded-lg border border-border bg-surface px-3"/><button className="min-h-11 rounded-lg bg-primary px-5 text-primary-foreground">Ouvrir</button><Link href="?page=2" className="text-sm underline">Sommaire</Link></form>
 <a href={`${source}#page=${page}`} target="_blank" rel="noopener noreferrer" className="mb-5 inline-block text-sm underline">Ouvrir le PDF original · page {page} / 515</a>
 <iframe key={page} src={`${source}#page=${page}`} title={`Riyâd as-Sâlihîn, édition Kechrid — page ${page}`} loading="lazy" referrerPolicy="no-referrer" className="h-[75vh] min-h-96 w-full rounded-xl border border-border"/>
 <p className="mt-3 text-xs text-muted">Si le lecteur intégré ne fonctionne pas sur votre téléphone, utilisez le lien d’ouverture du PDF. Connexion requise ; l’affichage dépend du lecteur PDF de votre navigateur.</p>
 <nav aria-label="Pages du PDF" className="my-6 flex justify-between gap-3">{page>1?<Link href={`?page=${page-1}`} className="underline">Page précédente</Link>:<span/>}{page<515&&<Link href={`?page=${page+1}`} className="underline">Page suivante</Link>}</nav>
 <p className="text-xs leading-relaxed text-muted">Auteur : an-Nawawî. Traduction et commentaires : Salahiddine Kechrid. Source de diffusion : IslamHouse. Réutilisation annoncée par sa <a href="https://d1.islamhouse.com/html/faq.htm" className="underline">FAQ</a> sous condition d’attribution et de respect du contenu. La correspondance exacte de la copie téléversée et les conditions applicables à son adaptation restent à documenter avant republication.</p>
 </main>;
}
