# MIRÂTH — outils de lecture préparés le 10 octobre 2026

Publication autorisée le 10 octobre 2026 par le signal « Top signal lancé » : lot regroupant ces outils, la confirmation d’e-mail et les repères de Juz. La réussite du déploiement sera vérifiée sur le site public. Aucun changement natif ni nouvelle compilation APK : l’APK 1.2 charge ce site.

## Intégrations

- `/mon-suivi` : objectif quotidien en versets, Hizb ou Juz ; validation manuelle ; historique par date locale. Le défilement et l’audio ne valident pas une lecture.
- Khatm : répartition du reste des 6 236 versets entre les séances choisies (1–365), liens vers la référence de départ, borne de fin, ajustement de position et reprise après une journée manquée. Une séance par jour est une proposition personnelle, aucun mérite religieux n’est attribué aux choix du programme.
- Dans les lecteurs sourate/Juz/Hizb : plage de mémorisation, 1–10 répétitions par verset et silence de 0–30 s. Répétition du couple arabe/français quand la traduction audio est active ; arrêt à la borne finale, pause/reprise et annulation du silence. Incompatible avec les récitations non découpées par verset, clairement indiqué.
- Options de lecture : masquer l’arabe, la traduction et le tafsîr ; révéler un verset puis le masquer à nouveau. Le corpus original reste inchangé.
- `/coran/recherche` : recherche serveur sur l’arabe et le français du corpus existant, référence exacte comme 2:255, accents/diacritiques ignorés, pagination de 20 versets. Cette recherche demande Internet.
- Notes personnelles sous les versets : édition différée à l’ouverture, limite de 4 000 caractères, suppression, références validées, restitution comme texte sans HTML. `/mes-notes` les regroupe et permet l’export JSON. Les signets locaux existants (un par sourate) sont regroupés aussi.
- Audio hors ligne : téléchargement explicite de la sourate/portion sélectionnée, avec français facultatif, progrès, annulation, reprise depuis les fichiers déjà présents, état partiel/complet, volume et suppression dans `/hors-ligne`. Les fichiers partagés avec d’autres téléchargements sont conservés lors d’une suppression.
- Les catalogues audio sont conservés après vérification ; les données récupérées du cache sont contrôlées pour éviter un mauvais verset/récitateur. Cache des fichiers séparé des pages publiques. Le worker sert également les requêtes de plages d’octets nécessaires à l’audio.
- `/api/quran-audio` relaie uniquement les chemins MP3 publics autorisés des deux sources connues. Identifiants, ports non standards, redirections et types non audio refusés ; délai et taille limités, transmission en flux. Les téléchargements du CDN passent par cette route pour éviter ses restrictions CORS. Les fichiers EveryAyah passent directement par la source. Aucun téléchargement automatique ou de tout le Coran au chargement.
- Parcours : les trois parcours documentés existants restent accessibles. Le tableau de progression reprend la prochaine leçon et renvoie vers le parcours complet. Aucun texte religieux ou quiz religieux supplémentaire n’a été fabriqué.
- Navigation : liens depuis Coran, Plus/menu secondaire, routine, apprentissage et compte. Les pages personnelles locales peuvent être enregistrées sous forme de coquille publique anonyme pour les rouvrir hors ligne ; aucune page de compte n’est mise en cache.

## Données et limites

Objectifs, notes, signets et validations des parcours restent sur l’appareil ; pas de synchronisation entre comptes ou appareils dans cette livraison. Le compte précise cette limite. L’export protège les notes avant désinstallation, mais aucune conservation après suppression des données du navigateur n’est garantie. L’accès au stockage et les téléchargements peuvent être refusés : l’interface le signale.

Le téléchargement complet des fichiers audio ne suffit pas à ouvrir une page jamais enregistrée : laisser charger la page de lecture avec Internet. Le lecteur hors ligne doit être actif avant téléchargement. Les vidéos, le compte, la recherche serveur et les sources de tafsîr/tajwîd non enregistrées demandent encore Internet. Le navigateur peut effacer le cache ; la bibliothèque vérifie les fichiers réellement présents et ne conserve pas l’étiquette « complet » en cas de manque.

La route de relais utilisera le trafic serveur/hébergement lors de téléchargements après publication ; aucun crédit Netlify n’a été utilisé pour déployer ces changements locaux.

## Vérification

- Suite complète : 29 fichiers et 108 tests réussis.
- Nouveaux contrôles : références, limites, répartition du khatm sans sauts ni doublons, persistance et validation explicite des objectifs, notes comme texte, recherche exacte et pagination, masquage, répétitions arabe/français, silence/pause/reprise, cache hors réseau, annulation et erreurs de téléchargement, restriction des sources, lecture partielle HTTP 206 et borne invalide HTTP 416.
- Compilation de production Webpack et TypeScript réussies.
- ESLint du code modifié : zéro erreur ; avertissement préexistant sur une image du mini-lecteur.
- Échantillons HEAD des sources : EveryAyah répond en audio/mpeg avec CORS `*` ; CDN Alafasy répond en audio/mpeg mais sans en-tête CORS, ce qui motive le relais de téléchargement. Tous les fichiers n’ont pas été téléchargés ni écoutés.

Pas de vérification visuelle dans un navigateur ni d’essai physique dans l’APK : le contrôle de navigateur prévu par Sites est indisponible. Les caches/audio sont simulés dans les tests unitaires ; il faut un essai réel après publication autorisée, notamment en mode avion et après fermeture/réouverture de l’application.

## Chantiers distincts encore ouverts

- Connexion publique : corrections précédemment préparées ; réglages SMTP, RLS et réception réelle d’e-mail restent à vérifier avec accès au projet Supabase.
- Adhan : mécanisme et test Android existants relus, aucun changement natif dans cette livraison. La réception à l’heure sur le téléphone physique de l’utilisateur n’est pas établie par les tests web.
- Synchronisation des données personnelles : nécessite un modèle serveur et des essais de séparation des comptes ; non activée.
- Assistance à la récitation type Tarteel : reste l’étude `RECITATION_ASSISTANCE_FEASIBILITY.md`, sans microphone ni moteur actif. Un service/modèle et une évaluation annotée sont nécessaires avant de signaler des erreurs de récitation.

Sources techniques : https://developer.mozilla.org/en-US/docs/Web/API/Cache/put et https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range. Corpus et découpages existants : Tanzil, références dans `CONTENT_SOURCES.md` et `QURAN_JUZ_READING_POSITION.md`.
