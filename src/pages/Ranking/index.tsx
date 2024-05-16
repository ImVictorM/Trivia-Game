import { star } from "@/assets/icons";
import { logo } from "@/assets/images";
import { LinkButton } from "@/components";
import { usePlayerRanking } from "@/hooks";
import {
  StyledEmptyRanking,
  StyledPlayer,
  StyledPlayerList,
  StyledRanking,
  StyledRankingContent,
} from "./style";
import { useMemo } from "react";
import { Trans, useTranslation } from "react-i18next";

export const RANKING_PAGE_ID = "ranking-page";
export const RANKING_PAGE_TITLE_ID = "ranking-page-title";
export const RANKING_PAGE_PLAYER_ID = "ranking-page-player";
export const RANKING_PAGE_EMPTY_ID = "ranking-page-empty";
export const RANKING_PAGE_GO_BACK_ID = "ranking-page-go-back";

export default function Ranking() {
  const { playersRanking } = usePlayerRanking();
  const { t } = useTranslation(["ranking", "common"]);

  const rankingIsEmpty = useMemo(() => {
    return playersRanking.length === 0;
  }, [playersRanking]);

  return (
    <StyledRanking data-testid={RANKING_PAGE_ID}>
      <StyledRankingContent>
        <img className="logo" src={logo} alt="trivia logo" />
        <h1 className="main-title title" data-testid={RANKING_PAGE_TITLE_ID}>
          {t("mainTitle")}
        </h1>
        <h2 className="secondary-title title">{t("secondaryTitle")}</h2>
        <StyledPlayerList>
          {!rankingIsEmpty &&
            playersRanking.map(({ gravatarImgSrc, name, score }, index) => (
              <StyledPlayer
                key={`${index}_${name}_${score}`}
                data-testid={RANKING_PAGE_PLAYER_ID}
              >
                <div className="player-wrapper">
                  <img className="player-img" src={gravatarImgSrc} alt={name} />
                  <p
                    title={name}
                    className="player-name"
                    data-testid={`${index}_name`}
                  >
                    {name}
                  </p>
                </div>
                <div className="points-wrapper">
                  <img className="star-icon" src={star} alt="star" />
                  <p title={`${score} points`} className="points">
                    <span>{score}</span> {t("points", { ns: "common" })}
                  </p>
                </div>
              </StyledPlayer>
            ))}
          {rankingIsEmpty && (
            <StyledEmptyRanking>
              <p data-testid={RANKING_PAGE_EMPTY_ID}>
                <Trans t={t} i18nKey="emptyRanking" />
              </p>
            </StyledEmptyRanking>
          )}
        </StyledPlayerList>

        <LinkButton color="green" to="/" data-testid={RANKING_PAGE_GO_BACK_ID}>
          {t("goToStart")}
        </LinkButton>
      </StyledRankingContent>
    </StyledRanking>
  );
}
