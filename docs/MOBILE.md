# MIRÂTH Android — APK de test

## Version 1.1 — correction de l’adhan automatique

La version 1.0 ne proposait que la lecture manuelle. La version 1.1 ajoute des alarmes Android exactes, un service audio de premier plan avec bouton Arrêter, et le MP3 de La Mecque intégré (source/licence : docs/audio-sources.md). Après activation, la lecture ne dépend ni des minuteurs JavaScript ni d’Internet. Le volume utilisé est celui des alarmes ; le mode Ne pas déranger reste respecté.

L’activation exige notifications et accès « Alarmes et rappels ». Le calendrier AlAdhan couvre le mois en cours et le suivant, avec la ville/méthode sélectionnées, cinq prières et aucune alarme au lever du soleil. Les heures ISO avec décalage UTC sont conservées. Une seule alarme est armée à la fois ; le récepteur programme la suivante. La file enregistrée est réarmée au redémarrage du téléphone, à la mise à jour, à l’ouverture et après modification de l’heure ou réautorisation des alarmes. Aucun service audio ne démarre au boot. Un adhan manqué de plus de deux minutes n’est pas joué rétroactivement.

Dans les réglages des horaires : « Activer l’adhan », puis « Tester écran verrouillé » (15 secondes). Renouveler les alarmes avant la date affichée, après un changement de ville/méthode ou un arrêt forcé Android. Les restrictions du fabricant, un téléphone éteint, un volume nul et Ne pas déranger peuvent empêcher l’écoute. Pas de garantie sans essai sur téléphone physique.

La version 1.1 utilise une identité de signature de test stable, publique, dans android/test-signing/debug.keystore. Elle n’est PAS adaptée au Play Store. La version 1.0 était signée avec une clé CI éphémère : désinstaller une fois cette ancienne version avant d’installer la 1.1 si Android refuse la mise à jour. Les données locales peuvent être effacées ; les contenus en ligne restent accessibles. Les prochaines APK de test conserveront la nouvelle identité.

## Vérification

Le workflow .github/workflows/android-apk.yml compile l’APK, vérifie la signature, exécute le lint Android puis les tests instrumentés sur Android 15. AdhanAlarmTest programme une alarme réelle, met l’application en arrière-plan et l’écran en veille, vérifie le démarrage du MediaPlayer, l’alarme suivante, l’arrêt et la désactivation. Un broadcast de boot ne doit pas démarrer l’audio. Ce contrôle logiciel ne prouve pas l’écoute sur un haut-parleur physique. Les résultats de la nouvelle compilation sont à consigner après exécution.

## Livraison précédente — 8 octobre 2026

APK 1.0 : MIRATH-Android-test.apk, 8 739 407 octets. SHA256 aa457d5255d8007c0f85f09018e8e772f3dde1e9221ded7405acc2823a008379. Commit 340cec870c1f40b9e2c458eeb9749ba769c4c87a. Signature debug v2. Compilation/lint réussis et un test de navigation/arabe réussi sur émulateur Android 15 (run 37861126232) ; capture post-test corrigée après échec. Aucun test sonore dans cette version.

## Compilation

```bash
npm ci
npx cap sync android
# Utiliser l’identité de test stable comme dans le workflow.
cd android
./gradlew :app:assembleDebug :app:assembleDebugAndroidTest :app:lintDebug
```

Identifiant conservé : com.baytalilm.app. Site : https://miraath.netlify.app. Connexion nécessaire pour ouvrir le site et renouveler les horaires. L’audio du Coran application fermée et le fonctionnement entièrement hors ligne ne sont pas garantis. L’iOS reste un chantier distinct. Aucune publication Play Store.
