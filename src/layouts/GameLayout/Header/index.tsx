import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StyledHeader, StyledHeaderContent, StyledPlayerStats } from "./style";
import { star } from "@/assets/icons";
import { useScreenDimensions } from "@/hooks";
import { sizes } from "@/styles/breakpoints";

import Menu from "../Menu";

export default function Header() {
  const player = useSelector((state: RootState) => state.player);
  const { width } = useScreenDimensions();

  return (
    <StyledHeader>
      <StyledHeaderContent>
        <StyledPlayerStats>
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
        </StyledPlayerStats>

        {width <= sizes.desktopXS && <Menu />}
      </StyledHeaderContent>
    </StyledHeader>
  );
}
