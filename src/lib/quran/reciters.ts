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
  { id: "ar.husary", nom: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", nom: "Mohamed Siddiq Al-Minshawi" },
];

export const defaultReciterId = reciters[0].id;

export function getAyahAudioUrl(globalAyahNumber: number, reciterId: string, bitrate: 64 | 128 = 128): string {
  return `https://cdn.islamic.network/quran/audio/${bitrate}/${reciterId}/${globalAyahNumber}.mp3`;
}
