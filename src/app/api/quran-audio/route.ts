import { allowedAudioUrl } from "@/lib/quran/offline-audio";
/** Same-origin download bridge for public verse audio. Never accepts arbitrary hosts or redirects. */
export async function GET(request: Request) {
  const source = new URL(request.url).searchParams.get("source") ?? "";
  if (!allowedAudioUrl(source)) return new Response("Source audio non autorisée.", { status: 400 });
  try {
    const response = await fetch(source, { redirect: "error", credentials: "omit", signal: AbortSignal.timeout(20_000) });
    const type = response.headers.get("content-type") ?? "";
    const length = Number(response.headers.get("content-length") ?? 0);
    if (!response.ok || !/(audio|octet-stream)/i.test(type) || length > 30*1024*1024) return new Response("Enregistrement audio indisponible.", { status: 502 });
    // Bound the stream without loading an entire recording into server memory.
    let bytes = 0;
    const stream = response.body?.pipeThrough(new TransformStream({ transform(chunk: Uint8Array, controller) { bytes += chunk.byteLength; if (bytes > 30*1024*1024) controller.error(new Error("Audio trop volumineux")); else controller.enqueue(chunk); } }));
    if (!stream) return new Response("Fichier vide.", { status: 502 });
    return new Response(stream, { headers: { "Content-Type": type, "Cache-Control": "public, max-age=86400", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response("La source audio ne répond pas. Réessayez.", { status: 502 }); }
}
