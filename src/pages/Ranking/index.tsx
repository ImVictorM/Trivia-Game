import { star } from "@/assets/icons";
import { logo } from "@/assets/images";
import { LinkButton } from "@/components";
import { usePlayerRanking } from "@/hooks";
import {
  StyledPlayer,
  StyledPlayerList,
  StyledRanking,
  StyledRankingContent,
} from "./style";

export default function Ranking() {
  const { playersRanking } = usePlayerRanking();

  return (
    <StyledRanking>
      <StyledRankingContent>
        <img className="logo" src={logo} alt="trivia logo" />
        <h1 className="main-title" data-testid="ranking-title">
          Ranking
        </h1>
        <h2 className="secondary-title">Top 3 highest score</h2>
        <StyledPlayerList>
          {playersRanking.map(({ gravatarImgSrc, name, score }, index) => (
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
        </StyledPlayerList>
        <LinkButton color="green" to="/" data-testid="btn-go-home">
          Play again
        </LinkButton>
      </StyledRankingContent>
    </StyledRanking>
  );
}
