# Application mobile Android / iOS

## Approche retenue : Capacitor en coquille distante

Bayt Al-'Ilm utilise des pages dynamiques côté serveur (authentification,
recherche, pagination des hadiths, back-office) que l'export statique de
Next.js ne supporte pas. Réécrire l'application en React Native dupliquerait
tout le travail déjà fait et doublerait la maintenance.

La solution retenue : [Capacitor](https://capacitorjs.com) enveloppe le site
déployé (Netlify) dans une coquille native. L'app mobile charge directement
`https://<ton-domaine>` dans une WebView native — même contenu, même mises à
jour instantanées (pas besoin de republier sur les stores à chaque
changement de contenu), mais avec :

- une icône et un écran de démarrage natifs,
- une présence réelle sur le Google Play Store et l'Apple App Store,
- des fonctionnalités natives ajoutables plus tard (notifications push,
  partage natif, etc.) via les plugins Capacitor.

Les dossiers `android/` et `ios/` ont déjà été générés
(`npx cap add android`, `npx cap add ios`) et sont commités dans le repo.

## Avant de compiler : mettre à jour l'URL

Dans `capacitor.config.ts`, remplacer :

```ts
server: {
  url: "https://afrigerance-site.netlify.app",
  ...
}
```

par l'URL définitive du site une fois le domaine personnalisé configuré
(voir `docs/DEPLOYMENT.md`). Puis resynchroniser :

```bash
npm run cap:sync
```

## Android — ce qu'il reste à faire (nécessite Android Studio)

Cet environnement cloud n'a pas le SDK Android installé, donc la
compilation réelle (`.apk`/`.aab`) ne peut pas se faire ici.

1. Installer [Android Studio](https://developer.android.com/studio) sur ton
   ordinateur.
2. `npm run cap:android` → ouvre le projet `android/` dans Android Studio.
3. Dans Android Studio : **Build → Generate Signed Bundle / APK**, créer une
   clé de signature (à conserver précieusement, impossible à régénérer).
4. Créer un compte développeur Google Play (frais unique d'environ 25 $) sur
   [play.google.com/console](https://play.google.com/console).
5. Créer une fiche d'application, uploader le `.aab`, remplir la fiche store
   (captures d'écran, description, politique de confidentialité — le site a
   déjà une page `/confidentialite`), soumettre à la revue.

## iOS — ce qu'il reste à faire (nécessite un Mac + Xcode)

Contrainte incontournable d'Apple : la compilation d'une app iOS nécessite
Xcode, qui ne tourne que sur macOS. Aucun environnement cloud Linux ne peut
contourner ça.

1. Un Mac (le tien, ou un service de location cloud type MacStadium/Scaleway
   Mac mini si tu n'en as pas).
2. [Xcode](https://developer.apple.com/xcode/) installé.
3. Un compte [Apple Developer Program](https://developer.apple.com/programs/)
   (99 $/an).
4. `npm run cap:ios` → ouvre le projet `ios/` dans Xcode.
5. Dans Xcode : configurer la signature (Signing & Capabilities), puis
   **Product → Archive** pour générer le build.
6. Soumission via [App Store Connect](https://appstoreconnect.apple.com).

## Alternative sans matériel Apple : service de build cloud

Si tu n'as pas de Mac, des services comme
[Codemagic](https://codemagic.io) ou [EAS Build](https://expo.dev/eas) (pour
projets Capacitor aussi) compilent l'app iOS dans le cloud à partir du repo
GitHub, sans que tu aies besoin de matériel Apple — seul le compte
développeur Apple (99 $/an) reste obligatoire côté Apple, c'est une
condition de leur programme, pas de l'outil de build.

## Ce qui n'est PAS encore fait

- Icônes et écran de démarrage personnalisés (actuellement les valeurs par
  défaut de Capacitor) — à remplacer par les assets `/icon-192.png` et
  `/icon-512.png` du site, redimensionnés aux formats requis par chaque
  plateforme (`npx @capacitor/assets generate` peut automatiser ça).
- Comptes développeur Google Play et Apple Developer Program (à créer par
  toi, ce sont des engagements financiers et légaux que je ne peux pas
  prendre à ta place).
- Signature et publication effective sur les deux stores.
