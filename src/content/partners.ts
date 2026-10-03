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
 *      `url` (facultatif) : site de l'organisation, ouvert dans un nouvel onglet ;
 *      `darkBackground: true` (facultatif) : carte foncée, pour un logo clair ou blanc.
 */

export type Partner = {
  /** Nom exact, lu par les lecteurs d'écran à la place du logo. */
  name: string;
  /** Chemin du fichier dans public/, ex. "/partenaires/nom.png". */
  logo: string;
  url?: string;
  /** Carte foncée au lieu de blanche, pour un logo clair ou blanc. */
  darkBackground?: boolean;
};

export const partnersSection = {
  title: "Ils nous font confiance",
  newTab: "(nouvel onglet)",
} as const;

// Logos fournis par AFRIGÉRANCE (octobre 2026), présentés par ordre alphabétique.
export const partners: Partner[] = [
  { name: "ASGC Sénégal", logo: "/partenaires/asgc-senegal.png" },
  { name: "BKG Speed", logo: "/partenaires/bkg-speed.png" },
  { name: "Douanes sénégalaises", logo: "/partenaires/douanes-senegalaises.png" },
  { name: "Fabrimetal", logo: "/partenaires/fabrimetal.png", darkBackground: true },
  { name: "FIM Capital", logo: "/partenaires/fim-capital.png" },
  { name: "Fofi", logo: "/partenaires/fofi.png" },
  { name: "Indigo Voyages", logo: "/partenaires/indigo-voyages.png" },
  { name: "KFC", logo: "/partenaires/kfc.png" },
  { name: "SECAS La Vivrière", logo: "/partenaires/secas.png" },
  { name: "Tara Group", logo: "/partenaires/tara-group.png" },
  { name: "TotalEnergies Les Maristes", logo: "/partenaires/totalenergies-les-maristes.png" },
];
