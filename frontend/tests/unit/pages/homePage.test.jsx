import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../../../src/pages/Home/HomePage";
import { expect } from "vitest";

describe("Home Page", () => {
  beforeEach(() => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <HomePage />
      </BrowserRouter>,
    );
  });

  test("welcomes you to the site", () => {
    const heading = screen.getByRole("heading", {
      name: "Welcome to LooBreak!",
    });
    expect(heading).toBeInTheDocument();
  });

  test("displays navbar", () => {
    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  test("Displays a quiz link", async () => {
    const quizLinks = screen.getAllByRole("link", { name: /quiz/i });
    expect(quizLinks[1].getAttribute("href")).toEqual("/quiz");
  });

  test("displays the icebreaker component", () => {
    expect(screen.getByTestId("icebreaker-component")).toBeInTheDocument();
  });

  test("Displays a leaderboard link", async () => {
    const leaderboardLinks = screen.getAllByRole("link", {
      name: /leaderboard/i,
    });
    expect(leaderboardLinks[1].getAttribute("href")).toEqual("/leaderboard");
  });
});
