import type { LearningPath, LearningLesson } from "@/lib/types/content";

/** Commentaires pédagogiques MIRÂTH, distincts des textes cités.
 * Arabe : toujours lu depuis le corpus Coran ou les fiches hadiths documentées.
 * Contrôle des références : Coran 1:1–7 ; Bukhârî 2387, 2400, 6446 ; Muslim 1563a.
 * Aucun cours de fiqh non validé n'est promu au statut publié par ces parcours.
 */
const coran: LearningLesson[] = [
  {
    slug: "louange-et-misericorde", titre: "Al-Fâtiha : louange et miséricorde", minutes: 8,
    objectif: "Reconnaître les thèmes des quatre premiers versets et distinguer le texte arabe de sa traduction.",
    quranVerses: { chapter: 1, verses: [1, 2, 3, 4] },
    sections: [
      { titre: "Lire le passage avant le commentaire", paragraphes: ["Al-Fâtiha est la première sourate dans l’ordre du Coran. Le lecteur MIRÂTH présente ses sept versets selon l’édition Hafs utilisée sur le site. Prenez d’abord le temps de lire le texte, puis la traduction du sens sous chaque verset.", "Les premiers versets mentionnent le nom d’Allah, la louange, Sa miséricorde et le Jour de la rétribution. Repérer ces thèmes permet de suivre le passage sans prétendre épuiser son commentaire."] },
      { titre: "Observer les mots qui reviennent", paragraphes: ["Les noms traduits par « le Tout Miséricordieux » et « le Très Miséricordieux » figurent dans la basmalah puis dans le troisième verset. La répétition est visible dans le texte lui-même. Comparez les deux lignes arabes et leurs traductions.", "Le verset 2 associe la louange à Allah, Seigneur de l’univers. Le verset 4 mentionne le Jour de la rétribution. Ces repères aident à distinguer les thèmes plutôt qu’à lire la sourate comme une seule phrase indistincte."] },
      { titre: "Utiliser une traduction avec précision", paragraphes: ["La formulation française affichée est celle de Muhammad Hamidullah, diffusée par Tanzil. Elle aide à accéder au sens ; elle ne remplace pas le texte arabe. Lorsque vous citez le passage en français, indiquez qu’il s’agit d’une traduction du sens, avec le nom du traducteur.", "Pour approfondir une expression, ouvrez le tafsîr du verset dans le lecteur. MIRÂTH y distingue le commentaire arabe d’Ibn Kathîr et l’explication française d’Al-Mukhtasar : deux ouvrages différents."] },
    ],
    retenir: ["Lire d’abord les versets, puis les explications.", "Repérer la louange, la miséricorde et le Jour de la rétribution.", "Nommer la traduction du sens et son traducteur."],
    exercice: "Relisez les versets 1 à 4 et associez à chacun son thème principal : basmalah, louange, miséricorde ou Jour de la rétribution.",
    correction: "Dans la numérotation utilisée ici : 1, la basmalah ; 2, la louange à Allah, Seigneur de l’univers ; 3, la miséricorde ; 4, le Jour de la rétribution. La miséricorde est aussi mentionnée dans la basmalah.",
    questions: [
      { question: "Quel thème retrouve-t-on aux versets 1 et 3 ?", options: ["La description d’une dette", "La miséricorde", "Un récit historique"], answer: 1, explanation: "Les deux versets mentionnent les noms traduits par le Tout Miséricordieux et le Très Miséricordieux." },
      { question: "Comment présenter la version française d’un verset ?", options: ["Comme une traduction du sens, avec son traducteur", "Comme le texte arabe original", "Comme un hadith"], answer: 0, explanation: "Le texte coranique arabe et la traduction française du sens doivent rester distincts." },
    ],
    ressources: [{ label: "Lire Al-Fâtiha et ouvrir son tafsîr", href: "/coran/1" }, { label: "Comparer le texte — Quran.com, sourate 1", href: "https://quran.com/al-fatihah" }],
  },
  {
    slug: "adoration-et-guidance", titre: "Adoration, aide et demande de guidance", minutes: 7,
    objectif: "Identifier à qui s’adresse le passage et la demande exprimée aux versets 5 à 7.",
    quranVerses: { chapter: 1, verses: [5, 6, 7] },
    sections: [
      { titre: "Une adresse à Allah", paragraphes: ["Après les versets de louange, le verset 5 s’adresse à Allah : le passage associe l’adoration et la demande d’aide. Lisez ensemble les deux membres de la phrase, afin de ne pas réduire le verset à une seule de ses expressions.", "Dans la traduction affichée, « nous adorons » et « nous implorons secours » sont au pluriel. C’est une observation du texte, utile pour reconnaître la formulation du passage."] },
      { titre: "Une demande précise", paragraphes: ["Le verset 6 demande la guidance dans le droit chemin. Le verset 7 poursuit cette demande en décrivant le chemin de ceux qu’Allah a comblés de faveurs et en écartant les deux voies mentionnées à la fin du passage.", "Les versets 6 et 7 se lisent donc ensemble : le second complète le premier. Pour étudier leurs expressions en détail, consultez le commentaire identifié dans le lecteur plutôt que d’ajouter une interprétation personnelle à la citation."] },
      { titre: "Relier les deux parties de la sourate", paragraphes: ["Relisez maintenant les sept versets. Repérez d’abord les thèmes de louange, puis l’adresse à Allah et la demande de guidance. Ce travail de lecture permet de reconnaître l’enchaînement des idées sans attribuer un mérite ou un nombre de répétitions au-delà des sources.", "La présente leçon est un accompagnement pédagogique. Elle n’est ni une traduction supplémentaire du Coran ni une explication exhaustive de la sourate."] },
    ],
    retenir: ["Le verset 5 associe adoration et demande d’aide.", "Le verset 6 demande la guidance.", "Le verset 7 complète la description du chemin demandé."],
    exercice: "Expliquez en deux phrases la différence entre ce qui est affirmé au verset 5 et ce qui est demandé au verset 6.",
    correction: "Le verset 5 exprime l’adoration d’Allah et la demande de Son aide. Le verset 6 formule la demande d’être guidé dans le droit chemin. Ce résumé accompagne le texte sans le remplacer.",
    questions: [
      { question: "Que demande le verset 6 ?", options: ["Un nombre précis de biens", "Une date de remboursement", "La guidance dans le droit chemin"], answer: 2, explanation: "Le verset 6 est traduit : « Guide-nous dans le droit chemin »." },
      { question: "Pourquoi lire les versets 6 et 7 ensemble ?", options: ["Ils appartiennent à deux recueils différents", "Le verset 7 complète le chemin mentionné au verset 6", "Le verset 7 est une parole prophétique"], answer: 1, explanation: "La fin de la sourate précise le chemin demandé dans le verset précédent." },
    ],
    ressources: [{ label: "Relire les versets 5 à 7", href: "/coran/1#verset-5" }, { label: "Texte de la sourate — Quran.com", href: "https://quran.com/al-fatihah" }],
  },
  {
    slug: "lire-ecouter-et-comparer", titre: "Lire, écouter et consulter un tafsîr", minutes: 6,
    objectif: "Choisir les bons outils de lecture et identifier l’origine de chaque explication.",
    sections: [
      { titre: "Commencer par une lecture accessible", paragraphes: ["Le lecteur permet d’ajuster la taille du texte arabe et d’afficher ou de masquer la traduction française. Choisissez une présentation que vous pouvez lire sans effort ; le mode lecture concentrée réduit les éléments périphériques.", "Écoutez ensuite un verset, puis relisez-le. Le signet sert à retrouver une position. Ces outils accompagnent votre travail ; ils ne constituent pas une validation de votre prononciation, qui peut demander l’aide d’un enseignant."] },
      { titre: "Comparer des sources identifiées", paragraphes: ["Une traduction du sens et un tafsîr n’ont pas le même rôle. La première rend le passage dans une autre langue ; le second l’explique. Vérifiez le nom de l’ouvrage au-dessus du texte avant de reprendre une explication.", "Sur MIRÂTH, le texte arabe d’Ibn Kathîr et l’explication française d’Al-Mukhtasar sont affichés séparément. Il serait incorrect de présenter le passage français comme une traduction d’Ibn Kathîr."] },
      { titre: "Tenir compte de la récitation choisie", paragraphes: ["Le texte courant du lecteur est en Hafs. Certaines sources externes proposent une autre lecture, explicitement signalée. Une récitation de sourate entière sans découpage par verset ne peut pas offrir la même synchronisation qu’un enregistrement découpé.", "Le code couleur du tajwîd s’appuie sur une édition annotée distincte. En cas d’indisponibilité de la source, le texte habituel reste lisible : une panne d’annotation ne doit pas modifier ou inventer les versets."] },
    ],
    retenir: ["Une traduction et un tafsîr sont deux types de texte différents.", "Ibn Kathîr en arabe et Al-Mukhtasar en français restent deux ouvrages.", "Lire les indications de source et de récitation avant de comparer."],
    exercice: "Ouvrez le tafsîr d’un verset d’Al-Fâtiha. Notez le nom de l’ouvrage arabe, celui de l’ouvrage français et le nom du traducteur du verset.",
    correction: "Le lecteur identifie Ibn Kathîr pour le tafsîr arabe, Al-Mukhtasar pour l’explication française et Muhammad Hamidullah pour la traduction du sens du verset.",
    questions: [
      { question: "L’explication française Al-Mukhtasar est-elle la traduction du texte d’Ibn Kathîr affiché ?", options: ["Oui", "Non, ce sont deux ouvrages différents", "Seulement quand l’audio joue"], answer: 1, explanation: "Les deux ouvrages sont nommés et présentés séparément dans le lecteur." },
      { question: "Si la source des annotations de tajwîd est indisponible, que doit-on lire ?", options: ["Le texte coranique habituel", "Une reconstitution des annotations", "Un texte sans référence"], answer: 0, explanation: "Le texte habituel reste accessible ; aucune annotation n’est fabriquée." },
    ],
    ressources: [{ label: "Essayer le lecteur et ses sources", href: "/coran/1" }, { label: "Méthode documentaire MIRÂTH", href: "/a-propos/politique-editoriale" }],
  },
];

const hadith: LearningLesson[] = [
  {
    slug: "intention-et-remboursement", titre: "L’intention sincère de rembourser", minutes: 7,
    objectif: "Comprendre le contraste entre rembourser et prendre les biens d’autrui pour les détruire.",
    hadithIds: ["bukhari-2387"],
    sections: [
      { titre: "Lire les deux parties du hadith", paragraphes: ["Le hadith 2387 d’Al-Bukhârî oppose deux intentions : prendre les biens des gens avec la volonté de les restituer, ou les prendre avec la volonté de les détruire. Pour saisir le propos, lisez les deux parties au lieu de reprendre seulement la première.", "L’aide d’Allah mentionnée dans le hadith est liée à l’intention de restituer. Le texte ne donne aucun délai chiffré et ne promet pas qu’une formule récitée effacera mécaniquement une dette."] },
      { titre: "Une responsabilité envers autrui", paragraphes: ["L’argent évoqué appartient à d’autres personnes. La leçon porte donc sur une intention qui concerne leurs droits. Une bonne intention ne transforme pas le bien d’autrui en cadeau et ne dispense pas de la volonté de restitution.", "Comme exercice de réflexion, distinguez la phrase « je souhaite rendre ce qui m’a été confié » d’une attitude consistant à prendre sans vouloir restituer. Cette distinction reprend l’opposition du texte, sans juger l’intention d’une personne précise."] },
    ],
    retenir: ["Lire le hadith dans son ensemble.", "La volonté de restituer est centrale.", "Aucun délai de remboursement miraculeux n’est donné."],
    exercice: "Une publication affirme : « Ce hadith garantit l’effacement de toutes les dettes en sept jours ». Comparez cette affirmation au texte et repérez ce qui a été ajouté.",
    correction: "Le délai de sept jours et l’effacement automatique ne figurent pas dans le hadith. Il distingue l’intention de rembourser de l’intention de détruire les biens d’autrui.",
    questions: [
      { question: "Quelle intention est mise en valeur dans ce hadith ?", options: ["Restituer les biens pris", "Multiplier les emprunts", "Ne jamais informer le créancier"], answer: 0, explanation: "Le texte mentionne celui qui prend les biens avec l’intention de les restituer." },
      { question: "Quel délai de remboursement le hadith indique-t-il ?", options: ["Sept jours", "Quarante jours", "Aucun délai chiffré"], answer: 2, explanation: "Aucun nombre de jours n’est indiqué dans cette narration." },
    ],
    ressources: [{ label: "Al-Bukhârî 2387 — texte et référence", href: "https://sunnah.com/bukhari:2387" }, { label: "La collection complète MIRÂTH", href: "/invocations/dettes-difficultes-financieres#bukhari-2387" }],
  },
  {
    slug: "capacite-et-difficulte", titre: "Distinguer retard injuste et difficulté réelle", minutes: 8,
    objectif: "Comparer le cas de celui qui peut payer avec celui d’une personne en difficulté.",
    hadithIds: ["bukhari-2400", "muslim-1563a"],
    sections: [
      { titre: "Tenir compte de la capacité de paiement", paragraphes: ["Al-Bukhârî 2400 qualifie d’injustice le retard de paiement de celui qui en a les moyens. La capacité de payer est donc un élément essentiel du propos. Le texte ne doit pas être utilisé pour assimiler toute difficulté financière à un refus volontaire.", "Lorsqu’on cite une règle courte, conserver sa condition est aussi important que conserver ses mots. Retirer « lorsqu’on peut payer » changerait la portée de cette présentation du hadith."] },
      { titre: "Lire aussi le texte sur l’indulgence", paragraphes: ["Muslim 1563a rapporte, dans le récit d’Abû Qatâda, la recommandation d’accorder un délai à une personne en difficulté ou de lui remettre sa dette. Le créancier est ainsi invité à considérer la situation du débiteur.", "Les deux références éclairent des situations différentes : l’une concerne un retard malgré les moyens, l’autre la difficulté de celui qui ne peut pas s’acquitter. Les lire ensemble évite une présentation qui n’insisterait que sur un seul côté de la relation."] },
      { titre: "Rester prudent dans un cas personnel", paragraphes: ["Cette comparaison enseigne des distinctions présentes dans les textes. Elle ne permet pas, à elle seule, de décider si une personne précise est réellement capable de payer ni de trancher un litige financier.", "Pour une situation concrète, les faits et les engagements doivent être connus. Demandez un avis compétent plutôt que de transformer une courte leçon en verdict sur autrui."] },
    ],
    retenir: ["Retard malgré les moyens et incapacité réelle sont deux situations différentes.", "Le texte sur l’indulgence mentionne un délai ou une remise.", "Conserver les conditions d’une citation."],
    exercice: "Comparez deux situations fictives : A dispose de la somme mais retarde volontairement ; B est réellement incapable de payer. Quelle référence éclaire chacune ?",
    correction: "Le cas A correspond au retard malgré les moyens évoqué par Al-Bukhârî 2400. Muslim 1563a éclaire l’attitude du créancier envers une personne comme B, en difficulté. Cela ne constitue pas un jugement sur un dossier réel.",
    questions: [
      { question: "Quelle condition est essentielle dans Al-Bukhârî 2400 ?", options: ["Le nombre de créanciers", "La capacité de payer", "Le jour de la semaine"], answer: 1, explanation: "Le hadith vise le retard de celui qui a les moyens de payer." },
      { question: "Quelles attitudes Muslim 1563a mentionne-t-il ?", options: ["Accorder un délai ou remettre la dette", "Imposer une pénalité chiffrée", "Publier les coordonnées du débiteur"], answer: 0, explanation: "La parole rapportée invite à soulager la personne en difficulté par un délai ou une remise." },
    ],
    ressources: [{ label: "Al-Bukhârî 2400", href: "https://sunnah.com/bukhari:2400" }, { label: "Muslim 1563a et son récit", href: "https://sunnah.com/muslim:1563a" }],
  },
  {
    slug: "richesse-et-contentement", titre: "La richesse du cœur", minutes: 6,
    objectif: "Distinguer l’accumulation de biens du contentement évoqué dans le hadith.",
    hadithIds: ["bukhari-6446"],
    sections: [
      { titre: "Reconnaître le contraste", paragraphes: ["Al-Bukhârî 6446 oppose l’abondance des biens à la richesse de l’âme. Le propos déplace l’attention vers le contentement intérieur. Il ne se contente pas de décrire un montant d’argent ou une catégorie sociale.", "Ce contraste est le point à retenir de la leçon. Relisez l’arabe et la traduction du sens, puis reformulez l’opposition sans ajouter un programme d’enrichissement ou une promesse financière."] },
      { titre: "Respecter la portée du texte", paragraphes: ["Le hadith n’affirme pas que toutes les personnes disposant de biens manquent de contentement. Il ne donne pas non plus un seuil chiffré à partir duquel quelqu’un serait riche. Évitez ces généralisations quand vous partagez la référence.", "Une explication pédagogique peut aider à reconnaître le thème, mais elle reste séparée de la parole prophétique. Citez le texte avec sa référence, puis indiquez clairement ce qui relève de votre résumé."] },
    ],
    retenir: ["Le hadith distingue biens nombreux et richesse de l’âme.", "Il ne fixe aucun seuil monétaire.", "Séparer citation, traduction et commentaire."],
    exercice: "Rédigez une phrase de résumé, puis vérifiez qu’elle n’affirme ni un montant précis ni un jugement sur toutes les personnes riches.",
    correction: "Exemple de commentaire : « Le hadith met en valeur le contentement de l’âme plutôt que la seule abondance des biens. » Cette phrase est un résumé pédagogique, pas une citation prophétique.",
    questions: [
      { question: "Quelle richesse le hadith met-il en valeur ?", options: ["Une somme identique pour tous", "Le nombre d’objets possédés", "La richesse de l’âme"], answer: 2, explanation: "La seconde partie du hadith nomme la richesse de l’âme, ou du cœur." },
      { question: "Un résumé pédagogique doit-il être attribué mot pour mot au Prophète ﷺ ?", options: ["Oui, même si les mots sont différents", "Non, il doit rester distinct de la citation", "Seulement sur une carte illustrée"], answer: 1, explanation: "Une reformulation est un commentaire. Elle doit être identifiée comme telle." },
    ],
    ressources: [{ label: "Al-Bukhârî 6446", href: "https://sunnah.com/bukhari:6446" }, { label: "Hadiths sur la subsistance", href: "/invocations/dettes-difficultes-financieres#hadiths" }],
  },
];

const sources: LearningLesson[] = [
  {
    slug: "texte-traduction-commentaire", titre: "Texte, traduction et commentaire", minutes: 6,
    objectif: "Identifier la nature d’un passage avant de le citer ou de le partager.",
    sections: [
      { titre: "Trois niveaux à distinguer", paragraphes: ["Une page peut contenir un verset, la traduction de son sens et une explication. Leur proximité visuelle ne les rend pas équivalents. Le texte arabe coranique, les mots du traducteur et le commentaire de l’auteur doivent rester identifiables.", "La même précaution vaut pour un hadith : une explication affichée sous la traduction ne devient pas, par cet emplacement, une parole prophétique."] },
      { titre: "Reconnaître un extrait", paragraphes: ["Une sélection de quelques mots peut être utile, à condition d’être annoncée comme un extrait. Elle ne doit pas être présentée comme la narration complète si le récit ou d’autres paroles ont été omis.", "Dans la collection sur les dettes, les notes précisent les extraits et le contexte. Consultez la fiche et la référence source avant de reprendre une citation isolée."] },
      { titre: "Partager sans changer l’attribution", paragraphes: ["Avant de copier une fiche, repérez quatre éléments : la nature du texte, sa référence, l’origine de la traduction et la présence d’un commentaire. Conservez ces repères dans votre partage.", "Les boutons de copie facilitent cette opération ; ils ne dispensent pas de lire la fiche. Une image élégante ou une publication très partagée ne constitue pas une référence religieuse."] },
    ],
    retenir: ["Identifier le texte avant de le partager.", "Un commentaire n’est pas une parole prophétique.", "Annoncer un extrait comme un extrait."],
    exercice: "Vous voyez une carte qui mêle une traduction de hadith et une explication sous le même guillemet. Que faut-il séparer ?",
    correction: "Il faut séparer la traduction du sens du hadith de l’explication pédagogique, puis conserver la référence. Les guillemets ne doivent pas faire passer le commentaire pour la parole citée.",
    questions: [
      { question: "Une belle capture constitue-t-elle une source religieuse ?", options: ["Oui, si elle est dorée", "Non, il faut une référence vérifiable", "Oui, si elle est populaire"], answer: 1, explanation: "La présentation visuelle ne garantit ni l’origine ni l’exactitude d’un texte." },
      { question: "Comment désigner quelques mots tirés d’une narration plus longue ?", options: ["Texte complet", "Avis de toutes les écoles", "Extrait"], answer: 2, explanation: "Le lecteur doit savoir que seule une partie de la narration est reproduite." },
    ],
    ressources: [{ label: "Voir les textes et leurs notes", href: "/invocations/dettes-difficultes-financieres" }, { label: "Politique éditoriale", href: "/a-propos/politique-editoriale" }],
  },
  {
    slug: "auteur-edition-reference", titre: "Auteur, édition et référence", minutes: 7,
    objectif: "Lire une notice bibliographique et comprendre pourquoi une édition doit être précisée.",
    sections: [
      { titre: "Identifier l’ouvrage consulté", paragraphes: ["Un titre ne suffit pas toujours à identifier le texte lu. Une notice bibliographique précise l’auteur, la langue, l’édition et, lorsque c’est connu, le traducteur. Deux versions françaises d’un même ouvrage peuvent avoir des mots et des paginations différents.", "La bibliothèque MIRÂTH affiche ces éléments pour les exemplaires du corpus. Une attribution « à confirmer » ne doit pas devenir une attribution certaine dans votre résumé."] },
      { titre: "Retrouver une citation", paragraphes: ["Une référence de livre gagne en précision avec l’édition et la page. Pour un verset, le numéro de sourate et de verset permet d’identifier le passage. Pour un hadith, conservez le nom du recueil et la numérotation de l’édition ou de la source consultée.", "Il existe plusieurs systèmes de numérotation des hadiths. Si un résultat semble différent, comparez le texte et les indications de la source, sans conclure immédiatement que la citation est fausse."] },
      { titre: "Garder les informations manquantes visibles", paragraphes: ["Une notice documentaire peut être utile même lorsqu’un fichier n’est pas disponible. Elle renseigne sur l’ouvrage ; elle ne prouve pas que MIRÂTH en propose le texte intégral.", "Lorsque l’auteur ou l’édition reste à contrôler, signalez cette limite. Il est préférable de conserver un champ incertain que de le compléter avec une information supposée."] },
    ],
    retenir: ["Nommer l’auteur, la langue et l’édition.", "La pagination dépend de l’édition.", "Une attribution incertaine reste incertaine."],
    exercice: "Ouvrez la notice du Mukhtasar d’al-Akhdarî. Relevez son auteur, le traducteur indiqué et l’année d’édition.",
    correction: "La notice du corpus indique Abdur-Rahman al-Akhdarî, la traduction d’Ali Abdullah Gallant et une première édition à Fès en 2017. Ce sont les renseignements de cette édition, pas de toutes les éditions du livre.",
    questions: [
      { question: "Pourquoi préciser l’édition quand on cite une page ?", options: ["La pagination peut varier entre éditions", "Pour rendre le texte plus long", "Pour remplacer le nom de l’auteur"], answer: 0, explanation: "Un numéro de page seul peut ne pas permettre de retrouver le passage dans une autre édition." },
      { question: "Que faire d’un auteur indiqué « à confirmer » ?", options: ["Choisir le nom le plus connu", "Conserver l’incertitude", "Supprimer la mention dans la citation"], answer: 1, explanation: "Une information manquante ne doit pas être remplacée par une attribution inventée." },
    ],
    ressources: [{ label: "Notice du Mukhtasar d’al-Akhdarî", href: "/bibliotheque/mukhtasar-al-akhdari" }, { label: "Consulter les notices", href: "/bibliotheque" }],
  },
  {
    slug: "authenticite-et-disponibilite", titre: "Authenticité et disponibilité d’un texte", minutes: 6,
    objectif: "Distinguer le degré d’un hadith, la vérification éditoriale et les droits de diffusion d’un fichier.",
    sections: [
      { titre: "Des indications qui répondent à des questions différentes", paragraphes: ["Le degré d’authenticité d’un hadith concerne la narration. Le statut éditorial indique où en est le contrôle d’une fiche. Les droits de diffusion déterminent si un fichier ou une édition peut être proposé. Ces trois informations ne doivent pas être confondues.", "Un hadith identifié dans un recueil authentique ne rend pas automatiquement libre de droits toute traduction moderne qui le reproduit. À l’inverse, un fichier disponible ne garantit pas la vérification de toutes ses attributions."] },
      { titre: "Lire ce qui est réellement disponible", paragraphes: ["La bibliothèque distingue les ouvrages à lire, les accès à une source externe et les notices documentaires. Une notice sans fichier reste une notice : il n’y a pas de téléchargement à inventer pour donner l’impression d’une bibliothèque plus fournie.", "Un document en attente de vérification reste à ce stade, même s’il peut servir au travail éditorial. Sur MIRÂTH, les parcours publiés ne changent pas le statut des cours de fiqh encore en cours de contrôle."] },
      { titre: "Ne pas ajouter de mérite sans source", paragraphes: ["Une invocation authentique ne justifie pas à elle seule un nombre fixe de répétitions, un moment imposé ou une promesse de résultat chiffrée. Ces ajouts demandent leurs propres preuves.", "Lorsque la source ne précise pas un nombre, la fiche le dit. Cette transparence protège la distinction entre le texte transmis et les habitudes ou commentaires ajoutés autour de lui."] },
    ],
    retenir: ["Authenticité, statut éditorial et droits de diffusion sont distincts.", "Disponibilité d’un fichier et fiabilité du contenu ne sont pas synonymes.", "Un nombre de répétitions demande une source propre."],
    exercice: "Une fiche indique un hadith authentique, mais le PDF d’une traduction est marqué « droits non vérifiés ». Peut-on en déduire que le PDF est téléchargeable ?",
    correction: "Non. Le degré du hadith et le droit de diffuser ce PDF sont deux questions différentes. La fiche peut présenter une référence sans distribuer cette édition.",
    questions: [
      { question: "Un hadith authentique autorise-t-il automatiquement la diffusion de tout PDF qui le traduit ?", options: ["Oui", "Seulement si le PDF est court", "Non, les droits de cette édition restent à vérifier"], answer: 2, explanation: "L’authenticité d’une narration n’établit pas les droits de reproduction d’une traduction ou d’une édition." },
      { question: "Si la narration ne donne aucun nombre de répétitions, que faut-il faire ?", options: ["Ne pas lui attribuer un nombre fixe sans autre preuve", "Choisir sept pour simplifier", "Reprendre le nombre le plus partagé"], answer: 0, explanation: "Le nombre est un ajout qui nécessite sa propre source ; il ne doit pas être inventé." },
    ],
    ressources: [{ label: "Lire la méthode éditoriale", href: "/a-propos/politique-editoriale" }, { label: "Invocations : contexte et répétitions", href: "/invocations/dettes-difficultes-financieres" }],
  },
];

function path(slug: string, titre: string, description: string, objectifs: string[], lessons: LearningLesson[]): LearningPath {
  return { slug, titre, description, objectifs, lessons, niveauRequis: "aucun", etapes: lessons.map(lesson => ({ titre: lesson.titre, lienHref: `/apprendre/${slug}/${lesson.slug}` })) };
}
export const learningPaths: LearningPath[] = [
  path("lire-le-coran", "Comprendre Al-Fâtiha", "Lire les sept versets, reconnaître leurs thèmes et utiliser les traductions et le tafsîr avec précision.", ["Repérer la louange et la demande de guidance", "Distinguer verset, traduction et tafsîr", "Lire et écouter avec les bons repères"], coran),
  path("explorer-les-recueils-de-hadith", "Dettes : responsabilité et bienveillance", "Étudier quatre hadiths sur l’intention, le paiement, l’indulgence et la richesse du cœur.", ["Lire les paroles avec leurs conditions", "Distinguer capacité de paiement et difficulté", "Comprendre le contraste entre biens et contentement"], hadith),
  path("decouvrir-la-bibliotheque", "Lire les sources avec méthode", "Identifier les textes, retrouver leurs références et comprendre leur statut avant de les partager.", ["Séparer citation et commentaire", "Identifier l’édition d’un ouvrage", "Distinguer authenticité et disponibilité"], sources),
];
export function getLearningPath(slug: string) { return learningPaths.find(item => item.slug === slug); }
