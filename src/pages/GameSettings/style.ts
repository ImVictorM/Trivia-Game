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
  padding: 5em 0.5em 1em;

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${({ theme }) => theme.bp.mobileM} {
    padding: 5em 1em 1em;
  }

  @media ${({ theme }) => theme.bp.tabletL} {
    padding: 5em 3em 1em;
  }

  .logo {
    left: 50%;
    transform: translateX(-50%);

    position: absolute;
    width: 120px;

    top: -60px;

    @media ${({ theme }) => theme.bp.tabletL} {
      width: 160px;

      top: -80px;
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

  .buttons-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3em;
  }

  & > *:last-child {
    margin-top: 1em;
  }
`;
