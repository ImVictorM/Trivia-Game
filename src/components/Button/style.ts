import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

type StyledButtonProps = {
  $color: keyof DefaultTheme["colors"];
};

export const StyledButtonWrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 5px;
`;

export const StyledButton = styled.button<StyledButtonProps>`
  width: 100%;
  padding: 1em 1.5em;
  transition: all 0.3s;
  border-radius: 5px;
  transition: all 0.3;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;

  .icon {
    width: 20px;
    margin-left: 0.5em;
  }

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
    background-color: ${({ theme, $color }) => theme.colors[$color] + "80"};
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.white};
    cursor: not-allowed;
  }

  &:enabled {
    background-color: ${({ theme, $color }) => theme.colors[$color]};
    color: ${({ theme, $color }) =>
      theme.mixins.getContrastColor(theme.colors[$color])};
    cursor: pointer;
    box-shadow: 0 4px 4px ${({ theme }) => theme.colors.black + "25"};
    border: 1px solid ${({ theme }) => theme.colors.black + "15"};
    &:hover {
      ${({ theme, $color }) =>
        theme.mixins.adjustColorBrightness(theme.colors[$color])};
    }
  }
`;
