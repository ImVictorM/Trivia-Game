import { useCallback, useEffect, useMemo, useState } from "react";
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
import { calculateScore, constants, shuffleArray, sleep } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
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
import { useTranslation } from "react-i18next";
import { tryToTranslate } from "@/services/googleTranslateApi";

type CurrentQuestionState = {
  question: Question | null;
  answers: string[];
  answerWasSelected: boolean;
};

export default function Game() {
  const [questions, setQuestions] = useState<Question[]>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestionState, setCurrentQuestionState] =
    useState<CurrentQuestionState>({
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
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(true);
  const [isChangingQuestion, setIsChangingQuestion] = useState(false);
  const { width } = useScreenDimensions();
  const { token, clearToken, tokenIsEmpty, setToken } = useToken();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(["game", "common"]);
  const language = useSelector((state: RootState) => state.language);

  const isLoading = useMemo(() => {
    return !(
      !isFetchingQuestions &&
      questions &&
      currentQuestionState.question &&
      currentQuestionState.answers.length !== 0
    );
  }, [
    currentQuestionState.answers.length,
    currentQuestionState.question,
    isFetchingQuestions,
    questions,
  ]);

  const translateTriviaQuestion = useCallback(
    async (q: Question): Promise<Question> => {
      const { correct_answer, incorrect_answers, question } = q;
      const entries = Object.entries({
        correct_answer,
        incorrect_answers,
        question,
      });

      const toTranslate = entries.map(([key, value]) => {
        return {
          key: key,
          content: Array.isArray(value) ? value : [value],
        };
      });

      const response = await tryToTranslate(toTranslate, "en", "pt-BR");

      const responseToQuestion = response.reduce((acc, element) => {
        return {
          ...acc,
          [element.key]:
            element.key === "incorrect_answers"
              ? element.content
              : element.content[0],
        };
      }, {});

      // 9 => general knowledge category id
      const triviaCategoryId =
        constants.TRIVIA_CATEGORIES.find(
          (category) => category.name === q.category
        )?.id || 9;

      return {
        ...q,
        ...responseToQuestion,
        category: t(`categories.${triviaCategoryId}`, { ns: "common" }),
      };
    },
    [t]
  );

  const changeCurrentQuestionIndex = useCallback(() => {
    if (!questions) return;
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // go to feedback if there is not any remaining questions
      navigate("/feedback");
    }
  }, [currentQuestionIndex, navigate, questions]);

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
      setIsFetchingQuestions(true);

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
            setErrorMessage(null);
            setIsFetchingQuestions(false);

            return;
          }
          case TriviaResponseCode.TOKEN_EMPTY: {
            const resetResponse = await resetTriviaToken(token);
            setToken(resetResponse.token);
            setIsFetchingQuestions(false);
            setErrorMessage(null);
            restartCountdown();

            return;
          }
          case TriviaResponseCode.TOKEN_NOT_FOUND: {
            setIsFetchingQuestions(false);
            stopCountdown();
            clearToken();
            return;
          }
          case TriviaResponseCode.NO_RESULT: {
            setIsFetchingQuestions(false);
            setErrorMessage(t("errors.noResult"));
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
            setIsFetchingQuestions(false);
            setErrorMessage(t("errors.generic"));
            return;
          }
        }
      }

      setErrorMessage(t("errors.fetchFailed"));
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
    t,
    language.code,
    translateTriviaQuestion,
  ]);

  // On changing question index
  useEffect(() => {
    const changeToNextQuestion = async () => {
      setIsChangingQuestion(true);

      if (!questions) return;

      const nextQuestion =
        language.code === "pt-BR"
          ? await translateTriviaQuestion(questions[currentQuestionIndex])
          : questions[currentQuestionIndex];

      setCurrentQuestionState((prev) => ({
        ...prev,
        question: nextQuestion,
        answers: shuffleAnswers(nextQuestion),
        answerWasSelected: false,
      }));

      setIsChangingQuestion(false);
      startCountdown();
    };

    changeToNextQuestion();
  }, [
    currentQuestionIndex,
    language.code,
    questions,
    startCountdown,
    translateTriviaQuestion,
  ]);

  // Go to login if the token doesn't exist
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Update the player global state when score changes
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
        changeCurrentQuestionIndex();
      }
    }

    document.addEventListener("keydown", handleNextOnEnterKeyDown);

    return () =>
      document.removeEventListener("keydown", handleNextOnEnterKeyDown);
  }, [changeCurrentQuestionIndex, currentQuestionState.answerWasSelected]);

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
                  icon={{
                    src: exitDoorIcon,
                    alt: t("exitDoor", { ns: "common" }),
                  }}
                  text={t("endMatch.buttonText", { ns: "game" })}
                  dialog={{
                    bodyMessage: t("endMatch.dialog.body", { ns: "game" }),
                    title: t("endMatch.dialog.title", { ns: "game" }),
                    onConfirm: () => {
                      navigate("/feedback");
                    },
                  }}
                />
                <RoundAnimatedButton
                  color="red"
                  icon={{
                    src: surrenderFlagIcon,
                    alt: t("surrenderFlag", { ns: "common" }),
                  }}
                  text={t("surrender.buttonText", { ns: "game" })}
                  dialog={{
                    bodyMessage: t("surrender.dialog.body", { ns: "game" }),
                    title: t("surrender.dialog.title", { ns: "game" }),
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
                onClick={changeCurrentQuestionIndex}
                className="next-button"
                isLoading={isChangingQuestion}
                disabled={isChangingQuestion}
                loadingText={t("gettingNextQuestion")}
                icon={{
                  src: rightArrow,
                  alt: t("rightArrow", { ns: "common" }),
                }}
              >
                {t("next", { ns: "game" })}
              </Button>
            )}
          </StyledAnswersWrapper>
        </StyledGameWrapper>
      )}

      {!isLoading && errorMessage && <GameError message={errorMessage} />}
    </GameLayout>
  );
}
