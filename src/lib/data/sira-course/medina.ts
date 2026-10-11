import { chapter, hadith, quran, question } from "./schema";

export const medina = [
  chapter({
    slug: "hegire", titre: "L’Hégire : préparation, entraide et confiance", periode: "De La Mecque à Médine", date: "La migration",
    objectif: "Suivre les dispositions concrètes de la migration et comprendre leur articulation avec le secours divin évoqué dans le Coran.",
    sections: [
      { titre: "Un départ préparé", paragraphes: [
        "Al-Bukhârî 3905 rapporte l’annonce de l’autorisation de migrer et le choix d’Abû Bakr comme compagnon. Le récit mentionne les montures, la nourriture préparée et le geste d’Asmâ’ pour attacher le sac de provisions. La migration apparaît comme une action préparée, où plusieurs personnes jouent un rôle.",
        "Le témoignage décrit trois nuits dans la grotte de Thawr, les informations apportées par ‘Abd Allah ibn Abî Bakr, l’aide de ‘Âmir ibn Fuhayra et le recours à un guide expérimenté. Ces précisions permettent de comprendre le travail collectif sans faire de la confiance en Allah une absence de moyens." ] },
      { titre: "La grotte et le secours", paragraphes: [
        "Le verset 9:40 évoque le Prophète ﷺ et son compagnon dans la grotte, ainsi que l’encouragement à ne pas s’affliger. Al-Bukhârî 3653 rapporte la crainte d’Abû Bakr de les voir découverts et la réponse du Prophète ﷺ rappelant l’aide d’Allah. Le passage coranique replace cet épisode dans le secours accordé au Messager.",
        "Commentaire pédagogique : la préparation et la confiance sont visibles dans deux ensembles de sources qui se complètent. L’une décrit des personnes et des dispositions ; l’autre rappelle le secours divin. Il serait réducteur de ne garder que le plan de voyage ou seulement une formule de consolation." ] },
      { titre: "Une migration qui transforme la communauté", paragraphes: [
        "L’Hégire ne se termine pas dans la grotte. Elle ouvre le dossier médinois : accueil, construction d’un lieu de prière, relations entre migrants et habitants, apprentissage et nouvelles épreuves. Le lecteur doit donc passer du déplacement à l’établissement d’une vie collective.",
        "Dans votre carnet, faites une carte des rôles plutôt qu’une liste de héros isolés. Indiquez qui accompagne, prépare, informe et guide. Cette méthode rend visibles des contributions parfois peu mises en avant et aide à comprendre que les événements majeurs reposent aussi sur des gestes modestes et organisés." ] },
    ],
    sources: [hadith("bukhari", "3905"), quran(9, "40"), hadith("bukhari", "3653")],
    vigilance: "Les récits d’araignée et de colombes ne sont pas intégrés comme authentiques. L’itinéraire complet et ses variantes demandent un dossier supplémentaire.",
    retenir: ["La migration est préparée.", "Plusieurs personnes contribuent au départ.", "Le Coran rappelle le secours d’Allah dans la grotte."],
    exercice: "Donnez deux dispositions concrètes du départ et expliquez pourquoi elles ne contredisent pas la confiance en Allah.",
    correction: "Les provisions et le recours à un guide sont deux moyens rapportés. Le chapitre les lit avec le rappel du secours d’Allah ; la confiance n’est pas présentée comme l’abandon des moyens.",
    questions: [question("Qui prépare l’attache du sac de provisions ?", "Asmâ’.", ["Waraqa.", "Héraclius."], "Le geste d’Asmâ’ est rapporté dans 3905.", 1), question("Quel verset évoque le compagnon dans la grotte ?", "9:40.", ["110:1.", "2:144."], "9:40 est le repère coranique de cet épisode.")],
  }),
  chapter({
    slug: "installation-medine", titre: "S’établir à Médine : accueil et mosquée", periode: "Les débuts à Médine", date: "Après l’Hégire",
    objectif: "Comprendre l’arrivée et la construction de la mosquée à partir du témoignage d’Anas, en distinguant lieu de culte et récit idéalisé.",
    sections: [
      { titre: "L’arrivée racontée par Anas", paragraphes: [
        "Al-Bukhârî 428 rapporte un séjour chez les Banû ‘Amr ibn ‘Awf, puis le déplacement accompagné des Banû an-Najjâr jusqu’à la cour d’Abû Ayyûb. Le récit donne des repères d’accueil et de déplacement. Il présente une arrivée vécue dans des relations concrètes, et non dans un espace abstrait.",
        "La prière accompagne cette installation. Le témoignage rapporte ensuite la demande de construire une mosquée et l’échange avec les propriétaires du terrain. Il décrit des travaux de préparation du lieu, des matériaux et la participation des compagnons." ] },
      { titre: "Un travail partagé", paragraphes: [
        "Le Prophète ﷺ est présent avec ceux qui transportent les pierres. Le récit mentionne une invocation pour les Ansâr et les migrants. Le chantier réunit ainsi une activité matérielle et une orientation spirituelle. Il ne faut pas en faire une scène où seuls les autres travaillent tandis que le Prophète ﷺ observe.",
        "Commentaire pédagogique : un lieu commun ne naît pas seulement d’une idée. Il demande un espace, un accord, une préparation et des contributions. Lire cette installation permet de réfléchir à la responsabilité de ceux qui construisent des institutions destinées à servir une communauté." ] },
      { titre: "De l’arrivée à la continuité", paragraphes: [
        "Dans la suite du parcours, la mosquée apparaît comme un lieu de prière et d’enseignement. Le chapitre présent documente sa construction ; il ne suffit pas, à lui seul, à décrire toutes ses fonctions ultérieures. Cette distinction permet de compléter progressivement le dossier plutôt que de tout attribuer à une seule référence.",
        "Pour approfondir, relevez les besoins auxquels l’installation répond : être accueilli, disposer d’un lieu de prière, travailler ensemble. Puis observez comment les liens entre migrants et habitants sont évoqués. Vous préparerez ainsi la leçon suivante sur la fraternité et l’aide concrète." ] },
    ],
    sources: [hadith("bukhari", "428")],
    vigilance: "Les chants populaires attribués à l’arrivée et les détails architecturaux absents du récit ne sont pas présentés comme établis.",
    retenir: ["Anas donne des repères précis d’arrivée.", "La mosquée fait l’objet d’un chantier.", "Migrants et Ansâr sont réunis dans l’invocation rapportée."],
    exercice: "Reconstituez les trois étapes du chapitre : accueil, choix du lieu, chantier.",
    correction: "Le récit commence par les lieux d’accueil, présente la demande concernant le terrain, puis décrit sa préparation et la construction.",
    questions: [question("Qui transmet al-Bukhârî 428 ?", "Anas.", ["Abû Lahab.", "Waraqa."], "Anas rapporte l’arrivée et la construction.", 2), question("Le chantier est-il présenté comme un travail collectif ?", "Oui, le récit mentionne le transport des pierres et la participation.", ["Non, il apparaît déjà achevé.", "Non, il n’y a aucun matériau."], "La source décrit plusieurs dispositions matérielles.")],
  }),
  chapter({
    slug: "fraternite-et-subsistance", titre: "Fraternité, accueil et recherche d’un revenu", periode: "Les débuts à Médine", date: "Après l’arrivée des migrants",
    objectif: "Étudier la fraternité entre ‘Abd ar-Rahmân et Sa‘d, l’offre d’aide et la recherche d’un revenu, sans réduire la solidarité à une formule.",
    sections: [
      { titre: "Une fraternité attestée", paragraphes: [
        "Al-Bukhârî 3780 rapporte que le Prophète ﷺ établit un lien de fraternité entre ‘Abd ar-Rahmân ibn ‘Awf et Sa‘d ibn ar-Rabî‘. Sa‘d offre de partager ses biens et formule également une proposition relative à sa situation familiale, après divorce et délai légal. La fiche ne reproduit pas ce récit comme une consigne générale ; elle suit la réponse rapportée.",
        "‘Abd ar-Rahmân souhaite une bénédiction à sa famille et à ses biens, puis demande où se trouve le marché. Le témoignage évoque ses échanges commerciaux, des gains et son mariage. L’aide offerte et l’activité du bénéficiaire sont donc présentes dans la même narration." ] },
      { titre: "Deux dimensions de l’accueil", paragraphes: [
        "Commentaire pédagogique : on peut observer, d’un côté, une disponibilité généreuse et, de l’autre, une recherche d’autonomie. Il serait injuste d’en déduire que celui qui accepte une aide manque de mérite. Le récit montre un choix particulier ; les besoins et les capacités diffèrent selon les personnes.",
        "La solidarité n’est pas seulement un sentiment favorable. Elle peut s’exprimer dans un partage, une orientation ou un accès à une activité. Pour réfléchir à l’accueil d’un nouvel arrivant, il est utile de distinguer l’aide immédiate et les moyens permettant d’avancer dans la durée." ] },
      { titre: "Le marché dans une histoire spirituelle", paragraphes: [
        "L’étude de la Sîra inclut des questions de subsistance. Les personnes doivent vivre, travailler et se marier ; elles ne sont pas des figures sans besoins matériels. Cette attention donne de l’épaisseur au récit et évite de présenter l’engagement religieux comme une existence détachée de toute responsabilité quotidienne.",
        "Pour travailler le chapitre, notez ce qui est proposé, ce qui est demandé et ce qui est obtenu. Gardez ensuite vos conclusions comme des pistes de réflexion, sans promettre qu’un même choix produira toujours la richesse. Le témoignage ne contient pas un programme automatique de réussite financière." ] },
    ],
    sources: [hadith("bukhari", "3780")],
    vigilance: "L’offre rapportée est un événement situé, pas un modèle juridique complet du mariage ni une promesse d’enrichissement applicable à tous.",
    retenir: ["La fraternité est concrétisée par une offre.", "‘Abd ar-Rahmân demande l’accès au marché.", "Solidarité et activité personnelle peuvent être étudiées ensemble."],
    exercice: "Proposez deux formes d’accueil inspirées par votre lecture, en les identifiant comme des idées personnelles.",
    correction: "Par exemple : une aide matérielle immédiate et une orientation vers une activité adaptée. Ce sont des applications proposées, pas des citations ni des obligations tirées de ce seul récit.",
    questions: [question("Que demande ‘Abd ar-Rahmân ?", "Où se trouve le marché.", ["Une date de commémoration.", "Le récit du voyage nocturne."], "La demande est explicite dans 3780.", 1), question("Le récit garantit-il une richesse à tout lecteur ?", "Non, il rapporte une expérience particulière.", ["Oui, dans un délai précis.", "Oui, sans travail."], "Une expérience historique n’est pas une promesse universelle.")],
  }),
  chapter({
    slug: "qibla", titre: "Le changement de qibla : apprendre et agir", periode: "Les débuts à Médine", date: "Pendant les premiers temps médinois",
    objectif: "Comprendre le changement de direction de prière et la réaction de ceux qui en reçoivent la nouvelle, à partir du Coran et d’Al-Barâ’.",
    sections: [
      { titre: "La direction de la prière", paragraphes: [
        "Al-Bukhârî 4486 rapporte une prière orientée vers Bayt al-Maqdis pendant seize ou dix-sept mois, puis le changement vers la Ka‘ba. Le récit conserve une hésitation sur le nombre de mois. Une fiche exacte doit garder cette formulation et ne pas la transformer en une certitude unique.",
        "Le passage 2:142–144 évoque les questions soulevées par le changement et l’ordre de se tourner vers la Mosquée sacrée. La lecture combinée du texte et du témoignage montre une instruction et sa réception dans la vie de la communauté." ] },
      { titre: "La nouvelle transmise en cours de prière", paragraphes: [
        "Le récit mentionne un homme qui informe d’autres personnes pendant leur prière, puis leur changement de direction. Il évoque aussi la question de ceux qui étaient morts avant ce changement. Le verset rappelle qu’Allah ne laisse pas perdre leur foi, expliquée ici par leur prière antérieure.",
        "Commentaire pédagogique : le chapitre permet de réfléchir à la réception d’une information religieuse fiable et à la manière dont une pratique change lorsqu’une instruction est établie. Il ne s’agit pas de changer de direction sur la base de toute rumeur, mais de comprendre un événement transmis avec ses références." ] },
      { titre: "Ne pas effacer l’étape précédente", paragraphes: [
        "Une évolution dans la pratique ne signifie pas nécessairement que les personnes qui avaient obéi à l’instruction précédente ont perdu la valeur de ce qu’elles faisaient. Dans le récit, cette préoccupation reçoit une réponse. Le lecteur gagne à suivre les questions des compagnons, pas seulement le changement lui-même.",
        "Pour retenir, distinguez trois moments : la pratique antérieure, la nouvelle instruction et la réception de la nouvelle. Ce découpage aide à comprendre la chronologie et à ne pas présenter l’événement comme une décision personnelle du groupe." ] },
    ],
    sources: [hadith("bukhari", "4486"), quran(2, "142-144")],
    vigilance: "La source conserve « seize ou dix-sept mois ». Le parcours ne tranche pas cette variation ni le jour exact du changement.",
    retenir: ["La direction change vers la Ka‘ba.", "Le récit conserve une variation de durée.", "La question des prières antérieures est abordée."],
    exercice: "Pourquoi faut-il conserver « seize ou dix-sept » dans une synthèse ?",
    correction: "Parce que cette hésitation appartient au témoignage. Choisir arbitrairement un nombre donnerait une précision que la référence ne fournit pas.",
    questions: [question("Vers quel lieu la direction est-elle changée ?", "La Ka‘ba.", ["Hirâ.", "Thawr."], "Le passage et le récit mentionnent la nouvelle orientation.", 2), question("Quelle formulation respecte la source ?", "Seize ou dix-sept mois.", ["Exactement dix-sept, sans discussion.", "Une date complète inventée."], "Il faut conserver la variation rapportée.")],
  }),
  chapter({
    slug: "badr", titre: "Badr : une rencontre, le secours et la gratitude", periode: "La communauté médinoise éprouvée", date: "Après l’Hégire",
    objectif: "Étudier les repères de Badr dans le Coran et le témoignage de Ka‘b, en distinguant l’objectif initial et la rencontre effective.",
    sections: [
      { titre: "Une rencontre qui n’était pas le projet initial", paragraphes: [
        "Dans al-Bukhârî 3951, Ka‘b ibn Mâlik explique que son absence à Badr ne lui avait pas été reprochée : le départ visait une caravane, puis la rencontre avec l’ennemi avait eu lieu sans rendez-vous préalable. Cette précision empêche de raconter l’événement comme si chaque étape avait été prévue dès le départ.",
        "Le passage coranique 3:123–127 mentionne le secours reçu à Badr dans une situation de faiblesse et appelle à la crainte d’Allah et à la gratitude. Il évoque le soutien annoncé par les anges et rappelle que la victoire vient d’Allah." ] },
      { titre: "La prière et l’attitude", paragraphes: [
        "Al-Bukhârî 3953 rapporte une invocation du Prophète ﷺ à Badr et l’intervention d’Abû Bakr auprès de lui. Ce témoignage ajoute un repère de supplication au dossier. Le récit militaire ne suffit donc pas à comprendre la manière dont l’événement est vécu.",
        "Commentaire pédagogique : dans les sources choisies, la situation matérielle, la rencontre et l’orientation spirituelle sont reliées. Étudier Badr ne consiste pas à tirer une règle selon laquelle tout groupe numériquement faible remportera nécessairement chaque conflit. Le texte présente un secours précis et une responsabilité de gratitude." ] },
      { titre: "Lire une bataille avec discernement", paragraphes: [
        "Une histoire de bataille demande de distinguer les faits, les pertes, les personnes et les témoignages. Le chapitre ne dessine pas de carte tactique ni de liste complète de participants à partir de références qui ne les donnent pas. Cette limite est un choix de rigueur, pas une invitation à ignorer l’histoire.",
        "Pour votre lecture, relevez trois notions : intention initiale, événement rencontré, attitude après le secours. Vous disposerez d’une structure qui aide à comprendre le récit sans le réduire à une simple opposition entre force et faiblesse." ] },
    ],
    sources: [hadith("bukhari", "3951"), quran(3, "123-127"), hadith("bukhari", "3953")],
    vigilance: "Les effectifs exacts, les listes de participants, les mouvements militaires et le dossier des prisonniers ne sont pas reconstitués à partir de ces seules références.",
    retenir: ["Le témoignage distingue départ et rencontre.", "Le Coran rappelle le secours et la gratitude.", "La supplication est attestée."],
    exercice: "Pourquoi le témoignage de Ka‘b est-il utile alors qu’il n’a pas participé à Badr ?",
    correction: "Il explique la nature du départ et pourquoi son absence n’avait pas été blâmée. Un témoin peut éclairer le contexte d’un événement sans en avoir vécu toutes les étapes.",
    questions: [question("Quel était l’objectif initial mentionné par Ka‘b ?", "Une caravane.", ["Le pèlerinage d’adieu.", "La reconstruction de la Ka‘ba."], "3951 distingue cet objectif et la rencontre effective.", 1), question("Que rappelle le Coran après le secours ?", "La gratitude et la crainte d’Allah.", ["Une autosuffisance définitive.", "Une victoire garantie dans tout conflit."], "Le passage doit être lu comme un rappel situé.")],
  }),
  chapter({
    slug: "uhud", titre: "Uhud : la consigne, le retournement et la responsabilité", periode: "La communauté médinoise éprouvée", date: "Après Badr",
    objectif: "Comprendre le poste des archers, la rupture de la consigne et la réflexion coranique sur l’épreuve, sans effacer les personnes derrière une morale simpliste.",
    sections: [
      { titre: "Le témoignage d’Al-Barâ’", paragraphes: [
        "Al-Bukhârî 4043–4044 rapporte que des archers sont placés sous la direction de ‘Abd Allah ibn Jubayr avec l’ordre de ne pas quitter leur position, quelle que soit l’issue apparente du combat. Après une première fuite de l’adversaire, plusieurs quittent le poste malgré le rappel du responsable. Le récit évoque ensuite le retournement et les pertes.",
        "Le passage 3:152–153 examine la défaillance, le désaccord et les intentions au moment de l’épreuve. Il évoque également le pardon. Une lecture attentive tient donc ensemble la responsabilité des actes et les rappels qui suivent ; elle ne se limite pas à condamner les personnes." ] },
      { titre: "Le trouble et les décisions", paragraphes: [
        "Commentaire pédagogique : une réussite apparente peut conduire à relâcher une consigne avant la fin d’une tâche. Le récit fournit une situation historique précise pour réfléchir à la responsabilité collective. Cette observation ne transforme pas chaque difficulté moderne en une punition dont on connaîtrait la cause.",
        "Il faut aussi éviter une lecture qui ferait de tous les participants un groupe identique. Le responsable rappelle l’ordre, d’autres ne le suivent pas, et la communauté subit des conséquences. Distinguer les actions aide à comprendre l’événement et à ne pas distribuer une culpabilité indistincte." ] },
      { titre: "La conduite après l’épreuve", paragraphes: [
        "Le verset 3:159 évoque la douceur, le pardon, la demande de pardon, la consultation et la confiance en Allah après la décision. Il apporte un éclairage sur la manière d’accompagner une communauté après une épreuve, au-delà de l’analyse de la faute.",
        "Pour approfondir, séparez le chapitre en deux colonnes : ce qui se passe dans le récit ; ce que les passages coraniques rappellent. Vous pourrez alors expliquer une responsabilité sans oublier la reconstruction des liens et la poursuite de la vie collective." ] },
    ],
    sources: [hadith("bukhari", "4043"), quran(3, "152-153"), quran(3, "159")],
    vigilance: "La page de référence regroupe 4043 et 4044. Le parcours ne fournit pas une carte complète du combat ni un inventaire de tous les blessés et morts.",
    retenir: ["Une consigne précise est rapportée.", "Le retournement doit être lu avec responsabilité et pardon.", "3:159 éclaire la conduite envers la communauté."],
    exercice: "Expliquez pourquoi raconter Uhud uniquement comme une faute serait incomplet.",
    correction: "Les sources évoquent les actes et leurs conséquences, mais aussi le pardon, la douceur et la consultation. Le récit ne se réduit pas à une condamnation.",
    questions: [question("La consigne autorisait-elle à quitter le poste dès une victoire apparente ?", "Non, elle demandait de rester.", ["Oui, dès que le butin apparaissait.", "Oui, sans condition."], "Le maintien au poste est explicitement demandé.", 2), question("Quel verset évoque notamment la consultation ?", "3:159.", ["106:1.", "17:1."], "3:159 rassemble plusieurs repères de conduite après l’épreuve.")],
  }),
  chapter({
    slug: "khandaq", titre: "Al-Khandaq : le siège, le travail et la fermeté", periode: "La communauté médinoise éprouvée", date: "La période des coalisés",
    objectif: "Lire l’épreuve des coalisés dans le Coran et la participation du Prophète ﷺ au travail du fossé, sans inventer un récit tactique complet.",
    sections: [
      { titre: "L’épreuve dans le Coran", paragraphes: [
        "La sourate Al-Ahzâb, 33:9–27, rappelle l’arrivée des forces, la peur et l’épreuve des croyants. Elle distingue des réactions de doute et des réactions de confiance. Elle évoque le vent et les forces invisibles dans le secours d’Allah, puis le départ des adversaires.",
        "Ce passage doit être lu avec attention : les réactions humaines font partie du dossier. La tension n’est pas effacée par une victoire finale. Les personnes traversent une épreuve avant d’en connaître l’issue, ce qui donne au récit sa profondeur." ] },
      { titre: "Le travail du fossé", paragraphes: [
        "Al-Bukhârî 4104 rapporte que le Prophète ﷺ transporte de la terre lors d’Al-Khandaq, au point d’être couvert de poussière. Le récit mentionne des paroles de demande de sérénité et de fermeté. L’action matérielle et la supplication apparaissent ensemble.",
        "Commentaire pédagogique : cet élément concret évite de présenter la direction de la communauté comme une activité purement distante. Il permet de réfléchir à la présence auprès de ceux qui portent l’effort, sans déduire de la scène un modèle technique unique applicable à tous les projets." ] },
      { titre: "Une histoire avec plusieurs niveaux", paragraphes: [
        "Le Coran décrit l’épreuve et des attitudes ; le hadith apporte une scène de travail. Il ne faut pas demander à ce dernier de fournir la totalité du siège. Le dossier des alliances, des décisions et des événements postérieurs exige des témoignages supplémentaires.",
        "Pour apprendre, notez ce qui relève d’un moyen concret, d’une attitude intérieure et du secours évoqué par le texte. Cette séparation permet de comprendre comment le récit relie la responsabilité humaine et la dépendance envers Allah sans supprimer l’une des deux." ] },
    ],
    sources: [quran(33, "9-27"), hadith("bukhari", "4104")],
    vigilance: "Le conseil attribué à Salmân, les effectifs du siège et les causes détaillées du dossier des Banû Qurayza nécessitent une vérification historique et juridique distincte. Une fiche séparée présente le jugement rapporté. Ils ne sont pas développés comme certains ici.",
    retenir: ["Le Coran décrit la peur et les réactions.", "Le transport de terre par le Prophète ﷺ est attesté.", "Moyens, supplication et secours sont étudiés ensemble."],
    exercice: "Distinguez un fait matériel et une attitude évoqués dans ce chapitre.",
    correction: "Le transport de terre est un fait matériel rapporté. La demande de sérénité et de fermeté exprime une orientation spirituelle.",
    questions: [question("Que fait le Prophète ﷺ dans 4104 ?", "Il transporte de la terre.", ["Il prononce le sermon d’adieu.", "Il voyage vers Hirâ."], "Le récit décrit sa participation au travail.", 1), question("Quel passage évoque les coalisés ?", "33:9–27.", ["96:1–5.", "93:6–11."], "Al-Ahzâb est le repère coranique du chapitre.")],
  }),
  chapter({
    slug: "ifk", titre: "L’affaire de la calomnie : épreuve et responsabilité de la parole", periode: "La vie médinoise", date: "Pendant la période médinoise — datation détaillée non fixée ici",
    objectif: "Comprendre le témoignage de ‘Â’icha et les rappels coraniques sur la calomnie, la preuve et la circulation d’une accusation.",
    sections: [
      { titre: "Le témoignage de ‘Â’icha", paragraphes: [
        "Al-Bukhârî 4141 rapporte un voyage au cours duquel ‘Â’icha cherche un collier perdu. Le groupe repart sans se rendre compte de son absence. Safwân ibn al-Mu‘attal la trouve ensuite et la ramène. Une accusation mensongère se répand alors. Le récit décrit sa maladie, la découverte des propos et sa peine.",
        "Le témoignage rapporte également des consultations et la tension créée dans la communauté. L’épisode ne concerne donc pas seulement une personne isolée : une parole non fondée peut affecter des familles et des relations collectives. La fiche ne reproduit pas l’accusation comme si elle était une hypothèse plausible." ] },
      { titre: "Le rappel coranique", paragraphes: [
        "Les versets 24:11–20 dénoncent la calomnie et interrogent la conduite de ceux qui l’ont entendue puis répétée. Ils rappellent l’exigence de preuve et la gravité de ce que certains tenaient pour léger. Le passage permet de lire l’épisode en examinant la responsabilité de la circulation de la parole.",
        "Commentaire pédagogique : à l’époque des messages partagés rapidement, cette leçon invite à distinguer avoir entendu et savoir. Le transfert d’un propos n’est pas un geste neutre. Cette application contemporaine est une réflexion de l’auteur à partir du dossier, pas une phrase attribuée au Prophète ﷺ." ] },
      { titre: "Protéger l’honneur en étudiant l’histoire", paragraphes: [
        "Une biographie ne doit pas rendre la calomnie plus mémorable que son démenti. Le choix des mots compte : parler d’une accusation mensongère et revenir aux sources évite de recréer le soupçon. L’apprentissage porte aussi sur la manière de raconter.",
        "Pour travailler, suivez quatre étapes : événement initial, circulation des propos, épreuve de la personne, rappel de la preuve. Écrivez ensuite ce que vous feriez face à une rumeur actuelle : ne pas diffuser, demander une source et respecter la personne concernée. Gardez ces idées comme un exercice de responsabilité." ] },
    ],
    sources: [hadith("bukhari", "4141"), quran(24, "11-20")],
    vigilance: "L’ordre exact par rapport à certaines expéditions fait l’objet d’une étude historique distincte. Le chapitre ne traite pas de l’ensemble des sanctions juridiques relatives à la calomnie.",
    retenir: ["L’accusation est une calomnie, pas un fait.", "Entendre ne signifie pas savoir.", "La diffusion engage la responsabilité de celui qui transmet."],
    exercice: "Réécrivez « on m’a dit, donc je partage » en une conduite responsable.",
    correction: "J’ai entendu un propos, mais cela ne le prouve pas. Je ne le diffuse pas et je recherche une source fiable sans porter atteinte à la personne.",
    questions: [question("Quel statut faut-il donner à l’accusation ?", "Une calomnie.", ["Un fait établi.", "Une information à diffuser."], "Le récit et le passage coranique ne valident pas l’accusation.", 2), question("Que questionne le passage 24:11–20 ?", "La preuve et la circulation des propos.", ["L’architecture de la mosquée.", "La date de naissance."], "Il rappelle la gravité de la parole et l’exigence de preuve.")],
  }),
];
