import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Footer from "../../../src/components/Footer";
import { getLootip } from "../../../src/services/lootips";

// Mocking the getLootip service
vi.mock("../../src/services/lootips", () => {
  const getLootipMock = vi.fn();
  return { getLootip: getLootipMock };
});

describe("Footer", () => {
  test("renders as a footer banner landmark", () => {
    getLootip.mockResolvedValue({ looTip: { lootip: "Wash your hands" } });

    render(<Footer />);

    const banner = screen.getByRole("contentinfo");
    expect(banner).toBeTruthy();
  });

  test("displays the loo tip fetched from the backend", async () => {
    getLootip.mockResolvedValue({ looTip: { lootip: "Wash your hands" } });

    render(<Footer />);

    const tip = await screen.findByText("Wash your hands");
    expect(tip.textContent).toEqual("Wash your hands");
  });
});
