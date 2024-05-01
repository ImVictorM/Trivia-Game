import { decodeHtmlEntity } from "@/utils";
import { constants } from "@/utils";
import axios, { AxiosResponse, GenericAbortSignal } from "axios";

const { ANY_CATEGORY_ID } = constants;

const GET_TOKEN_ENDPOINT = "https://opentdb.com/";

const triviaApi = axios.create({
  baseURL: GET_TOKEN_ENDPOINT,
});

export enum TriviaResponseCode {
  SUCCESS = 0,
  NO_RESULT = 1,
  INVALID_PARAMETER = 2,
  TOKEN_NOT_FOUND = 3,
  TOKEN_EMPTY = 4,
  RATE_LIMIT = 5,
  UNMAPPED_ERROR = 6,
}

export type QuestionDifficulty = "any" | "medium" | "hard" | "easy";

export type QuestionType = "any" | "multiple" | "boolean";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: QuestionDifficulty;
  incorrect_answers: string[];
  question: string;
  type: QuestionType;
};

export type GetTriviaQuestionsResponse = {
  response_code: number;
  results: Question[];
};

export type GetTriviaTokenResponse = {
  response_code: number;
  response_message: string;
  token: string;
};

type GetTriviaQuestionsParams = {
  token: string;
  amount?: number;
  categoryId: number;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  signal?: GenericAbortSignal;
};

export type ResetTriviaTokenResponse = {
  response_code: number;
  token: string;
};

export async function getTriviaToken(): Promise<GetTriviaTokenResponse> {
  const tokenResponse: AxiosResponse<GetTriviaTokenResponse> =
    await triviaApi.get("api_token.php?command=request");

  return tokenResponse.data;
}

export async function resetTriviaToken(
  token: string
): Promise<ResetTriviaTokenResponse> {
  const resetResponse: AxiosResponse<ResetTriviaTokenResponse> =
    await triviaApi.get(`api_token.php?command=reset&token=${token}`);
  return resetResponse.data;
}

export async function getTriviaQuestions(
  args: GetTriviaQuestionsParams
): Promise<GetTriviaQuestionsResponse> {
  const defaultAmount = 5;

  const endpoint =
    `api.php?` +
    `amount=${args.amount || defaultAmount}` +
    `&token=${args.token}` +
    `${
      args.categoryId !== ANY_CATEGORY_ID ? `&category=${args.categoryId}` : ""
    }` +
    `${args.difficulty !== "any" ? `&difficulty=${args.difficulty}` : ""}` +
    `${args.type !== "any" ? `&type=${args.type}` : ""}`;

  try {
    const questionsResponse: AxiosResponse<GetTriviaQuestionsResponse> =
      await triviaApi.get(endpoint, {
        signal: args.signal,
      });

    const decodedResults: Question[] = questionsResponse.data.results.map(
      (question) => {
        return {
          category: decodeHtmlEntity(question.category),
          correct_answer: decodeHtmlEntity(question.correct_answer),
          difficulty: decodeHtmlEntity(
            question.difficulty
          ) as QuestionDifficulty,
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
  } catch (e) {
    const error = e as Error;
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data as GetTriviaQuestionsResponse;
      } else {
        return {
          response_code: 6,
          results: [],
        };
      }
    } else {
      return {
        response_code: 6,
        results: [],
      };
    }
  }
}
