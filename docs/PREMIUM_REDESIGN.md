# MIRÂTH — audit et transformation éditoriale

Intervention du 5 octobre 2026, branche `claude/elegant-wozniak-f2m61x`.

## Diagnostic avant intervention

L'architecture App Router, les jeux de données locaux sourcés, la séparation administration/public et les composants Radix constituent une base saine. Une réécriture du produit aurait créé des risques inutiles. Le problème principal était la mise en scène et la continuité de l'expérience.

| Priorité | Observation concrète | Correction |
| --- | --- | --- |
| P0 | Le déplacement animé de l'enveloppe de page pouvait changer le repère du mini lecteur fixe | Transition de page uniquement en opacité |
| P0 | Sous reduced-motion, le séparateur rendait un DOM différent serveur/client | DOM stable et animation CSS déclenchée par IntersectionObserver |
| P1 | Accueil : succession de grilles similaires et longue liste de disciplines avant l'usage réel | Progression découverte → trois usages → lecteur → sources → parcours → ressources publiées → invitation |
| P1 | 114 sourates sans recherche dédiée | Recherche français/arabe/numéro, filtres mecquoises/médinoises, compte de résultats et réinitialisation |
| P1 | Dernière lecture peu visible à l'arrivée | Sauvegarde locale du verset visible et reprise sur accueil/Coran |
| P1 | Accueil vidéo et vidéothèque n'utilisaient pas la même source de publication | Les deux utilisent `getPublishedVideos()` |
| P1 | Les cartes vidéo renvoyaient uniquement hors du site | Lecteur YouTube interne chargé au clic, lien externe conservé |
| P1 | Recherche générale sensible aux accents et sans vidéos | Normalisation français/arabe, vidéos publiées et ancre directe |
| P1 | Pages en attente réduites à une phrase ou une grille vide | Mise en scène documentaire et action vers une vraie ressource |
| P2 | Boutons, titres et séparateurs manquaient d'un rythme commun | Tokens de section, typographie, rayon, ombre et easing harmonisés |
| P2 | Message de contact exposant des variables techniques au visiteur | État public clair et libellé mailto explicite |
| P2 | Absence d'image de partage de marque | OpenGraph/Twitter 1200 × 630 générée au build |
| P2 | URL de repli locale susceptible de produire des liens SEO localhost | URL publique MIRÂTH par défaut, surcharge explicite possible |

Pour un nouveau visiteur, l'offre était compréhensible mais la concurrence entre rubriques diluait le premier choix. L'identité vert/ivoire/or existait ; elle était moins mémorable dans une succession de cartes identiques. Le premier écran manquait d'une composition et d'une démonstration d'usage. L'impression était celle d'un portail correctement monté, pas d'une réalisation d'agence à 10 000 $. Ce jugement porte sur la valeur perçue, pas sur un prix réel ni une garantie commerciale.

## Principes de benchmark

Sites observés : Apple, Linear, Stripe. Principes retenus : un premier choix clair, typographie expressive, alternance de densité, produit montré avant les discours, confiance documentée, interactions rapides. Aucun logo, texte, palette ou agencement propriétaire reproduit. Une esthétique éditoriale et patrimoniale correspond mieux à MIRÂTH qu'une interface SaaS ou un spectacle WebGL.

## Architecture cible

- Les routes, l'authentification, le workflow éditorial, les données religieuses, le tajwîd, les tafsîrs et les providers audio existants sont conservés.
- Accueil et contenu éditorial : composants serveur ; petits îlots client pour recherche, signets, reprise et vidéos.
- Header : trois destinations fortes Coran/Hadith/Vidéos, rubriques secondaires dans Plus, menu mobile défilable, recherche rapide Ctrl/Cmd K.
- La bibliothèque et la politique éditoriale servent de preuve documentaire, sans faux témoignages ni chiffres promotionnels.
- Les contenus non publiés restent protégés. Le design ne simule pas un contenu disponible.

## Direction artistique et design system

Ivoire papier `#f8f5ee`, vert profond `#123f38`, encre `#091c2b`, laiton décoratif `#c6a667` et laiton texte plus sombre `#7a5c27`. Le mode sombre existant reste disponible.

Fraunces pour les titres, Work Sans pour les interfaces, polices arabes existantes préservées. Titres fluides, tracking resserré, corps de lecture aéré. Conteneur éditorial 1240 px ; sections fluides 4,5–8 rem ; rayon de panneau 1,75 rem ; easing `cubic-bezier(.16,1,.3,1)` ; ombres douces cohérentes.

Hero asymétrique avec image dans une arcade, liseré laiton, annotation de première lecture, texture lumineuse subtile et recherche intégrée. Cartes des trois usages décalées sur desktop. Les textes religieux ne servent pas de décoration inventée.

Les illustrations locales Coran, livres et studio sont conservées : palette cohérente, pages sans texte fabriqué, aucun portrait religieux généré. Les couvertures restent explicitement des compositions MIRÂTH, pas des reproductions d'éditions. Les portraits des récitateurs et leurs crédits sont préservés.

### Brief pour une prochaine séance photographique

Photographie éditoriale réaliste dans une bibliothèque calme ; bois sombre, pierre ivoire, touches de laiton, lumière latérale chaude ; cadrage asymétrique avec espace négatif pour un titre ; aucune personne identifiable, aucun texte religieux généré ou pseudo-calligraphie ; livres aux pages vierges ou ouvrages réels dont les droits sont établis. Déclinaisons : détail d'une reliure, table d'étude, espace d'écoute, arcade architecturale. Pas de mosquée générique ajoutée sans lien avec le sujet.

## Motion

Entrée du hero séquencée 0–320 ms, durée 850 ms. Arcade en arrivée 1,2 s. Zoom photographique lent limité à deux cycles, annotation flottante limitée à trois cycles et désactivée sur appareils sans hover. Sections hors écran révélées une fois, translate 24 px/opacité, durée 700 ms et délai plafonné à 250 ms. Contenu visible par défaut au rendu serveur.

Storytelling sticky réservé au desktop, transitions de carte et flèches courtes, navigation qui se densifie au scroll, progression fine en header, séparateur lumineux ponctuel, transition de page 220 ms en opacité. Aucun scroll détourné, curseur masqué, shader lourd ou bibliothèque supplémentaire.

Reduced-motion : suppression des entrées et déplacements, contenu visible, séparateurs statiques. Tests navigateur dédiés à ce mode ; l'erreur d'hydratation de l'ancien séparateur a été corrigée.

## Fonctions livrées

| Niveau | Fonction | Problème résolu |
| --- | --- | --- |
| MUST HAVE | Recherche dédiée Coran + filtres + état sans résultat | Trouver rapidement une sourate |
| MUST HAVE | Source commune de vidéos publiées | Cohérence administration/accueil/vidéothèque |
| MUST HAVE | Recherche générale sans accents et incluant les vidéos | Retrouver le contenu avec un vocabulaire courant |
| PREMIUM | Recherche rapide au clavier et accès directs | Réduire les détours |
| PREMIUM | Reprise automatique du verset visible | Continuer une lecture après fermeture |
| PREMIUM | Signets de hadiths, liste personnelle et suppression | Retrouver une référence sans compte |
| PREMIUM | Copie du texte avec sa référence et son URL | Éviter le partage sans source |
| PREMIUM | Vidéo intégrée au clic + recherche locale | Approfondir sans quitter la page |
| WOW | Arcade animée et progression éditoriale au scroll | Donner une identité mémorable sans gêner l'étude |

Signets et reprise : stockage sur l'appareil, validation des données stockées, erreurs de stockage tolérées. Pas de synchronisation multi-appareils revendiquée. Le lecteur vidéo contacte YouTube au clic ; les miniatures sont téléchargées depuis YouTube à l'affichage.

## Objectifs et actions

| Page | Objectif utilisateur | Objectif produit | Action principale | Action secondaire / preuve |
| --- | --- | --- | --- | --- |
| Accueil | Comprendre et commencer | Première lecture utile | Ouvrir le Coran | Hadiths ; sources visibles |
| Coran | Trouver, lire et écouter | Retour régulier | Ouvrir une sourate / reprendre | Audio, taille, tajwîd et sources existants |
| Hadith | Explorer et retrouver une référence | Consultation documentée | Choisir un recueil/livre | Garder/copier avec référence |
| Vidéos | Trouver et regarder un enseignement | Consultation d'un contenu publié | Regarder dans la carte | Ouvrir YouTube |
| Bibliothèque | Identifier édition, auteur et droits | Orienter vers une source | Consulter une notice | Statut des droits ; aucun téléchargement ajouté |
| Apprendre | Choisir un parcours réaliste | Continuité entre ressources | Ouvrir un parcours | Étapes accessibles sans compte |
| Blog | Lire les articles publiés | Approfondissement | Ouvrir un article | Références et statut de publication |
| Sîra / figures | Comprendre ce qui est disponible | Confiance documentaire | Consulter un ouvrage en attendant | Statut honnête de préparation |

## Performance, SEO et accessibilité

Images locales optimisées par Next Image avec tailles responsives et image hero prioritaire. Vidéos sans iframe au chargement initial. Révélation des listes avec IntersectionObserver plutôt qu'une animation Motion par carte. Transform/opacité pour les entrées ; pas de dépendance ajoutée. Layouts responsives, menus Radix, labels de recherche, focus visible, raccourci clavier, résultats annoncés et texte arabe/RTL préservés.

Canonical des routes principales, sitemap public, robots, titres, données structurées existantes et image OpenGraph/Twitter vérifiés. Tous les liens du sitemap sont contrôlés en HTTP dans le build local. L'URL publique canonique ne retombe plus sur localhost faute de variable.

Aucun score Lighthouse ou gain de Core Web Vitals inventé. Les mesures terrain nécessitent un trafic réel et une collecte appropriée. Les comptes authentifiés et le fonctionnement des services tiers ne sont pas certifiés par les tests sans identifiants.

## Contrôle qualité

- Build Next.js production Webpack et TypeScript strict.
- Tests unitaires : 30 passent, dont validation de position, recherche et chargement volontaire du lecteur vidéo.
- Suite navigateur : 46 passent, desktop Chromium et Pixel 7 émulé.
- Quatre largeurs : 390, 768, 1280 et 1536 px ; 13 parcours publics, statut HTTP, titre H1 unique, absence de débordement et d'erreur JavaScript.
- Navigation mobile, thème sombre, clavier, recherche rapide, signets, stockage, pages privées protégées, 404 et contenus non publiés testés.
- Contrôle visuel de l'accueil desktop/mobile et reduced-motion.
- Lint sans erreur ; un avertissement préexistant concerne le portrait <img> du mini lecteur, petit et à source externe.

## Dépendances réellement restantes

- Une adresse de contact (`NEXT_PUBLIC_CONTACT_EMAIL`) pour activer l'ouverture de la messagerie ; un service d'envoi seulement si un envoi direct depuis le site est souhaité.
- Les scans/éditions fournis et leurs droits pour publier de nouveaux contenus documentés, notamment Sîra et biographies ; aucune fabrication de texte religieux.
- Identifiants Supabase pour auditer en production les migrations `0002_rls.sql`, le seed, les rôles et les opérations administrateur. Aucun secret demandé dans le chat.
- Domaine personnalisé éventuel : décision propriétaire et réglage de `NEXT_PUBLIC_SITE_URL`.
- Les catalogues audio, YouTube et tafsîrs restent soumis à la disponibilité de leurs fournisseurs. Cette intervention ne prétend pas avoir réécouté tout le corpus.
