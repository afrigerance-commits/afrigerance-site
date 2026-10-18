# Lecture du Coran en arrière-plan — préparée le 11 octobre 2026

## Livraison

Android 1.3 (versionCode 4), même identifiant et même signature de test que la 1.2. La production Netlify n’a pas été modifiée. Il faut publier le nouveau lecteur web puis installer la 1.3 pour activer le pont natif ; l’APK actuelle 1.2 conserve le lecteur web. iOS n’est pas inclus.

## Implémentation

- Media3 1.11.1 : ExoPlayer et MediaSessionService indépendants de la WebView.
- File complète avant lecture : arabe, français ou alternance par verset, avec références de sourate/verset pour Juz/Hizb.
- Répétition par verset (les deux voix ensemble) ou par portion ; mémorisation finie et pauses WAV silencieuses découpées.
- Minuterie native, notification Android et commandes système ; focus audio et pause au débranchement du casque.
- L’Activity se détache sans arrêter la file. Au retour, état et position natifs actualisés.
- Alternatives audio d’un même verset essayées après une erreur ; aucun verset n’est sauté automatiquement.
- Les packs du cache web sont copiés dans le stockage privé Android avant un démarrage hors connexion ; les pistes manquantes bloquent le démarrage. Leur suppression retire aussi la copie native.
- Le lecteur web demeure utilisé dans le navigateur et dans les APK sans plugin.

## Vérification

Suite web : 163 tests réussis, puis trois tests ciblés du moteur après dernière correction (un ajout), TypeScript, lint ciblé et build de 368 pages. Tests spécifiques : ordre bilingue, frontières de sourates, répétitions, mémorisation et silences, restauration, pause/reprise, minuterie, erreurs visibles et transfert hors connexion.

Exécution GitHub Actions finale : https://github.com/afrigerance-commits/afrigerance-site/actions/runs/38151172515
Source native/web : 546ad4d6d6dda3318703f91ef13666d9f22ade56 ; arbre identique au lot local 7ab8e3af5eb236301ffa9222042d97307cbe7970. Compilation APK, lint Android, signature et cinq tests instrumentés Android 15 réussis (zéro échec, zéro test ignoré). Les deux essais du Coran vérifient le passage à la piste suivante écran éteint, pause/reprise, destruction de l’Activity et délai d’arrêt sans minuterie web. Les trois autres contrôlent l’adhan et la navigation/contenu. Le test de navigation a été adapté aux trois modes audio actuels.

Ces essais utilisent du WAV silencieux pour l’audio natif. Ils ne certifient pas l’écoute physique d’une récitation ni les restrictions de tous les constructeurs. Aucun téléphone réel connecté.

APK : MIRATH-Android-1.3.apk — 15 524 341 octets.
SHA256 : 71f6c87dfb2df2ec88827c37807b65f79a4a8b89ce0f67e5259be7b775cd8e39.
Certificat SHA256 : 106f6e6781b824308b1729feb65434c785f31fa82d4a6c0ade6f00891874c596.

## Essai sur téléphone après activation

1. Installer la 1.3, ouvrir le lecteur et lancer une récitation ; attendre que le son commence.
2. Passer vers une autre application, puis verrouiller deux minutes : vérifier plusieurs changements de versets.
3. Refaire en français seul puis arabe/français ; au retour vérifier le verset et la voix affichés.
4. Vérifier pause/reprise depuis la notification et arrêt depuis MIRÂTH.
5. Tester interruption par un appel/autre lecture, débranchement du casque et minuterie.
6. Pour le hors connexion, télécharger d’abord la portion et les langues choisies ; activer le mode avion, lancer la lecture et verrouiller. Vérifier aussi une piste non téléchargée : elle doit produire un message explicite.

Un arrêt forcé Android ou un téléphone éteint arrête le son. Ce lot n’est pas publié sur le Play Store et la clé reste une clé publique de test.
