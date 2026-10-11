export const ACCOUNT_STORAGE_EVENT = "mirath-account-storage";
let accountId: string | null = null;
export function isSyncKey(key: string) {
  return /^mirath:(?:learning:v1:[a-z0-9-]{1,100}|book:v1:[a-z0-9-]{1,100}|quran:(?:bookmark:\d{1,3}|notes:v1|favorites:v1|last-reading)|reading-plan:v1)$/.test(key);
}
export function setStorageAccount(id: string | null) {
  accountId = id;
  window.dispatchEvent(new Event("storage"));
  window.dispatchEvent(new Event("mirath-learning-progress"));
  window.dispatchEvent(new Event("mirath-quran-bookmarks"));
  window.dispatchEvent(new Event(ACCOUNT_STORAGE_EVENT));
}
export function scopedKey(key: string) { return accountId && isSyncKey(key) ? `mirath:account:${accountId}:${key}` : key; }
export function getPersonalItem(key: string) { return localStorage.getItem(scopedKey(key)); }
export function setPersonalItem(key: string, value: string) {
  const scoped = scopedKey(key);
  localStorage.setItem(scoped, value);
  if (accountId && isSyncKey(key)) localStorage.setItem(`${scoped}:dirty`, "true");
  window.dispatchEvent(new Event(ACCOUNT_STORAGE_EVENT));
}
export function removePersonalItem(key: string) {
  const scoped = scopedKey(key);
  localStorage.removeItem(scoped);
  if (accountId && isSyncKey(key)) localStorage.setItem(`${scoped}:dirty`, "true");
  window.dispatchEvent(new Event(ACCOUNT_STORAGE_EVENT));
}
export function accountKeys(id: string) {
  const prefix = `mirath:account:${id}:`;
  return [...new Set(Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i) || "").filter(key => key.startsWith(prefix)).map(key => key.slice(prefix.length).replace(/:(dirty|revision)$/, "")).filter(isSyncKey))];
}
