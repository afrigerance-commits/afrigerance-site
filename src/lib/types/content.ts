import type { EditorialStatus } from "@/lib/site-config";

/** Type de contenu religieux, au sens de la section "Fiabilité documentaire" du cahier des charges. */
export type SourceType =
  | "coran"
  | "hadith"
  | "avis_juridique"
  | "recit_historique"
  | "explication_pedagogique"
  | "contenu_editorial";

export interface SourceReference {
  id: string;
  auteur?: string;
  titre: string;
  langue?: string;
  type: SourceType;
  edition?: string;
  volume?: string;
  page?: string;
  chapitre?: string;
  numeroHadith?: string;
  sourate?: string;
  verset?: string;
  lienExterne?: string;
  gradeAuthenticite?: string;
  verificateur?: string;
  dateVerification?: string;
  /** true si la référence n’a pas encore pu être vérifiée : doit être affiché explicitement. */
  aVerifier?: boolean;
}

export interface EditorialMeta {
  statut: EditorialStatus;
  datePublication?: string;
  derniereMiseAJour?: string;
}

export interface DemoFlag {
  /** Marque un contenu comme donnée de démonstration explicitement signalée, non une source authentifiée. */
  demonstration?: boolean;
}

export interface Article extends EditorialMeta, DemoFlag {
  slug: string;
  titre: string;
  categorie: string;
  resume: string;
  contenuHtml: string;
  auteur: string;
  tempsLectureMinutes: number;
  imageCouverture?: string;
  sources?: SourceReference[];
  motsCles?: string[];
}

export interface FiqhLesson extends EditorialMeta, DemoFlag {
  slug: string;
  titre: string;
  objectifPedagogique: string;
  niveau: "debutant" | "intermediaire" | "avance";
  dureeIndicative: string;
  introduction: string;
  texteArabe?: string;
  traductionFrancaise?: string;
  explication: string;
  pointsARetenir: string[];
  sources: SourceReference[];
  notePedagogique?: string;
  lessonSuivanteSlug?: string;
}

export interface FiqhCourse extends EditorialMeta, DemoFlag {
  slug: string;
  titre: string;
  niveau: "debutant" | "intermediaire" | "avance";
  description: string;
  referentielJuridique: string;
  lessons: FiqhLesson[];
}

export interface SiraEvent extends EditorialMeta, DemoFlag {
  slug: string;
  periode: string;
  titre: string;
  dateApproximative: string;
  presentation: string;
  contexte: string;
  localisation?: string;
  recits: {
    texte: string;
    statutAuthenticite: "etabli" | "discute" | "a_verifier";
  }[];
  sources: SourceReference[];
  evenementSuivantSlug?: string;
}

export interface Scholar extends EditorialMeta, DemoFlag {
  slug: string;
  nomArabe: string;
  transcriptionFrancaise: string;
  categorie: "compagnon" | "compagnonne" | "tabiun" | "imam" | "savant";
  presentation: string;
  chronologie: { date: string; evenement: string }[];
  sources: SourceReference[];
}

export type BookRightsStatus =
  | "librement_diffusable"
  | "diffusion_autorisee"
  | "consultation_externe"
  | "droits_non_verifies";

export interface Book extends DemoFlag {
  slug: string;
  titreOriginal: string;
  titreFrancais: string;
  auteur: string;
  discipline: string;
  langue: string;
  edition?: string;
  presentation: string;
  tableDesMatieres?: string[];
  referencesBibliographiques?: string;
  droits: BookRightsStatus;
  lienConsultationExterne?: string;
  fichierPdf?: string;
  couverture?: string;
}

export interface Video extends DemoFlag {
  slug: string;
  titre: string;
  description: string;
  categorie: string;
  youtubeId: string;
  dureeMinutes?: number;
  articleAssocieSlug?: string;
}

export interface LearningPath extends DemoFlag {
  slug: string;
  titre: string;
  description: string;
  niveauRequis: "aucun" | "debutant" | "intermediaire";
  etapes: { titre: string; lienHref: string }[];
}
