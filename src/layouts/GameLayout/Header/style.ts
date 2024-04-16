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
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 5px ${({ theme }) => theme.colors.black};

  @media ${({ theme }) => theme.bp.desktopXS} {
    position: absolute;
  }
`;

export const StyledPlayerStats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;
`;

export const StyledHeaderContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1600px;
  gap: 1em;

  @media ${({ theme }) => theme.bp.desktopXS} {
    justify-content: end;
  }

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

type StyledHamburgerButtonProps = {
  $menuOpen: boolean;
};

export const StyledHamburgerButton = styled.button<StyledHamburgerButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 12;
  padding: 15px;
  border: none;
  background-color: transparent;
  text-transform: none;
  transition: opacity, filter 0.15s linear;

  .line {
    position: absolute;
    top: 50%;
    right: 0;
    width: 30px;
    height: 2px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.darkerGreen};
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${({ $menuOpen }) => ($menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${({ $menuOpen }) => ($menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${({ $menuOpen }) =>
        $menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`}
    );

    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: 30px;
      height: 2px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.colors.darkerGreen};
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }

    &:before {
      width: ${({ $menuOpen }) => ($menuOpen ? `100%` : `120%`)};
      top: ${({ $menuOpen }) => ($menuOpen ? `0` : `-10px`)};
      opacity: ${({ $menuOpen }) => ($menuOpen ? 0 : 1)};
      transition: ${({ $menuOpen }) =>
        $menuOpen
          ? "top 0.1s ease-out, opacity 0.1s ease-out 0.12s"
          : "top 0.1s ease-in 0.25s, opacity 0.1s ease-in"};
    }
    &:after {
      width: ${({ $menuOpen }) => ($menuOpen ? `100%` : `80%`)};
      bottom: ${({ $menuOpen }) => ($menuOpen ? `0` : `-10px`)};
      transform: rotate(${({ $menuOpen }) => ($menuOpen ? `-90deg` : `0`)});
      transition: ${({ $menuOpen }) =>
        $menuOpen
          ? "bottom 0.1s ease-out, transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s"
          : "bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19)"};
    }
  }
`;

type StyledMenuProps = {
  $menuOpen: boolean;
};

export const StyledMenu = styled.aside<StyledMenuProps>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: min(80vw, 400px);
  background-color: ${({ theme }) => theme.colors.white};
  height: 100vh;
  padding: 7em 2.3em;
  box-shadow: -10px 0px 30px -15px ${({ theme }) => theme.colors.black};
  transform: translateX(${({ $menuOpen }) => ($menuOpen ? 0 : 100)}vw);
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

  .buttons-wrapper {
    margin-top: 5em;
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
`;
