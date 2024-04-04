import { useSelector } from "react-redux";
import { MD5 } from "crypto-js";
import { RootState } from "@/redux/store";
import { StyledHeader } from "./style";
import { star } from "@/assets/icons";

export default function Header() {
  const player = useSelector((state: RootState) => state.player);
  const emailHash = MD5(player.gravatarEmail).toString();

  return (
    <StyledHeader>
      <div className="player-wrapper">
        <img
          data-testid="header-profile-picture"
          src={`https://www.gravatar.com/avatar/${emailHash}`}
          alt={player.name}
        />
        <span data-testid="header-player-name">{player.name}</span>
      </div>
      <div className="points-wrapper">
        <img src={star} alt="star" />
        <p>
          Points: <span data-testid="header-score">{player.score}</span>
        </p>
      </div>
    </StyledHeader>
  );
}
