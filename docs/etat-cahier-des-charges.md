# État du cahier des charges — site AFRIGÉRANCE

Mise à jour : 4 octobre 2026 · Branche `claude/afrigerance-homepage-7974ch` · Site **en ligne** sur https://afrigerance.netlify.app (branche `main`, Netlify).

Référence : « TDR AFRIGERANCE — Cahier des charges » v1.0, avec les précisions données ensuite. Ces précisions priment sur le document :

- **Deux pôles uniquement** : « Infogérance » et « Intégration de solutions technologiques ». Ils remplacent les sept domaines du TDR (§ 3 et § 5).
- **Accueil enrichi** (octobre 2026) : direction artistique premium et motion design demandés. La maquette d’origine reste la base : bandeau bleu en dégradé, titre, deux pôles.

Légende :

- **Réalisé** : développé et vérifié (ordinateur, tablette, téléphone, clavier).
- **À développer** : aucune information ne manque, il reste du travail de développement.
- **Bloqué** : en attente d’une information ou d’une décision d’AFRIGÉRANCE.

> **Le site est prêt à déployer.** Enregistrement des demandes (devis, rendez-vous, contact), espace administrateur et notification par email sont développés et testés sur une base de test. Ils n’ont **pas encore été raccordés à de vrais services** : il faut fournir la base de données et les paramètres email (voir § 8 et § 16). Tant que ce n’est pas fait, aucune demande réelle n’est reçue.

## 1–2. Présentation, objectifs, rédaction

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Présenter AFRIGÉRANCE, son approche et ses domaines | Réalisé | Accueil, Services, À propos |
| Modalités de contact | Réalisé en partie | Formulaire, page Contact et pied de page. Téléphone, email et adresse confirmés et publiés (octobre 2026). WhatsApp et horaires non fournis, donc non publiés. |
| S’adresser au lecteur avec « vous », termes simples | Réalisé | |
| N’inventer aucun chiffre, client, certification, engagement | Réalisé | Vérifié sur toutes les pages. Aucune disponibilité ni aucun délai n’est promis. |
| Aider à identifier le service adapté | Réalisé | Page Services + formulaire guidé |
| Générer des demandes de devis qualifiées | Bloqué | Formulaire, enregistrement et administration réalisés et testés. Réception réelle bloquée tant que la base de données (`DATABASE_URL`) n’est pas fournie. |
| Générer des rendez-vous | Bloqué | Formulaire `/rendez-vous`, enregistrement, notification et administration réalisés et testés. Réception réelle bloquée tant que la base de données n’est pas fournie. |
| Valoriser des réalisations réelles | Bloqué | Aucune réalisation ni autorisation fournie |
| Visibilité locale (SEO) | Réalisé en partie | Plan du site, robots.txt, URL canoniques, image d’aperçu et données structurées réalisés (§ 13). Domaine et zones desservies manquants. |
| Mise à jour sans intervention technique | À développer | Les demandes se traitent dans `/admin`. Les textes des pages restent dans `src/content/` : pas encore d’édition de contenu en ligne (voir § 12). |

## 3. Arborescence

| Rubrique | Statut | Commentaire |
| --- | --- | --- |
| Accueil | Réalisé | Bandeau (titre animé, carte de l’Afrique, devis, rendez-vous, services), logos partenaires, deux pôles, démarche en cinq étapes, publics, FAQ courte, appel final « Parlons de votre projet ». Réalisations absentes : aucun cas fourni. |
| Direction artistique et motion design | Réalisé | Typographies Bricolage Grotesque, Instrument Serif et Geist ; charte graphique d’AFRIGÉRANCE (bleu du logo `#2E75B6`, gris anthracite `#3B4451`, noir ; fonds blancs, bleus ou gris), contraste AA vérifié sur toutes les pages aux trois largeurs ; grain et quadrillage ; révélations au défilement, transitions entre pages, profondeur au pointeur, micro-interactions. « Réduire les animations » respecté, contenu lisible sans JavaScript (testé). |
| Accueil : image fondue dans le bandeau bleu | Réalisé | Carte de l’Afrique en points (données Natural Earth, domaine public) et motif « réseau » provisoire créé pour le site ; à remplacer par une photo d’AFRIGÉRANCE si disponible (`hero.image`). Contraste du texte vérifié à 1440, 768 et 390 px, y compris avec une photo claire. |
| Accueil : logos « Ils nous font confiance » | Réalisé | 11 logos fournis par AFRIGÉRANCE (`src/content/partners.ts`). Accord de chaque organisation à conserver par AFRIGÉRANCE. Versions haute définition souhaitées pour FIM Capital, Indigo Voyages et Tara Group, et version couleur de Fabrimetal (logo blanc affiché sur carte foncée). |
| À propos | Réalisé | Présentation, slogan, deux pôles, démarche en 5 étapes (textes du TDR § 1.2, 4.2, 4.3). |
| À propos : historique, date de création, équipe, valeurs officielles, partenaires, photos | Bloqué | Informations non fournies, donc non publiées |
| Services : vue d’ensemble | Réalisé | `/services` : deux pôles, 12 prestations, bouton devis avec présélection du pôle |
| Services : pages détaillées par pôle | Réalisé | `/services/infogerance` et `/services/integration` : besoins, prestations, démarche, bon à savoir, informations utiles, FAQ, devis prérempli. Textes issus du TDR § 5, à relire par AFRIGÉRANCE. |
| Secteurs (PME, éducation, administrations, commerce, BTP, résidentiel) | Réalisé en partie | Publics présentés sur l’accueil (TDR § 2.2 et § 6). Pages dédiées par secteur non créées : contenu à fournir. |
| Réalisations | Bloqué | Cas vérifiés et autorisations nécessaires. Aucun cas fictif ne sera publié. |
| Ressources / FAQ | Réalisé | Page `/faq` : 8 questions aux réponses confirmées, données structurées FAQPage. Les questions bloquées (§ 7) ne sont pas publiées. |
| Demander un devis | Réalisé | Formulaire complet, demandes enregistrées dans la base de production (Neon). |
| Prendre rendez-vous | Réalisé | Page `/rendez-vous` (voir § 9) |
| Contact | Réalisé | Formulaire court, messages enregistrés. Téléphone, email et adresse affichés. |
| Mentions légales | Bloqué | Page d’attente non indexée. Informations légales à fournir. |
| Politique de confidentialité | Bloqué | Page `/confidentialite` rédigée d’après le fonctionnement réel du site, non indexée. À compléter : responsable du traitement, durée de conservation. |
| Bannière cookies | Réalisé | Non nécessaire à ce jour : le site public ne dépose aucun cookie ni traceur. Seul l’espace administrateur utilise un cookie de session, strictement nécessaire. À revoir si un outil d’audience est ajouté. |

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
| Comment demander un devis ? / Informations à préparer / Installation existante | Réalisé (page FAQ et accueil) |
| Le devis est-il gratuit ? | Bloqué : à confirmer, y compris frais d’étude ou de déplacement |
| Zones d’intervention | Bloqué : villes, régions et conditions à préciser |
| Délais d’intervention / assistance 24 h/24 | Délai : réponse générique publiée, sans engagement. Assistance 24 h/24 : bloqué, engagement à confirmer |
| Maintenance récurrente | Bloqué : options réellement proposées à préciser |
| Utilisation des données | Réalisé : réponse factuelle, renvoi vers `/confidentialite`. Politique complète à valider |

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
| États chargement, succès, erreur | Réalisé | Succès affiché **uniquement** si la demande est enregistrée en base. Enregistrement impossible : message d’erreur, rien n’est confirmé. |
| Aucun tarif calculé | Réalisé | |
| Validation côté serveur | Réalisé | Mêmes règles que dans le navigateur ; valeurs inattendues refusées |
| Anti-spam | Réalisé | Champ piège invisible, délai minimal de 2 s, taille limitée, au plus 5 demandes en 10 minutes et 20 par jour par connexion (empreinte IP, jamais l’adresse elle-même) |
| Doubles soumissions | Réalisé | Clé unique par formulaire : un double clic ou un nouvel essai n’enregistre qu’une demande |
| Captcha | À développer | Seulement si du spam passe malgré les protections |
| Notification par email au gestionnaire | Bloqué | Réalisé pour les devis, les demandes de rendez-vous et les messages de contact. L’email contient référence, date, pôles, prestations, description, ville, coordonnées et, si `SITE_URL` est renseignée, un lien vers la fiche `/admin`. Testé avec un service d’email simulé. Resend configuré (expéditeur de test `onboarding@resend.dev`, destinataire afrigerance@gmail.com) : `npm run email:test` accepté par Resend. **Réception des notifications du site en ligne : à confirmer.** Accusé de réception au visiteur : nécessite un domaine vérifié chez Resend. |
| Demande conservée si l’email échoue | Réalisé | Échec visible dans l’administration (bandeau, filtre, badge, erreur Resend). Le bouton « Renvoyer la notification » renvoie seulement l’email, jamais une seconde demande ; deux clics simultanés ne produisent qu’un email. « Envoyée » n’est affiché qu’après acceptation par Resend. |
| Accusé de réception à l’écran | Réalisé | Texte du TDR § 8.3 + référence |
| Email de confirmation au visiteur | À développer | Nécessite un domaine d’envoi vérifié |
| Type d’organisation, préférence de contact, fonction, calendrier dédié | À développer | Facultatifs dans le TDR. Le calendrier est aujourd’hui évoqué dans l’aide du champ « Description ». |
| Pièces jointes | À développer | Nécessite un stockage sécurisé (contrôle du type et de la taille) |
| Enregistrement protégé avec date, type, réponses, statut | Réalisé | PostgreSQL. Statut initial « Nouveau », puis « En cours » et « Traité » (statuts validés, qui remplacent la liste du TDR § 8.3). |
| Historique minimal | Réalisé | Réception, changements de statut (avec l’auteur), notifications |
| Accès limité | Réalisé | Espace `/admin` avec connexion : comptes nominatifs, mots de passe hachés, sessions expirant après 12 h, blocage après 5 échecs. Données invisibles sans connexion. |
| Export des demandes | À développer | Si nécessaire (TDR § 12.2 : « export contrôlé ») |
| Durée de conservation et suppression | Bloqué | Dépend de la politique de données. Aucune suppression automatique n’est prévue pour l’instant. |

## 9. Rendez-vous, contact, appels à l’action

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Formulaire de rendez-vous (créneaux demandés, confirmation) | Réalisé | Motif, pôle, mode de rencontre, deux créneaux (date et moment), ville, précisions, coordonnées. Les créneaux restent des demandes, confirmées par AFRIGÉRANCE. Même enregistrement, notification et administration que les devis. |
| Contact : nom, moyen de contact, objet, message, information de confidentialité | Réalisé | Messages enregistrés et visibles dans l’administration. |
| Liens téléphone, email, WhatsApp | Réalisé | Téléphone et email cliquables sur la page Contact et dans le pied de page de chaque page. WhatsApp affiché dès qu’un numéro est confirmé dans `src/content/site.ts`. |
| Adresse et horaires | Réalisé en partie | Adresse publiée (Scat Urbam, Grand Yoff, Dakar). Horaires non fournis, donc non publiés. |
| Appel « Demander un devis » dans l’en-tête et sur chaque pôle | Réalisé | |
| Appel « Prendre rendez-vous » | Réalisé | En-tête, accueil, fiches des pôles, pied de page |
| « Parlons de votre projet » en fin de page | Réalisé | Page À propos |
| Lien Contact dans le pied de page | Réalisé | |

## 10. Parcours utilisateur

| Parcours | Statut |
| --- | --- |
| Explorer : Accueil → Services → devis | Réalisé (FAQ et réalisations à venir) |
| Incident IT : Accueil → Infogérance → devis présélectionné | Réalisé |
| Responsable sécurité : Intégration → devis | Réalisé |
| Établissement : secteur éducation → services | À développer (pages Secteurs) |
| Prêt à contacter : bouton visible → formulaire → envoi confirmé | Réalisé et testé sur une base de test ; **réception réelle bloquée** tant que la base n’est pas fournie |
| Mobile : actions visibles, retour sans perte, résumé | Réalisé |

## 11. UX / UI et accessibilité

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Identité sobre, logo original, couleurs de la maquette | Réalisé | |
| Navigation courte + boutons devis et rendez-vous visibles, menu mobile | Réalisé | En-tête flottant ; menu mobile plein écran, le reste de la page devenant inerte. Secteurs et Réalisations seront ajoutés quand leurs pages existeront. |
| Mobile d’abord, cibles tactiles, formulaires adaptés au clavier mobile | Réalisé | Vérifié de 320 à 1920 px |
| Contrastes AA, HTML sémantique, clavier, focus visible, libellés, erreurs explicites | Réalisé | Contrastes mesurés sur les rendus réels |
| Audit WCAG 2.2 AA complet avec lecteur d’écran | À développer | Contraste AA vérifié automatiquement sur les bandeaux (1440, 768, 390 px). Navigation clavier, mouvement réduit et lecture sans JavaScript testés. Audit avec lecteur d’écran recommandé avant la mise en ligne. |
| Pas de carrousel, de fenêtre intrusive, de faux logos ni de faux avis | Réalisé | |

## 12. Technique, administration, sécurité

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Site responsive, navigateurs modernes | Réalisé | |
| Formulaires validés dans le navigateur et sur le serveur | Réalisé | |
| Aucune clé secrète dans le navigateur ni dans le code | Réalisé | Variables lues uniquement par le serveur ; aucun mot de passe dans le code ; `.env.local` exclu de GitHub |
| Migrations de base de données | Réalisé | `npm run db:migrate`, rejouable sans risque |
| Administration des demandes (liste, filtres, fiche, statuts, notifications) | Réalisé | `/admin` : filtres par type, statut, dates et notification ; testé sur ordinateur et téléphone |
| Rôles distincts | À développer | Un seul rôle aujourd’hui (gestionnaire) ; chaque compte est nominatif |
| Édition en ligne des contenus (pages, services, FAQ) | À développer | Décision attendue : quel outil, selon le budget et les compétences |
| Hébergement, domaine, email, sauvegardes, coûts récurrents | Réalisé en partie | Site sur **Netlify**, base PostgreSQL **Neon**, emails **Resend** (expéditeur de test). Restent : nom de domaine, domaine vérifié chez Resend, politique de sauvegarde selon l’offre Neon. |
| Préproduction, mise en ligne, retour arrière | Réalisé | Chaque fusion dans `main` publie le site. Retour arrière : dans Netlify, **Deploys**, choisir une publication précédente puis **Publish deploy**. |
| HTTPS | Réalisé | Fourni par Netlify |
| Ne jamais demander de mot de passe ni de donnée sensible | Réalisé | Rappel affiché sur les formulaires |
| Obligations applicables au Sénégal (données personnelles) | Bloqué | À vérifier avec un conseil compétent |

## 13. SEO

| Exigence | Statut | Commentaire |
| --- | --- | --- |
| Titre et description par page, URL lisibles | Réalisé | |
| Titres H1, H2, H3 structurés, liens internes | Réalisé | Un seul H1 par page |
| Page 404 | Réalisé | |
| Pages en attente non indexées | Réalisé | Mentions légales |
| Sitemap XML, robots.txt, URL canoniques, aperçus de partage | Réalisé | Générés à partir de `SITE_URL` (aujourd’hui https://afrigerance.netlify.app). À changer avec le domaine définitif. |
| Données structurées (entreprise locale) | Réalisé en partie | Organisation (nom, description, signature, téléphone, email, adresse) et FAQ. Horaires non fournis. |
| Expressions liées aux zones desservies | Bloqué | Zones d’intervention à préciser |
| Outil d’audience respectueux de la vie privée | Bloqué | Décision attendue sur l’outil ; il pourrait nécessiter une bannière cookies |

## 14. Livrables

| Livrable | Statut |
| --- | --- |
| Pages Accueil, Services, Devis, À propos, Contact | Réalisé |
| Recette responsive, clavier, liens, formulaires, erreurs | Réalisé pour les pages existantes |
| Parcours complet testé sur une base de test : soumission → administration → statut → échec et renvoi de notification → accès refusé sans connexion | Réalisé |
| Tests automatiques rejouables (`npm run test:e2e`, 81 tests : pages, coordonnées, mouvement, formulaires, rendez-vous, administration, email) | Réalisé (README : « Tests automatiques ») |
| Test avec une vraie base (Neon) et un vrai compte d’envoi (Resend) | En cours : base reliée, compte administrateur créé, email de test accepté. Réception des notifications du site en ligne à confirmer |
| Guide d’administration | Réalisé (README : « Consulter et traiter les demandes ») |
| Transfert des accès, formation | À faire à la mise en ligne |

## 16. Informations à fournir par AFRIGÉRANCE

| Élément | Débloque |
| --- | --- |
| Nom de domaine | Envoi depuis votre domaine, sitemap, référencement, mise en ligne |
| Coordonnées restantes : WhatsApp, horaires | Page Contact, données structurées |
| Dénomination légale exacte (AFRIGÉRANCE ou AFRIGERANCE), forme, immatriculation, siège, responsable de publication, hébergeur | Mentions légales |
| Politique de données : responsable, finalités, durées, contact pour les droits | Politique de confidentialité, conservation des demandes |
| Zones d’intervention, gratuité du devis, délais, horaires de support | FAQ, référencement local |
| Validation des 12 prestations (en particulier Téléphonie IP et Sécurité incendie) | Pages détaillées des pôles |
| Réalisations autorisées, témoignages approuvés, photos | Page Réalisations |
| Historique, équipe, valeurs officielles, partenaires autorisés | Compléments de la page À propos |
| Logo vectoriel (SVG) ou PNG haute définition à fond transparent | Qualité d’affichage du logo |
| Accord écrit des 11 organisations dont le logo est affiché ; versions haute définition de FIM Capital, Indigo Voyages, Tara Group et Fabrimetal (couleur) | Publication sereine de « Ils nous font confiance » |
| Photo réelle d’AFRIGÉRANCE (facultatif) | Remplacement du motif provisoire fondu dans le bandeau |
