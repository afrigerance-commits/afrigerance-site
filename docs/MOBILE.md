# MIRÂTH Android

## État au 8 octobre 2026

La base Capacitor Android existe. Le nom a été corrigé en MIRÂTH et la destination en https://miraath.netlify.app. L’identifiant existant com.baytalilm.app est conservé pour préserver la compatibilité d’une éventuelle installation antérieure. `npx cap sync android` réussit.

Aucun APK ni AAB n’a été généré. La tentative `./android/gradlew -p android assembleDebug` échoue au téléchargement de Gradle 8.14.3 avec « Network is unreachable ». Le SDK Android est également absent et le Java présent est 17, tandis que la bibliothèque Capacitor installée utilise Java 21.

## Produire une version de test

Sur une machine équipée d’Android Studio 2025.2.1 ou plus récent, du SDK Android 36 et de Java 21 :

```bash
npm ci
npx cap sync android
cd android
./gradlew assembleDebug
```

Le fichier de test sera `android/app/build/outputs/apk/debug/app-debug.apk`. Vérifier sur un téléphone les liens externes, connexion, copie/partage, lecture du Coran, rotation, bouton retour et interruption audio. Ne pas présenter ce fichier de test comme une version de production.

## Version publique

Personnaliser les icônes et l’écran de lancement avant livraison. Produire un APK signé pour la distribution directe ou un AAB signé pour Google Play ; conserver la clé de signature. La création du compte Google Play et la soumission ne sont pas réalisées.

Cette première approche ouvre le site MIRÂTH dans une WebView. Elle requiert une connexion au démarrage ; elle ne garantit ni le fonctionnement entièrement hors ligne, ni l’audio lorsque l’application est fermée. Ces fonctions exigent une intégration native et des essais Android supplémentaires.

Documentation : https://capacitorjs.com/docs/getting-started/environment-setup
