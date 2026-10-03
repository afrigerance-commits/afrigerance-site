function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Ajoute un id à chaque <h2> du HTML d’article pour générer un sommaire ancré. */
export function withHeadingIds(html: string) {
  const headings: { id: string; text: string }[] = [];
  const processed = html.replace(/<h2>(.*?)<\/h2>/g, (_match, text: string) => {
    const id = slugify(text);
    headings.push({ id, text });
    return `<h2 id="${id}">${text}</h2>`;
  });
  return { html: processed, headings };
}
