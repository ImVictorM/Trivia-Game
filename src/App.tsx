import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useTranslation } from "react-i18next";

function App() {
  const language = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language.code);
  }, [i18n, language.code]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <AppRoutes />
    </ThemeProvider>
  );
}
export default App;
