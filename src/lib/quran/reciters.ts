/**
 * Récitateurs disponibles via cdn.islamic.network (API Al Quran Cloud),
 * la source audio ouverte la plus largement utilisée par les applications
 * coraniques gratuites. Format d'URL documenté dans docs/CONTENT_SOURCES.md.
 */
export interface Reciter {
  id: string;
  nom: string;
}

export const reciters: Reciter[] = [
  { id: "ar.alafasy", nom: "Mishary Rashid Alafasy" },
  { id: "ar.abdulbasitmurattal", nom: "Abdul Basit (Murattal)" },
  { id: "ar.saoodshuraym", nom: "Saoud Ash-Shuraim" },
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
