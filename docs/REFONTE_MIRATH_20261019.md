# MIRÂTH — bibliothèque contemporaine

## État de livraison

Implémentation préparée sur `feature/mirath-redesign-20261019`. Aucun déploiement Netlify, aucune publication ni nouvelle APK. Production conservée au commit d6f23f375f597c027a439e520665f2ed0eb24fbb.

## Concept et système

Ivoire mat #F7F4EC, encre #152A27, émeraude #174D40 et or de détail #C1A16A. Texte doré rendu avec une variante lisible #786037. Mode sombre : fond #101D1C, papier #172826, texte #EDEAE0 et accent #D9BF89. Motif géométrique limité à une petite ponctuation du visuel d’accueil ; aucun texte religieux décoratif ajouté.

Le contrat commun est dans src/app/editorial.css, importé après les styles existants : titres, espacement, formulaires, cartes, menus, livre, mini-lecteur, navigation mobile et surfaces nocturnes. Fraunces pour la hiérarchie des titres, Work Sans variable pour l’interface, Noto Naskh Arabic pour l’arabe courant et Amiri régulier pour le Coran. Les synthèses grasses et espacements artificiels du texte coranique sont évités. Les textes religieux existants et leurs signes restent inchangés.

## Changements concrets

- Un seul accueil pour mobile et ordinateur : ouvrir le mushaf, retrouver ses repères, lire et écouter, suivre son objectif. Recherche directe conservée. La routine, les récits, les articles et les ouvrages restent accessibles.
- Collections présentées en lignes éditoriales numérotées, moins de grandes cartes photographiques. Bannières décoratives retirées des index Coran/Hadith pour atteindre les contenus plus vite.
- En-têtes de rubrique alignés à gauche, titres et introductions hiérarchisés, navigation principale sobre, logo de marque sur mobile, footer et dock harmonisés. Aucun lien ni rubrique existants supprimés.
- Les composants Button/Card/Input/Textarea, les en-têtes et les variables partagées appliquent le langage visuel aux écrans de lecture, bibliothèque, récits, leçons, invocations et formulaires. Les pages de compte et d’administration conservent leurs protections et leurs données.
- Réglages avancés du lecteur repliés. Tafsir et notes restent activables directement ; taille arabe 26–46 partagée entre les contextes, y compris le livre. Les préférences existantes sont réutilisées.
- Livre responsive : double page à partir de 1024 px, page unique sur mobile, marges et folios raffinés, typographie libre sans découpe à hauteur fixe. Les limites Tanzil et les trois langues d’affichage restent celles du lecteur publié.
- Reprise de lecture étendue à la page/Juz/Hizb et au verset visible. L’ancien format de position reste accepté. L’information utilise la clé de lecture déjà isolée par compte ; une portion incohérente est rejetée lors de la reprise.
- L’écoute en cours garde sa file lors de la consultation d’une autre sourate/portion. Le transfert se fait après clic de lecture ou préparation explicite de mémorisation. Le mini-lecteur reste à la racine, au-dessus du dock, et affiche une progression de piste via un abonné d’horloge isolé.
- Mouvements limités : entrée 280 ms, panneaux 160 ms, retours de sélection 140 ms ; aucune attente imposée aux clics. Animation continue de l’ancien hero retirée. Réduction des animations conservée.

## Chargement et préservation

Aucune dépendance ajoutée. Polices variables françaises, Naskh non préchargée, une seule graisse Amiri, images décoratives secondaires retirées et image d’accueil chargée sans priorité sur le texte. Les écrans mobiles ne préchargent plus les anciennes bannières de rubrique. Les données complètes du Coran restent disponibles dans le lecteur progressif ; son affichage DOM est borné initialement. Les comptes, intégrations Supabase et service worker sont conservés. Aucun fichier religieux suivi, migration ou code Android natif modifié.

## Contrôles

- Suite complète : 207 tests réussis dans 50 fichiers, dont les contrats de contraste et la mémorisation de la nouvelle portion.
- Compilation de production et TypeScript : succès, 972 pages générées. Le cache local Turbopack a dû être reconstruit après une erreur de persistance ; la compilation complète propre réussit.
- Contrastes des couleurs sémantiques : 18 couples testés dans les deux thèmes, plus texte et folios du livre ; tous atteignent 4,5:1. Exemples clair : texte/fond 13,72:1 ; secondaire/fond 5,05:1 ; secondaire/surface atténuée 4,62:1 ; or textuel/fond 5,42:1. Sombre : texte/fond 14,36:1 ; secondaire/fond 8,62:1. Ces mesures ne sont pas un audit complet de tous les pixels ou images.
- HTML généré contrôlé sur 15 écrans, dont accueil, Coran, Al-Baqara, page 604, Juz 2, Hizb 3, Hadith, bibliothèque, invocations, Sîra, connexion, inscription, suivi, apprentissage et hors ligne : un h1 par écran, pas de lien href="#", attributs lang/dir arabes présents sur les lecteurs. Quatre préchargements de police constatés. Contrôle statique, sans moteur de rendu.
- Tests fonctionnels : continuité audio à la sortie du lecteur et vers un autre lecteur, bascule explicite de file, mémorisation de la nouvelle portion, taille partagée, préférences tafsir/notes, reprise dans les portions, limites 604 pages, clavier/glissement et progression existante. Les autres tests de comptes, recherche et stockage restent dans la suite.

## Limites de vérification et audio

Le navigateur de contrôle n’est pas disponible dans l’environnement géré. Aucun serveur de prévisualisation, contournement navigateur ni faux screenshot n’a été utilisé. Pas d’inspection visuelle à 320/390/768/1440 px, pas de Lighthouse, pas de mesure sur réseau lent ou téléphone modeste, pas de contrôle visuel des voyelles. Les breakpoints, styles RTL et contrats de contraste sont préparés et contrôlés dans le code ; leur résultat visuel reste à vérifier.

Android : le pont et le service Media3 de l’APK 1.3 sont conservés ; les essais Android instrumentés précédents ne constituent pas de nouveaux essais physiques pour cette refonte. Navigateur : HTMLAudio persistant et MediaSession quand disponible ; le système peut suspendre une page ou bloquer une reprise automatique. iOS : aucune nouvelle application native avec droits audio en arrière-plan compilée dans ce lot. Aucune garantie universelle d’écoute écran verrouillé n’est revendiquée.

## Validation visuelle à effectuer avant approbation de publication

1. Accueil, recherche, menu Plus, connexion et retour au lecteur : 320/390/768/1440 px, clair/sombre. Vérifier l’absence de débordement et le clavier virtuel.
2. Al-Fâtiha, Al-Baqara, Juz 2, Hizb 3 et pages 1/22/604 : voyelles, signes de pause, tailles 26/46, français et bilingue ; notes et tafsir masqués/affichés ; reprise et position.
3. Lecture audio puis navigation routine/autre sourate, pause/reprise, casque, écran verrouillé et appel sur téléphone Android avec APK 1.3 ; vérifier séparément le navigateur et iOS.
4. Mode statique prefers-reduced-motion, lecteur d’écran et navigation clavier.

Aucun signal de publication pour ce lot : attendre la demande explicite de l’utilisateur.
