# MIRÂTH — statistiques facultatives de fréquentation

## Livraison

Code publié sur https://miraath.netlify.app le 11 octobre 2026 après le signal « signal lancé ». Commit de production : `91074b3a067f28410bd44726b1f0fa90910f2bd1`. Accès prévu : Administration → Statistiques (`/admin/statistiques`), uniquement pour le rôle administrateur. La collecte n’est pas activée : migration Supabase et secret serveur requis.

## Fonctionnement

Périodes aujourd’hui, 7 jours et 30 jours, selon les journées UTC (Dakar). Visiteurs estimés aujourd’hui, visiteurs quotidiens en moyenne, visites et pages vues sur la période ; évolution quotidienne, dix pages les plus consultées, appareils et provenance générale des pages vues. La provenance « Interne » correspond à une navigation dans le site, pas à une acquisition extérieure. Les pays ne sont pas collectés.

Le navigateur doit autoriser explicitement les statistiques. Refus et retrait possibles dans Confidentialité ; DNT et Global Privacy Control empêchent l’envoi. La collecte est désactivée par défaut et les chiffres ne sont pas simulés lorsque la configuration manque.

Identifiants aléatoires renouvelés chaque jour, jamais liés au compte. Une visite change après 30 minutes d’inactivité ou au changement de jour. Ne mesure pas des personnes uniques sur un mois. Les bloqueurs, refus, visites hors connexion et robots connus diminuent le décompte. Les chiffres peuvent être manipulés par des clients malveillants : ils ne servent pas de preuve de facturation ni de mesure antifraude.

Liste explicite de chemins publics, sans paramètres d’URL ; compte, administration et recherche exclus. Aucun formulaire, note, texte recherché, adresse IP, courriel ou user-agent brut stocké. L’API ignore les cookies et le proxy ne rafraîchit aucune session de compte sur cet endpoint. La collecte nécessite la même origine que NEXT_PUBLIC_SITE_URL. La clé de service reste côté serveur.

## Activation après autorisation de publication

1. Appliquer `supabase/migrations/0005_analytics.sql` après les migrations de base 0001/0002. Les tables sont protégées par RLS, sans accès direct anonyme ou authentifié. Le RPC d’écriture est réservé à service_role ; le RPC de rapport vérifie le rôle administrateur même lorsqu’il est appelé directement.
2. Dans Netlify, définir `SUPABASE_SERVICE_ROLE_KEY` comme secret serveur. Ne jamais l’envoyer dans une conversation ni utiliser le préfixe NEXT_PUBLIC_. La configuration Supabase existante doit rester celle de MIRÂTH.
3. Activer pg_cron dans Supabase et planifier la purge quotidienne indiquée en fin de migration. Sans cette planification, la purge se fait à la prochaine collecte ou lecture administrateur, mais des données anciennes peuvent rester stockées pendant une période sans activité. Fenêtre d’affichage et rétention visée : 90 jours.
4. Définir `NEXT_PUBLIC_ANALYTICS_ENABLED=true` avant la compilation publiée. Vérifier NEXT_PUBLIC_SITE_URL=https://miraath.netlify.app (adapter au domaine officiel si changé).
5. Vérifier avec un visiteur sans compte : aucun POST avant accord ; un POST par navigation autorisée après accord ; arrêt après refus. Vérifier réponse 204 et chiffres réels au tableau administrateur. Tester refus de lecture pour un membre et un rédacteur dans le RPC, purge et déduplication des identifiants d’événement.

Sans accès d’administration Supabase dans cette session, la migration et ses contrôles réels restent à activer/éprouver. Aucun essai navigateur ni mesure de fréquentation historique. Les journaux techniques Netlify restent distincts de ce dispositif.

Documentation technique consultée : https://supabase.com/docs/guides/database/functions (permissions et search_path des fonctions), guides locaux Next.js 16.3.8 Route Handlers et usePathname.

## Vérifications réalisées

141 tests réussis (38 fichiers), dont 10 contrôles du suivi : consentement/retrait, pages privées, requêtes trop volumineuses, origine externe, robots, DNT, rotation quotidienne et après inactivité, disponibilité de la base, visibilité de la page. TypeScript et compilation Next.js réussis (336 pages statiques, nouvelles routes serveur incluses). `git diff --check` réussi. Migration SQL non exécutée dans cette session ; affichage et fonctionnement sur serveur réel restent à vérifier après activation. Aucun déploiement lancé.

## Publication

Nouvelle section de confidentialité vérifiée sur le site public. Les contrôles TypeScript, compilation et 141 tests avaient réussi sur ce code. Aucune activation distante de Supabase effectuée et aucune nouvelle APK compilée. Les futurs déploiements nécessitent un nouveau signal.

Contrôles HTTP après publication : `/confidentialite` 200 avec nouvelle section, `/admin/statistiques` 307 vers la connexion sans session, `/api/analytics` POST 503 (collecte désactivée), lecteur original de la bibliothèque 200. Aucun test d’administration connecté ni d’écriture réelle en base effectué.
