# MIRÂTH — préparation du déploiement Netlify

## Branche et build

- Dépôt : `afrigerance-commits/afrigerance-site`.
- Branche du projet : `claude/elegant-wozniak-f2m61x`. Ne pas configurer `main` comme branche de production de ce site.
- Node 22 ; installation depuis `package-lock.json` avec `npm ci` ; commande de build `npm run build`.
- `netlify.toml` inclut déjà le plugin Next.js. Aucun `next export` ni dossier `out` : ce projet emploie des routes serveur.
- Vérifier le dernier journal de déploiement Netlify avant de déclarer le site opérationnel.

## Variables Netlify

1. Définir `NEXT_PUBLIC_SITE_URL` sur l'URL canonique **réelle** du site, sans barre finale (nom de domaine ou URL Netlify effectivement attribuée). Le code utilise cette valeur pour sitemap, RSS et liens canoniques.
2. Les pages publiques locales, le Coran et les collections de hadith fonctionnent sans connexion Supabase. Pour administrer et publier les blogs, définir `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans Netlify, puis redéployer. Le contenu approuvé est ensuite lu directement depuis Supabase sans nouveau commit.
3. Avant de configurer Supabase en production, vérifier dans le projet `qesvpcmbjjtlyntfoxsu` que `0002_rls.sql` et `seed.sql` ont été appliqués et que les politiques RLS correspondent à la migration versionnée. Seule `0001_init.sql` est confirmée dans la passation. Ne pas déduire l'état de la base de la présence des fichiers SQL dans Git.
4. Ne jamais mettre une clé `SUPABASE_SERVICE_ROLE_KEY` dans une variable `NEXT_PUBLIC_*`, dans Git ou dans une page du site. N'ajouter une clé serveur que si une fonction réellement utilisée l'exige.

## Parcours de validation

- Vérifier `/`, `/coran`, une sourate, `/hadith`, un chapitre, `/fiqh/malikite`, `/bibliotheque`, `/blog`, `/sitemap.xml` et `/blog/rss.xml` sur l'URL Netlify réelle.
- Les quatre articles du lot 01 sont sous `/admin/brouillons`. Après relecture, ouvrir un article, cliquer « Préparer la validation dans l’éditeur », corriger le texte et les références dans `/admin/articles/[id]`, cocher la confirmation de relecture, puis choisir « Approuvé » (encore privé) ou « Publié » (visible immédiatement). Le compte doit porter le rôle `administrateur` ou `responsable_scientifique`. La création du premier rôle est décrite dans `docs/INSTALLATION.md` § 3.5. Sans Supabase configuré et sans RLS vérifiée, le dossier de lecture reste le moyen de relire les textes ; l’interface de publication n'est pas disponible.
- Les anciennes leçons de fiqh, chronologies de Sîra et biographies encore non approuvées ne sont plus routées publiquement ; leurs index expliquent le travail de vérification. Les parcours publics renvoient désormais au Coran, aux recueils de hadith et aux notices de bibliothèque. Les vidéos sans URL authentique sont masquées.
- La revue humaine doit contrôler le fond religieux et les références ; elle précède tout changement de statut vers `approuve` ou `publie`. La validation du déploiement technique ne vaut pas approbation religieuse des articles.
- Tester le lecteur audio sur deux versets de sourates différentes avec Alafasy. Les autres récitants ne sont pas tous confirmés. Ne pas annoncer une synchronisation correcte sans écoute effective.
- Contrôler à 360 px et sur ordinateur les menus, les cartes, le contraste et le respect de `prefers-reduced-motion`.

## État non couvert par le build

La compilation native Capacitor n'est pas incluse dans ce déploiement web. `capacitor.config.ts` contient une URL provisoire qu'il faudra remplacer par l'URL finale avant une compilation mobile. Les scans et traductions du dossier privé `references_mirath/` restent exclus de Git et du site public.
