# Recherche vocale documentaire MIRÂTH — 19 octobre 2026

## Autorisation et portée

« Vas y et publie directement sur Netlify » : publication de ce lot autorisée.
Aucun nouveau service facturé ni dépendance ajouté ; pas de changement natif Android.

## Fonctionnement

- Composant VoiceSearchForm partagé : accueil, recherche rapide du header, index Hadith, recherche globale et recherche de versets.
- Reconnaissance SpeechRecognition ou webkitSpeechRecognition détectée à l’exécution. Français ou arabe sélectionnable. Aucun accès au micro avant clic de l’utilisateur et autorisation du navigateur.
- Transcription affichée dans le champ, modifiable, limitée à 120 caractères ; aucune soumission automatique. Validation explicite par le bouton Rechercher, via navigation Next pour préserver le lecteur audio racine.
- Pause des audios MIRÂTH au démarrage pour ne pas transcrire la récitation. Pas de reprise automatique : les commandes audio restent disponibles.
- Fin de phrase, bouton Terminer, annulation, délai de 20 secondes d’écoute, changement de visibilité ou démontage : arrêt/nettoyage de l’instance. Les callbacks tardifs sont ignorés. Refus de permission, absence de micro, réseau et langue non prise en charge produisent un message exploitable.
- En l’absence d’API compatible, le bouton et le message expliquent la limite ; le champ reste utilisable. La dictée du clavier du système peut être utilisée si disponible.

## Recherche « intelligente »

Normalisation des variantes existantes (Fajr/Sobh/aube/aurore, Mouwatta/Muwatta, etc.), retrait des formulations de consigne, détection de catégorie hadith/invocation/prophète et du recueil. Le filtre explicite choisi par l’utilisateur est prioritaire. Les mots-clés et le recueil retenus sont visibles pour corriger la demande. Les thèmes inconnus ne génèrent aucune réponse.

La phrase « Peux-tu me trouver les hadiths sur la prière du Fajr dans le Mouwatta » retrouve le récit déjà indexé à /hadith/muwatta/1#hadith-3 ; aucun texte ni numéro n’est inventé. L’index inclut désormais les récits de prophètes publiés ; variantes Moussa/Musa/Moïse reconnues. Les résultats donnent les notices ou passages existants avec leurs références. Il ne s’agit ni d’une recherche vectorielle universelle ni d’un assistant de fatwa.

## Confidentialité

Aucun MediaRecorder, fichier audio, envoi à une API MIRÂTH ou stockage audio n’est ajouté. Le navigateur peut utiliser un service distant de reconnaissance ; avertissement au formulaire et section /confidentialite#recherche-vocale. Le texte est envoyé seulement à la recherche explicitement validée, dans l’URL ; historique et journaux techniques de l’hébergement peuvent le contenir.

Sources techniques consultées :
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/start

## Vérifications

- Suite complète : 217 tests réussis, 52 fichiers.
- TypeScript validé ; compilation complète réussie, 972 pages générées.
- Tests ajoutés : activation uniquement au clic, texte modifiable, absence de recherche automatique, API préfixée, arabe, compatibilité absente, refus, annulation/callback tardif, délai, navigation, changement de visibilité et nettoyage. Tests documentaires sur le corpus réel Muwatta et requêtes inconnues.
- Aucun test de micro réel, qualité de reconnaissance, écran mobile ou capture visuelle dans cet environnement sans navigateur de contrôle. Les tests de reconnaissance utilisent un double de l’API.

## Compatibilité et APK

La présence de l’API ne garantit pas l’accès effectif au service de reconnaissance sur chaque navigateur. WebView de l’APK et Firefox peuvent ne pas la fournir ou refuser le service ; ces cas sont gérés par les messages et la saisie. Aucun moteur natif de reconnaissance n’a été ajouté à l’APK actuelle. La recherche Web nécessite une connexion Internet. Pas de garantie de transcription locale ou hors ligne.


## Publication vérifiée

Publié sur https://miraath.netlify.app avec le commit
ede45978703cca2f8997ec8056c51a73865da052. Contrôles HTTP 200 : accueil
et index Hadith avec bouton « Dicter ma recherche », recherche globale
avec la phrase naturelle Fajr/Mouwatta affichant les mots-clés retenus et
des liens /hadith/muwatta/, et confidentialité avec l’ancre recherche-vocale.
La mise en ligne est confirmée ; aucun essai réel de micro ou de téléphone
n’est revendiqué. Un seul changement de référence de production a déclenché
Netlify. Aucun nouvel APK nécessaire pour afficher cette interface web ;
le support de la dictée directe dans le WebView reste conditionnel.
