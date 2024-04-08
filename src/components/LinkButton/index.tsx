import { Link, LinkProps } from "react-router-dom";
import { StyledLinkButton } from "./style";
import { DefaultTheme } from "styled-components/dist/types";

type LinkButtonProps = LinkProps & {
  children: string;
  color: keyof DefaultTheme["colors"];
};

export default function LinkButton({
  children,
  color,
  ...defaultLinkProps
}: LinkButtonProps) {
  return (
    <StyledLinkButton $color={color}>
      <Link className="link" {...defaultLinkProps}>
        {children}
      </Link>
    </StyledLinkButton>
  );
}
