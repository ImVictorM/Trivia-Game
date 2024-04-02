import { Route, Routes } from "react-router-dom";
import { Login } from "./pages";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/game" element={} /> */}
        {/* <Route path="/feedback" element={Feedback} />
      <Route path="/settings" element={Settings} />
      <Route path="/ranking" element={Ranking} /> */}
      </Routes>
    </ThemeProvider>
  );
}
export default App;
