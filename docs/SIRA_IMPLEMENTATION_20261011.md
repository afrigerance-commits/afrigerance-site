# MIRÂTH — Extension originale du parcours Sîra

État : préparé localement, non publié. Aucun push vers la branche Netlify, aucun déploiement, aucune compilation APK.

## Contenu livré

- 42 chapitres, 126 sections et 11 409 mots dans les leçons (hors exercices, objectifs et notes).
- 84 questions à choix multiple, réponses et explications ; 42 exercices de lecture avec correction consultable.
- 71 références distinctes : 51 hadiths dans les Sahîh d’al-Bukhârî ou Muslim et 20 passages coraniques.
- Origines, enfance, foyer avec Khadîja, révélation, appel, opposition, boycott, Abyssinie, Abû Tâlib, Tâ’if, Isrâ’/Mi‘râj, Al-‘Aqaba, Hégire, installation, fraternité, adhan, qibla, Badr, Uhud, Khandaq, Banû Qurayza, calomnie, Hudaybiyya, lettre à Héraclius, Khaybar, ‘umra, Mu’ta, conquête, Hunayn, Tabûk, délégations, hajj dirigé par Abû Bakr, famille, enseignement, pèlerinage d’adieu, An-Nasr, Usâma, maladie, décès et bilan.

La rédaction est originale et indépendante du livre *Le Nectar cacheté*. Aucun PDF Telegram ni traduction moderne intégrale n’est reproduit. Les synthèses sont des reformulations françaises, les analyses sont identifiées, les sources ont leurs adresses et références. Aucun texte arabe ou dialogue prophétique n’est fabriqué.

## Vérification documentaire

Consultation des narrations référencées sur Sunnah.com et des passages coraniques sur Quran.com. Les numérotations, les personnes et la portée des témoignages ont été comparées aux affirmations retenues. Certaines pages regroupent plusieurs numéros : 4043–4044, 2731–2732, 4452–4454 ; les fiches le signalent.

Plusieurs adresses numériques Quran.com ont échoué à la récupération. Les références 106, 26:214–215, 28:56 et 3:123–127 utilisent les adresses canoniques consultées. Le dossier Uhud retient 3:152–153, avec un lien ouvrant le premier verset, puis 3:159. Le texte n’affirme aucune date précise non établie.

Il s’agit d’une vérification documentaire de rédaction, pas d’une nouvelle expertise des chaînes ni d’une validation par un comité savant. La version couvre les grandes périodes, sans prétendre épuiser tous les événements ou les variantes de la littérature de Sîra. Chaque fiche comporte une note sur ses limites et les points à approfondir. Les faits non vérifiés ne sont pas racontés comme établis.

Les éclairages familiaux, l’enseignement et certains compléments sont thématiques : leur place dans la liste n’affirme pas une date précise. Le chapitre du boycott le précise également par rapport à l’exil en Abyssinie.

## Intégration

- Routes existantes `/sira` et `/sira/[slug]`, charte actuelle, accents dorés et composants actuels.
- Préservation des dix anciens slugs : les favoris et liens existants continuent à fonctionner.
- Sommaire à ancres, trois sections par chapitre, points à retenir, exercice avec correction dans un `details` natif, sources et quiz.
- Navigation précédent/suivant, numérotation dans le parcours, estimation de durée et reprise sur la première leçon non validée.
- Progression réutilisant le stockage personnel existant, avec clé `mirath:learning:v1:sira-prophetique`. Aucune nouvelle table ou permission. La synchronisation distante dépend toujours de la configuration antérieure du compte ; elle n’est pas annoncée comme activée.
- Recherche générale étendue aux paragraphes et références de la Sîra ; sitemap réutilisant le catalogue existant.
- Composant d’index recevant uniquement des métadonnées : le corpus complet ne lui est pas envoyé comme données client.
- Espacement mobile, éléments interactifs d’au moins 44 px, texte courant ample, colonnes de navigation empilées sur mobile. Aucune image de personnage ajoutée.

## Vérifications

- Tests complets : 152 tests passent dans 41 fichiers.
- Tests Sîra : liens historiques, chaîne de lecture, intégrité du contenu, références, quiz et reprise réelle après validation.
- TypeScript : réussi.
- ESLint sur les fichiers applicatifs modifiés : réussi.
- Build Next : 368 pages générées, dont les 42 chapitres Sîra.

Contrôle du HTML généré des 42 chapitres : un titre principal par page, ancres présentes, six options du quiz, liens vers des chapitres existants, index complet et présence au sitemap. Aucun test physique Android/iOS ni contrôle visuel navigateur n’est revendiqué ; la revue visuelle sur téléphone reste à faire.

## Export de relecture

`node scripts/export-sira-course.cjs` régénère `docs/SIRA_PARCOURS_20261011.md` à partir du catalogue utilisé par l’application. Il inclut toutes les leçons, corrections et références pour relecture avant publication.
