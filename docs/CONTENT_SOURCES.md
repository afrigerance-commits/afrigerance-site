# Sources des contenus religieux intégrés

Ce document liste précisément d'où vient chaque texte religieux affiché
sur la plateforme, pour que leur statut documentaire soit vérifiable —
conformément à la politique éditoriale du projet (voir
`docs/EDITORIAL_WORKFLOW.md`).

## Le Coran (`/coran`)

| Élément | Source |
|---|---|
| Texte arabe | Édition uthmani (lecture de Hafs) du complexe Roi Fahd d'impression du Noble Coran, diffusée par le [projet Tanzil](http://tanzil.net) |
| Traduction française | Muhammad Hamidullah, diffusée par Tanzil |
| Jeu de données utilisé | [github.com/fawazahmed0/quran-api](https://github.com/fawazahmed0/quran-api) (licence ouverte, redistribue les textes Tanzil) |
| Noms français des sourates | Traduction éditoriale (rendus standards utilisés par la plupart des éditions françaises du Coran) |

Les 6 236 versets des 114 sourates sont complets — ce n'est pas un extrait.

### Récitation audio

Le lecteur audio verset par verset (et lecture continue d'une sourate) charge
les fichiers mp3 directement depuis l'API ouverte
[Al Quran Cloud](https://alquran.cloud) (`cdn.islamic.network`), au moment de
la lecture, dans le navigateur de chaque visiteur — aucun fichier audio n'est
hébergé ni stocké par ce site. Récitateurs proposés : Mishary Rashid Alafasy
(confirmé correct en production), Mahmoud Khalil Al-Husary et Mohamed Siddiq
Al-Minshawi (pas encore testés en production). Si un verset est absent au
débit 128 kbps pour un récitateur donné, le lecteur retente automatiquement
en 64 kbps avant de passer au suivant ; un minuteur de secours force aussi le
passage au verset suivant si aucun son ne démarre sous 5 secondes.

**Récitateurs retirés après test** : Abdul Basit (Murattal) et Saoud
Ash-Shuraim ont été testés en production et jouaient un verset différent de
celui affiché — ce CDN semble indexer certains récitateurs autrement qu'avec
un numéro d'ayah global 1-6236. Diffuser le mauvais verset sous une
étiquette donnée serait pire que l'absence de son, ils ont donc été retirés
jusqu'à vérification du bon schéma d'indexation pour ces deux récitateurs.

## Hadith (`/hadith`)

| Recueil | Arabe | Français | Degrés d'authenticité |
|---|---|---|---|
| Al-Muwatta' (imam Mâlik) | ✅ 1 858 hadiths | ✅ | Gradation de Salim al-Hilali, incluse dans le jeu de données |
| Sahîh Al-Bukhârî | ✅ 7 589 hadiths | ✅ | Non incluse dans ce jeu de données (consensus déjà établi sur l'authenticité du recueil) |
| Sahîh Muslim | ✅ 7 563 hadiths | ✅ | Non incluse |

Jeu de données : [github.com/fawazahmed0/hadith-api](https://github.com/fawazahmed0/hadith-api).
Les titres de livre/chapitre en français (ex. « La Pureté », « Le Pèlerinage »)
sont une **traduction éditoriale** — le jeu de données ne fournit que
l'anglais pour ces titres.

**Important — ce que ces textes ne sont pas :** l'intégration de ce jeu de
données rend le texte arabe et sa traduction consultables, avec les
degrés d'authenticité fournis par la source. Elle ne constitue pas, à elle
seule, une vérification savante de chaque chaîne de transmission par la
plateforme. Pour Bukhârî et Muslim, l'absence de grade affiché signifie
qu'aucune gradation individuelle n'est fournie dans ce jeu de données (les
deux recueils sont unanimement considérés comme authentiques dans leur
ensemble par la tradition sunnite) — ce n'est pas une mise en doute.

## Ce qui n'est PAS encore intégré

Demandé mais non trouvé sous forme de jeu de données ouvert et fiable au
moment de l'intégration :

- **Tafsîr Ibn Kathîr** en français (une version arabe et une version
  anglaise existent via [spa5k/tafsir_api](https://github.com/spa5k/tafsir_api),
  mais aucune traduction française n'y est disponible).
- **Tafsîr At-Tabarî**, **Tafsîr Al-Qurtubî**.
- **Ar-Rahîq Al-Makhtûm** (Le Nectar cacheté) — ouvrage moderne sous droits
  d'auteur, pas un corpus ouvert ; voir le module Bibliothèque pour sa
  fiche bibliographique sans texte.
- **Al-Bidâya wa An-Nihâya** d'Ibn Kathîr — idem.
- **Mukhtasar Khalîl**, **Ar-Risâla** d'Ibn Abî Zayd Al-Qayrawânî — texte et
  traduction non trouvés sous licence ouverte vérifiable ; nécessitent une
  édition fournie et validée par le fondateur (voir le module de
  vérification des droits de la bibliothèque, `docs/INSTALLATION.md`).

Pour ces ouvrages, la bibliothèque affiche une fiche bibliographique avec
statut de droits « non vérifiés » et aucun contenu n'est inventé en
attendant.

## Pourquoi ces sources et pas d'autres

### Audio et portraits du lecteur coranique

Le lecteur interroge `https://api.alquran.cloud/v1/surah/{numéro}/{édition}`
au moment de la lecture. Il contrôle le numéro de sourate, l'édition, le nombre
de versets, le numéro dans la sourate et le numéro global avant de jouer les URL
`audio` / `audioSecondary` fournies par l'API. Les fichiers restent hébergés par
Al Quran Cloud. Le 4 octobre 2026, les éditions Shuraim (64 kb/s), Abdul Basit
murattal (192 kb/s) et Sudais (192 kb/s) ont été vérifiées sur Al-Baqara 2:2 ;
les fichiers d'Abdul Basit et Sudais décodés coïncident avec ceux de l'archive
indexée par sourate/verset de `verse.mp3quran.net`. Cela ne remplace pas une
écoute humaine de l'ensemble des 6 236 enregistrements.

Miniatures locales provenant des pages Wikimedia Commons suivantes, consultées
le 4 octobre 2026. Cliquer sur « Crédits des portraits » dans le lecteur pour
retrouver cette liste :

| Récitateur | Fichier source | Licence indiquée par Commons |
|---|---|---|
| Alafasy | [Мишари Рашид.jpg](https://commons.wikimedia.org/wiki/File:%D0%9C%D0%B8%D1%88%D0%B0%D1%80%D0%B8_%D0%A0%D0%B0%D1%88%D0%B8%D0%B4.jpg) | Copyrighted free use (quranic.ru ; permission déclarée par le téléverseur) |
| Shuraim | [Saud Shuraim.png](https://commons.wikimedia.org/wiki/File:Saud_Shuraim.png) | CC0, Sazwanmisuari |
| Abdul Basit | [Abdul Basit à Deoband, 1980](https://commons.wikimedia.org/wiki/File:Abdul_Basit_Abdul_Samad_at_Centenary_Celebration_Of_Darul_Uloom_Deoband_1980.jpg) | GODL-India, Prasar Bharati ; statut non revu par Commons |
| Sudais | [Sheikh Sudais.png](https://commons.wikimedia.org/wiki/File:Sheikh_Sudais.png) | CC0, Sazwanmisuari |
| Husary | [Hussary.jpg](https://commons.wikimedia.org/wiki/File:Hussary.jpg) | Domaine public indiqué par Commons |
| Minshawi | [Elminshwey.jpg](https://commons.wikimedia.org/wiki/File:Elminshwey.jpg) | Domaine public indiqué par Commons |


Les deux jeux de données retenus (`fawazahmed0/quran-api` et
`fawazahmed0/hadith-api`) ont été choisis parce que :

1. Leurs textes proviennent eux-mêmes de sources reconnues (Tanzil pour le
   Coran ; les éditions Dar-us-Salam pour les recueils de hadith anglais/
   français, largement utilisées par d'autres applications islamiques
   établies).
2. Ils sont **structurés** (numéro de sourate/verset, numéro de hadith,
   livre/chapitre, grade), ce qui permet de respecter la distinction
   documentaire exigée par le projet (texte coranique vs hadith référencé
   vs explication), plutôt que du texte brut sans métadonnées.
3. Ils sont accessibles publiquement sans clé API ni paiement, et
   redistribuables.

Cela n'exempte pas d'une relecture par le responsable scientifique de la
plateforme avant de présenter un extrait comme définitivement validé pour
un usage éditorial (ex. dans une leçon de fiqh) — voir
`docs/EDITORIAL_WORKFLOW.md`.

## Ouvrages fournis par l'autrice de la plateforme (`references_mirath/`)

À partir du 4 octobre 2026, l'autrice a fourni directement (hors ligne, pas
un jeu de données ouvert) des extraits de plusieurs ouvrages qu'elle
possède, sous forme de texte déjà transcrit (`01_SOURCES_TEXTUELLES/`) ou
de scans PDF non encore transcrits (`02_SOURCES_SCANNEES/`). Ce dossier
n'est **pas commité dans le dépôt Git** (fichiers de travail privés, droits
non établis pour une republication telle quelle) ; seul le contenu
pédagogique qui en est synthétisé, avec pagination précise vers le PDF
source, est intégré dans le code du site.

| Ouvrage | État | Utilisé pour |
|---|---|---|
| **Mukhtasar al-Akhdari** (trad. Ali Abdullah Gallant, Institut islamique Daroul Îmane, Fès, 2017) | Texte transcrit, exploité | Les 5 leçons du cours `/fiqh/malikite/purification` (eau, ablutions, ghusl, tayammum) |
| **Cours de fiqh malikite** (source non encore identifiée précisément — à documenter) | Texte transcrit, pas encore exploité | — |
| **Ar-Risâla** d'Ibn Abî Zayd Al-Qayrawânî | Scans PDF non transcrits (8 fichiers, ~144 pages) | — |
| **Sahîh Al-Bukhârî**, trad. Kassab, tome 1 | Texte transcrit, pas encore exploité | — |
| **Le Nectar Cacheté** (Ar-Rahîq Al-Makhtûm) | Scans PDF non transcrits (16 fichiers, ~440+ pages) | — |
| **Ibn Kathîr — Histoires des prophètes** | Texte transcrit, pas encore exploité | — |
| **Tazawwudu-s-Sighâr** (texte spirituel, vers) | Texte transcrit (partiel), pas encore exploité | — |

Le prompt de travail fourni avec ces fichiers référence aussi un dossier
`00_COMMENCER_ICI/` (README, bibliographie et droits en JSON, plan de
navigation) et un dossier `03_VISUELS_ORIGINAUX/` (8 compositions SVG/PNG) :
**ni l'un ni l'autre n'est arrivé dans les fichiers reçus** — seuls les
textes et les deux lots de scans (Risâla, Nectar) sont présents. Les 8
visuels montrés en aperçu dans la conversation n'existent, à ce stade, que
comme image de prévisualisation (un screenshot composite), pas comme
fichiers SVG/PNG individuels utilisables.
# Lecteur et récitations complémentaires (octobre 2026)

Le lecteur verset par verset emploie le catalogue audio Al Quran Cloud et vérifie la numérotation des ayat avant lecture. Muhammad Hady Touré est intégré dans le sélecteur pour écouter la sourate entière : collection Hafs de 114 sourates sur [TVQuran](https://www.tvquran.com/en/scholar/355/profile/mohammed-hady-toure), fichiers `https://download.tvquran.com/download/recitations/355/280/{sourate sur trois chiffres}.mp3`. Les chapitres 001, 002 et 114 ont été contrôlés par réponse HTTP audio/mpeg. Aucun minutage par verset n’a été validé pour cette source : pendant son écoute, les boutons de verset sont masqués et le défilement synchronisé est désactivé. Noreen Muhammad Siddiq reste un lien vers sa collection ad-Dûrî ʿan Abî ʿAmr sur [MP3Quran](https://www.mp3quran.net/ar/nourin_siddig). Le texte du site est Hafs : ce lien avertit explicitement de la différence de lecture.

Les signes de pause restent ceux du texte arabe sourcé existant. Aucun coloriage de tajwîd n’est appliqué : les textes annotés examinés (Al Quran Cloud `quran-tajweed`, Quran Foundation `text_uthmani_tajweed`, Quran.ws) n’ont pas été établis comme identiques caractère par caractère à l’édition locale. Les annotations fondées sur des décalages de caractères ne doivent jamais être transférées directement entre ces éditions.

## Découpage du lecteur en juz et hizb

Métadonnées Tanzil version 1.0, © 2008–2009 Tanzil.info, licence CC BY : https://tanzil.net/res/text/metadata/quran-data.xml (consulté le 8 octobre 2026). Les 30 limites de juz sont importées telles quelles ; les 60 limites de hizb sont les entrées 1, 5, 9… des 240 quarts de hizb. Texte arabe inchangé. La coloration des caractères U+06D6–U+06DC conserve leurs positions dans le texte original.


### Lecture page par page — 18 octobre 2026

`data/quran/pages.json` reprend les 604 entrées `<page>` des métadonnées
Tanzil 1.0 : https://tanzil.net/res/text/metadata/quran-data.xml. Documentation :
https://tanzil.net/docs/Quran_Metadata. Attribution © Tanzil.info, CC BY,
comme les autres métadonnées déjà intégrées. Les couples sura/aya sont conservés
sans modification ; la fin de chaque page est le verset précédant la suivante.
Les tests contrôlent une couverture contiguë des 6 236 versets, sans trou ni doublon.
Il s’agit des limites des pages du mushaf de Médine, pas d’un fac-similé ni
d’une reproduction des 15 lignes imprimées. Le texte arabe et les signes de
pause existants ne sont pas modifiés.

## Sélection de recueils — 24 octobre 2026 (non publiée)

Deux fiches initiales, non une importation complète : Riyad 1 (extrait des intentions) et Bulugh 1 (réponse sur la mer). Références contrôlées sur https://sunnah.com/riyadussalihin:1 et https://sunnah.com/bulugh:1. Les courts textes prophétiques anciens sont transcrits sans les notes éditoriales modernes ; traductions françaises du sens et commentaires originaux MIRÂTH. Ne pas importer les traductions commerciales ou les annotations des pages sources sans droits vérifiés. La Risâla possède une présentation dans Fiqh malikite et un accès depuis Hadith ; aucun texte intégral de traduction moderne reproduit. Import complet, indexation de recherche et validation scientifique approfondie restent à réaliser.

## Corpus d’étude importés — 24 octobre 2026, révision uniquement

- Riyad as-Salihin : 1 896 notices arabes, 20 livres.
- Bulugh al-Maram : 1 557 notices, 16 livres ; un champ matn arabe vide dans l’extraction. Le champ matn est utilisé pour écarter les notes modernes incluses dans text_ar. Sa séparation automatique n’est pas une validation scientifique.
- Origine : Jaguar16/open-hadith-data, release v1.1.0, collections-json.zip. Schéma/organisation CC0 ; texte arabe ancien seulement. Aucune traduction anglaise ni gradation non attribuée importée. Empreintes des entrées et compteurs dans provenance.json de chaque corpus. Le numéro séquentiel technique est distinct de sourceReference, qui préserve notamment les références groupées.
- Risâla : OpenITI/0400AH, JK000171-ara1, version nettoyée de ses paratextes modernes (métadonnées OpenITI). 46 parties, dont introduction. Source et empreinte dans risala-metadata.json. Texte adapté sous CC BY-NC-SA 4.0 : attribution OpenITI, lien vers licence, usage non commercial et partage sous la même licence affichés dans le lecteur. Adaptation : retrait du balisage technique et découpage ; aucune traduction ajoutée.
- Sources de contrôle : https://github.com/Jaguar16/open-hadith-data/blob/main/DATA_LICENSE.md ; https://github.com/OpenITI/documentation/blob/master/index.md ; https://github.com/OpenITI/0400AH/tree/master/data/0386IbnAbiZaydQayrawani/0386IbnAbiZaydQayrawani.Risala.

Accès de révision serveur seulement avec MIRATH_STUDY_PREVIEW=1. Par défaut les deux corpus restent absents du catalogue et de la recherche, et le lecteur Risâla répond 404. Ne pas activer cette variable sur Netlify avant contrôle éditorial ; les fiches initiales explicitement vérifiées restent seules visibles. Les traductions françaises intégrales, le contrôle des variantes, des attributions et des limites des extraits restent à faire. Ne pas annoncer les ouvrages français complets ni une validation individuelle des 3 453 notices. Aucun signal de publication reçu.

## Copie française fournie par l’utilisateur — préparation du 24 octobre 2026

PDF Kechrid : 515 pages, couverture datée du 18 novembre 2006, numérotation allant jusqu’à 1896. Le fichier utilisateur reste inchangé. `scripts/prepare-riyad-french.py` prépare une archive privée : texte brut de chaque page, 99 marqueurs de commentaires (frontières non validées), candidats de numérotation et rapport de contrôle. 1862 numéros distincts reconnus par ce détecteur ; 34 non reconnus et plusieurs doublons de détection. Ces défauts du détecteur ne démontrent pas une absence dans l’ouvrage. Aucune association automatique français/arabe effectuée et aucune traduction canonique remplacée.

Archive privée de révision : libfile_91acb9ddabd881919f3c11cfab5a06be. Aucun texte français intégral de cette extraction n’est versé dans ce dépôt public. La source officielle a été retrouvée : https://d1.islamhouse.com/data/fr/ih_books/fr-jardindesvertueux_Kechrid.pdf (515 pages, même couverture), mais la comparaison binaire tentée a répondu HTTP 403. La FAQ https://d1.islamhouse.com/html/faq.htm annonce la redistribution avec attribution sans modification du contenu scientifique ; les usages commerciaux de productions tierces y nécessitent une discussion avec leur source. Ne pas conclure à une licence sans restriction ni à une validation scientifique.

Un accès de lecture au PDF ORIGINAL EXTERNE est préparé sous `/hadith/riyadussalihin/edition-francaise`, derrière MIRATH_STUDY_PREVIEW=1. Pas de copie PDF publique hébergée par MIRÂTH, pas de traduction modifiée. Pagination 1–515, accès sommaire, lien externe de secours et avertissement de connexion requise. Les références imprimées erronées de la page 14 sont signalées séparément : 98:48 → 98:5 et 78:37 → 22:37, contrôlées sur Quran.com et visuellement dans le PDF fourni. Ne pas corriger silencieusement l’édition. Les commentaires du traducteur ne sont pas des paroles prophétiques.

Vérifications de cette préparation : génération des types et TypeScript réussis ; compilation de 976 pages en mode aperçu réussie. Six tests ciblés réussis (masquage hors aperçu, liens source et errata distincts, bornes de pagination et intégrité des imports). Le lecteur PDF externe n’a pas été testé dans un navigateur ni sur téléphone ; son fonctionnement dépend du navigateur et des règles du serveur distant. Aucun déploiement Netlify.

## Publication autorisée — signal du 24 octobre 2026

Le lecteur du PDF français original externe devient public, avec son errata et sa mention de révision, et son accès est ajouté à Hadith. Cela remplace le masquage de cette seule route décrit plus haut. Les imports arabes non validés restent sous MIRATH_STUDY_PREVIEW, désactivé en production. L’extraction française privée et l’alignement français/arabe ne sont pas publiés. Tests ciblés : 6 réussis ; aucune vérification visuelle ou sur téléphone revendiquée.

Publication vérifiée : commit 331c98cc9a76417d0239f0e22a3ce855c6ccd751. HTTP 200 sur Hadith (lien français présent), lecteur français pages 14 et 515, et présentation de la Risâla dans Fiqh malikite. Les routes de brouillon Bulugh, Riyad arabe et Risâla arabe affichent « Page introuvable » et NEXT_HTTP_ERROR_FALLBACK;404. Netlify/Next renvoie ici un HTTP 200 de streaming pour ces pages introuvables : le masquage a donc été contrôlé dans le contenu, pas seulement par le code HTTP. Pas de contenu de ces brouillons exposé lors du contrôle. Aucun essai navigateur du PDF externe ou sur téléphone.
