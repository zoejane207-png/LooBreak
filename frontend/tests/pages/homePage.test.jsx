import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../../src/pages/Home/HomePage";

describe("Home Page", () => {
  test("welcomes you to the site", () => {
    // We need the Browser Router so that the Link elements load correctly
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <HomePage />
      </BrowserRouter>,
    );

    const heading = screen.getByRole("heading", {
      name: "Welcome to LooBreak!",
    });
    expect(heading).toBeInTheDocument();
  });

  test("displays navbar", () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <HomePage />
      </BrowserRouter>,
    );

    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  test("Displays a quiz link", async () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <HomePage />
      </BrowserRouter>,
    );

    const quizLink = screen.getByRole("link", { name: "Quiz" });
    expect(quizLink.getAttribute("href")).toEqual("/quiz");
  });

  test("Displays a leaderboard link", async () => {
    render(
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <HomePage />
      </BrowserRouter>,
    );

    const leaderboardLink = screen.getByRole("link", { name: "Leaderboard" });
    expect(leaderboardLink.getAttribute("href")).toEqual("/leaderboard");
  });
});
