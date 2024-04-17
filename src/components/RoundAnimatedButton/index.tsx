import { DefaultTheme } from "styled-components";
import { StyledRoundAnimatedButton } from "./style";
import { useEffect, useRef, useState } from "react";

type RoundAnimatedButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color: keyof DefaultTheme["colors"];
    icon: {
      src: string;
      alt: string;
    };
    text: string;
  };

export default function RoundAnimatedButton({
  color,
  icon,
  text,
  className,
  ...defaultButtonProps
}: RoundAnimatedButtonProps) {
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

    const resizeObserver = new ResizeObserver(trigger);

    if (current) {
      resizeObserver.observe(current);
    }

    return () => {
      if (current) {
        resizeObserver.unobserve(current);
      }
    };
  }, []);

  return (
    <StyledRoundAnimatedButton
      $shouldOverlap={hasIncreasedWidth}
      $color={color}
    >
      <button
        className={`button ${className}`}
        {...defaultButtonProps}
        ref={buttonRef}
      >
        <div className="button-content">
          <img className="icon" src={icon.src} alt={icon.alt} />
          <span className="text">{text}</span>
        </div>
      </button>
    </StyledRoundAnimatedButton>
  );
}
