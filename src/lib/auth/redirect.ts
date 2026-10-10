/** Authentication returns may only navigate within MIRÂTH. */
export function safeAuthRedirect(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//") || /[\\\x00-\x20]/.test(value)) return "/compte";
  try {
    const decoded = decodeURIComponent(value);
    if (decoded.startsWith("//") || /[\\\x00-\x20]/.test(decoded)) return "/compte";
    const url = new URL(value, "https://mirath.invalid");
    if (url.origin !== "https://mirath.invalid" || /^\/(auth|connexion|inscription)(\/|$)/.test(url.pathname)) return "/compte";
    return url.pathname + url.search + url.hash;
  } catch {
    return "/compte";
  }
}
