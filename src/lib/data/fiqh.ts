import type { FiqhCourse } from "@/lib/types/content";

/**
 * Contenu de démonstration. Aucune leçon ci-dessous n'a reçu de validation
 * religieuse humaine : elles sont toutes au statut "en_cours_de_verification"
 * et portées par demonstration=true, conformément à la règle de fiabilité
 * documentaire du cahier des charges (la validation finale reste humaine).
 */
export const fiqhCourses: FiqhCourse[] = [
  {
    slug: "purification",
    titre: "La purification (Ṭahâra)",
    niveau: "debutant",
    description:
      "Les fondements de la purification rituelle selon l'école malikite : l'eau, les ablutions, le ghusl et le tayammum.",
    referentielJuridique: "École malikite — divergences avec les autres écoles signalées lorsqu'elles existent.",
    statut: "en_cours_de_verification",
    demonstration: true,
    datePublication: "2026-01-10",
    derniereMiseAJour: "2026-01-10",
    lessons: [
      {
        slug: "introduction-madhhab-malikite",
        titre: "Introduction au madhhab malikite",
        objectifPedagogique:
          "Situer l'école malikite parmi les écoles juridiques sunnites et comprendre ses principales sources.",
        niveau: "debutant",
        dureeIndicative: "10 min",
        introduction:
          "L'école malikite (al-madhhab al-mâlikî) est l'une des quatre grandes écoles juridiques sunnites. Elle tire son nom de l'imam Mâlik ibn Anas (Médine, m. 179 H), dont l'enseignement s'appuyait notamment sur la pratique vivante des habitants de Médine ('amal ahl al-Madîna).",
        explication:
          "Cette leçon introductive présente le cadre général du madhhab malikite : ses sources principales (Coran, Sunna, consensus, raisonnement analogique, et des sources propres à l'école comme l'amal médinois), son aire de diffusion historique (notamment l'Afrique du Nord et l'Afrique de l'Ouest), et la manière dont la plateforme présentera les règles pratiques dans les leçons suivantes. Lorsque d'autres écoles divergent sur un point, la divergence sera signalée avec ses sources respectives, dans un esprit de respect mutuel plutôt que de polémique.",
        pointsARetenir: [
          "Le madhhab malikite est une école juridique parmi les écoles sunnites reconnues.",
          "Il porte le nom de l'imam Mâlik ibn Anas, savant de Médine.",
          "Les divergences entre écoles seront présentées avec leurs sources, sans dénigrement.",
        ],
        notePedagogique:
          "Les détails biographiques précis sur l'imam Mâlik (dates, anecdotes, chaînes de transmission de ses œuvres) doivent être vérifiés auprès de sources biographiques fiables avant publication définitive.",
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
        titre: "L'eau et la purification",
        objectifPedagogique: "Comprendre le rôle de l'eau dans la purification rituelle et le verset fondateur qui l'évoque.",
        niveau: "debutant",
        dureeIndicative: "12 min",
        introduction:
          "La purification rituelle (ṭahâra) occupe une place centrale dans l'accomplissement de la prière. Le Coran évoque directement les ablutions dans la sourate Al-Mâ'ida.",
        texteArabe:
          "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ",
        traductionFrancaise:
          "« Ô vous qui croyez ! Lorsque vous vous levez pour la prière, lavez vos visages et vos mains jusqu'aux coudes, passez les mains mouillées sur vos têtes et lavez vos pieds jusqu'aux chevilles. »",
        explication:
          "Ce verset (sourate 5, verset 6) constitue la base scripturaire des ablutions. Les écoles juridiques, dont l'école malikite, en ont tiré des règles détaillées sur les membres concernés, l'ordre des gestes et les actes complémentaires. Les détails juridiques fins (rang des obligations, actes recommandés selon l'école malikite) seront développés dans une leçon ultérieure après validation scientifique.",
        pointsARetenir: [
          "L'eau pure est le moyen de purification de référence.",
          "Le verset 6 de la sourate Al-Mâ'ida (sourate 5) fonde les ablutions dans le Coran.",
          "Les détails juridiques fins seront ajoutés après validation par le responsable scientifique.",
        ],
        sources: [
          {
            id: "src-eau-1",
            type: "coran",
            titre: "Le Coran",
            sourate: "Al-Mâ'ida (5)",
            verset: "6",
          },
        ],
        statut: "en_cours_de_verification",
        demonstration: true,
        lessonSuivanteSlug: "les-ablutions",
      },
      {
        slug: "les-ablutions",
        titre: "Les ablutions (al-wudû')",
        objectifPedagogique: "Présenter la structure générale des ablutions avant purification.",
        niveau: "debutant",
        dureeIndicative: "15 min",
        introduction:
          "Les ablutions (al-wudû') sont la forme de purification requise avant la prière lorsque l'état d'impureté mineure est présent.",
        explication:
          "Cette leçon présente le déroulement général des ablutions tel qu'il est enseigné dans les manuels de l'école malikite (par exemple Ar-Risâla d'Ibn Abî Zayd Al-Qayrawânî ou le Mukhtasar de Khalîl). Par prudence documentaire, le détail précis des obligations (farâ'id), des actes fortement recommandés (sunan) et des actes simplement recommandés (mustahabbât) selon l'école malikite n'est pas encore publié sur cette page : il nécessite une vérification directe dans ces ouvrages de référence par le responsable scientifique de la plateforme avant publication.",
        pointsARetenir: [
          "Les ablutions précèdent la prière en cas d'impureté mineure.",
          "Les manuels malikites de référence (Ar-Risâla, Mukhtasar Khalîl) détaillent les obligations et recommandations.",
          "Le détail juridique complet est en attente de vérification scientifique avant publication.",
        ],
        sources: [
          {
            id: "src-wudu-1",
            type: "avis_juridique",
            titre: "Ar-Risâla",
            auteur: "Ibn Abî Zayd Al-Qayrawânî",
            aVerifier: true,
          },
          {
            id: "src-wudu-2",
            type: "avis_juridique",
            titre: "Mukhtasar Khalîl",
            auteur: "Khalîl ibn Ishâq",
            aVerifier: true,
          },
        ],
        statut: "references_a_completer",
        demonstration: true,
        lessonSuivanteSlug: "le-tayammum",
      },
      {
        slug: "le-tayammum",
        titre: "Le tayammum",
        objectifPedagogique: "Comprendre le principe du tayammum comme substitut à l'eau en cas d'empêchement.",
        niveau: "debutant",
        dureeIndicative: "10 min",
        introduction:
          "Le tayammum est une purification sèche qui remplace les ablutions ou le ghusl lorsque l'eau est absente, insuffisante ou qu'elle serait nuisible à la santé.",
        explication:
          "Le principe du tayammum est mentionné dans le Coran, à la suite du verset sur les ablutions. Ses modalités précises selon l'école malikite (gestes, surfaces concernées, cas d'application détaillés) seront publiées après vérification par le responsable scientifique.",
        pointsARetenir: [
          "Le tayammum est une purification sèche, substitut de l'eau dans certains cas.",
          "Son fondement coranique se trouve dans la continuité du verset sur les ablutions (sourate 5).",
        ],
        sources: [
          {
            id: "src-tayammum-1",
            type: "coran",
            titre: "Le Coran",
            sourate: "An-Nisâ' (4) / Al-Mâ'ida (5)",
            verset: "à préciser",
            aVerifier: true,
          },
        ],
        statut: "references_a_completer",
        demonstration: true,
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
