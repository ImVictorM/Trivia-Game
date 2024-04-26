import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

export default function renderWithThemeAndRouter(
  component: React.ReactElement,
  { route = "/" } = {}
) {
  window.history.pushState({}, "Test page", route);

  return {
    user: userEvent.setup(),
    ...render(<ThemeProvider theme={theme}>{component}</ThemeProvider>, {
      wrapper: BrowserRouter,
    }),
  };
}
