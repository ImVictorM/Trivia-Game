import { decodeHtmlEntity } from "@/utils";
import axios, { AxiosResponse, GenericAbortSignal } from "axios";

const GET_TOKEN_ENDPOINT = "https://opentdb.com/";

const triviaApi = axios.create({
  baseURL: GET_TOKEN_ENDPOINT,
});

export type QuestionDifficulty = "medium" | "hard" | "easy";

export type QuestionType = "multiple" | "boolean";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: QuestionDifficulty;
  incorrect_answers: string[];
  question: string;
  type: QuestionType;
};

type GetTriviaQuestionsResponse = {
  response_code: number;
  results: Question[];
};

type GetTriviaTokenResponse = {
  response_code: number;
  response_message: string;
  token: string;
};

export async function getTriviaToken(): Promise<GetTriviaTokenResponse> {
  const tokenResponse: AxiosResponse<GetTriviaTokenResponse> =
    await triviaApi.get("api_token.php?command=request");

  return tokenResponse.data;
}

type GetTriviaQuestionsParams = {
  token: string;
  amount?: number;
  signal?: GenericAbortSignal;
};

export async function getTriviaQuestions(
  args: GetTriviaQuestionsParams
): Promise<GetTriviaQuestionsResponse> {
  const questionsResponse: AxiosResponse<GetTriviaQuestionsResponse> =
    await triviaApi.get(
      `api.php?amount=${args.amount || 5}&token=${args.token}`,
      {
        signal: args.signal,
      }
    );

  const decodedResults: Question[] = questionsResponse.data.results.map(
    (question) => {
      return {
        category: decodeHtmlEntity(question.category),
        correct_answer: decodeHtmlEntity(question.correct_answer),
        difficulty: decodeHtmlEntity(question.difficulty) as QuestionDifficulty,
        incorrect_answers: question.incorrect_answers.map((incorrectAnswer) =>
          decodeHtmlEntity(incorrectAnswer)
        ),
        question: decodeHtmlEntity(question.question),
        type: decodeHtmlEntity(question.type) as QuestionType,
      };
    }
  );

  return {
    ...questionsResponse.data,
    results: decodedResults,
  };
}
