# Présentation livre du Coran — préparation du 18 octobre 2026

## Changements

- Les routes /coran/lecture/page/1 à /604 utilisent un lecteur en forme de livre : couverture verte, cadre doré, papier ivoire, reliure centrale, ombres de tranche, en-têtes et folios. Palette sombre adaptée.
- Sur écran large (à partir de 1024 px), deux pages réellement distinctes : page impaire à droite et paire à gauche. Sur mobile/tablette, seule la page demandée est visible. Les limites des 604 pages Tanzil sont inchangées.
- Boutons précédent/suivant, sélection directe, flèches du clavier lorsque le livre a le focus, glissement horizontal sur mobile avec seuil pour préserver le défilement vertical. Pas d’interception dans les champs de notes ou lors de la sélection de texte.
- Navigation par ouverture de deux pages sur grand écran et par page sur petit écran. Pas de page 0 ou 605.
- Entrée du livre animée par rotation légère et opacité ; animation désactivée avec prefers-reduced-motion.
- Texte continu par défaut dans ce mode, sans changement de la préférence globale du lecteur classique. Arabe, français ou bilingue conservés. Tafsir et notes toujours facultatifs, dans les réglages repliés.
- Clic audio sur chaque verset et suivi de la page pendant la récitation. La lecture depuis la barre audio commence à la page sélectionnée, y compris lorsqu’elle est paire. La queue couvre les deux pages de l’ouverture.
- Les vues sourate/Juz/Hizb et leurs jauges restent sur le lecteur existant.

## Exactitude et limites

Il s’agit d’un livre typographique responsive, pas d’un fac-similé scanné : les lignes et la hauteur dépendent de l’écran et de la langue. Aucun verset, numéro, limite ou signe de pause n’est généré ou changé. Pas de texte masqué par une hauteur fixe.

## Vérification

- Suite complète : 182 tests réussis, 47 fichiers.
- Contrôle supplémentaire ciblé après ajout du suivi visuel audio : 5 tests livre réussis.
- Compilation de production / TypeScript : succès, 972 pages générées.
- git diff --check : succès.
- Tests ajoutés : toutes les ouvertures 1–604, ordre RTL, page paire sélectionnée sur mobile, départ audio, boutons et clavier, absence d’interception du clavier dans le texte interactif, glissement horizontal versus défilement vertical, suivi audio entre les pages.
- Aucun essai visuel en navigateur ni sur téléphone dans cet environnement.

## Publication

Préparé uniquement sur feature/quran-book-20261018, avec commits [skip netlify]. Aucun changement de la branche Netlify ; production toujours au commit 213b2cee89be0c77e83fc2dc94a2121e8eb2a228. Attendre un nouveau signal explicite pour publier. Aucun changement natif Android ni nouvelle APK requis pour ce lot web.
