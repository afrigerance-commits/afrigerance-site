# Déploiement

## Netlify (cible retenue)

Le projet inclut déjà `netlify.toml` et `@netlify/plugin-nextjs` (le
runtime officiel Next.js de Netlify, basé sur
[OpenNext](https://opennext.js.org/netlify)) en devDependency : aucune
configuration supplémentaire n'est nécessaire pour que les Server
Components, les Server Actions, les routes dynamiques (`/admin`, `/compte`,
`/recherche`) et `proxy.ts` (middleware) fonctionnent correctement.

### Déploiement via l'interface Netlify (le plus simple)

1. Poussez le dépôt sur GitHub (déjà fait — branche
   `claude/elegant-wozniak-f2m61x` du dépôt `afrigerance-site`).
2. Sur [app.netlify.com](https://app.netlify.com) : **Add new site → Import
   an existing project**, choisissez GitHub, puis le dépôt.
3. Netlify détecte `netlify.toml` automatiquement : build command
   `npm run build`, plugin Next.js, Node 22. Rien à modifier dans l'écran
   de configuration du build.
4. Avant de cliquer sur **Deploy** (ou ensuite dans **Site configuration →
   Environment variables**), renseignez les mêmes variables que dans
   `.env.example` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_SITE_URL` → l'URL Netlify par défaut d'abord
     (`https://<nom-du-site>.netlify.app`), puis le domaine définitif une
     fois branché (voir plus bas)
   - `NEXT_PUBLIC_CONTACT_EMAIL` → active le formulaire de contact
5. **Deploy site**. Le premier build prend quelques minutes (téléchargement
   des polices Google Fonts pendant le build inclus).

Chaque push sur la branche surveillée redéploie automatiquement ; chaque
pull request obtient un déploiement de prévisualisation séparé.

### Déploiement depuis le terminal (alternative, via la CLI Netlify)

```bash
npm install -g netlify-cli   # une seule fois
netlify login
netlify init                  # relie ce dossier à un site Netlify (nouveau ou existant)
netlify deploy --build --prod # build + déploiement en production
```

`netlify deploy --build` (sans `--prod`) crée un déploiement de
prévisualisation sans toucher au site en production — pratique pour tester
avant de pousser officiellement.

### Domaine personnalisé

Une fois le nom de marque définitif choisi (voir § « Nom provisoire » du
README) et le domaine acheté : **Site configuration → Domain management →
Add a domain**, suivez les instructions DNS de Netlify (soit en déléguant
les serveurs de noms à Netlify, soit avec un enregistrement `CNAME`/`A`
chez votre registrar). Le certificat HTTPS (Let's Encrypt) est
provisionné automatiquement une fois le DNS propagé. N'oubliez pas de
mettre à jour `NEXT_PUBLIC_SITE_URL` avec le nouveau domaine.

### Ce qui ne fonctionne pas encore malgré le déploiement

Le déploiement rend le site public accessible immédiatement (il tourne sur
les données de démonstration locales). `/connexion`, `/compte` et `/admin`
restent inactifs avec un message explicite tant que les variables Supabase
ci-dessus ne sont pas renseignées — voir `docs/INSTALLATION.md` § 3 pour
créer et brancher le projet Supabase, puis § 3.5 pour le premier compte
administrateur.

## Alternatives

Le projet n'utilise aucune fonctionnalité propriétaire à Netlify. Il est
également déployable sur :

- **Vercel** (créateur de Next.js, zéro configuration : importez le dépôt,
  renseignez les mêmes variables d'environnement).
- **Un serveur Node.js classique** : `npm run build && npm run start`
  (nécessite Node 22.12+ et un reverse proxy comme nginx devant).
- **Docker** : pas de `Dockerfile` fourni pour l'instant (voir
  `docs/BILAN.md`) ; un build standard `next build` en mode `standalone`
  (`output: "standalone"` dans `next.config.ts`) suffirait à en construire
  un en quelques lignes. **Ne définissez pas `output: "standalone"` si vous
  déployez sur Netlify** : le plugin `@netlify/plugin-nextjs` gère
  lui-même l'empaquetage et s'attend à la sortie par défaut de `next build`.

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
