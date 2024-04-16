import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  StyledHamburgerButton,
  StyledHeader,
  StyledHeaderContent,
  StyledMenu,
  StyledPlayerStats,
} from "./style";
import { star } from "@/assets/icons";
import { useScreenDimensions } from "@/hooks";
import { sizes } from "@/styles/breakpoints";
import { LinkButton } from "@/components";
import { useState } from "react";
import { exitDoorIcon, surrenderFlagIcon } from "@/assets/icons";

export default function Header() {
  const player = useSelector((state: RootState) => state.player);
  const { width } = useScreenDimensions();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

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

        {width <= sizes.desktopXS && (
          <div>
            <StyledHamburgerButton onClick={toggleMenu} $menuOpen={menuOpen}>
              <div className="line" />
            </StyledHamburgerButton>

            <StyledMenu $menuOpen={menuOpen}>
              <h2 className="main-title">Game options</h2>
              <div className="buttons-wrapper">
                <LinkButton
                  color="yellow"
                  to="/feedback"
                  icon={{ src: exitDoorIcon, alt: "exit door" }}
                >
                  End match
                </LinkButton>
                <LinkButton
                  color="red"
                  to="/"
                  icon={{ src: surrenderFlagIcon, alt: "surrender flag" }}
                >
                  Give up match
                </LinkButton>
              </div>
            </StyledMenu>
          </div>
        )}
      </StyledHeaderContent>
    </StyledHeader>
  );
}
