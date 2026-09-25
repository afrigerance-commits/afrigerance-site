# AFRIGÉRANCE — site web

Site vitrine d’AFRIGÉRANCE : infogérance et intégration de solutions technologiques pour les entreprises au Sénégal.

Étape actuelle : **page d’accueil** fidèle à la maquette validée. Les autres pages existent sous forme de pages « en préparation » pour que chaque lien ait une destination. Elles ne sont pas indexées par les moteurs de recherche.

## Technologies

- [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript
- Tailwind CSS 4
- Police Figtree, auto-hébergée par `next/font` (aucun appel à Google depuis le navigateur des visiteurs)
- Aucune autre dépendance d’exécution. Les icônes sont des SVG intégrés.

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
brand/                         Fichier original du logo (non modifié)
src/
  assets/afrigerance-logo.png  Logo original recadré (marges blanches retirées)
  content/site.ts              TOUS les textes, liens, menus et libellés
  app/
    globals.css                Couleurs et réglages de la charte (@theme)
    layout.tsx                 Structure commune : en-tête, pied de page, métadonnées
    page.tsx                   Page d’accueil
    icon.png, apple-icon.png   Favicon (bouclier extrait du logo original)
    services/, a-propos/, contact/, devis/, mentions-legales/
                               Pages en préparation
    not-found.tsx              Page 404
  components/
    SiteHeader.tsx, SiteNav.tsx  En-tête, navigation et menu mobile
    Hero.tsx                     Bandeau bleu de l’accueil
    ServicePoles.tsx             Les deux pôles de services
    SiteFooter.tsx               Pied de page
    PagePlaceholder.tsx          Gabarit des pages en préparation
    Logo.tsx, icons.tsx
```

## Modifier le contenu

- **Textes, liens, menus** : `src/content/site.ts`. Les composants n’ont aucun texte en dur.
- **Couleurs** : variables `--color-*` dans `src/app/globals.css`. Exemple : `--color-brand` pilote les boutons, le lien actif et les flèches.
- **Logo** : remplacer `src/assets/afrigerance-logo.png` en gardant le même nom de fichier.

Règle éditoriale (cahier des charges) : n’ajouter aucun chiffre, client, tarif, certification, témoignage ou coordonnée sans validation d’AFRIGÉRANCE.

## Plan du site actuel

| Adresse | Statut |
| --- | --- |
| `/` | Accueil, terminée |
| `/services` | En préparation |
| `/services/infogerance` | En préparation |
| `/services/integration-solutions-technologiques` | En préparation |
| `/a-propos` | En préparation |
| `/contact` | En préparation, sans formulaire ni coordonnées |
| `/devis` | En préparation, sans formulaire |
| `/mentions-legales` | En préparation |

## Éléments à compléter ou à connecter

Informations à fournir par AFRIGÉRANCE :

- Coordonnées : téléphone, email, adresse, horaires, WhatsApp, réseaux sociaux.
- Mentions légales : dénomination légale exacte (AFRIGÉRANCE ou AFRIGERANCE), forme juridique, immatriculation, siège, responsable de publication, hébergeur.
- Politique de confidentialité : responsable des données, finalités, durées de conservation, contact pour exercer les droits.
- Contenu détaillé des deux pôles, page À propos, méthode, réalisations autorisées et FAQ.
- Nom de domaine définitif, pour les URL canoniques, le sitemap, `robots.txt` et les aperçus de partage.
- Logo en version vectorielle (SVG) ou PNG haute définition à fond transparent, si disponible.

Fonctions à développer et à brancher :

- Formulaires de devis, de contact et de rendez-vous, avec validation serveur, anti-spam et service d’envoi d’email ou stockage. Aucun formulaire n’est simulé en attendant.
- Espace d’administration ou CMS pour modifier les contenus et suivre les demandes.
- Sitemap, `robots.txt`, données structurées, dès que le domaine et les coordonnées sont connus.
- Hébergement et déploiement (non réalisés à ce stade).
