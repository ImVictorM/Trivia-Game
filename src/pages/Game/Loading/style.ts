import styled from "styled-components";

export const StyledLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white + "20"};

  h1 {
    text-align: center;
    text-transform: uppercase;
    transform: translateY(0.5em);
    color: ${({ theme }) => theme.colors.white};
  }

  img {
    width: 150px;
  }
`;
