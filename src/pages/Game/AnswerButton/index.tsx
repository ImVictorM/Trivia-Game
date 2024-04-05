import { correctAnswerIcon, incorrectAnswerIcon } from "@/assets/icons";
import { StyledAnswerButton } from "./style";

type AnswerButtonProps = {
  correctAnswer: string;
  answer: string;
  answerWasSelected: boolean;
  index: number;
  disabled: boolean;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    answer: string
  ) => void;
};

export default function AnswerButton({
  correctAnswer,
  answer,
  answerWasSelected,
  index,
  onClick,
  disabled,
}: AnswerButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(e, answer);
  };

  return (
    <StyledAnswerButton
      type="button"
      data-testid={
        answer === correctAnswer ? "correct-answer" : `wrong-answer-${index}`
      }
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
              answer === correctAnswer ? "correct answer" : "incorrect answer"
            }
          />
        ) : (
          <span className="alternative-letter">
            {String.fromCharCode(index + 1 + 64)}
          </span>
        )}
      </div>
      <span className="answer">{answer}</span>
    </StyledAnswerButton>
  );
}
