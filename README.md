# Bayt Al-'Ilm (بيت العلم) — *nom de travail provisoire*

> « Un espace où la connaissance se transmet avec rigueur, où chaque enseignement
> est accompagné de ses références et où le savoir devient accessible à tous. »

Une plateforme francophone pour apprendre les sciences islamiques — Coran et
tafsîr, hadith, fiqh malikite, sîra prophétique, histoire et grandes figures —
avec une bibliothèque documentée, une académie de fiqh structurée par leçons,
une vidéothèque reliée à YouTube et un blog éditorial.

**Le nom « Bayt Al-'Ilm » est provisoire.** Toute l'identité de marque passe
par [`src/lib/site-config.ts`](./src/lib/site-config.ts) : un renommage se
fait en un seul endroit.

---

## État du projet

Ceci est une **première version fonctionnelle de bout en bout**, pas un
produit fini. Avant de continuer, lisez **[docs/BILAN.md](./docs/BILAN.md)**
pour un état honnête de ce qui est réellement opérationnel et de ce qui reste
à construire. En résumé :

- Le site public (accueil, 12 disciplines, académie de fiqh malikite,
  bibliothèque, sîra, compagnons, blog, vidéothèque, parcours d'apprentissage,
  pages légales) est entièrement navigable et fonctionne **sans base de
  données**, à partir de données de démonstration typées
  (`src/lib/data/*.ts`), clairement signalées comme telles.
- Le schéma de base de données, l'authentification, les permissions par
  rôle et un back-office (articles, vidéos, utilisateurs) sont codés et
  fonctionnels **dès que Supabase est configuré** (voir
  [docs/INSTALLATION.md](./docs/INSTALLATION.md)).
- Aucun contenu religieux de démonstration n'est marqué « publié » : tout
  est en attente de relecture humaine, conformément à la politique
  éditoriale du projet.

## Pile technique

| Couche | Choix |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19, TypeScript strict) |
| Style | Tailwind CSS v4, composants maison dans le style shadcn/ui sur primitives [Radix UI](https://www.radix-ui.com) |
| Animations | [Motion for React](https://motion.dev), respect de `prefers-reduced-motion` |
| Données | PostgreSQL via [Supabase](https://supabase.com) (base + auth + Row Level Security) |
| Tests | [Vitest](https://vitest.dev) + Testing Library (unitaires), [Playwright](https://playwright.dev) (bout en bout) |

Le choix de shadcn/ui « maison » plutôt que la CLI officielle est documenté
dans [docs/INSTALLATION.md](./docs/INSTALLATION.md#pourquoi-pas-la-cli-shadcnui) —
en résumé, le réseau de l'environnement de build n'autorisait pas l'accès à
`ui.shadcn.com` ; les composants ont été écrits à la main sur les mêmes
primitives Radix, avec la même API.

## Démarrage rapide

```bash
npm install
npm run dev        # http://localhost:3000
```

Le site public fonctionne immédiatement, sans aucune configuration. Pour
activer l'authentification et l'administration, voir
[docs/INSTALLATION.md](./docs/INSTALLATION.md).

### Scripts disponibles

```bash
npm run dev          # serveur de développement
npm run build        # build de production
npm run start         # sert le build de production
npm run lint          # ESLint
npm run test           # tests unitaires (Vitest)
npm run test:watch     # tests unitaires en mode watch
npm run test:e2e       # tests de bout en bout (Playwright — nécessite `npx playwright install`)
```

## Structure du dépôt

```
src/
  app/                  Routes Next.js (App Router) — pages publiques, /admin, /compte, API routes
  components/
    ui/                 Primitives de design system (bouton, carte, dialog, select…)
    islamic/            Composants spécifiques au contenu religieux (texte arabe, citation
                         coranique, badges de fiabilité documentaire, géométrie du hero)
    content/            Cartes et listes de contenu (article, livre, cours, vidéo, chronologie…)
    layout/             Header, footer, navigation
    admin/, forms/       Formulaires d'administration et d'authentification
    motion/              Wrapper d'animation au défilement
  lib/
    data/               Données de démonstration typées (source de vérité tant que Supabase
                         n'est pas branché à l'administration)
    supabase/           Clients Supabase (navigateur/serveur) + types générés à la main
    actions/            Server Actions (auth, articles, vidéos, rôles)
    types/               Types TypeScript partagés avec le schéma de données
  proxy.ts               Middleware (renommé "proxy" par Next.js 16) : rafraîchit la session
                          et protège /admin et /compte
supabase/
  migrations/            Schéma SQL complet + policies Row Level Security
  seed.sql               Données d'amorçage minimales (disciplines, catégories, permissions)
tests/
  unit/                  Tests Vitest
  e2e/                   Tests Playwright
docs/                    Documentation détaillée (voir ci-dessous)
```

## Documentation

- **[docs/BILAN.md](./docs/BILAN.md)** — état honnête : fonctionnalités terminées, partielles,
  non commencées.
- **[docs/INSTALLATION.md](./docs/INSTALLATION.md)** — installation locale, configuration Supabase,
  attribution du premier compte administrateur.
- **[docs/EDITORIAL_WORKFLOW.md](./docs/EDITORIAL_WORKFLOW.md)** — processus de vérification
  religieuse et guide de publication d'un article ou d'un cours.
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** — déploiement en production.
- **[docs/MOBILE_ROADMAP.md](./docs/MOBILE_ROADMAP.md)** — comment construire l'application
  mobile Expo/React Native sur le même backend.

## Principes du projet

- **Rigueur documentaire avant tout.** Le code et les données distinguent
  systématiquement texte coranique, hadith référencé, avis juridique attribué,
  récit historique sourcé et explication pédagogique. Rien n'est inventé :
  une référence non vérifiée porte la mention explicite « Référence à
  vérifier » plutôt que d'être présentée comme certaine.
- **Validation humaine obligatoire.** Aucun contenu religieux ne peut passer
  au statut « Publié » ou « Approuvé » sans un compte administrateur ou
  responsable scientifique — appliqué par un trigger PostgreSQL, pas
  seulement par l'interface.
- **Référentiel malikite assumé, sans dénigrement.** Voir
  `/a-propos/referentiel-malikite` sur le site.

## Licence et contenu tiers

Le code de ce dépôt n'a pas de licence définie pour l'instant — à décider
par le fondateur. Les ouvrages, vidéos et citations tiers référencés sur la
plateforme restent la propriété de leurs auteurs et éditeurs respectifs ;
voir la politique éditoriale (`/a-propos/politique-editoriale`) et le statut
de droits affiché sur chaque fiche de la bibliothèque.
