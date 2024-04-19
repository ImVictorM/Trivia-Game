import { dualBallLoadingIcon } from "@/assets/icons";
import { StyledLoading } from "./style";
import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation(["game", "common"]);

  return (
    <StyledLoading>
      <h1>{t("loading")}</h1>
      <img src={dualBallLoadingIcon} alt={t("loading", { ns: "common" })} />
    </StyledLoading>
  );
}
