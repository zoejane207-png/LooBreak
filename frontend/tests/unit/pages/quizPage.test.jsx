import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, describe, test, beforeEach, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import { QuizPage } from "../../../src/pages/Quiz/QuizPage";
import { getQuiz } from "../../../src/services/quiz";
import { act } from "react";

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
  return render(
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {component}
    </BrowserRouter>
  );
};

describe("Quiz Page", () => {
  let user;

  async function clickAndWait(element) {
    await act(async () => {
      await user.click(element);
    });
  }

  beforeEach(() => {
    vi.clearAllMocks();
    getQuiz.mockResolvedValue(mockQuiz);
    user = userEvent.setup();
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
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);

    const answerButton = screen.getByRole("button", { name: "Licorice" });
    await clickAndWait(answerButton)
    
    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).not.toBeDisabled();

    await clickAndWait(submitButton)

    expect(answerButton).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument();

    expect(screen.getByTestId("arrow-button")).toBeInTheDocument();
  });

  test("Score increments after submit when answer is correct", async () => {
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);

    expect(
      screen.getByText(`Score: 0/${mockQuiz.length}`),
    ).toBeInTheDocument();

    await clickAndWait(screen.getByRole("button", { name: "Licorice" }));
    await clickAndWait(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByText(`Score: 1/${mockQuiz.length}`),
    ).toBeInTheDocument();
  });

  test("Score does not increment after submit when answer is wrong", async () => {
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);

    expect(
      screen.getByText(`Score: 0/${mockQuiz.length}`),
    ).toBeInTheDocument();

    await clickAndWait(screen.getByRole("button", { name: "Chocolate" }));
    await clickAndWait(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByText(`Score: 0/${mockQuiz.length}`),
    ).toBeInTheDocument();
  });

  test("Navigates to next question when → button is clicked", async () => {
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);
    expect(screen.getByText("Question 1:")).toBeInTheDocument();

    await clickAndWait(screen.getByRole("button", { name: "Chocolate" }));
    await clickAndWait(screen.getByRole("button", { name: "Submit" }));
    await clickAndWait(screen.getByTestId("arrow-button"));

    expect(screen.getByText(mockQuiz[1].question)).toBeInTheDocument();
    expect(screen.getByText("Question 2:")).toBeInTheDocument();
  });

  test("Displays loading skeleton when waiting for data from backend", async () => {
    getQuiz.mockImplementation(() => new Promise(() => {}));

    renderWithRouter(<QuizPage />);

    expect(screen.getByTestId("quiz-skeleton")).toBeInTheDocument();
  });

  test("Displays result and result form once finished", async () => {
    renderWithRouter(<QuizPage />);

    await screen.findByText(mockQuiz[0].question);
    await clickAndWait(screen.getByRole("button", { name: /licorice/i }));
    await clickAndWait(screen.getByRole("button", { name: /submit/i }));
    await clickAndWait(screen.getByTestId("arrow-button"));
    await screen.findByText(mockQuiz[1].question);
    await clickAndWait(screen.getByRole("button", { name: /jupiter/i }));
    await clickAndWait(screen.getByRole("button", { name: /submit/i }));
    await clickAndWait(screen.getByTestId("arrow-button"));
    await screen.findByText(mockQuiz[2].question);
    await clickAndWait(screen.getByRole("button", { name: /carbon dioxide/i }));
    await clickAndWait(screen.getByRole("button", { name: /submit/i }));
    await clickAndWait(screen.getByTestId("arrow-button"));

    expect(screen.getByTestId("results")).toBeInTheDocument();
    expect(screen.getByTestId("results-form")).toBeInTheDocument();
  });
});
