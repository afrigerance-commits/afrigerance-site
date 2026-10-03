<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projet AFRIGÉRANCE

- Site en français. Les textes, liens et menus vivent dans `src/content/` (site.ts, services.ts, pages.ts, forms.ts), les couleurs dans `src/app/globals.css` (`@theme`). Ne pas écrire de texte en dur dans les composants.
- Logo : utiliser uniquement le fichier original (`brand/`, version recadrée dans `src/assets/`). Ne jamais le redessiner.
- Logos partenaires (`src/content/partners.ts`, fichiers dans `public/partenaires/`) : uniquement des organisations réelles ayant donné leur accord, fichiers fournis par AFRIGÉRANCE. Jamais de logo d'exemple ou deviné. Section masquée si la liste est vide.
- Ne jamais inventer de client, chiffre, tarif, certification, témoignage ou coordonnée. Les coordonnées publiques ne se renseignent que dans `contactDetails` (site.ts), une fois confirmées.
- Formulaires : la validation est partagée navigateur/serveur (`src/lib/forms/`). Le succès ne s'affiche que si la demande est réellement enregistrée en base (`src/lib/server/handleSubmission.ts`). L'email n'est qu'une notification : son échec est conservé sur la demande, jamais bloquant. Ne jamais simuler une réussite ni exposer une clé côté navigateur (variables dans `.env.example`).
- Base de données : PostgreSQL via le pilote `postgres`. Toute évolution du schéma passe par un nouveau fichier `db/migrations/NNNN_*.sql` (ne jamais modifier une migration déjà appliquée).
- Administration (`/admin`) : chaque page, action serveur et fonction d'accès aux données appelle `requireAdmin()`. Aucun mot de passe dans le code ; comptes créés par `npm run admin:create`. Textes dans `src/content/admin.ts`.
- Hébergement : Netlify, branche publiée `main` (fusion par pull request). L'IP du visiteur vient de `x-nf-client-connection-ip` (`src/lib/server/ip.ts`) ; ne pas faire confiance aux en-têtes fournis par le visiteur.
- Aucun lien `#` sans fonction : chaque lien pointe vers une route ou une ancre existante.
- Services : deux pôles uniquement, « Infogérance » et « Intégration de solutions technologiques ».
- Vérifier le rendu à 1440, 768 et 390 px, sans défilement horizontal, et mettre à jour `docs/etat-cahier-des-charges.md`.
- Tests : `npm run test:e2e` (Playwright, dossier `tests/e2e/`, base `TEST_DATABASE_URL` dont le nom contient « test », faux service Resend local). Les lancer avant tout commit qui touche les pages, les formulaires, la base, l'administration ou l'email ; ajouter un test pour chaque nouvelle fonctionnalité. Ne jamais supprimer, désactiver ni affaiblir un test pour le faire passer.
