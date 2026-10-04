import { Fragment, type CSSProperties } from "react";

type SplitWordsProps = {
  text: string;
  /** Rang du premier mot, pour enchaîner plusieurs segments d'un même titre. */
  start?: number;
  className?: string;
};

/**
 * Découpe un texte en mots qui montent chacun depuis un masque (voir .split-word dans globals.css).
 * Le texte reste lu d'un seul tenant par les lecteurs d'écran ; sans animation, il s'affiche normalement.
 */
export function SplitWords({ text, start = 0, className }: SplitWordsProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className={`split-word ${className ?? ""}`}>
            <span style={{ "--i": start + index } as CSSProperties}>{word}</span>
          </span>
          {/* L'espace reste hors du bloc animé : elle n'est ni rognée ni masquée. */}
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** Nombre de mots d'un texte (pour enchaîner les délais de SplitWords). */
export function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}
