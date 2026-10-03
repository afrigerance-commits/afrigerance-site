/** Injecte un bloc JSON-LD. Échappe `</script>` par prudence même si le contenu est toujours généré côté serveur. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
