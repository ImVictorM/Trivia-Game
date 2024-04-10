import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Game, Login, Feedback, Ranking } from "./pages";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useSelector((state: RootState) => state.player);

  useEffect(() => {
    const playerDataExists = player.name && player.gravatarImgSrc;
    if (location.pathname !== "/" && !playerDataExists) {
      navigate("/");
    }
  }, [location, player, navigate]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/game" element={<Game />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/ranking" element={<Ranking />} />
        {/* <Route path="/settings" element={Settings} /> */}
      </Routes>
    </ThemeProvider>
  );
}
export default App;
