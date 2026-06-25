import NavBar from "../../src/components/NavBar";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("NavBar", () => {
  beforeEach(() => {
    render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            initialEntries={["/"]}
            <NavBar />
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/quiz" element={<div>Quiz Page</div>} />
                <Route path="/leaderboard" element={<div>Leaderboard Page</div>} />
            </Routes>
        </MemoryRouter>
    );
  });

  test("displays the nav bar", () => {
    const navBar = screen.getByRole("navigation");
    expect(navBar).toBeInTheDocument();
  });

  test("Navbar shows the homepage button", () => {
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton.textContent).toBeTruthy();
  });

  test("Navbar shows the quiz button", () => {
    const quizButton = screen.getByRole("link", { name: /quiz/i });
    expect(quizButton.textContent).toBeTruthy();
  });

  test("Navbar shows the leaderboard button", () => {
    const leaderboardButton = screen.getByRole("link", { name: /leaderboard/i });
    expect(leaderboardButton.textContent).toBeTruthy();
  });

  test("Navbar shows the light/dark mode button", () => {
    expect(
        screen.getByRole("button", { name: /dark mode|light mode/i })
    ).toBeInTheDocument();
  });

  test("home button redirects to homepage", async () => {
    await userEvent.click(screen.getByRole("link", { name: /home/i }));
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  test("quiz button redirects to quizpage", async () => {
    await userEvent.click(screen.getByRole("link", { name: /quiz/i }));
    expect(screen.getByText("Quiz")).toBeInTheDocument();
  });

  test("leaderboard button redirects to leaderboardpage", async () => {
    await userEvent.click(screen.getByRole("link", { name: /leaderboard/i }));
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  });
});
