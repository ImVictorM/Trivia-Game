import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

type StyledButtonProps = {
  $color: keyof DefaultTheme["colors"];
};

export const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, $color }) => theme.colors[$color]};
  color: ${({ theme, $color }) =>
    theme.mixins.getContrastColor(theme.colors[$color])};
  width: 100%;
  padding: 1em 2em;
  transition: all 0.3s;
  border-radius: 5px;
  transition: all 0.3;

  .loading {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 0.4em;
    img {
      width: 1rem;
    }
  }

  &:disabled {
    opacity: 0.5;
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.white};
    cursor: not-allowed;
  }

  &:enabled {
    cursor: pointer;
    box-shadow: 0 4px 4px ${({ theme }) => theme.colors.black + "25"};
    border: 1px solid ${({ theme }) => theme.colors.black + "15"};
    &:hover {
      ${({ theme, $color }) =>
        theme.mixins.adjustColorBrightness(theme.colors[$color])};
    }
  }
`;
