import styled from "styled-components";
import { centeredBackgroundWithFooter } from "@/assets/images";

export const StyledFeedback = styled.div`
  background-image: url(${centeredBackgroundWithFooter});
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledFeedbackContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;

  padding: 1em 0;

  .logo {
    width: 100px;
    margin-bottom: 1em;

    @media ${({ theme }) => theme.bp.tabletL} {
      width: 140px;
    }
  }
`;

type StyledFeedbackCardProps = {
  $isSuccess: boolean;
};

export const StyledFeedbackCard = styled.div<StyledFeedbackCardProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4em;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 6em 0.5em 3em;

  width: 95%;
  text-align: center;
  border-radius: 10px;

  @media ${({ theme }) => theme.bp.tabletL} {
    margin-top: 4.5em;
  }

  .player-image {
    width: 140px;
    border-radius: 50%;
    position: absolute;
    transform: translateY(-10em);
    border: 3px solid
      ${({ $isSuccess, theme }) =>
        $isSuccess ? theme.colors.green : theme.colors.red};
    box-shadow: 0 0 9px
      ${({ $isSuccess, theme }) =>
        $isSuccess ? theme.colors.green : theme.colors.red};

    @media ${({ theme }) => theme.bp.tabletS} {
      width: 180px;
    }

    @media ${({ theme }) => theme.bp.desktopM} {
      width: 220px;
      transform: translateY(-11em);
    }
  }

  .feedback-title {
    color: ${({ $isSuccess, theme }) =>
      $isSuccess ? theme.colors.green : theme.colors.red};
    text-transform: uppercase;
    margin: 1em 0;
  }

  p {
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const StyledButtonsWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
  gap: 0.5em;
`;
