export type InvocationItem = {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  context: string;
  repetition?: string;
  reference: string;
  authenticity: string;
  sourceUrl: string;
  note?: string;
};

export type DebtHadithItem = {
  id: string;
  title: string;
  arabic: string;
  translation: string;
  explanation: string;
  reference: string;
  authenticity: string;
  sourceUrl: string;
  note?: string;
};

export const invocationCollection = {
  slug: "dettes-difficultes-financieres",
  title: "Dettes et difficultés financières",
  description:
    "Une sélection documentée d’invocations et de hadiths authentiques sur la dette, la subsistance, l’effort, l’indulgence et le contentement.",
  itemCount: 20,
} as const;

export const debtInvocations: InvocationItem[] = [
  {
    id: "tirmidhi-3563",
    title: "Demander à Allah de suffire par le licite",
    arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    translation:
      "Ô Allah, suffis-moi par ce que Tu as rendu licite afin que je me passe de ce que Tu as interdit, et enrichis-moi par Ta grâce de sorte que je me passe de tout autre que Toi.",
    context:
      "‘Alî رضي الله عنه enseigna cette invocation à un homme qui n’arrivait plus à s’acquitter de son obligation financière, en disant que le Messager d’Allah ﷺ la lui avait enseignée.",
    reference: "Jâmi‘ at-Tirmidhî 3563",
    authenticity: "Hasan gharîb selon at-Tirmidhî",
    sourceUrl: "https://sunnah.com/tirmidhi:3563",
    note: "Aucun nombre fixe de répétitions n’est indiqué dans cette narration.",
  },
  {
    id: "bukhari-6369",
    title: "Chercher refuge contre le poids de la dette",
    arabic:
      "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْجُبْنِ وَالْبُخْلِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ",
    translation:
      "Ô Allah, je cherche refuge auprès de Toi contre le souci et la tristesse, l’incapacité et la paresse, la lâcheté et l’avarice, le poids accablant de la dette et la domination des hommes.",
    context: "Invocation que le Prophète ﷺ avait l’habitude de prononcer.",
    reference: "Sahîh al-Bukhârî 6369",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:6369",
    note: "Aucun nombre fixe de répétitions n’est indiqué dans ce hadith.",
  },
  {
    id: "muslim-2713a",
    title: "Invocation du coucher : dette et pauvreté",
    arabic:
      "اللَّهُمَّ رَبَّ السَّمَاوَاتِ وَرَبَّ الْأَرْضِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ، اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ",
    translation:
      "Ô Allah, Seigneur des cieux, de la terre et du Trône immense, notre Seigneur et Seigneur de toute chose, Toi qui fends la graine et le noyau, qui as révélé la Torah, l’Évangile et le Furqân, je cherche refuge auprès de Toi contre le mal de toute chose que Tu tiens sous Ton pouvoir. Ô Allah, Tu es le Premier, rien ne T’a précédé ; Tu es le Dernier, rien ne vient après Toi ; Tu es l’Apparent, rien n’est au-dessus de Toi ; Tu es le Caché, rien n’est en-deçà de Toi. Acquitte pour nous la dette et préserve-nous de la pauvreté.",
    context:
      "Invocation rapportée dans le contexte du coucher : Abû Sâlih recommandait de se coucher sur le côté droit puis de la réciter, d’après Abû Hurayra رضي الله عنه, du Prophète ﷺ.",
    reference: "Sahîh Muslim 2713a",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:2713a",
    note: "La formule « اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ » est la conclusion de l’invocation complète ci-dessus.",
  },
  {
    id: "muslim-2721a",
    title: "Guidance, piété, chasteté et suffisance",
    arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    translation:
      "Ô Allah, je Te demande la guidance, la piété, la chasteté et la suffisance.",
    context: "Invocation que le Messager d’Allah ﷺ avait l’habitude de faire.",
    reference: "Sahîh Muslim 2721a",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:2721a",
  },
  {
    id: "bukhari-832",
    title: "Chercher refuge contre le péché et la dette",
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَأْثَمِ وَالْمَغْرَمِ",
    translation: "Ô Allah, je cherche refuge auprès de Toi contre le péché et la dette.",
    context:
      "Cette formule fait partie d’une invocation que le Prophète ﷺ prononçait dans la prière avant le taslîm.",
    reference: "Sahîh al-Bukhârî 832",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:832",
    note:
      "Interrogé sur son insistance à chercher refuge contre la dette, le Prophète ﷺ expliqua que l’endetté peut être conduit à mentir lorsqu’il parle et à manquer à sa promesse.",
  },
  {
    id: "abudawud-5090",
    title: "Chercher refuge contre la mécréance et la pauvreté",
    arabic:
      "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، لَا إِلَهَ إِلَّا أَنْتَ",
    translation:
      "Ô Allah, je cherche refuge auprès de Toi contre la mécréance et la pauvreté. Ô Allah, je cherche refuge auprès de Toi contre le châtiment de la tombe. Nulle divinité n’est digne d’adoration en dehors de Toi.",
    context:
      "Dans le récit d’Abû Bakra رضي الله عنه, cette invocation est dite le matin et le soir, en suivant la pratique du Messager d’Allah ﷺ.",
    repetition: "Trois fois le matin et trois fois le soir, selon cette narration.",
    reference: "Sunan Abî Dâwûd 5090",
    authenticity: "Chaîne jugée hasan (hasan al-isnâd) par al-Albânî",
    sourceUrl: "https://sunnah.com/abudawud:5090",
  },
];

export const debtHadiths: DebtHadithItem[] = [
  {
    id: "bukhari-2387",
    title: "L’intention sincère de rembourser",
    arabic: "مَنْ أَخَذَ أَمْوَالَ النَّاسِ يُرِيدُ أَدَاءَهَا أَدَّى اللَّهُ عَنْهُ، وَمَنْ أَخَذَ يُرِيدُ إِتْلَافَهَا أَتْلَفَهُ اللَّهُ",
    translation:
      "Celui qui prend les biens des gens avec l’intention de les restituer, Allah l’aidera à s’en acquitter ; celui qui les prend avec l’intention de les faire perdre, Allah le fera périr.",
    explanation:
      "Le hadith place l’intention honnête de remboursement au cœur de la relation de dette. Il ne dispense pas d’agir concrètement pour rembourser.",
    reference: "Sahîh al-Bukhârî 2387",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:2387",
  },
  {
    id: "bukhari-2400",
    title: "Retarder alors qu’on peut payer est une injustice",
    arabic: "مَطْلُ الْغَنِيِّ ظُلْمٌ",
    translation: "Le retard du débiteur solvable dans le paiement est une injustice.",
    explanation:
      "Le texte vise celui qui a les moyens de payer mais diffère volontairement le règlement.",
    reference: "Sahîh al-Bukhârî 2400",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:2400",
  },
  {
    id: "bukhari-2393",
    title: "L’excellence dans le remboursement",
    arabic: "إِنَّ خِيَارَكُمْ أَحْسَنُكُمْ قَضَاءً",
    translation: "Les meilleurs d’entre vous sont ceux qui s’acquittent le mieux de leurs dettes.",
    explanation:
      "Le Prophète ﷺ fit rendre au créancier un animal meilleur que celui qui était dû lorsque l’équivalent exact n’était pas disponible.",
    reference: "Sahîh al-Bukhârî 2393",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:2393",
  },
  {
    id: "muslim-1886a",
    title: "La gravité persistante de la dette",
    arabic: "يُغْفَرُ لِلشَّهِيدِ كُلُّ ذَنْبٍ إِلَّا الدَّيْنَ",
    translation: "Tous les péchés du martyr sont pardonnés, sauf la dette.",
    explanation:
      "Ce hadith souligne le sérieux des droits financiers dus aux créanciers et l’importance de ne pas les négliger.",
    reference: "Sahîh Muslim 1886a",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:1886a",
  },
  {
    id: "muslim-1563a",
    title: "Accorder un délai à la personne en difficulté",
    arabic: "مَنْ سَرَّهُ أَنْ يُنْجِيَهُ اللَّهُ مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ فَلْيُنَفِّسْ عَنْ مُعْسِرٍ أَوْ يَضَعْ عَنْهُ",
    translation:
      "Que celui qui aimerait qu’Allah le délivre des difficultés du Jour de la Résurrection accorde un répit à la personne insolvable ou lui remette une partie de sa dette.",
    explanation:
      "L’indulgence envers un débiteur réellement en difficulté est présentée comme une œuvre de grande valeur.",
    reference: "Sahîh Muslim 1563a",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:1563a",
  },
  {
    id: "bukhari-2078",
    title: "L’indulgence du créancier",
    arabic: "تَجَاوَزُوا عَنْهُ، لَعَلَّ اللَّهَ أَنْ يَتَجَاوَزَ عَنَّا، فَتَجَاوَزَ اللَّهُ عَنْهُ",
    translation:
      "Un commerçant ordonnait à ses employés d’être indulgents envers le débiteur en difficulté, espérant qu’Allah lui pardonne ; Allah lui pardonna.",
    explanation:
      "Le récit met en valeur la clémence du créancier envers ceux qui traversent une réelle difficulté.",
    reference: "Sahîh al-Bukhârî 2078",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:2078",
  },
  {
    id: "muslim-2699a",
    title: "Faciliter la situation d’une personne en difficulté",
    arabic: "وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالْآخِرَةِ، وَاللَّهُ فِي عَوْنِ الْعَبْدِ مَا كَانَ الْعَبْدُ فِي عَوْنِ أَخِيهِ",
    translation:
      "Celui qui facilite la situation d’une personne en difficulté, Allah lui facilitera les choses ici-bas et dans l’au-delà. Allah aide Son serviteur tant que celui-ci aide son frère.",
    explanation:
      "Le passage associe l’aide concrète apportée aux autres à l’aide d’Allah, notamment envers la personne financièrement éprouvée.",
    reference: "Sahîh Muslim 2699a",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:2699a",
  },
  {
    id: "muslim-1044",
    title: "Les cas précis où demander une aide devient permis",
    arabic: "إِنَّ الْمَسْأَلَةَ لَا تَحِلُّ إِلَّا لِأَحَدِ ثَلَاثَةٍ، رَجُلٍ تَحَمَّلَ حَمَالَةً فَحَلَّتْ لَهُ الْمَسْأَلَةُ حَتَّى يُصِيبَهَا ثُمَّ يُمْسِكُ",
    translation:
      "La demande d’aide n’est permise que dans trois situations ; parmi elles, l’homme qui a assumé une lourde charge financière peut demander jusqu’à obtenir de quoi la régler, puis il cesse.",
    explanation:
      "Ce hadith décrit trois cas encadrés. Il ne constitue pas une permission générale de mendier pour toute dette ou toute dépense.",
    reference: "Sahîh Muslim 1044",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:1044",
    note: "Le contexte complet du hadith doit être conservé : dette/charge assumée, catastrophe ayant détruit les biens, ou pauvreté établie selon les critères cités.",
  },
  {
    id: "bukhari-1470",
    title: "Chercher sa subsistance par le travail",
    arabic: "لَأَنْ يَأْخُذَ أَحَدُكُمْ حَبْلَهُ فَيَحْتَطِبَ عَلَى ظَهْرِهِ خَيْرٌ لَهُ مِنْ أَنْ يَأْتِيَ رَجُلًا فَيَسْأَلَهُ",
    translation:
      "Il vaut mieux pour l’un de vous prendre sa corde, ramasser du bois, le porter sur son dos et le vendre que de demander aux gens.",
    explanation:
      "Le hadith valorise l’effort licite et la recherche d’un revenu par son propre travail plutôt que la dépendance à la demande.",
    reference: "Sahîh al-Bukhârî 1470",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:1470",
  },
  {
    id: "tirmidhi-2344",
    title: "La confiance en Allah n’exclut pas l’effort",
    arabic: "لَوْ أَنَّكُمْ كُنْتُمْ تَوَكَّلُونَ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرُزِقْتُمْ كَمَا تُرْزَقُ الطَّيْرُ، تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا",
    translation:
      "Si vous placiez réellement votre confiance en Allah comme il convient, Il vous accorderait votre subsistance comme Il l’accorde aux oiseaux : ils partent le matin le ventre vide et reviennent le soir rassasiés.",
    explanation:
      "L’image des oiseaux associe le tawakkul au mouvement et à la recherche des moyens : ils quittent leur nid le matin.",
    reference: "Jâmi‘ at-Tirmidhî 2344",
    authenticity: "Hasan sahîh selon at-Tirmidhî",
    sourceUrl: "https://sunnah.com/tirmidhi:2344",
  },
  {
    id: "bukhari-5986",
    title: "Préserver les liens de parenté",
    arabic: "مَنْ أَحَبَّ أَنْ يُبْسَطَ لَهُ فِي رِزْقِهِ وَيُنْسَأَ لَهُ فِي أَثَرِهِ فَلْيَصِلْ رَحِمَهُ",
    translation:
      "Celui qui aimerait que sa subsistance soit élargie et que sa trace soit prolongée qu’il maintienne ses liens de parenté.",
    explanation:
      "Le hadith relie explicitement le maintien des liens familiaux à une bénédiction dans la subsistance et la durée accordée.",
    reference: "Sahîh al-Bukhârî 5986",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:5986",
  },
  {
    id: "muslim-2588",
    title: "L’aumône ne diminue pas les biens",
    arabic: "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ",
    translation: "L’aumône ne diminue pas les biens.",
    explanation:
      "Ce début du hadith est suivi d’enseignements sur le pardon et l’humilité. Il invite à ne pas réduire la richesse à un calcul purement matériel.",
    reference: "Sahîh Muslim 2588",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:2588",
  },
  {
    id: "muslim-1054",
    title: "La suffisance et le contentement",
    arabic: "قَدْ أَفْلَحَ مَنْ أَسْلَمَ وَرُزِقَ كَفَافًا وَقَنَّعَهُ اللَّهُ بِمَا آتَاهُ",
    translation:
      "A réussi celui qui embrasse l’Islam, reçoit une subsistance suffisante et à qui Allah accorde le contentement de ce qu’Il lui a donné.",
    explanation:
      "Le hadith présente la suffisance et le contentement comme une forme de réussite, sans identifier la réussite à l’accumulation.",
    reference: "Sahîh Muslim 1054",
    authenticity: "Authentique — Sahîh Muslim",
    sourceUrl: "https://sunnah.com/muslim:1054",
  },
  {
    id: "bukhari-6446",
    title: "La véritable richesse est celle du cœur",
    arabic: "لَيْسَ الْغِنَى عَنْ كَثْرَةِ الْعَرَضِ، وَلَكِنَّ الْغِنَى غِنَى النَّفْسِ",
    translation:
      "La richesse ne consiste pas dans l’abondance des biens ; la véritable richesse est la richesse de l’âme.",
    explanation:
      "Le texte recentre la notion de richesse sur la suffisance intérieure plutôt que sur la seule quantité de possessions.",
    reference: "Sahîh al-Bukhârî 6446",
    authenticity: "Authentique — Sahîh al-Bukhârî",
    sourceUrl: "https://sunnah.com/bukhari:6446",
  },
];
