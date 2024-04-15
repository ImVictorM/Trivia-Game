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

export default function Ranking() {
  const { playersRanking } = usePlayerRanking();

  const rankingIsEmpty = useMemo(() => {
    return playersRanking.length === 0;
  }, [playersRanking]);

  return (
    <StyledRanking>
      <StyledRankingContent>
        <img className="logo" src={logo} alt="trivia logo" />
        <h1 className="main-title" data-testid="ranking-title">
          Local Ranking
        </h1>
        <h2 className="secondary-title">Top 3 highest score</h2>
        <StyledPlayerList>
          {!rankingIsEmpty &&
            playersRanking.map(({ gravatarImgSrc, name, score }, index) => (
              <StyledPlayer key={`${index}_${name}_${score}`}>
                <div className="player-wrapper">
                  <img className="player-img" src={gravatarImgSrc} />
                  <p title={name} className="player-name">
                    {name}
                  </p>
                </div>
                <div className="points-wrapper">
                  <img className="star-icon" src={star} alt="star" />
                  <p title={`${score} points`} className="points">
                    <span>{score}</span> points
                  </p>
                </div>
              </StyledPlayer>
            ))}
          {rankingIsEmpty && (
            <StyledEmptyRanking>
              <p>
                There are no player in the ranking yet {`:(`}
                <br />
                Try playing a match to see your name here!
              </p>
            </StyledEmptyRanking>
          )}
        </StyledPlayerList>
        <LinkButton color="green" to="/" data-testid="btn-go-home">
          Play again
        </LinkButton>
      </StyledRankingContent>
    </StyledRanking>
  );
}
