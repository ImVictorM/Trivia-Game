import { renderWithProviders } from "@/tests/utils";
import AnswerButton, {
  ANSWER_BUTTON_COMPONENT_ANSWER_ID,
  ANSWER_BUTTON_COMPONENT_CORRECT_ICON_ID,
  ANSWER_BUTTON_COMPONENT_ID,
  ANSWER_BUTTON_COMPONENT_LETTER_ID,
  ANSWER_BUTTON_COMPONENT_WRONG_ICON_ID,
} from ".";
import { GET_QUESTIONS_SUCCESS } from "@/tests/mocks/triviaApi";
import { act, screen } from "@testing-library/react";

describe("Game page: AnswerButton component", () => {
  const question = GET_QUESTIONS_SUCCESS.results[0];

  it("Renders correctly when answers was not selected", () => {
    const answers = [question.correct_answer, ...question.incorrect_answers];

    const letterPerIndex: Record<number, string> = {
      0: "A",
      1: "B",
      2: "C",
      3: "D",
    };

    renderWithProviders(
      <>
        {answers.map((answer, index) => (
          <AnswerButton
            correctAnswer={question.correct_answer}
            answerWasSelected={false}
            answer={answer}
            index={index}
            key={index}
          />
        ))}
      </>
    );

    const buttons = screen.getAllByTestId(ANSWER_BUTTON_COMPONENT_ID);
    const letters = screen.getAllByTestId(ANSWER_BUTTON_COMPONENT_LETTER_ID);
    const answersFromUi = screen.getAllByTestId(
      ANSWER_BUTTON_COMPONENT_ANSWER_ID
    );
    const correctIcon = screen.queryByTestId(
      ANSWER_BUTTON_COMPONENT_CORRECT_ICON_ID
    );
    const wrongIcon = screen.queryByTestId(
      ANSWER_BUTTON_COMPONENT_WRONG_ICON_ID
    );

    expect(buttons).toHaveLength(4);

    letters.forEach((letter, index: number) => {
      expect(letter.textContent).toEqual(letterPerIndex[index]);
    });

    answersFromUi.forEach((answer, index) => {
      expect(answer.textContent).toEqual(answers[index]);
    });

    expect(correctIcon).not.toBeInTheDocument();
    expect(wrongIcon).not.toBeInTheDocument();
  });

  it("Renders correctly when answer was select and is correct", () => {
    renderWithProviders(
      <AnswerButton
        correctAnswer={question.correct_answer}
        answerWasSelected={true}
        answer={question.correct_answer}
        index={1}
      />
    );

    const button = screen.getByTestId(ANSWER_BUTTON_COMPONENT_ID);
    const correctIcon = screen.getByTestId(
      ANSWER_BUTTON_COMPONENT_CORRECT_ICON_ID
    );

    expect(button).toContainElement(correctIcon);
  });

  it("Renders correctly when answer was select and is wrong", () => {
    renderWithProviders(
      <AnswerButton
        correctAnswer={question.correct_answer}
        answerWasSelected={true}
        answer={question.incorrect_answers[0]}
        index={1}
      />
    );

    const button = screen.getByTestId(ANSWER_BUTTON_COMPONENT_ID);
    const correctIcon = screen.getByTestId(
      ANSWER_BUTTON_COMPONENT_WRONG_ICON_ID
    );

    expect(button).toContainElement(correctIcon);
  });

  it("Fires the onClick functions correctly", async () => {
    const onClickMock = vi.fn();
    const { user } = renderWithProviders(
      <AnswerButton
        correctAnswer={question.correct_answer}
        answerWasSelected={true}
        answer={question.correct_answer}
        index={1}
        onClick={onClickMock}
      />
    );

    const button = screen.getByTestId(ANSWER_BUTTON_COMPONENT_ID);

    await act(async () => {
      await user.click(button);
    });

    expect(onClickMock).toHaveBeenCalledOnce();
    expect(onClickMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: "click" }),
      true
    );
  });
});
