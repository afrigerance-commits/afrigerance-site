# État du cahier des charges — site AFRIGÉRANCE

Mise à jour : 25 septembre 2026 · Branche `claude/afrigerance-homepage-7974ch` · Site **non déployé**.

Référence : « TDR AFRIGERANCE — Cahier des charges » v1.0, avec les précisions données ensuite. Ces précisions priment sur le document :

- **Deux pôles uniquement** : « Infogérance » et « Intégration de solutions technologiques ». Ils remplacent les sept domaines du TDR (§ 3 et § 5).
- **Accueil court**, fidèle à la maquette. La méthode, les réalisations et les détails sont présentés sur les pages dédiées.

Légende :

- **Réalisé** : développé et vérifié (ordinateur, tablette, téléphone, clavier).
- **À développer** : aucune information ne manque, il reste du travail de développement.
- **Bloqué** : en attente d’une information ou d’une décision d’AFRIGÉRANCE.

> **Le site n’est pas terminé.** Les demandes de devis et de contact ne sont **pas encore reçues** : l’envoi par email est prêt dans le code, mais il reste à le configurer (voir § 8).

## 1–2. Présentation, objectifs, rédaction

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Présenter AFRIGÉRANCE, son approche et ses domaines | Réalisé | Accueil, Services, À propos |
| Modalités de contact | Bloqué | Page Contact et formulaire prêts. Aucune coordonnée n’est confirmée (téléphone, email, WhatsApp, adresse, horaires). |
| S’adresser au lecteur avec « vous », termes simples | Réalisé | |
| N’inventer aucun chiffre, client, certification, engagement | Réalisé | Vérifié sur toutes les pages. Aucune disponibilité ni aucun délai n’est promis. |
| Aider à identifier le service adapté | Réalisé | Page Services + formulaire guidé |
| Générer des demandes de devis qualifiées | Bloqué | Formulaire réalisé. Réception bloquée tant que l’envoi n’est pas configuré. |
| Générer des rendez-vous | À développer | Formulaire de rendez-vous non créé |
| Valoriser des réalisations réelles | Bloqué | Aucune réalisation ni autorisation fournie |
| Visibilité locale (SEO) | Bloqué | Voir § 13 : domaine et zones desservies manquants |
| Mise à jour sans intervention technique | À développer | Aujourd’hui, textes centralisés dans `src/content/`. Pas encore d’interface d’administration (voir § 12). |

## 3. Arborescence

| Rubrique | Statut | Commentaire |
| --- | --- | --- |
| Accueil | Réalisé | Version courte validée : bandeau, deux pôles, liens devis et contact. Secteurs, méthode, FAQ et réalisations volontairement absents de l’accueil. |
| À propos | Réalisé | Présentation, slogan, deux pôles, démarche en 5 étapes (textes du TDR § 1.2, 4.2, 4.3). |
| À propos : historique, date de création, équipe, valeurs officielles, partenaires, photos | Bloqué | Informations non fournies, donc non publiées |
| Services : vue d’ensemble | Réalisé | `/services` : deux pôles, 12 prestations, bouton devis avec présélection du pôle |
| Services : pages détaillées par pôle | À développer | Prévues par le TDR § 5 : situation client, bénéfices, déroulement, informations à fournir, limites, FAQ. Contenu à valider par AFRIGÉRANCE. |
| Secteurs (PME, éducation, administrations, commerce, BTP, résidentiel) | À développer | Textes de base disponibles dans le TDR § 6 |
| Réalisations | Bloqué | Cas vérifiés et autorisations nécessaires. Aucun cas fictif ne sera publié. |
| Ressources / FAQ | À développer | Plusieurs réponses sont bloquées (voir § 7) |
| Demander un devis | Réalisé | Formulaire complet. **Envoi à connecter** (§ 8). |
| Prendre rendez-vous | À développer | Voir § 9 |
| Contact | Réalisé | Formulaire court. **Envoi à connecter.** Coordonnées : bloquées. |
| Mentions légales | Bloqué | Page d’attente non indexée. Informations légales à fournir. |
| Politique de confidentialité | Bloqué | Responsable des données, finalités, durées de conservation et contact pour les droits à fournir |
| Bannière cookies | Réalisé | Non nécessaire à ce jour : le site ne dépose aucun cookie ni traceur. À revoir si un outil d’audience est ajouté. |

## 5. Services et prestations

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Deux pôles clairement séparés | Réalisé | |
| Infogérance : gestion du parc, support, infrastructures, cybersécurité, téléphonie IP, sauvegardes, audit | Réalisé | Descriptions tirées du TDR § 5.1 et 5.2 |
| Intégration : câblage Ethernet et fibre, vidéosurveillance, contrôle d’accès biométrique, pointage, sécurité incendie | Réalisé | Descriptions tirées du TDR § 5.3 |
| Validation des descriptions par AFRIGÉRANCE | Bloqué | À relire en priorité : **Téléphonie IP** et **Sécurité incendie** (absentes du TDR, décrites de façon générique), et le périmètre exact de chaque prestation. |

## 7. FAQ

| Question | Statut |
| --- | --- |
| Comment demander un devis ? / Informations à préparer / Installation existante | À développer (réponses disponibles dans le TDR) |
| Le devis est-il gratuit ? | Bloqué : à confirmer, y compris frais d’étude ou de déplacement |
| Zones d’intervention | Bloqué : villes, régions et conditions à préciser |
| Délais d’intervention / assistance 24 h/24 | Bloqué : engagements à confirmer |
| Maintenance récurrente | Bloqué : options réellement proposées à préciser |
| Utilisation des données | Bloqué : dépend de la politique de confidentialité |

## 8. Demande de devis

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Choix du pôle et de plusieurs prestations | Réalisé | Les deux pôles sont sélectionnables, avec l’option « Autre besoin » |
| Présélection du pôle depuis la page Services | Réalisé | `/devis?pole=infogerance` ou `?pole=integration` |
| Description du besoin et ville d’intervention | Réalisé | |
| Infogérance : nombre de postes et infrastructure existante, avec « Je ne sais pas » | Réalisé | |
| Intégration : type de locaux, installation nouvelle ou existante | Réalisé | Avec « Je ne sais pas » pour l’installation |
| Nom, entreprise (facultatif), email, téléphone, au moins un moyen de contact exigé | Réalisé | |
| Récapitulatif modifiable avant envoi | Réalisé | |
| Réponses conservées lors du retour en arrière | Réalisé | Vérifié |
| Erreurs compréhensibles | Réalisé | Liste d’erreurs cliquable + message sous chaque champ, lus par les lecteurs d’écran |
| États chargement, succès, erreur | Réalisé | Succès affiché **uniquement** après acceptation réelle de l’email |
| Aucun tarif calculé | Réalisé | |
| Validation côté serveur | Réalisé | Mêmes règles que dans le navigateur ; valeurs inattendues refusées |
| Anti-spam de base | Réalisé | Champ piège invisible, taille limitée |
| Limitation du nombre d’envois, captcha | À développer | Si du spam apparaît après la mise en ligne |
| Notification par email avec référence et résumé | Bloqué | Code prêt (Resend). Il manque la clé API et l’adresse de réception ; un nom de domaine est recommandé. |
| Accusé de réception à l’écran | Réalisé | Texte du TDR § 8.3 + référence |
| Email de confirmation au visiteur | À développer | Nécessite un domaine d’envoi vérifié |
| Type d’organisation, préférence de contact, fonction, calendrier dédié | À développer | Facultatifs dans le TDR. Le calendrier est aujourd’hui évoqué dans l’aide du champ « Description ». |
| Pièces jointes | À développer | Nécessite un stockage sécurisé (contrôle du type et de la taille) |
| Enregistrement protégé, statuts, historique, export | À développer | Nécessite une base de données et un espace d’administration |
| Accès limité et durée de conservation | Bloqué | Dépend de la politique de données |

## 9. Rendez-vous, contact, appels à l’action

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Formulaire de rendez-vous (créneaux demandés, confirmation) | À développer | Agenda automatique seulement si un outil réel est choisi |
| Contact : nom, moyen de contact, objet, message, information de confidentialité | Réalisé | **Envoi à connecter** |
| Liens téléphone, email, WhatsApp | Réalisé | Affichés automatiquement dès qu’une coordonnée est renseignée dans `src/content/site.ts`. Aucune n’est confirmée à ce jour. |
| Adresse et horaires | Bloqué | Non fournis, donc non publiés |
| Appel « Demander un devis » dans l’en-tête et sur chaque pôle | Réalisé | |
| Appel « Prendre rendez-vous » | À développer | Dépend du formulaire de rendez-vous |
| « Parlons de votre projet » en fin de page | Réalisé | Page À propos |
| Lien Contact dans le pied de page | Réalisé | |

## 10. Parcours utilisateur

| Parcours | Statut |
| --- | --- |
| Explorer : Accueil → Services → devis | Réalisé (FAQ et réalisations à venir) |
| Incident IT : Accueil → Infogérance → devis présélectionné | Réalisé |
| Responsable sécurité : Intégration → devis | Réalisé |
| Établissement : secteur éducation → services | À développer (pages Secteurs) |
| Prêt à contacter : bouton visible → formulaire → envoi confirmé | Réalisé jusqu’au serveur ; **réception bloquée** tant que l’envoi n’est pas configuré |
| Mobile : actions visibles, retour sans perte, résumé | Réalisé |

## 11. UX / UI et accessibilité

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Identité sobre, logo original, couleurs de la maquette | Réalisé | |
| Navigation courte + bouton devis visible, menu mobile | Réalisé | Secteurs, Réalisations et Ressources seront ajoutés au menu quand les pages existeront |
| Mobile d’abord, cibles tactiles, formulaires adaptés au clavier mobile | Réalisé | Vérifié de 320 à 1920 px |
| Contrastes AA, HTML sémantique, clavier, focus visible, libellés, erreurs explicites | Réalisé | Contrastes mesurés sur les rendus réels |
| Audit WCAG 2.2 AA complet avec lecteur d’écran | À développer | Recommandé avant la mise en ligne |
| Pas de carrousel, de fenêtre intrusive, de faux logos ni de faux avis | Réalisé | |

## 12. Technique, administration, sécurité

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Site responsive, navigateurs modernes | Réalisé | |
| Formulaires validés dans le navigateur et sur le serveur | Réalisé | |
| Aucune clé secrète dans le navigateur | Réalisé | Variables lues uniquement par le serveur |
| CMS ou interface d’administration (pages, services, FAQ, demandes, rôles) | À développer | Décision attendue : quel outil, selon le budget et les compétences |
| Hébergement, domaine, email, sauvegardes, coûts récurrents | Bloqué | Choix de l’hébergeur et du nom de domaine |
| Préproduction, mise en ligne, retour arrière | Bloqué | Pas de déploiement à ce stade, à votre demande |
| HTTPS | Bloqué | Fourni par l’hébergeur à la mise en ligne |
| Ne jamais demander de mot de passe ni de donnée sensible | Réalisé | Rappel affiché sur les formulaires |
| Obligations applicables au Sénégal (données personnelles) | Bloqué | À vérifier avec un conseil compétent |

## 13. SEO

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Titre et description par page, URL lisibles | Réalisé | |
| Titres H1, H2, H3 structurés, liens internes | Réalisé | Un seul H1 par page |
| Page 404 | Réalisé | |
| Pages en attente non indexées | Réalisé | Mentions légales |
| Sitemap XML, robots.txt, URL canoniques, aperçus de partage | Bloqué | Nom de domaine définitif nécessaire |
| Données structurées (entreprise locale) | Bloqué | Adresse et coordonnées confirmées nécessaires |
| Expressions liées aux zones desservies | Bloqué | Zones d’intervention à préciser |
| Outil d’audience respectueux de la vie privée | Bloqué | Décision attendue sur l’outil ; il pourrait nécessiter une bannière cookies |

## 14. Livrables

| Livrable | Statut |
| --- | --- |
| Pages Accueil, Services, Devis, À propos, Contact | Réalisé |
| Recette responsive, clavier, liens, formulaires, erreurs | Réalisé pour les pages existantes |
| Formulaires et notifications testés avec un vrai compte d’envoi | Bloqué : configuration Resend |
| Guide d’administration, transfert des accès, formation | À développer (après le choix de l’administration) |

## 16. Informations à fournir par AFRIGÉRANCE

| Élément | Débloque |
| --- | --- |
| Clé API Resend (ou autre service choisi) et adresse de réception des demandes | La réception des devis et messages |
| Nom de domaine | Envoi depuis votre domaine, sitemap, référencement, mise en ligne |
| Coordonnées : téléphone, email, WhatsApp, adresse, horaires | Page Contact, pied de page, données structurées |
| Dénomination légale exacte (AFRIGÉRANCE ou AFRIGERANCE), forme, immatriculation, siège, responsable de publication, hébergeur | Mentions légales |
| Politique de données : responsable, finalités, durées, contact pour les droits | Politique de confidentialité, conservation des demandes |
| Zones d’intervention, gratuité du devis, délais, horaires de support | FAQ, référencement local |
| Validation des 12 prestations (en particulier Téléphonie IP et Sécurité incendie) | Pages détaillées des pôles |
| Réalisations autorisées, témoignages approuvés, photos | Page Réalisations |
| Historique, équipe, valeurs officielles, partenaires autorisés | Compléments de la page À propos |
| Logo vectoriel (SVG) ou PNG haute définition à fond transparent | Qualité d’affichage du logo |
