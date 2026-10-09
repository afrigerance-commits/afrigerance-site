# MIRÂTH — changements préparés, non publiés

Date : 9 octobre 2026. Base : `d646cb14d8f2749c4e6ba201b37caf463c38df85`.

## Changements

- Option du lecteur Coran : récitation arabe du Qari sélectionné, lecture française du sens par Youssouf Leclerc, puis verset suivant. Préférence conservée sur l’appareil ; compatible sourates, juz et hizb.
- Pause/reprise, clic sur un verset, répétition du couple arabe/français, boucle de portion et gestion des fichiers manquants. Pas de superposition des deux voix.
- L’option exige des pistes arabes découpées par verset ; elle est désactivée pour l’enregistrement de sourate entière de Muhammad Hady Touré.
- Barre inférieure à cinq entrées : Accueil, Coran, Hadiths, Vidéos, Plus. Plus donne accès aux rubriques existantes, au compte et aux lectures hors ligne. État actif, zones tactiles et espace réservé au mini-lecteur ; couleurs MIRÂTH, animations réduites selon la préférence d’accessibilité.
- Étude séparée de reconnaissance de récitation dans `RECITATION_ASSISTANCE_FEASIBILITY.md`. Aucun microphone ni moteur de reconnaissance actif.
- Consigne de publication inscrite dans `AGENTS.md` : attendre le signal explicite de l’utilisateur, y compris avant tout push pouvant déclencher Netlify.

## Vérifications réalisées

- 59 tests réussis sur 21 fichiers. Les nouveaux tests couvrent l’alternance, les frontières de sourates, les répétitions, la pause, le saut de verset, l’échec français et l’annulation d’un chargement.
- TypeScript et compilation de production Webpack réussis ; 326 pages générées.
- Lint des fichiers modifiés : zéro erreur, un avertissement préexistant concernant une image du mini-lecteur.
- Catalogue français : 114 sourates et 6 236 identifiants continus, édition et chemins audio cohérents. Échantillon MP3 du verset global 1 téléchargé et lisible par ffprobe. Tous les fichiers n’ont pas été écoutés.
- La prévisualisation affiche la nouvelle option, mais ses interactions client ne répondent pas correctement dans l’environnement de vérification. L’écoute dans un navigateur réel, le menu Plus et le rendu sur téléphone restent à vérifier. Les tests automatiques utilisent un élément audio simulé et ne constituent pas un essai physique.

## État de livraison

Sources conservées localement sur une branche de préparation, sans push ni déploiement. Aucun nouveau fichier APK compilé. L’APK existante charge le site publié et ne reçoit donc pas encore ces modifications. Les flux français nécessitent Internet ; aucune garantie nouvelle de fonctionnement hors ligne ou écran éteint n’est apportée.

L’archive contient un patch applicable à la base indiquée et un aperçu local. Pour reprendre les modifications : utiliser une copie propre à cette base, appliquer `git apply --index MIRATH-modifications.patch`, installer les dépendances et effectuer les essais manuels restants. Ne pas pousser ou publier avant le signal utilisateur.
