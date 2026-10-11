import { chapter, hadith, quran, question } from "./schema";

export const origins = [
  chapter({
    slug: "lire-la-sira", titre: "Entrer dans la Sîra : sources et méthode", periode: "Comprendre le parcours", date: "Introduction",
    objectif: "Apprendre à distinguer un événement attesté, une datation historique et une explication pédagogique avant de suivre la biographie.",
    sections: [
      { titre: "Une histoire à étudier, pas seulement à écouter", paragraphes: [
        "La Sîra est l’étude de la vie du Prophète Muhammad ﷺ. Elle relie des personnes, des lieux, des décisions et une révélation. Pour la comprendre, on ne peut ni réduire cette vie à une succession de batailles, ni transformer chaque épisode en une histoire merveilleuse. Il faut lire ce que les sources permettent effectivement de dire, puis réfléchir à sa signification.",
        "Ce parcours est une rédaction originale. Il ne reprend ni le texte ni le découpage du Nectar cacheté. Les références conduisent au Coran et aux recueils de hadiths ; le lecteur peut ainsi revenir aux témoignages utilisés. Les développements pédagogiques proposent des pistes de compréhension, sans être présentés comme des paroles prophétiques." ] },
      { titre: "Trois niveaux de lecture", paragraphes: [
        "Un passage du Coran peut évoquer un événement sans en donner la date, l’itinéraire ou le nom de tous les participants. Un hadith peut préciser un geste, un dialogue ou une situation sans constituer à lui seul une biographie complète. Enfin, une explication de l’auteur met ces éléments en relation. Garder ces trois niveaux distincts évite de donner à une déduction personnelle l’autorité d’un texte révélé.",
        "Dans al-Bukhârî 67, le Prophète ﷺ demande aux présents de transmettre aux absents et évoque la possibilité qu’un destinataire comprenne mieux le message. Cette responsabilité de transmission est un repère pour notre démarche : conserver le sens, identifier la source et ne pas embellir un récit au prix de son exactitude." ] },
      { titre: "Comment travailler chaque chapitre", paragraphes: [
        "Commencez par situer la période. Lisez ensuite la synthèse, ouvrez au moins une référence et relevez ce que cette référence affirme explicitement. Comparez votre note avec les points à retenir. Terminez par l’exercice et les questions : connaître une date ne suffit pas si l’on confond une citation et un commentaire.",
        "Les chapitres suivent les grandes périodes de la vie, puis proposent des éclairages transversaux. Les intitulés temporels servent de repères : ils ne prétendent pas dater chaque événement au jour près. Lorsqu’un détail n’est pas établi dans les sources retenues, il est signalé dans la note de vigilance plutôt que raconté comme un fait." ] },
    ],
    sources: [hadith("bukhari", "67")],
    vigilance: "Les synthèses françaises ne sont pas des traductions intégrales des hadiths. Cette première version ne réunit pas tous les événements ni toutes les variantes de la littérature de Sîra.",
    retenir: ["Identifier la source avant de transmettre.", "Séparer récit et commentaire.", "Une référence authentique ne valide pas les ajouts d’un récit populaire."],
    exercice: "Une fiche affirme une date précise mais renvoie à un verset qui ne donne aucune date. Comment l’améliorer ?",
    correction: "Conserver ce que le verset établit, retirer la date ou ajouter une source historique identifiable et préciser son degré de certitude.",
    questions: [question("Une synthèse originale est-elle un hadith ?", "Non, elle doit être distinguée du texte source.", ["Oui, si elle est émouvante.", "Oui, si elle contient une référence."], "La référence documente la synthèse ; elle ne transforme pas chaque phrase de l’auteur en parole prophétique."), question("Que faire devant un détail non vérifié ?", "Le signaler et ne pas le raconter comme certain.", ["Le compléter de mémoire.", "Le publier s’il est souvent partagé."], "La popularité d’un récit ne prouve pas son authenticité.", 1)],
  }),
  chapter({
    slug: "quraych-et-origines", titre: "La Mecque, Quraych et les origines", periode: "Avant la mission", date: "Le cadre de la naissance",
    objectif: "Situer le milieu mecquois et le lignage mentionné dans les sources, sans construire une généalogie non documentée.",
    sections: [
      { titre: "Le cadre évoqué par le Coran", paragraphes: [
        "La sourate Quraych rappelle les voyages d’hiver et d’été, puis appelle à adorer le Seigneur de la Maison, qui nourrit et donne la sécurité. Elle place ainsi côte à côte les déplacements, les besoins matériels et la reconnaissance envers Allah. Elle est une entrée utile dans le milieu mecquois ; elle ne constitue pas un inventaire de ses institutions.",
        "La Maison mentionnée est au centre de l’appel de la sourate. Pour notre lecture pédagogique, le passage invite à ne pas isoler les relations commerciales de la responsabilité spirituelle. La stabilité d’un groupe, ses ressources et sa sécurité ne sont pas présentées comme une raison de se croire autosuffisant." ] },
      { titre: "Un lignage précisément référencé", paragraphes: [
        "Dans Muslim 2276, Wâthila ibn al-Asqa‘ transmet une parole du Prophète ﷺ mentionnant les descendants d’Ismâ‘îl, Kinâna, Quraych et les Banû Hâchim. Ce témoignage permet de situer son appartenance familiale sans ajouter ici une longue liste d’ancêtres dont chaque maillon demanderait une étude distincte.",
        "L’apprentissage consiste à savoir quel document répond à quelle question. La sourate 106 éclaire un cadre religieux et des bienfaits rappelés à Quraych. Le hadith de Muslim donne un repère de lignage. Ces deux sources se complètent, mais elles n’affirment pas toutes les données que l’on peut rencontrer dans une biographie moderne." ] },
      { titre: "Comprendre sans idéaliser un milieu", paragraphes: [
        "Un contexte historique aide à comprendre les interlocuteurs d’un appel. Il ne faut cependant pas faire de chaque membre d’un groupe une personne identique aux autres. Dans la suite du parcours, certains proches soutiennent, d’autres s’opposent et d’autres changent de position. Le lecteur gagne à suivre les personnes et les témoignages plutôt qu’à raisonner par portraits collectifs figés.",
        "Pour préparer la chronologie, notez trois mots : La Mecque, Quraych, Banû Hâchim. À côté de chacun, inscrivez ce que la source retenue permet d’expliquer. L’objectif n’est pas de mémoriser des détails décoratifs, mais de disposer d’un cadre fiable pour comprendre les chapitres suivants." ] },
    ],
    sources: [quran(106, "1-4"), hadith("muslim", "2276")],
    vigilance: "Les destinations exactes de chaque voyage et la généalogie complète ne sont pas établies par ces deux seules références.",
    retenir: ["Le Coran relie bienfaits et adoration.", "Muslim 2276 situe le lignage.", "Un contexte ne remplace pas les témoignages individuels."],
    exercice: "Expliquez en deux phrases la différence entre la fonction de la sourate 106 et celle de Muslim 2276.",
    correction: "La sourate rappelle des bienfaits et appelle Quraych à l’adoration. Le hadith situe le lignage du Prophète ﷺ ; il ne décrit pas les activités économiques de La Mecque.",
    questions: [question("Quelle référence situe les Banû Hâchim dans le lignage ?", "Muslim 2276.", ["Al-Bukhârî 67.", "La sourate 93 seule."], "Muslim 2276 mentionne Kinâna, Quraych et les Banû Hâchim.", 2), question("La sourate 106 fournit-elle une histoire complète de La Mecque ?", "Non, elle rappelle certains bienfaits et appelle à l’adoration.", ["Oui, toutes ses institutions.", "Oui, tous ses habitants."], "La portée du passage doit être respectée.")],
  }),
  chapter({
    slug: "naissance-prophete", titre: "La naissance et une enfance d’orphelin", periode: "Avant la mission", date: "Avant la révélation — jour de naissance : lundi",
    objectif: "Comprendre les repères attestés sur la naissance et l’enfance, ainsi que leur lien avec l’attention aux personnes vulnérables.",
    sections: [
      { titre: "Ce qui est explicitement attesté", paragraphes: [
        "Interrogé sur le jeûne du lundi, le Prophète ﷺ mentionne dans Muslim 1162b sa naissance ce jour-là et le commencement de la révélation ou de sa mission. Cette référence établit le jour de la semaine ; elle ne donne pas une date complète de calendrier ni une heure de naissance.",
        "La sourate Ad-Duhâ rappelle qu’il était orphelin et qu’Allah lui a donné un refuge. Elle évoque également la guidance et le besoin comblé. Le lecteur dispose ici d’un rappel coranique sûr, mais non d’une description de chaque année de l’enfance." ] },
      { titre: "Du bienfait reçu à la responsabilité", paragraphes: [
        "La fin de la sourate relie ces rappels à la conduite envers l’orphelin et celui qui demande, puis à l’évocation des bienfaits du Seigneur. Il est donc utile de lire les versets ensemble. Le passé n’est pas seulement raconté : il accompagne une orientation de comportement.",
        "Commentaire pédagogique : cette articulation permet de réfléchir à la manière dont une expérience de fragilité peut éveiller l’attention à autrui. Il ne s’agit pas d’attribuer au texte une théorie psychologique, mais d’observer son mouvement : rappeler les bienfaits puis rappeler les devoirs envers les personnes vulnérables." ] },
      { titre: "Étudier les récits de jeunesse avec soin", paragraphes: [
        "Les biographies peuvent raconter des scènes détaillées de l’enfance, avec des noms, des lieux et des signes extraordinaires. Chaque scène exige sa propre référence. Le respect envers le Prophète ﷺ ne dispense pas de vérifier une narration ; il invite au contraire à éviter de lui attribuer des faits dont on ne connaît pas l’origine.",
        "Pour travailler ce chapitre, écrivez d’abord les deux repères établis : le lundi et l’orphelinat rappelé par le Coran. Dans une deuxième colonne, placez les détails que vous souhaiteriez étudier plus tard. Vous obtenez une base sûre et une liste de recherche, au lieu d’un récit où certitudes et suppositions se mélangent." ] },
    ],
    sources: [hadith("muslim", "1162b"), quran(93, "6-11")],
    vigilance: "La date exacte de naissance, les détails des récits de nourrice et leur chronologie ne sont pas tranchés dans ce chapitre.",
    retenir: ["Muslim 1162b établit le lundi.", "Ad-Duhâ rappelle l’orphelinat et le refuge.", "Lire les bienfaits avec les responsabilités qui suivent."],
    exercice: "Une publication cite Muslim 1162b pour prouver une heure de naissance. La référence suffit-elle ?",
    correction: "Non. Elle mentionne le lundi, sans donner l’heure. Il faut retirer cette précision ou fournir une autre source vérifiée.",
    questions: [question("Que précise Muslim 1162b au sujet de la naissance ?", "Le jour de la semaine : lundi.", ["Une heure exacte.", "Tous les détails de l’enfance."], "La portée de la référence est limitée au repère qu’elle donne.", 1), question("Quelle conduite est liée aux rappels d’Ad-Duhâ ?", "Ne pas opprimer l’orphelin ni repousser celui qui demande.", ["Promettre la richesse à tous.", "Établir un calendrier de naissance."], "Le passage relie les bienfaits reçus à des responsabilités envers autrui.")],
  }),
  chapter({
    slug: "jeunesse-et-travail", titre: "La jeunesse : travail et participation à la vie mecquoise", periode: "Avant la mission", date: "Avant la révélation",
    objectif: "Découvrir deux repères de la vie avant la mission : le travail de berger et la participation à la reconstruction de la Ka‘ba.",
    sections: [
      { titre: "Le travail de berger", paragraphes: [
        "Dans al-Bukhârî 2262, le Prophète ﷺ indique avoir gardé les troupeaux des habitants de La Mecque en contrepartie d’une rémunération. Le récit inscrit sa vie avant la mission dans une activité concrète. Il ne donne ici ni son âge exact au début de ce travail ni un relevé de ses revenus.",
        "Commentaire pédagogique : on peut réfléchir à ce que demande le soin d’un troupeau — attention, régularité, responsabilité — sans affirmer que le hadith énumère lui-même ces qualités. Un enseignement tiré d’une situation doit rester identifiable comme une réflexion de l’auteur." ] },
      { titre: "La reconstruction de la Ka‘ba", paragraphes: [
        "Al-Bukhârî 3829 rapporte que le Prophète ﷺ et son oncle Al-‘Abbâs transportaient des pierres lors de la reconstruction de la Ka‘ba. Le récit évoque aussi un épisode concernant son vêtement et sa pudeur. Il atteste sa participation au chantier, sans raconter à lui seul tous les épisodes associés à cette reconstruction.",
        "Cette distinction est importante : une référence sur le transport des pierres ne suffit pas à documenter mot pour mot un arbitrage autour de la Pierre noire. Les récits de ce type ne sont pas rejetés globalement ; ils demandent simplement une source adaptée et un examen distinct." ] },
      { titre: "Une lecture concrète de la période", paragraphes: [
        "La période antérieure à la mission ne doit pas devenir un simple prologue rempli de signes annoncés rétrospectivement. Les témoignages présentés montrent un travail et une participation à un ouvrage collectif. Ils donnent de la consistance à la biographie tout en laissant visibles les limites du dossier.",
        "Pour retenir, associez à chaque scène un verbe et une référence : garder les troupeaux — 2262 ; transporter les pierres — 3829. Puis formulez un enseignement personnel précédé de l’expression « je peux réfléchir à ». Cette petite discipline aide à ne pas confondre la source avec sa propre interprétation." ] },
    ],
    sources: [hadith("bukhari", "2262"), hadith("bukhari", "3829")],
    vigilance: "Les voyages commerciaux détaillés, les récits de Bahîrâ et le récit complet de l’arbitrage de la Pierre noire nécessitent des dossiers spécifiques ; ils ne sont pas reconstitués ici.",
    retenir: ["Un travail de berger est attesté.", "La participation au chantier de la Ka‘ba est attestée.", "Une réflexion éducative ne devient pas une citation."],
    exercice: "Écrivez un fait attesté et une réflexion personnelle à partir du travail de berger.",
    correction: "Fait : le Prophète ﷺ a gardé les troupeaux des Mecquois. Réflexion : cette activité peut nous inviter à penser la responsabilité quotidienne. La deuxième phrase est un commentaire.",
    questions: [question("Que documente al-Bukhârî 2262 ?", "Le travail de berger.", ["Le traité d’Al-Hudaybiyya.", "Le pèlerinage d’adieu."], "Le hadith mentionne explicitement la garde des troupeaux.", 2), question("Le récit du transport des pierres prouve-t-il tous les récits du chantier ?", "Non, chaque récit demande sa référence.", ["Oui, par proximité du sujet.", "Oui, si son titre contient Ka‘ba."], "Une référence ne doit pas être étendue à des détails qu’elle ne rapporte pas.")],
  }),
  chapter({
    slug: "khadija-et-le-foyer", titre: "Khadîja : un foyer, un soutien et une fidélité durable", periode: "Avant la mission et début de la révélation", date: "Un éclairage familial",
    objectif: "Comprendre la place de Khadîja à travers son soutien au début de la révélation et le souvenir conservé par le Prophète ﷺ.",
    sections: [
      { titre: "Un soutien éclairé par la conduite", paragraphes: [
        "Dans le récit de la première révélation, Khadîja accueille le Prophète ﷺ bouleversé. Elle le rassure en évoquant sa conduite envers les proches, les personnes démunies et les visiteurs. Elle l’accompagne ensuite auprès de Waraqa. Son intervention ne se réduit donc pas à une parole de consolation : le récit présente également une démarche pour comprendre ce qui s’est passé.",
        "Commentaire pédagogique : ce soutien conjugue écoute, connaissance de la personne et recherche d’un interlocuteur. Pour le lecteur, cela offre une piste de réflexion sur l’accompagnement d’un proche éprouvé : ne pas minimiser son trouble, et chercher avec lui des repères fiables." ] },
      { titre: "La fidélité après la séparation", paragraphes: [
        "‘Â’icha rapporte dans al-Bukhârî 3818 que le Prophète ﷺ évoquait fréquemment Khadîja et envoyait des portions de viande à ses amies. Le récit mentionne aussi qu’il avait eu des enfants d’elle. Il montre que le souvenir se traduisait par des gestes envers des personnes liées à Khadîja.",
        "La Sîra ne concerne donc pas seulement l’action publique. Elle invite aussi à comprendre des liens, une gratitude et une continuité d’attention. Ici, les gestes rapportés sont plus précis et plus instructifs qu’un portrait sentimental dont les dialogues seraient inventés." ] },
      { titre: "Approfondir une biographie familiale", paragraphes: [
        "Étudier la famille demande de croiser des témoignages, pas de fabriquer une vie intérieure. On peut décrire un soutien ou un geste attesté ; on ne peut pas attribuer des pensées exactes aux personnes sans source. Cette retenue permet une lecture respectueuse et évite de transformer les proches en personnages d’un roman.",
        "Pour relier ce chapitre à la suite, notez deux dimensions : l’accueil au commencement de la mission et la fidélité dans la durée. Elles montrent pourquoi une histoire de la révélation gagne à inclure les relations humaines, tout en gardant l’origine divine de la révélation distincte de l’aide apportée par les proches." ] },
    ],
    sources: [hadith("bukhari", "3"), hadith("bukhari", "3818")],
    vigilance: "L’âge exact au mariage, tous les détails commerciaux et la date précise du décès de Khadîja ne sont pas établis par les références de ce chapitre.",
    retenir: ["Khadîja accompagne le début de la révélation.", "Le souvenir se prolonge en gestes envers ses amies.", "Ne pas inventer la vie intérieure des personnes."],
    exercice: "Distinguez ce qui relève d’un geste rapporté et ce qui relève d’une réflexion éducative dans ce chapitre.",
    correction: "Envoyer de la viande aux amies de Khadîja est rapporté dans 3818. L’idée d’en tirer une réflexion sur la gratitude est un commentaire pédagogique.",
    questions: [question("Quelle action est rapportée dans al-Bukhârî 3818 ?", "Des envois de viande aux amies de Khadîja.", ["Un itinéraire complet vers l’Abyssinie.", "Un discours politique de Khadîja."], "Le récit apporte un témoignage concret de fidélité.", 1), question("Peut-on présenter des pensées imaginées comme des faits de Sîra ?", "Non, il faut s’en tenir aux témoignages.", ["Oui, pour rendre le texte vivant.", "Oui, en ajoutant une référence générale."], "La narration doit rester distincte de l’imagination littéraire.")],
  }),
];
