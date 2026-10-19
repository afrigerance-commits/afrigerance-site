# Correctif de dictée — 19 octobre 2026

Le signalement utilisateur ne précise pas le navigateur ni s’il concerne l’APK.
La cause sur son appareil n’est donc pas établie. L’inspection confirme que la
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
- Compilation web : en cours.
- Compilation APK, lint Android et essais sur émulateur : en attente.
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
