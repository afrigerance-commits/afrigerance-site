import { chapter, hadith, quran, question } from "./schema";

export const complements = [
  { before: "abyssinie", event: chapter({
    slug: "boycott-mecquois", titre: "Le boycott : une pression sur les relations et les échanges", periode: "La mission à La Mecque", date: "Avant l’Hégire — placement général dans la période mecquoise",
    objectif: "Comprendre le pacte de pression mentionné dans un souvenir ultérieur, sans reconstruire ses détails à partir de récits non vérifiés.",
    sections: [
      { titre: "Un souvenir conservé", paragraphes: [
        "Dans al-Bukhârî 1590, Abû Hurayra rapporte une parole du Prophète ﷺ lors du pèlerinage à propos de Khayf Banî Kinâna. Le récit rappelle un pacte conclu par Quraych et les Banû Kinâna contre les Banû Hâchim et les Banû al-Muttalib, avec une variation de nom conservée dans le texte.",
        "Le pacte est décrit par l’interruption des mariages et des échanges commerciaux jusqu’à la remise du Prophète ﷺ. Cette référence atteste une pression qui touche les relations et la vie matérielle. Elle ne précise pas à elle seule toute la durée du boycott." ] },
      { titre: "Une épreuve qui dépasse un individu", paragraphes: [
        "Commentaire pédagogique : lorsqu’une pression vise les échanges et les alliances, elle peut affecter des proches et des groupes entiers. Comprendre cet épisode exige donc de regarder le tissu des relations, et pas seulement une confrontation directe entre deux personnes.",
        "Le récit est transmis à partir d’un rappel ultérieur. Cela montre qu’un témoignage situé dans les derniers temps peut documenter une épreuve antérieure. Pour le lecteur, la date de la parole et celle de l’événement rappelé sont deux repères distincts." ] },
      { titre: "Les limites d’une reconstitution", paragraphes: [
        "Les récits de la feuille détruite, de la faim détaillée et des personnes qui auraient rompu le pacte demandent leurs propres sources. Ils ne sont pas insérés dans cette fiche comme des éléments certains. La pression attestée constitue déjà un objet d’apprentissage important.",
        "Pour travailler, identifiez les relations visées et la condition annoncée. Puis expliquez pourquoi le terme « boycott » résume un mécanisme sans remplacer la description du pacte. Une bonne synthèse donne d’abord les éléments précis, avant d’employer un mot général." ] },
    ], sources: [hadith("bukhari", "1590")],
    vigilance: "La place avant le chapitre d’Abyssinie est un classement pédagogique de l’épreuve mecquoise, pas l’affirmation que tout l’exil lui est postérieur. La durée et les modalités de levée du pacte restent à documenter.",
    retenir: ["Un pacte de pression est attesté.", "Les mariages et les échanges sont concernés.", "Le souvenir est rapporté dans un contexte ultérieur."],
    exercice: "Distinguez la date du témoignage et la période du pacte.", correction: "La parole est rapportée dans le contexte du pèlerinage ; elle rappelle un pacte antérieur de la période mecquoise.",
    questions: [question("Que vise le pacte décrit ?", "Les mariages et les échanges commerciaux.", ["La direction de la prière.", "La construction de la mosquée."], "1590 décrit ces moyens de pression.", 1), question("Le récit donne-t-il toute la durée du boycott ?", "Non, un dossier complémentaire est nécessaire.", ["Oui, au jour près.", "Oui, toutes les dates."], "Il faut conserver la portée limitée du témoignage.")],
  }) },
  { before: "taif", event: chapter({
    slug: "abu-talib-et-guidance", titre: "Abû Tâlib : la parenté et la guidance", periode: "La mission à La Mecque", date: "La fin de la vie d’Abû Tâlib",
    objectif: "Étudier la visite auprès d’Abû Tâlib mourant et distinguer l’appel du Prophète ﷺ de la guidance accordée par Allah.",
    sections: [
      { titre: "La visite rapportée", paragraphes: [
        "Al-Bukhârî 3884 rapporte la venue du Prophète ﷺ auprès de son oncle Abû Tâlib alors qu’il est mourant. Il l’appelle à prononcer l’attestation d’adoration d’Allah seul. Abû Jahl et ‘Abd Allah ibn Umayya évoquent la religion de ‘Abd al-Muttalib. Le récit indique la dernière position exprimée par Abû Tâlib.",
        "Le témoignage relie cet épisode à des passages sur la demande de pardon pour les polythéistes et sur la guidance. La fiche ne transforme pas cette scène en un dialogue inventé ni en une occasion de traiter sans discernement de la situation de personnes contemporaines." ] },
      { titre: "L’appel et la guidance", paragraphes: [
        "Le verset 28:56 distingue le souhait du Prophète ﷺ pour une personne aimée et la guidance accordée par Allah. Il est utile de lire le passage avec le récit, sans conclure que l’appel ou l’affection seraient dépourvus de valeur.",
        "Commentaire pédagogique : une proximité ne garantit pas une adhésion. La Sîra permet d’observer une relation familiale sans lui attribuer automatiquement une issue que l’on souhaiterait. Cette discipline de lecture protège les sources de modifications destinées à rendre une histoire plus confortable." ] },
      { titre: "Une lecture respectueuse des limites", paragraphes: [
        "La scène doit être étudiée pour elle-même. Elle ne fournit pas toutes les dates de la période ni une comparaison chronologique complète entre les décès d’Abû Tâlib et de Khadîja. Ces questions nécessitent des références supplémentaires.",
        "Pour retenir, reformulez deux idées distinctes : le Prophète ﷺ appelle son oncle ; le Coran rappelle que la guidance appartient à Allah. Ne faites pas de votre souhait une donnée historique. Une lecture respectueuse peut reconnaître la difficulté d’un récit sans en changer les faits." ] },
    ], sources: [hadith("bukhari", "3884"), quran(28, "56")],
    vigilance: "L’intervalle exact avec le décès de Khadîja et la datation de l’expression « année de la tristesse » ne sont pas fixés ici. L’application juridique aux cas particuliers demande un enseignement spécialisé.",
    retenir: ["La visite et l’appel sont rapportés.", "La parenté ne garantit pas l’adhésion.", "28:56 rappelle la guidance d’Allah."],
    exercice: "Expliquez pourquoi affection et issue d’un appel sont deux choses distinctes.", correction: "On peut appeler une personne aimée et souhaiter son bien ; cela ne permet pas d’affirmer qu’elle a accepté. Le récit et le verset doivent être respectés.",
    questions: [question("Auprès de qui la visite a-t-elle lieu ?", "Abû Tâlib.", ["Héraclius.", "Ibn ad-Daghna."], "3884 documente cette scène.", 2), question("Quel verset est utilisé sur la guidance ?", "28:56.", ["17:1.", "106:4."], "Ce passage distingue le souhait pour une personne aimée et la guidance d’Allah.")],
  }) },
  { before: "qibla", event: chapter({
    slug: "adhan-a-medine", titre: "L’adhan : appeler la communauté à la prière", periode: "Les débuts à Médine", date: "Après l’installation",
    objectif: "Comprendre le besoin d’un appel commun et le rôle de Bilâl dans le récit transmis par Ibn ‘Umar.",
    sections: [
      { titre: "Un besoin dans la vie collective", paragraphes: [
        "Al-Bukhârî 604 rapporte qu’au début de l’installation à Médine, les musulmans se réunissent pour la prière en estimant son moment. Ils discutent d’un moyen d’appel. Plusieurs propositions sont évoquées, puis ‘Umar propose qu’un homme appelle les personnes.",
        "Le Prophète ﷺ demande à Bilâl de se lever et de prononcer l’appel. Le témoignage éclaire un besoin pratique dans la communauté : la prière collective demande aussi une information partagée." ] },
      { titre: "Un appel et une responsabilité", paragraphes: [
        "Commentaire pédagogique : l’adhan relie une orientation spirituelle et la vie quotidienne. Il aide des personnes différentes à se retrouver à un moment commun. L’étude de cette scène permet de comprendre pourquoi l’appel n’est pas un simple fond sonore décoratif.",
        "Pour une application, cette distinction compte : un enregistrement diffusé par un téléphone est un rappel technique. Il ne faut pas le confondre avec toutes les responsabilités attachées à l’appel dans une communauté ou une mosquée. Le chapitre ne tranche pas ici les questions juridiques de ces usages." ] },
      { titre: "Compléter le dossier sans fusionner les récits", paragraphes: [
        "D’autres narrations traitent du commencement de l’adhan. Elles nécessitent un examen séparé pour comparer leurs formulations et leurs précisions. La référence choisie ne doit pas être présentée comme l’ensemble du dossier, ni complétée de mémoire.",
        "Pour travailler, relevez le besoin initial, les propositions, la décision et la personne chargée d’appeler. Vous disposez d’un récit clair et référencé. Les différentes formules de l’adhan et les règles de ses horaires appartiennent à des leçons complémentaires, où les variantes doivent être identifiées." ] },
    ], sources: [hadith("bukhari", "604")],
    vigilance: "Les autres récits du commencement, les variantes de formule et les règles des enregistrements ne sont pas traités intégralement. Aucun mérite spécifique n’est créé pour un audio d’application.",
    retenir: ["Un moyen d’appel est discuté.", "Bilâl est chargé d’appeler.", "Un rappel technique ne résume pas toutes les règles de l’adhan."],
    exercice: "Quel besoin collectif le récit permet-il de comprendre ?", correction: "Il faut informer les personnes du moment de la prière et les réunir, plutôt que laisser chacune estimer ce moment isolément.",
    questions: [question("Qui reçoit la demande de prononcer l’appel ?", "Bilâl.", ["Waraqa.", "Khadîja."], "604 rapporte la demande adressée à Bilâl.", 1), question("Le chapitre décrit-il toutes les variantes de formule ?", "Non, elles demandent un dossier complémentaire.", ["Oui, toutes sans distinction.", "Oui, par le seul récit de la discussion."], "L’objet de la fiche est la scène du besoin et de la décision.")],
  }) },
  { before: "ifk", event: chapter({
    slug: "banu-qurayza", titre: "Les Banû Qurayza : étudier un jugement situé", periode: "La communauté médinoise éprouvée", date: "Le dossier associé à la période des coalisés",
    objectif: "Identifier le jugement rapporté de Sa‘d ibn Mu‘âdh sans l’effacer, le généraliser ou lui attribuer des détails absents du témoignage.",
    sections: [
      { titre: "Le récit d’un arbitrage", paragraphes: [
        "Al-Bukhârî 4121 rapporte que les Banû Qurayza acceptent le jugement de Sa‘d ibn Mu‘âdh. Le Prophète ﷺ le fait venir et lui présente leur acceptation de son verdict. Le récit rapporte la décision de faire exécuter les combattants et de prendre les enfants en captivité, ainsi que l’approbation du jugement par le Prophète ﷺ.",
        "Ce fait difficile ne doit pas être effacé d’une étude historique. Il ne doit pas non plus être transformé en une règle contre un groupe religieux dans son ensemble. Le témoignage concerne une affaire et un jugement situés." ] },
      { titre: "Une source précise, un dossier plus large", paragraphes: [
        "Le récit choisi ne donne pas le nombre complet de personnes concernées, toutes les causes du conflit ni le texte de tous les accords antérieurs. Pour expliquer ces questions, il faut des sources supplémentaires. Une affirmation exacte sur le jugement ne suffit pas à reconstruire tout son contexte.",
        "Commentaire pédagogique : une étude sérieuse sait lire les événements difficiles sans les maquiller et sans s’en servir pour alimenter une hostilité actuelle. Elle distingue description historique, explication du contexte et discussion juridique." ] },
      { titre: "L’autorité et les limites de l’application", paragraphes: [
        "Il s’agit d’un jugement dans un contexte prophétique, non d’une autorisation pour des particuliers de sanctionner ou d’attaquer. Les règles de justice, de conflit et de protection ne se déduisent pas d’une fiche isolée. Ce chapitre permet de retrouver un témoignage et de comprendre pourquoi une lecture encadrée est nécessaire.",
        "Pour travailler, écrivez quatre rubriques : personnes, autorité, décision, questions encore ouvertes. Cette organisation évite deux erreurs opposées : nier le texte ou lui faire dire davantage qu’il ne dit. Gardez enfin les sujets non documentés comme des questions de recherche." ] },
    ], sources: [hadith("bukhari", "4121")],
    vigilance: "Les causes, les accords antérieurs, les chiffres et l’analyse juridique complète restent à documenter. Aucune transposition à des particuliers ou à un groupe contemporain n’est autorisée par cette fiche.",
    retenir: ["Sa‘d prononce un jugement accepté comme arbitrage.", "La décision doit être décrite sans ajout de chiffres.", "Description historique et autorisation d’action sont distinctes."],
    exercice: "Pourquoi une narration authentique ne dispense-t-elle pas d’étudier le contexte et le droit ?", correction: "Elle documente un événement précis. Ses causes et la portée juridique de son application demandent l’ensemble du dossier, pas une généralisation à partir d’une seule scène.",
    questions: [question("Qui prononce le verdict dans 4121 ?", "Sa‘d ibn Mu‘âdh.", ["Abû Lahab.", "Héraclius."], "Sa‘d est appelé pour ce jugement.", 2), question("Le récit autorise-t-il des particuliers à appliquer des sanctions ?", "Non, il rapporte un jugement historique sous autorité prophétique.", ["Oui, sans autorité.", "Oui, contre tout groupe."], "Un événement situé ne constitue pas une permission générale.")],
  }) },
  { before: "muta", event: chapter({
    slug: "umra-accomplie", titre: "La ‘umra accomplie et le soin d’une enfant", periode: "Après Al-Hudaybiyya", date: "L’entrée prévue l’année suivante",
    objectif: "Relier le report de l’entrée à son accomplissement et étudier le dossier de la fille de Hamza sans réduire cette étape à un événement politique.",
    sections: [
      { titre: "De l’accord à l’entrée", paragraphes: [
        "Al-Bukhârî 4251 rappelle l’accord permettant un séjour de trois jours à La Mecque l’année suivante. Le récit décrit l’entrée et le départ lorsque le temps convenu est terminé. Cette scène peut être lue après Al-Hudaybiyya : l’histoire du report ne s’arrête pas au moment où l’accord est conclu.",
        "Le témoignage rapporte ensuite que la fille de Hamza suit le groupe en appelant. ‘Alî la prend avec lui et plusieurs compagnons discutent de sa prise en charge. Le récit relie ainsi une étape collective et le besoin d’une enfant." ] },
      { titre: "La prise en charge et la parenté", paragraphes: [
        "Le Prophète ﷺ la confie à sa tante maternelle et évoque la place de celle-ci par rapport à la mère. Le récit comprend aussi des paroles concernant ‘Alî, Ja‘far et Zayd. La fiche en donne les repères sans reproduire tous les échanges.",
        "Commentaire pédagogique : l’attention à une enfant ne doit pas disparaître derrière les grands événements. Une Sîra approfondie regarde aussi les personnes dont la situation réclame une décision concrète. Cela donne une autre dimension à la lecture de la communauté." ] },
      { titre: "Ne pas transformer une scène en code complet", paragraphes: [
        "Les questions de garde et de parenté demandent une étude juridique avec les autres textes. La décision rapportée est importante, mais une synthèse biographique ne suffit pas à résoudre toutes les situations familiales contemporaines.",
        "Pour apprendre, tracez deux lignes : la réalisation de l’accord et la prise en charge de l’enfant. Elles se rencontrent dans un même témoignage sans avoir le même objet. Vous comprendrez mieux pourquoi un long récit peut servir plusieurs dossiers, chacun avec une portée distincte." ] },
    ], sources: [hadith("bukhari", "4251")],
    vigilance: "La durée du séjour est un repère du témoignage. Les règles complètes de garde, de parenté et d’allaitement ne sont pas déduites de cette fiche.",
    retenir: ["L’entrée prévue est accomplie.", "Le départ respecte la durée convenue.", "La prise en charge de la fille de Hamza est un autre objet du récit."],
    exercice: "Pourquoi un même témoignage peut-il documenter deux thèmes différents ?", correction: "Il peut raconter plusieurs scènes successives. Il faut associer chaque affirmation à la partie pertinente plutôt que tout ranger sous un seul titre.",
    questions: [question("Quelle durée de séjour est mentionnée ?", "Trois jours.", ["Sept mois.", "Une durée illimitée."], "4251 rappelle cette condition.", 1), question("Quelle enfant est concernée ?", "La fille de Hamza.", ["La fille d’Héraclius.", "Une enfant sans lien identifié."], "Le témoignage nomme cette parenté.")],
  }) },
  { before: "foyer-et-douceur", event: chapter({
    slug: "hajj-abu-bakr", titre: "Le pèlerinage dirigé par Abû Bakr et l’annonce à Minâ", periode: "Avant le pèlerinage d’adieu", date: "Une étape distincte du pèlerinage du Prophète ﷺ",
    objectif: "Distinguer le pèlerinage dirigé par Abû Bakr et l’annonce transmise par Abû Hurayra et ‘Alî, sans fusionner les pèlerinages.",
    sections: [
      { titre: "Une mission d’annonce", paragraphes: [
        "Dans al-Bukhârî 4655, Abû Hurayra rapporte qu’Abû Bakr, chargé de diriger les pèlerins, l’envoie avec des annonceurs le jour du sacrifice à Minâ. L’annonce concerne l’absence de pèlerinage des polythéistes après cette année et l’interdiction du tawâf pratiqué nu.",
        "Le récit mentionne aussi l’envoi de ‘Alî par le Prophète ﷺ pour proclamer Barâ’a. ‘Alî participe à l’annonce devant les personnes présentes. Le témoignage donne donc une répartition de responsabilités entre plusieurs compagnons." ] },
      { titre: "Distinguer les étapes du pèlerinage", paragraphes: [
        "Cette scène ne doit pas être attribuée sans distinction au récit de Jâbir sur le pèlerinage du Prophète ﷺ. Il existe plusieurs épisodes liés au hajj dans la biographie. Le nom du lieu ou du rite ne suffit pas à les fusionner.",
        "Commentaire pédagogique : une chronologie claire associe à chaque épisode son responsable et sa référence. Cette discipline évite de déplacer un discours ou une annonce dans une scène où elle n’est pas rapportée." ] },
      { titre: "La portée historique et les accords", paragraphes: [
        "L’étude détaillée de Barâ’a, des traités et de leurs échéances demande les passages coraniques et les témoignages pertinents. La fiche n’explique pas toutes ces dispositions à partir d’une annonce isolée. Elle documente la mission transmise et son contenu explicitement rapporté.",
        "Pour travailler, remplissez une courte fiche : qui dirige, qui annonce, où, quel message. Comparez-la ensuite au chapitre du pèlerinage d’adieu. Vous verrez des ressemblances de cadre, mais aussi des différences de personnes et d’objet. C’est ainsi qu’une vue d’ensemble devient précise." ] },
    ], sources: [hadith("bukhari", "4655")],
    vigilance: "Les règles détaillées de Barâ’a et les exceptions relatives aux traités nécessitent un dossier distinct. Le chapitre ne reconstitue pas l’ensemble des annonces ni des échéances.",
    retenir: ["Abû Bakr dirige ce pèlerinage.", "Abû Hurayra participe à l’annonce.", "‘Alî est envoyé pour proclamer Barâ’a."],
    exercice: "Quelle confusion faut-il éviter avec le récit de Muslim 1218a ?", correction: "Il ne faut pas attribuer toutes les scènes de ce pèlerinage à celui que Jâbir raconte avec le Prophète ﷺ. Les épisodes et leurs références sont distincts.",
    questions: [question("Qui dirige les pèlerins dans ce récit ?", "Abû Bakr.", ["Héraclius.", "Waraqa."], "4655 précise cette responsabilité.", 2), question("Qui est envoyé pour proclamer Barâ’a ?", "‘Alî.", ["Abû Lahab.", "Ibn ad-Daghna."], "La mission d’‘Alî est mentionnée dans le témoignage.")],
  }) },
  { before: "derniers-instants", event: chapter({
    slug: "maladie-et-priere", titre: "La dernière maladie : la prière et le relais", periode: "Les derniers temps", date: "Pendant la dernière maladie",
    objectif: "Étudier la préoccupation pour la prière, la demande adressée à Abû Bakr et le témoignage de ‘Â’icha sur la maladie.",
    sections: [
      { titre: "Une question répétée", paragraphes: [
        "Al-Bukhârî 687 rapporte le récit de ‘Â’icha sur la maladie. Le Prophète ﷺ demande si les personnes ont prié, tente de se lever après s’être lavé, puis perd connaissance. Après plusieurs tentatives, il fait demander à Abû Bakr de diriger la prière.",
        "Le témoignage fait comprendre une difficulté physique réelle et une préoccupation persistante pour la communauté. La scène ne doit pas être racontée comme si la maladie n’avait aucune conséquence sur les mouvements et les responsabilités." ] },
      { titre: "Le relais et une présence aidée", paragraphes: [
        "Abû Bakr dirige les prières. Le récit rapporte ensuite une sortie du Prophète ﷺ avec l’aide de deux personnes, puis une prière où il est assis près d’Abû Bakr. Le témoignage contient également une précision d’Ibn ‘Abbâs sur l’un des accompagnants.",
        "Commentaire pédagogique : une responsabilité peut continuer avec des relais et une aide concrète. Le récit permet de réfléchir à l’accompagnement d’une personne malade sans exiger d’elle de faire comme si elle n’avait aucune limite." ] },
      { titre: "Lire sans reconstruire tous les derniers jours", paragraphes: [
        "Le dossier de la dernière maladie comporte plusieurs narrations. Cette fiche n’en fixe pas l’ordre heure par heure. Elle ne résout pas non plus toutes les questions juridiques sur la prière derrière une personne assise ; celles-ci demandent l’ensemble des textes pertinents.",
        "Pour apprendre, suivez la demande, la difficulté, le relais et la présence aidée. Vous obtenez une scène claire, dont les limites restent visibles. Le chapitre du décès prolonge ensuite la lecture sans prétendre que ces deux fiches épuisent toutes les dernières journées." ] },
    ], sources: [hadith("bukhari", "687")],
    vigilance: "La chronologie détaillée des derniers jours et les règles de la prière en position assise nécessitent des sources complémentaires. Le chapitre n’est pas un guide médical ou juridique.",
    retenir: ["La préoccupation pour la prière est rapportée.", "Abû Bakr reçoit la demande de diriger.", "L’aide physique et le relais sont visibles."],
    exercice: "Donnez un exemple de responsabilité et un exemple d’aide dans le récit.", correction: "Responsabilité : la demande concernant la prière et le relais confié à Abû Bakr. Aide : les personnes qui accompagnent la sortie du Prophète ﷺ.",
    questions: [question("Qui est demandé pour diriger la prière ?", "Abû Bakr.", ["Waraqa.", "Héraclius."], "La demande est rapportée dans 687.", 1), question("Le chapitre fixe-t-il chaque heure des derniers jours ?", "Non, il étudie un témoignage précis.", ["Oui, tout l’emploi du temps.", "Oui, sans autre source."], "Plusieurs récits sont nécessaires pour une chronologie détaillée.")],
  }) },
  { before: "maladie-et-priere", event: chapter({
    slug: "usama-et-commandement", titre: "Usâma : le commandement et la confiance", periode: "Un éclairage des derniers temps", date: "La mission confiée à Usâma",
    objectif: "Comprendre la défense d’Usâma ibn Zayd face aux critiques, sans attribuer au récit tous les détails de l’expédition.",
    sections: [
      { titre: "Une nomination contestée", paragraphes: [
        "Al-Bukhârî 4469 rapporte que le Prophète ﷺ confie le commandement d’une troupe à Usâma ibn Zayd. Des personnes critiquent cette nomination. Il leur répond en rappelant des critiques antérieures contre Zayd, le père d’Usâma, et son aptitude au commandement.",
        "Le récit rapporte également l’affection du Prophète ﷺ pour Zayd et Usâma. Il permet d’étudier une nomination et sa défense, sans transformer l’affection en un détail sans rapport avec la scène." ] },
      { titre: "Évaluer sans préjugé", paragraphes: [
        "Commentaire pédagogique : la contestation d’une personne peut reproduire des jugements déjà portés sur sa famille. Pour comprendre un choix, il faut observer les raisons explicitement données et ne pas remplacer le témoignage par des suppositions sur les intentions de tous les critiques.",
        "La leçon invite à distinguer aptitude, confiance et préjugé. Elle ne propose pas une règle selon laquelle toute nomination devrait être acceptée sans examen. Le récit est celui d’une décision du Prophète ﷺ et de sa réponse précise." ] },
      { titre: "Suivre une trajectoire familiale", paragraphes: [
        "Le chapitre de Mu’ta a évoqué Zayd ; celui-ci présente son fils Usâma dans une autre responsabilité. Ces liens permettent d’approfondir la biographie sans réduire les compagnons à des apparitions isolées. Chaque scène garde cependant sa source et son objet.",
        "Pour travailler, écrivez le lien familial puis la différence entre les deux dossiers. Notez ensuite ce que vous ne pouvez pas déduire de 4469 : l’âge exact, tous les objectifs et le déroulement complet de l’expédition. Vous formez ainsi une lecture reliée, mais sans ajouts non vérifiés." ] },
    ], sources: [hadith("bukhari", "4469")],
    vigilance: "L’âge exact d’Usâma, les effectifs, le calendrier du départ et le déroulement sous Abû Bakr ne sont pas reconstitués à partir de cette référence. Le placement est un éclairage des derniers temps, pas une datation au jour près.",
    retenir: ["Usâma reçoit un commandement.", "Le Prophète ﷺ répond aux critiques.", "Le lien avec Zayd permet une lecture suivie des personnes."],
    exercice: "Distinguez ce que 4469 affirme et ce qu’il faudrait encore rechercher pour raconter l’expédition entière.", correction: "Il affirme la nomination, les critiques et la réponse. Le calendrier, les objectifs détaillés, les effectifs et la suite demandent d’autres sources.",
    questions: [question("Quel est le père d’Usâma dans le récit ?", "Zayd.", ["Waraqa.", "Abû Lahab."], "4469 relie les critiques d’Usâma à celles de son père.", 2), question("La nomination suffit-elle à raconter toute l’expédition ?", "Non, le déroulement demande d’autres témoignages.", ["Oui, tous les détails en découlent.", "Oui, y compris l’âge exact."], "Une scène de nomination ne documente pas tout le dossier.")],
  }) },
];
