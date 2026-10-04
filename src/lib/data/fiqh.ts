import type { FiqhCourse } from "@/lib/types/content";

/**
 * Source principale des leçons sur la purification : Abdur-Rahman al-Akhdari,
 * Le Mukhtasar d'al-Akhdari sur la jurisprudence de l'école malékite, texte
 * arabe (Cheikh Samba Diagne) et traduction française (Ali Abdullah
 * Gallant), Institut islamique Daroul Îmane, Fès, 1ère édition, 2017.
 * Fichier source : references_mirath/01_SOURCES_TEXTUELLES/al_akhdari/
 * (fourni par l'autrice de la plateforme, propriétaire de l'ouvrage).
 *
 * Statut éditorial : ces leçons reprennent fidèlement la traduction
 * française de l'ouvrage (reformulée pour un format pédagogique web), avec
 * pagination précise vers le PDF source pour vérification. Elles n'ont pas
 * encore été comparées mot à mot au PDF par un humain ni validées par un
 * responsable scientifique — statut "en_cours_de_verification" tant que ce
 * contrôle n'a pas eu lieu, conformément au workflow éditorial du site.
 * `demonstration` passe à false : ce n'est plus un texte de remplissage,
 * c'est la traduction réelle de l'ouvrage, simplement non encore vérifiée.
 */
const AL_AKHDARI_SOURCE = {
  titre: "Le Mukhtasar d'al-Akhdari (traduction française)",
  auteur: "Abdur-Rahman al-Akhdari, trad. Ali Abdullah Gallant",
  edition: "Institut islamique Daroul Îmane, Fès, 1ère édition, 2017",
} as const;

export const fiqhCourses: FiqhCourse[] = [
  {
    slug: "purification",
    titre: "La purification (Ṭahâra)",
    niveau: "debutant",
    description:
      "Les fondements de la purification rituelle selon l’école malikite : l’eau, les ablutions, le ghusl et le tayammum.",
    referentielJuridique: "École malikite — divergences avec les autres écoles signalées lorsqu’elles existent.",
    statut: "en_cours_de_verification",
    demonstration: false,
    datePublication: "2026-01-10",
    derniereMiseAJour: "2026-10-04",
    lessons: [
      {
        slug: "introduction-madhhab-malikite",
        titre: "Introduction au madhhab malikite",
        objectifPedagogique:
          "Situer l’école malikite parmi les écoles juridiques sunnites et comprendre ses principales sources.",
        niveau: "debutant",
        dureeIndicative: "10 min",
        introduction:
          "L’école malikite (al-madhhab al-mâlikî) est l’une des quatre grandes écoles juridiques sunnites. Elle tire son nom de l’imam Mâlik ibn Anas (Médine, m. 179 H), dont l’enseignement s’appuyait notamment sur la pratique vivante des habitants de Médine ('amal ahl al-Madîna).",
        explication:
          "Cette leçon introductive présente le cadre général du madhhab malikite : ses sources principales (Coran, Sunna, consensus, raisonnement analogique, et des sources propres à l’école comme l’amal médinois), son aire de diffusion historique (notamment l’Afrique du Nord et l’Afrique de l’Ouest), et la manière dont la plateforme présentera les règles pratiques dans les leçons suivantes. Les leçons qui suivent s’appuient sur le Mukhtasar d’al-Akhdari, un manuel classique largement enseigné dans cette tradition, en particulier en Afrique de l’Ouest. Lorsque d’autres écoles divergent sur un point, la divergence sera signalée avec ses sources respectives, dans un esprit de respect mutuel plutôt que de polémique.",
        pointsARetenir: [
          "Le madhhab malikite est une école juridique parmi les écoles sunnites reconnues.",
          "Il porte le nom de l’imam Mâlik ibn Anas, savant de Médine.",
          "Les leçons suivantes s’appuient sur le Mukhtasar d’al-Akhdari, manuel classique de l’école malikite.",
          "Les divergences entre écoles seront présentées avec leurs sources, sans dénigrement.",
        ],
        notePedagogique:
          "Les détails biographiques précis sur l’imam Mâlik (dates, anecdotes, chaînes de transmission de ses œuvres) doivent être vérifiés auprès de sources biographiques fiables avant publication définitive.",
        sources: [
          {
            id: "src-intro-1",
            type: "contenu_editorial",
            titre: "Note de présentation éditoriale",
            aVerifier: true,
          },
        ],
        statut: "en_cours_de_verification",
        demonstration: true,
        lessonSuivanteSlug: "leau-et-la-purification",
      },
      {
        slug: "leau-et-la-purification",
        titre: "L’eau et la purification",
        objectifPedagogique:
          "Comprendre le rôle de l’eau dans la purification rituelle, son fondement coranique, et les règles de la purification des impuretés (khabath).",
        niveau: "debutant",
        dureeIndicative: "14 min",
        introduction:
          "La purification rituelle (ṭahâra) occupe une place centrale dans l’accomplissement de la prière. Le Coran évoque directement les ablutions dans la sourate Al-Mâ’ida. Al-Akhdari distingue, en ouverture de son chapitre sur la purification, deux types : la purification du ḥadath (l’état d’inaptitude légale levé par les ablutions ou le ghusl) et la purification du khabath (les impuretés matérielles).",
        texteArabe:
          "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ",
        traductionFrancaise:
          "« Ô vous qui croyez ! Lorsque vous vous levez pour la prière, lavez vos visages et vos mains jusqu’aux coudes, passez les mains mouillées sur vos têtes et lavez vos pieds jusqu’aux chevilles. »",
        explication:
          "Ce verset (sourate 5, verset 6) constitue la base scripturaire des ablutions. Selon al-Akhdari, les deux types de purification ne sont valides qu’au moyen d’une eau pure et purifiante, dont la couleur, le goût et l’odeur n’ont pas été altérés par une substance généralement absente de l’eau (huile, beurre clarifié ou autre gras animal, suint, savon, suif). Il n’y a en revanche aucun mal à ce que l’eau soit mélangée avec de la terre ou de la boue, ou que ses attributs aient été modifiés par le sol des marais salés ou par de la mousse aquatique. Concernant le khabath : si l’on est certain de l’endroit souillé par une impureté, on se contente de laver cet endroit ; en cas de doute sur l’emplacement, on lave le vêtement entier ; en cas de doute sur la présence même d’une impureté, on se contente d’asperger l’endroit soupçonné d’un peu d’eau.",
        pointsARetenir: [
          "L’eau pure et purifiante, non altérée dans sa couleur, son goût ou son odeur, est le moyen de purification de référence.",
          "Le verset 6 de la sourate Al-Mâ’ida (sourate 5) fonde les ablutions dans le Coran.",
          "Al-Akhdari distingue la purification du ḥadath (état levé par wuḍû’/ghusl) et celle du khabath (impuretés matérielles).",
          "En cas de doute sur l’emplacement d’une impureté, on lave le vêtement entier ; en cas de doute sur sa présence, on asperge seulement.",
        ],
        sources: [
          {
            id: "src-eau-1",
            type: "coran",
            titre: "Le Coran",
            sourate: "Al-Mâ’ida (5)",
            verset: "6",
          },
          {
            id: "src-eau-2",
            ...AL_AKHDARI_SOURCE,
            type: "avis_juridique",
            page: "18-20",
          },
        ],
        statut: "en_cours_de_verification",
        demonstration: false,
        lessonSuivanteSlug: "les-ablutions",
      },
      {
        slug: "les-ablutions",
        titre: "Les ablutions (al-wuḍû’)",
        objectifPedagogique:
          "Connaître les actes obligatoires, fortement recommandés et méritoires des ablutions selon al-Akhdari, ainsi que ce qui les annule.",
        niveau: "debutant",
        dureeIndicative: "18 min",
        introduction:
          "Les ablutions (al-wuḍû’) sont la forme de purification requise avant la prière lorsque l’état d’impureté mineure (ḥadath) est présent. Al-Akhdari distingue trois catégories d’actes : les obligations (farâ’iḍ), les actes fortement recommandés (sunan) et les actes méritoires (fadâ’il).",
        explication:
          "Les farâ’iḍ (actes obligatoires) du wuḍû’ sont au nombre de sept : en formuler l’intention, se laver le visage, se laver les mains et les avant-bras jusqu’aux coudes, passer les mains mouillées (mash) sur le dessus de la tête, se laver les pieds jusqu’aux chevilles, se frotter les membres en les lavant, et accomplir son wuḍû’ sans longue interruption. Les sunan comprennent notamment : se laver les mains jusqu’aux poignets en début de wuḍû’, la madmaḍah (rincer la bouche), l’istinchâq et l’istinthâr (aspirer puis expulser l’eau des narines), refaire le mash du dessus de la tête en sens contraire, le mash des oreilles, et le respect de l’ordre des farâ’iḍ. Les fadâ’il (actes méritoires, moins fortement recommandés que les sunan) incluent : dire « bismillâh », utiliser le siwâk, laver une seconde et une troisième fois le visage, les mains et les avant-bras, commencer le mash par le devant de la tête, économiser l’eau, et laver les membres droits avant les membres gauches. Il est obligatoire de laver entre les doigts, et recommandé de laver entre les orteils. Le wuḍû’ est annulé par les ḥadath (urination, défécation, gaz, émission de madhy ou de wady) et par leurs causes (sommeil profond, évanouissement, ivresse, folie, baiser sur les lèvres, attouchement sexuel). Il est interdit, sans wuḍû’, d’accomplir la prière, le tawâf, ou de toucher un exemplaire du Coran.",
        pointsARetenir: [
          "Sept actes sont obligatoires (farâ’iḍ) dans le wuḍû’ : intention, lavage du visage, des mains/avant-bras, mash de la tête, lavage des pieds, frottement et continuité.",
          "Oublier un acte obligatoire (farâ’iḍ) impose en général de refaire les prières accomplies depuis l’oubli ; oublier un acte recommandé (sunan) n’impose pas de les refaire.",
          "Le wuḍû’ est annulé par les émissions naturelles (urine, selles, gaz…) et par certaines causes (sommeil profond, évanouissement, attouchement sexuel…).",
          "Sans wuḍû’, il est interdit de prier, de faire le tawâf ou de toucher le Coran (hors cas d’apprentissage précisés par les savants).",
        ],
        notePedagogique:
          "Synthèse fidèle de la traduction française d’al-Akhdari ; les distinctions fines entre sunan et fadâ’il, ainsi que les cas particuliers de rappel tardif d’un membre oublié, gagneraient à être illustrées par un tableau récapitulatif dans une prochaine itération.",
        sources: [
          {
            id: "src-wudu-1",
            ...AL_AKHDARI_SOURCE,
            type: "avis_juridique",
            page: "20-30",
          },
        ],
        statut: "en_cours_de_verification",
        demonstration: false,
        lessonSuivanteSlug: "le-ghusl",
      },
      {
        slug: "le-ghusl",
        titre: "Le ghusl (grande ablution)",
        objectifPedagogique:
          "Comprendre ce qui rend le ghusl obligatoire et connaître ses actes obligatoires, recommandés et méritoires selon al-Akhdari.",
        niveau: "debutant",
        dureeIndicative: "14 min",
        introduction:
          "Le ghusl est le lavage de toute la surface externe du corps, effectué par le fidèle pour sortir de l’état de ḥadath majeur (janâbah, menstrues, lochies).",
        explication:
          "Trois choses rendent le ghusl obligatoire selon al-Akhdari : l’état de janâbah, les menstruations et les lochies (pertes de sang causées par l’accouchement). L’état de janâbah a deux causes possibles : l’émission de manî (sperme chez l’homme, liquide émis en cas d’orgasme chez la femme) accompagnée de jouissance, pendant le sommeil ou à l’état d’éveil ; ou la pénétration du gland du pénis dans le vagin. Les farâ’iḍ (actes obligatoires) du ghusl sont : en formuler l’intention au début, le faire sans longue interruption, se frotter le corps en le lavant, et inclure toute la surface du corps. Les sunan comprennent : se laver les mains jusqu’aux poignets comme pour le wuḍû’, faire la madmaḍah, l’istinchâq et l’istinthâr, et laver le conduit auditif externe (le pavillon de l’oreille, lui, doit obligatoirement être lavé sur ses faces interne et externe). Les fadâ’il incluent : commencer par laver les parties touchées par des impuretés, puis se laver le sexe (moment où l’on formule l’intention), puis laver les membres du wuḍû’ une fois chacun, puis laver le haut du corps avant le bas, laver la tête trois fois, et laver le côté droit avant le côté gauche. Il est interdit à celui qui est en état de janâbah d’entrer dans une mosquée ou de réciter le Coran, à moins qu’il ne s’agisse que d’un seul verset ou d’un peu plus, récité à des fins de protection.",
        pointsARetenir: [
          "Trois causes rendent le ghusl obligatoire : la janâbah, les menstruations et les lochies.",
          "Quatre actes sont obligatoires (farâ’iḍ) : intention, continuité, frottement, et lavage de toute la surface du corps.",
          "Dans le cadre du ghusl (contrairement au wuḍû’), il faut faire pénétrer l’eau même dans une barbe épaisse.",
          "En état de janâbah, il est interdit d’entrer dans une mosquée ou de réciter le Coran, sauf exception limitée (un verset environ, à but protecteur).",
        ],
        sources: [
          {
            id: "src-ghusl-1",
            ...AL_AKHDARI_SOURCE,
            type: "avis_juridique",
            page: "30-37",
          },
        ],
        statut: "en_cours_de_verification",
        demonstration: false,
        lessonSuivanteSlug: "le-tayammum",
      },
      {
        slug: "le-tayammum",
        titre: "Le tayammum",
        objectifPedagogique:
          "Comprendre le principe du tayammum, qui peut y recourir, et connaître ses actes obligatoires selon al-Akhdari.",
        niveau: "debutant",
        dureeIndicative: "12 min",
        introduction:
          "Le tayammum est une purification sèche, à l’aide de terre ou d’une matière semblable, qui remplace le wuḍû’ ou le ghusl lorsque l’eau est absente, insuffisante, ou que son usage serait nuisible à la santé.",
        explication:
          "Selon al-Akhdari, le voyageur — dont le voyage n’est pas en lui-même un acte de désobéissance envers Allah — ainsi que le malade, peuvent faire le tayammum pour accomplir leurs prières obligatoires ou surérogatoires. Le résident en bonne santé, en revanche, ne peut faire le tayammum que pour une prière obligatoire dont il craint de manquer l’heure prescrite ; il ne lui est pas permis d’y recourir pour une prière surérogatoire, la prière du vendredi, ou la prière funéraire (sauf si celle-ci constitue pour lui une obligation individuelle). Les farâ’iḍ (actes obligatoires) du tayammum sont : en formuler l’intention, utiliser du ṣa‘îd pur (terre, banco, pierre, neige, boue ou matière semblable — à l’exclusion du gypse cuit, d’une natte, de bois ou d’herbe), faire le mash du visage, faire le mash de chaque main jusqu’au poignet, poser les mains sur le sol une première fois, accomplir le geste sans longue interruption, ne le faire qu’une fois l’heure de la prière commencée, et prier immédiatement après l’avoir accompli.",
        pointsARetenir: [
          "Le tayammum est une purification sèche, substitut du wuḍû’ ou du ghusl en l’absence ou l’impossibilité d’utiliser l’eau.",
          "Le voyageur et le malade peuvent y recourir plus largement que le résident en bonne santé.",
          "Le résident en bonne santé ne peut y recourir que pour une prière obligatoire dont il craindrait de manquer l’heure.",
          "Le ṣa‘îd pur (terre, banco, pierre, neige, boue…) est requis ; le gypse cuit, une natte, du bois ou de l’herbe ne conviennent pas.",
        ],
        sources: [
          {
            id: "src-tayammum-1",
            ...AL_AKHDARI_SOURCE,
            type: "avis_juridique",
            page: "38-40",
          },
        ],
        statut: "en_cours_de_verification",
        demonstration: false,
      },
    ],
  },
];

export function getFiqhCourse(slug: string) {
  return fiqhCourses.find((course) => course.slug === slug);
}

export function getFiqhLesson(courseSlug: string, lessonSlug: string) {
  const course = getFiqhCourse(courseSlug);
  return course?.lessons.find((lesson) => lesson.slug === lessonSlug);
}
