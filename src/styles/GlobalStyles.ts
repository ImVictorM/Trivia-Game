import { createGlobalStyle } from "styled-components";
import { variables } from "./variables";
import fonts from "./fonts.module.css";

export const GlobalStyles = createGlobalStyle`
  ${fonts}
  ${variables}

 

  /* Box sizing rules */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  height: 100%;
  text-rendering: optimizeSpeed;
  font-family: ${({ theme }) => theme.fonts.epilogue}, sans-serif;
  font-size: calc(15px + 0.390625vw);
  color: ${({ theme }) => theme.colors.black};
  line-height: 1;
}
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
figure,
blockquote,
dl,
dd {
  padding: 0;
  margin: 0;
}

button {
  border: none;
  background-color: transparent;
  font-family: inherit;
  padding: 0;
  cursor: pointer;
}
/* Remove list styles on ul, ol elements */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}
li {
  list-style-type: none;
}
/* Set core root defaults */
html {
  scroll-behavior: smooth;
}
/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

input,
button,
textarea,
select {
  font: inherit;
}

input::placeholder {
  font-family: ${({ theme }) => theme.fonts.verdana};
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;
