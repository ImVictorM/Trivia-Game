import {
  GetTriviaQuestionsResponse,
  GetTriviaTokenResponse,
  ResetTriviaTokenResponse,
  TriviaResponseCode,
} from "@/services/triviaApi";

export const GET_TOKEN_SUCCESS: GetTriviaTokenResponse = {
  response_code: TriviaResponseCode.SUCCESS,
  response_message: "success",
  token: "token",
};

export const RESET_TOKEN_SUCCESS: ResetTriviaTokenResponse = {
  response_code: TriviaResponseCode.SUCCESS,
  token: "token",
};

export const GET_QUESTION_UNMAPPED: GetTriviaQuestionsResponse = {
  response_code: TriviaResponseCode.UNMAPPED_ERROR,
  results: [],
};

export const GET_QUESTIONS_SUCCESS: GetTriviaQuestionsResponse = {
  response_code: TriviaResponseCode.SUCCESS,
  results: [
    {
      category: "Geography",
      correct_answer: "Phoenix",
      difficulty: "easy",
      incorrect_answers: ["Montgomery", "Tallahassee", "Raleigh"],
      question: "What is the capital of the American state of Arizona?",
      type: "multiple",
    },
    {
      category: "Entertainment: Video Games",
      correct_answer: "Flash",
      difficulty: "easy",
      incorrect_answers: ["Strength", "Cut", "Fly"],
      question: "In Pokemon Red & Blue, what is the name of HM05?",
      type: "multiple",
    },
    {
      category: "Mythology",
      correct_answer: "A Horse",
      difficulty: "medium",
      incorrect_answers: ["A Dragon", "A Tiger", "A Lion"],
      question:
        "The Hippogriff, not to be confused with the Griffon, is a magical creature with the front half of an eagle, and the back half of what?",
      type: "multiple",
    },
    {
      category: "Entertainment: Film",
      correct_answer: "Dan Marino",
      difficulty: "medium",
      incorrect_answers: ["John Elway", "Tom Brady", "Joe Montana"],
      question:
        "Which retired American football quarterback played himself in 'Ace Ventura: Pet Detective' and 'Little Nicky'?",
      type: "multiple",
    },
    {
      category: "Geography",
      correct_answer: "Electric Town",
      difficulty: "medium",
      incorrect_answers: ["Moon Walk River", "Otaku Central ", "Big Eyes"],
      question:
        "The Japanese district Akihabara is also known by what nickname?",
      type: "multiple",
    },
  ],
};
