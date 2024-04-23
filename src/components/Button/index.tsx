import { DefaultTheme } from "styled-components";
import { StyledButton, StyledButtonWrapper } from "./style";
import { spinnerLoadingIcon } from "@/assets/icons";
import Dialog, { DialogProps } from "../Dialog";
import { useState } from "react";

type PartialDialogProps = Omit<DialogProps, "show" | "onClose">;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: string;
  isLoading?: boolean;
  loadingText?: string;
  color: keyof DefaultTheme["colors"];
  icon?: {
    src: string;
    alt: string;
  };
  dialog?: PartialDialogProps;
};

export default function Button({
  children,
  isLoading,
  color,
  icon,
  dialog,
  onClick,
  loadingText = "Loading...",
  className,
  ...defaultButtonProps
}: ButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (dialog) {
      setShowDialog(true);
    } else {
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <StyledButtonWrapper className={className ? className : ""}>
      <StyledButton
        onClick={handleClick}
        $color={color}
        {...defaultButtonProps}
      >
        {isLoading ? (
          <div className="loading">
            <span>{loadingText}</span>{" "}
            <img src={spinnerLoadingIcon} alt="loading" />
          </div>
        ) : (
          <>
            {children}{" "}
            {icon && <img className="icon" src={icon.src} alt={icon.alt} />}
          </>
        )}
      </StyledButton>

      {dialog && (
        <Dialog
          {...dialog}
          show={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}
    </StyledButtonWrapper>
  );
}
