import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IceBreakerRevealButton } from "../../../src/components/icebreakerButton";
import "@testing-library/jest-dom/vitest";

describe("IceBreakerRevealButton", () => {
    const setup = (props = {}) => {
        const defaultProps = {
            show: false,
            handleClick: vi.fn(),
            ...props
        };
        render(<IceBreakerRevealButton {...defaultProps} />);
        return{
            button: screen.getByTestId("icebreaker-reveal-btn"),
            ...defaultProps
        };
    };

    it("renders the 'Show' text when show is false", () => {
        setup({ show: false });
        const button = screen.getByTestId("icebreaker-reveal-btn");
        expect(button).toHaveTextContent(/show me the icebreakers! 🧊/i);
    });

    it("renders the 'Hide' text when show is true", () => {
        setup({ show: true });
        
        const button = screen.getByTestId("icebreaker-reveal-btn");
        expect(button).toHaveTextContent(/hide the icebreakers 🧊/i);
    });
    expect(button).toBeInTheDocument();
  });

    it("calls the handleClick function when clicked", () => {
        const mockClick = vi.fn();
        render(<IceBreakerRevealButton show={false} handleClick={mockClick} />);
        
        const button = screen.getByTestId("icebreaker-reveal-btn");
        fireEvent.click(button);
        
        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it("has type='button' to prevent form submission", () => {
        setup();
        const button = screen.getByTestId("icebreaker-reveal-btn");
        expect(button).toHaveAttribute("type", "button");
    });
});
