# Repères de Juz et bande de position — 10 octobre 2026

Statut : préparé localement, non publié. Aucun push et aucun déploiement Netlify.

- Lectures par sourate et par portion : séparateurs éditoriaux Début/Fin du Juz ; Suite du Juz si la page commence au milieu. Les séparateurs ouvrent le Juz correspondant.
- Fine bande latérale à droite : Juz courant et position en pourcentage dans ce Juz. Le calcul suit le verset arrivé à la ligne de lecture, indépendamment de l’audio et du pied de page. Il ne mesure pas une lecture accomplie.
- Défilement manuel, déplacement pendant l’audio, redimensionnement et changement de taille du contenu pris en compte. La bande reste visible en mode lecture concentrée, avec animations désactivées si le système demande de réduire les mouvements.
- Le texte coranique et les limites existantes ne sont pas modifiés. Les 30 débuts ont été comparés avec https://tanzil.net/res/text/metadata/quran-data.xml : correspondance exacte.

Validation : 23 fichiers de tests, 85 tests réussis ; compilation de production Next.js réussie, TypeScript inclus ; git diff --check réussi. Tests supplémentaires : toutes les limites, transition 2:141 / 2:142, sourate qui débute au milieu du Juz, verset long, défilement et redimensionnement, lien du séparateur.

Limite : pas de contrôle visuel dans un navigateur ni sur un téléphone pendant cette préparation, le contrôle de navigateur prévu par Sites n’étant pas disponible. Aucun nouvel APK compilé : le lecteur web sera repris par l’APK actuelle après une publication autorisée.
