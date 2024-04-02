import styled, { css } from "styled-components";

type StyledInputProps = {
  $inputValue: string | undefined;
};

const labelTranslateValue = 20;

export const StyledInput = styled.div<StyledInputProps>`
  position: relative;
  height: 30px;
  width: 100%;
  margin-top: 2em;

  label {
    bottom: 10px;
    left: 0;
    position: absolute;
    color: ${({ theme }) => theme.colors.grey};
    pointer-events: none;
    transition: all 0.3s ease;
  }

  .underline {
    position: absolute;
    bottom: 0px;
    height: 2px;
    width: 100%;

    &::before {
      position: absolute;
      content: "";
      height: 100%;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.green};
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }
  }

  input {
    outline: none;
    border: none;
    height: 100%;
    width: 100%;
    border-bottom: 2px solid silver;
  }

  input:focus ~ label {
    transform: translateY(${`-${labelTranslateValue}px`});
    font-size: smaller;
  }

  input:focus ~ .underline::before {
    transform: scaleX(1);
  }

  ${({ $inputValue }) =>
    css`
      input ~ label {
        transform: ${$inputValue?.length !== 0
          ? `translateY(-${labelTranslateValue}px)`
          : "translateY(0px)"};
        font-size: ${$inputValue?.length !== 0 ? "smaller" : "normal"};
      }

      input ~ .underline::before {
        transform: ${$inputValue?.length !== 0 ? "scaleX(1)" : "scaleX(0)"};
      }
    `}
`;
