import styled from "styled-components";
import { loginBackground } from "@/assets/images";

export const StyledLoginSection = styled.div`
  background-image: url(${loginBackground});
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
  }

  .login-form {
    margin-top: 0.3em;
    position: relative;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 1em 0.5em;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    width: 95%;
    max-width: 500px;

    @media ${({ theme }) => theme.bp.mobileL} {
      padding: 1.5em;
    }

    .inputs-wrapper {
      margin-bottom: 1.5em;
    }

    .settings {
      position: absolute;
      width: 30px;
      right: 1em;
      top: 1em;

      img {
        transition: transform 0.5s ease;

        &:hover {
          transform: rotate(180deg);
        }
      }
    }
  }
`;
