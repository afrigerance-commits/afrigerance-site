export const LEARNING_EVENT = "mirath-learning-progress";
export function learningKey(path: string) { return `mirath:learning:v1:${path}`; }
export function readLearningSnapshot(path: string) {
  try { return window.localStorage.getItem(learningKey(path)); } catch { return null; }
}
export function parseLearningProgress(raw: string | null, allowed: readonly string[]): string[] {
  try {
    const data: unknown = JSON.parse(raw || "[]");
    return Array.isArray(data) ? [...new Set(data.filter((id): id is string => typeof id === "string" && allowed.includes(id)))] : [];
  } catch { return []; }
}
export function subscribeLearning(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LEARNING_EVENT, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(LEARNING_EVENT, callback); };
}
export function completeLearningLesson(path: string, lesson: string, allowed: readonly string[]) {
  const current = parseLearningProgress(readLearningSnapshot(path), allowed);
  if (!allowed.includes(lesson)) return false;
  try {
    window.localStorage.setItem(learningKey(path), JSON.stringify([...new Set([...current, lesson])]));
    window.dispatchEvent(new Event(LEARNING_EVENT));
    return true;
  } catch { return false; }
}
