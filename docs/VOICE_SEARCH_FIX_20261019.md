# Correctif de dictée — 19 octobre 2026

L’utilisateur confirme ensuite que le problème concerne à la fois le site et
l’APK (« Les 2 »). Le navigateur du site et le message d’erreur restent inconnus ;
la cause précise sur le navigateur de son appareil n’est donc pas établie. L’inspection confirme que la
version publiée s’appuie uniquement sur SpeechRecognition du navigateur et
que l’APK 1.3 ne contient aucun service de dictée natif. Aucune règle locale
Permissions-Policy ne bloque le micro dans la configuration du projet.

## Correctif préparé

- Android : plugin Capacitor MirathVoiceSearch, enregistré dans MainActivity,
  qui ouvre ACTION_RECOGNIZE_SPEECH et retourne le texte via ActivityCallback.
  Il utilise l’activité visible du service vocal du téléphone ; l’application
  ne capture ni n’enregistre elle-même de fichier audio. Pas de permission
  RECORD_AUDIO ajoutée pour cette délégation à une autre activité.
- Vérification de la présence d’un service, déclaration queries du manifeste,
  français/arabe, annulation sans perdre la recherche, erreurs réseau/micro,
  prévention des appels concurrents et limite de 120 caractères.
- Le pont web utilise la dictée native dans une APK compatible. Il ne lance
  pas Web Speech dans une ancienne APK dépourvue du plugin : message de mise
  à jour. L’ouverture de la fenêtre Android ne coupe pas la session quand
  la WebView devient invisible. Les résultats tardifs après navigation sont
  ignorés. Android contrôle la durée et le bouton Retour permet l’annulation.
- Navigateur : lancement Web Speech maintenu synchroniquement au clic,
  contrôle du contexte sécurisé, erreurs de permission et de service séparées,
  aide dépliable. Pas de moteur de transcription universel ajouté : les
  navigateurs sans service vocal restent incompatibles avec la dictée directe.
- Audio MIRÂTH mis en pause avant la dictée, texte modifiable avant validation,
  confidentialité mise à jour. Aucun service payant ni secret ajouté.
- APK 1.4 / versionCode 5, même identité et certificat de test que la 1.3.

## Vérifications

- 227 tests web réussis, 53 fichiers. Les 17 tests du parcours/pont vocal
  incluent API absente, ancien APK, service Android absent, annulation,
  transcription arabe simulée, masquage de l’application, erreur réseau et
  résultat tardif. Reconnaissance simulée ; aucun micro réel n’a été utilisé.
- TypeScript et git diff --check réussis.
- Compilation web réussie : 972 pages. Le cache Turbopack local corrompu
  a été supprimé avant une compilation complète réussie.
- Compilation APK, lint Android et essais sur émulateur lancés sur GitHub Actions,
  exécution 39286158576, commit 0870bd4811bb62fbe644ca89fd33039f6191fcb5.
  Exécution terminée avec succès : compilation APK, lint Android sans erreur,
  9 tests instrumentés réussis sur émulateur Android 15. Parmi ces tests,
  les 4 tests VoiceSearchTest vérifient le contrat d’intent, le texte arabe
  renvoyé au pont, l’annulation et une erreur réseau simulés.
  Aucun essai vocal réel n’est revendiqué.
- Les tests Android utilisent des résultats d’activité simulés avec Espresso,
  pour vérifier le pont, le retour arabe, l’annulation et les erreurs. Le
  fournisseur factice figure uniquement dans l’APK de test instrumenté.
- Aucun test de qualité de transcription, de permissions du fournisseur vocal
  réel ni de téléphone physique. Pas de navigateur de contrôle disponible.

## Activation et publication

Lot conservé hors production. Aucun nouveau signal de publication reçu.
La branche de compilation utilise [skip netlify] ; la branche Netlify de
production ne doit pas être modifiée. Installer la nouvelle APK ne suffit pas
tant que le pont web n’est pas publié, puisque l’APK charge le site Netlify.
Après signal explicite : publier le pont web vérifié, installer l’APK 1.4,
essayer la dictée sur le téléphone et relever le navigateur/service et le
message exact en cas d’échec. Sur un navigateur sans service vocal, un moteur
de transcription supplémentaire serait nécessaire pour une compatibilité
universelle ; il n’est pas configuré dans ce correctif.

## Sources techniques

- https://developer.android.com/reference/android/speech/RecognizerIntent
- https://capacitorjs.com/docs/plugins/android
- API locale Capacitor 8.5.2 : Plugin.startActivityForResult / ActivityCallback.
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition

## APK prête

- Fichier : MIRATH-Android-1.4.apk, 15 526 485 octets.
- SHA-256 : 164fdc33b92ad2b4d3f509902cffb5007fd4a25ba5c142ef499d1392c3a54736.
- Certificat SHA-256 inchangé : 106f6e6781b824308b1729feb65434c785f31fa82d4a6c0ade6f00891874c596.
- Fichier conservé : libfile_fa2e0228c4008191b33c0ac4d3876bf8.
- Le composant factice de reconnaissance est absent de l’APK livrée ; il
  figure uniquement dans l’APK des tests instrumentés.
- Aucun nouveau signal de publication reçu avec « Les 2 ». La production
  reste sur ede45978703cca2f8997ec8056c51a73865da052. L’activation du pont
  natif nécessite encore la publication autorisée du correctif web.

## Diagnostic web restant

La dictée Web Speech n’est pas disponible universellement. Elle dépend du
navigateur et de son service vocal, même si l’autorisation microphone est
accordée. Le correctif actuel ne contient pas de transcription indépendante
du navigateur ; aucun service vocal serveur ni clé dédiée ne sont configurés
localement. Ne pas annoncer cette panne web résolue sans connaître le
navigateur, le message obtenu et un essai réel.
