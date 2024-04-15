import { decodeHtmlEntity } from "@/utils";
import { constants } from "@/utils";
import axios, { AxiosResponse, GenericAbortSignal } from "axios";

const { ANY_CATEGORY_ID } = constants;

const GET_TOKEN_ENDPOINT = "https://opentdb.com/";

const triviaApi = axios.create({
  baseURL: GET_TOKEN_ENDPOINT,
});

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

export type TriviaCategory = {
  id: number;
  name: string;
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

type GetTriviaQuestionsParams = {
  token: string;
  amount?: number;
  categoryId: number;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  signal?: GenericAbortSignal;
};

type GetTriviaCategoriesResponse = {
  trivia_categories: TriviaCategory[];
};

type GetTriviaCategoriesParams = {
  signal?: GenericAbortSignal;
};

export async function getTriviaToken(): Promise<GetTriviaTokenResponse> {
  const tokenResponse: AxiosResponse<GetTriviaTokenResponse> =
    await triviaApi.get("api_token.php?command=request");

  return tokenResponse.data;
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

  const questionsResponse: AxiosResponse<GetTriviaQuestionsResponse> =
    await triviaApi.get(endpoint, {
      signal: args.signal,
    });

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

export async function getTriviaCategories(
  args?: GetTriviaCategoriesParams
): Promise<TriviaCategory[]> {
  const response: AxiosResponse<GetTriviaCategoriesResponse> =
    await triviaApi.get("api_category.php", {
      signal: args?.signal,
    });
  return response.data.trivia_categories;
}
