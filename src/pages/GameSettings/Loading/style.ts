import styled from "styled-components";

export const StyledLoading = styled.div`
  div {
    min-width: 100vw;
    min-height: 100vh;
    background-color: ${({ theme }) => theme.colors.white + "20"};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    transform: translateY(1em);
  }
`;
