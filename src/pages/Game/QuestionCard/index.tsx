import { useRef } from "react";
import { StyledQuestionCard, StyledScrollingText } from "./style";
import useOverflow from "@/hooks/useOverflow";
import { timer } from "@/assets/icons";

type QuestionCardProps = {
  countdown: number;
  category: string;
  question: string;
};

export default function QuestionCard({
  category,
  countdown,
  question,
}: QuestionCardProps) {
  const questionThemeRef = useRef(null);
  const { isOverflow } = useOverflow(questionThemeRef);
  const categoryClass = category.split(" ")[0].toLowerCase().replace(":", "");

  return (
    <StyledQuestionCard>
      <div
        className={`question-theme ${categoryClass}`}
        ref={questionThemeRef}
        data-testid="question-category"
      >
        <StyledScrollingText $isOverflow={isOverflow}>
          {category}
        </StyledScrollingText>
      </div>
      <div className="question-content-wrapper">
        <p className="question-text" data-testid="question-text">
          {question}
        </p>

        <div className="remaining-time">
          <img src={timer} alt="timer" />
          <p>
            Remaining time: <span>{countdown}</span>s
          </p>
        </div>
      </div>
    </StyledQuestionCard>
  );
}
