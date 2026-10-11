# MIRÂTH — audit du délai après clic, 11 octobre 2026

Inspection du code et mesures HTTP du site publié. Aucun changement fonctionnel ni déploiement. Aucun navigateur contrôlé ni téléphone physique dans cette session : pas de mesure clic → peinture, INP, LCP ou navigation RSC. Les chiffres ci-dessous sont des téléchargements HTML depuis l’environnement de travail, pas le temps vécu par un utilisateur à Dakar.

## Échantillons HTTP

Deux requêtes par page, gzip demandé, trois téléchargements au maximum en parallèle.

| Page | Temps avant en-têtes (s) | HTML décompressé (Kio) | Transfert (Kio) |
|---|---:|---:|---:|
| Accueil | 7,277 / 5,807 | 147 | 40 |
| Coran | 6,946 / 5,642 | 193 | 30 |
| Al-Baqarah | 7,951 / 5,342 | 1541 | 296 |
| Mouwatta, livre 1 | 5,742 / 5,484 | 216 | 43 |
| Vidéos | 5,434 / 5,562 | 54 | 15 |
| Bibliothèque | 4,673 / 5,854 | 84 | 21 |

Contrôle fichiers statiques : offline.html (1 Kio) 4,467 / 5,377 s ; sw.js 4,443 / 5,416 s ; emblème 4,605 / 5,264 s. Cette latence commune interdit d’attribuer ces secondes à l’application. Les réponses HTML annoncent Netlify Durable bypass et Netlify Edge miss ; il faut examiner la configuration et les cookies avant de conclure sur le cache. Les fichiers statiques annoncent stored. Pas de test prolongé, distribution de percentiles ou comparaison géographique.

## Constats et priorités

1. Absence de fichier `loading.tsx` dans l’App Router ; les onglets mobiles reflètent la route courante seulement. Les clics sur les liens et la sélection de sourate peuvent donc manquer de retour pendant une attente réseau. Ajouter des états de navigation en cours et des squelettes locaux, sans durée minimale artificielle.
2. Al-Baqarah rend les 286 versets, leurs outils et enveloppes client sur une même page, environ 1,5 Mio d’HTML décompressé. Priorité : portions progressives conservant les ancres, recherche, reprise et continuité audio, ou réduction des contrôles montés hors écran. Ne pas dégrader le texte arabe ou supprimer les versets sans stratégie de navigation.
3. Le contexte audio regroupe elapsed, duration et le verset actif ; onTime change elapsed à chaque timeupdate. QuranVerseRow et les boutons de verset consomment ce contexte. Cela provoque des rendus de consommateurs même si leur verset ne change pas. Séparer l’horloge audio des données de surlignage. Risque identifié dans le code, coût sur appareil non mesuré.
4. La bande de position calcule getBoundingClientRect pour tous les versets à chaque trame de défilement (limitation requestAnimationFrame déjà présente). Avec 286 versets, coût proportionnel à la longueur. Envisager observer/repères ou recherche dans des positions recalculées au redimensionnement ; vérifier fiabilité avec polices et taille du texte.
5. Le proxy initialise la vérification Supabase pour les pages publiques et les requêtes du site, et HeaderAuth consulte aussi la session. Leur coût dépend de la présence de cookies et du comportement du SDK : pas de preuve d’un appel réseau effectif pour chaque visite anonyme. Réduire les vérifications inutiles sur chemins statiques/publics sans compromettre le rafraîchissement des sessions privées, puis analyser le cache des pages anonymes. Ne jamais mettre en cache une réponse personnelle.
6. OfflineSupport envoie SAVE_PAGE après chaque navigation ; savePage recharge le document public et les assets afin de garantir le mode hors connexion. Ces requêtes peuvent concurrencer les chargements sur réseau mobile. Différer à une période d’inactivité et réutiliser les assets immuables déjà en cache, avec invalidation cohérente.

## Points favorables

Navigation par Next Link, fichiers statiques précalculés pour le Coran, cache local des assets, audio persistant, préchargement audio et indicateurs audio déjà présents. Transition CSS de page : 220 ms, sans délai avant rendu ; le contenu reste visible. Ce n’est pas un écran bloquant. Animations désactivées si prefers-reduced-motion.

## Vérification à effectuer sur appareil

Chronométrer accueil → Coran, Coran → Al-Baqarah, sélection d’une autre sourate, Hadiths et Vidéos : première ouverture puis retour, Wi-Fi et réseau mobile, avec et sans audio. Mesurer réaction au clic, apparition du contenu et fluidité du défilement. Vérifier le lecteur verrouillé séparément ; ne pas confondre délai de démarrage d’une piste externe et navigation. Un audit HTTP ne certifie pas la fluidité de l’APK.
