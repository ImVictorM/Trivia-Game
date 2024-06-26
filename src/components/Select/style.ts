import styled from "styled-components";

export const StyledSelect = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    margin-bottom: 0.2em;
    font-size: smaller;
  }

  .select-wrapper {
    position: relative;

    select {
      width: 100%;
      border: 1px solid ${({ theme }) => theme.colors.lightGrey};
      padding: 0.375em 2.25em 0.375em 0.75em;
      color: ${({ theme }) => theme.colors.black};
      background-color: ${({ theme }) => theme.colors.lighterGrey};
      appearance: none;
      border-radius: 5px;
      line-height: 1.5;
    }

    &::after,
    &::before {
      --size: 0.5em;

      content: "";
      height: 0;
      width: 0;
      position: absolute;

      right: 0.5em;
      top: 50%;
      transform: translateY(-50%);
      opacity: 0.6;
      pointer-events: none;
    }

    &::before {
      border-left: var(--size) solid transparent;
      border-right: var(--size) solid transparent;
      border-top: var(--size) solid ${({ theme }) => theme.colors.grey};
    }
  }
`;
