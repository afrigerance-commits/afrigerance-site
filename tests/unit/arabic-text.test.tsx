import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArabicText } from "@/components/islamic/arabic-text";

describe("ArabicText", () => {
  it("rend toujours le texte arabe en RTL avec lang=\"ar\", quel que soit le contexte", () => {
    render(<ArabicText>بيت العلم</ArabicText>);
    const el = screen.getByText("بيت العلم");
    expect(el).toHaveAttribute("dir", "rtl");
    expect(el).toHaveAttribute("lang", "ar");
  });

  it("applique la police coranique dédiée pour les citations du Coran", () => {
    render(<ArabicText variant="quran">وَقُل رَّبِّ زِدْنِي عِلْمًا</ArabicText>);
    expect(screen.getByText("وَقُل رَّبِّ زِدْنِي عِلْمًا")).toHaveClass("font-quran");
  });
});
