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

export const GAME_QUESTION_CARD_COMPONENT_ID = "game-question-card";
export const GAME_QUESTION_CARD_COMPONENT_CATEGORY_ID =
  "game-question-card-category";
export const GAME_QUESTION_CARD_COMPONENT_TEXT_ID = "game-question-card-text";
export const GAME_QUESTION_CARD_COMPONENT_COUNTDOWN_ID =
  "game-question-card-countdown";

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
    <StyledQuestionCard data-testid={GAME_QUESTION_CARD_COMPONENT_ID}>
      <div className={`question-theme ${categoryClass}`}>
        <div className="scrolling-text-wrapper">
          <StyledScrollingText
            ref={questionThemeRef}
            $stopAnimation={stopAnimation}
            $isOverflow={isOverflow}
            data-testid={GAME_QUESTION_CARD_COMPONENT_CATEGORY_ID}
          >
            {category}
          </StyledScrollingText>
        </div>
      </div>
      <div className="question-content-wrapper">
        <p
          className="question-text"
          data-testid={GAME_QUESTION_CARD_COMPONENT_TEXT_ID}
        >
          {question}
        </p>

        <div className="remaining-time">
          <img src={timer} alt={t("timer", { ns: "common" })} />
          <p>
            {`${t("remainingTime")}: `}{" "}
            <span data-testid={GAME_QUESTION_CARD_COMPONENT_COUNTDOWN_ID}>
              {countdown}
            </span>
            s
          </p>
        </div>
      </div>
    </StyledQuestionCard>
  );
}
