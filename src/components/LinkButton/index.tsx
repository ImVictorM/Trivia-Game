import { Link, LinkProps } from "react-router-dom";
import { StyledLinkButton } from "./style";
import { DefaultTheme } from "styled-components/dist/types";

type LinkButtonProps = LinkProps & {
  children: string;
  color: keyof DefaultTheme["colors"];
  icon?: {
    src: string;
    alt: string;
  };
};

export default function LinkButton({
  children,
  color,
  icon,
  ...defaultLinkProps
}: LinkButtonProps) {
  return (
    <StyledLinkButton $color={color}>
      <Link className="link" {...defaultLinkProps}>
        {children}
        {icon && <img className="icon" src={icon.src} alt={icon.src} />}
      </Link>
    </StyledLinkButton>
  );
}
