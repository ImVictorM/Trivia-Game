import { centeredBackground } from "@/assets/images";
import styled from "styled-components";

export const StyledSettings = styled.div`
  background-image: url(${centeredBackground});
  background-position: center center;
  background-size: cover;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSettingsContent = styled.section`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 600px;
  max-height: 800px;
  width: 90%;
  border-radius: 10px;
  padding: 7em 0.5em 1em;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.bp.tabletL} {
    padding: 7em 3em 1em;
  }

  .logo {
    top: -75px;
    left: 50%;
    transform: translateX(-50%);

    position: absolute;
    width: 150px;

    @media ${({ theme }) => theme.bp.tabletL} {
      width: 220px;

      top: -110px;
    }
  }
`;

export const StyledSettingsForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1em;

  .selects-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
  }

  & > *:last-child {
    margin-top: 2em;
  }
`;
