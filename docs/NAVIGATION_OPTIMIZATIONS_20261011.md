# MIRÂTH — fluidité, lot préparé le 11 octobre 2026

Pas de publication ni de nouvelle APK. Préparation autorisée après l’audit du délai après clic ; futur déploiement sur signal utilisateur.

## Changements

- Chargement App Router avec squelette et statut accessible, sans attente minimale artificielle. Contour d’attente intégré aux quatre onglets mobiles via useLinkStatus ; la sélection de sourate affiche un statut pendant la transition.
- Sourates : premier rendu limité à 30 versets. Boutons vers les 30 suivants ou la sourate entière. Les textes de tous les versets restent dans les données transmises ; un lien vers un verset ou l’audio révèle les versets nécessaires. Juz/Hizb restent accessibles avec leurs marqueurs ; les portions Juz/Hizb ont conservé leur rendu existant.
- L’horloge audio est un store indépendant : timeupdate met à jour la progression de piste, sans diffuser une nouvelle valeur de contexte aux versets. Contrôle de seek, arrêt et séquence arabe/français conservés.
- Bande Juz : recherche binaire dans les positions ordonnées au lieu de mesurer tous les versets à chaque trame. Observer de mutation pour les versets nouvellement affichés ; reprise de lecture adaptée à l’ajout progressif.
- Enregistrement automatique hors connexion différé à l’inactivité (ou 2,5 secondes sans requestIdleCallback). Les assets Next immuables déjà présents sont réutilisés. Enregistrement explicite des livres inchangé.
- Le proxy ne consulte plus l’authentification pour une requête publique sans cookie de jeton Supabase. Les chemins privés et les sessions existantes conservent les contrôles d’accès et rafraîchissements.

## Mesure locale après compilation

Même chemin statique `.next/server/app/coran/2.html` : 1 582 116 octets avant → 482 629 après, soit environ 69,5 % d’HTML en moins. Compression gzip locale avec Python : 177 950 → 91 552 octets, environ 48,5 % de réduction. Ces tailles incluent la sérialisation des textes ; tous les textes restent disponibles après hydratation. Le rendu initial comporte 30 ancres de verset au lieu de 286.

Ce résultat est une réduction de charge mesurée, pas une promesse de délai de navigation ni une mesure de ressenti sur téléphone. Les données locales gzip ne sont pas comparables directement au transfert gzip Netlify précédemment observé.

## Validation

149 tests réussis (40 fichiers). Nouveaux contrôles : progression audio sans rendu de consommateur de verset, affichage progressif, saut au verset et audio au-delà du premier groupe, équivalence du repère binaire et moins de dix mesures pour 286 versets, réutilisation des assets, maintien des protections privées et rafraîchissement des sessions publiques connectées. TypeScript et compilation de production réussis (336 pages statiques), git diff --check réussi.

Pas de validation visuelle navigateur ni d’essai physique APK dans cette session. À vérifier sur appareil : clics rapides successifs, retour, lien profond vers un verset non affiché, signets, marqueurs Juz, défilement avec audio, chargement complet et mode hors connexion. La recherche native du navigateur ne parcourt que les versets affichés ; « Afficher toute la sourate » reste disponible. La recherche Coran du site conserve son corpus complet. L’affichage progressif nécessite JavaScript pour afficher les groupes supplémentaires.

## Livres

Voir `BOOK_RIGHTS_REVIEW_20261011.md` : trois éditions à redistribution gratuite conditionnelle vérifiée, aucune nouvelle intégration de PDF. Téléchargements directs refusés en HTTP 403 ; permissions vérifiées dans les sources primaires via consultation en ligne. Revue scientifique distincte de la permission de diffusion.
