import { beforeEach, describe, expect, it, vi } from "vitest";

const query = vi.hoisted(() => ({ rows: [] as Record<string, unknown>[], calls: [] as unknown[][] }));
vi.mock("@/lib/supabase/env", () => ({ isSupabaseConfigured: true }));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    from: () => ({
      select: () => ({
        eq: (...args: unknown[]) => {
          query.calls.push(args);
          return {
            eq: (...other: unknown[]) => {
              query.calls.push(other);
              return { order: async () => ({ data: query.rows, error: null }) };
            },
          };
        },
      }),
    }),
  }),
}));

import { getPublishedArticles } from "@/lib/data/published-articles";

describe("publication des blogs", () => {
  beforeEach(() => {
    query.calls = [];
    query.rows = [];
  });

  it("ne lit que les articles publiés et non démonstratifs", async () => {
    expect(await getPublishedArticles()).toEqual([]);
    expect(query.calls).toEqual([["statut", "publie"], ["is_demo", false]]);
  });

  it("nettoie le HTML d'un article approuvé pour publication", async () => {
    query.rows = [{
      id: "1", slug: "exemple", titre: "Exemple", resume: "Résumé",
      contenu_html: '<p onclick="alert(1)">Texte</p><script>alert(1)</script><a href="javascript:alert(1)">lien</a>',
      temps_lecture_minutes: 2, statut: "publie", is_demo: false,
      published_at: "2026-10-04T00:00:00Z", created_at: "2026-10-04T00:00:00Z", updated_at: "2026-10-04T00:00:00Z",
      cover_image_url: null,
    }];
    const [article] = await getPublishedArticles();
    expect(article.contenuHtml).toContain("Texte");
    expect(article.contenuHtml).not.toMatch(/onclick|<script|javascript:/);
  });
});
