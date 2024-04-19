import { LinkButton } from "@/components";
import { StyledGameError } from "./style";
import { useTranslation } from "react-i18next";

type GameErrorProps = {
  message: string;
};

export default function GameError({ message }: GameErrorProps) {
  const { t } = useTranslation();

  return (
    <StyledGameError>
      <h1>{message}</h1>
      <LinkButton color="green" to="/">
        {t("tryAgain")}
      </LinkButton>
    </StyledGameError>
  );
}
