import { theme } from "@/styles/theme";
import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

export default function renderWithTheme(component: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
}
