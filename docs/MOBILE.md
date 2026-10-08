# MIRÂTH Android — APK de test

## Livraison vérifiée du 8 octobre 2026

- APK : MIRATH-Android-test.apk, 8 739 407 octets, version 1.0.
- Nom et icône MIRÂTH ; site chargé : https://miraath.netlify.app.
- Identifiant existant : com.baytalilm.app.
- Commit de compilation : 340cec870c1f40b9e2c458eeb9749ba769c4c87a.
- SHA256 : aa457d5255d8007c0f85f09018e8e772f3dde1e9221ded7405acc2823a008379.
- Signature APK v2 vérifiée avec apksigner ; signature debug pour essais, pas pour publication en production.
- Compilation et lint Android : réussite.
- Test instrumenté sur émulateur Android 15, profil Pixel 7 : un test réussi, aucune erreur, aucun échec ni test ignoré.

Le test vérifie l’identité de l’application, l’ouverture de l’accueil MIRÂTH dans la WebView native, l’ouverture de la collection « Famille et enfants », la présence du texte arabe RTL et du bouton Copier, l’absence d’audio de chapitre dans les fiches et l’absence de débordement horizontal. Il ne vérifie pas la copie effective du presse-papiers ni la lecture sonore.

Source des résultats : exécution GitHub Actions 37861126232, rapport MirathLaunchTest. L’exécution globale a échoué uniquement après la réussite du test, lors de la capture d’écran : Gradle désinstalle l’application après les essais. Le workflow a été corrigé pour réinstaller l’APK avant la capture. Aucun changement du code de l’application n’en résulte ; le workflow corrigé sera exécuté lors du prochain changement Android.

## Installation sur téléphone

Télécharger l’APK puis l’ouvrir sur Android. Autoriser l’installation depuis l’application de téléchargement si Android le demande. Il n’a pas été testé sur un téléphone physique dans cet environnement. À valider sur le Pixel de l’utilisateur : lancement, navigation et retour, arabe, copie/partage, lecture du Coran, interruption audio, rotation et reprise de l’application.

## Compiler de nouveau

Le workflow .github/workflows/android-apk.yml utilise Node 22, Java 21 et le SDK Android disponible sur Ubuntu 24.04. Il produit l’APK de test, vérifie sa signature et lance les tests instrumentés sur Android 15. Il n’accède à aucun secret de publication et ne publie rien sur Google Play.

```bash
npm ci
npx cap sync android
cd android
./gradlew :app:assembleDebug :app:assembleDebugAndroidTest :app:lintDebug
```

## Limites de cette première version

L’application ouvre le site déployé dans une WebView et nécessite une connexion au démarrage. Le fonctionnement entièrement hors ligne et l’audio application fermée ne sont pas garantis. Les icônes et l’écran de lancement sont personnalisés, mais les alarmes de prière et un service audio natif restent des développements distincts.

Pour une distribution durable, créer et conserver une clé de signature de production, puis produire un APK release ou un AAB pour Google Play. Les clés debug de compilation ne sont pas une stratégie de mise à jour en production.
