import { chapter, hadith, quran, question } from "./schema";

export const laterMedina = [
  chapter({
    slug: "hudaybiyya", titre: "Al-Hudaybiyya : un accord difficile à recevoir", periode: "La mission médinoise", date: "Avant l’entrée à La Mecque",
    objectif: "Comprendre le projet de ‘umra, la négociation et la difficulté de certaines clauses, puis lire les repères coraniques sans fabriquer un récit triomphal simplifié.",
    sections: [
      { titre: "Un accès empêché et une négociation", paragraphes: [
        "Al-Bukhârî 2731 décrit le déplacement vers La Mecque pour la ‘umra et les échanges alors que l’accès est empêché. Le récit présente des interlocuteurs et une négociation. L’accord reporte l’entrée à l’année suivante et comporte une clause de retour pour certaines personnes venues de Quraych.",
        "L’arrivée d’Abû Jandal et les questions de ‘Umar font apparaître la difficulté vécue. Le récit ne présente pas les compagnons comme des personnes qui comprennent immédiatement toutes les conséquences de l’accord. La patience s’étudie ici dans une situation réellement éprouvante." ] },
      { titre: "Le regard coranique", paragraphes: [
        "Le verset 48:18 évoque le serment sous l’arbre et la satisfaction d’Allah envers les croyants concernés. Le verset 48:27 annonce l’entrée en sécurité dans la Mosquée sacrée. Lire ces passages avec le récit permet de distinguer l’obstacle immédiat et la perspective annoncée.",
        "Commentaire pédagogique : une décision peut être difficile à recevoir lorsqu’elle ne correspond pas à l’attente initiale. Pour comprendre cet épisode, il faut écouter les tensions rapportées tout en suivant les références. Il serait trompeur d’effacer la difficulté afin de ne garder qu’une conclusion heureuse." ] },
      { titre: "La précision dans le récit et ses leçons", paragraphes: [
        "Ce chapitre résume une partie d’un long témoignage ; il n’en remplace pas la lecture. Les détails des formulations, des clauses et de leurs suites demandent de revenir au texte. Une synthèse utile doit aider à s’orienter, pas donner l’illusion que tous les enjeux ont été épuisés.",
        "Pour réfléchir, comparez l’objectif du déplacement, le résultat immédiat et la perspective mentionnée dans le Coran. Cette distinction aide à comprendre l’événement. Elle ne fournit pas une règle universelle selon laquelle chaque compromis contemporain serait bon ni chaque déception annoncerait une victoire." ] },
    ],
    sources: [hadith("bukhari", "2731"), quran(48, "18"), quran(48, "27")],
    vigilance: "La page regroupe un récit long associé à 2731–2732. Les clauses ne sont pas un modèle à transposer automatiquement aux conflits actuels.",
    retenir: ["Le déplacement vise la ‘umra.", "L’accord comporte des conditions difficiles.", "Le Coran évoque le serment et l’entrée annoncée."],
    exercice: "Distinguez objectif initial, résultat immédiat et perspective annoncée.",
    correction: "L’objectif est la ‘umra ; le résultat immédiat comprend un accord et le report de l’entrée ; 48:27 annonce une entrée en sécurité.",
    questions: [question("L’entrée est-elle obtenue immédiatement dans le récit ?", "Non, elle est reportée.", ["Oui, sans négociation.", "Oui, avant le départ."], "Le report fait partie des conditions racontées.", 1), question("Quel passage évoque le serment sous l’arbre ?", "48:18.", ["93:6.", "106:2."], "48:18 est l’un des repères coraniques d’Al-Hudaybiyya.")],
  }),
  chapter({
    slug: "lettre-et-heraclius", titre: "La lettre et l’entretien d’Héraclius", periode: "La mission au-delà de La Mecque", date: "Pendant la trêve avec Quraych",
    objectif: "Étudier la transmission d’une lettre et l’entretien rapporté par Abû Sufyân, en distinguant le témoignage de la conclusion historique.",
    sections: [
      { titre: "Un entretien dans le contexte de la trêve", paragraphes: [
        "Al-Bukhârî 7 rapporte qu’Héraclius fait venir Abû Sufyân et ses compagnons alors qu’ils commercent dans la région du Shâm pendant la trêve avec Quraych. Un interprète intervient et les compagnons doivent contredire d’éventuelles réponses mensongères. Le récit donne donc un cadre précis à l’entretien.",
        "Les questions portent notamment sur l’origine, la conduite et les partisans du Prophète ﷺ. Abû Sufyân rapporte ensuite la lecture d’une lettre transmise par l’intermédiaire de Dihya. Ce témoignage permet d’étudier une communication de la mission au-delà du cadre mecquois et médinois." ] },
      { titre: "Un témoignage n’est pas une conversion certaine", paragraphes: [
        "Le récit contient des réactions et une réflexion d’Héraclius. Il ne faut pas les convertir en une affirmation simplifiée selon laquelle l’empereur aurait publiquement embrassé l’islam. Décrire une connaissance du message, une parole rapportée et une décision sont trois opérations différentes.",
        "Commentaire pédagogique : ce dossier apprend à ne pas confondre intérêt, reconnaissance et engagement. Dans une biographie, on peut être tenté de chercher une conclusion spectaculaire. La précision consiste à garder l’enchaînement réel du témoignage et à laisser visibles les limites de ce que l’on peut conclure." ] },
      { titre: "Lire la transmission d’un message", paragraphes: [
        "Pour approfondir, observez les intermédiaires : un messager, des autorités, un interprète et un témoin qui rapporte l’entretien. Une information n’arrive pas toujours directement à son destinataire. Cette chaîne de situations aide à comprendre la dimension publique et internationale du récit.",
        "L’exercice n’est pas de mémoriser tous les titres politiques. Il est de suivre qui parle, qui transmet et qui rapporte. Ce travail permet ensuite de présenter l’épisode sans attribuer au Prophète ﷺ les paroles d’Héraclius ou à Abû Sufyân les conclusions d’un auteur moderne." ] },
    ],
    sources: [hadith("bukhari", "7")],
    vigilance: "Les fac-similés de lettres, la liste exhaustive des destinataires et les affirmations sur une conversion d’Héraclius ne sont pas validés par cette fiche.",
    retenir: ["Le récit est situé pendant une trêve.", "Abû Sufyân rapporte l’entretien.", "Réaction à un message et conversion sont distinctes."],
    exercice: "Identifiez l’auteur de la lettre, l’interlocuteur de l’entretien et le témoin qui rapporte.",
    correction: "La lettre est celle du Prophète ﷺ ; Héraclius mène l’entretien ; Abû Sufyân en rapporte les événements.",
    questions: [question("Qui est interrogé dans le récit ?", "Abû Sufyân.", ["Khadîja.", "Anas."], "Le témoignage rapporté par Ibn ‘Abbâs vient d’Abû Sufyân.", 2), question("Peut-on affirmer une conversion à partir d’un intérêt pour le message ?", "Non, il faut une preuve adaptée.", ["Oui, automatiquement.", "Oui, si l’interlocuteur est un roi."], "Connaissance, réaction et engagement sont distincts.")],
  }),
  chapter({
    slug: "khaybar", titre: "Khaybar : le témoignage sur ‘Alî et la guidance", periode: "La mission médinoise", date: "La période de Khaybar",
    objectif: "Suivre la remise de l’étendard à ‘Alî et la parole sur la guidance d’une personne, sans réduire l’épisode à une scène de bravoure.",
    sections: [
      { titre: "Un étendard confié à ‘Alî", paragraphes: [
        "Al-Bukhârî 4210 rapporte l’annonce de la remise de l’étendard à un homme aimant Allah et Son Messager et aimé d’eux. Le lendemain, le Prophète ﷺ demande ‘Alî ibn Abî Tâlib, alors atteint aux yeux. Le récit rapporte sa guérison et la remise de l’étendard.",
        "‘Alî interroge ensuite le Prophète ﷺ sur la conduite à adopter. La réponse demande d’avancer sans précipitation, d’appeler les personnes à l’islam et de leur présenter leurs devoirs envers Allah. Le récit souligne la valeur de la guidance d’une personne." ] },
      { titre: "L’importance de l’appel", paragraphes: [
        "Commentaire pédagogique : dans ce témoignage, l’objectif religieux ne disparaît pas derrière l’action militaire. La question de ‘Alî et la réponse permettent de lire l’épisode autrement que comme une compétition de force. Le soin apporté à la transmission fait partie du dossier.",
        "Cette lecture ne dispense pas d’étudier les règles et les événements dans leur contexte. Un récit situé ne donne pas à un particulier une autorisation de violence. La fiche explique un témoignage historique et n’est pas une consigne d’action contemporaine." ] },
      { titre: "Un événement, plusieurs histoires humaines", paragraphes: [
        "Le chapitre consacré à l’Abyssinie mentionne des retours au temps de Khaybar. Rapprocher les deux leçons fait apparaître des histoires parallèles : un épisode sur ‘Alî et un épisode sur des migrants revenus après un long éloignement. Un lieu dans la chronologie peut ainsi réunir plusieurs dossiers.",
        "Pour travailler, résumez les étapes du témoignage de Sahl ibn Sa‘d : annonce, attente, demande de ‘Alî, remise et instruction. Gardez à part les autres scènes que vous auriez entendues au sujet de Khaybar. Vous pourrez les examiner avec leur référence propre plutôt que les rattacher toutes à 4210." ] },
    ],
    sources: [hadith("bukhari", "4210")],
    vigilance: "Les récits populaires sur la porte de Khaybar et le détail des accords fonciers ne sont pas validés par la référence choisie.",
    retenir: ["La remise de l’étendard à ‘Alî est attestée.", "La réponse comporte une instruction d’appel.", "Les autres scènes demandent leurs propres sources."],
    exercice: "Pourquoi faut-il lire la réponse à ‘Alî après la remise de l’étendard ?",
    correction: "La réponse éclaire la conduite et la finalité de l’action ; arrêter le récit à l’étendard ferait perdre cet enseignement.",
    questions: [question("À qui l’étendard est-il remis ?", "‘Alî ibn Abî Tâlib.", ["Abû Lahab.", "Waraqa."], "4210 rapporte cette remise.", 1), question("Le récit ne concerne-t-il que la bravoure ?", "Non, il comporte une instruction concernant l’appel et la guidance.", ["Oui, aucun autre propos.", "Oui, uniquement un classement."], "La réponse à ‘Alî est une partie essentielle du témoignage.")],
  }),
  chapter({
    slug: "muta", titre: "Mu’ta : les pertes et la peine du Prophète ﷺ", periode: "La mission médinoise", date: "La période de Mu’ta",
    objectif: "Comprendre l’annonce des morts de Zayd, Ja‘far et Ibn Rawâha et la peine exprimée, sans fabriquer une reconstitution complète de l’expédition.",
    sections: [
      { titre: "Le témoignage d’Anas", paragraphes: [
        "Al-Bukhârî 4262 rapporte que le Prophète ﷺ annonce la mort de Zayd, Ja‘far et Ibn Rawâha avant l’arrivée de la nouvelle. Le récit présente la succession des porteurs de l’étendard, puis le passage à celui que le texte appelle une épée parmi les épées d’Allah.",
        "Anas rapporte aussi les larmes du Prophète ﷺ. Cet élément fait partie du témoignage, au même titre que l’annonce. Il permet de ne pas transformer l’événement en une simple suite de noms et de mouvements militaires." ] },
      { titre: "Ne pas opposer fermeté et peine", paragraphes: [
        "Commentaire pédagogique : la peine devant une perte n’efface pas la fermeté. Lire les larmes dans le récit aide à comprendre une relation aux compagnons et à leur disparition. Il n’est pas nécessaire d’inventer un long monologue pour rendre cette dimension humaine visible.",
        "L’apprentissage peut également porter sur les noms. Zayd, Ja‘far et Ibn Rawâha ne doivent pas rester des étiquettes. Le parcours consacré aux compagnons permettra de développer des portraits distincts avec leurs propres références. Ici, le chapitre garde la scène d’annonce comme son objet principal." ] },
      { titre: "La portée de la fiche", paragraphes: [
        "Une reconstitution de Mu’ta demanderait de vérifier les causes, les déplacements, les effectifs et les différentes descriptions de l’issue. Le témoignage présenté n’est pas une carte de l’expédition. Le récit emploie un langage de secours et de victoire ; il ne faut pas en déduire sans étude tous les détails tactiques.",
        "Pour retenir, racontez l’annonce en trois phrases : les porteurs de l’étendard, leur mort et la peine observée. Cet exercice forme à une narration sobre. Il protège contre la tentation d’ajouter des épisodes spectaculaires simplement parce que le sujet est connu." ] },
    ],
    sources: [hadith("bukhari", "4262")],
    vigilance: "Les effectifs, les chiffres attribués aux armées et la description tactique de l’issue ne sont pas reconstitués. La synthèse respecte l’objet limité de 4262.",
    retenir: ["Trois pertes sont annoncées.", "Les larmes sont rapportées.", "Une annonce n’est pas une histoire tactique complète."],
    exercice: "Quel détail du témoignage rappelle que les personnes ne sont pas seulement des fonctions militaires ?",
    correction: "Les larmes du Prophète ﷺ. Elles donnent une place à la peine et à la relation avec les personnes disparues.",
    questions: [question("Quelle émotion est explicitement rapportée ?", "Les larmes du Prophète ﷺ.", ["Une indifférence totale.", "Une joie inventée."], "Anas rapporte cette peine.", 2), question("4262 donne-t-il tous les effectifs ?", "Non, il ne constitue pas un inventaire complet.", ["Oui, tous les chiffres.", "Oui, une carte exhaustive."], "La référence traite surtout de l’annonce et de la succession de l’étendard.")],
  }),
  chapter({
    slug: "conquete-mecque", titre: "L’entrée à La Mecque : la Ka‘ba et la vérité", periode: "Les derniers temps médinois", date: "Après Al-Hudaybiyya",
    objectif: "Étudier l’épisode attesté autour de la Ka‘ba et éviter d’y rattacher sans preuve toutes les affirmations populaires sur la conquête.",
    sections: [
      { titre: "Le témoignage d’Ibn Mas‘ûd", paragraphes: [
        "Al-Bukhârî 4287 rapporte l’entrée du Prophète ﷺ à La Mecque et la présence de trois cent soixante idoles autour de la Ka‘ba. Il décrit leur frappe avec une baguette et les paroles sur la venue de la vérité et la disparition du faux. La référence documente cet épisode précis.",
        "Le verset 17:81 affirme la venue de la vérité et la disparition du faux. Lire ce passage avec le récit permet de comprendre le sens religieux de la scène : elle ne se réduit pas à une modification matérielle du lieu." ] },
      { titre: "Un témoignage à ne pas étendre sans preuve", paragraphes: [
        "Cette référence ne suffit pas à affirmer une absence totale de combat, une amnistie générale sans exception ou le texte exact de tous les discours. Le lecteur peut souhaiter étudier ces sujets ; il faut alors ouvrir des dossiers adaptés plutôt que les insérer sous la seule référence 4287.",
        "Commentaire pédagogique : un événement très connu favorise les résumés simplifiés. La précision demande parfois de retirer une phrase séduisante pour garder un récit plus modeste et plus solide. Cette retenue permet aussi d’aborder ensuite les autres témoignages sans contradiction créée artificiellement." ] },
      { titre: "Relier le commencement et cette étape", paragraphes: [
        "Le parcours a commencé par La Mecque, le lignage, la révélation et l’opposition. Il revient maintenant au même lieu dans une autre situation. Cette continuité aide à lire la biographie comme une histoire, et non comme une collection de fiches sans lien.",
        "Pour travailler, comparez l’appel sur Safâ et la scène autour de la Ka‘ba. Dans les deux cas, notez le lieu, le message et la référence. Ne cherchez pas à donner aux deux scènes le même contenu : leur rapprochement sert à comprendre une trajectoire, pas à fusionner les témoignages." ] },
    ],
    sources: [hadith("bukhari", "4287"), quran(17, "81")],
    vigilance: "Les causes détaillées de la rupture de la trêve, les exceptions à la protection et le texte d’une amnistie générale restent des dossiers distincts à compléter.",
    retenir: ["La scène autour de la Ka‘ba est précisément attestée.", "Elle est reliée à un rappel sur la vérité.", "La conquête ne doit pas être réduite à des slogans historiques."],
    exercice: "Une fiche cite 4287 pour affirmer qu’il n’y eut aucun combat. Que faut-il corriger ?",
    correction: "Retirer cette conclusion ou lui fournir des références adaptées : 4287 décrit l’épisode des idoles, pas tous les affrontements de la conquête.",
    questions: [question("Quel est l’objet précis de 4287 ?", "La scène des idoles autour de la Ka‘ba.", ["Toutes les clauses de la trêve.", "Toute la jeunesse du Prophète ﷺ."], "La référence doit rester liée à ce qu’elle rapporte.", 1), question("Une référence sur une scène valide-t-elle tous les détails d’un événement ?", "Non, chaque affirmation doit être documentée.", ["Oui, automatiquement.", "Oui, si l’événement est célèbre."], "L’étendue d’une source n’est pas illimitée.")],
  }),
  chapter({
    slug: "hunayn-et-ansar", titre: "Hunayn : le nombre, l’épreuve et la relation aux Ansâr", periode: "Les derniers temps médinois", date: "Après l’entrée à La Mecque",
    objectif: "Comprendre la limite de la confiance dans le nombre et l’échange avec les Ansâr après la distribution, à partir de deux sources complémentaires.",
    sections: [
      { titre: "La confiance dans le nombre éprouvée", paragraphes: [
        "Les versets 9:25–27 évoquent Hunayn, le sentiment suscité par le grand nombre, puis le fait que ce nombre ne suffit pas. Ils décrivent le recul et le secours accordé. Le passage invite à lire les moyens matériels sans en faire une garantie indépendante.",
        "Al-Bukhârî 4337 rapporte la fuite de compagnons, l’appel du Prophète ﷺ aux Ansâr et leur réponse. La fiche garde ces repères sans reconstruire à partir d’eux toute la bataille." ] },
      { titre: "Après l’épreuve : une parole adressée aux Ansâr", paragraphes: [
        "Le récit rapporte une distribution de biens et le trouble exprimé par des Ansâr. Le Prophète ﷺ les rassemble et leur parle du fait de revenir avec lui alors que d’autres repartent avec des biens. Le témoignage donne donc une place à l’explication et à la relation après l’événement.",
        "Commentaire pédagogique : une communauté n’est pas reconstruite seulement par la distribution de ressources. Elle a aussi besoin de comprendre, d’être écoutée et de recevoir une parole qui reconnaît son lien. Cette lecture ne justifie pas n’importe quelle répartition ; elle observe une scène particulière et son traitement." ] },
      { titre: "Deux échelles de compréhension", paragraphes: [
        "Le passage coranique examine la confiance et le secours. Le récit d’Anas permet de suivre une situation collective et un échange. Ces échelles se complètent : l’une ne doit pas effacer l’autre. Une Sîra approfondie comprend aussi l’après-coup des événements.",
        "Pour retenir, comparez trois moments : la confiance dans le nombre, l’épreuve et l’échange avec les Ansâr. Vous verrez que le chapitre traite autant de la relation à Allah et aux personnes que d’un affrontement. Les détails concernant le siège de Tâ’if ne sont pas ajoutés sans source distincte." ] },
    ],
    sources: [quran(9, "25-27"), hadith("bukhari", "4337")],
    vigilance: "Le chapitre ne décrit pas toutes les opérations de Hunayn ni le siège de Tâ’if. Les chiffres et la répartition exhaustive du butin demandent des références complémentaires.",
    retenir: ["Le nombre n’est pas une garantie.", "Les Ansâr sont appelés et répondent.", "L’échange après la distribution fait partie du récit."],
    exercice: "Pourquoi faut-il lire le dialogue avec les Ansâr après l’épisode de la bataille ?",
    correction: "Il éclaire les relations et les sentiments dans la communauté. L’histoire ne s’arrête pas à l’issue d’un affrontement.",
    questions: [question("Que montre 9:25 concernant le nombre ?", "Il ne suffit pas à garantir l’issue.", ["Il garantit chaque victoire.", "Il rend toute préparation inutile."], "Le passage évoque la limite de cette confiance.", 2), question("À qui le Prophète ﷺ adresse-t-il l’échange rapporté après la distribution ?", "Aux Ansâr.", ["À Waraqa.", "À Héraclius."], "4337 raconte ce rassemblement et cet échange.")],
  }),
  chapter({
    slug: "tabuk-et-repentir", titre: "Tabûk : la préparation et la vérité de Ka‘b", periode: "Les derniers temps médinois", date: "La période de Tabûk",
    objectif: "Étudier la procrastination de Ka‘b, son choix de la vérité et l’acceptation du repentir, sans transformer un cas particulier en sanction personnelle à reproduire.",
    sections: [
      { titre: "Une occasion manquée", paragraphes: [
        "Al-Bukhârî 4418 rapporte le récit de Ka‘b ibn Mâlik. Le départ vers Tabûk est annoncé clairement dans un contexte de chaleur et de long trajet. Ka‘b explique avoir été capable de partir, mais avoir différé sa préparation jusqu’à manquer le départ.",
        "Au retour du Prophète ﷺ, il pense à des excuses puis décide de dire la vérité : il n’avait pas de raison valable pour rester. Le récit décrit une attente douloureuse avant l’annonce de l’acceptation du repentir. Ka‘b garde également le souvenir de l’accueil de Talha." ] },
      { titre: "La vérité et le repentir", paragraphes: [
        "Les versets 9:117–119 évoquent le repentir, les trois laissés en attente et l’appel à être avec les véridiques. Leur lecture avec le témoignage donne un cadre à l’épreuve racontée. Le passage ne doit pas être réduit à une technique destinée à éviter des conséquences.",
        "Commentaire pédagogique : Ka‘b distingue l’aisance à parler et la vérité de ce qu’il pourrait dire. Le lecteur peut réfléchir au moment où une excuse convaincante devient une manière de se tromper lui-même. La franchise n’efface pas immédiatement la difficulté, mais elle change la manière de l’affronter." ] },
      { titre: "Un récit personnel, pas un modèle de pression", paragraphes: [
        "L’attente rapportée se déroule sous l’autorité du Prophète ﷺ. Elle ne donne pas à un lecteur le droit d’isoler ou de sanctionner quelqu’un dans sa famille ou sa communauté selon une imitation personnelle. Le chapitre travaille le témoignage et ses enseignements de vérité.",
        "Pour apprendre, identifiez la succession des décisions : remettre à plus tard, manquer le départ, envisager une excuse, dire vrai, attendre et accueillir le repentir. Ce schéma rend visibles les choix sans prétendre connaître la situation intérieure de toute personne qui manque un engagement." ] },
    ],
    sources: [hadith("bukhari", "4418"), quran(9, "117-119")],
    vigilance: "Les modalités de l’attente sont un événement sous autorité prophétique, pas un protocole de sanction à appliquer par les utilisateurs.",
    retenir: ["Ka‘b reconnaît sa capacité et son retard.", "Il choisit la vérité.", "Le repentir et les véridiques sont au centre du dossier."],
    exercice: "Distinguez une explication sincère et une excuse inventée dans une situation ordinaire.",
    correction: "Une explication sincère décrit les faits et la responsabilité réelle ; une excuse inventée cherche à éviter le reproche en donnant des faits faux. L’exercice n’autorise pas à juger les intentions d’autrui.",
    questions: [question("Pourquoi Ka‘b ne part-il pas selon son témoignage ?", "Il reporte sa préparation malgré sa capacité.", ["Il reçoit l’ordre de rester.", "Il n’a aucune monture."], "Son récit insiste sur sa capacité et ses reports.", 1), question("Quelle conduite choisit-il au retour ?", "Dire la vérité.", ["Inventer une excuse.", "Attribuer la faute à autrui."], "Le choix de la vérité structure la suite du récit.")],
  }),
  chapter({
    slug: "delegations-et-transmission", titre: "Les délégations : apprendre pour transmettre", periode: "L’enseignement de la communauté", date: "Un éclairage sur les rencontres médinoises",
    objectif: "Comprendre la demande de la délégation de ‘Abd al-Qays et la responsabilité de transmettre à ceux qui ne peuvent pas venir.",
    sections: [
      { titre: "Venir avec une demande précise", paragraphes: [
        "Al-Bukhârî 4368 rapporte la venue d’une délégation de ‘Abd al-Qays. Les visiteurs expliquent les difficultés de déplacement et demandent un enseignement qu’ils pourront mettre en pratique puis transmettre à leur peuple. La rencontre concerne donc aussi les personnes absentes.",
        "Le récit rapporte un accueil, des instructions sur la foi et des pratiques, ainsi que des interdictions concernant des récipients employés pour des boissons. Il faut lire ces détails avec les autres textes du sujet pour l’étude juridique ; le chapitre en retient surtout la demande d’apprentissage et de transmission." ] },
      { titre: "Une connaissance destinée à circuler", paragraphes: [
        "Commentaire pédagogique : un parcours d’apprentissage peut être pensé pour des personnes qui n’ont pas accès au même lieu ou au même enseignant. La délégation fait apparaître une médiation : certains viennent, apprennent et repartent transmettre. La qualité de cette transmission devient alors une responsabilité.",
        "Cela ne signifie pas que toute personne ayant lu une fiche devient spécialiste. Il faut distinguer transmettre un enseignement identifié et se prononcer sur une question complexe. Un outil comme MIRÂTH peut aider à retrouver des sources, préparer une lecture et réviser ; il ne remplace pas une formation savante." ] },
      { titre: "Le chapitre dans la chronologie", paragraphes: [
        "Cette rencontre illustre le thème des délégations, mais la référence choisie ne suffit pas à lui assigner une année précise ni à dresser la liste de toutes les délégations. Le parcours la présente donc comme un éclairage thématique, sans la faire passer pour un inventaire de l’année dite des délégations.",
        "Pour travailler, imaginez que vous devez transmettre ce chapitre à quelqu’un qui ne l’a pas lu. Donnez un objectif clair, deux faits et une référence. Puis dites ce que vous n’avez pas étudié. Savoir formuler les limites fait partie d’une transmission utile et honnête." ] },
    ],
    sources: [hadith("bukhari", "4368")],
    vigilance: "Le placement est thématique. La date précise de cette visite et l’ensemble des délégations ne sont pas établis par cette fiche. Les règles des boissons exigent l’étude des textes complémentaires.",
    retenir: ["La délégation demande à apprendre pour transmettre.", "Les absents sont concernés par l’enseignement.", "Transmettre une fiche ne signifie pas devenir spécialiste."],
    exercice: "Préparez une explication de trois phrases pour un absent : objectif, fait, référence.",
    correction: "Objectif : apprendre et transmettre. Fait : la délégation explique ses contraintes de déplacement et sa demande. Référence : al-Bukhârî 4368.",
    questions: [question("Pourquoi la délégation demande-t-elle un enseignement ?", "Pour agir puis transmettre à son peuple.", ["Pour remplacer toutes les sources.", "Pour obtenir une biographie exhaustive."], "La demande inclut la transmission aux absents.", 2), question("La fiche fixe-t-elle l’année précise de la visite ?", "Non, son placement est thématique.", ["Oui, sans preuve supplémentaire.", "Oui, grâce au seul titre du chapitre."], "La référence ne suffit pas ici à assigner une année précise.")],
  }),
];
