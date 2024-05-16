import { DefaultTheme } from "styled-components";
import { StyledRoundAnimatedButton } from "./style";
import { useEffect, useRef, useState } from "react";
import Dialog, { DialogProps } from "../Dialog";

type PartialDialogProps = Omit<DialogProps, "show" | "onClose">;

type RoundAnimatedButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color: keyof DefaultTheme["colors"];
    icon: {
      src: string;
      alt: string;
    };
    text: string;
    dialog?: PartialDialogProps;
  };

export default function RoundAnimatedButton({
  color,
  icon,
  text,
  dialog,
  className,
  onClick,
  ...defaultButtonProps
}: RoundAnimatedButtonProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [hasIncreasedWidth, setHasIncreasedWidth] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const { current } = buttonRef;
    const initialButtonWidth = current?.clientWidth || 0;

    const trigger = () => {
      if (current) {
        setHasIncreasedWidth(current.clientWidth > initialButtonWidth);
      }
    };

    if ("ResizeObserver" in window && current) {
      const resizeObserver = new ResizeObserver(trigger);
      resizeObserver.observe(current);

      return () => {
        resizeObserver.unobserve(current);
      };
    }
  }, []);

  const handleOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (dialog) {
      setShowDialog(true);
    } else {
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <>
      <StyledRoundAnimatedButton
        $shouldOverlap={hasIncreasedWidth}
        $color={color}
        className={`${className || ""}`}
      >
        <button
          className="button"
          ref={buttonRef}
          onClick={handleOnClick}
          {...defaultButtonProps}
        >
          <div className="button-content">
            <img className="icon" src={icon.src} alt={icon.alt} />
            <span className="text">{text}</span>
          </div>
        </button>
      </StyledRoundAnimatedButton>

      {dialog && (
        <Dialog
          {...dialog}
          show={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
}
