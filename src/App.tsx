import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <AppRoutes />
    </ThemeProvider>
  );
}
export default App;
