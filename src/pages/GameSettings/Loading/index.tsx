import { dualBallLoadingIcon } from "@/assets/icons";
import { StyledLoading } from "./style";

export default function Loading() {
  return (
    <StyledLoading>
      <div>
        <h1>Loading settings...</h1>
        <img src={dualBallLoadingIcon} alt="loading" />
      </div>
    </StyledLoading>
  );
}
