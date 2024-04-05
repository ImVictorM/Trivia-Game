import { dualBallLoadingIcon } from "@/assets/icons";
import { StyledLoading } from "./style";

export default function Loading() {
  return (
    <StyledLoading>
      <h1>Preparing New Questions...</h1>
      <img src={dualBallLoadingIcon} alt="loading" />
    </StyledLoading>
  );
}
