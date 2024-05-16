import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledToastContainer = styled(ToastContainer)`
  width: 100%;
  max-width: 500px;

  .Toastify__toast {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.grey};
  }

  .Toastify__progress-bar--error {
    background-color: ${({ theme }) => theme.colors.red};
  }
  .Toastify__progress-bar--success {
    background-color: ${({ theme }) => theme.colors.green};
  }
  .Toastify__progress-bar--warning {
    background-color: ${({ theme }) => theme.colors.yellow};
  }
`;
