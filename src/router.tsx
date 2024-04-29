import { createBrowserRouter } from "react-router-dom";
import { Login, Game, Feedback, Ranking, GameSettings } from "./pages";
import { UserRequiredRoute } from "./components";

export const routes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "game",
    element: (
      <UserRequiredRoute>
        <Game />
      </UserRequiredRoute>
    ),
  },
  {
    path: "feedback",
    element: (
      <UserRequiredRoute>
        <Feedback />
      </UserRequiredRoute>
    ),
  },
  {
    path: "/ranking",
    element: <Ranking />,
  },
  {
    path: "/settings",
    element: <GameSettings />,
  },
];

const router = createBrowserRouter(routes);

export default router;
