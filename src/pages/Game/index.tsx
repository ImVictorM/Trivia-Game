import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Question,
  getTriviaQuestions,
  TriviaResponseCode,
  resetTriviaToken,
  QuestionDifficulty,
} from "@/services/triviaApi";
import { useCountdown, useGameSettings, useScreenDimensions } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { calculateScore, constants, shuffleArray, sleep } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setGameStats, setToken } from "@/redux/slices/playerSlice";
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
};

export const GAME_PAGE_ID = "game-page";
export const GAME_PAGE_NEXT_BUTTON_ID = "game-page-next-button";
export const GAME_PAGE_OPTIONS_ID = "game-page-options";
export const GAME_PAGE_SURRENDER_BUTTON_ID = "game-page-surrender-button";
export const GAME_PAGE_END_MATCH_BUTTON_ID = "game-page-end-match-button";

export default function Game() {
  const [questions, setQuestions] = useState<Question[]>();
  const questionIndexRef = useRef<number>(0);
  const [answerWasSelected, setAnswerWasSelected] = useState(false);
  const [currentQuestionState, setCurrentQuestionState] =
    useState<CurrentQuestionState>({
      question: null,
      answers: [],
    });

  const [currentGameStats, setCurrentGameStats] = useState({
    currentScore: 0,
    assertions: 0,
  });

  const { countdown, startCountdown, stopCountdown } = useCountdown(30);
  const [settings] = useGameSettings();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(true);
  const [isChangingQuestion, setIsChangingQuestion] = useState(false);
  const { width } = useScreenDimensions();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(["game", "common"]);
  const token = useSelector((state: RootState) => state.player.token);
  const language = useSelector((state: RootState) => state.language);

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

  const showNextButton = useMemo(() => {
    return answerWasSelected || countdown === 0;
  }, [answerWasSelected, countdown]);

  const setQuestionAndStartGame = useCallback(
    async (question: Question) => {
      setIsChangingQuestion(true);

      const nextQuestion =
        language.code === "pt-BR"
          ? await translateTriviaQuestion(question)
          : question;

      setCurrentQuestionState({
        question: nextQuestion,
        answers: shuffleAnswers(nextQuestion),
      });

      setIsChangingQuestion(false);

      startCountdown();
    },
    [language.code, startCountdown, translateTriviaQuestion]
  );
  const changeToNextQuestion = useCallback(async () => {
    if (!questions || questions.length === 0) return;
    const nextQuestionIndex = questionIndexRef.current + 1;

    if (nextQuestionIndex < questions.length) {
      questionIndexRef.current += 1;
      setAnswerWasSelected(false);
      setQuestionAndStartGame(questions[nextQuestionIndex]);
    } else {
      // go to feedback if there is not any remaining questions
      navigate("/feedback");
    }
  }, [navigate, questions, setQuestionAndStartGame]);

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
    isCorrectAnswer: boolean,
    difficulty: QuestionDifficulty
  ) => {
    if (isCorrectAnswer) {
      const score = calculateScore(difficulty, countdown);

      setCurrentGameStats((prevStats) => ({
        currentScore: prevStats.currentScore + score,
        assertions: prevStats.assertions + 1,
      }));
    }

    setAnswerWasSelected(true);
    stopCountdown();
  };

  // Fetch the question on component did mount
  useEffect(() => {
    async function fetchTriviaQuestions(token: string) {
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
            setQuestionAndStartGame(results[questionIndexRef.current]);

            return;
          }
          case TriviaResponseCode.TOKEN_EMPTY: {
            const resetResponse = await resetTriviaToken(token);
            dispatch(setToken({ value: resetResponse.token }));
            setIsFetchingQuestions(false);
            setErrorMessage(null);
            stopCountdown();

            return;
          }
          case TriviaResponseCode.TOKEN_NOT_FOUND: {
            dispatch(setToken({ value: undefined }));
            setIsFetchingQuestions(false);
            stopCountdown();
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

      setIsFetchingQuestions(false);
      setErrorMessage(t("errors.fetchFailed"));
    }

    if (token) {
      fetchTriviaQuestions(token);
    }
  }, [dispatch, settings, stopCountdown, token, setQuestionAndStartGame, t]);

  // Go to login if the token doesn't exist
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [navigate, token]);

  // Update the player global state when score changes
  useEffect(() => {
    dispatch(
      setGameStats({
        assertions: currentGameStats.assertions,
        score: currentGameStats.currentScore,
      })
    );
  }, [currentGameStats.assertions, currentGameStats.currentScore, dispatch]);

  // Change question pressing "Enter"
  useEffect(() => {
    async function handleNextOnEnterKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && answerWasSelected && questions) {
        await changeToNextQuestion();
      }
    }

    document.addEventListener("keydown", handleNextOnEnterKeyDown);

    return () =>
      document.removeEventListener("keydown", handleNextOnEnterKeyDown);
  }, [changeToNextQuestion, answerWasSelected, questions]);

  return (
    <GameLayout>
      {isFetchingQuestions && <Loading />}

      {!isFetchingQuestions &&
        (errorMessage ? (
          <GameError message={errorMessage} />
        ) : (
          currentQuestionState.question && (
            <StyledGameWrapper data-testid={GAME_PAGE_ID}>
              <StyledQuestionWrapper>
                <img className="logo" src={logo} alt="trivia logo" />

                <QuestionCard
                  category={currentQuestionState.question.category}
                  countdown={countdown}
                  question={currentQuestionState.question.question}
                />

                {width > sizes.desktopXS && (
                  <div className="buttons-wrapper">
                    <RoundAnimatedButton
                      data-testid={GAME_PAGE_END_MATCH_BUTTON_ID}
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
                      data-testid={GAME_PAGE_SURRENDER_BUTTON_ID}
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
                $questionType={currentQuestionState.question.type}
              >
                <div
                  className="answers-options"
                  data-testid={GAME_PAGE_OPTIONS_ID}
                >
                  {currentQuestionState.answers.map((answer, index) => (
                    <AnswerButton
                      correctAnswer={
                        currentQuestionState.question!.correct_answer
                      }
                      answerWasSelected={answerWasSelected}
                      index={index}
                      answer={answer}
                      key={index}
                      disabled={showNextButton}
                      onClick={(event, isCorrectAnswer) =>
                        answerQuestion(
                          event,
                          isCorrectAnswer,
                          currentQuestionState.question!.difficulty
                        )
                      }
                    />
                  ))}
                </div>

                {showNextButton && (
                  <Button
                    color="green"
                    type="button"
                    data-testid={GAME_PAGE_NEXT_BUTTON_ID}
                    onClick={changeToNextQuestion}
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
          )
        ))}
    </GameLayout>
  );
}
