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

export default function Feedback() {
  const player = useSelector((state: RootState) => state.player);
  const isGoodScore = player.assertions > 2;

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
            {isGoodScore ? "Well Done!" : "Could be better..."}
          </h1>

          <p>
            You answered{" "}
            <span data-testid="feedback-total-question">
              {player.assertions}
            </span>{" "}
            questions correctly!
          </p>

          <p>
            Total points earned:{" "}
            <span data-testid="feedback-total-score">{player.score}</span>
          </p>
        </StyledFeedbackCard>

        <StyledButtonsWrapper>
          <LinkButton color="green" to="/" data-testid="btn-play-again">
            Play Again
          </LinkButton>
          <LinkButton color="cyan" to="/ranking" data-testid="btn-ranking">
            Ranking
          </LinkButton>
        </StyledButtonsWrapper>
      </StyledFeedbackContent>
    </StyledFeedback>
  );
}
