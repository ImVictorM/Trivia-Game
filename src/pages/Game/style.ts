import { QuestionType } from "@/services/triviaApi";
import styled from "styled-components";

export const StyledGameWrapper = styled.section`
  margin-top: 3em;
  margin-bottom: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1400px;
  position: relative;
  align-self: stretch;
  width: 100%;

  @media ${({ theme }) => theme.bp.desktopXS} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 3em;
    margin: 0 auto;
    margin-top: 2em;
  }
`;

export const StyledQuestionWrapper = styled.div`
  position: relative;

  .logo {
    display: none;
  }

  @media ${({ theme }) => theme.bp.desktopXS} {
    margin-top: 3em;

    .logo {
      display: block;
      position: absolute;
      width: 170px;
      z-index: 11;
      top: -220px;
      right: 50%;
      transform: translateX(50%);
    }
  }

  .buttons-wrapper {
    padding: 0 2em;
    margin-top: 0.5em;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
  }
`;

type StyledAnswersWrapperProps = {
  $questionType: QuestionType;
};

export const StyledAnswersWrapper = styled.div<StyledAnswersWrapperProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media ${({ theme }) => theme.bp.desktopXS} {
    align-self: baseline;
    margin-top: ${({ $questionType }) =>
      $questionType === "boolean" ? "5em" : "3em"};
  }

  .answers-options {
    width: 100%;
    margin-top: 2em;
    margin-bottom: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
  }

  .next-button {
    align-self: center;
    max-width: 350px;
    margin-top: 0.5em;
    ${({ theme }) => theme.animations.bounceInRightAnimation}
  }
`;
