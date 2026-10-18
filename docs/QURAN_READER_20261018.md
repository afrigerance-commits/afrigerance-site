# Lecteur Coran — lot préparé le 18 octobre 2026

## Comportement

- Dans Coran, accès « 604 pages », ouverture directe d’une page, page précédente/suivante et sélecteur 1–604. Accès aussi depuis la sourate.
- Limites des pages du mushaf de Médine importées de Tanzil ; disposition responsive, pas de fac-similé des lignes imprimées.
- Tafsir et notes masqués par défaut. Deux boutons indépendants les affichent à la demande, dans les trois langues d’affichage. Masquer l’éditeur ne supprime pas les notes enregistrées. Les panneaux restent ouvrables par verset pour éviter les chargements massifs de commentaires.
- Lecture en un bloc : affiche toute la sourate sans chargement par lots ; texte arabe continu avec numéros et signes de pause originaux, traduction française continue, ou présentation bilingue. Le clic sur un verset conserve son départ audio. Avec commentaires/notes affichés, les blocs explicatifs restent séparés du texte coranique.
- Les trois préférences d’affichage sont mémorisées sur cet appareil et partagées entre les contrôles des sourates d’une portion.
- Jauge horizontale fixe au défilement et fine bande latérale : progression de la sourate, du Juz, du Hizb ou de la page ouverte, basée sur le verset visible. Le suivi passe les changements de sourate et les affichages partiels. Ce repère n’atteste pas d’une lecture effectivement accomplie.
- Les options des sourates suivantes sont repliées pour alléger les portions.

## Vérification

- npm test : 177 tests réussis, 46 fichiers.
- npm run build : succès, 972 pages générées ; contrôle TypeScript intégré réussi.
- git diff --check : succès.
- Tests : couverture contiguë des 6 236 versets par 604 pages ; pages 1/2/22/604 ; navigation aux limites ; préférences et mode français ; signes de pause ; affichage intégral en un bloc ; jauges Juz/Hizb/sourate/page et changement de sourate.
- Aucun essai visuel sur téléphone ni navigateur effectué dans cet environnement. Les classes responsive existantes ont été conservées.

## Livraison

Base : android/background-audio-20261011, commit 4bfc99f628c461e68699b135596d3a43b8e601af (lot audio également en attente).
Branche de préparation : feature/quran-page-reader-20261018. Aucun code natif modifié, aucune nouvelle APK nécessaire pour ces seuls réglages web. L’écoute native en arrière-plan nécessite l’APK 1.3 déjà préparée.

Aucun déploiement Netlify autorisé ni lancé. La branche de production n’est pas modifiée. La publication ultérieure doit être déclenchée uniquement après signal explicite de l’utilisateur.


## Autorisation de publication

Signal « Publie » reçu le 18 octobre 2026 à 22:57 UTC. Le lot ci-dessus et le
lot audio natif de sa base sont autorisés à être publiés ensemble en un seul
déploiement Netlify. Les vérifications listées ci-dessus sont réussies.
L’écoute native en arrière-plan requiert l’installation de l’APK 1.3 ; le
navigateur et les anciennes APK conservent le lecteur web. Essais physiques
Android et rendu visuel sur téléphone restant à effectuer.


## Publication vérifiée

Publié sur https://miraath.netlify.app avec le commit de production
213b2cee89be0c77e83fc2dc94a2121e8eb2a228. Les pages /coran,
/coran/lecture/page/1, /coran/lecture/page/604, /coran/lecture/juz/2,
/coran/lecture/hizb/2 et /coran/2 répondent en HTTP 200 et présentent
les nouvelles options ; les cinq lecteurs présentent la jauge correspondant
à leur portion. Contrôle du HTML et des routes, sans essai visuel ou physique.
Un seul changement de référence de production et déploiement Netlify demandé.
Le workflow Android a démarré automatiquement ; l’APK 1.3 du même code natif
avait déjà passé ses cinq tests instrumentés. Cette publication n’est pas
un nouvel essai sur téléphone.
