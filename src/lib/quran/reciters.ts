/**
 * Récitateurs disponibles via cdn.islamic.network (API Al Quran Cloud),
 * la source audio ouverte la plus largement utilisée par les applications
 * coraniques gratuites. Format d'URL documenté dans docs/CONTENT_SOURCES.md.
 */
export interface Reciter {
  id: string;
  nom: string;
}

/**
 * Mishary Rashid Alafasy est le seul récitateur confirmé correct en
 * production (identifiant "ar.alafasy", testé par l'autrice du site). Abdul
 * Basit ("ar.abdulbasitmurattal") et Saoud Ash-Shuraim ("ar.saoodshuraym")
 * ont été retirés après un test en production : le son jouait, mais un
 * verset différent de celui affiché — ce CDN indexe apparemment certains
 * récitateurs autrement que par un numéro d'ayah global 1-6236. Diffuser le
 * mauvais verset sous une étiquette donnée est pire que ne pas avoir de son
 * du tout sur du contenu religieux, donc on ne les réaffiche pas tant que ce
 * n'est pas vérifié. Husary et Minshawi n'ont pas encore été testés par
 * l'autrice : laissés en place faute de signal contraire, mais à vérifier
 * de la même façon avant de s'y fier pleinement.
 */
export const reciters: Reciter[] = [
  { id: "ar.alafasy", nom: "Mishary Rashid Alafasy" },
  { id: "ar.husary", nom: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", nom: "Mohamed Siddiq Al-Minshawi" },
];

export const defaultReciterId = reciters[0].id;

/**
 * Le catalogue cdn.islamic.network ne propose pas systématiquement les deux
 * débits (64/128 kbps) pour chaque récitateur — certains renvoient une 404
 * sur un débit donné. On ne peut pas tester la lecture audio depuis cet
 * environnement (réseau bloqué en sandbox), donc le lecteur essaie 128 puis
 * retombe sur 64 automatiquement si le premier échoue (voir
 * quran-audio-player.tsx) plutôt que de figer un débit par récitateur.
 */
export function getAyahAudioUrl(globalAyahNumber: number, reciterId: string, bitrate: 64 | 128 = 128): string {
  return `https://cdn.islamic.network/quran/audio/${bitrate}/${reciterId}/${globalAyahNumber}.mp3`;
}
