import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

/** Image d'aperçu lors d'un partage du site (réseaux sociaux, messageries). */
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "src/assets/afrigerance-logo.png"), "base64");

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "#ffffff",
          backgroundColor: "#040b24",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(1,101,255,0.75), transparent 55%), linear-gradient(84deg, #040b24 0%, #062659 45%, #03318a 100%)",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", backgroundColor: "#ffffff", borderRadius: 24, padding: "18px 26px" }}>
            {/* Logo original, non retouché */}
            <img src={`data:image/png;base64,${logo}`} height={84} alt="" />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.02 }}>Votre système,</div>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2.5, lineHeight: 1.02, color: "#a8dcff" }}>
            notre responsabilité.
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a3d4ff" }}>{site.description}</div>
        </div>
      </div>
    ),
    size,
  );
}
