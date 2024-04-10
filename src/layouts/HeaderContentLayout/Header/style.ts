import styled from "styled-components";

export const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.white};
  height: var(--header-height);
  padding: 0 1em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1em;
  box-shadow: 0 0 5px ${({ theme }) => theme.colors.black};

  .player-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;

    img {
      width: 37px;
      border-radius: 100%;
    }

    span {
      white-space: nowrap;
    }
  }

  .points-wrapper {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    align-items: end;

    img {
      width: 22px;
    }

    p {
      white-space: nowrap;

      span {
        font-weight: 600;
      }
    }
  }
`;
