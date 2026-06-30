import ResultsForm from "../../../src/components/ResultsForm";
import "@testing-library/jest-dom";
import { createPlayer } from "../../../src/services/results";
import userEvent from "@testing-library/user-event";

import { MemoryRouter } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock("../../../src/services/results", () => ({
  createPlayer: vi.fn(),
}));

describe("ResultsForm", () => {
  beforeEach(() => {
    render(
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ResultsForm score={7} />
      </MemoryRouter>,
    );
  });

  test("player name input shows on screen", () => {
    const playername = screen.getByLabelText("Playername");
    expect(playername).toBeInTheDocument();
  });

  test("generate playername button renders", () => {
    const generatePlayerName = screen.getByRole("button", {
      name: /Generate playername/i,
    });
    expect(generatePlayerName.textContent).toBeTruthy();
  });

  test("generate submit button renders", () => {
    const submit = screen.getByRole("button", { name: /submit/i });
    expect(submit.textContent).toBeTruthy();
  });

  test("throws error when name is less than 3 chars and won't create the player'", async () => {
    const user = userEvent.setup();
    const playername = screen.getByLabelText("Playername");
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.type(playername, "al");
    await user.click(submit);
    expect(
      screen.getByText("Playername must be more than 3 characters long"),
    ).toBeInTheDocument();
    expect(createPlayer).not.toHaveBeenCalled();
  });

  test("submitting name with more than 12 chars throws 'must be less than...'", async () => {
    const user = userEvent.setup();
    const playername = screen.getByLabelText("Playername");
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.type(playername, "thisnameiswaytoolong");
    await user.click(submit);
    expect(
      screen.getByText("Playername must be less than 12 characters long"),
    ).toBeInTheDocument();
  });

  test("clicking Generate playername fills the input playername with random name, therefor not empty", async () => {
    const user = userEvent.setup();
    const playername = screen.getByLabelText("Playername");
    const generateButton = screen.getByRole("button", {
      name: /Generate playername/i,
    });
    await user.click(generateButton);
    expect(playername).not.toHaveValue("");
  });

  test("creates player successfully with playername and score when submit is valid", async () => {
    const user = userEvent.setup();
    const playername = screen.getByLabelText("Playername");
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.type(playername, "chris1");
    await user.click(submit);

    expect(createPlayer).toHaveBeenCalledWith({
      playername: "chris1",
      score: 7,
    });
  });

  test("navigates to leaderboard on successful submit", async () => {
    const user = userEvent.setup();
    const playername = screen.getByLabelText("Playername");
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.type(playername, "chris1");
    await user.click(submit);

    expect(navigateMock).toHaveBeenCalledWith("/leaderboard");
  });

  test("that it shows error message when playername already exists", async () => {
    createPlayer.mockRejectedValueOnce(new Error("Playername already exists. Playername must be unique."));

    const user = userEvent.setup();
    const playername = screen.getByLabelText("Playername");
    const submit = screen.getByRole("button", { name: /submit/i });

    await user.type(playername, "chris1");
    await user.click(submit);

    expect(screen.getByText("Playername already exists. Playername must be unique.")).toBeInTheDocument();
  });
});
