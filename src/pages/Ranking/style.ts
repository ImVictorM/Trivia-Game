import styled from "styled-components";
import { centeredBackground } from "@/assets/images";

export const StyledRanking = styled.div`
  min-height: 100vh;
  background-image: url(${centeredBackground});
  background-size: cover;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledRankingContent = styled.section`
  padding: 7em 0.5em 1em;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  max-height: 800px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  width: 90%;

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

export const StyledPlayerList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5em;
  margin: 2em 0;
`;

export const StyledPlayer = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  width: 100%;
  justify-content: space-between;
  border-radius: 30px;
  height: 55px;

  .player-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    width: 60%;
    height: 100%;
    padding: 0.5em;

    .player-name {
      line-height: 1.5;
      height: fit-content;
      width: 100%;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .player-img {
      width: 37px;
      height: 37px;
      border-radius: 50%;
    }
  }

  .points-wrapper {
    background-color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    width: 40%;
    padding: 0.5em;

    border-radius: 30px;
    align-self: stretch;
    box-shadow: 0 4px 22px ${({ theme }) => theme.colors.black + "25"};
    gap: 0.5em;

    .star-icon {
      width: 25px;
    }

    .points {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow-x: hidden;
      line-height: 1.5;
      transform: translateY(2px);

      span {
        font-weight: 700;
      }
    }
  }
`;
