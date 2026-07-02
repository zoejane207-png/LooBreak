import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Icebreaker from "../../../src/components/Icebreaker";
import "@testing-library/jest-dom/vitest";

describe("Icebreaker Component - Button UI", () => {
  it("toggles button text when clicked", async () => {
    render(<Icebreaker />);
    const user = userEvent.setup();

    const button = screen.getByTestId("icebreaker-reveal-btn");

    // Check initial state
    expect(button).toHaveTextContent(/show me the icebreakers!/i);

    // Act: Click to open
    await user.click(button);
    expect(button).toHaveTextContent(/hide the icebreakers/i);
  });

  it("has type='button'", () => {
    render(<Icebreaker />);
    const button = screen.getByTestId("icebreaker-reveal-btn");
    expect(button).toHaveAttribute("type", "button");
  });
});
