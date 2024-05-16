import { renderWithRouter } from "@/tests/utils";
import { bear } from "@/assets/defaultAvatars";
import { ExtendedRenderOptions } from "@/tests/utils/renderWithProviders";
import { act, screen } from "@testing-library/react";
import Feedback, {
  FEEDBACK_PAGE_PLAYER_ASSERTIONS_ID,
  FEEDBACK_PAGE_PLAYER_IMAGE_ID,
  FEEDBACK_PAGE_PLAYER_SCORE_ID,
  FEEDBACK_PAGE_PLAY_AGAIN_ID,
  FEEDBACK_PAGE_RANKING_ID,
  FEEDBACK_PAGE_TEXT_ID,
} from ".";

describe("Feedback page", () => {
  const renderFeedbackPage = (
    options: ExtendedRenderOptions = {
      preloadedState: {
        player: {
          assertions: 0,
          gravatarImgSrc: bear,
          name: "Player test",
          score: 0,
          token: "token",
        },
        language: { code: "en" },
      },
    }
  ) => {
    return renderWithRouter(
      [
        { path: "/feedback", element: <Feedback data-testid="feedback" /> },
        { path: "/", element: <div data-testid="root"></div> },
        { path: "/ranking", element: <div data-testid="ranking"></div> },
      ],
      ["/feedback", "/", "/ranking"],
      0,
      options
    );
  };

  it("Renders correctly", () => {
    renderFeedbackPage();

    screen.getByTestId(FEEDBACK_PAGE_PLAYER_ASSERTIONS_ID);
    screen.getByTestId(FEEDBACK_PAGE_PLAYER_IMAGE_ID);
    screen.getByTestId(FEEDBACK_PAGE_PLAYER_SCORE_ID);
    screen.getByTestId(FEEDBACK_PAGE_PLAY_AGAIN_ID);
    screen.getByTestId(FEEDBACK_PAGE_RANKING_ID);
    screen.getByTestId(FEEDBACK_PAGE_TEXT_ID);
  });

  it("Navigates to / when clicking the play again button", async () => {
    const { user } = renderFeedbackPage();

    const playAgainButton = screen.getByTestId(FEEDBACK_PAGE_PLAY_AGAIN_ID);

    await act(async () => {
      await user.click(playAgainButton);
    });

    expect(screen.queryByTestId("feedback")).not.toBeInTheDocument();
    expect(screen.queryByTestId("root")).toBeInTheDocument();
  });

  it("Navigates to /ranking when clicking the ranking button", async () => {
    const { user } = renderFeedbackPage();

    const rankingButton = screen.getByTestId(FEEDBACK_PAGE_RANKING_ID);

    await act(async () => {
      await user.click(rankingButton);
    });
    expect(screen.queryByTestId("feedback")).not.toBeInTheDocument();
    expect(screen.queryByTestId("ranking")).toBeInTheDocument();
  });
});
