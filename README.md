# AFRIGÉRANCE — site web

Site vitrine d’AFRIGÉRANCE : infogérance et intégration de solutions technologiques pour les entreprises au Sénégal.

**État actuel**
- Pages Accueil, Services, Demander un devis, À propos et Contact terminées.
- Chaque demande de devis ou de contact est **enregistrée dans une base de données** et consultable dans un **espace administrateur protégé** (`/admin`). Un **email avertit le gestionnaire** de chaque nouvelle demande.
- Il reste à fournir les paramètres réels (base de données, email) : voir « Mise en route » ci-dessous.
- Le site n’est pas déployé.

Suivi détaillé du cahier des charges : [`docs/etat-cahier-des-charges.md`](docs/etat-cahier-des-charges.md).

## Technologies et choix

- [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript, Tailwind CSS 4.
- **Base de données : PostgreSQL**, avec le pilote [`postgres`](https://github.com/porsager/postgres) (aucune autre dépendance). PostgreSQL est une base fiable, gratuite et disponible chez de nombreux hébergeurs. Recommandé : [Neon](https://neon.tech), qui a une offre gratuite et fonctionne avec les hébergeurs Next.js. Toute base PostgreSQL 13 ou plus récente convient.
- **Authentification intégrée**, sans service tiers :
  - comptes créés uniquement en ligne de commande ;
  - mots de passe hachés avec scrypt (module `crypto` de Node) ;
  - sessions stockées en base, cookie `httpOnly` limité à `/admin` ;
  - blocage de 15 minutes après 5 mots de passe erronés.

  Pour un ou quelques gestionnaires, c’est plus simple et plus sûr que de dépendre d’un service externe.
- **Email : [Resend](https://resend.com)**, appelé directement par le serveur.

Aucun mot de passe ni aucune clé ne figure dans le code : tout passe par des variables d’environnement, qui restent sur le serveur et hors de GitHub.

## Fonctionnement des demandes

1. Le visiteur remplit le formulaire de devis ou de contact. Les réponses sont vérifiées dans le navigateur, puis **à nouveau par le serveur**.
2. Le serveur **enregistre la demande** : type, réponses, coordonnées, date de réception, statut « Nouveau ». La confirmation n’est affichée au visiteur **que si l’enregistrement a réussi**. En cas d’échec, il voit un message d’erreur et ses réponses restent dans le formulaire.
3. Juste après, un **email de notification** part vers le gestionnaire. Il reprend toute la demande : référence, date, pôles, prestations, description du besoin, ville, et coordonnées du demandeur. Il ajoute un lien vers la fiche `/admin` si `SITE_URL` est renseignée. Détails dans « Notification par email » ci-dessous.
4. Si l’email échoue, la demande est **conservée**. Elle apparaît dans l’administration avec la mention « Échec » et l’erreur renvoyée par Resend, ainsi qu’un bouton **Renvoyer la notification**. Un renvoi n’envoie que l’email, sans jamais créer de seconde demande. La mention « La notification a été envoyée » n’apparaît que si Resend a accepté l’email.

Protections contre le spam et les doublons :
- un champ invisible piège les robots, et un envoi fait en moins de 2 secondes est refusé ;
- au plus 5 demandes par tranche de 10 minutes, et 20 par jour, depuis une même connexion. L’adresse IP n’est jamais stockée : seule une empreinte chiffrée l’est ;
- un double clic ou un nouvel essai n’enregistre la demande qu’une fois.

## Mise en route (à faire une fois)

Toutes les commandes se tapent dans l’invite de commandes, ouverte dans le dossier du projet (celui qui contient `package.json`).

### 1. Installer le projet

```
npm install
copy .env.example .env.local
```

Le fichier `.env.local` contiendra vos paramètres secrets. Il n’est jamais envoyé sur GitHub. Pour le modifier :

```
notepad .env.local
```

### 2. Créer la base de données (Neon)

1. Créez un compte gratuit sur https://neon.tech.
2. Créez un projet. Choisissez une région en Europe, la plus proche du Sénégal.
3. Cliquez sur **Connect**, cochez **Connection pooling** et copiez l’adresse affichée. Elle commence par `postgresql://`.
4. Dans `.env.local`, collez-la après `DATABASE_URL=`, sans guillemets. Enregistrez.
5. Créez les tables :

   ```
   npm run db:migrate
   ```

   Le message attendu est `✓ Migration appliquée : 0001_demandes_et_administration.sql`. Relancer la commande plus tard est sans risque : seules les nouvelles migrations sont appliquées.

### 3. Créer le compte administrateur

```
npm run admin:create
```

Saisissez l’adresse email du gestionnaire, puis un mot de passe d’au moins 12 caractères, deux fois. Le mot de passe s’affiche sous forme d’astérisques et n’est enregistré que haché.

- **Changer un mot de passe** : relancez la même commande avec la même adresse. Toutes les sessions ouvertes de ce compte sont alors fermées.
- **Ajouter un gestionnaire** : relancez la commande avec une autre adresse.

### 4. Configurer l’email de notification (Resend)

1. Créez un compte sur https://resend.com, **avec l’adresse email qui doit recevoir les notifications**. C’est indispensable tant que vous n’avez pas de domaine vérifié (voir plus bas).
2. Menu **API Keys** → **Create API Key**. Nom : `site-afrigerance`, permission : **Sending access**. Copiez la clé, qui commence par `re_` : elle ne s’affiche qu’une fois.
3. Ouvrez `.env.local` (`notepad .env.local`) et renseignez exactement ces lignes :

   ```
   RESEND_API_KEY=re_votre_cle_copiee
   NOTIFICATION_EMAIL_FROM=AFRIGERANCE <onboarding@resend.dev>
   NOTIFICATION_EMAIL_TO=adresse-du-compte-resend@exemple.com
   SITE_URL=http://localhost:3000
   ```

   | Variable | Obligatoire | Contenu |
   | --- | --- | --- |
   | `RESEND_API_KEY` | oui | La clé copiée à l’étape 2. **Secrète** : ne la partagez pas et ne la mettez jamais dans le code. |
   | `NOTIFICATION_EMAIL_FROM` | oui | L’expéditeur. Pour tester : `AFRIGERANCE <onboarding@resend.dev>`. Avec un domaine vérifié : par exemple `AFRIGERANCE <site@votre-domaine.sn>`. |
   | `NOTIFICATION_EMAIL_TO` | oui | L’adresse du gestionnaire qui reçoit les notifications. Plusieurs adresses possibles, séparées par des virgules. **Avec l’expéditeur de test, ce doit être l’adresse du compte Resend.** |
   | `SITE_URL` | non | L’adresse du site, sans `/` final : `http://localhost:3000` en local, `https://www.votre-domaine.sn` en ligne. Elle sert au lien vers la fiche dans l’email. |

   Écrivez les valeurs sans guillemets et sans espace autour du `=`. Les chevrons `< >` de l’expéditeur sont normaux.
4. **Arrêtez puis relancez** `npm run dev`. Les variables ne sont lues qu’au démarrage.

Plus tard, avec un nom de domaine : Resend → **Domains** → **Add Domain**, puis ajoutez chez votre registraire les enregistrements DNS indiqués. Une fois le domaine « Verified », remplacez l’expéditeur par une adresse de ce domaine. `NOTIFICATION_EMAIL_TO` peut alors être n’importe quelle adresse.

Sans ces valeurs, les demandes sont quand même enregistrées. L’administration les signale comme « notification non envoyée », avec la raison.

#### Tester avec un vrai email reçu

1. **Vérifier la configuration seule** : dans l’invite de commandes, lancez `npm run email:test`. Cette commande n’enregistre rien : elle envoie seulement un email « Test de notification AFRIGÉRANCE » à `NOTIFICATION_EMAIL_TO`.
   - Réponse attendue : `✓ Email accepté par Resend`. L’email arrive en général en moins d’une minute : regardez aussi dans **Spam / Courrier indésirable**.
   - En cas d’erreur, le message de Resend s’affiche avec une piste :
     - **401** : clé invalide ;
     - **403** : destinataire non autorisé avec l’expéditeur de test ;
     - **422** : format d’adresse incorrect.
2. **Tester le parcours complet** : lancez `npm run dev`, puis ouvrez http://localhost:3000/devis. Remplissez une demande en indiquant votre propre email comme contact, et envoyez-la.
3. **Vérifications** :
   - le site affiche « Demande envoyée » avec une référence `DV-…` ;
   - dans http://localhost:3000/admin, la demande apparaît et la colonne **Notification** indique **Envoyée** (actualisez la page si elle indique encore « En attente ») ;
   - vous recevez l’email « Nouvelle demande de devis DV-… — votre nom » : vérifiez la référence, la date, les pôles, les prestations, la description, la ville et les coordonnées ;
   - le lien en bas de l’email ouvre la fiche dans `/admin`, après connexion ;
   - **Répondre** à l’email écrit directement au demandeur ;
   - dans le tableau de bord Resend, menu **Emails**, l’envoi apparaît comme « Delivered ».
4. Faites de même avec http://localhost:3000/contact : l’email s’intitule « Nouveau message de contact CT-… ».
5. **Tester un échec puis le renvoi** :
   - dans `.env.local`, ajoutez une lettre à la fin de `RESEND_API_KEY`, puis relancez `npm run dev` ;
   - envoyez une demande : le visiteur voit bien la confirmation, et l’administration affiche **Échec** avec l’erreur `HTTP 401` ;
   - remettez la bonne clé et relancez `npm run dev` ;
   - ouvrez la fiche, puis cliquez sur **Renvoyer la notification** ;
   - le message « La notification a été envoyée » s’affiche, l’email arrive, et la liste compte toujours **une seule** demande.

### 5. Lancer le site

```
npm run dev
```

- Site public : http://localhost:3000
- Espace administrateur : http://localhost:3000/admin

## Consulter et traiter les demandes

1. Ouvrez `/admin` et connectez-vous avec l’email et le mot de passe créés à l’étape 3. Sans connexion, aucune demande n’est visible, même en connaissant l’adresse.
2. La page **Demandes reçues** liste les demandes, des plus récentes aux plus anciennes. Elle se filtre par type (devis, contact), statut, dates, et par notification non envoyée.
3. Un bandeau rouge signale les demandes dont l’email de notification n’est pas parti.
4. Cliquez sur une référence pour ouvrir la fiche : coordonnées (email et téléphone cliquables), toutes les réponses, historique.
5. Dans **Suivi de la demande**, faites passer la demande de « Nouveau » à « En cours », puis « Traité ». Chaque changement est inscrit dans l’historique avec l’adresse du gestionnaire.
6. Si la notification a échoué, corrigez la configuration email si besoin, puis cliquez sur **Renvoyer la notification**. Le bouton disparaît une fois l’email parti. Si deux personnes cliquent en même temps, un seul email est envoyé ; l’autre voit « Un envoi de cette notification est déjà en cours ».
7. Pensez à **Se déconnecter** sur un ordinateur partagé. Une session expire de toute façon après 12 heures.

En local, utilisez bien l’adresse `localhost`. En ligne, le cookie de connexion n’est transmis qu’en HTTPS.

## Commandes utiles

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement → http://localhost:3000 |
| `npm run build` puis `npm run start` | Version de production en local |
| `npm run db:migrate` | Crée ou met à jour les tables de la base |
| `npm run admin:create` | Crée un compte administrateur ou change son mot de passe |
| `npm run email:test` | Envoie un email de test avec la configuration Resend (n’enregistre rien) |
| `npm run test:e2e` | Tests automatiques complets dans un vrai navigateur (voir ci-dessous) |
| `npm run lint` / `npx tsc --noEmit` | Contrôles qualité |

## Tests automatiques

`npm run test:e2e` ouvre un vrai navigateur (Chromium) et vérifie le site comme le ferait un visiteur, puis un gestionnaire. Cela représente 49 tests et environ 3 minutes.

Ce qui est vérifié :

- **Pages publiques** :
  - à 1440, 768 et 390 px, ni défilement horizontal, ni erreur, et un seul titre principal ;
  - aucun lien vide ou « # », et chaque lien interne mène à une page existante ;
  - menu mobile, présélection du pôle et page 404.
- **Formulaires** :
  - la confirmation ne s’affiche qu’après l’enregistrement en base ;
  - un triple clic n’enregistre qu’une seule demande ;
  - base injoignable ou absente : message d’erreur et aucune confirmation ;
  - robots refusés (champ piège, envoi trop rapide) ;
  - un même envoi rejoué donne la même référence.
- **Administration** :
  - accès refusé sans connexion, même avec un cookie inventé ou l’adresse exacte d’une fiche ;
  - connexion, filtres, fiche, statuts et déconnexion ;
  - blocage après 5 mauvais mots de passe ;
  - affichage mobile.
- **Email** :
  - contenu complet pour un devis et pour un message de contact ;
  - lien vers la fiche seulement si `SITE_URL` est renseignée ;
  - en cas d’échec, la demande est conservée puis la notification peut être renvoyée ;
  - deux renvois simultanés ne produisent qu’un seul email ;
  - aucune clé dans les pages ni dans les scripts du navigateur.

Aucun vrai email n’est envoyé : un faux service Resend local reçoit les emails. Les tests n’utilisent ni votre base `DATABASE_URL` ni vos clés.

### Préparer les tests (une fois)

1. **Créez une base PostgreSQL réservée aux tests.** Son nom doit contenir « test », par exemple `afrigerance_test`, car les tests **effacent son contenu** à chaque lancement. Avec Neon, ajoutez une nouvelle base de données dans votre projet, puis copiez son adresse depuis **Connect**. Une base PostgreSQL installée sur l’ordinateur convient aussi.
2. **Ajoutez son adresse dans `.env.local`** :

   ```
   TEST_DATABASE_URL=postgresql://utilisateur:motdepasse@hote/afrigerance_test?sslmode=require
   ```

   Les tests refusent de démarrer dans trois cas : si cette adresse est vide, si le nom de la base ne contient pas « test », ou si elle désigne la même base que `DATABASE_URL`.
3. **Installez le navigateur de test** : `npx playwright install chromium`.

### Lancer les tests

1. Arrêtez `npm run dev` s’il tourne.
2. Lancez `npm run test:e2e`. La commande fait tout dans l’ordre :
   - elle construit le site ;
   - elle démarre cinq configurations du site sur les ports 3101 à 3105 (avec email, sans email, sans base, base en panne, sans `SITE_URL`), plus le faux service d’email sur le port 4110 ;
   - elle crée les tables de la base de test ;
   - elle crée deux comptes administrateurs de test, avec des mots de passe tirés au hasard et jamais écrits sur le disque ;
   - elle lance les tests.

Pour lire le résultat :

- chaque ligne **✓** est un test réussi ;
- **« 49 passed »** à la fin signifie que tout est bon ;
- les lignes `[WebServer] [demandes] Notification non envoyée…` ou `Enregistrement impossible…` sont **normales** : les tests provoquent ces pannes exprès.

En cas d’échec, le test en cause est marqué **✘**. Une capture d’écran et une trace sont enregistrées dans `test-results/`. Pour rejouer la trace pas à pas : `npx playwright show-trace test-results/<dossier>/trace.zip`.

Pour gagner du temps :

- **Lancer un seul fichier** : `npm run test:e2e -- email.spec.ts`.
- **Relancer sans reconstruire le site** (quand seuls les tests ont changé) :
  - Windows (invite de commandes) : `set E2E_SKIP_BUILD=1 && npm run test:e2e`. Fermez ensuite la fenêtre pour revenir au mode normal.
  - Linux ou macOS : `E2E_SKIP_BUILD=1 npm run test:e2e`.

Ces tests ne vérifient pas la réception d’un vrai email ni le fonctionnement avec la vraie base. Pour cela, suivez « Tester avec un vrai email reçu » plus haut.

## À la mise en ligne (plus tard)

- Définissez chez l’hébergeur les variables `DATABASE_URL`, `RESEND_API_KEY`, `NOTIFICATION_EMAIL_FROM`, `NOTIFICATION_EMAIL_TO` et `SITE_URL`.
- Lancez `npm run db:migrate` une fois contre la base de production. Faites-le depuis votre PC, avec `DATABASE_URL` pointant vers cette base.
- Créez le ou les comptes avec `npm run admin:create`.
- La limitation des envois repose sur l’adresse IP transmise par l’hébergeur (en-têtes `X-Real-IP` / `X-Forwarded-For`), fiable sur les plateformes comme Vercel.

## Structure

```
db/migrations/                  Migrations SQL (appliquées par npm run db:migrate)
scripts/                        db-migrate.mjs, admin-create.mjs, email-test.mjs
tests/e2e/                      Tests automatiques (Playwright) ; réglages dans playwright.config.ts
.env.example                    Modèle des variables (sans valeur secrète)
docs/etat-cahier-des-charges.md Suivi des exigences du cahier des charges
src/
  content/                      TOUS les textes (site.ts, services.ts, pages.ts, forms.ts, admin.ts)
  lib/forms/                    Validation des formulaires (navigateur ET serveur)
  lib/requests/                 Types, mise en forme et filtres des demandes
  lib/server/                   Serveur uniquement : base, authentification, enregistrement, email
  app/
    (site)/                     Pages publiques (en-tête et pied de page communs)
    admin/                      Espace administrateur : connexion, liste, fiche
    api/devis, api/contact      Réception des formulaires
  components/                   Composants du site, des formulaires et de l’administration
```

Pour modifier le contenu :
- **Textes** : fichiers de `src/content/`.
- **Couleurs** : variables `--color-*` de `src/app/globals.css`.
- **Coordonnées publiques** : bloc `contactDetails` de `src/content/site.ts`. N’y mettez que des informations confirmées.
- **Logos « Ils nous font confiance »** (accueil) :
  1. Déposez le logo dans `public/partenaires/`. Un SVG convient, ou un PNG à fond transparent d’environ 400 px de large.
  2. Ajoutez une ligne dans `src/content/partners.ts`, par exemple `{ name: "Nom exact", logo: "/partenaires/nom.png" }`.

  La section reste masquée tant que la liste est vide. N’ajoutez que des organisations qui ont accepté, de préférence par écrit, l’affichage de leur logo.
- **Image de la bannière d’accueil** :
  1. Déposez une photo dans `public/accueil/` (JPG ou WebP, 1600 px de large ou plus).
  2. Indiquez son chemin dans `hero.image` (`src/content/site.ts`), par exemple `{ src: "/accueil/banniere.jpg" }`. Pour retirer l’image, mettez `null`.

  L’image se fond automatiquement dans le dégradé bleu et s’efface vers le texte. L’illustration actuelle (motif « réseau ») est provisoire.

## Actualiser une copie téléchargée en ZIP (Windows)

1. Arrêtez le site : **Ctrl + C** dans la fenêtre noire, puis `O` et Entrée.
2. Copiez de côté votre fichier `.env.local`, qui n’est pas dans le ZIP.
3. Supprimez ou renommez l’ancien dossier. Téléchargez le nouveau ZIP depuis la branche (**Code** → **Download ZIP**), puis extrayez-le.
4. Ouvrez le dossier qui contient `package.json`, tapez `cmd` dans la barre d’adresse, puis Entrée.
5. Remettez `.env.local` dans ce dossier, puis lancez :

   ```
   npm install
   npm run db:migrate
   npm run dev
   ```

6. Ouvrez http://localhost:3000 (ou `/admin`). En cas d’affichage ancien : **Ctrl + F5**.
