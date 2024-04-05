import { StyledGreenButton } from "./style";
import { spinnerLoadingIcon } from "@/assets/icons";

type GreenButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  isLoading?: boolean;
  loadingText?: string;
};

export default function GreenButton({
  children,
  isLoading,
  loadingText = "Loading...",
  ...defaultButtonProps
}: GreenButtonProps) {
  return (
    <StyledGreenButton {...defaultButtonProps}>
      {isLoading ? (
        <div className="loading">
          <span>{loadingText}</span>{" "}
          <img src={spinnerLoadingIcon} alt="loading" />
        </div>
      ) : (
        children
      )}
    </StyledGreenButton>
  );
}
