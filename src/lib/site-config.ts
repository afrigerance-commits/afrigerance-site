/**
 * Configuration centrale de l'identité du site.
 * Le nom de marque est provisoire ("Bayt Al-'Ilm") : tout le texte de marque
 * passe par cet objet pour permettre un renommage ultérieur en un seul endroit.
 */
export const siteConfig = {
  name: "Bayt Al-'Ilm",
  nameArabic: "بيت العلم",
  tagline: "La maison du savoir",
  description:
    "Un espace francophone pour apprendre les sciences islamiques avec rigueur : Coran et tafsîr, hadith, fiqh malikite, sîra prophétique et bibliothèque islamique documentée.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bayt-al-ilm.example.org",
  locale: "fr-FR",
  founder: {
    name: "Le fondateur",
    role: "Enseignant et fondateur de la plateforme",
  },
  madhhab: {
    name: "malikite",
    nameArabic: "مالكي",
    note: "Le fiqh est présenté selon l'école malikite. Les divergences avec les autres écoles sont signalées avec leurs sources respectives, dans un esprit de respect mutuel.",
  },
  social: {
    youtube: "https://www.youtube.com/@bayt-al-ilm",
    whatsapp: "",
    facebook: "",
    instagram: "",
  },
  nav: {
    primary: [
      { label: "Accueil", href: "/" },
      { label: "Explorer le savoir", href: "/explorer-le-savoir" },
      { label: "Fiqh malikite", href: "/fiqh/malikite" },
      { label: "Sîra", href: "/sira" },
      { label: "Bibliothèque", href: "/bibliotheque" },
      { label: "Vidéos", href: "/videos" },
      { label: "Blog", href: "/blog" },
      { label: "Apprendre", href: "/apprendre" },
    ],
    footer: {
      plateforme: [
        { label: "À propos", href: "/a-propos" },
        { label: "Le fondateur", href: "/a-propos/fondateur" },
        { label: "Contact", href: "/contact" },
        { label: "Référentiel malikite", href: "/a-propos/referentiel-malikite" },
      ],
      ressources: [
        { label: "Explorer le savoir", href: "/explorer-le-savoir" },
        { label: "Bibliothèque", href: "/bibliotheque" },
        { label: "Vidéothèque", href: "/videos" },
        { label: "Parcours d'apprentissage", href: "/apprendre" },
      ],
      legal: [
        { label: "Politique éditoriale et documentaire", href: "/a-propos/politique-editoriale" },
        { label: "Politique de confidentialité", href: "/confidentialite" },
        { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
      ],
    },
  },
} as const;

export const disciplines = [
  {
    slug: "coran-tafsir",
    name: "Coran et Tafsîr",
    nameArabic: "القرآن والتفسير",
    description:
      "Le texte coranique et son exégèse, à travers les commentaires de référence (Ibn Kathîr, At-Tabarî, Al-Qurtubî).",
  },
  {
    slug: "hadith",
    name: "Hadith",
    nameArabic: "الحديث",
    description:
      "Les paroles, actes et approbations du Prophète ﷺ, rapportés et évalués selon les sciences du hadith.",
  },
  {
    slug: "fiqh-malikite",
    name: "Fiqh malikite",
    nameArabic: "الفقه المالكي",
    description:
      "La jurisprudence islamique selon l'école de l'imam Mâlik ibn Anas, référentiel principal de la plateforme.",
  },
  {
    slug: "sira",
    name: "Sîra prophétique",
    nameArabic: "السيرة النبوية",
    description: "La biographie du Prophète Muhammad ﷺ, de sa naissance à son rappel à Allah.",
  },
  {
    slug: "histoire-islamique",
    name: "Histoire islamique",
    nameArabic: "التاريخ الإسلامي",
    description: "Les grandes périodes de l'histoire musulmane, des califes bien-guidés à nos jours.",
  },
  {
    slug: "compagnons",
    name: "Vie des compagnons",
    nameArabic: "سير الصحابة",
    description: "Les biographies documentées des compagnons et compagnonnes du Prophète ﷺ.",
  },
  {
    slug: "aqida",
    name: "'Aqîda",
    nameArabic: "العقيدة",
    description: "Les fondements de la croyance islamique.",
  },
  {
    slug: "spiritualite",
    name: "Spiritualité et purification de l'âme",
    nameArabic: "التزكية",
    description: "Le tazkiya : purifier le cœur et cultiver une relation sincère avec Allah.",
  },
  {
    slug: "akhlaq-adab",
    name: "Akhlâq et Adab",
    nameArabic: "الأخلاق والآداب",
    description: "L'éthique du comportement et les bonnes manières enseignées par l'Islam.",
  },
  {
    slug: "langue-arabe",
    name: "Langue arabe",
    nameArabic: "اللغة العربية",
    description: "Les bases de la langue arabe pour accéder directement aux textes source.",
  },
  {
    slug: "invocations-adhkar",
    name: "Invocations et adhkâr",
    nameArabic: "الأدعية والأذكار",
    description: "Les invocations authentiques pour accompagner chaque moment du quotidien.",
  },
  {
    slug: "grandes-figures",
    name: "Grandes figures de l'histoire islamique",
    nameArabic: "أعلام الإسلام",
    description: "Imams, savants et figures marquantes qui ont transmis et préservé le savoir.",
  },
] as const;

export type Discipline = (typeof disciplines)[number];

export const editorialStatuses = [
  "brouillon",
  "references_a_completer",
  "en_cours_de_verification",
  "verifie",
  "approuve",
  "publie",
  "a_reviser",
  "archive",
] as const;

export type EditorialStatus = (typeof editorialStatuses)[number];

export const editorialStatusLabels: Record<EditorialStatus, string> = {
  brouillon: "Brouillon",
  references_a_completer: "Références à compléter",
  en_cours_de_verification: "En cours de vérification",
  verifie: "Vérifié sur le plan documentaire",
  approuve: "Approuvé pour publication",
  publie: "Publié",
  a_reviser: "À réviser",
  archive: "Archivé",
};

export const userRoles = [
  "administrateur",
  "redacteur",
  "verificateur",
  "responsable_scientifique",
  "membre",
] as const;

export type UserRole = (typeof userRoles)[number];
