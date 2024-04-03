import axios, { AxiosResponse } from "axios";

const GET_TOKEN_ENDPOINT = "https://opentdb.com/";

const triviaApi = axios.create({
  baseURL: GET_TOKEN_ENDPOINT,
});

type QuestionDifficulty = "medium" | "hard" | "easy";

type QuestionType = "multiple" | "boolean";

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

export async function getTriviaQuestions(
  token: string,
  amount: number = 5
): Promise<GetTriviaQuestionsResponse> {
  const questionsResponse: AxiosResponse<GetTriviaQuestionsResponse> =
    await triviaApi.get(`api.php?amount=${amount}&token=${token}`);

  return questionsResponse.data;
}
