import { DefaultTheme } from "styled-components";
import { StyledButton } from "./style";
import { spinnerLoadingIcon } from "@/assets/icons";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  isLoading?: boolean;
  loadingText?: string;
  color: keyof DefaultTheme["colors"];
};

export default function Button({
  children,
  isLoading,
  color,
  loadingText = "Loading...",
  ...defaultButtonProps
}: ButtonProps) {
  return (
    <StyledButton $color={color} {...defaultButtonProps}>
      {isLoading ? (
        <div className="loading">
          <span>{loadingText}</span>{" "}
          <img src={spinnerLoadingIcon} alt="loading" />
        </div>
      ) : (
        children
      )}
    </StyledButton>
  );
}
