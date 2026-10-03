# Installation

## 1. Prérequis

- Node.js 22.12 ou plus récent (voir `.nvmrc` si présent, sinon `node -v`).
- npm (fourni avec Node).
- Un compte [Supabase](https://supabase.com) gratuit, uniquement nécessaire pour
  l'authentification et l'administration (voir § 3).

## 2. Lancer le site public (sans Supabase)

```bash
npm install
npm run dev
```

Ouvrez `http://localhost:3000`. Toutes les pages publiques (accueil, sciences
islamiques, académie de fiqh malikite, bibliothèque, sîra, compagnons, blog,
vidéothèque, parcours d'apprentissage, pages légales) fonctionnent
immédiatement à partir des données de démonstration de `src/lib/data/*.ts`.

Les pages `/connexion`, `/inscription`, `/compte` et `/admin` redirigent
proprement avec un message explicite tant que Supabase n'est pas configuré
(elles ne plantent pas).

## 3. Configurer Supabase (authentification + administration)

### 3.1. Créer le projet

1. Créez un projet sur [supabase.com](https://supabase.com) (offre gratuite
   suffisante pour démarrer).
2. Dans **Project Settings → API**, notez l'**URL** du projet et la clé
   **anon/public**.

### 3.2. Copier les variables d'environnement

```bash
cp .env.example .env.local
```

Renseignez dans `.env.local` :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

`.env.local` n'est jamais commité (voir `.gitignore`). Ne partagez jamais ces
valeurs ni votre clé `SUPABASE_SERVICE_ROLE_KEY` dans une conversation ou un
dépôt public.

### 3.3. Appliquer le schéma de base de données

Avec la [CLI Supabase](https://supabase.com/docs/guides/cli) :

```bash
npx supabase login
npx supabase link --project-ref xxxxx   # référence de votre projet
npx supabase db push                     # applique supabase/migrations/*.sql
```

Ou, sans la CLI : ouvrez **SQL Editor** dans le tableau de bord Supabase et
exécutez, dans l'ordre, le contenu de :

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_rls.sql`
3. `supabase/seed.sql` (optionnel — amorce les disciplines, catégories et la
   table `permissions`)

### 3.4. Régénérer les types TypeScript (recommandé)

`src/lib/supabase/database.types.ts` est actuellement **écrit à la main**
pour correspondre au schéma SQL. Une fois le projet lié, régénérez-le pour
rester synchronisé avec la base réelle :

```bash
npx supabase gen types typescript --linked > src/lib/supabase/database.types.ts
```

> Si vous régénérez ce fichier, vérifiez qu'il compile (`npm run build`) :
> le typage généré par la CLI Supabase diffère légèrement de la version
> écrite à la main (voir la note dans le fichier).

### 3.5. Créer le premier compte administrateur

1. Démarrez le site (`npm run dev`) et inscrivez-vous sur `/inscription`
   avec l'e-mail du fondateur.
2. Dans le tableau de bord Supabase, **Table Editor → profiles**, retrouvez
   la ligne créée et copiez son `id` (UUID).
3. Toujours dans **Table Editor → user_roles**, ajoutez une ligne :
   - `user_id` : l'UUID copié à l'étape précédente
   - `role` : `administrateur`

Reconnectez-vous : `/admin` est maintenant accessible, avec la gestion des
rôles pour attribuer ensuite rédacteur / vérificateur / responsable
scientifique à d'autres comptes directement depuis `/admin/utilisateurs`.

## 4. Lancer les tests

```bash
npm run test          # tests unitaires (Vitest) — aucune configuration requise
npx playwright install   # une seule fois : télécharge les navigateurs de test
npm run test:e2e       # tests de bout en bout (nécessite `npm run dev` ou démarre son propre serveur)
```

## Pourquoi pas la CLI shadcn/ui ?

Le design system (`src/components/ui/*`) suit volontairement les mêmes
conventions que [shadcn/ui](https://ui.shadcn.com) — composants copiés dans
le dépôt plutôt qu'importés d'un paquet, construits sur les primitives
[Radix UI](https://www.radix-ui.com), avec `class-variance-authority` et
`tailwind-merge`. Ils ont été écrits à la main plutôt que générés par
`npx shadcn@latest init`, car l'environnement où ce projet a été initialisé
n'autorisait pas l'accès réseau à `ui.shadcn.com`. Si vous voulez ajouter un
nouveau composant shadcn/ui dans un environnement qui a accès à ce domaine,
`npx shadcn@latest add <composant>` fonctionnera normalement et s'intégrera
sans conflit (même structure de dossiers, mêmes conventions de classes).
