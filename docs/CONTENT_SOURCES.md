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
