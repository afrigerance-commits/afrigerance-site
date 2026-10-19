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
- Sinon, retour à l’entrée précédente appartenant à l’origine MIRÂTH,
  y compris les routes Next créées avec l’History API. Les pages externes
  et about:blank ne deviennent pas la destination du retour.
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
