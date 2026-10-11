# Noms des sourates et recherche documentaire

Préparé le 10 octobre 2026 ; aucun push, déploiement Netlify ou nouvel APK. Attendre un nouveau signal. Le lot audio arabe/français précédent reste préparé sur la même branche.

Les titres de sourate affichent la translittération existante, avec le sens français en sous-titre. Al-Baqarah est la variante d’affichage demandée pour la sourate 2 (donnée d’origine Al-Baqara conservée). Listes, lecture sourate et portions, sélecteur, reprise, signets, favoris, téléchargements et recherche utilisent ces noms. Le corpus des versets n’est pas modifié.

La recherche générale indexe désormais les textes arabes/français réels des trois recueils installés, les livres, contenus publics déjà indexés et invocations thématiques existantes. Recherche multiterme, normalisation des accents/diacritiques, variantes éditoriales explicites (Fajr/Sobh/aube/aurore, Mouwatta/Muwatta, formes de certains noms de prière). Correspondance par mots entiers pour éviter notamment Asr dans « désastre ». Classement donnant priorité au titre et aux correspondances directes, pagination de 20 résultats, requête limitée à 120 caractères et filtre de recueil. Les résultats de hadith affichent un extrait du français existant et renvoient à la page/au numéro exact. Les variantes servent à la recherche ; elles ne modifient ni n’annotent les paroles religieuses. Aucune réponse religieuse générée, aucun microphone ou service IA ajouté. Internet nécessaire.

Formulaires accessibles depuis Hadiths et depuis chaque recueil. Le recueil sélectionné est conservé dans le filtre et la pagination. Les index de corpus et le rapprochement numéro/français sont conservés par processus côté serveur ; les données religieuses complètes ne sont pas envoyées au navigateur pour chercher.

Exemple vérifié dans le corpus installé : « Fajr Mouwatta » retrouve le n° 3, livre 1 « Les heures de la prière », où la traduction emploie « prière de l’aurore » ; lien `/hadith/muwatta/1#hadith-3`. La pagination d’un résultat au-delà du vingtième hadith est vérifiée contre l’ordre du livre existant. Les références et grades restent ceux de l’édition du projet (`CONTENT_SOURCES.md`).

Vérification : 119 tests réussis sur 31 fichiers ; contrôles de variantes, faux positifs, requêtes multiterme, références et pagination, conservation des textes. Compilation production et TypeScript vérifiés. Aucun essai visuel en navigateur ou dans l’APK : outil de contrôle prévu indisponible.


## Publication vérifiée — 10 octobre 2026

Signal utilisateur « Publie les ». Lot publié sur la branche de production en une seule mise à jour, commit `b5d09b1b259376354b57d7431d38f0fd3806a814`, arbre `6254a878c2af04ba2d6b2e835e6f23606294c29b`.

Contrôles HTTP en production : `/coran`, `/coran/2`, recherche « Fajr Mouwatta » avec filtre Muwatta, deuxième page de recherche, sommaire Muwatta et livre 1 : tous HTTP 200. Présence vérifiée du titre Al-Baqarah et du sens La Vache, des trois choix audio, du lien `/hadith/muwatta/1#hadith-3` et de l’extrait contenant « aurore ».

Validation avant publication : 119 tests réussis, TypeScript et compilation de production réussis. Pas de changement natif Android ; l’APK existant charge le site mis à jour. Lecture audio sur téléphone physique non vérifiée dans ce lot. Ce compte rendu reste local pour éviter un second déploiement Netlify.
