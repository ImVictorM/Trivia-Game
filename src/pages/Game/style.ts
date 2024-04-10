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
    margin-top: 7em;
  }

  .left {
    position: relative;

    .logo {
      display: none;
    }

    @media ${({ theme }) => theme.bp.desktopXS} {
      margin-top: 3em;
      .logo {
        display: block;
        position: absolute;
        width: 230px;
        z-index: 11;
        top: -300px;
        right: 50%;
        transform: translateX(50%);
      }
    }
  }

  .right {
    @media ${({ theme }) => theme.bp.desktopXS} {
      position: relative;
      align-self: baseline;
      margin-top: 3em;
      .next-button-wrapper {
        width: 100%;
        position: absolute;
        bottom: -2em;
      }
    }
  }
`;

export const StyledAnswersWrapper = styled.div`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
`;
