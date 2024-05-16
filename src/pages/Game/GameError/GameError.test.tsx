import { renderWithRouter } from "@/tests/utils";
import GameError, {
  GAME_ERROR_COMPONENT_ID,
  GAME_ERROR_COMPONENT_TRY_AGAIN_ID,
} from ".";
import { act, screen } from "@testing-library/react";
import Login, { LOGIN_PAGE_ID } from "@/pages/Login";

describe("Game page: GameError component", () => {
  const errorMessage = "there was an error, try again later.";

  it("Renders correctly", () => {
    renderWithRouter(<GameError message={errorMessage} />);

    screen.getByTestId(GAME_ERROR_COMPONENT_ID);
    screen.getByRole("heading", { name: errorMessage });
    screen.getByTestId(GAME_ERROR_COMPONENT_TRY_AGAIN_ID);
  });

  it("Navigates to / when clicking the try again button", async () => {
    const { user } = renderWithRouter(
      [
        { path: "/game", element: <GameError message={errorMessage} /> },
        { path: "/", element: <Login /> },
      ],
      ["/game", "/"]
    );

    const gamePage = screen.queryByTestId(GAME_ERROR_COMPONENT_ID);
    const button = screen.getByTestId(GAME_ERROR_COMPONENT_TRY_AGAIN_ID);

    await act(async () => {
      await user.click(button);
    });

    expect(gamePage).not.toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_PAGE_ID)).toBeInTheDocument();
  });
});
