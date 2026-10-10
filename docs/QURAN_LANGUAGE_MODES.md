# Trois modes de lecture du Coran

Préparés le 10 octobre 2026, sans push ni publication : attendre un nouveau signal utilisateur.

La page `/coran` propose trois cartes : arabe et français, arabe seulement, français seulement. Le choix est repris dans les lecteurs sourate, Juz et Hizb, et reste modifiable dans « Ma lecture ». Il est enregistré localement sous `mirath:quran:language` ; il n’est pas synchronisé entre appareils. Les erreurs de stockage sont affichées.

Le français reprend exclusivement le corpus Muhammad Hamidullah existant et indique « traduction du sens ». Les textes arabes originaux, signes d’arrêt, références, signets, notes et progression restent inchangés. Le mode français masque le texte arabe des versets, la basmala arabe et les options tajwîd ; la traduction reste cliquable pour démarrer l’audio au même verset. Les réglages audio restent indépendants du choix d’affichage.

Vérifications : 109 tests réussis, dont les trois affichages et le masquage/révélation ; TypeScript et compilation production. Pas de contrôle visuel dans un navigateur ni d’essai physique dans l’APK (outil de navigateur indisponible). Les composants utilisent une grille à une colonne sur mobile et trois sur les écrans plus larges.
