# Bilan honnête — ce qui est fait, ce qui ne l'est pas

Ce document existe parce que le cahier des charges l'exige explicitement
(§14, §17) : ne jamais présenter une fonctionnalité non développée comme
opérationnelle. Il est mis à jour au fil du développement, pas rédigé après
coup pour impressionner.

**Contexte à garder en tête :** le cahier des charges original décrit un
projet à l'échelle d'une enveloppe de référence de 10 000 $ — plusieurs
mois de travail d'une petite équipe. Ce qui suit est le résultat d'une
**première session de développement**, pas d'un projet complet. C'est une
base réelle, qui compile, qui a des tests qui passent, et qui est
honnêtement documentée — pas une maquette.

Légende : ✅ Terminé et fonctionnel · 🟡 Partiellement fait · ⬜ Non commencé

---

## Module 01 — Accueil immersif

✅ Hero avec animation géométrique islamique originale (SVG/CSS, respecte
`prefers-reduced-motion`), recherche centrale, accès aux disciplines,
section « Commencer à apprendre », derniers articles, bibliothèque,
dernières vidéos, citation coranique référencée, mot du fondateur, footer
complet. Entièrement responsive, vérifié visuellement à 1440px, 1280px et
390px (mobile).

🟡 La section fondateur est un placeholder honnête (avatar générique, pas
de vraie photo ni de vraie biographie — voir Module « Fondateur » ci-dessous).

---

## Module 02 — Sciences islamiques (« Explorer le savoir »)

✅ Les douze disciplines exactement comme listées au cahier des charges,
chacune avec sa page de présentation. Navigation par discipline
fonctionnelle (mega-menu desktop, menu mobile).

🟡 Seules les disciplines **Fiqh malikite**, **Sîra** et **Compagnons /
grandes figures** ont un espace de contenu dédié derrière elles. Les neuf
autres (Coran et Tafsîr, Hadith, Histoire islamique, 'Aqîda, Spiritualité,
Akhlâq et Adab, Langue arabe, Invocations et adhkâr) affichent une page de
discipline honnête avec un badge « Contenu en préparation » plutôt que du
contenu fabriqué.

⬜ Navigation par niveau et par format (au-delà de la navigation par
discipline) n'est pas implémentée.

---

## Module 03 — Académie de fiqh malikite

✅ Structure complète : page d'académie avec les trois niveaux
(débutant/intermédiaire/avancé) tels que décrits au cahier des charges,
un cours complet « La purification » avec 4 leçons (introduction au
madhhab, l'eau, les ablutions, le tayammum), chaque leçon avec objectif
pédagogique, niveau, durée, texte arabe + traduction quand pertinent,
explication, points à retenir, références, navigation leçon
suivante/précédente.

🟡 **Aucune leçon n'est marquée publiée** : les détails juridiques fins
(obligations/sunan/recommandations précises selon l'école malikite) ont
été délibérément laissés en statut « Références à compléter » plutôt que
rédigés sans certitude de leur exactitude — exactement ce que le cahier
des charges demande (« ne pas produire automatiquement des cours
juridiques avancés sans validation scientifique »). Un responsable
scientifique humain doit compléter et valider ces leçons avant
publication réelle.

⬜ Pas de QCM/exercices, pas de suivi de progression persistant pour les
visiteurs non connectés (le suivi existe en base pour les comptes
connectés — voir Module 09).

⬜ Un seul cours existe ; les neuf autres sujets du niveau débutant listés
au cahier des charges (ablutions en tant que cours séparé, ghusl, prière,
jeûne, zakât, pèlerinage) et tout le niveau intermédiaire restent à
rédiger.

---

## Module 04 — Sîra prophétique

✅ Frise chronologique interactive avec six périodes (de l'Arabie
préislamique au pèlerinage d'adieu), chaque événement avec page dédiée
(contexte, localisation, sources, navigation séquentielle). Les récits
dont l'authenticité varie sont explicitement signalés (`statutAuthenticite`).

🟡 Six événements sur la quinzaine citée en exemple au cahier des charges
(persécutions, Hégire mentionnée mais pas détaillée en tant qu'étape
séparée des grandes expéditions, traités et délégations, etc. manquent).
Contenu volontairement prudent : aucun dialogue ni détail narratif inventé.

⬜ Pas de documents/images associés par événement, pas de localisation
cartographique.

---

## Module 05 — Compagnons et grandes figures

✅ Structure d'encyclopédie fonctionnelle (catégories compagnon/compagnonne/
tâbi'î/imam/savant), trois fiches de démonstration (Abû Bakr, 'Â'icha,
l'imam Mâlik) avec chronologie et sources.

⬜ Très peu de fiches par rapport à une vraie encyclopédie ; c'est un
gabarit prouvé, pas un contenu exhaustif.

---

## Module 06 — Blog éditorial (CMS)

✅ **Fonctionnel de bout en bout avec Supabase configuré** : créer,
modifier, changer le statut éditorial d'un article depuis `/admin`, avec
le contrôle serveur (trigger PostgreSQL) empêchant un rédacteur de publier
seul. Page article avec sommaire généré automatiquement (ancré sur les
`<h2>`), temps de lecture, boutons de partage (WhatsApp, Facebook, Web
Share API), flux RSS.

🟡 L'éditeur de contenu est un simple `<textarea>` HTML, **pas un éditeur
riche** : pas d'interface dédiée pour citations arabes, notes de bas de
page, insertion d'image ou de vidéo en un clic, programmation de
publication (le champ `scheduled_at` existe en base mais rien ne
l'exploite encore), gestion des mots-clés/SEO depuis l'admin.

⬜ Pas de catégories/tags gérables depuis l'interface (seulement en base).

---

## Module 07 — Bibliothèque islamique numérique

✅ Fiches bibliographiques pour six ouvrages de référence réels (Ar-Risâla,
Al-Muwatta', Mukhtasar Khalîl, les deux Sahîh, Ar-Rahîq Al-Makhtûm), avec
les quatre états de droits exactement comme spécifiés. **Aucun lien de
téléchargement fabriqué** : les ouvrages aux droits non vérifiés
n'affichent explicitement aucune option de lecture (vérifié par un test
e2e), ceux en « consultation externe » pointent vers sunnah.com (source
réelle et légitime).

⬜ Pas de lecteur PDF (aucun fichier n'a de droits vérifiés pour l'instant,
donc rien à lire). Pas d'upload de fichier ni de formulaire de
vérification des droits depuis l'admin (`/admin/livres` est en lecture
seule).

---

## Module 08 — Vidéothèque YouTube

✅ Interface complète et honnête : les fiches vidéo de démonstration ont un
`youtubeId` vide et affichent un état « Vidéo à configurer » plutôt qu'un
faux lien. L'administration (`/admin/videos`) permet d'ajouter une vraie
vidéo par URL ou identifiant YouTube, sans clé API, exactement comme
demandé pour la première version.

⬜ Pas d'intégration automatique via l'API YouTube (explicitement reportée
par le cahier des charges lui-même).

---

## Module 09 — Parcours d'apprentissage

✅ Quatre parcours de démonstration, accessibles sans compte, avec étapes
cliquables vers le contenu réel. Barre de progression affichée pour les
visiteurs connectés (lue depuis la table `progress`).

🟡 Rien n'écrit encore dans `progress`/`bookmarks` depuis l'interface
publique (les tables, policies RLS et la lecture existent ; il manque le
bouton « Marquer comme terminé » / « Ajouter aux favoris » sur les pages
de leçon, d'article, de livre).

---

## Fondateur

🟡 Page `/a-propos/fondateur` est un placeholder transparent : aucun texte
biographique n'a été inventé pour éviter une fausse attribution. Elle
attend que le fondateur la rédige et/ou la valide lui-même.

---

## Fiabilité documentaire et back-office (§5-6 du cahier des charges)

✅ Schéma complet (`sources`, `source_references`, `content_references`),
les huit statuts éditoriaux, le trigger qui réserve approbation/publication
aux rôles habilités, `content_revisions`, `editorial_reviews` et
`audit_logs` en base. Rôles cumulables par utilisateur
(`user_roles`), gérables depuis `/admin/utilisateurs` par un administrateur.

🟡 `/admin/sources`, `/admin/livres` et `/admin/cours` sont des vues de
lecture, pas encore des formulaires de création/édition complets (seuls
Articles et Vidéos ont un flux de création/édition entier dans
l'administration actuelle). `content_revisions` et `editorial_reviews`
ont leur schéma et leurs policies, mais rien n'écrit encore dedans.

⬜ Pages statiques éditables depuis l'admin : non commencé (les pages
légales/à propos sont codées en dur).

---

## SEO (§10)

✅ Rendu serveur (Server Components par défaut), URLs lisibles, métadonnées
par page, canonical URLs, `sitemap.xml` et `robots.txt` dynamiques, Open
Graph, Twitter Card, flux RSS du blog, fil d'Ariane sur les pages de
contenu, JSON-LD (`EducationalOrganization` sur tout le site, `Article` +
`BreadcrumbList` sur les articles, `Course` sur les cours de fiqh).

⬜ Pas de données structurées `FAQPage`/`HowTo`, pas de génération d'image
Open Graph dynamique, pas de redirections gérées (pas encore nécessaire,
aucune URL n'a changé). Multilingue (FR/AR/EN) : architecture prête
(`src/lib/site-config.ts` centralise tout le texte de marque) mais aucune
route localisée n'existe encore.

---

## Performance, accessibilité, sécurité (§11)

✅ Lien d'évitement, hiérarchie de titres, `aria-label` sur les contrôles
icône-seule, focus visible partout, animations désactivées sous
`prefers-reduced-motion`, navigation clavier (héritée des primitives
Radix UI, qui implémentent WAI-ARIA). Un vrai bug de contraste a été
trouvé et corrigé pendant le développement : le gold décoratif utilisé
comme couleur de texte sur fond clair ne mesurait que ~2,1:1 (WCAG AA
exige 4,5:1) ; un token `accent-text` plus sombre en mode clair a été
introduit (voir le détail dans l'historique Git).

🟡 Pas d'audit Lighthouse formel effectué (l'environnement de développement
ne permettait pas de mesure représentative d'un environnement de
production réel). Row Level Security active partout, validation côté
serveur dans les Server Actions, mais pas de limitation de débit
(rate limiting) sur les formulaires publics (contact, inscription).

⬜ Pas d'audit WCAG 2.2 AA complet et formel (vérification manuelle
ciblée seulement : contraste, structure sémantique, focus, réduction de
mouvement).

---

## PWA et mobile (§12)

✅ `manifest.ts`, icônes générées (192/512/apple-touch-icon), `theme-color`
clair/sombre, mobile-first vérifié par test e2e (pas de débordement
horizontal) et capture d'écran à 390px de large.

⬜ Pas de service worker / mise en cache hors-ligne (explicitement risqué
sans plan de cache réfléchi — mieux vaut l'absence que mal fait). Pas
d'invite d'installation personnalisée.

Application mobile Expo/React Native : **non développée**, comme demandé.
Voir `docs/MOBILE_ROADMAP.md` pour comment le backend actuel la rend
possible sans réécriture.

---

## Tests (§14)

✅ 15 tests unitaires (Vitest) couvrant les utilitaires, le composant texte
arabe, les badges de fiabilité documentaire, et surtout un test
d'intégrité des données qui **encode la règle de fiabilité documentaire
elle-même** (aucune démo publiée, aucun livre à droits non vérifiés avec
fichier) : un futur contenu qui violerait cette règle casse les tests
plutôt que de se publier silencieusement. 30 tests de bout en bout
(Playwright, desktop + mobile) couvrant la navigation, le rendu RTL de
l'arabe, la recherche, le mode sombre, la protection de `/admin` et
`/compte`, et les statuts de droits de la bibliothèque. Tout passe
(`npm run test` et `npm run test:e2e`).

⬜ Pas de test de l'administration elle-même (créer/modifier un article,
changer un rôle) : nécessiterait un projet Supabase de test dédié,
hors de portée de cette session.

---

## Dette technique et décisions à revisiter

- `src/lib/supabase/database.types.ts` est **écrit à la main**, pas généré
  par la CLI Supabase (voir `docs/INSTALLATION.md` pour la commande de
  régénération une fois le projet lié). Pendant le développement, une
  intersection TypeScript (`Row: {...} & Timestamps`) a cassé
  silencieusement le typage de toutes les requêtes Supabase (tout
  redescendait en `never`) ; corrigé en inlining les champs — un piège à
  connaître si ce fichier est retouché à la main.
- Le design system n'utilise pas la CLI shadcn/ui officielle (réseau non
  disponible pendant le développement) ; voir
  `docs/INSTALLATION.md#pourquoi-pas-la-cli-shadcnui`.
- `lucide-react` (version installée) n'inclut plus d'icônes de marque
  (YouTube, etc.) : un petit pictogramme maison
  (`src/components/icons/youtube-icon.tsx`) les remplace.
- Next.js 16 a renommé `middleware.ts` en `proxy.ts` : si vous cherchez le
  middleware par réflexe, c'est `src/proxy.ts`.
