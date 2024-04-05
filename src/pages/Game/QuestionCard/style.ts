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
    padding: 1em 0.5em;
    position: absolute;
    background-color: ${({ theme }) => theme.colors.white};
    text-align: center;
    font-weight: 600;
    overflow: hidden;

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

export const StyledScrollingText = styled.span<{ $isOverflow: boolean }>`
  display: inline-block;
  white-space: nowrap;

  ${({ $isOverflow }) =>
    $isOverflow &&
    css`
      animation: ${scrollAnimation} 10s linear infinite;
    `}
`;
