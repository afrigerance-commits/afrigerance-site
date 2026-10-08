import { expect, test } from "vitest";
import { invocationTopics, thematicInvocationCount } from "@/lib/data/invocation-topics";

test("thematic collection has unique routes, anchors and documented sources", () => {
  expect(invocationTopics).toHaveLength(9);
  expect(thematicInvocationCount).toBe(31);
  expect(new Set(invocationTopics.map(topic => topic.slug)).size).toBe(9);
  const items = invocationTopics.flatMap(topic => topic.items);
  expect(new Set(items.map(item => item.id)).size).toBe(items.length);
  items.forEach(item => {
    expect(item.arabic).toMatch(/[\u0600-\u06ff]/);
    expect(item.translation.length).toBeGreaterThan(15);
    expect(item.context.length).toBeGreaterThan(15);
    expect(item.sourceUrl).toMatch(/^https:\/\/(sunnah.com\/(bukhari|muslim):|quran.com\/)/);
    expect(item.textKind).toBeTruthy();
  });
});
