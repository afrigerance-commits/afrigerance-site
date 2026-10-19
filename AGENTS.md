<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Publication en attente — consigne utilisateur du 9 octobre 2026

Préparer les changements et effectuer les vérifications localement. Ne publier
aucune modification et ne lancer aucun déploiement Netlify avant un signal
explicite de l’utilisateur. Ne pas pousser vers la branche de production ni
vers une branche susceptible de déclencher une compilation Netlify. L’APK
actuel charge le site publié : les changements du lecteur web ne deviennent
donc visibles dans cette APK qu’après publication autorisée. Cette consigne
remplace les autorisations antérieures de publication automatique.

Signal reçu pour cette livraison : « Publie sur netlify et met à jour le apk ».
La publication des changements préparés et la compilation APK 1.2 sont donc
autorisées. Les futures modifications restent soumises à un nouveau signal.

Nouveau signal reçu le 10 octobre 2026 : « Top signal lancé ».
La publication du lot préparé (connexion, repères Juz et outils de lecture)
est autorisée sur Netlify. Ce lot ne modifie pas le code natif Android ;
l’APK 1.2 existante charge les nouveaux contenus web après publication.
Les modifications ultérieures restent soumises à un nouveau signal.

Signal suivant reçu le 10 octobre 2026 : « Signal donné ».
La publication du lot des trois modes Coran et de l’interface mobile premium
est autorisée. Aucun changement natif Android dans ce lot ; l’APK actuelle
charge la version web publiée. Les futures publications exigent un nouveau signal.

Signal « Publie les » reçu le 10 octobre 2026 : publication autorisée du lot
des 114 noms translittérés, recherche documentaire des hadiths et trois modes
audio indépendants. Pas de changement natif Android. Les lots suivants restent
soumis à un nouveau signal utilisateur.

Signal « Vas y publie » reçu le 11 octobre 2026 : publication autorisée du lot
bibliothèque, lectures originales, exercices, administration des livres et
synchronisation préparée. Les migrations Supabase restent à activer séparément.
Aucune nouvelle APK n’est compilée pour ce lot. Les futures publications
restent soumises à un nouveau signal utilisateur.

Signal « signal lancé » reçu le 11 octobre 2026 : publication autorisée du lot
statistiques facultatives de fréquentation. La collecte reste désactivée tant
que la migration Supabase, la purge et le secret serveur ne sont pas activés.
Les prochaines publications restent soumises à un nouveau signal.

Signal « publie toutes les modifications jusque là » reçu le 11 octobre 2026 :
publication autorisée de tous les changements préparés, notamment la navigation
progressive du Coran et le parcours Sîra original de 42 chapitres. Branche Netlify
mise à jour vers de10bfe825d716a339afb1273c36e3b925774838. Aucun nouvel APK
natif compilé. Les modifications suivantes exigent un nouveau signal utilisateur.

Signal « publie » reçu le 11 octobre 2026 à 05:24 UTC : publication du guide
des degrés de hadiths et des liens d’aide depuis les badges autorisée. Commit
de production : 5de2233d3576b7cbcd8e58ad28b59a81d4c82a2e. Les prochaines
modifications restent soumises à un nouveau signal.

Demande du 11 octobre 2026 : « Continuer à écouter le Coran même quand on sort de
l’application est ce possible tu peux gérer ça ? ». Préparation autorisée du
service natif Android, du pont web et de l’APK 1.3. Compilation/tests réalisés
sur android/background-audio-20261011 avec [skip netlify]. Aucun signal de
publication pour ce lot ; la production reste au commit 5de2233d3576b7cbcd8e58ad28b59a81d4c82a2e.
L’activation exige une publication explicite du nouveau lecteur et l’installation
de l’APK 1.3. Essais physiques encore à effectuer.


Demande du 18 octobre 2026 : lecture page par page, tafsir et notes facultatifs,
lecture en un bloc, jauge propre au Juz/Hizb/sourate sélectionné. Lot préparé
sur feature/quran-page-reader-20261018 à partir du lot audio natif en attente.
Aucun signal de publication reçu. Ne pas déployer ce lot ni le lot audio
précédent sans nouveau signal explicite. Aucune modification native Android
nécessaire pour ces options web.


Signal « Publie » reçu le 18 octobre 2026 à 22:57 UTC : publication autorisée
du lecteur page par page, options d’affichage et jauges, ainsi que du lot
d’écoute native en arrière-plan inclus dans sa base. Vérifications : 177 tests
et compilation de 972 pages réussis. La production peut être mise à jour
pour ce lot uniquement ; les modifications ultérieures exigent un nouveau signal.

Publication effectuée pour ce signal : production 213b2cee89be0c77e83fc2dc94a2121e8eb2a228.
Vérification HTTP du site Netlify réussie : pages 1 et 604, Juz 2, Hizb 2,
sourate 2 ; options facultatives et jauges propres à chaque portion présentes.
Les futures modifications restent soumises à un nouveau signal utilisateur.


Demande suivante du 18 octobre 2026 : « Les pages pour la lecture page par
page doivent être sous forme de bouquin ». Lot livre préparé sur
feature/quran-book-20261018 : double page RTL sur grand écran, page unique
sur mobile, reliure et feuilletage, tafsir/notes facultatifs. Le précédent
signal « Publie » ne couvre pas ce nouveau lot. Aucun déploiement autorisé
ni lancé ; production conservée au commit 213b2cee89be0c77e83fc2dc94a2121e8eb2a228.


Signal « Publie ! » reçu le 19 octobre 2026 à 00:38 UTC : publication
autorisée du mode livre préparé sur feature/quran-book-20261018.
182 tests réussis, compilation de 972 pages validée. Ce signal couvre
uniquement ce lot ; les futures modifications nécessitent un nouveau signal.

Publication du mode livre effectuée : d6f23f375f597c027a439e520665f2ed0eb24fbb.
Les pages 1 et 604 du site Netlify répondent en HTTP 200 avec le nouveau
lecteur et deux feuillets distincts. Les prochains lots attendent un nouveau signal.


Demande du 19 octobre 2026 à 14:05 UTC : refonte globale MIRÂTH, sans
publication. Branche feature/mirath-redesign-20261019. Système visuel
commun ivoire/encre/émeraude/or, accueil unifié, options de lecture épurées,
typographie réglable partagée et reprise contextuelle. L’audio persistant
ne change de file sur une autre vue du Coran qu’après une action explicite.
Ne pas publier ce nouveau lot sans signal. Production inchangée :
d6f23f375f597c027a439e520665f2ed0eb24fbb. Le navigateur de contrôle
est indisponible dans cet environnement géré : vérifications visuelles
et essais physiques non effectués, à ne pas présenter comme réussis.


Signal « publie » reçu le 19 octobre 2026 à 14:47 UTC : publication
autorisée du lot de refonte préparé sur feature/mirath-redesign-20261019.
207 tests et compilation des 972 pages réussis. Les limites d’inspection
visuelle et d’essais physiques ont été expliquées avant ce signal.
Les modifications ultérieures nécessitent un nouveau signal utilisateur.
