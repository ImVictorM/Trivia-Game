import { useEffect, useRef, useState } from "react";
import { StyledQuestionCard, StyledScrollingText } from "./style";
import useOverflow from "@/hooks/useOverflow";
import { timer } from "@/assets/icons";
import { sleep } from "@/utils";
import { useTranslation } from "react-i18next";

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
  const [stopAnimation, setStopAnimation] = useState(false);
  const questionThemeRef = useRef(null);
  const { isOverflow } = useOverflow(questionThemeRef);
  const categoryClass = category.split(" ")[0].toLowerCase().replace(":", "");
  const { t } = useTranslation(["game", "common"]);

  useEffect(() => {
    async function changeAnimationStateImmediately() {
      setStopAnimation(true);
      await sleep(1000);
      setStopAnimation(false);
    }

    changeAnimationStateImmediately();
  }, [category]);

  return (
    <StyledQuestionCard>
      <div
        className={`question-theme ${categoryClass}`}
        data-testid="question-category"
      >
        <div className="scrolling-text-wrapper">
          <StyledScrollingText
            ref={questionThemeRef}
            $stopAnimation={stopAnimation}
            $isOverflow={isOverflow}
          >
            {category}
          </StyledScrollingText>
        </div>
      </div>
      <div className="question-content-wrapper">
        <p className="question-text" data-testid="question-text">
          {question}
        </p>

        <div className="remaining-time">
          <img src={timer} alt={t("timer", { ns: "common" })} />
          <p>
            {`${t("remainingTime")}: `} <span>{countdown}</span>s
          </p>
        </div>
      </div>
    </StyledQuestionCard>
  );
}
