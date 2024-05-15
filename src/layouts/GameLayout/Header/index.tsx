import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { StyledHeader, StyledHeaderContent, StyledPlayerStats } from "./style";
import { star } from "@/assets/icons";
import { useScreenDimensions } from "@/hooks";
import { sizes } from "@/styles/breakpoints";

import Menu from "../Menu";
import { useTranslation } from "react-i18next";

export const HEADER_COMPONENT_ID = "header-element";
export const HEADER_COMPONENT_PLAYER_IMAGE_ID = "header-element-player-image";
export const HEADER_COMPONENT_PLAYER_NAME_ID = "header-element-player-name";
export const HEADER_COMPONENT_PLAYER_SCORE_ID = "header-element-player-score";

export default function Header() {
  const player = useSelector((state: RootState) => state.player);
  const { width } = useScreenDimensions();
  const { t } = useTranslation();

  return (
    <StyledHeader data-testid={HEADER_COMPONENT_ID}>
      <StyledHeaderContent>
        <StyledPlayerStats>
          <div className="player-wrapper">
            <img
              data-testid={HEADER_COMPONENT_PLAYER_IMAGE_ID}
              src={player.gravatarImgSrc}
              alt={player.name}
            />
            <span data-testid={HEADER_COMPONENT_PLAYER_NAME_ID}>
              {player.name}
            </span>
          </div>
          <div className="points-wrapper">
            <img src={star} alt={t("star")} />
            <p>
              {`${t("points")}: `}
              <span data-testid={HEADER_COMPONENT_PLAYER_SCORE_ID}>
                {player.score}
              </span>
            </p>
          </div>
        </StyledPlayerStats>

        {width <= sizes.desktopXS && <Menu />}
      </StyledHeaderContent>
    </StyledHeader>
  );
}
