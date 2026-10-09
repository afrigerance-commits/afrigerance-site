# MIRÂTH audio sources — 2026-10-08

## Adhan

- `public/audio/adhan/makkah-2013.mp3`: audio extracted without changing words from Seyfula Islam's on-location recording, 21 January 2013. Not an official institutional release; no unverified muezzin attribution.
- Source: https://commons.wikimedia.org/wiki/File:Adhan,_Great_Mosque_of_Mecca_-_Jan_21,_2013.webm
- License: https://creativecommons.org/licenses/by/3.0/ — author, source and conversion disclosed in player.
- Medina remains pending: official-channel announcement at https://volunteer.prh.gov.sa/ar/almasjed_alnabawi/madina-news/242-youtub . No unverified recording is distributed.
- Website playback is manual. Android 1.1 adds native scheduled prayer alarms; see `MOBILE.md` for permissions, tests and device limitations.

## French Quran audio — prepared 2026-10-09, unpublished

- Reader: Youssouf Leclerc. Publisher identifies the reading as Muhammad Hamidullah’s French translation reviewed by the King Fahd complex: https://www.lenoblecoran.fr/audio/.
- Verse-level edition: `fr.leclerc`, streamed from the actual Al Quran Cloud API catalog. API metadata checked for all 114 chapters and 6,236 consecutively numbered ayahs; no bitrate or filename guessed.
- API: https://api.alquran.cloud/v1/quran/fr.leclerc. Source terms: https://alquran.cloud/terms-and-conditions (reviewed 2026-10-09); educational streaming allowed under its stated conditions, copyrights remain with rights holders. Do not describe these recordings as public domain.
- Player alternates selected Arabic Qari, French meaning, next verse. Enabled only for verse-level Arabic recordings; the full-surah Touré recording cannot be aligned verse by verse.
- The spoken reviewed translation may differ from the existing displayed French text. Attribution and this distinction appear in the player. Individual files have not all been listened to; structural catalog verification does not certify every recording’s content.
- Files remain remote streams; no offline French audio download or physical-device background playback guarantee is added.

## Human invocation recordings

- Publisher: https://islamhouse.com/ar/audios/2799103/
- Reader: Sulayman ash-Shuwayhi (سليمان بن محمد الشويهي).
- Permission: https://d1.islamhouse.com/html/faq.htm — permits redistribution of contents without changing scientific content and with source attribution.
- Attachment titles and URLs obtained from publisher's full attachment list, not guessed: 026 final tashahhud supplications; 029 morning/evening; 030 bedtime; 042 debt supplications.
- Files streamed unmodified from publisher; HTTP 200 and MP3 decoding verified with ffprobe. No cross-origin offline caching.
- Deliberately label these as complete chapters, not exact recordings of individual cards: they contain other supplications, commentary/references and may use different transmitted variants. No isolated clip or verse-level alignment claimed.
- All individual card recordings are pending exact text and permission verification. Chapter recordings have been removed from individual cards and moved to `/invocations#livre-audio` after a reader reported additional verses and formulas.
- Repeat is a visitor's learning control, not an attributed Sunnah repetition count.
- Audio focus pauses other MIRÂTH recording players and Quran audio rather than mixing voices.
