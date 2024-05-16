import styled from "styled-components";
import { leftQuestionsMarkBackground } from "@/assets/images";

export const StyledLayout = styled.div`
  position: relative;
  background-image: url(${leftQuestionsMarkBackground});
  background-size: cover;
  background-position: center center;
  padding-top: var(--header-height);
`;

export const StyledContent = styled.div`
  display: flex;
  padding: 1em;
  min-height: var(--content-height);
`;
