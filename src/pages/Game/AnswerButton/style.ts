import styled, { css } from "styled-components";

export const StyledAnswerButton = styled.button<{
  $answerWasSelected: boolean;
  $isCorrectAnswer: boolean;
}>`
  padding: 0.5em 0.5em;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10em;
  height: 64px;
  text-align: start;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
  box-shadow: 0 2px 10px ${({ theme }) => theme.colors.black + "40"};

  ${({ $answerWasSelected, $isCorrectAnswer }) =>
    $answerWasSelected &&
    css`
      box-shadow: 0 -1px 10px ${({ theme }) => ($isCorrectAnswer ? theme.colors.green : theme.colors.red)};
    `}

  .alternative {
    min-height: 50px;
    height: 50px;
    width: 50px;
    min-width: 50px;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 10em;
    font-size: 1.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .alternative-letter {
      transform: translateY(2px);
    }

    .feedback-icon {
      width: 100%;
    }
  }
`;
