import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import Footer from "../../../src/components/Footer";
import { getLootip } from "../../../src/services/lootips";

// Mocking the getLootip service
vi.mock("../../../src/services/lootips", () => {
  const getLootipMock = vi.fn();
  return { getLootip: getLootipMock };
});

describe("Footer", () => {
  beforeEach(() => {
    getLootip.mockReset();
  });

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

  test("flush button fetches and swaps in a new loo tip", async () => {
    getLootip
      .mockResolvedValueOnce({ looTip: { lootip: "Wash your hands" } })
      .mockResolvedValueOnce({ looTip: { lootip: "Put the seat down" } });

    const user = userEvent.setup();
    render(<Footer />);

    await screen.findByText("Wash your hands");

    await user.click(screen.getByTestId("lootip-flush"));

    await waitFor(() =>
      expect(screen.getByText("Put the seat down")).toBeTruthy(),
    );
    expect(getLootip).toHaveBeenCalledTimes(2);
  });
});
