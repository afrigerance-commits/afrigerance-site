import { Fraunces, Work_Sans, Amiri, Noto_Naskh_Arabic } from "next/font/google";

/** Titres français : serif éditorial, expressif, non générique. */
export const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "variable",
  axes: ["opsz", "SOFT", "WONK"],
});

/** Texte français courant : sans-serif contemporaine. */
export const fontBody = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/** Arabe courant (hadith, interface, cours) : excellente lisibilité et diacritiques. */
export const fontArabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

/** Réservée aux citations du Coran : calligraphie naskh adaptée au texte coranique. */
export const fontQuran = Amiri({
  variable: "--font-quran",
  subsets: ["arabic"],
  weight: ["400", "700"],
});
