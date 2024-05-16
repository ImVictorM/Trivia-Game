import { renderWithProviders } from "@/tests/utils";
import QuestionCard, {
  GAME_QUESTION_CARD_COMPONENT_ID,
  GAME_QUESTION_CARD_COMPONENT_CATEGORY_ID,
  GAME_QUESTION_CARD_COMPONENT_COUNTDOWN_ID,
  GAME_QUESTION_CARD_COMPONENT_TEXT_ID,
} from ".";
import { GET_QUESTIONS_SUCCESS } from "@/tests/mocks/triviaApi";
import { screen } from "@testing-library/react";

describe("Game page: QuestionCard component", () => {
  const question = GET_QUESTIONS_SUCCESS.results[1];

  it("Renders correctly", () => {
    renderWithProviders(
      <QuestionCard
        category={question.category}
        countdown={30}
        question={question.question}
      />
    );

    screen.getByTestId(GAME_QUESTION_CARD_COMPONENT_ID);
    screen.getByTestId(GAME_QUESTION_CARD_COMPONENT_CATEGORY_ID);
    screen.getByTestId(GAME_QUESTION_CARD_COMPONENT_COUNTDOWN_ID);
    screen.getByTestId(GAME_QUESTION_CARD_COMPONENT_TEXT_ID);
  });
});
