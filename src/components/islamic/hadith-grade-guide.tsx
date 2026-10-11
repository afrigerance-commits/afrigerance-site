import Link from "next/link";

const terms = [
  ["Sahîh — authentique", "Chaîne continue, transmetteurs fiables et précis, sans anomalie ni défaut caché invalidant le récit."],
  ["Hasan — bon", "Récit accepté, avec une précision des transmetteurs moindre que pour le sahîh."],
  ["Da‘îf — faible", "Les critères du sahîh ou du hasan ne sont pas réunis. Faible ne signifie pas nécessairement inventé. Son utilisation fait l’objet de règles et de divergences savantes."],
  ["Mawdû‘ — fabriqué (Mawdu)", "Récit considéré comme inventé : ne pas l’attribuer au Prophète ﷺ comme une parole établie."],
  ["Li-ghayrihi — renforcé par d’autres voies", "Le classement repose sur des transmissions corroborantes étudiées par le spécialiste."],
  ["Mawqûf (Mauquf) / Maqtû‘ (Maqtu)", "Mawqûf : attribué à un Compagnon. Maqtû‘ : attribué à un Successeur ou à une génération suivante. Même avec « Sahih », ce n’est pas automatiquement une parole prophétique."],
  ["Mursal / Isnaad", "Mursal : un Successeur attribue directement un récit au Prophète ﷺ, sans nommer son intermédiaire. Isnaad désigne la chaîne ; « Sahih Isnaad » qualifie celle-ci, sans résoudre à lui seul toutes les questions du récit."],
  ["Shâdh / Munkar", "Termes critiques pouvant désigner une transmission qui contredit des versions plus fiables. Leur sens précis dépend de l’usage du spécialiste ; conserver le classement complet et son auteur."],
  ["Non renseigné / Non vérifié", "Non renseigné : l’édition ne fournit pas de grade. Non vérifié : un contrôle reste à faire. Ces mentions ne signifient ni « faible » ni « fabriqué »."],
];

export function HadithGradeGuide() {
  return (
    <section id="comprendre-authenticite" className="my-8 scroll-mt-28 rounded-2xl border border-gold-500/30 bg-surface p-5 sm:p-7" aria-labelledby="hadith-grade-title">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent-text">Repères de lecture</p>
      <h2 id="hadith-grade-title" className="mt-2 font-display text-xl font-semibold">Comprendre les degrés d’authenticité</h2>
      <p className="mt-3 text-sm leading-7 text-muted">Touchez un terme pour voir son sens. Le badge conserve le classement de l’édition source et son auteur lorsqu’il est fourni. Les spécialistes peuvent diverger ; ces repères ne remplacent pas leur analyse.</p>
      <div className="mt-4 divide-y divide-border">
        {terms.map(([title, description]) => (
          <details key={title} className="group py-1">
            <summary className="min-h-11 cursor-pointer rounded-lg py-3 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{title}</summary>
            <p className="pb-4 text-sm leading-7 text-muted">{description}</p>
          </details>
        ))}
      </div>
      <p className="mt-4 text-xs leading-6 text-muted">Pour approfondir : <a href="https://seekersguidance.org/answers/hadith/difference-sahih-hasan-daif-hadith/" target="_blank" rel="noopener noreferrer" className="underline">Sahîh, hasan et da‘îf — Shaykh Jamir Meah</a> · <a href="https://islamqa.info/en/answers/121290" target="_blank" rel="noopener noreferrer" className="underline">Attribution des récits</a> · <a href="https://islamqa.info/en/answers/130686/definition-of-a-mursal-hadeeth" target="_blank" rel="noopener noreferrer" className="underline">Mursal</a> · <a href="https://islamqa.info/en/answers/85048" target="_blank" rel="noopener noreferrer" className="underline">Termes critiques</a>.</p>
    </section>
  );
}

export function HadithGradeHelpLink() {
  return <Link href="/hadith#comprendre-authenticite" className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-accent-text underline underline-offset-4">Comprendre les degrés d’authenticité</Link>;
}
