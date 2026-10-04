import type { Article } from "@/lib/types/content";

/**
 * Articles de démonstration, rédigés par l’équipe éditoriale à titre
 * d’ébauche. Ils ne doivent pas être publiés sous le nom du fondateur tant
 * qu’il ne les a pas relus et réécrits dans ses propres mots.
 */
export const articles: Article[] = [
  {
    slug: "bienvenue-sur-bayt-al-ilm",
    titre: "Bienvenue sur Bayt Al-'Ilm",
    categorie: "Actualités de la plateforme",
    resume:
      "Présentation de la mission de la plateforme : transmettre le savoir islamique avec rigueur, références à l’appui.",
    contenuHtml: `
      <p>Cette plateforme est née d’un objectif simple : offrir, en français, un espace où apprendre les sciences islamiques avec sérieux, dans le respect des sources et de leurs références.</p>
      <h2>Une transmission documentée</h2>
      <p>Chaque contenu religieux publié ici distingue clairement le texte coranique, le hadith référencé, l’avis juridique attribué, le récit historique sourcé et l’explication pédagogique. Lorsqu’une information ne peut pas encore être vérifiée, elle est signalée comme telle plutôt que présentée comme certaine.</p>
      <h2>Un référentiel malikite assumé</h2>
      <p>Le fiqh est présenté selon l’école malikite, référentiel principal de la plateforme, tout en signalant respectueusement les positions des autres écoles lorsqu’elles divergent.</p>
      <p><em>Cet article est une ébauche éditoriale : il sera relu et réécrit par le fondateur avant toute publication définitive.</em></p>
    `,
    auteur: "Équipe éditoriale (brouillon)",
    tempsLectureMinutes: 3,
    statut: "brouillon",
    demonstration: true,
    datePublication: undefined,
    motsCles: ["présentation", "mission", "référentiel malikite"],
  },
  {
    slug: "pourquoi-un-referentiel-malikite",
    titre: "Pourquoi un référentiel malikite ?",
    categorie: "Réflexions",
    resume: "Expliquer le choix de structurer l’enseignement du fiqh autour de l’école malikite, sans dénigrer les autres écoles.",
    contenuHtml: `
      <p>Adopter un référentiel juridique clair permet d’enseigner la jurisprudence islamique de façon cohérente, plutôt que de juxtaposer des avis sans méthode.</p>
      <p>Ce choix ne constitue pas un jugement sur la valeur des autres écoles juridiques sunnites, toutes reconnues. Lorsque des divergences existent sur un point précis, elles seront présentées avec les positions attribuées à chaque école et leurs sources respectives.</p>
      <p><em>Cet article est une ébauche éditoriale en attente de relecture par le fondateur.</em></p>
    `,
    auteur: "Équipe éditoriale (brouillon)",
    tempsLectureMinutes: 2,
    statut: "brouillon",
    demonstration: true,
  },
  {
    slug: "comment-lire-une-reference-de-hadith",
    titre: "Comment lire une référence de hadith",
    categorie: "Questions fréquentes",
    resume:
      "Un guide de méthode pour comprendre ce qu’indiquent les informations bibliographiques accompagnant un hadith sur cette plateforme.",
    contenuHtml: `
      <p>Sur cette plateforme, une référence de hadith peut mentionner le recueil, parfois un numéro, et des informations relatives à son authenticité lorsque celles-ci ont été vérifiées.</p>
      <p>La numérotation d’un hadith varie souvent selon l’édition utilisée : c’est pourquoi les informations bibliographiques complètes (recueil, chapitre, édition) importent davantage qu’un simple numéro isolé.</p>
      <p>Lorsqu’une référence porte la mention « Référence à vérifier », cela signifie que l’équipe éditoriale n’a pas encore confirmé la citation exacte : le contenu reste présenté avec prudence jusqu’à vérification.</p>
      <p><em>Cet article est une ébauche éditoriale en attente de relecture par le fondateur.</em></p>
    `,
    auteur: "Équipe éditoriale (brouillon)",
    tempsLectureMinutes: 3,
    statut: "brouillon",
    demonstration: true,
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug && a.statut === "publie");
}
