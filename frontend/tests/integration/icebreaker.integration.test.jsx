import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Icebreaker from "../../src/components/icebreaker";
import { getIcebreaker } from "../../src/services/icebreaker";
import '@testing-library/jest-dom/vitest';

vi.mock("../../src/services/icebreaker", () => ({
    getIcebreaker: vi.fn(),
    }));

describe("Icebreaker Component", () => {
    const setup = () => {
        render(<Icebreaker />);
        const button = screen.getByTestId("icebreaker-reveal-btn");
        return { button };
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("fetches from database and displays an icebreaker when the button is clicked", async () => {
        const mockData = { iceBreaker: { icebreaker: "What is your favorite hobby?" } };
        getIcebreaker.mockResolvedValue(mockData);
        // const button = screen.getByRole("button", { name: /show me an icebreaker!/i });
        const { button } = setup();

        fireEvent.click(button);

        const textElement = await screen.findByText(/what is your favorite hobby\?/i);
        expect(textElement).toBeInTheDocument();
    });

    it("toggles visibility when the button is clicked again", async () => {      
        const mockData = { iceBreaker: { icebreaker: "What is your favorite hobby?" } };
        getIcebreaker.mockResolvedValue(mockData);
        const { button } = setup();        
        // First click to reveal
        // const button = screen.getByRole("button");
        fireEvent.click(button);
        await screen.findByText(/what is your favorite hobby\?/i);

        // Second click to hide
        fireEvent.click(button);
        expect(screen.queryByText(/what is your favorite hobby\?/i)).not.toBeInTheDocument();
    });

    it("throws an error when unable to call database", async () => {
        getIcebreaker.mockRejectedValue(new Error("Database connection failed"));
        const { button } = setup();
        // const button = screen.getByRole("button", { name: /show me an icebreaker!/i });
        fireEvent.click(button);
        const error = await screen.findByText(/could not fetch icebreaker/i);
        expect(error).toBeInTheDocument();
    });
});