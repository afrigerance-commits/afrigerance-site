# MIRÂTH — faisabilité du suivi de récitation

Étude du 9 octobre 2026. Aucune reconnaissance vocale n’est activée dans cette livraison.

## Conclusion

Un suivi original de la récitation est techniquement envisageable : écouter avec le consentement de l’utilisateur, retrouver sa position et révéler les mots du texte coranique validé. Les oublis et substitutions peuvent ensuite être signalés comme des passages à vérifier. Il faut un prototype et une validation avant de promettre cette détection aux lecteurs.

Tarteel indique ne pas proposer d’API publique. Son application et son moteur privé ne peuvent donc pas être simplement intégrés à MIRÂTH. Le modèle public `tarteel-ai/whisper-base-ar-quran`, déclaré Apache-2.0, constitue une piste pour un prototype indépendant de reconnaissance de mots. Sa fiche laisse plusieurs limites et données d’évaluation non renseignées ; sa métrique publiée ne garantit ni les résultats sur téléphone ni la détection d’erreurs de récitation. Il n’offre pas ici de service d’inférence déjà déployé.

## Fonctionnement proposé

1. Le lecteur sélectionne une sourate ou une portion Hafs et autorise explicitement le microphone. Les récitations audio de MIRÂTH sont suspendues pour éviter que le microphone ne reconnaisse le Qari.
2. Une détection de parole et de silence découpe le son en segments courts. Un modèle de reconnaissance produit des hypothèses de mots ; les résultats partiels peuvent être révisés.
3. Un alignement avec le passage choisi retrouve la position, y compris après une pause, une répétition ou un retour en arrière. L’application révèle les mots issus du corpus coranique validé, jamais un texte arabe inventé par le modèle.
4. Si la reconnaissance est incertaine, le suivi attend ou demande de répéter ; il ne confirme pas une bonne récitation. Une divergence persistante peut être montrée comme « passage à vérifier ».
5. L’arrêt désactive le microphone. L’utilisateur garde le contrôle de la séance et de la conservation éventuelle de ses enregistrements.

Un alignement forcé à partir du texte attendu ne suffit pas : il peut faire correspondre un mot omis à du silence. Il faut confronter une reconnaissance indépendante aux mots attendus avant de signaler une erreur.

## Deux niveaux distincts

| Objectif | État de faisabilité |
| --- | --- |
| Révéler le texte au fil de la récitation | Prototype réalisable, avec délai et correction des hypothèses partielles à mesurer |
| Repérer des mots omis, ajoutés ou remplacés | Développement et évaluation nécessaires ; faux positifs et incertitude à afficher |
| Vérifier les voyelles et la prononciation | La reconnaissance des mots normalisés ne suffit pas |
| Corriger le tajwîd, les points d’articulation et les durées | Travail phonétique spécialisé et validation par des enseignants qualifiés |

Ne pas annoncer « toutes les erreurs détectées ». Normaliser les lettres pour l’alignement peut masquer des différences : conserver le texte canonique et analyser séparément toute prétention à corriger la prononciation.

## Architecture et coûts

Deux voies restent à mesurer : un service de reconnaissance dédié avec coûts de calcul, latence et connexion ; ou un modèle optimisé sur téléphone, avec contraintes de mémoire, chauffe et batterie. Une compilation Android seule n’établit pas que la reconnaissance fonctionne hors ligne ou écran éteint. Les deux approches exigent des essais sur le téléphone physique ciblé.

Le calcul de reconnaissance doit être séparé des builds et du site Netlify. Aucun serveur payant, fournisseur, clé, modèle téléchargé ni abonnement n’a été créé pour cette étude. Définir un budget de séance après mesure sur un prototype. Ne conserver aucun audio par défaut ; expliquer toute transmission avant l’activation d’un service distant.

## Validation nécessaire

Constituer un ensemble autorisé de récitations correctes et de fautes annotées par des enseignants, avec voix, microphones, bruits, vitesses et niveaux variés. Séparer les personnes présentes dans l’évaluation de celles ayant servi à régler le système. Mesurer la précision des alertes, les erreurs manquées, les mauvaises positions, le délai de révélation et le comportement lors des pauses et répétitions. Tester les permissions, les interruptions audio, le réseau absent et la consommation sur appareil réel. Fixer les seuils après ces mesures, pas à partir d’une précision supposée.

Le jeu TLOG public est soumis à des conditions d’accès et sa fiche indique des étiquettes issues des noms de fichiers sans vérification supplémentaire. Il ne remplace pas un corpus de fautes validé. Aucune condition d’accès n’a été acceptée et aucun jeu d’entraînement n’a été téléchargé.

## Sources primaires consultées

- Tarteel, absence d’API publique : https://support.tarteel.ai/en/articles/12414464-do-you-have-an-api-i-can-use
- Tarteel, description de ses techniques : https://support.tarteel.ai/en/articles/12414469-what-ml-model-algorithms-techniques-do-you-use
- Modèle public et licence annoncée Apache-2.0 : https://huggingface.co/tarteel-ai/whisper-base-ar-quran
- Jeu TLOG, accès et limites des annotations : https://huggingface.co/datasets/tarteel-ai/tlog

## Livraison actuelle

Seuls l’audio français alterné et la navigation inférieure sont implémentés dans les sources locales. Le suivi de récitation reste une étude. La publication et tout build Netlify attendent le signal explicite de l’utilisateur.
