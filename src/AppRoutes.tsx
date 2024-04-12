import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "./redux/store";
import { Login, Feedback, Game, Ranking } from "./pages";

export default function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const player = useSelector((state: RootState) => state.player);
  const routes = useMemo(
    () => [
      {
        path: "/",
        element: <Login />,
        requiredPlayer: false,
      },
      {
        path: "/game",
        element: <Game />,
        requiredPlayer: true,
      },
      {
        path: "/feedback",
        element: <Feedback />,
        requiredPlayer: true,
      },
      {
        path: "/ranking",
        element: <Ranking />,
        requiredPlayer: false,
      },
      {
        path: "/settings",
        element: <div></div>,
        requiredPlayer: false,
      },
    ],
    []
  );

  useEffect(() => {
    const playerDataExists = player.name && player.gravatarImgSrc;
    const route = routes.find((route) => route.path === location.pathname);

    if (route?.requiredPlayer && !playerDataExists) {
      navigate("/");
    }
  }, [location, player, navigate, routes]);

  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
