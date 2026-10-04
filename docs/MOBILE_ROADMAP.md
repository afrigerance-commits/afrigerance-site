# Alternative future : réécriture native complète (Expo / React Native)

> **Ce n'est pas l'approche retenue.** L'application Android/iOS a été
> construite avec Capacitor (voir [docs/MOBILE.md](./MOBILE.md)) : une
> coquille native qui charge le site existant, sans dupliquer le code
> d'interface. Ce document décrit une alternative plus lourde — réécrire
> l'interface en React Native — à envisager seulement si un jour les
> limites de la coquille Capacitor (ex. besoin d'une UI 100% native,
> fonctionnement hors-ligne complet) deviennent bloquantes.

Ce document explique comment l'architecture actuelle a été préparée pour
rendre cette réécriture possible sans toucher au backend, si elle devient
nécessaire un jour.

## Pourquoi c'est déjà possible

- **Toute la logique de données passe par Supabase**, pas par du code
  Next.js côté serveur spécifique aux pages. Le schéma
  (`supabase/migrations/`), les policies Row Level Security
  (`0002_rls.sql`) et l'authentification sont déjà consommables par
  n'importe quel client — web, mobile, ou autre — via les SDK Supabase
  (`@supabase/supabase-js` fonctionne identiquement en React Native).
- **Les règles métier critiques vivent en base, pas dans l'interface.** Le
  trigger qui interdit de publier un contenu sans rôle habilité
  (`enforce_publish_rights`) s'applique quel que soit le client qui tente
  l'opération. Une appli mobile ne pourra pas la contourner.
- **Les types partagés** (`src/lib/types/content.ts`,
  `src/lib/supabase/database.types.ts`) sont de simples fichiers
  TypeScript sans dépendance à Next.js : ils peuvent être publiés comme
  paquet interne partagé, ou simplement copiés dans le projet Expo au
  démarrage.

## Ce qui reste à faire pour démarrer l'application mobile

1. **Créer le projet Expo** (`npx create-expo-app`), en TypeScript, dans un
   dépôt séparé ou un monorepo (`apps/web`, `apps/mobile`, `packages/shared`).
2. **Extraire dans `packages/shared`** : les types de `src/lib/types/` et
   `src/lib/supabase/database.types.ts`, et une fine couche de fonctions
   d'accès aux données (aujourd'hui des appels Supabase directs dans les
   Server Components/Actions) pour qu'elles soient appelables aussi bien
   depuis un Server Component Next.js que depuis un hook React Native.
3. **Authentification** : `@supabase/supabase-js` avec un stockage de
   session adapté à React Native (`expo-secure-store` plutôt que les
   cookies utilisés côté web par `@supabase/ssr`).
4. **Navigation** : reproduire la hiérarchie de routes actuelle
   (`/explorer-le-savoir`, `/fiqh/malikite/[course]/[lesson]`, etc.) avec
   Expo Router, qui suit une convention de fichiers proche de celle de
   Next.js App Router.
5. **Design system** : les tokens de couleur et de typographie
   (`src/app/globals.css`) sont la référence ; ils devront être portés en
   valeurs JavaScript pour React Native (pas de CSS côté mobile). Les
   composants eux-mêmes (construits sur Radix UI, web uniquement) ne sont
   **pas réutilisables tels quels** et devront être réécrits avec des
   primitives React Native ou une bibliothèque comme Tamagui/NativeWind.
6. **Lecture hors-ligne et notifications push** : hors du périmètre
   actuel ; à spécifier séparément une fois le socle mobile posé.

## Non objectifs pour cette feuille de route

- Partager le code d'interface (JSX web) tel quel avec le mobile : ce
  n'est pas l'approche retenue ici (contrairement à une stack 100% React
  Native Web). Seules les données et la logique métier sont prévues pour
  être partagées.
- Dupliquer les règles de permission côté client mobile : elles restent
  dans PostgreSQL via Row Level Security, un seul endroit à maintenir.
