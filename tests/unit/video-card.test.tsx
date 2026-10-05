import { describe, expect, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VideoCard } from "@/components/content/video-card";

describe("Chargement volontaire des vidéos",()=>{
  it("ne charge pas le lecteur tiers avant une action explicite",()=>{
    const {container}=render(<VideoCard video={{slug:"test",titre:"Vidéo de test",description:"Exemple technique",categorie:"Test",youtubeId:"dQw4w9WgXcQ"}}/>);
    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button",{name:"Regarder : Vidéo de test"}));
    expect(container.querySelector("iframe")?.getAttribute("src")).toBe("https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0");
    expect(container.querySelector("iframe")?.getAttribute("title")).toBe("Vidéo de test");
  });
  it("refuse un identifiant YouTube non valide",()=>{
    const {container}=render(<VideoCard video={{slug:"invalide",titre:"Test",description:"",categorie:"Test",youtubeId:"invalid"}}/>);
    expect(screen.getByText("Vidéo indisponible.")).toBeVisible();
    expect(container.querySelector("iframe")).toBeNull();
  });
});
