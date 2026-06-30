import { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz";
import NavBar from "../../components/NavBar";
import Results from "../../components/Results";
import ResultsForm from "../../components/ResultsForm";
import { Skeleton } from "@/components/ui/skeleton";

export function QuizPage() {
  const [quiz, setQuiz] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const currentQuestion = quiz[currentIndex];
  const [score, setScore] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

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

  if (!quiz.length) {
    return (
      <>
        <NavBar />
        <div
          data-testid="quiz-skeleton"
          className="mx-auto flex w-full max-w-md flex-col gap-4 p-6"
        >
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-16 w-full" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-11 w-full rounded-md" />
            ))}
          </div>
        </div>
      </>
    );
  }

  const answers = [
    currentQuestion.correct_answer,
    ...currentQuestion.incorrect_answers,
  ].sort();

  return (
    <>
      <NavBar />
      {!finished && (
        <div
          data-test-id="quiz"
          className="mx-auto flex w-full max-w-md flex-col gap-3 p-6"
        >
          <h2 className="text-2xl font-bold">Quiz</h2>
          <h3 className="text-lg font-semibold">Question {currentIndex + 1}:</h3>
          <p className="text-muted-foreground">Score: {score}/10</p>
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
