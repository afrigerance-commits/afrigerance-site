import { chapter, hadith, quran, question } from "./schema";

export const mecca = [
  chapter({
    slug: "debut-revelation", titre: "À Hirâ : le commencement de la révélation", periode: "La mission à La Mecque", date: "Début de la mission",
    objectif: "Suivre les premiers repères de la révélation, l’accueil de Khadîja et la rencontre avec Waraqa, à partir du récit de ‘Â’icha.",
    sections: [
      { titre: "La rencontre à Hirâ", paragraphes: [
        "Al-Bukhârî 3 rapporte les retraites à Hirâ et la rencontre avec l’ange. Les premiers versets d’Al-‘Alaq sont au centre du récit. Le Prophète ﷺ retourne ensuite auprès de Khadîja dans un état de trouble. Ces éléments doivent être suivis dans leur ordre sans ajouter à la scène des paroles absentes du témoignage.",
        "Les versets 96:1–5 associent la lecture, la création de l’être humain et l’enseignement. Ils présentent Allah comme Celui qui enseigne à l’homme ce qu’il ne savait pas. Une lecture de la Sîra peut donc commencer par le rapport au savoir, tout en reconnaissant que la révélation n’est pas une production intellectuelle humaine." ] },
      { titre: "L’accueil et la compréhension", paragraphes: [
        "Khadîja l’accompagne auprès de Waraqa ibn Nawfal. Celui-ci reconnaît dans le récit l’ange venu à Mûsâ et évoque l’opposition qui accompagnera la mission. Le témoignage situe ainsi une annonce de difficulté dès le commencement. Il rapporte ensuite la mort de Waraqa et une interruption de la révélation.",
        "Commentaire pédagogique : ce commencement réunit un événement exceptionnel et des réactions humaines. La crainte ressentie n’est pas une absence de dignité ; le soutien reçu ne diminue pas la mission. Pour comprendre l’épisode, il est utile de garder ces dimensions ensemble plutôt que de raconter un commencement sans trouble ni accompagnement." ] },
      { titre: "Lire les premiers versets avec la biographie", paragraphes: [
        "La biographie donne un cadre à la lecture du passage ; le passage donne un contenu à la scène biographique. Cela évite deux erreurs : raconter l’événement en oubliant le message reçu, ou lire les versets comme si aucune personne ne les avait reçus dans une situation précise.",
        "Exercice de lecture approfondie : dans votre carnet, séparez les gestes, les paroles rapportées et les indications sur la révélation. Vous pourrez ensuite expliquer le commencement à quelqu’un sans réciter une scène dramatisée. La clarté du récit repose sur sa fidélité et son organisation, pas sur l’ajout d’effets." ] },
    ],
    sources: [hadith("bukhari", "3"), quran(96, "1-5")],
    vigilance: "La durée exacte de l’interruption de la révélation et les récits qui lui sont associés ne sont pas reconstitués à partir de cette seule référence.",
    retenir: ["Les premiers versets d’Al-‘Alaq structurent le récit.", "Khadîja accueille et accompagne.", "Waraqa évoque la mission et l’opposition."],
    exercice: "Pourquoi lire Al-‘Alaq 1–5 plutôt que seulement mémoriser le nom de la grotte ?",
    correction: "La scène est celle d’une révélation : ses premiers versets permettent de comprendre le message et pas seulement le lieu de l’événement.",
    questions: [question("Qui transmet le récit d’al-Bukhârî 3 ?", "‘Â’icha.", ["Un auteur contemporain.", "Un témoin anonyme."], "Le récit de la première révélation est transmis par ‘Â’icha.", 2), question("Quel passage accompagne le commencement ?", "Al-‘Alaq 96:1–5.", ["La sourate 110 seule.", "Les versets de la qibla."], "Les premiers versets d’Al-‘Alaq sont cités dans le récit.")],
  }),
  chapter({
    slug: "appel-public", titre: "L’appel public sur le mont Safâ", periode: "La mission à La Mecque", date: "Pendant la prédication mecquoise",
    objectif: "Comprendre le passage à un avertissement public auprès des proches, la confiance reconnue au Prophète ﷺ et l’opposition d’Abû Lahab.",
    sections: [
      { titre: "Un ordre et un rassemblement", paragraphes: [
        "Le verset 26:214 ordonne d’avertir les proches. Al-Bukhârî 4770 rapporte un rassemblement sur le mont Safâ : le Prophète ﷺ appelle plusieurs clans de Quraych. Certains viennent et d’autres envoient quelqu’un pour connaître la raison de l’appel. Le récit relie donc une instruction coranique à une prise de parole publique.",
        "Il interroge ses interlocuteurs sur la confiance qu’ils lui accorderaient s’il annonçait un danger. Ils reconnaissent sa véracité, puis il les avertit d’un châtiment. Abû Lahab réagit avec hostilité. La reconnaissance de la vérité d’un homme n’implique donc pas automatiquement l’acceptation de tout ce qu’il annonce." ] },
      { titre: "La proximité ne garantit pas l’adhésion", paragraphes: [
        "Commentaire pédagogique : ce chapitre aide à distinguer la relation familiale et l’accueil d’un message. Un proche peut entendre, discuter ou s’opposer. Le lecteur doit suivre ce que le témoignage rapporte de chaque personne sans transformer le lien de parenté en une preuve automatique d’accord.",
        "Il faut aussi respecter l’échelle de l’épisode. Cette scène ne décrit pas toutes les conversions ni toutes les étapes de l’appel à La Mecque. Elle fournit un moment identifiable dans un processus plus large. Une biographie rigoureuse peut être vivante tout en reconnaissant ce que sa référence ne couvre pas." ] },
      { titre: "Comprendre la forme de l’avertissement", paragraphes: [
        "L’exemple du danger sert dans le récit à mettre en évidence la confiance déjà accordée au locuteur. La réflexion pédagogique consiste à observer cette articulation, sans réduire la mission à une simple technique de communication. Son contenu concerne la responsabilité devant Allah, et non seulement l’efficacité d’un discours.",
        "Pour apprendre, relevez successivement l’ordre, les destinataires, la question posée, la réponse et la réaction hostile. Ce schéma permet de raconter l’événement avec précision. Il aide également à distinguer le contenu de l’annonce et la réponse de ceux qui l’entendent." ] },
    ],
    sources: [hadith("bukhari", "4770"), quran(26, "214-215")],
    vigilance: "Les durées attribuées à une phase secrète et l’ordre détaillé de toutes les premières conversions demandent d’autres références.",
    retenir: ["L’ordre d’avertir les proches est explicite.", "La véracité est reconnue dans le récit.", "L’hostilité d’Abû Lahab est rapportée."],
    exercice: "Remettez en ordre : réaction d’Abû Lahab, rassemblement, avertissement, question sur la confiance.",
    correction: "Rassemblement ; question sur la confiance ; avertissement ; réaction d’Abû Lahab.",
    questions: [question("Quelle référence rapporte l’appel sur Safâ ?", "Al-Bukhârî 4770.", ["Muslim 1218a.", "Al-Bukhârî 676."], "4770 relie l’appel au verset concernant les proches.", 1), question("Une reconnaissance de véracité garantit-elle l’adhésion au message ?", "Non, le récit montre une opposition malgré cette reconnaissance.", ["Oui, automatiquement.", "Oui, pour chaque proche."], "Les réactions doivent être distinguées de la réputation déjà reconnue.")],
  }),
  chapter({
    slug: "epreuves-mecquoises", titre: "Les épreuves mecquoises : hostilité et protection", periode: "La mission à La Mecque", date: "Avant l’Hégire",
    objectif: "Étudier une agression attestée et un mécanisme de protection, sans transformer la persécution en un récit uniforme.",
    sections: [
      { titre: "Une agression et une intervention", paragraphes: [
        "Al-Bukhârî 3678 rapporte qu’‘Uqba ibn Abî Mu‘ayt serre un vêtement autour du cou du Prophète ﷺ alors qu’il prie. Abû Bakr intervient et écarte l’agresseur. Le témoignage met en évidence un danger concret et un secours immédiat. Il ne faut pas le remplacer par une scène dont les gestes et les dialogues auraient été amplifiés.",
        "Ce cas donne accès à une partie de l’hostilité subie. Il ne permet pas de dresser une liste exhaustive des violences ni d’attribuer à tous les Mecquois le même comportement. La précision protège les personnes de portraits simplistes et les récits de généralisations abusives." ] },
      { titre: "Le cas de la protection d’Abû Bakr", paragraphes: [
        "Dans al-Bukhârî 2297, Abû Bakr envisage de partir vers l’Abyssinie. Ibn ad-Daghna le rencontre et lui propose une protection, en rappelant son aide aux personnes dans le besoin. Quraych accepte cette protection avec des conditions concernant sa pratique publique. Le récit décrit ensuite les tensions autour de sa récitation et le renoncement d’Abû Bakr à cette protection.",
        "Commentaire pédagogique : l’épisode permet de penser la différence entre une sécurité accordée sous conditions et une liberté réelle de pratiquer. Il montre également que la valeur sociale reconnue à une personne n’empêche pas l’opposition à sa foi." ] },
      { titre: "Relier patience et attention aux victimes", paragraphes: [
        "Lire une épreuve historique ne consiste pas à rechercher une intensité émotionnelle toujours plus grande. Il faut aussi observer les secours, les choix et les contraintes. Dans ce chapitre, Abû Bakr apparaît à la fois comme celui qui intervient pour autrui et comme celui dont la propre sécurité devient un enjeu.",
        "Pour la réflexion personnelle, demandez-vous comment raconter une injustice sans humilier celui qui la subit. Une synthèse respectueuse conserve les faits nécessaires, évite le spectacle et ne présente pas la souffrance comme un objectif. Les conclusions pratiques contemporaines exigent leur propre discernement ; cette leçon n’est pas une consigne de confrontation." ] },
    ],
    sources: [hadith("bukhari", "3678"), hadith("bukhari", "2297")],
    vigilance: "Une fiche distincte documente le pacte de boycott. Sa durée, ses suites et les récits détaillés de torture nécessitent encore des dossiers complémentaires.",
    retenir: ["Une agression précise est documentée.", "Abû Bakr intervient pour défendre.", "La protection peut être conditionnelle et fragile."],
    exercice: "Comparez l’intervention d’Abû Bakr et la protection d’Ibn ad-Daghna : quel problème chacune cherche-t-elle à résoudre ?",
    correction: "L’intervention écarte une agression immédiate. La protection vise la sécurité sociale d’Abû Bakr, mais des conditions et des tensions en limitent la portée.",
    questions: [question("Qui intervient dans al-Bukhârî 3678 ?", "Abû Bakr.", ["Héraclius.", "Le négus."], "Le récit rapporte son intervention contre ‘Uqba.", 2), question("Peut-on généraliser cette scène à tous les Mecquois ?", "Non, il faut respecter le témoignage précis.", ["Oui, sans distinction.", "Oui, si le récit est authentique."], "L’authenticité d’un épisode n’autorise pas une généralisation illimitée.")],
  }),
  chapter({
    slug: "abyssinie", titre: "L’Abyssinie : l’exil et la mémoire des migrants", periode: "De La Mecque vers un refuge", date: "Avant l’Hégire ; retours jusqu’à la période de Khaybar",
    objectif: "Comprendre la place de l’exil en Abyssinie à partir d’un témoignage sur Ja‘far, Asmâ’ et les voyageurs revenus auprès du Prophète ﷺ.",
    sections: [
      { titre: "Une autre expérience de migration", paragraphes: [
        "Al-Bukhârî 4230 rapporte le voyage d’Abû Mûsâ et de son groupe depuis le Yémen, leur arrivée en Abyssinie auprès du négus et leur rencontre avec Ja‘far ibn Abî Tâlib. Ils restent avec lui avant de rejoindre le Prophète ﷺ au temps de Khaybar. Ce témoignage atteste une communauté présente en Abyssinie et des parcours qui ne se limitent pas à la route directe de La Mecque vers Médine.",
        "Le récit mentionne aussi Asmâ’ bint ‘Umays. Face à une remarque sur l’antériorité de la migration, elle rappelle l’éloignement, la crainte et les difficultés vécues. Elle annonce vouloir rapporter les propos au Prophète ﷺ sans les déformer. Sa parole donne une place à l’expérience des personnes longtemps éloignées." ] },
      { titre: "Ce que le témoignage fait comprendre", paragraphes: [
        "Commentaire pédagogique : il est facile de lire la chronologie depuis le centre et d’oublier ceux qui vivent ailleurs. Cette leçon invite à suivre également les familles séparées, les communautés réfugiées et les retours différés. Un même engagement peut se déployer dans des situations matérielles très différentes.",
        "L’expérience d’Asmâ’ n’est pas un détail secondaire. Elle nous apprend à écouter la personne qui décrit son propre parcours et à ne pas mesurer sa contribution par sa seule proximité géographique. Cette observation est une lecture éducative du récit, pas une formule prophétique." ] },
      { titre: "Ne pas confondre deux dossiers", paragraphes: [
        "Le témoignage du retour ne fournit pas à lui seul le discours complet de Ja‘far devant le négus ni le nombre exact des premiers départs. Ces thèmes méritent un dossier historique distinct. Pour l’instant, le parcours garde les éléments vérifiés et indique les questions ouvertes.",
        "Dans votre chronologie, dessinez une deuxième ligne intitulée « communauté en exil ». Vous comprenez alors qu’un événement raconté à Médine peut éclairer une histoire commencée bien avant. La Sîra gagne en profondeur lorsque l’on suit ces lignes parallèles au lieu de supposer que tous les compagnons vivent chaque étape ensemble." ] },
    ],
    sources: [hadith("bukhari", "4230")],
    vigilance: "Le discours complet devant le négus, les dates des deux départs et les listes d’exilés restent à vérifier séparément. Le récit cité concerne notamment des retours, pas toutes les étapes initiales.",
    retenir: ["Des migrants vivent auprès de Ja‘far en Abyssinie.", "Asmâ’ témoigne de difficultés vécues loin du Prophète ﷺ.", "La chronologie comporte des parcours parallèles."],
    exercice: "Pourquoi un récit situé au temps de Khaybar est-il utile pour étudier l’exil antérieur ?",
    correction: "Il rapporte le séjour et le retour de personnes qui avaient vécu en Abyssinie. Sa position tardive ne supprime pas la mémoire des étapes précédentes.",
    questions: [question("Avec qui le groupe d’Abû Mûsâ séjourne-t-il en Abyssinie ?", "Ja‘far ibn Abî Tâlib.", ["Héraclius.", "Abû Lahab."], "Ja‘far est explicitement mentionné dans 4230.", 1), question("4230 donne-t-il tous les détails des premiers départs ?", "Non, le dossier initial demande d’autres sources.", ["Oui, toutes les dates.", "Oui, toutes les listes."], "Le récit choisi ne doit pas être étendu au-delà de sa portée.")],
  }),
  chapter({
    slug: "taif", titre: "Le refus et l’espérance : l’épreuve liée à Tâ’if", periode: "La mission à La Mecque", date: "Avant l’Hégire",
    objectif: "Étudier le refus rencontré auprès d’Ibn ‘Abd Yâlîl et la réponse du Prophète ﷺ à l’ange des montagnes.",
    sections: [
      { titre: "Un jour particulièrement difficile", paragraphes: [
        "‘Â’icha interroge le Prophète ﷺ sur un jour plus difficile que celui d’Uhud. Dans Muslim 1795, il évoque le refus d’Ibn ‘Abd Yâlîl ibn ‘Abd Kulâl et son départ dans l’affliction. Il reprend conscience de son environnement à Qarn ath-Tha‘âlib. Le récit présente l’intensité d’une épreuve sans qu’il soit nécessaire d’y ajouter des détails violents non cités.",
        "Jibrîl lui indique qu’Allah a entendu la réaction de son peuple. L’ange chargé des montagnes propose une destruction. Le Prophète ﷺ préfère espérer que leurs descendants adoreront Allah sans Lui associer de partenaire. La réponse est tournée vers une possibilité future plutôt que vers une vengeance immédiate." ] },
      { titre: "La portée de cette espérance", paragraphes: [
        "Commentaire pédagogique : le récit permet de réfléchir à une retenue qui ne nie pas la douleur. L’affliction est dite, et la réponse ne s’y enferme pas. On peut retenir une manière de regarder les personnes et leur avenir sans prétendre connaître le destin de chaque individu.",
        "Il ne faut pas transformer cette scène exceptionnelle en une obligation de rester dans toute situation dangereuse. Une biographie donne un témoignage situé. Pour une décision personnelle, les autres textes, les droits des personnes et les moyens de protection doivent être considérés." ] },
      { titre: "Un récit connu, une référence précise", paragraphes: [
        "L’épisode est souvent raconté avec des éléments supplémentaires : gestes des habitants, détails de blessures ou longues invocations. La fiche ne les insère pas sans examen. Le lecteur peut déjà apprendre beaucoup du témoignage retenu : le refus, la peine, la proposition et la réponse constituent une progression claire.",
        "Pour approfondir, comparez le sens de « pardonner », « patienter » et « espérer ». Ce ne sont pas des mots interchangeables. Ici, la réponse explicitement rapportée exprime une espérance concernant les descendants et leur adoration. Une explication fidèle garde cette précision au lieu de la remplacer par une formule générale." ] },
    ],
    sources: [hadith("muslim", "1795")],
    vigilance: "L’épisode appelé « jour d’Al-‘Aqaba » dans ce récit ne doit pas être confondu avec les serments d’Al-‘Aqaba. Les détails populaires et l’invocation longue attribuée à Tâ’if ne sont pas intégrés sans vérification.",
    retenir: ["Le refus et l’affliction sont rapportés.", "Le Prophète ﷺ choisit l’espérance pour les descendants.", "Ne pas confondre les épisodes portant un nom proche."],
    exercice: "Résumez la réponse à l’ange des montagnes sans ajouter de citation littérale.",
    correction: "Le Prophète ﷺ espère qu’Allah fera naître parmi leurs descendants des personnes qui L’adoreront seul. Il s’agit ici d’une reformulation du sens.",
    questions: [question("Quelle référence documente cette réponse ?", "Muslim 1795.", ["Al-Bukhârî 428.", "Muslim 2276."], "Muslim 1795 rapporte la question de ‘Â’icha et la réponse.", 2), question("Le récit est-il le serment d’Al-‘Aqaba ?", "Non, il s’agit d’un autre épisode.", ["Oui, puisque le mot apparaît.", "Oui, du pèlerinage d’adieu."], "Un nom de lieu ou d’épisode proche ne suffit pas à identifier le même événement.")],
  }),
  chapter({
    slug: "isra-et-miraj", titre: "Al-Isrâ’ et Al-Mi‘râj : le voyage et la prière", periode: "Avant l’Hégire", date: "La date exacte n’est pas fixée ici",
    objectif: "Distinguer le voyage nocturne évoqué par le Coran et les étapes de l’ascension rapportées dans Muslim, avec la prescription des prières.",
    sections: [
      { titre: "Le voyage nocturne", paragraphes: [
        "Le verset 17:1 évoque le voyage nocturne du serviteur d’Allah depuis la Mosquée sacrée vers la Mosquée éloignée, dont les alentours ont été bénis, afin de lui montrer des signes. Le verset est le point d’ancrage coranique du chapitre. Il ne fixe pas une date de calendrier.",
        "Muslim 162a rapporte le déplacement sur Al-Burâq vers Bayt al-Maqdis, la prière et le choix du lait. Il décrit ensuite l’ascension avec Jibrîl. Le lecteur doit distinguer le passage coranique et les précisions du hadith plutôt que de les fondre dans une citation unique." ] },
      { titre: "L’ascension et les prières", paragraphes: [
        "Le récit mentionne des rencontres avec plusieurs prophètes, puis la prescription des prières. Il rapporte les échanges avec Mûsâ et leur réduction à cinq, avec la récompense conservée. Ces éléments donnent à la prière une place centrale dans le récit, au-delà de l’émerveillement devant les étapes du voyage.",
        "Commentaire pédagogique : une bonne lecture ne consiste pas seulement à mémoriser l’ordre des rencontres. Elle se demande ce que l’épisode met au premier plan dans la vie du croyant. Ici, l’attention portée aux prières permet de relier la biographie à une pratique quotidienne, sans créer de mérite nouveau pour une date non établie." ] },
      { titre: "L’événement et sa commémoration : deux questions", paragraphes: [
        "L’authenticité d’un événement et la fixation d’une célébration annuelle sont deux dossiers différents. Affirmer le voyage à partir des textes retenus n’établit pas automatiquement une date exacte, une prière particulière ou un nombre de répétitions. Chaque pratique attribuée à la Sunna demande sa preuve.",
        "Pour travailler, créez deux colonnes : ce que dit 17:1 ; ce que précise 162a. Ajoutez une troisième colonne pour ce que vous ignoriez ou voulez vérifier. Cet exercice montre comment les sources se complètent sans que l’on doive inventer une chronologie au jour près." ] },
    ],
    sources: [quran(17, "1"), hadith("muslim", "162a")],
    vigilance: "Aucune date annuelle précise ni pratique spéciale de commémoration n’est déduite de ces références. Les étapes sont résumées, non reproduites intégralement.",
    retenir: ["Le Coran évoque le voyage nocturne.", "Muslim précise l’ascension et les prières.", "Événement attesté et pratique de commémoration sont distincts."],
    exercice: "Pourquoi faut-il une preuve distincte pour attribuer une pratique annuelle à la Sunna ?",
    correction: "La preuve d’un événement ne prouve pas à elle seule une prescription de commémoration, sa date ou sa forme.",
    questions: [question("Quel verset évoque le voyage nocturne ?", "17:1.", ["106:4.", "93:6."], "Le début de la sourate Al-Isrâ’ évoque ce voyage.", 1), question("Quelle pratique occupe une place centrale dans 162a ?", "Les prières prescrites.", ["Une collecte annuelle précise.", "Sept répétitions après Jumu‘a."], "Le récit rapporte la prescription puis la réduction à cinq prières.")],
  }),
  chapter({
    slug: "aqaba-et-medine", titre: "Al-‘Aqaba et l’ouverture vers Médine", periode: "Vers l’Hégire", date: "Avant la migration",
    objectif: "Comprendre l’engagement attesté par ‘Ubâda et le contexte médinois évoqué par ‘Â’icha, sans confondre les différents serments.",
    sections: [
      { titre: "Un engagement religieux et moral", paragraphes: [
        "Al-Bukhârî 18 présente ‘Ubâda ibn as-Sâmit comme un participant à Badr et un responsable lors du serment d’Al-‘Aqaba. Il rapporte un engagement devant le Prophète ﷺ portant notamment sur l’adoration d’Allah seul, l’interdiction du vol, de la fornication, du meurtre des enfants et de la calomnie.",
        "Ces éléments donnent un contenu concret à l’engagement. L’adhésion ne se réduit pas à un nom collectif : elle implique des responsabilités envers Allah et envers les personnes. Le texte retenu ne fournit cependant pas une reconstitution de chaque réunion d’Al-‘Aqaba." ] },
      { titre: "Le contexte d’une ville éprouvée", paragraphes: [
        "Dans al-Bukhârî 3930, ‘Â’icha évoque la bataille de Bu‘âth et les divisions qui avaient touché les groupes de Médine avant l’arrivée du Prophète ﷺ. Ce témoignage aide à comprendre qu’il ne rejoint pas une ville sans histoire ni tensions.",
        "Commentaire pédagogique : une communauté nouvelle se forme dans un lieu où existent déjà des familles, des rivalités et des expériences. Lire la migration comme le simple déplacement d’un individu ferait manquer la transformation des relations qui l’accompagne. Le chapitre suivant doit donc être lu à la fois comme un trajet et comme le début d’une nouvelle vie collective." ] },
      { titre: "Respecter les distinctions", paragraphes: [
        "Les biographies distinguent plusieurs rencontres et serments d’Al-‘Aqaba. Le présent dossier ne fixe pas leur nombre de participants ni tous leurs dialogues. Il conserve le témoignage vérifié sur l’engagement et renvoie les détails à une étude historique supplémentaire.",
        "Pour retenir, formulez une réponse à deux questions : à quoi s’engage-t-on ; dans quel contexte une nouvelle communauté va-t-elle s’établir ? Cette double lecture relie le contenu moral de l’engagement à la réalité sociale sans prétendre résoudre, avec deux références, toutes les questions de l’histoire médinoise." ] },
    ],
    sources: [hadith("bukhari", "18"), hadith("bukhari", "3930")],
    vigilance: "La référence 18 ne suffit pas à reconstituer la chronologie de tous les serments ni leurs effectifs. L’épisode d’Al-‘Aqaba évoqué dans Muslim 1795 est distinct.",
    retenir: ["Le serment comporte un contenu religieux et moral.", "Médine a déjà connu des divisions.", "Ne pas fusionner tous les épisodes d’Al-‘Aqaba."],
    exercice: "Expliquez pourquoi une histoire de l’Hégire doit aussi présenter la ville d’arrivée.",
    correction: "L’arrivée modifie des relations préexistantes. Le contexte de Médine aide à comprendre la formation de la communauté et ses responsabilités.",
    questions: [question("Quel transmetteur est lié à Al-‘Aqaba dans al-Bukhârî 18 ?", "‘Ubâda ibn as-Sâmit.", ["Waraqa ibn Nawfal.", "Ibn ad-Daghna."], "Il est présenté comme participant au serment.", 2), question("Que rappelle le récit de Bu‘âth ?", "Des divisions antérieures à l’arrivée à Médine.", ["Une ville sans conflit antérieur.", "La date exacte de naissance."], "3930 évoque ce contexte avant l’arrivée du Prophète ﷺ.")],
  }),
];
