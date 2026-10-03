/**
 * Logos affichés dans la section « Ils nous font confiance » de la page d'accueil.
 *
 * N'ajouter QUE des organisations réelles qui ont accepté (de préférence par écrit)
 * que leur logo apparaisse sur le site. Tant que la liste est vide, la section n'apparaît pas.
 *
 * Pour ajouter un logo :
 *   1. déposer le fichier dans public/partenaires/ (SVG, ou PNG à fond transparent d'environ 400 px de large) ;
 *   2. ajouter une ligne dans la liste, par exemple :
 *        { name: "Nom exact de l'organisation", logo: "/partenaires/nom.png" },
 *      `url` (facultatif) : site de l'organisation, ouvert dans un nouvel onglet.
 */

export type Partner = {
  /** Nom exact, lu par les lecteurs d'écran à la place du logo. */
  name: string;
  /** Chemin du fichier dans public/, ex. "/partenaires/nom.png". */
  logo: string;
  url?: string;
};

export const partnersSection = {
  title: "Ils nous font confiance",
  newTab: "(nouvel onglet)",
} as const;

export const partners: Partner[] = [];
