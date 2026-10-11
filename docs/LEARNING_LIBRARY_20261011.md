# MIRÂTH — bibliothèque et apprentissage, 11 octobre 2026

## Statut de livraison

Lot préparé localement, aucun déploiement Netlify ni poussée vers une branche distante. La consigne utilisateur de publication sur signal reste applicable. Aucun PDF reçu sur Telegram n’a été rendu public. Les migrations Supabase sont préparées mais non appliquées dans cette session : aucun accès d’administration de la base n’est disponible.

## Fonctions réalisées

- Guide original « Apprendre avec les sources », neuf chapitres issus des parcours MIRÂTH déjà documentés. Lecture adaptée aux petits écrans, taille du texte, sommaire, reprise au chapitre, signets, exercices corrigés et liens de référence. Aucun scan ni traduction moderne des livres fournis reproduit.
- Lecteur de PDF dont la diffusion est autorisée : repère de page, signets, copie hors connexion et suppression. Le numéro de page doit être enregistré à partir du contrôle prévu ; le défilement interne du lecteur natif ne peut pas être observé. Affichage PDF dépendant du navigateur/WebView, avec lien vers le lecteur de l’appareil. Aucun PDF de démonstration ajouté pour contourner l’absence de droits.
- Catalogue connecté aux ouvrages explicitement publiés en base, avec remplacement d’une notice locale par son édition autorisée, recherche générale et sitemap. Catalogue local conservé si la configuration de base n’est pas active.
- Administration des livres : créer/modifier une fiche, envoyer un PDF privé (30 Mo maximum), préciser l’édition, les pages et le justificatif de droits, conserver un brouillon ou publier. Publication et validation des droits réservées à l’administrateur ou au responsable scientifique. Historique des droits écrit par déclencheur en base ; le public ne lit pas les brouillons ni leurs fichiers. Les éditeurs d’articles et de vidéos existants sont conservés ; les autres interfaces d’administration ne deviennent pas toutes des éditeurs complets dans ce lot.
- Synchronisation des leçons validées, positions de livres, signets coraniques, notes, favoris, dernière lecture et objectifs. Espaces séparés pour lecture sans compte et chaque compte ; import volontaire des données sans compte. Les copies audio et PDF restent sur l’appareil.
- Modifications conservées hors connexion, reprise de synchronisation au retour réseau, contrôle de révision pour éviter les écrasements silencieux. En cas de conflit, possibilité de copier la version locale et de choisir explicitement la version locale ou distante. Résultats des requêtes abandonnés après un changement de compte. Éditeur de notes réinitialisé lors du changement de compte.
- Neuf leçons enrichies à cinq questions chacune (45 QCM), avec mises en situation, explications et exercice de réflexion corrigé. Aucune nouvelle parole religieuse créée.
- Contrôles audio de l’écran verrouillé enrichis par une position Media Session validée. Séquence arabe/français testée en document masqué. Diagnostic adhan : actualisation, procédure de test, dernière lecture démarrée et lecture en cours dans une prochaine compilation native. Un démarrage du lecteur ne prouve pas que le son a été entendu.

## Sources contrôlées pour les parcours

Contrôle des références existantes : https://sunnah.com/bukhari:2387 ; https://sunnah.com/bukhari:2400 ; https://sunnah.com/muslim:1563a ; https://sunnah.com/bukhari:6446 ; https://quran.com/al-fatihah . Les exercices ajoutés reformulent les thèmes des leçons ; ils ne constituent pas des traductions ni des citations prophétiques supplémentaires.

La disponibilité en ligne d’un fichier n’établit pas le droit de le republier : FAQ et guide de l’OMPI, https://www.wipo.int/en/web/copyright/faq-copyright et https://www.wipo.int/export/sites/www/sme/en/documents/guides/customization/creative_expression_pa.pdf .

## Activation requise

Appliquer dans l’ordre les migrations `0001_init.sql`, `0002_rls.sql` (si absentes), puis `0003_reader_state.sql` et `0004_book_library.sql`, sur le projet Supabase MIRÂTH. Les nouvelles migrations ajoutent l’espace privé de synchronisation, la fonction de contrôle de révision, les colonnes de publication et le stockage privé des livres. Ne pas désactiver RLS ni distribuer de clé de service au navigateur.

Avant d’activer les fonctions pour le public : deux comptes réels sur deux appareils, absence d’accès croisé aux données, reprise après coupure réseau, publication d’un ouvrage réellement autorisé, refus d’un brouillon et téléchargement du PDF uniquement après validation.

## Vérifications et limites

131 tests réussis (36 fichiers), TypeScript et compilation de production réussis. Tests spécifiques : séparation invités/comptes, changement de compte pendant une requête, conflits de révision, reprise et signets du livre, confirmation d’enregistrement hors connexion, filtrage des accès aux ouvrages, chemins de stockage et séquence arabe/français en document masqué.

Pas d’essai visuel navigateur, pas de téléphone physique connecté, pas de SDK Android disponible ici. Pas de nouvelle APK compilée pour les deux champs de diagnostic natif. Les tests physiques écran verrouillé, restrictions de batterie, interruptions par appel, adhan aux heures réelles et audio hors connexion restent à réaliser ; aucun résultat fictif ne leur est attribué. Les politiques SQL restent à éprouver sur Supabase après activation.
