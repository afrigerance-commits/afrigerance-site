# Dossier de passation — Bayt Al-'Ilm / Mirâth

Document destiné à un autre outil IA (Codex/GPT) qui reprend ce projet sans
l'historique de conversation. Tout ce qui suit est vérifié dans le code au
4 octobre 2026, pas une estimation.

## 1. Dépôt et déploiement

- **Repo** : `afrigerance-commits/afrigerance-site` (GitHub)
- **Branche de travail** : `claude/elegant-wozniak-f2m61x` — tout le travail est dessus, jamais sur `main` directement
- **Stack** : Next.js 16.3.8 (App Router, Turbopack), TypeScript strict, React 19, Tailwind CSS v4, Supabase (Postgres + Auth + RLS), `motion/react` (Framer Motion) pour les animations
- ⚠️ **Next.js 16 a des ruptures par rapport aux versions connues** : `middleware.ts` → `proxy.ts` (export `proxy`), `params`/`searchParams` sont des `Promise`, types `PageProps<'/route'>` générés. Toujours vérifier `node_modules/next/dist/docs/` avant de coder dans ce projet.
- **Déploiement** : Netlify, via `netlify.toml` (déjà configuré, `@netlify/plugin-nextjs`). Le site a été déployé par l'autrice (projet Netlify "afrigerance-site" créé manuellement, branche `claude/elegant-wozniak-f2m61x`).
- **Supabase** : projet créé — ref `qesvpcmbjjtlyntfoxsu`, région EU West (Irlande). URL : `https://qesvpcmbjjtlyntfoxsu.supabase.co`. Migrations `supabase/migrations/0001_init.sql` exécutée avec succès (confirmé). **Statut de `0002_rls.sql` et `supabase/seed.sql` non confirmé explicitement par l'autrice dans la conversation — à vérifier avant de s'appuyer dessus.** Les clés (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) n'ont probablement pas encore été ajoutées dans les variables d'environnement Netlify — le site fonctionne sans elles car `src/lib/supabase/env.ts` expose `isSupabaseConfigured`, et tout le contenu public tourne sur des fichiers TS locaux (`src/lib/data/*.ts`), pas sur Supabase.

## 2. Règle non négociable du projet

**Ne jamais fabriquer de contenu religieux** (texte coranique, texte de hadith, numéro/grade de hadith, citation, date). Tout texte religieux vient soit (a) d'un jeu de données ouvert et sourcé, soit (b) d'un extrait fourni directement par l'autrice depuis un livre qu'elle possède, retranscrit fidèlement avec pagination précise vers la page source. Quand une info manque, le champ reste marqué `aVerifier: true` plutôt que d'être complété de mémoire. Le madhhab malikite est la référence fiqh par défaut, sans dénigrer les autres écoles.

## 3. Ce qui est fait et vérifié (build + lint + tests passent)

- **Coran complet** (`/coran`) : 114 sourates, texte arabe uthmani (Hafs, complexe Roi Fahd) + traduction française Hamidullah, source Tanzil via `github.com/fawazahmed0/quran-api`. Fichiers : `data/quran/*.json`, lecteur `src/lib/quran/data.ts`.
  - **Lecteur audio verset par verset** : `src/components/islamic/quran-audio-player.tsx`. Source : API ouverte Al Quran Cloud / `cdn.islamic.network`. **Seul le récitateur Mishary Alafasy (`ar.alafasy`) est confirmé correct en production.** Abdul Basit et Shuraim ont été retirés après test : le son jouait mais sur le **mauvais verset** (indexation différente côté CDN, non élucidée). Husary et Minshawi restent dans la liste mais ne sont pas confirmés non plus — à tester avant d'y faire confiance. Voir `src/lib/quran/reciters.ts` pour le détail et l'historique du bug.
  - Surlignage + défilement automatique du verset en cours : `src/components/islamic/quran-verse-row.tsx`.
  - Sélecteur de sourate (dropdown des 114) : `src/components/islamic/sourate-switcher.tsx`.
- **Hadith complet** (`/hadith`) : Muwatta' (1858 hadiths), Sahîh Al-Bukhârî (7589), Sahîh Muslim (7563), arabe + français, source `github.com/fawazahmed0/hadith-api`. Fichiers : `data/hadith/{malik,bukhari,muslim}/`, lecteur `src/lib/hadith/data.ts`. Pagination à 20 hadiths/page.
- **Fiqh malikite** (`/fiqh/malikite/purification`) : 5 leçons désormais sourcées du **Mukhtasar al-Akhdari** (trad. Ali Abdullah Gallant, Institut islamique Daroul Îmane, Fès, 2017) — eau/purification, ablutions, ghusl (nouvelle leçon), tayammum. Chaque leçon cite la page PDF source. Fichier : `src/lib/data/fiqh.ts`. `statut: "en_cours_de_verification"` partout — **pas encore comparé mot à mot au PDF par un humain, pas encore validé par un responsable scientifique.** Ne jamais passer à `"publie"`/`"approuve"` sans validation humaine explicite.
- **Design/motion design** : palette émeraude `#123F38`/bleu nuit `#091C2B`/or `#C6A667`/ivoire `#F8F5EE` déjà en place. Typographies : Fraunces (titres), Work Sans (corps FR), Amiri (citations coraniques), Noto Naskh Arabic (arabe courant). Signature de motion design : `src/components/motion/light-divider.tsx` (point de lumière qui traverse une ligne à l'entrée dans le viewport, posé sur les pages d'entrée Coran/Hadith/Fiqh/Sîra/Bibliothèque — utilisé avec parcimonie, pas à chaque section). Transition de page avec halo doré : `src/components/motion/page-transition.tsx`. Tout respecte `prefers-reduced-motion`.
- **Mobile** : scaffolding Capacitor présent (`android/`, `ios/`, `capacitor.config.ts`) — l'app charge le site déployé dans une coquille native plutôt qu'une réécriture React Native. **Pas compilée** (pas de SDK Android/Xcode dans l'environnement qui a fait ce travail). `capacitor.config.ts` pointe vers une URL placeholder `https://afrigerance-site.netlify.app` — **à remplacer par l'URL réelle avant de compiler**. Voir `docs/MOBILE.md`.

## 4. Sources fournies par l'autrice — `references_mirath/` (PAS dans Git)

Zippée et envoyée hors ligne le 4 octobre 2026, extraite localement dans `references_mirath/` à la racine du repo. **Ce dossier est dans `.gitignore`** — droits non établis pour republier les scans tels quels. Si Codex travaille dans un environnement différent, il faut que l'autrice renvoie ces fichiers.

| Sous-dossier | Contenu | État |
|---|---|---|
| `01_SOURCES_TEXTUELLES/al_akhdari/` | Mukhtasar al-Akhdari, 134 pages, déjà en Markdown OCR | **Exploité** → `/fiqh/malikite/purification` |
| `01_SOURCES_TEXTUELLES/cours_fiqh_malikite/` | 92 pages, Markdown OCR | Non exploité |
| `01_SOURCES_TEXTUELLES/sahih_bukhari_kassab_t1/` | Sahîh Al-Bukhârî trad. Kassab, tome 1, 311 pages, Markdown OCR | Non exploité |
| `01_SOURCES_TEXTUELLES/ibn_kathir_histoires_prophetes/` | 444 pages, Markdown OCR | Non exploité |
| `01_SOURCES_TEXTUELLES/tazawwudu_ss_sighar/` | Texte spirituel (vers), 20 pages reçues | Non exploité |
| `02_SOURCES_SCANNEES/al_risala/` | Ar-Risâla d'Ibn Abî Zayd Al-Qayrawânî, 8 PDF (144 pages), **scans images, pas de texte** | Non transcrit |
| `02_SOURCES_SCANNEES/le_nectar_cachete/` | Ar-Rahîq Al-Makhtûm, 16 PDF (~440+ pages), **scans images, pas de texte** | Non transcrit |

**Important** : le prompt de travail original (fourni par l'autrice, `d4542ccf-PROMPT_MIRATH_POUR_CLAUDE.md`, probablement encore en sa possession) référence aussi `00_COMMENCER_ICI/` (README, `bibliographie_et_droits.json`, `plan_navigation.json`, `BRIEFS_CONTENUS_INITIAUX.md`) et `03_VISUELS_ORIGINAUX/` (8 compositions SVG/PNG : hero, purification, chronologie Sîra, etc.) — **ni l'un ni l'autre n'est arrivé dans les fichiers reçus**. Les 8 visuels montrés dans la conversation ne sont qu'un aperçu composite (image unique), pas des fichiers utilisables individuellement.

## 5. Reste à faire (rien commencé au-delà de la liste ci-dessus)

Dans l'ordre suggéré par le prompt original :
1. **Hadith** (`/hadith`) : exploiter `sahih_bukhari_kassab_t1` pour des fiches thématiques, en expliquant la différence entre le recueil originel et cette compilation française, avec avertissement sur les variations d'éditions.
2. **Sîra** (`/sira`) : transcrire les scans `le_nectar_cachete` (aucun outil OCR automatique fiable disponible dans l'environnement précédent — lecture visuelle page par page nécessaire, ex. via le Read tool sur PDF). Ne jamais inventer de dialogue ni représenter le Prophète ﷺ.
3. **Histoires des prophètes** (nouvelle section `/histoires-des-prophetes` à créer) : à partir d'`ibn_kathir_histoires_prophetes`.
4. **Spiritualité/Aqîda/Apprendre** : à partir de `tazawwudu_ss_sighar`.
5. **Bibliothèque** (`/bibliotheque`) : fiches bibliographiques pour tous ces ouvrages, couvertures abstraites originales (pas les couvertures d'édition, droits non établis), PDF jamais en téléchargement public sans preuve de droits.
6. **Ar-Risâla** : transcrire les scans avant exploitation dans `/fiqh/malikite`.
7. Étendre `LightDivider`/chorégraphies de cartes aux nouvelles pages créées.

## 6. Schéma éditorial actuel (ne correspond que partiellement aux attentes du prompt original)

Le prompt original demande des états `draft/source_review/religious_review/approved/published/needs_revision`. **Le site actuel n'a que** l'enum `EditorialStatus` dans `src/lib/site-config.ts` (`brouillon/references_a_completer/en_cours_de_verification/verifie/approuve/publie/a_reviser/archive`) et un flag `demonstration`/`DemoFlag`. Pas de vrai back-office connecté pour ce contenu local (`src/lib/data/*.ts`) — contrairement au contenu Supabase (articles, cours en base) qui a un vrai trigger PostgreSQL `enforce_publish_rights` empêchant la publication sans rôle `administrateur`/`responsable_scientifique`. Si Codex doit implémenter un vrai pipeline éditorial pour ce contenu local, il faudra soit migrer ces données vers Supabase, soit construire un mécanisme équivalent — ne pas supposer qu'il existe déjà.

## 7. Contact/contexte propriétaire

L'autrice travaille seule (pas d'équipe éditoriale), possède physiquement les livres sources, ne peut pas tester le son depuis un environnement sandbox (réseau bloqué côté outil IA précédent — `cdn.islamic.network`, `mp3quran.net`, `everyayah.com` tous inaccessibles depuis ce sandbox, seul `raw.githubusercontent.com` et `api.github.com` l'étaient). Elle teste elle-même en production sur le site déployé et remonte les résultats.
