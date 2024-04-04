import styled from "styled-components";
import { gameBackground } from "@/assets/images";

export const StyledLayout = styled.div`
  position: relative;
  background-image: url(${gameBackground});
  background-size: cover;
  background-position: top -2em center;
  padding-top: var(--header-height);
  z-index: 0;
`;

export const StyledContent = styled.div`
  padding: 1em;
  min-height: calc(100vh - var(--header-height));
  z-index: 1;
`;

export const PurpleBoxBackground = styled.div`
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.purple};
  width: 100%;
  height: 15vh;
  z-index: -1;
`;
