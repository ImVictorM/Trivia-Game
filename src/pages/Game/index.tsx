// import Header from "../../components/Header";
import { useEffect, useState } from "react";
import style from "./game.module.css";
import { Question, getTriviaQuestions } from "@/services/triviaApi";
import { useCountdown, useToken } from "@/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { shuffleArray } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setGameStats } from "@/redux/slices/playerSlice";

type CurrentQuestionState = {
  questionIndex: number;
  question: Question | null;
  answers: string[];
  answerWasSelected: boolean;
};

export default function Game() {
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestionState, setCurrentQuestionState] =
    useState<CurrentQuestionState>({
      questionIndex: 0,
      question: null,
      answers: [],
      answerWasSelected: false,
    });

  const [currentGameStats, setCurrentGameStats] = useState({
    currentScore: 0,
    assertions: 0,
  });

  const { countdown, startCountdown, stopCountdown, restartCountdown } =
    useCountdown(30);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { token, clearToken } = useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function componentDidMount() {
      setIsLoading(true);

      try {
        const { response_code: questionResponseCode, results } =
          await getTriviaQuestions(token);

        if (questionResponseCode === 0) {
          setQuestions(results);

          const firstQuestionIndex = 0;
          const question = results[firstQuestionIndex];
          const answers = shuffleAnswers(question);

          setCurrentQuestionState({
            questionIndex: firstQuestionIndex,
            answers: answers,
            question: question,
            answerWasSelected: false,
          });

          startCountdown();
        } else {
          clearToken();
          navigate("/");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            setErrorMessage("Wait a second brother, you're getting too fast!");
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    componentDidMount();
  }, []);

  const changeToNextQuestion = () => {
    if (!questions) return;
    if (currentQuestionState.questionIndex + 1 < questions.length) {
      // change to next question
      setCurrentQuestionState((prevState) => {
        const nextQuestionIndex = prevState.questionIndex + 1;
        const nextQuestion = questions[nextQuestionIndex];
        return {
          questionIndex: nextQuestionIndex,
          question: nextQuestion,
          answers: shuffleAnswers(nextQuestion),
          answerWasSelected: false,
        };
      });

      restartCountdown();
    } else {
      // go to feedback if there is not any remaining questions
      navigate("/feedback");
    }
  };

  const shuffleAnswers = (question: Question) => {
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = question;
    const answers = [...incorrectAnswers, correctAnswer];

    return shuffleArray(answers);
  };

  const answerQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentQuestionState.question) return;

    const buttonElement = e.target as HTMLButtonElement;
    const correctAnswer = currentQuestionState.question.correct_answer;
    const chosenAnswer = buttonElement.innerText;

    if (correctAnswer === chosenAnswer) {
      const DEFAULT_POINTS_TO_SUM = 10;
      const EASY_POINTS = 1;
      const MEDIUM_POINTS = 2;
      const HARD_POINTS = 3;
      let difficultyPoints = null;
      switch (currentQuestionState.question.difficulty) {
        case "hard":
          difficultyPoints = HARD_POINTS;
          break;
        case "medium":
          difficultyPoints = MEDIUM_POINTS;
          break;
        default:
          difficultyPoints = EASY_POINTS;
          break;
      }

      const score = DEFAULT_POINTS_TO_SUM + countdown * difficultyPoints;

      setCurrentGameStats((prevStats) => ({
        currentScore: prevStats.currentScore + score,
        assertions: prevStats.assertions + 1,
      }));
    }

    stopCountdown();

    setCurrentQuestionState((prev) => ({
      ...prev,
      answerWasSelected: true,
    }));
  };

  useEffect(() => {
    dispatch(
      setGameStats({
        assertions: currentGameStats.assertions,
        score: currentGameStats.currentScore,
      })
    );
  }, [currentGameStats]);

  return (
    <section>
      {/* <Header /> */}
      {!isLoading && (
        <div>
          <p data-testid="question-category">
            {currentQuestionState.question?.category}
          </p>
          <p data-testid="question-text">
            {currentQuestionState.question?.question}
          </p>
          <div data-testid="answer-options">
            {currentQuestionState.answers.map((answer, index) => (
              <button
                key={index}
                type="button"
                data-testid={
                  answer === currentQuestionState.question?.correct_answer
                    ? "correct-answer"
                    : `wrong-answer-${index}`
                }
                className={
                  currentQuestionState.answerWasSelected &&
                  (currentQuestionState.question!.correct_answer === answer
                    ? style.green
                    : style.red)
                }
                disabled={countdown === 0}
                onClick={answerQuestion}
              >
                {answer}
              </button>
            ))}
          </div>
          <div>
            <span>Remaining time:</span>
            <span>{countdown}</span>
          </div>
          {currentQuestionState.answerWasSelected && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={changeToNextQuestion}
            >
              Next
            </button>
          )}
        </div>
      )}

      {errorMessage && <span>{errorMessage}</span>}
    </section>
  );
}
