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
import { Button } from "@/components";
import { useState } from "react";
import { exitDoorIcon, surrenderFlagIcon } from "@/assets/icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const player = useSelector((state: RootState) => state.player);
  const { width } = useScreenDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <>
            <StyledHamburgerButton onClick={toggleMenu} $menuOpen={menuOpen}>
              <div className="line" />
            </StyledHamburgerButton>

            <StyledMenu $menuOpen={menuOpen}>
              <h2 className="main-title">Game options</h2>
              <div className="buttons-wrapper">
                <Button
                  color="yellow"
                  icon={{ src: exitDoorIcon, alt: "exit door" }}
                  dialog={{
                    bodyMessage:
                      "Are you sure you want to end the match? ending the match will save your points and redirect you to the feedback screen.",
                    title: "End match",
                    onConfirm: () => {
                      navigate("/feedback");
                    },
                  }}
                >
                  End match
                </Button>
                <Button
                  color="red"
                  icon={{ src: surrenderFlagIcon, alt: "surrender flag" }}
                  dialog={{
                    bodyMessage:
                      "Are you sure you want to surrender? surrendering will make you lose all your points.",
                    title: "Surrender",
                    onConfirm: () => {
                      navigate("/");
                    },
                  }}
                >
                  Surrender
                </Button>
              </div>
            </StyledMenu>
          </>
        )}
      </StyledHeaderContent>
    </StyledHeader>
  );
}
