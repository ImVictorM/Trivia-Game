import styled, { css, keyframes } from "styled-components";

export const StyledQuestionCard = styled.div`
  position: relative;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 1em;
  display: flex;
  justify-content: center;

  @media ${({ theme }) => theme.bp.desktopXS} {
    min-height: 400px;
    padding: 2em;
  }

  .question-theme {
    margin: 0;
    top: -30px;
    right: 1em;
    left: 1em;
    border-radius: 50px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.purple};
    font-weight: 600;
    padding: 0 1em;
    box-shadow: 0 4px 4px ${({ theme }) => theme.colors.black + "25"};
    color: ${({ theme }) => theme.mixins.getContrastColor(theme.colors.purple)};

    .scrolling-text-wrapper {
      width: 100%;
      text-align: center;
      overflow: hidden;
    }

    &.general {
      background-color: ${({ theme }) => theme.colors.purple};
      color: ${({ theme }) =>
        theme.mixins.getContrastColor(theme.colors.purple)};
    }

    &.entertainment {
      background-color: ${({ theme }) => theme.colors.cyan};
      color: ${({ theme }) => theme.mixins.getContrastColor(theme.colors.cyan)};
    }

    &.science,
    &.animals {
      background-color: ${({ theme }) => theme.colors.green};
      color: ${({ theme }) =>
        theme.mixins.getContrastColor(theme.colors.green)};
    }

    &.geography,
    &.history,
    &.politics,
    &.mythology {
      background-color: ${({ theme }) => theme.colors.red};
      color: ${({ theme }) => theme.mixins.getContrastColor(theme.colors.red)};
    }

    &.art,
    &.celebrities,
    &.sports {
      background-color: ${({ theme }) => theme.colors.yellow};
      color: ${({ theme }) =>
        theme.mixins.getContrastColor(theme.colors.yellow)};
    }
  }

  .question-content-wrapper {
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 6em;

    @media ${({ theme }) => theme.bp.desktopXS} {
      gap: 0;
      margin-top: 6em;
    }

    .question-text {
      text-align: center;
    }

    .remaining-time {
      display: flex;
      flex-direction: row;
      align-items: end;
      justify-content: center;
      color: ${({ theme }) => theme.colors.red};
      font-weight: 600;
      gap: 0.5em;
    }
  }
`;

const scrollAnimation = keyframes`
  0% {
    transform: translateX(1em);
  }

  100% {
    transform: translateX(-50%);
  }
`;

type StyledScrollingTextProps = {
  $isOverflow: boolean;
  $stopAnimation: boolean;
};

export const StyledScrollingText = styled.span<StyledScrollingTextProps>`
  width: 100%;
  display: inline-block;
  white-space: nowrap;
  line-height: 1.5;

  ${({ $isOverflow, $stopAnimation }) => {
    if ($stopAnimation) {
      return css`
        animation: none;
      `;
    }

    if ($isOverflow) {
      return css`
        animation: ${scrollAnimation} 10s linear infinite;
      `;
    }
  }}
`;
