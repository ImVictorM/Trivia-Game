import { dualBallLoadingIcon } from "@/assets/icons";
import { StyledLoading } from "./style";
import { useTranslation } from "react-i18next";

export const GAME_LOADING_COMPONENT_ID = "game-loading";
export const GAME_LOADING_COMPONENT_TITLE_ID = "game-loading-title";
export const GAME_LOADING_COMPONENT_IMAGE_ID = "game-loading-image";

export default function Loading() {
  const { t } = useTranslation(["game", "common"]);

  return (
    <StyledLoading data-testid={GAME_LOADING_COMPONENT_ID}>
      <h1 data-testid={GAME_LOADING_COMPONENT_TITLE_ID}>{t("loading")}</h1>
      <img
        data-testid={GAME_LOADING_COMPONENT_IMAGE_ID}
        src={dualBallLoadingIcon}
        alt={t("loading", { ns: "common" })}
      />
    </StyledLoading>
  );
}
