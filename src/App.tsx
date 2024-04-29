import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  const language = useSelector((state: RootState) => state.language);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language.code);
  }, [i18n, language.code]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
export default App;
