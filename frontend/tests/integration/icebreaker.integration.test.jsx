import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import Icebreaker from "../../src/components/icebreaker";
import { getIcebreaker } from "../../src/services/icebreaker";
import "@testing-library/jest-dom/vitest";

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
    const mockData = {
      iceBreaker: { icebreaker: "What is your favorite hobby?" },
    };
    getIcebreaker.mockResolvedValue(mockData);
    const { button } = setup();

    fireEvent.click(button);

    it("displays loading message while fetching", async () => {
        let resolvePromise;
        const pendingPromise = new Promise((resolve) => {
            resolvePromise = resolve;
        });
        getIcebreaker.mockReturnValue(pendingPromise);
        const { button } = setup();

            fireEvent.click(button);

        expect(screen.getByText(/icebreakers loading/i)).toBeInTheDocument();
        await act(async () => {
            resolvePromise({ iceBreakers: [] });
        });        
    });

    it("fetches from database and displays 3 icebreakers when the button is clicked", async () => {
        const mockData = { iceBreakers: [
            { _id: "1", icebreaker: "What is your favorite hobby?" }, 
            { _id: "2", icebreaker: "Have you ever been in a restroom with a very strange mirror?" }, 
            { _id: "3", icebreaker: "Do you always use a fresh towel after every single shower?" }, 
        ]};
        getIcebreaker.mockResolvedValue(mockData);
        const { button } = setup();

        await act(async () => {
            fireEvent.click(button);
        });

    // Second click to hide
    fireEvent.click(button);
    expect(
      screen.queryByText(/what is your favorite hobby\?/i),
    ).not.toBeInTheDocument();
  });

    it("toggles visibility when the button is clicked again", async () => {      
        const mockData = { iceBreakers: [
            { _id: "1", icebreaker: "What is your favorite hobby?" }, 
            { _id: "2", icebreaker: "Have you ever been in a restroom with a very strange mirror?" }, 
            { _id: "3", icebreaker: "Do you always use a fresh towel after every single shower?" }, 
        ]};
        getIcebreaker.mockResolvedValue(mockData);
        const { button } = setup();        
        // First click to reveal
        await act(async () => {
            fireEvent.click(button);
        });
        await screen.findByText(/what is your favorite hobby\?/i);

        // Second click to hide
        await act(async () => {
            fireEvent.click(button);
        });
        expect(screen.queryByText(/what is your favorite hobby\?/i)).not.toBeInTheDocument();
    });

    it("throws an error when unable to call database", async () => {
        getIcebreaker.mockRejectedValue(new Error("Database connection failed"));
        const { button } = setup();
        await act(async () => {
            fireEvent.click(button);
        });
        const error = await screen.findByText(/could not fetch icebreaker/i);
        expect(error).toBeInTheDocument();
    });

    it("renders all three icebreakers from the returned array", async () => {
        const mockData = { iceBreakers: [
            { _id: "1", icebreaker: "What is your favorite hobby?" }, 
            { _id: "2", icebreaker: "Have you ever been in a restroom with a very strange mirror?" }, 
            { _id: "3", icebreaker: "Do you always use a fresh towel after every single shower?" }, 
        ]};
        getIcebreaker.mockResolvedValue(mockData);
        const { button } = setup();
        
        await act(async () => {
            fireEvent.click(button);
        });

        expect(await screen.findByText(/what is your favorite hobby\?/i)).toBeInTheDocument();
        expect(await screen.findByText(/have you ever been in a restroom with a very strange mirror\?/i)).toBeInTheDocument();
        expect(await screen.findByText(/do you always use a fresh towel after every single shower\?/i)).toBeInTheDocument();        
    });

    it("displays the icebreaker list container only after clicking the button", () => {
        setup();
        expect(screen.queryByTestId("icebreaker-list")).not.toBeInTheDocument();
    });

    it("does not render the list if the array is empty", async () => {
        getIcebreaker.mockResolvedValue({ iceBreakers: [] });
        const { button } = setup();

        await act(async () => {
            fireEvent.click(button);
        });

        expect(screen.queryByTestId("icebreaker-list")).not.toBeInTheDocument();
    });
});
