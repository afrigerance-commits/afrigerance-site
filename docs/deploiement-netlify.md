# Mettre le site en ligne sur Netlify

Ce guide demande environ 30 minutes. Vous n’avez rien à installer de plus que pour lancer le site en local. Aucun secret n’est écrit dans le code : chaque valeur se saisit dans l’interface Netlify ou dans votre fichier `.env.local`, qui ne part jamais sur GitHub.

## Ce qu’il vous faut

- Un compte **GitHub** avec accès au dépôt `afrigerance-commits/afrigerance-site`.
- Un compte **Netlify** (offre gratuite suffisante pour démarrer) : https://app.netlify.com
- Une base **PostgreSQL** : Neon est recommandé (offre gratuite), https://neon.tech
- Un compte **Resend** pour les emails de notification : https://resend.com

## 1. Préparer la base de données (Neon)

1. Créez un projet Neon. Région conseillée : la plus proche du Sénégal (Europe).
2. Cliquez sur **Connect** et copiez l’adresse de connexion. Elle commence par `postgresql://` et se termine par `?sslmode=require`. C’est votre `DATABASE_URL` : gardez-la secrète.
3. Sur votre PC, mettez temporairement cette adresse dans `DATABASE_URL` de votre `.env.local`, puis lancez :

   ```
   npm run db:migrate
   npm run admin:create
   ```

   La première commande crée les tables. La seconde crée votre compte d’administration : le mot de passe est saisi au clavier et n’est jamais affiché.

## 2. Préparer les emails (Resend)

1. Dans Resend, créez une clé API (**API Keys**, permission « Sending access »). Elle commence par `re_`.
2. Pour commencer, l’expéditeur `AFRIGERANCE <onboarding@resend.dev>` fonctionne sans configuration. Il n’écrit qu’à l’adresse de votre compte Resend.
3. Pour écrire à n’importe quelle adresse, vérifiez votre domaine dans Resend (menu **Domains**), puis utilisez par exemple `AFRIGERANCE <site@votre-domaine.sn>`.
4. Testez depuis votre PC avec `npm run email:test` : un email de test doit arriver.

## 3. Relier GitHub à Netlify

1. Fusionnez le travail dans la branche `main` (demande de fusion sur GitHub). C’est `main` qui sera publiée.
2. Dans Netlify, ajoutez un nouveau projet à partir d’un dépôt existant. Choisissez **GitHub**, autorisez l’accès, puis le dépôt `afrigerance-commits/afrigerance-site` et la branche `main`.
3. Ne modifiez pas les réglages de construction : `netlify.toml` les fournit déjà. Ils indiquent la commande `npm run build`, le dossier `.next` et Node.js 22. Netlify reconnaît Next.js et installe son adaptateur officiel tout seul.

## 4. Renseigner les variables d’environnement

Dans Netlify, ouvrez la configuration du projet, puis la rubrique **Environment variables**, et ajoutez :

| Variable | Valeur | Secrète |
| --- | --- | --- |
| `DATABASE_URL` | adresse Neon de l’étape 1 | oui |
| `RESEND_API_KEY` | clé Resend de l’étape 2 | oui |
| `NOTIFICATION_EMAIL_FROM` | `AFRIGERANCE <onboarding@resend.dev>`, puis votre expéditeur vérifié | non |
| `NOTIFICATION_EMAIL_TO` | adresse(s) du gestionnaire, séparées par des virgules | non |
| `SITE_URL` | adresse du site, par exemple `https://afrigerance.netlify.app` (sans `/` final) | non |

Cochez « secret » pour les deux valeurs secrètes. Ne renseignez pas `TEST_DATABASE_URL` sur Netlify : elle ne sert qu’aux tests automatiques.

Lancez ensuite la publication (**Deploys**, puis **Trigger deploy**). Après chaque modification de variable, relancez une publication : `SITE_URL` sert aussi au plan du site et aux aperçus de partage, calculés pendant la construction.

## 5. Vérifier en ligne

1. Ouvrez l’adresse fournie par Netlify. Parcourez l’accueil, les services et les formulaires.
2. Envoyez une demande de devis et une demande de rendez-vous avec votre propre email.
3. Connectez-vous sur `/admin` : les deux demandes doivent apparaître, avec la notification « Envoyée ».
4. Vérifiez que les emails sont arrivés. Le lien qu’ils contiennent doit ouvrir la fiche de la demande.

Si une notification est « En échec », l’erreur exacte s’affiche dans la fiche de la demande. Corrigez la variable concernée, relancez une publication, puis cliquez sur **Renvoyer la notification**.

## 6. Nom de domaine (plus tard)

Dans Netlify, rubrique **Domain management**, ajoutez votre domaine et suivez les indications pour la configuration DNS. Le HTTPS est fourni automatiquement. Mettez ensuite à jour `SITE_URL` et relancez une publication.

## En cas de problème

| Symptôme | Cause probable |
| --- | --- |
| « L’enregistrement des demandes n’est pas encore activé » | `DATABASE_URL` absente ou mal copiée |
| « Votre demande n’a pas pu être enregistrée » | base injoignable, ou `npm run db:migrate` pas encore lancé sur cette base |
| Notification « En échec : HTTP 401 » | `RESEND_API_KEY` invalide |
| Notification « En échec : HTTP 403 » | expéditeur de test utilisé vers une autre adresse que celle du compte Resend |
| Connexion `/admin` impossible | compte non créé sur la base de production (`npm run admin:create`) |
