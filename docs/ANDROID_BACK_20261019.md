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
- Attente du résultat web limitée à 500 ms, opérations concurrentes et
  callbacks tardifs ignorés, nettoyage à la destruction de l’activité.
- APK 1.5 / versionCode 6 ; certificat et identifiant conservés. Les
  fonctionnalités audio et vocales de l’APK 1.4 sont incluses.

## Publication

Ce correctif est entièrement natif et ne nécessite aucun déploiement
Netlify ni nouveau pont web. Ne pas modifier la branche de production.
La compilation sur branche de travail utilise [skip netlify]. L’installation
de l’APK 1.5 remplace l’APK précédente ; une actualisation du site seule
ne corrige pas la gestion native du Retour.

## Vérifications en cours

- Aucun fichier web fonctionnel modifié ; pas de répétition des 227 tests
  web ou de la compilation Next pour un lot purement Android.
- Tests instrumentés ajoutés : véritable geste depuis le bord en navigation
  gestuelle sur émulateur ; retour successif entre routes Next sans rechargement
  global ; fermeture du panneau avant retour ; repli accueil sans boucle ;
  confirmation de sortie limitée dans le temps.
- Compilation, lint et essais sur émulateur : en attente.
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
Cette APK intermédiaire n’a pas été livrée. Nouvelle compilation en cours.

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
automatiquement. Troisième vérification en cours ; aucune APK intermédiaire
livrée ni publication Netlify.
