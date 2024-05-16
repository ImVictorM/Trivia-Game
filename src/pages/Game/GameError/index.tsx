import { LinkButton } from "@/components";
import { StyledGameError } from "./style";
import { useTranslation } from "react-i18next";

type GameErrorProps = {
  message: string;
};

export const GAME_ERROR_COMPONENT_ID = "game-error-element";
export const GAME_ERROR_COMPONENT_TRY_AGAIN_ID = "game-error-try-again-button";

export default function GameError({ message }: GameErrorProps) {
  const { t } = useTranslation();

  return (
    <StyledGameError data-testid={GAME_ERROR_COMPONENT_ID}>
      <h1>{message}</h1>
      <LinkButton
        color="green"
        to="/"
        data-testid={GAME_ERROR_COMPONENT_TRY_AGAIN_ID}
      >
        {t("tryAgain")}
      </LinkButton>
    </StyledGameError>
  );
}
