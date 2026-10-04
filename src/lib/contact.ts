/** Garde le + initial et les chiffres : format attendu par les liens tel:, WhatsApp et les données structurées. */
export function dialable(value: string) {
  const digits = value.replace(/\D/g, "");
  return value.trim().startsWith("+") ? `+${digits}` : digits;
}
