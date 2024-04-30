import { correctAnswerIcon, incorrectAnswerIcon } from "@/assets/icons";
import { StyledAnswerButton } from "./style";
import { useTranslation } from "react-i18next";

type AnswerButtonProps = {
  correctAnswer: string;
  answer: string;
  answerWasSelected: boolean;
  index: number;
  disabled?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    answer: string
  ) => void;
};

export const ANSWER_BUTTON_COMPONENT_ID = "answer-button";
export const ANSWER_BUTTON_COMPONENT_LETTER_ID = "answer-button-letter";
export const ANSWER_BUTTON_COMPONENT_ANSWER_ID = "answer-button-answer";
export const ANSWER_BUTTON_COMPONENT_CORRECT_ICON_ID =
  "answers-button-wrong-icon";
export const ANSWER_BUTTON_COMPONENT_WRONG_ICON_ID =
  "answers-button-wrong-icon";

export default function AnswerButton({
  correctAnswer,
  answer,
  answerWasSelected,
  index,
  onClick,
  disabled = false,
}: AnswerButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e, answer);
    }
  };
  const { t } = useTranslation(["game"]);

  return (
    <StyledAnswerButton
      type="button"
      data-testid={ANSWER_BUTTON_COMPONENT_ID}
      $answerWasSelected={answerWasSelected}
      $isCorrectAnswer={answer === correctAnswer}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className="alternative">
        {answerWasSelected ? (
          <img
            className="feedback-icon"
            src={
              answer === correctAnswer ? correctAnswerIcon : incorrectAnswerIcon
            }
            alt={
              answer === correctAnswer ? t("correctAnswer") : t("wrongAnswer")
            }
            data-testid={
              answer === correctAnswer
                ? ANSWER_BUTTON_COMPONENT_CORRECT_ICON_ID
                : ANSWER_BUTTON_COMPONENT_WRONG_ICON_ID
            }
          />
        ) : (
          <span
            className="alternative-letter"
            data-testid={ANSWER_BUTTON_COMPONENT_LETTER_ID}
          >
            {String.fromCharCode(index + 1 + 64)}
          </span>
        )}
      </div>
      <span className="answer" data-testid={ANSWER_BUTTON_COMPONENT_ANSWER_ID}>
        {answer}
      </span>
    </StyledAnswerButton>
  );
}
