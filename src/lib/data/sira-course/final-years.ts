import { chapter, hadith, quran, question } from "./schema";

export const finalYears = [
  chapter({
    slug: "foyer-et-douceur", titre: "La vie au foyer : service, affection et douceur", periode: "Éclairages sur la vie quotidienne", date: "Des témoignages transversaux",
    objectif: "Étudier la conduite familiale à partir de gestes rapportés, sans réduire la biographie à l’action publique.",
    sections: [
      { titre: "Le service de la famille", paragraphes: [
        "Interrogée sur ce que faisait le Prophète ﷺ chez lui, ‘Â’icha répond dans al-Bukhârî 676 qu’il servait sa famille, puis sortait pour la prière lorsque son moment arrivait. Le témoignage présente le service domestique et la prière dans une même vie, sans les opposer.",
        "Ce repère mérite une place dans la Sîra. L’histoire d’une personne ne se comprend pas uniquement à partir de ses apparitions publiques. Les gestes au foyer peuvent éclairer une conduite avec autant de précision qu’un grand événement." ] },
      { titre: "L’affection envers Ibrâhîm", paragraphes: [
        "Muslim 2316 rapporte, par Anas, la tendresse du Prophète ﷺ envers sa famille et ses visites à son fils Ibrâhîm, alors allaité dans les environs de Médine. Il le prend et l’embrasse. Le récit mentionne également sa mort pendant cette période d’allaitement.",
        "Commentaire pédagogique : l’affection est ici visible dans un déplacement et un geste. On peut réfléchir à la présence auprès des enfants sans attribuer au texte une liste de conseils qu’il ne donne pas. La fidélité à un témoignage se mesure aussi dans ces scènes simples." ] },
      { titre: "La douceur et la retenue", paragraphes: [
        "‘Â’icha rapporte dans Muslim 2328a que le Prophète ﷺ ne frappait ni une femme ni un serviteur. Le récit distingue ce comportement de la situation de combat et évoque sa retenue concernant la vengeance personnelle. Il faut conserver cette portée au lieu d’employer une formule absolue qui effacerait la distinction du texte.",
        "Pour travailler, réunissez trois verbes : servir, visiter, s’abstenir de frapper. Associez chacun à sa référence, puis écrivez une réflexion personnelle sur votre conduite. Ce chapitre invite à une lecture concrète de l’exemple prophétique ; il n’est pas un traité complet de tous les droits familiaux." ] },
    ],
    sources: [hadith("bukhari", "676"), hadith("muslim", "2316"), hadith("muslim", "2328a")],
    vigilance: "Les témoignages sont thématiques et ne sont pas datés au jour près. Le chapitre ne remplace pas l’étude juridique des droits du foyer.",
    retenir: ["Le service familial est attesté.", "L’affection est rapportée dans des gestes.", "La retenue envers les femmes et les serviteurs est explicitement décrite."],
    exercice: "Associez chaque référence à son thème : 676, 2316, 2328a.",
    correction: "676 : service familial et prière. 2316 : affection et visites à Ibrâhîm. 2328a : absence de coups envers femme ou serviteur et retenue concernant la vengeance personnelle.",
    questions: [question("Que décrit al-Bukhârî 676 ?", "Le service de la famille et la sortie pour la prière.", ["Le traité d’Al-Hudaybiyya.", "Le voyage nocturne."], "‘Â’icha répond à une question sur la conduite au foyer.", 1), question("Quel enfant est évoqué dans Muslim 2316 ?", "Ibrâhîm.", ["Waraqa.", "Ibn ad-Daghna."], "Anas décrit les visites et l’affection envers Ibrâhîm.")],
  }),
  chapter({
    slug: "enseigner-et-faciliter", titre: "Enseigner : questions, clarté et facilité", periode: "Éclairages sur la transmission", date: "Des témoignages transversaux",
    objectif: "Comprendre l’enseignement par les questions et le choix de la facilité lorsqu’elle n’implique pas un péché.",
    sections: [
      { titre: "L’enseignement par l’échange", paragraphes: [
        "Al-Bukhârî 50 rapporte une rencontre où Jibrîl interroge le Prophète ﷺ sur la foi, l’islam et l’ihsân, puis sur l’Heure. Les réponses distinguent ces notions. Le récit se termine par l’explication que Jibrîl était venu enseigner la religion aux personnes présentes.",
        "Le témoignage montre qu’une question peut participer à l’enseignement. Elle ne signifie pas toujours que celui qui la pose ignore tout ; dans ce récit, elle rend un contenu accessible aux auditeurs. La fiche résume cette fonction sans reproduire intégralement toutes les réponses." ] },
      { titre: "Une facilité avec une limite", paragraphes: [
        "Dans al-Bukhârî 3560, ‘Â’icha rapporte que, lorsqu’un choix entre deux choses lui était offert, le Prophète ﷺ prenait la plus facile tant qu’elle n’était pas un péché. Le récit précise également sa retenue concernant la vengeance pour lui-même.",
        "Commentaire pédagogique : garder la limite est essentiel. Retenir seulement le mot « facile » ferait perdre le sens de la condition. La pédagogie peut rechercher une forme claire et accessible sans vider le contenu de ses exigences. Pour MIRÂTH, cela invite à simplifier l’interface et l’explication, pas à modifier les références pour les rendre plus agréables." ] },
      { titre: "Mettre en pratique une méthode de lecture", paragraphes: [
        "Un bon exercice commence par une question précise. Au lieu de demander « raconte tout », on peut demander « que distingue ce témoignage ? » puis ouvrir la source. Cette méthode n’interdit pas les grandes synthèses ; elle les construit à partir d’éléments compris et vérifiés.",
        "Pour approfondir, choisissez un chapitre précédent et formulez une question qui peut recevoir une réponse à partir de ses références. Donnez ensuite une explication avec une limite clairement exprimée. Vous travaillez ainsi la clarté de la transmission autant que la mémorisation." ] },
    ],
    sources: [hadith("bukhari", "50"), hadith("bukhari", "3560")],
    vigilance: "Les notions de foi, islam et ihsân sont présentées comme repères ; leur étude doctrinale approfondie exige d’autres leçons. La facilité ne supprime pas la limite du péché explicitement rapportée.",
    retenir: ["Les questions peuvent enseigner aux auditeurs.", "Foi, islam et ihsân sont distingués.", "Le choix de la facilité comporte une condition."],
    exercice: "Réécrivez « toujours choisir le plus facile » pour respecter 3560.",
    correction: "Le récit décrit le choix de la chose la plus facile lorsqu’elle n’est pas un péché. La condition doit être conservée.",
    questions: [question("Quel est le rôle expliqué pour la venue de Jibrîl dans 50 ?", "Enseigner la religion.", ["Fixer une date de naissance.", "Donner un itinéraire commercial."], "Le récit explique la fonction de cette rencontre.", 2), question("Quelle limite accompagne la facilité dans 3560 ?", "Ne pas choisir un péché.", ["Aucune limite.", "Toujours éviter l’effort."], "La condition est une partie essentielle du témoignage.")],
  }),
  chapter({
    slug: "pelerinage-adieu", titre: "Le pèlerinage d’adieu : rites et responsabilités", periode: "Les derniers temps", date: "À la fin de la mission",
    objectif: "Suivre les grands repères du pèlerinage transmis par Jâbir et les responsabilités rappelées dans les témoignages du sermon.",
    sections: [
      { titre: "Le témoignage de Jâbir", paragraphes: [
        "Muslim 1218a transmet un long récit de Jâbir ibn ‘Abd Allah sur le pèlerinage du Prophète ﷺ. Il décrit des déplacements, le tawâf, le parcours entre As-Safâ et Al-Marwa et les étapes du hajj. Le chapitre en propose une orientation de lecture ; il ne remplace pas le texte ni un guide juridique.",
        "Le récit évoque notamment ‘Arafât, la parole adressée aux personnes présentes, puis les étapes suivantes. Il rassemble des rites et des rappels de responsabilité. Une lecture de la Sîra doit conserver les deux dimensions : ce qui est accompli et ce qui est enseigné." ] },
      { titre: "Les droits rappelés", paragraphes: [
        "Dans le témoignage de Jâbir, le discours rappelle la protection du sang et des biens, l’abandon de revendications anciennes de vengeance et de l’usure, ainsi que des responsabilités envers les femmes. Il appelle à s’attacher au Livre d’Allah. Ces éléments sont ici reformulés, pas présentés comme une citation intégrale.",
        "Al-Bukhârî 4406 rapporte une autre adresse pendant le pèlerinage, avec le rappel de l’inviolabilité, l’avertissement contre la violence entre musulmans et la responsabilité de transmettre aux absents. Le lecteur doit garder les références distinctes plutôt que fabriquer un seul sermon en assemblant tous les passages." ] },
      { titre: "Une transmission après la rencontre", paragraphes: [
        "Commentaire pédagogique : le pèlerinage est aussi un moment où un message est destiné à circuler au-delà des présents. La responsabilité de transmission relie cette étape au premier chapitre du parcours. Apprendre et transmettre demandent de conserver le sens et l’identité des sources.",
        "Pour travailler, séparez les rites, les droits et la transmission. Dans chaque colonne, indiquez un repère et sa référence. Vous pourrez ensuite approfondir chaque thème sans confondre une leçon biographique, une étude du sermon et un enseignement juridique du hajj." ] },
    ],
    sources: [hadith("muslim", "1218a"), hadith("bukhari", "4406")],
    vigilance: "Aucun « sermon intégral » composite n’est fabriqué. Les règles pratiques du hajj et les questions de droit familial nécessitent un enseignement spécialisé avec l’ensemble des textes pertinents.",
    retenir: ["Jâbir transmet un récit détaillé.", "Rites et responsabilités sont réunis.", "Les différents discours ne doivent pas être fusionnés sans indication."],
    exercice: "Pourquoi un texte assemblé à partir de plusieurs récits ne doit-il pas être intitulé « citation intégrale » ?",
    correction: "Parce qu’il n’est pas le texte d’un témoignage unique. Il faut identifier les extraits et leurs références ou annoncer une synthèse originale.",
    questions: [question("Qui transmet le récit de Muslim 1218a ?", "Jâbir ibn ‘Abd Allah.", ["Waraqa.", "Ibn ad-Daghna."], "Le long récit du pèlerinage est celui de Jâbir.", 1), question("La fiche constitue-t-elle un guide complet du hajj ?", "Non, elle donne des repères biographiques et de lecture.", ["Oui, toutes les règles.", "Oui, sans autre étude."], "Les règles juridiques doivent être étudiées dans leur cadre.")],
  }),
  chapter({
    slug: "fin-mission-et-an-nasr", titre: "An-Nasr : victoire, louange et demande de pardon", periode: "Les derniers temps", date: "Un éclairage sur la fin de la mission",
    objectif: "Lire la sourate An-Nasr avec l’interprétation rapportée d’Ibn ‘Abbâs, sans présenter son explication comme le texte même du Coran.",
    sections: [
      { titre: "Le mouvement de la sourate", paragraphes: [
        "La sourate 110 évoque le secours d’Allah, la victoire et l’entrée des personnes dans la religion, puis appelle à la louange et à la demande de pardon. Le passage ne se termine pas par une célébration de l’autosuffisance : il oriente vers Allah.",
        "Cette progression mérite d’être lue dans son ensemble. Un commentaire pédagogique peut observer qu’une étape de réussite est suivie d’un rappel de reconnaissance et de repentir. Il doit toutefois garder cette observation distincte de la traduction du passage." ] },
      { titre: "L’interprétation d’Ibn ‘Abbâs", paragraphes: [
        "Al-Bukhârî 4970 rapporte une discussion dans laquelle ‘Umar interroge des compagnons sur la sourate. Ibn ‘Abbâs y voit également une indication de la fin prochaine de la vie du Prophète ﷺ. ‘Umar exprime son accord avec cette compréhension.",
        "Il faut identifier cette explication comme une interprétation rapportée d’Ibn ‘Abbâs. Elle ne devient pas un verset supplémentaire. Le dossier apprend ainsi à distinguer le texte coranique et une compréhension transmise dans un hadith authentique." ] },
      { titre: "Le savoir et l’écoute", paragraphes: [
        "Le récit fait aussi apparaître une discussion où la compréhension d’un jeune compagnon est sollicitée. Pour la réflexion pédagogique, cela permet de penser la place du savoir et la capacité d’écouter au-delà de l’âge. Cette lecture doit rester mesurée : elle ne dévalorise pas les autres personnes présentes.",
        "Pour travailler, reformulez séparément le contenu de la sourate et l’explication d’Ibn ‘Abbâs. Vous verrez que les deux phrases ne jouent pas le même rôle. La première décrit un texte ; la seconde rapporte une interprétation documentée." ] },
    ],
    sources: [quran(110, "1-3"), hadith("bukhari", "4970")],
    vigilance: "Ce chapitre apporte un éclairage, pas une date de révélation au jour près. Il ne prétend pas épuiser le commentaire de la sourate.",
    retenir: ["La sourate appelle à la louange et au pardon.", "Ibn ‘Abbâs y lit aussi l’annonce de la fin.", "Texte et interprétation doivent être distingués."],
    exercice: "Écrivez une phrase sur la sourate et une phrase sur l’interprétation d’Ibn ‘Abbâs.",
    correction: "La sourate appelle à louer Allah et demander pardon après l’évocation du secours. Ibn ‘Abbâs comprend également une indication de la fin prochaine du Prophète ﷺ, selon 4970.",
    questions: [question("Qui propose l’interprétation sur la fin prochaine ?", "Ibn ‘Abbâs.", ["Abû Lahab.", "Héraclius."], "Son explication est rapportée dans 4970.", 2), question("Cette interprétation devient-elle un verset supplémentaire ?", "Non, elle reste une interprétation référencée.", ["Oui, dans la synthèse.", "Oui, si elle est authentique."], "La nature des textes doit rester distincte.")],
  }),
  chapter({
    slug: "derniers-instants", titre: "La dernière maladie, le décès et le deuil", periode: "La fin de la vie", date: "Fin de la vie du Prophète ﷺ",
    objectif: "Approcher la dernière maladie et les premières réactions au décès à travers les témoignages d’Anas, de ‘Â’icha et d’Ibn ‘Abbâs.",
    sections: [
      { titre: "La peine de Fâtima", paragraphes: [
        "Al-Bukhârî 4462 rapporte l’émotion de Fâtima devant la souffrance de son père, puis après son décès et son inhumation. Le témoignage d’Anas donne accès à une peine familiale précise. Il permet d’aborder ce moment sans inventer de dernières paroles ou de scènes supplémentaires.",
        "Le deuil ne doit pas être raconté comme une absence de foi. Le récit montre une douleur humaine. Il ne suffit cependant pas à autoriser toutes les pratiques associées au deuil ; cette question exige les textes qui en traitent directement." ] },
      { titre: "L’arrivée et la parole d’Abû Bakr", paragraphes: [
        "Al-Bukhârî 4452–4454 rapporte l’arrivée d’Abû Bakr, son entrée auprès du Prophète ﷺ décédé, ses larmes et son baiser. Il s’adresse ensuite aux personnes et rappelle qu’Allah est vivant et ne meurt pas. Il récite le verset 3:144 concernant le Messager et les messagers qui l’ont précédé.",
        "Le récit rapporte l’effet de cette récitation sur les personnes présentes et la réaction de ‘Umar. L’annonce ne supprime pas la peine ; elle donne un repère pour reconnaître la réalité et maintenir l’orientation vers Allah." ] },
      { titre: "Raconter avec respect", paragraphes: [
        "Commentaire pédagogique : ce chapitre demande une sobriété particulière. La douleur ne devient pas plus vraie quand on ajoute des dialogues imaginés. Les témoignages retenus suffisent pour comprendre des liens, une séparation et un rappel décisif.",
        "Pour apprendre, comparez les deux scènes : la peine familiale de Fâtima et la parole publique d’Abû Bakr. Elles ne s’opposent pas. L’une exprime une relation et une perte ; l’autre rappelle une vérité qui aide la communauté à traverser ce moment. La biographie s’achève, tandis que la responsabilité de transmission continue." ] },
    ],
    sources: [hadith("bukhari", "4462"), hadith("bukhari", "4452"), quran(3, "144")],
    vigilance: "La référence 4452 regroupe 4452–4454. La fiche ne fixe pas une date précise de décès, ne reconstitue pas toutes les dernières paroles et ne tranche pas tous les détails de l’inhumation.",
    retenir: ["La peine de Fâtima est rapportée.", "Abû Bakr rappelle la permanence d’Allah.", "La récitation de 3:144 est au centre de son adresse."],
    exercice: "Pourquoi faut-il conserver les dimensions familiale et publique dans ce chapitre ?",
    correction: "Elles montrent des réactions complémentaires : la peine devant la perte et le rappel d’une vérité pour la communauté. L’une n’annule pas l’autre.",
    questions: [question("Quel verset Abû Bakr récite-t-il ?", "3:144.", ["17:1.", "106:1."], "Le verset concernant le Messager est rapporté dans 4452–4454.", 1), question("Peut-on inventer des dernières paroles pour rendre le récit plus touchant ?", "Non, il faut respecter les témoignages.", ["Oui, avec une formule pieuse.", "Oui, dans un cours original."], "Une rédaction originale ne permet pas d’inventer des faits attribués au Prophète ﷺ.")],
  }),
  chapter({
    slug: "heritage-et-bilan", titre: "L’héritage : comprendre, vérifier et transmettre", periode: "Bilan du parcours", date: "Après l’étude de la biographie",
    objectif: "Relier les grandes périodes de la Sîra, évaluer sa compréhension et préparer une transmission fidèle avec des pistes d’approfondissement identifiées.",
    sections: [
      { titre: "Relier une trajectoire", paragraphes: [
        "Le parcours a suivi les origines, le commencement de la révélation, l’appel et les épreuves à La Mecque, les migrations, la formation de la communauté médinoise et les derniers temps. Des éclairages sur la famille et l’enseignement ont complété la chronologie. Ces éléments doivent maintenant être reliés, plutôt que mémorisés comme des fiches isolées.",
        "Pour votre synthèse, expliquez ce qui change entre les périodes : le lieu, les interlocuteurs, les responsabilités et les situations. Conservez aussi ce qui traverse les chapitres : la révélation, l’adoration, la responsabilité envers les personnes et la transmission. Ce bilan est un travail pédagogique, pas une citation des sources." ] },
      { titre: "Mesurer ce que l’on sait", paragraphes: [
        "Une compréhension solide permet de donner une référence et d’en décrire la portée. Elle permet également de dire « je n’ai pas encore étudié ce détail ». L’objectif n’est pas de réciter une histoire sans lacunes apparentes, mais de savoir où la source est précise et où une recherche reste nécessaire.",
        "Revenez à la responsabilité de transmettre évoquée dans al-Bukhârî 67. Pour expliquer un chapitre, choisissez un fait, une source et une réflexion clairement identifiée. Si vous ne pouvez pas les distinguer, relisez avant de partager. Cette méthode protège le sens et rend l’apprentissage plus durable." ] },
      { titre: "Un approfondissement qui reste ouvert", paragraphes: [
        "La liste des sujets à développer comprend notamment les récits détaillés de l’enfance, le boycott, les premières migrations, les accords médinois, les expéditions non traitées, les correspondances supplémentaires, les portraits familiaux et les détails de la dernière maladie. Ces sujets ne sont pas absents de l’histoire ; ils restent des dossiers à documenter avant d’être ajoutés avec précision.",
        "Le dernier exercice consiste à rédiger une page de synthèse et cinq questions de recherche. Pour chaque question, indiquez le type de source nécessaire. Vous terminez ainsi le parcours avec une vue d’ensemble et une direction de travail, sans confondre l’achèvement des leçons avec la connaissance de toute la littérature de Sîra." ] },
    ],
    sources: [hadith("bukhari", "67")],
    vigilance: "Cette version couvre les grandes périodes, mais ne constitue ni une biographie exhaustive ni un travail validé par un comité savant. Les dossiers ouverts sont indiqués, sans contenu incertain présenté comme établi.",
    retenir: ["Relier les périodes plutôt qu’isoler les fiches.", "Savoir donner une source et sa portée.", "Identifier les questions encore ouvertes."],
    exercice: "Préparez une synthèse personnelle avec un fait vérifié, sa référence et une réflexion distincte pour trois périodes.",
    correction: "Exemple : Hirâ — al-Bukhârî 3 ; Hégire — 3905 et 9:40 ; décès — 4452 et 3:144. Les réflexions doivent être annoncées comme vos analyses, et non attribuées au Prophète ﷺ.",
    questions: [question("Quel est un bon signe de compréhension ?", "Savoir préciser ce qu’une source établit et ce qu’elle n’établit pas.", ["Ne jamais reconnaître une limite.", "Partager le plus long récit possible."], "La compréhension inclut la portée et les limites d’une référence.", 2), question("Le parcours épuise-t-il toute la littérature de Sîra ?", "Non, il couvre les grandes périodes et indique les dossiers ouverts.", ["Oui, aucun ajout n’est possible.", "Oui, tous les récits sont validés."], "Une vue d’ensemble ne doit pas être présentée comme une exhaustivité savante.")],
  }),
];
