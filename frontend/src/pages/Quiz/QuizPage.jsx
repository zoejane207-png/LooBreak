import { useState, useEffect } from "react";
import { getQuiz } from "../../services/quiz";
import NavBar from "../../components/NavBar";
import Results from "../../components/Results";
import ResultsForm from "../../components/ResultsForm";
import { Skeleton } from "@/components/ui/skeleton";
import no1 from "../../assets/loobreak-number-1.svg";
import no2 from "../../assets/loobreak-number-2.svg";
import no3 from "../../assets/loobreak-number-3.svg";
import no4 from "../../assets/loobreak-number-4.svg";
import no5 from "../../assets/loobreak-number-5.svg";
import no6 from "../../assets/loobreak-number-6.svg";
import no7 from "../../assets/loobreak-number-7.svg";
import no8 from "../../assets/loobreak-number-8.svg";
import no9 from "../../assets/loobreak-number-9.svg";
import no10 from "../../assets/loobreak-number-10.svg";

const quizNumbers = [no1, no2, no3, no4, no5, no6, no7, no8, no9, no10];
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { CircleArrowRight } from "lucide-react";

// Shared shell so the skeleton and the real quiz can't drift apart.
const QUIZ_CONTAINER_CLASS =
  "mx-auto flex w-full max-w-md flex-col gap-3 p-6 items-center";

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
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentQuestion = quiz[currentIndex];

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
      style.border = "3px solid hsl(var(--ring))";
    } else {
      style.border = "1px solid hsl(var(--border))";
    }

    if (!hasSubmitted && isSelected) {
      if (answer === playerAnswer) {
        style.backgroundColor = "hsl(var(--accent))";
        style.color = "black";
      }
    } else if (hasSubmitted) {
      if (answer === currentQuestion.correct_answer) {
        style.backgroundColor = "hsl(var(--success))";
        style.color = "hsl(var(--success-foreground))";
        style.opacity = "1"; // Keep bright, don't fade
        style.fontWeight = "600"; // Make correct answer stand out
      } else if (answer === playerAnswer) {
        style.backgroundColor = "hsl(var(--destructive))";
        style.color = "hsl(var(--destructive-foreground))";
        style.opacity = "1"; // Keep bright
        style.fontWeight = "600"; // Make selected answer stand out
      } else {
        // Other answers, go slightly frosted
        style.opacity = "0.5";
        style.backgroundColor = "hsl(var(--muted))";
        style.color = "hsl(var(--muted-foreground))";
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
          <p className="text-accent">
            Score: {score}/{quiz.length}
          </p>
          <div className="quiz">
            <Item className="border-border">
              <ItemContent className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img
                    src={quizNumbers[currentIndex]}
                    alt={`Question ${currentIndex + 1}`}
                    className="w-8 h-8"
                  />
                  <ItemTitle className="text-xs text-muted-foreground">
                    Question {currentIndex + 1}:
                  </ItemTitle>
                </div>
                <ItemDescription>{currentQuestion.question}</ItemDescription>
              </ItemContent>
            </Item>
            <br></br>
            <div className="flex flex-col gap-0.5">
              {answers.map((answer, index) => (
                <Button
                  variant="outline"
                  style={{
                    ...getButtonStyle(answer),
                  }}
                  key={index}
                  onClick={() => handleAnswer(currentQuestion, answer)}
                  disabled={hasSubmitted}
                >
                  {answer}
                  {hasSubmitted && (
                    <span style={{ marginLeft: "0.5rem" }}>
                      {answer === currentQuestion.correct_answer
                        ? "✓ Correct"
                        : "✗ Incorrect"}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
          {!hasSubmitted && (
            <Button
              variant="default"
              disabled={!isSelected}
              onClick={handleSubmit}
              className="w-20 h-8"
            >
              Submit
            </Button>
          )}
          {!finished && hasSubmitted && (
            <Button
              variant="default"
              disabled={!isSelected}
              onClick={handleNextQuestion}
              className="w-20 h-8"
              data-testid="arrow-button"
            >
              <CircleArrowRight />
            </Button>
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
