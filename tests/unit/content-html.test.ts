import { describe, expect, it } from "vitest";
import { withHeadingIds } from "@/lib/content-html";

describe("withHeadingIds", () => {
  it("adds slugified ids to every h2 and collects them in order", () => {
    const html = "<p>Intro</p><h2>Première partie</h2><p>…</p><h2>Références & sources</h2>";
    const { html: output, headings } = withHeadingIds(html);

    expect(headings).toEqual([
      { id: "premiere-partie", text: "Première partie" },
      { id: "references-sources", text: "Références & sources" },
    ]);
    expect(output).toContain('<h2 id="premiere-partie">Première partie</h2>');
    expect(output).toContain('<h2 id="references-sources">Références & sources</h2>');
  });

  it("returns no headings for content without h2", () => {
    const { headings } = withHeadingIds("<p>Pas de titre ici.</p>");
    expect(headings).toHaveLength(0);
  });
});
