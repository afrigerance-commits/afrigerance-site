# Déploiement

## Recommandation : Vercel

Le projet est un Next.js App Router standard ; [Vercel](https://vercel.com)
(créateur de Next.js) est la cible la plus simple et dispose d'une offre
gratuite suffisante pour démarrer.

1. Poussez le dépôt sur GitHub (déjà fait si vous lisez ceci depuis le dépôt
   de travail).
2. Sur [vercel.com](https://vercel.com), **Add New → Project**, importez le
   dépôt.
3. Dans **Environment Variables**, renseignez (voir `.env.example`) :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` → l'URL définitive du site (nécessaire pour un
     sitemap et des URLs canoniques corrects)
   - `NEXT_PUBLIC_CONTACT_EMAIL` → active le formulaire de contact
4. Déployez. Build command et output sont détectés automatiquement
   (`next build`).

### Domaine personnalisé

Une fois le nom de marque définitif choisi (voir § « Nom provisoire » du
README) et le domaine acheté, ajoutez-le dans **Project Settings →
Domains** sur Vercel, et mettez à jour `NEXT_PUBLIC_SITE_URL`.

## Alternatives

Le projet n'utilise aucune fonctionnalité propriétaire à Vercel (pas
d'Edge Config, pas de Vercel KV/Blob). Il est également déployable sur :

- **Netlify** (adaptateur Next.js officiel).
- **Un serveur Node.js classique** : `npm run build && npm run start`
  (nécessite Node 22.12+ et un reverse proxy comme nginx devant).
- **Docker** : pas de `Dockerfile` fourni pour l'instant (voir
  `docs/BILAN.md`) ; un build standard `next build` en mode `standalone`
  (`output: "standalone"` dans `next.config.ts`) suffirait à en construire
  un en quelques lignes.

Quelle que soit la cible, Supabase reste un service externe séparé : seules
les variables d'environnement changent.

## Base de données Supabase en production

- Utilisez un projet Supabase dédié à la production, distinct de celui de
  développement.
- Appliquez les migrations (`supabase/migrations/*.sql`) avant le premier
  déploiement — voir `docs/INSTALLATION.md` § 3.3.
- Activez les sauvegardes automatiques dans **Project Settings →
  Database → Backups** (l'offre gratuite Supabase conserve un historique
  limité ; passer à un plan payant est recommandé avant mise en production
  réelle, **mais reste une décision du fondateur, pas une action
  automatique**).
- Row Level Security est déjà activé sur toutes les tables par
  `0002_rls.sql` : ne la désactivez jamais, même temporairement pour
  déboguer.

## Checklist avant mise en ligne publique

- [ ] `NEXT_PUBLIC_SITE_URL` pointe vers le domaine définitif.
- [ ] Un compte administrateur réel existe (voir
      `docs/INSTALLATION.md` § 3.5) ; aucun admin de test en production.
- [ ] Les pages `/confidentialite` et `/conditions-utilisation` ont été
      relues par un professionnel du droit (elles portent actuellement un
      badge « Ébauche » explicite à cet effet).
- [ ] Aucun contenu religieux de démonstration n'est resté au statut
      « Publié » sans relecture réelle (le test
      `tests/unit/data-integrity.test.ts` vérifie cette règle pour les
      données locales, pas pour le contenu déjà saisi en base).
- [ ] Les icônes (`public/icon-192.png`, `icon-512.png`,
      `apple-touch-icon.png`) ont été remplacées par la vraie identité
      visuelle si le nom de marque a changé.
