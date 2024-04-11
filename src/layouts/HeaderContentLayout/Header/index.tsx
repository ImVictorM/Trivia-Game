import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StyledHeader, StyledHeaderContent } from "./style";
import { star } from "@/assets/icons";

export default function Header() {
  const player = useSelector((state: RootState) => state.player);

  return (
    <StyledHeader>
      <StyledHeaderContent>
        <div className="player-wrapper">
          <img
            data-testid="header-profile-picture"
            src={player.gravatarImgSrc}
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
      </StyledHeaderContent>
    </StyledHeader>
  );
}
