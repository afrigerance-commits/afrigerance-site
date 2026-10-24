import { ArabicText } from "@/components/islamic/arabic-text";

const entries = [
 {name:"Riyâd as-Sâlihîn", author:"An-Nawawî", topic:"La sincérité de l’intention", reference:"Riyâd as-Sâlihîn, 1 — rapporté par Al-Bukhârî et Muslim", url:"https://sunnah.com/riyadussalihin:1", arabic:"إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى", translation:"Les actes valent selon les intentions, et chacun obtient selon ce qu’il a eu l’intention de faire.", grade:"Authentique — accord d’Al-Bukhârî et Muslim, indiqué par an-Nawawî", note:"Ce passage invite à examiner le but poursuivi avant d’agir. Il s’agit d’un extrait : le récit complet poursuit avec l’exemple de l’émigration.", excerpt:true},
 {name:"Bulûgh al-Marâm", author:"Ibn Hajar al-‘Asqalânî", topic:"L’eau de mer", reference:"Bulûgh al-Marâm, 1 — notamment At-Tirmidhî 69 et Abû Dâwûd 83", url:"https://sunnah.com/bulugh:1", arabic:"هُوَ الطَّهُورُ مَاؤُهُ، الْحِلُّ مَيْتَتُهُ", translation:"Son eau est purifiante et ses animaux morts sont licites à consommer.", grade:"Authentifié par Ibn Khuzayma et at-Tirmidhî, selon l’indication d’Ibn Hajar", note:"La réponse concerne la mer. Ce passage sert de preuve pour la purification avec son eau. L’application des règles alimentaires et leurs détails s’étudient dans les chapitres de fiqh correspondants.", excerpt:false}
];
export function StudyCollections() {
 return <section className="mt-12" aria-labelledby="study-collections-title">
 <h2 id="study-collections-title" className="font-display text-2xl">Recueils à étudier</h2>
 <p className="mt-3 text-sm text-muted">Premières fiches vérifiées : une sélection de départ, et non les ouvrages complets. Traductions originales du sens pour MIRÂTH.</p>
 <div className="mt-6 grid gap-6 sm:grid-cols-2">{entries.map(e=><article key={e.name} className="rounded-2xl border border-gold-500/35 bg-surface p-6">
 {e.name === "Riyâd as-Sâlihîn" && <a href="/hadith/riyadussalihin/edition-francaise" className="mb-4 block text-sm font-medium underline">Lire le PDF français original · copie en révision →</a>}
 <p className="text-sm text-accent-text">{e.author}</p><h3 className="mt-2 font-display text-2xl">{e.name}</h3><h4 className="mt-5 font-medium">{e.topic}</h4>
 <p className="mt-3 text-xs text-muted">{e.excerpt?"Extrait du texte prophétique":"Paroles prophétiques — réponse rapportée"}</p>
 <ArabicText className="my-5 text-2xl leading-loose">{e.arabic}</ArabicText>
 <p className="text-sm leading-relaxed">{e.translation}</p>
 <p className="mt-4 text-xs leading-relaxed text-muted">{e.reference}</p><p className="mt-2 text-xs leading-relaxed text-muted">{e.grade}</p>
 <details className="mt-5 border-t border-border pt-4"><summary className="cursor-pointer text-sm font-medium">Comprendre ce passage</summary><p className="mt-3 text-sm leading-relaxed text-muted">Commentaire éditorial — {e.note}</p></details>
 <a href={e.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm underline underline-offset-4">Consulter le récit et sa référence</a>
 </article>)}</div></section>;
}
