import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { SourceTypeBadge, ToVerifyBadge, EditorialStatusBadge } from "@/components/islamic/reliability-badge";

describe("badges de fiabilité documentaire", () => {
  it("affiche un libellé distinct pour chaque type de source", () => {
    render(<SourceTypeBadge type="hadith" />);
    expect(screen.getByText("Hadith référencé")).toBeInTheDocument();
  });

  it("signale clairement une référence non vérifiée", () => {
    render(<ToVerifyBadge />);
    expect(screen.getByText("Référence à vérifier")).toBeInTheDocument();
  });

  it("traduit chaque statut éditorial en français", () => {
    render(<EditorialStatusBadge status="en_cours_de_verification" />);
    expect(screen.getByText("En cours de vérification")).toBeInTheDocument();
  });
});
