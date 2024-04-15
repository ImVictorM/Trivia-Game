import styled from "styled-components";
import { DefaultTheme } from "styled-components";

type StyledLinkButtonProps = {
  $color: keyof DefaultTheme["colors"];
};

export const StyledLinkButton = styled.div<StyledLinkButtonProps>`
  width: 100%;

  .link {
    display: inline-block;
    width: 100%;

    padding: 1em 2em;
    border-radius: 5px;
    transition: all 0.3s;

    text-align: center;
    text-decoration: none;
    color: ${({ theme, $color }) =>
      theme.mixins.getContrastColor(theme.colors[$color])};
    background-color: ${({ $color, theme }) => theme.colors[$color]};
    box-shadow: 0 4px 4px ${({ theme }) => theme.colors.black + "25"};
    border: 1px solid ${({ theme }) => theme.colors.black + "15"};

    &:hover {
      cursor: pointer;
      ${({ theme, $color }) =>
        theme.mixins.adjustColorBrightness(theme.colors[$color])}
    }
  }
`;
