# Retour Android — 19 octobre 2026

## Problème et correction

L’utilisateur signale que le geste Android de retour vers la droite quitte
MIRÂTH au lieu de revenir à la page précédente. L’inspection de Capacitor
8.5.2 et de MainActivity confirme qu’aucun gestionnaire ne relie le Retour
système à l’historique de la WebView.

- Callback AndroidX OnBackPressedCallback enregistré auprès du dispatcher
  de l’activité. Même parcours pour le geste système et le bouton Retour.
- Un panneau Radix visible reçoit Échap avant toute navigation : menu,
  dialogue, liste et feuille. Les contrôles de fermeture peuvent toujours
  conserver le panneau ouvert, par exemple si son gestionnaire refuse Échap.
- Les routes Next sont suivies par un compteur dans l’état de chaque entrée
  History API, sans retirer les champs de Next. Le retour utilise history.back
  dans le rendu web pour ces routes ; les chargements de documents utilisent
  l’historique natif limité à l’origine MIRÂTH. Le script est injecté uniquement
  dans l’origine de l’application (dès le début du document si la WebView le
  permet, puis au chargement visible comme repli) et ignore les iframes.
- Une page ouverte directement sans historique revient à l’accueil. Son
  ancienne entrée est retirée pour éviter une boucle entre accueil et page.
- À l’accueil sans historique, un premier Retour affiche une indication.
  Un second dans les deux secondes met la tâche en arrière-plan. La
  confirmation est réinitialisée lors d’un déplacement ou d’une pause.
- Attente du résultat web limitée à 1 500 ms, opérations concurrentes et
  callbacks tardifs ignorés, nettoyage à la destruction de l’activité.
- APK 1.5 / versionCode 6 ; certificat et identifiant conservés. Les
  fonctionnalités audio et vocales de l’APK 1.4 sont incluses.

## Publication

Ce correctif est entièrement natif et ne nécessite aucun déploiement
Netlify ni nouveau pont web. Ne pas modifier la branche de production.
La compilation sur branche de travail utilise [skip netlify]. L’installation
de l’APK 1.5 remplace l’APK précédente ; une actualisation du site seule
ne corrige pas la gestion native du Retour.

## Vérifications finales

- Aucun fichier web fonctionnel modifié ; pas de répétition des 227 tests
  web ou de la compilation Next pour un lot purement Android.
- Tests instrumentés ajoutés : véritable geste depuis le bord en navigation
  gestuelle sur émulateur ; retour successif entre routes Next sans rechargement
  global ; fermeture du panneau avant retour ; repli accueil sans boucle ;
  confirmation de sortie limitée dans le temps.
- Quatre tests unitaires du script History API réussis ; TypeScript sans erreur.
- Compilation APK et tests Android, lint sans erreur, signature vérifiée.
- Treize tests instrumentés réussis sur Android 15 AOSP x86_64 / Pixel 7,
  sans échec ni test ignoré : geste réel depuis le bord, routes Next sans
  rechargement global, fermeture des panneaux, repli accueil, double Retour
  à durée limitée, rendu ralenti, lecture/arabe, audio écran éteint, alarme
  d’adhan et résultats vocaux simulés.
- Capture native après installation inspectée : accueil et navigation
  visibles, sans fenêtre système devant l’application. Cette inspection
  ne constitue pas une revue visuelle de tous les écrans.
- Aucun essai sur le téléphone physique de l’utilisateur.

Sources :
- https://developer.android.com/guide/navigation/navigation-custom-back
- https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture
- Sources locales Capacitor 8.5.2 : BridgeActivity / BridgeWebViewClient.

## Première vérification et adaptation

Exécution 39298062461, commit 4149391c8b956bf23bc080531ff385ca6450fd78 :
compilation et lint sans erreur, mais tests de retour entre routes échoués.
L’historique des routes est désormais traité dans le rendu web, avec les
métadonnées Next préservées. Quatre tests ciblés valident l’état de navigation,
le retour sans rechargement, la fermeture préalable des panneaux et la
coexistence avec un routeur enveloppant l’History API. Le test de sortie
attend désormais l’arrêt complet de l’activité et le test de sélection audio
attend l’attachement du gestionnaire React avant de simuler une modification.
Cette APK intermédiaire n’a pas été livrée. La vérification suivante porte sur cette adaptation.

## Deuxième vérification : fenêtre système de l’émulateur

Exécution 39300723587, commit 338ca979b3a242f0182eb9fb793bf52540d7b16f :
compilation et lint réussis, 10 tests sur 12 réussis. Les retours par le
dispatcher, la fermeture du panneau et le repli accueil passent. Le journal
InputDispatcher montre que le véritable balayage arrive sur « Application Not
Responding: com.google.android.apps.nexuslauncher », devant MIRÂTH. Le contrôle
vocal échoue également sur une fenêtre sans focus, après un résultat simulé
correctement transmis. Le parcours web conserve bien son compteur à 2.

La navigation gestuelle est désormais activée avant de lancer les tests,
pour éviter le redémarrage du lanceur pendant le scénario. L’émulateur reçoit
3 Go de mémoire et les scénarios qui interagissent avec le système attendent
explicitement le focus réel de MainActivity. Les assertions de navigation et
le véritable balayage sont conservés. Aucun échec n’est masqué ou relancé
automatiquement. La troisième vérification est consignée ci-dessous ; aucune APK intermédiaire
livrée ni publication Netlify.

## Troisième vérification et environnement isolé

Exécution 39334665938, commit c90d09b9cc6fff7a31f781438c2f68d6c0bea15f :
compilation et lint réussis, 9 tests sur 12 réussis. Le contrôle de focus
confirme explicitement l’alerte ANR de nexuslauncher devant MIRÂTH. L’image
de test passe à Android 15 AOSP (default/x86_64), sans lanceur ni services
Google. Le fournisseur vocal simulé reste dans l’APK de test séparée ;
aucune modification du moteur vocal livré. Les alertes système et les
échecs ne sont pas masqués.

Les scénarios attendent aussi la présence du pont de retour avant action.
La fenêtre de réponse laisse 1 500 ms à un rendu chargé, sans retarder
une réponse normale. En cas de délai dépassé, aucun retour natif ne se
superpose au JavaScript susceptible de s’exécuter tardivement. Un scénario
supplémentaire bloque volontairement le rendu 2,3 s pour vérifier qu’une
seule action Retour ne saute pas deux pages. Les treize tests passent dans l’exécution ci-dessous.

## Livraison validée

- Exécution réussie : https://github.com/afrigerance-commits/afrigerance-site/actions/runs/39335865416
- Source compilée : 2438a5ff68e7d0b75f993a84da9e6aafd1772866.
- APK : MIRATH-Android-1.5.apk, versionCode 6, 15 531 247 octets.
- SHA-256 : cd41461d2dd1b6a9822eb5a871854cd37529b371bf20dc0c6162f3b06e315535.
- Certificat SHA-256 : 106f6e6781b824308b1729feb65434c785f31fa82d4a6c0ade6f00891874c596,
  identité de test identique à celle de l’APK 1.4.
- Fichier conservé : libfile_e43d30c1bd408191bb61b7d5a49172fb.
- L’asset de navigation embarqué correspond exactement au source ; le
  pont vocal est présent et SpeechTestActivity est exclue de l’APK livrée.
- Aucun déploiement Netlify. Branche de production inchangée :
  89e7ec6f02442095db58fd75165757ffba2663c7.
- Installer cette APK par-dessus la version précédente. Le correctif natif
  ne s’active pas par une simple actualisation de la version web.

Les versions des vérifications intermédiaires échouées n’ont pas été livrées.
Le comportement sur le téléphone physique de l’utilisateur reste à confirmer.
