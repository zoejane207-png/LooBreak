import { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz";
import NavBar from "../../components/NavBar";
import Results from "../../components/Results";
import ResultsForm from "../../components/ResultsForm";
import { Skeleton } from "@/components/ui/skeleton";
import no1 from "../assets/loobreak-number-1.svg";
import no2 from "../assets/loobreak-number-2.svg";
import no3 from "../assets/loobreak-number-3.svg";
import no4 from "../assets/loobreak-number-4.svg";
import no5 from "../assets/loobreak-number-5.svg";
import no6 from "../assets/loobreak-number-6.svg";
import no7 from "../assets/loobreak-number-7.svg";
import no8 from "../assets/loobreak-number-8.svg";
import no9 from "../assets/loobreak-number-9.svg";
import no10 from "../assets/loobreak-number-10.svg";

const quizNumbers = [{no1}, {no2}, (no3), {no4}, {no5}, (no6), {no7}, {no8}, (no9), {no10}];

// Shared shell so the skeleton and the real quiz can't drift apart.
const QUIZ_CONTAINER_CLASS = "mx-auto flex w-full max-w-md flex-col gap-3 p-6";

// Co-located with the real quiz below; mirrors its exact layout:
// title, question heading, score line, question body, four answer buttons.
function QuizSkeleton() {
  return (
    <div data-testid="quiz-skeleton" className={QUIZ_CONTAINER_CLASS}>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-16 w-full" />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
export function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [score, setScore] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quiz[currentIndex]; // Now it can access currentIndex
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    getQuiz().then((data) => {
      setQuiz(data);
    });
  }, []);

  function handleNextQuestion() {
    setIsSelected(false);
    setHasSubmitted(false);
    if (currentIndex < quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFinished(true);
    }
  }

  function handleAnswer(currentQuestion, answer) {
    setIsSelected(true);
    setPlayerAnswer(answer);
  }

  function handleSubmit() {
    setHasSubmitted(true);
    if (playerAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
      // turn button green
    } else {
      //turn button red
    }
  }

  function getButtonStyle(answer) {
    let style = {};

    if (isSelected && answer === playerAnswer) {
      style.border = "3px solid #00cafc";
    } else {
      style.border = "1px solid #1E1E1E";
    }

    if (!hasSubmitted && isSelected) {
      if (answer === playerAnswer) {
        style.backgroundColor = "yellow";
        style.color = "black";
      }
    } else if (hasSubmitted) {
      if (answer === currentQuestion.correct_answer) {
        style.backgroundColor = "green";
      } else {
        style.backgroundColor = "red";
      }
    }
    return style;
  }

  if (!finished && !quiz.length) {
    return (
      <>
        <NavBar />
        <QuizSkeleton />
      </>
    );
  }

  const answers =
    !finished && currentQuestion
      ? [
          currentQuestion.correct_answer,
          ...currentQuestion.incorrect_answers,
        ].sort()
      : [];

  return (
    <>
      <NavBar />
      {!finished && (
        <div data-test-id="quiz" className={QUIZ_CONTAINER_CLASS}>
          <h2 className="text-2xl font-bold">Quiz</h2>
          <h3 className="text-lg font-semibold" data-testid="{currentIndex + 1}" aria-label="{currentIndex + 1}">
            Question {currentIndex + 1}:
          </h3>
          <img src="{quizNumbers}" alt="" />
          <p className="text-muted-foreground">
            Score: {score}/{quiz.length}
          </p>
          <div className="feed" role="feed">
            <p>{currentQuestion.question}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                marginBottom: "1rem",
              }}
            >
              {answers.map((answer, index) => (
                <button
                  style={{
                    paddingInline: "2rem",
                    paddingBlock: "0.5rem",
                    borderRadius: "5px",
                    ...getButtonStyle(answer),
                  }}
                  key={index}
                  onClick={() => handleAnswer(currentQuestion, answer)}
                  disabled={hasSubmitted}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
          {!hasSubmitted && (
            <button disabled={!isSelected} onClick={handleSubmit}>
              Submit
            </button>
          )}
          {!finished && hasSubmitted && (
            <button onClick={handleNextQuestion}>→</button>
          )}
        </div>
      )}
      {finished && (
        <div data-testid="quiz-result">
          <Results score={score} />
          <ResultsForm score={score} />
        </div>
      )}
    </>
  );
}
