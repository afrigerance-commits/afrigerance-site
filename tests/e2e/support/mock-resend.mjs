/**
 * Faux service d'email pour les tests : imite l'API d'envoi de Resend, sans rien envoyer.
 *   POST /emails          reçoit un email comme Resend (réponse selon le mode)
 *   POST /__test/mode     change le mode : « ok », « fail » (erreur 500) ou « slow » (réponse en 2,5 s)
 *   GET  /__test/emails   liste des emails reçus
 *   GET  /__test/health   disponibilité (utilisé par Playwright)
 * Usage : node tests/e2e/support/mock-resend.mjs <port>
 */
import http from "node:http";

const port = Number(process.argv[2] ?? 4110);
const emails = [];
let mode = "ok";

function readBody(request) {
  return new Promise((resolve) => {
    let body = "";
    request.on("data", (chunk) => (body += chunk));
    request.on("end", () => resolve(body));
  });
}

function json(response, status, data) {
  response.writeHead(status, { "Content-Type": "application/json" });
  response.end(JSON.stringify(data));
}

http
  .createServer(async (request, response) => {
    const body = await readBody(request);
    if (request.method === "GET" && request.url === "/__test/health") return json(response, 200, { ok: true });
    if (request.method === "GET" && request.url === "/__test/emails") return json(response, 200, emails);
    if (request.method === "POST" && request.url === "/__test/mode") {
      mode = body.trim();
      return json(response, 200, { mode });
    }
    if (request.method !== "POST" || request.url !== "/emails") return json(response, 404, { message: "inconnu" });

    let payload = {};
    try {
      payload = JSON.parse(body || "{}");
    } catch {
      return json(response, 422, { message: "JSON invalide" });
    }
    emails.push({
      mode,
      authorization: request.headers.authorization ?? null,
      idempotencyKey: request.headers["idempotency-key"] ?? null,
      body: payload,
    });
    const reply = () =>
      mode === "fail" ? json(response, 500, { message: "erreur simulée" }) : json(response, 200, { id: `test-${emails.length}` });
    if (mode === "slow") setTimeout(reply, 2500);
    else reply();
  })
  .listen(port, () => console.log(`Faux service d'email prêt sur le port ${port}`));
