import { useEffect, useRef, useState } from "react";
import { Question, getTriviaQuestions } from "@/services/triviaApi";
import { useCountdown, useToken } from "@/hooks";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateScore, shuffleArray, sleep } from "@/utils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setGameStats } from "@/redux/slices/playerSlice";
import { HeaderContentLayout } from "@/layouts";
import { StyledAnswersWrapper, StyledGameWrapper } from "./style";
import { GreenButton } from "@/components";
import QuestionCard from "./QuestionCard";
import AnswerButton from "./AnswerButton";
import Loading from "./Loading";
import { logo } from "@/assets/images";
import GameError from "./GameError";

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

  const [hadErrorOnFetching, setHadErrorOnFetching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, clearToken } = useToken();

  const abortControllerRef = useRef<AbortController | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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

  useEffect(() => {
    async function fetchTriviaQuestions() {
      setIsLoading(true);

      const MAX_TRIES_TO_FETCH = 5;
      let currentTry = 1;

      abortControllerRef.current?.abort();

      while (currentTry <= MAX_TRIES_TO_FETCH) {
        abortControllerRef.current = new AbortController();

        try {
          const { response_code: questionResponseCode, results } =
            await getTriviaQuestions({
              token: token,
              signal: abortControllerRef.current.signal,
            });

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

            setHadErrorOnFetching(false);
            startCountdown();
            setIsLoading(false);

            return;
          } else {
            // invalid token
            clearToken();
            return;
          }
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            setIsLoading(false);
            return;
          }
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 429) {
              // request interval very short
              await sleep(5000);
            }
          }
          currentTry += 1;
        }
      }

      setHadErrorOnFetching(true);
    }

    fetchTriviaQuestions();

    return () => abortControllerRef.current?.abort();
  }, [clearToken, startCountdown, token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    dispatch(
      setGameStats({
        assertions: currentGameStats.assertions,
        score: currentGameStats.currentScore,
      })
    );
  }, [currentGameStats, dispatch]);

  return (
    <HeaderContentLayout>
      {isLoading && <Loading />}

      {!isLoading && !hadErrorOnFetching && (
        <StyledGameWrapper>
          <div className="left">
            <img className="logo" src={logo} alt="trivia logo" />
            <QuestionCard
              category={currentQuestionState.question!.category}
              countdown={countdown}
              question={currentQuestionState.question!.question}
            />
          </div>

          <div className="right">
            <StyledAnswersWrapper data-testid="answer-options">
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
            </StyledAnswersWrapper>

            {(currentQuestionState.answerWasSelected || countdown === 0) && (
              <GreenButton
                type="button"
                data-testid="btn-next"
                onClick={changeToNextQuestion}
              >
                Next
              </GreenButton>
            )}
          </div>
        </StyledGameWrapper>
      )}

      {!isLoading && hadErrorOnFetching && <GameError />}
    </HeaderContentLayout>
  );
}
