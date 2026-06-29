import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import LooTips from "../../../src/components/lootips";
import { getLootip } from "../../../src/services/lootips";

// Mocking the getLootip service
vi.mock("../../../src/services/lootips", () => {
  const getLootipMock = vi.fn();
  return { getLootip: getLootipMock };
});

describe("LooTips", () => {
  test("displays the reveal button", () => {
    render(<LooTips />);

    const button = screen.getByRole("button");
    expect(button.textContent).toEqual("Show me a lootip!");
  });

  test("reveals a lootip from the backend when clicked", async () => {
    getLootip.mockResolvedValue({ looTip: { lootip: "Test lootip" } });

    render(<LooTips />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const lootip = await screen.findByText("Test lootip");
    expect(lootip.textContent).toEqual("Test lootip");
  });
});
