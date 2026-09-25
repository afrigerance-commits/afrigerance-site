# AFRIGÉRANCE — site web

Site vitrine d’AFRIGÉRANCE : infogérance et intégration de solutions technologiques pour les entreprises au Sénégal.

**État actuel** : les pages Accueil, Services, Demander un devis, À propos et Contact sont développées. Les formulaires de devis et de contact fonctionnent jusqu’au serveur. **L’envoi des demandes par email reste à connecter** : tant que les variables décrites plus bas ne sont pas renseignées, le site affiche « Rien n’a été envoyé » et aucune demande n’est reçue. Le site n’est pas déployé.

Le suivi détaillé du cahier des charges est dans [`docs/etat-cahier-des-charges.md`](docs/etat-cahier-des-charges.md).

## Technologies

- [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript
- Tailwind CSS 4
- Police Figtree, auto-hébergée par `next/font` (aucun appel à Google depuis le navigateur des visiteurs)
- Aucune autre dépendance d’exécution : icônes SVG intégrées, envoi d’email par simple appel HTTPS

## Lancer le projet

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install        # installe les dépendances
npm run dev        # serveur de développement → http://localhost:3000
```

Version de production en local :

```bash
npm run build
npm run start      # → http://localhost:3000
```

Contrôles qualité :

```bash
npm run lint       # ESLint (règles Next.js, accessibilité de base)
npx tsc --noEmit   # vérification TypeScript
```

## Structure

```
brand/                          Fichier original du logo (non modifié)
.env.example                    Modèle des variables d’envoi (sans valeur secrète)
docs/etat-cahier-des-charges.md Suivi des exigences du cahier des charges
src/
  assets/afrigerance-logo.png   Logo original recadré (marges blanches retirées)
  content/                      TOUS les textes du site
    site.ts                     Identité, menus, liens, coordonnées confirmées
    services.ts                 Les deux pôles et leurs prestations
    pages.ts                    Textes des pages Services, À propos, Contact, Devis
    forms.ts                    Libellés, options et messages des formulaires
  lib/forms/                    Validation des formulaires (navigateur ET serveur)
  lib/server/                   Envoi des emails (serveur uniquement)
  app/
    globals.css                 Couleurs et réglages de la charte (@theme)
    layout.tsx                  En-tête, pied de page et métadonnées communs
    page.tsx                    Accueil
    services/, devis/, a-propos/, contact/, mentions-legales/
    api/devis/route.ts          Réception des demandes de devis
    api/contact/route.ts        Réception des messages de contact
  components/                   En-tête, pied de page, bandeaux, formulaires…
```

## Modifier le contenu

- **Textes, menus, liens** : fichiers de `src/content/`. Les composants n’ont pas de texte en dur.
- **Prestations d’un pôle** : `src/content/services.ts`. Elles apparaissent automatiquement sur la page Services et dans le formulaire de devis.
- **Couleurs** : variables `--color-*` dans `src/app/globals.css`.
- **Logo** : remplacer `src/assets/afrigerance-logo.png` en gardant le même nom.

### Coordonnées

Dans `src/content/site.ts`, bloc `contactDetails` : téléphone, email, WhatsApp, adresse, horaires. Toutes les valeurs sont vides (`null`) pour l’instant. Chaque coordonnée renseignée apparaît sur la page Contact avec son lien : appel, email ou WhatsApp. **Ne renseigner que des informations confirmées.**

Règle éditoriale (cahier des charges) : n’ajouter aucun chiffre, client, tarif, certification, témoignage ou coordonnée sans validation d’AFRIGÉRANCE.

## Envoi des demandes (devis et contact)

### Fonctionnement

1. Le visiteur remplit le formulaire. Les réponses sont vérifiées dans le navigateur, puis **à nouveau sur le serveur**.
2. Le serveur envoie un email de notification via [Resend](https://resend.com), avec une référence (ex. `DV-20260925-A1B2C3`) et le résumé de la demande.
3. Le message de réussite n’est affiché **que si Resend a accepté l’email**. En cas d’échec ou d’absence de configuration, un message d’erreur clair s’affiche et les réponses restent dans le formulaire.

Protection de base : un champ invisible piège les robots, la taille des envois est limitée, et les valeurs inattendues sont refusées. La clé API reste sur le serveur : elle n’est jamais envoyée au navigateur.

### Variables à configurer

| Variable | Rôle | Exemple |
| --- | --- | --- |
| `RESEND_API_KEY` | Clé API Resend (**secrète**) | `re_…` |
| `NOTIFICATION_EMAIL_FROM` | Expéditeur des notifications | `AFRIGERANCE <onboarding@resend.dev>` |
| `NOTIFICATION_EMAIL_TO` | Adresse(s) qui reçoivent les demandes, séparées par des virgules | l’adresse de réception d’AFRIGÉRANCE |

### Mise en place avec Resend

1. Créer un compte sur https://resend.com, idéalement avec l’adresse email qui doit recevoir les demandes.
2. Menu **API Keys** → **Create API Key**, avec l’accès « Sending access ». Copier la clé : elle n’est affichée qu’une fois.
3. **Sans nom de domaine** (pour tester) : expéditeur `AFRIGERANCE <onboarding@resend.dev>`. Dans ce mode, Resend n’envoie **qu’à l’adresse email du compte Resend** : `NOTIFICATION_EMAIL_TO` doit donc être cette adresse.
4. **Avec un nom de domaine** (recommandé pour la mise en ligne) : menu **Domains** → **Add Domain**, puis ajouter chez le registraire les enregistrements DNS indiqués. Une fois le domaine vérifié, utiliser par exemple `AFRIGERANCE <site@votre-domaine>` comme expéditeur.

### Tester en local (Windows)

Dans l’invite de commandes, ouverte dans le dossier du projet :

```
copy .env.example .env.local
notepad .env.local
```

Renseigner les trois valeurs, enregistrer, puis relancer `npm run dev`. Le fichier `.env.local` n’est jamais envoyé sur GitHub.

### À la mise en ligne

Définir les trois mêmes variables dans les réglages « Environment Variables » de l’hébergeur. Ne jamais les écrire dans le code.

### Limites actuelles

- Les demandes ne sont pas enregistrées dans une base de données : l’email est la seule trace. Il n’y a pas encore d’espace d’administration ni de suivi des statuts.
- Aucun email de confirmation n’est envoyé au visiteur : la confirmation est affichée à l’écran, avec la référence.
- Il n’y a pas de limitation du nombre d’envois (anti-abus) au-delà du champ piège. À ajouter si du spam apparaît après la mise en ligne.

## Plan du site

| Adresse | Statut |
| --- | --- |
| `/` | Accueil, terminée |
| `/services` | Deux pôles et leurs prestations, terminée |
| `/devis` | Formulaire en 4 étapes, terminé. `?pole=infogerance` ou `?pole=integration` présélectionne le pôle. **Envoi à connecter.** |
| `/a-propos` | Terminée, avec les informations confirmées uniquement |
| `/contact` | Formulaire court, terminé. **Envoi à connecter.** Coordonnées : aucune confirmée pour l’instant. |
| `/mentions-legales` | En attente des informations légales (non indexée) |

## Actualiser une copie téléchargée en ZIP (Windows)

1. Arrêter le site s’il tourne : **Ctrl + C** dans la fenêtre noire, puis `O` et Entrée.
2. Si vous avez créé un fichier `.env.local`, le copier de côté : il n’est pas dans le ZIP.
3. Supprimer ou renommer l’ancien dossier du projet.
4. Télécharger le nouveau ZIP depuis la branche (bouton **Code** → **Download ZIP**) et l’extraire.
5. Ouvrir le dossier qui contient `package.json`, taper `cmd` dans la barre d’adresse, puis Entrée.
6. Exécuter `npm install`, puis `npm run dev`. Remettre `.env.local` dans le dossier s’il existait.
7. Ouvrir http://localhost:3000. En cas d’affichage ancien, forcer le rechargement avec **Ctrl + F5**.
