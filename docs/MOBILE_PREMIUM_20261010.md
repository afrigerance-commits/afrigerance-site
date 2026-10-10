# MIRÂTH — amélioration de l’expérience mobile

Préparation locale autorisée le 10 octobre 2026. Aucun push, aucune publication Netlify et aucune nouvelle compilation APK : attendre un nouveau signal. Les trois modes de langue du Coran préparés précédemment sont conservés.

## Changements

- Accueil des écrans de moins de 1 024 px : reprise de lecture, accès Coran, horaires existants (une seule instance), objectif personnel déclaré, invocations, bibliothèque, routine et leçon. L’accueil éditorial complet reste sur grand écran.
- En-tête mobile compact : retour, titre de rubrique, recherche, thème et compte. Barre inférieure conservée ; menu supérieur et grand pied de page masqués sur mobile. Les liens légaux restent dans Plus.
- Premier accueil facultatif : choix de langue et indication du réglage de ville, sans inscription obligatoire. Le panneau se ferme durablement après « C’est compris ».
- Sourates/Juz/Hizb : réglages audio, mémorisation et téléchargement regroupés dans un panneau replié. Les versets restent cliquables pour lancer la lecture.
- Mini-lecteur sur la largeur disponible au-dessus des onglets. Ouverture dans un panneau modal accessible avec progression de la piste, déplacement dans la piste, précédent/suivant, répétition et arrêt après 5/15/30/60 minutes ; désactivation possible. La minuterie utilise le fonctionnement web actif, avec contrôle de l’échéance au retour au premier plan ; elle ne constitue pas une alarme native garantie application suspendue.
- `/ma-bibliotheque` : dernière position, pages enregistrées, signets, sourates favorites ajoutables/supprimables, notes et export existants, téléchargements. Données locales, sans synchronisation de compte. Coquille publique anonyme autorisée dans le worker hors ligne.
- Audio téléchargé : nom lisible et lien exact des Juz/Hizb reconnus à leurs bornes ; autres sélections renvoient au verset de départ, métadonnées anciennes invalides avec repli sûr.
- Adhan : cartes d’état pour notifications, alarmes, volume et ville enregistrée ; rappel d’actualisation si la ville sélectionnée diffère du calendrier. Référence APK mise à jour à 1.2. Aucune modification native ni nouvelle garantie de son sur téléphone.
- Fonds mobiles unis, surfaces de lecture plus sobres, panneaux avec animation discrète désactivée si réduction du mouvement demandée. Aucun texte religieux modifié ou ajouté.

## Contrôles

113 tests réussis sur 30 fichiers, dont bornes de déplacement audio, échéance et annulation de minuterie, liens exacts des 30 Juz et 60 Hizb. TypeScript et compilation Webpack vérifiés ; diff sans erreurs d’espacement.

Pas de vérification visuelle en navigateur ni d’essai physique Android : contrôle de navigateur indisponible. À vérifier après publication autorisée : téléphone étroit, thème sombre, panneaux/retour clavier, audio écran verrouillé, cache en mode avion, autorisations Adhan et réception réelle d’e-mail Supabase. La synchronisation serveur et l’assistance de récitation type Tarteel restent des chantiers distincts.
