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

export const FEEDBACK_PAGE_PLAYER_SCORE_ID = "feedback-page-player-score";
export const FEEDBACK_PAGE_PLAYER_ASSERTIONS_ID =
  "feedback-page-player-assertions";
export const FEEDBACK_PAGE_TEXT_ID = "feedback-page-text";
export const FEEDBACK_PAGE_PLAYER_IMAGE_ID = "feedback-page-player-img";
export const FEEDBACK_PAGE_PLAY_AGAIN_ID = "feedback-page-play-again";
export const FEEDBACK_PAGE_RANKING_ID = "feedback-page-ranking";

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
            data-testid={FEEDBACK_PAGE_PLAYER_IMAGE_ID}
          />

          <h1 className="feedback-title" data-testid={FEEDBACK_PAGE_TEXT_ID}>
            {isGoodScore ? t("goodScoreTitle") : t("badScoreTitle")}
          </h1>

          <p data-testid={FEEDBACK_PAGE_PLAYER_ASSERTIONS_ID}>
            <Trans
              i18nKey="feedbackText"
              t={t}
              count={player.assertions}
              components={{
                span: <span />,
              }}
            />
          </p>

          <p data-testid={FEEDBACK_PAGE_PLAYER_SCORE_ID}>
            <Trans
              i18nKey="totalPoints"
              t={t}
              values={{ playerScore: player.score }}
              components={{
                span: <span />,
              }}
            />
          </p>
        </StyledFeedbackCard>

        <StyledButtonsWrapper>
          <LinkButton
            className="button"
            color="green"
            to="/"
            data-testid={FEEDBACK_PAGE_PLAY_AGAIN_ID}
          >
            {t("playAgain", { ns: "common" })}
          </LinkButton>

          <LinkButton
            className="button"
            color="cyan"
            to="/ranking"
            data-testid={FEEDBACK_PAGE_RANKING_ID}
          >
            {t("Ranking", { ns: "common" })}
          </LinkButton>
        </StyledButtonsWrapper>
      </StyledFeedbackContent>
    </StyledFeedback>
  );
}
