# Processus éditorial et vérification religieuse

Ce document explique comment un contenu avance du brouillon à la publication,
et comment publier un nouvel article avec l'administration actuelle.

## 1. Les six types de contenu

Chaque contenu religieux sur la plateforme appartient à l'un de ces types
(`SourceType` dans `src/lib/types/content.ts`), et doit être présenté comme
tel — jamais mélangé :

| Type | Exemple |
|---|---|
| `coran` | Un verset cité avec sourate et numéro de verset |
| `hadith` | Un hadith avec recueil, et si possible numéro et degré d'authenticité |
| `avis_juridique` | Une position attribuée à un auteur/une école (ex. Mukhtasar Khalîl) |
| `recit_historique` | Un fait historique sourcé (ex. Ar-Rahîq Al-Makhtûm) |
| `explication_pedagogique` | Une explication rédigée par l'équipe, sans statut de preuve religieuse |
| `contenu_editorial` | Une réflexion, un avis personnel du fondateur |

**Règle absolue : rien n'est inventé.** Aucune citation, chaîne de
transmission, numéro de hadith, référence bibliographique ou jugement
d'authenticité n'est fabriqué. Quand une information ne peut pas être
vérifiée au moment de la rédaction, le champ `aVerifier: true` d'une
`SourceReference` est activé et un badge « Référence à vérifier » s'affiche
automatiquement (voir `src/components/islamic/reliability-badge.tsx`).

## 2. Les huit statuts éditoriaux

Définis dans `src/lib/site-config.ts` (`editorialStatuses`) et dans l'enum
PostgreSQL `editorial_status` :

1. **Brouillon** — en cours de rédaction.
2. **Références à compléter** — rédigé, mais des citations précises manquent.
3. **En cours de vérification** — les références sont réunies ; un
   vérificateur contrôle leur exactitude.
4. **Vérifié sur le plan documentaire** — les sources sont confirmées
   exactes.
5. **Approuvé pour publication** — validé par un responsable scientifique.
6. **Publié** — visible publiquement.
7. **À réviser** — un problème a été signalé après publication.
8. **Archivé** — retiré de la circulation sans être supprimé.

## 3. Qui peut faire quoi

| Rôle | Peut créer/modifier ses contenus | Peut vérifier des sources | Peut approuver/publier |
|---|---|---|---|
| Rédacteur | ✅ | — | — |
| Vérificateur | ✅ | ✅ | — |
| Responsable scientifique | ✅ | ✅ | ✅ |
| Administrateur | ✅ | ✅ | ✅ (+ gestion des comptes) |

**Ceci n'est pas qu'une convention d'interface.** Le trigger PostgreSQL
`enforce_publish_rights()` (`supabase/migrations/0002_rls.sql`) refuse en
base toute tentative de faire passer un article, un cours, une leçon, une
fiche de savant ou un événement de la Sîra au statut `publie` ou `approuve`
si l'utilisateur n'a pas le rôle `administrateur` ou
`responsable_scientifique` — même en cas de bug ou de contournement de
l'interface.

## 4. Publier un article depuis l'administration actuelle

1. Connectez-vous sur `/connexion`, puis ouvrez `/admin/articles`.
2. **Nouvel article** → renseignez titre, résumé, contenu (HTML simple :
   `<p>`, `<h2>`, pas de `<script>` ni d'attributs `on*=`). L'article est
   créé au statut **Brouillon**.
3. Rouvrez l'article depuis la liste pour l'éditer. Faites-le progresser
   statut par statut au fur et à mesure que vous complétez et vérifiez les
   références.
4. Seul un compte **administrateur** ou **responsable scientifique** peut
   sélectionner **Approuvé** ou **Publié** — tenter de le faire avec un
   autre rôle affiche l'erreur renvoyée par la base de données.
5. Une fois publié, l'article apparaît sur `/blog`, dans le flux RSS
   (`/blog/rss.xml`) et dans `sitemap.xml`.

> **Limite actuelle :** l'éditeur de contenu est un simple champ HTML, pas
> un éditeur visuel riche (pas encore de citations arabes, notes de bas de
> page ou insertion de médias en un clic). Voir `docs/BILAN.md`.

## 5. Ajouter les références d'un contenu

Pour l'instant, l'association fine entre un contenu et ses
`source_references` (sourate/verset, numéro de hadith, page, degré
d'authenticité…) se fait directement en base via **Table Editor** ou **SQL
Editor** dans Supabase, en insérant des lignes dans `sources`,
`source_references` puis `content_references`. Une interface dédiée dans
`/admin` est documentée comme restant à construire (`docs/BILAN.md`).

## 6. Rôle de l'intelligence artificielle

Un assistant IA peut aider à organiser, reformuler et préparer des
brouillons. Il ne s'attribue jamais le rôle de mufti, ne certifie seul
aucune narration et n'invente aucune preuve religieuse. Tout contenu
généré ou retouché avec une IA entre dans le même circuit de vérification
que les autres : il ne peut atteindre le statut **Publié** sans la
validation d'un responsable scientifique humain.
