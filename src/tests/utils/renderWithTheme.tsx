import { theme } from "@/styles/theme";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "styled-components";

export default function renderWithTheme(component: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(<ThemeProvider theme={theme}>{component}</ThemeProvider>),
  };
}
