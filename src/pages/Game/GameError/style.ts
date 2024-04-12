import styled from "styled-components";

export const StyledGameError = styled.section`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1em;

  h1 {
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
  }

  & > div {
    max-width: 200px;
  }
`;
