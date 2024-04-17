import styled, { css } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

type StyledRoundAnimatedButtonProps = {
  $color: keyof DefaultTheme["colors"];
  $shouldOverlap: boolean;
};

export const StyledRoundAnimatedButton = styled.div<StyledRoundAnimatedButtonProps>`
  position: relative;
  width: 50px;
  height: 50px;
  font-weight: 500;

  ${({ $shouldOverlap }) =>
    $shouldOverlap &&
    css`
      z-index: 99;
    `}

  .button {
    position: absolute;
    border-radius: 30px;
    background-color: ${({ theme, $color }) => theme.colors[$color]};
    color: ${({ theme }) => theme.colors.white};
    min-width: 100%;
    min-height: 100%;
    padding: 0.5em;
    transition: width 0.3s ease-in-out;

    .button-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .icon {
        width: 25px;
      }

      .text {
        line-height: 1.2;
        max-width: 0;
        white-space: nowrap;
        overflow: hidden;
        transition: all 0.3s ease-in-out;
        color: ${({ theme, $color }) =>
          theme.mixins.getContrastColor(theme.colors[$color])};
        transform: translateY(2px);
      }
    }

    &:hover {
      .button-content {
        .text {
          margin-left: 0.5rem;
          max-width: 15rem;
        }
      }
    }
  }
`;
