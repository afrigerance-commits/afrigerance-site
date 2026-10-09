# MIRÂTH Android — APK de test

## Version 1.2 — navigation et français après chaque verset

Publication autorisée par l’utilisateur le 9 octobre 2026. Version Android 1.2
(versionCode 3), même identifiant. La signature est désormais explicitement
liée au fichier de test et son certificat contrôlé après compilation.
La vérification des APK livrées a révélé que la 1.1 utilisait encore un certificat
éphémère, malgré la copie de la clé dans CI. Si Android refuse la mise à jour,
désinstaller la 1.1 avant la 1.2 ; cela peut effacer les données locales.
Ajoute au site chargé par l’application l’option Qari arabe → Youssouf Leclerc
(sens en français) → verset suivant, ainsi que cinq onglets inférieurs. Les
pistes arabes doivent être découpées par verset ; l’option est indisponible
pour les enregistrements de sourate entière. La reconnaissance vocale reste
une étude, sans microphone actif. La diffusion du Coran nécessite Internet.

Les vérifications web précédentes sont réussies (59 tests, TypeScript et build).
Le workflow Android compile, vérifie le lint et la signature, puis teste
l’installation, l’adhan écran éteint, la navigation, le menu Plus et la préférence
française sur émulateur. Résultats de cette nouvelle exécution à consigner après
compilation ; un essai physique et l’écoute réelle restent nécessaires.

Résultats finaux du 9 octobre 2026 : workflow 37896468074 entièrement réussi,
source b09b8bb4cc4d62c3caeeb6c3897c054e5ffee205. Trois tests instrumentés
réussis sur Android 15 (zéro échec, erreur ou test ignoré) : adhan écran éteint,
navigation et préférence française, lecture/arabe des invocations. Compilation,
lint et signature v2 réussis. Le certificat de l’APK a été comparé à la clé de
test : SHA256 106f6e6781b824308b1729feb65434c785f31fa82d4a6c0ade6f00891874c596.
La capture effectuée après relancement montre un écran vide pendant le chargement
et ne constitue pas une preuve visuelle du rendu mobile ; les assertions de
navigation et de dimensions du menu ont réussi dans les tests.

APK 1.2 livré : MIRATH-Android-1.2.apk, 11 516 369 octets,
SHA256 3d1eb9a4bb867fd0b76e0f3139035c2d8171f9d9b460822af3fcb1e3222cbeb3.
Netlify : changements web du commit 4e9db3e8d45513662ce0f52c37cca78d3735a19d
vérifiés en production ; alternance arabe/français observée jusqu’au verset 3
dans le navigateur, pause fonctionnelle. La correction de signature et cette
documentation sont marquées pour ne pas relancer Netlify.

## Version 1.1 — correction de l’adhan automatique

La version 1.0 ne proposait que la lecture manuelle. La version 1.1 ajoute des alarmes Android exactes, un service audio de premier plan avec bouton Arrêter, et le MP3 de La Mecque intégré (source/licence : docs/audio-sources.md). Après activation, la lecture ne dépend ni des minuteurs JavaScript ni d’Internet. Le volume utilisé est celui des alarmes ; le mode Ne pas déranger reste respecté.

L’activation exige notifications et accès « Alarmes et rappels ». Le calendrier AlAdhan couvre le mois en cours et le suivant, avec la ville/méthode sélectionnées, cinq prières et aucune alarme au lever du soleil. Les heures ISO avec décalage UTC sont conservées. Une seule alarme est armée à la fois ; le récepteur programme la suivante. La file enregistrée est réarmée au redémarrage du téléphone, à la mise à jour, à l’ouverture et après modification de l’heure ou réautorisation des alarmes. Aucun service audio ne démarre au boot. Un adhan manqué de plus de deux minutes n’est pas joué rétroactivement.

Dans les réglages des horaires : « Activer l’adhan », puis « Tester écran verrouillé » (15 secondes). Renouveler les alarmes avant la date affichée, après un changement de ville/méthode ou un arrêt forcé Android. Les restrictions du fabricant, un téléphone éteint, un volume nul et Ne pas déranger peuvent empêcher l’écoute. Pas de garantie sans essai sur téléphone physique.

Correction du 9 octobre : la 1.1 avait été annoncée avec une signature stable, mais le certificat de son APK livrée diffère de la clé publique `android/test-signing/debug.keystore`. Le chemin par défaut de la signature n’était pas explicitement fixé. La 1.2 fixe ce chemin dans Gradle et CI compare le certificat réel à la clé prévue. Cette clé publique de test n’est PAS adaptée au Play Store. Les anciennes versions peuvent nécessiter une désinstallation, qui efface les données locales ; les contenus en ligne restent accessibles.

## Vérification

Le workflow .github/workflows/android-apk.yml compile l’APK, vérifie la signature, exécute le lint Android puis les tests instrumentés sur Android 15. AdhanAlarmTest programme une alarme réelle, met l’application en arrière-plan et l’écran en veille, vérifie le démarrage du MediaPlayer, l’alarme suivante, l’arrêt et la désactivation. Un broadcast de boot ne doit pas démarrer l’audio. Ce contrôle logiciel ne prouve pas l’écoute sur un haut-parleur physique. Résultats du 9 octobre 2026 : exécution GitHub Actions 37891745397 entièrement réussie (commit 3586588c1d361a64028db9e1e8f3f605391498b9). Compilation, lint Android, signature APK v2 et deux tests instrumentés réussis, sans échec ni test ignoré. AdhanAlarmTest vérifie le démarrage audio écran éteint, la prière suivante et l’arrêt ; MirathLaunchTest vérifie navigation/arabe/absence de débordement. Le test natif ne couvre pas tous les réglages de l’interface ni les restrictions des fabricants. Web : 52 tests réussis, lint ciblé sans erreur, compilation webpack et TypeScript réussis. Calendrier publié vérifié : 264 événements futurs pour Dakar ; paramètres invalides refusés (400). Ville mémorisée après rechargement dans le navigateur.

APK livré : MIRATH-Android-1.1.apk, 11 516 365 octets. SHA256 : 2d134085f29d7f8e268ab96a8180f8fb146600ed8c98d033a74d51503558e8fb. Version de test signée, non publiée sur Google Play. Essai physique sur le téléphone de l’utilisateur toujours à effectuer.

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
