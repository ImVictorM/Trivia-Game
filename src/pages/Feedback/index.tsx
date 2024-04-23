import { logo } from "@/assets/images";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  StyledButtonsWrapper,
  StyledFeedback,
  StyledFeedbackCard,
  StyledFeedbackContent,
} from "./style";
import { LinkButton } from "@/components";
import { useEffect } from "react";
import usePlayerRanking from "@/hooks/usePlayerRanking";
import { Trans, useTranslation } from "react-i18next";

export default function Feedback() {
  const player = useSelector((state: RootState) => state.player);
  const { updateRanking } = usePlayerRanking();
  const { t } = useTranslation(["feedback", "common"]);
  const isGoodScore = player.assertions > 2;

  useEffect(() => {
    updateRanking({
      name: player.name,
      gravatarImgSrc: player.gravatarImgSrc,
      score: player.score,
    });
  }, [player, updateRanking]);

  return (
    <StyledFeedback>
      <StyledFeedbackContent>
        <img className="logo" src={logo} alt="trivia logo" />

        <StyledFeedbackCard $isSuccess={isGoodScore}>
          <img
            className="player-image"
            src={player.gravatarImgSrc}
            alt={player.name}
          />

          <h1 className="feedback-title" data-testid="feedback-text">
            {isGoodScore ? t("goodScoreTitle") : t("badScoreTitle")}
          </h1>

          <p>
            <Trans
              i18nKey="feedbackText"
              t={t}
              count={player.assertions}
              components={{
                span: <span data-testid="feedback-total-question" />,
              }}
            />
          </p>

          <p>
            <Trans
              i18nKey="totalPoints"
              t={t}
              values={{ playerScore: player.score }}
              components={{ span: <span data-testid="feedback-total-score" /> }}
            />
          </p>
        </StyledFeedbackCard>

        <StyledButtonsWrapper>
          <LinkButton
            className="button"
            color="green"
            to="/"
            data-testid="btn-play-again"
          >
            {t("playAgain", { ns: "common" })}
          </LinkButton>
          <LinkButton
            className="button"
            color="cyan"
            to="/ranking"
            data-testid="btn-ranking"
          >
            {t("Ranking", { ns: "common" })}
          </LinkButton>
        </StyledButtonsWrapper>
      </StyledFeedbackContent>
    </StyledFeedback>
  );
}
