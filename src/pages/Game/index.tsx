import { useCallback, useEffect, useState } from "react";
import {
  Question,
  getTriviaQuestions,
  TriviaResponseCode,
  resetTriviaToken,
} from "@/services/triviaApi";
import {
  useCountdown,
  useGameSettings,
  useScreenDimensions,
  useToken,
} from "@/hooks";
import { useNavigate } from "react-router-dom";
import { calculateScore, shuffleArray, sleep } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setGameStats } from "@/redux/slices/playerSlice";
import { GameLayout } from "@/layouts";
import {
  StyledAnswersWrapper,
  StyledGameWrapper,
  StyledQuestionWrapper,
} from "./style";
import { Button, RoundAnimatedButton } from "@/components";
import QuestionCard from "./QuestionCard";
import AnswerButton from "./AnswerButton";
import Loading from "./Loading";
import { logo } from "@/assets/images";
import GameError from "./GameError";
import { exitDoorIcon, surrenderFlagIcon, rightArrow } from "@/assets/icons";
import { sizes } from "@/styles/breakpoints";

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
  const [settings] = useGameSettings();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useScreenDimensions();
  const { token, clearToken, tokenIsEmpty, setToken } = useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const changeToNextQuestion = useCallback(() => {
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
  }, [
    currentQuestionState.questionIndex,
    navigate,
    questions,
    restartCountdown,
  ]);

  const shuffleAnswers = (question: Question) => {
    const {
      incorrect_answers: incorrectAnswers,
      correct_answer: correctAnswer,
    } = question;
    const answers = [...incorrectAnswers, correctAnswer];

    return shuffleArray(answers);
  };

  const answerQuestion = (
    _e: React.MouseEvent<HTMLButtonElement>,
    answer: string
  ) => {
    if (!currentQuestionState.question) return;

    const correctAnswer = currentQuestionState.question.correct_answer;

    if (correctAnswer === answer) {
      const score = calculateScore(
        currentQuestionState.question.difficulty,
        countdown
      );

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

  // Fetch the question on component did mount
  useEffect(() => {
    async function fetchTriviaQuestions() {
      setIsLoading(true);

      const MAX_TRIES_TO_FETCH = 5;
      let currentTry = 1;

      while (currentTry <= MAX_TRIES_TO_FETCH) {
        const { response_code: responseCode, results } =
          await getTriviaQuestions({
            token: token,
            categoryId: settings.categoryId,
            difficulty: settings.difficulty,
            type: settings.type,
          });

        switch (responseCode) {
          case TriviaResponseCode.SUCCESS: {
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

            setErrorMessage(null);
            startCountdown();
            setIsLoading(false);

            return;
          }
          case TriviaResponseCode.TOKEN_EMPTY: {
            const resetResponse = await resetTriviaToken(token);
            setToken(resetResponse.token);
            setIsLoading(false);
            setErrorMessage(null);
            restartCountdown();

            return;
          }
          case TriviaResponseCode.TOKEN_NOT_FOUND: {
            setIsLoading(false);
            stopCountdown();
            clearToken();
            return;
          }
          case TriviaResponseCode.NO_RESULT: {
            setIsLoading(false);
            setErrorMessage(
              "Sorry, but we could not find sufficient questions for your game. Try changing your setting to something different!"
            );
            return;
          }
          case TriviaResponseCode.RATE_LIMIT: {
            // Each IP can only access the API once every 5 seconds.
            await sleep(5500);
            currentTry += 1;
            break;
          }
          case TriviaResponseCode.INVALID_PARAMETER:
          default: {
            setIsLoading(false);
            setErrorMessage("There was an unexpected error, try again later.");
            return;
          }
        }
      }

      setErrorMessage(
        "Sorry, but it was not possible to fetch questions for your trivia game. Try again later."
      );
    }
    if (!tokenIsEmpty) {
      fetchTriviaQuestions();
    }
  }, [
    clearToken,
    startCountdown,
    token,
    settings,
    tokenIsEmpty,
    setToken,
    restartCountdown,
    stopCountdown,
  ]);

  // Go to login if the token doesn't exist
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Update the player global state
  useEffect(() => {
    dispatch(
      setGameStats({
        assertions: currentGameStats.assertions,
        score: currentGameStats.currentScore,
      })
    );
  }, [currentGameStats, dispatch]);

  // Change question pressing "Enter"
  useEffect(() => {
    function handleNextOnEnterKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && currentQuestionState.answerWasSelected) {
        changeToNextQuestion();
      }
    }

    document.addEventListener("keydown", handleNextOnEnterKeyDown);

    return () =>
      document.removeEventListener("keydown", handleNextOnEnterKeyDown);
  }, [changeToNextQuestion, currentQuestionState.answerWasSelected]);

  return (
    <GameLayout>
      {isLoading && <Loading />}

      {!isLoading && !errorMessage && (
        <StyledGameWrapper>
          <StyledQuestionWrapper>
            <img className="logo" src={logo} alt="trivia logo" />
            <QuestionCard
              category={currentQuestionState.question!.category}
              countdown={countdown}
              question={currentQuestionState.question!.question}
            />

            {width > sizes.desktopXS && (
              <div className="buttons-wrapper">
                <RoundAnimatedButton
                  color="yellow"
                  icon={{ src: exitDoorIcon, alt: "exit door" }}
                  text="End match"
                  dialog={{
                    bodyMessage:
                      "Are you sure you want to end the match? ending the match will save your points and redirect you to the feedback screen.",
                    title: "End match",
                    onConfirm: () => {
                      navigate("/feedback");
                    },
                  }}
                />
                <RoundAnimatedButton
                  color="red"
                  icon={{ src: surrenderFlagIcon, alt: "surrender flag" }}
                  text="Surrender"
                  dialog={{
                    bodyMessage:
                      "Are you sure you want to surrender? surrendering will make you lose all your points.",
                    title: "Surrender",
                    onConfirm: () => {
                      navigate("/");
                    },
                  }}
                />
              </div>
            )}
          </StyledQuestionWrapper>

          <StyledAnswersWrapper
            $questionType={currentQuestionState.question!.type}
          >
            <div className="answers-options" data-testid="answer-options">
              {currentQuestionState.answers.map((answer, index) => (
                <AnswerButton
                  correctAnswer={currentQuestionState.question!.correct_answer}
                  disabled={
                    countdown === 0 || currentQuestionState.answerWasSelected
                  }
                  answerWasSelected={currentQuestionState.answerWasSelected}
                  index={index}
                  answer={answer}
                  key={index}
                  onClick={answerQuestion}
                />
              ))}
            </div>

            {(currentQuestionState.answerWasSelected || countdown === 0) && (
              <Button
                color="green"
                type="button"
                data-testid="btn-next"
                onClick={changeToNextQuestion}
                className="next-button"
                icon={{
                  src: rightArrow,
                  alt: "right arrow",
                }}
              >
                Next
              </Button>
            )}
          </StyledAnswersWrapper>
        </StyledGameWrapper>
      )}

      {!isLoading && errorMessage && <GameError message={errorMessage} />}
    </GameLayout>
  );
}
