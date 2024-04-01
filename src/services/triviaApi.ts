import axios, { AxiosResponse } from "axios";

const GET_TOKEN_ENDPOINT = "https://opentdb.com/";

const triviaApi = axios.create({
  baseURL: GET_TOKEN_ENDPOINT,
});

interface GetTriviaTokenResponse {
  response_code: number;
  response_message: string;
  token: string;
}

export async function getTriviaToken(): Promise<GetTriviaTokenResponse> {
  const tokenResponse: AxiosResponse<GetTriviaTokenResponse> =
    await triviaApi.get("api_token.php?command=request");

  return tokenResponse.data;
}
