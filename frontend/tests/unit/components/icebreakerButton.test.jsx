import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IceBreakerRevealButton } from "../../../src/components/icebreakerButton";
import "@testing-library/jest-dom/vitest";

describe("IceBreakerRevealButton", () => {
  it("renders the 'Show' text when show is false", () => {
    render(<IceBreakerRevealButton show={false} handleClick={vi.fn()} />);

    const button = screen.getByRole("button", {
      name: /show me an icebreaker!/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("renders the 'Hide' text when show is true", () => {
    render(<IceBreakerRevealButton show={true} handleClick={vi.fn()} />);

    const button = screen.getByRole("button", { name: /hide the icebreaker/i });
    expect(button).toBeInTheDocument();
  });

  it("calls the handleClick function when clicked", () => {
    const mockClick = vi.fn();
    render(<IceBreakerRevealButton show={false} handleClick={mockClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
