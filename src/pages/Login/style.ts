import styled from "styled-components";
import { centeredBackground } from "@/assets/images";

export const StyledLoginSection = styled.div`
  background-image: url(${centeredBackground});
  background-size: cover;
  min-height: 100vh;
  height: 100vh;
  background-position: center center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    width: 150px;

    @media ${({ theme }) => theme.bp.mobileL} {
      width: 200px;
    }

    @media ${({ theme }) => theme.bp.desktopXS} {
      width: 260px;
    }
  }

  .login-form {
    --padding-top: 2.3em;
    margin-top: 0.3em;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    padding: var(--padding-top) 1em 1em;

    border-radius: 10px;

    display: flex;
    flex-direction: column;
    width: 91%;
    max-width: 650px;
    box-shadow: 1px 4px 13px ${({ theme }) => theme.colors.black + "25"};

    @media ${({ theme }) => theme.bp.mobileL} {
      padding: var(--padding-top) 1.5em 1.5em;
    }

    @media ${({ theme }) => theme.bp.desktopXS} {
      padding: var(--padding-top) 2.5em 1.5em;
    }

    .inputs-wrapper {
      margin-bottom: 1.5em;
    }

    .buttons-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.3em;
      align-items: center;
    }

    .language-selector {
      position: absolute;
      top: 1.3em;
      right: 4em;
    }

    .settings {
      position: absolute;
      width: 30px;
      right: 1em;
      top: 1em;

      @media ${({ theme }) => theme.bp.desktopXS} {
        width: 40px;
      }

      img {
        transition: transform 0.5s ease;

        &:hover {
          transform: rotate(180deg);
        }
      }
    }
  }
`;
