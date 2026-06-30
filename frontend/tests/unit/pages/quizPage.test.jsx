import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, beforeEach, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { QuizPage } from "../../../src/pages/Quiz/QuizPage";
import { getQuiz } from "../../../src/services/quiz";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
  };
});

// Mocking the getQuiz service
vi.mock("../../../src/services/quiz", () => {
  return {
    getQuiz: vi.fn(),
  };
});

const mockQuiz = [
  {
    question: "Red Vines is a brand of what type of candy?",
    correct_answer: "Licorice",
    incorrect_answers: ["Lollipop", "Chocolate", "Bubblegum"],
  },
  {
    question: "What is the largest planet in our solar system?",
    correct_answer: "Jupiter",
    incorrect_answers: ["Saturn", "Earth", "Mars"],
  },
  {
    question: "Which gas do plants primarily absorb from the atmosphere?",
    correct_answer: "Carbon dioxide",
    incorrect_answers: ["Oxygen", "Nitrogen", "Hydrogen"],
  },
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Quiz Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    getQuiz.mockResolvedValue(mockQuiz);
  });

  test("It displays quiz questions from the backend", async () => {
    renderWithRouter(<QuizPage />);

    const question = await screen.findByText(mockQuiz[0].question);
    expect(question.textContent).toEqual(
      "Red Vines is a brand of what type of candy?",
    );
  });

  test("It displays the correct answer as an option", async () => {
    renderWithRouter(<QuizPage />);

    const correctAnswer = await screen.findByRole("button", {
      name: mockQuiz[0].correct_answer,
    });
    expect(correctAnswer.textContent).toEqual("Licorice");
  });

  test("It displays all answer options", async () => {
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);

    expect(
      screen.getByRole("button", { name: "Licorice" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Lollipop" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Chocolate" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Bubblegum" }),
    ).toBeInTheDocument();
  });

  test("Allows user to select an answer and submit it. Answer buttons disable after submit and changes to arrow button", async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);

    const answerButton = screen.getByRole("button", { name: "Licorice" });
    await user.click(answerButton);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);
    expect(answerButton).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument();

    expect(screen.queryByRole("button", { name: "→" })).toBeInTheDocument();
  });

  test("Score increments after submit when answer is correct", async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);

    expect(screen.getByText("Score: 0/10")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Licorice" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Score: 1/10")).toBeInTheDocument();
  });

  test("Score does not increment after submit when answer is wrong", async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);

    expect(screen.getByText("Score: 0/10")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Chocolate" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Score: 0/10")).toBeInTheDocument();
  });

  test("Navigates to next question when → button is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);
    expect(screen.getByText("Question 1:")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Chocolate" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));
    await user.click(screen.getByRole("button", { name: "→" }));

    expect(screen.getByText(mockQuiz[1].question)).toBeInTheDocument();
    expect(screen.getByText("Question 2:")).toBeInTheDocument();
  });

  test("Displays loading message when waiting for data from backend", async () => {
    renderWithRouter(<QuizPage />);

    getQuiz.mockImplementation(() => new Promise(() => {}));

    expect(screen.getByText("Loading questions...")).toBeInTheDocument();
  });

  test("Displays result and result form once finished", async () => {
    const user = userEvent.setup();
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);
    await user.click(screen.getByRole("button", { name: /licorice/i }));
    await user.click(screen.getByRole("button", { name: /submit/i }));
    await user.click(screen.getByRole("button", { name: "→" }));
    await screen.findByText(mockQuiz[1].question);
    await user.click(screen.getByRole("button", { name: /jupiter/i }));
    await user.click(screen.getByRole("button", { name: /submit/i }));
    await user.click(screen.getByRole("button", { name: "→" }));
    await screen.findByText(mockQuiz[2].question);
    await user.click(screen.getByRole("button", { name: /carbon dioxide/i }));
    await user.click(screen.getByRole("button", { name: /submit/i }));
    await user.click(screen.getByRole("button", { name: "→" }));

    expect(screen.getByTestId("results")).toBeInTheDocument();
    expect(screen.getByTestId("results-form")).toBeInTheDocument();
  });

});
