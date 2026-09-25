<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Projet AFRIGÉRANCE

- Site en français. Les textes, liens et menus vivent dans `src/content/` (site.ts, services.ts, pages.ts, forms.ts), les couleurs dans `src/app/globals.css` (`@theme`). Ne pas écrire de texte en dur dans les composants.
- Logo : utiliser uniquement le fichier original (`brand/`, version recadrée dans `src/assets/`). Ne jamais le redessiner.
- Ne jamais inventer de client, chiffre, tarif, certification, témoignage ou coordonnée. Les coordonnées publiques ne se renseignent que dans `contactDetails` (site.ts), une fois confirmées.
- Formulaires : la validation est partagée navigateur/serveur (`src/lib/forms/`). Le succès ne s'affiche que si le serveur confirme l'envoi réel (`src/lib/server/`, variables dans `.env.example`). Ne jamais simuler une réussite ni exposer une clé côté navigateur.
- Aucun lien `#` sans fonction : chaque lien pointe vers une route ou une ancre existante.
- Services : deux pôles uniquement, « Infogérance » et « Intégration de solutions technologiques ».
- Vérifier le rendu à 1440, 768 et 390 px, sans défilement horizontal, et mettre à jour `docs/etat-cahier-des-charges.md`.
