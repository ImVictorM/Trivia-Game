import styled, { css, keyframes } from "styled-components";

export const StyledQuestionCard = styled.div`
  position: relative;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  padding: 1em;

  .question-theme {
    margin: 0;
    top: -22.5px;
    right: 1em;
    left: 1em;
    border-radius: 50px;
    height: 45px;
    padding: 1em 1em;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.white};
    text-align: center;
    font-weight: 600;

    .scrolling-text-wrapper {
      overflow: hidden;
    }

    &.general {
      background-color: ${({ theme }) => theme.colors.lightGrey};
    }

    &.entertainment {
      background-color: ${({ theme }) => theme.colors.cyan};
    }

    &.science,
    &.animals {
      background-color: ${({ theme }) => theme.colors.green};
    }

    &.geography,
    &.history,
    &.politics,
    &.mythology {
      background-color: ${({ theme }) => theme.colors.red};
    }

    &.art,
    &.celebrities,
    &.sports {
      background-color: ${({ theme }) => theme.colors.yellow};
    }
  }

  .question-content-wrapper {
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    gap: 6em;

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
