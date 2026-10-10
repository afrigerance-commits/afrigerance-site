# Trois modes audio indépendants de l’affichage

Préparation locale du 10 octobre 2026, sans publication ni nouvel APK. Attendre un nouveau signal utilisateur.

Choix audio disponibles dans les options de lecture, les réglages audio et le lecteur complet, pour chaque langue d’affichage :

- Arabe seul : Qari sélectionné.
- Français seul : traduction du sens par Yusuf / Youssouf Leclerc (édition existante `fr.leclerc`). Aucune piste arabe ni catalogue arabe chargé dans ce mode.
- Arabe puis français : chaque verset arabe, puis son sens en français, puis le suivant. Les deux voix ne sont pas superposées.

Le choix est conservé sur l’appareil sous `mirath:quran:audio-mode`. Une ancienne préférence français-après-arabe est migrée au mode « les deux » ; valeur inconnue avec repli sûr. Changer le mode arrête la piste courante et annule les requêtes précédentes. Les textes et pistes religieuses existants ne sont pas modifiés ni remplacés.

La séquence, le passage entre sourates dans une portion, les répétitions, la mémorisation, pause/reprise et le préchargement suivent la voix choisie. Le français seul reste disponible si un Qari uniquement en sourate entière est sélectionné ; l’alternance arabe/français nécessite un Qari découpé par verset. Choisir un tel Qari en mode alternance revient à l’arabe seul, clairement indiqué dans le sélecteur.

Les téléchargements enregistrent uniquement la voix choisie ou les deux ; le français seul ne télécharge pas de fichiers arabes. Les anciens téléchargements restent lisibles. Le libellé distingue le français et le couple arabe/français.

Vérification : séquence française seule, passage entre sourates, répétition française, retour à l’arabe, absence d’appel au catalogue arabe en français seul, téléchargement uniquement français ; tests existants arabe/français, minuterie et cache conservés. Pas d’essai réel du nouveau choix sur téléphone ni de vérification visuelle en navigateur (outil prévu indisponible).

Résultat final : 116 tests réussis sur 30 fichiers (suite avec deux workers pour éviter la saturation du conteneur), TypeScript et compilation production Webpack réussis, 333 pages générées. Diff vérifié. Aucun push ni déploiement effectué.
