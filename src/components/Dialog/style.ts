import styled from "styled-components";

export const StyledDialogOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.black + "90"};
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type StyledDialogProps = {
  $shouldAnimateOut: boolean;
};

export const StyledDialog = styled.div<StyledDialogProps>`
  --border-radius: 10px;

  width: 100%;
  max-width: 600px;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: var(--border-radius);
  box-shadow: 0 10px 15px rgb(0, 0, 0, 0.2);
  ${({ theme, $shouldAnimateOut }) =>
    theme.animations.popupAnimation($shouldAnimateOut)}

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    padding: 1em 1.5em;
    border-radius: var(--border-radius) var(--border-radius) 0 0;

    .title {
      color: ${({ theme }) => theme.colors.black};
      font-weight: 600;
      font-size: 1.5rem;
    }

    .close {
      width: 20px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 2em 4em;

    .text {
      text-align: center;
    }

    .buttons-wrapper {
      margin-top: 2em;
      display: flex;
      flex-direction: row;
      gap: 3em;
    }
  }
`;
