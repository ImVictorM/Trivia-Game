import { dualBallLoadingIcon } from "@/assets/icons";
import { StyledLoading } from "./style";
import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation(["gameSettings"]);
  return (
    <StyledLoading>
      <div>
        <h1>{t("loading")}</h1>
        <img src={dualBallLoadingIcon} alt="loading" />
      </div>
    </StyledLoading>
  );
}
