import { bear } from "@/assets/defaultAvatars";
import * as hooks from "@/hooks";
import { RankingPlayer } from "@/hooks/usePlayerRanking";
import { renderWithRouter } from "@/tests/utils";
import Ranking, {
  RANKING_PAGE_EMPTY_ID,
  RANKING_PAGE_GO_BACK_ID,
  RANKING_PAGE_ID,
  RANKING_PAGE_PLAYER_ID,
  RANKING_PAGE_TITLE_ID,
} from ".";
import { act, screen } from "@testing-library/react";

const rankingMock: RankingPlayer[] = [
  { gravatarImgSrc: bear, name: "player 1", score: 120 },
  { gravatarImgSrc: bear, name: "player 2", score: 100 },
  { gravatarImgSrc: bear, name: "player 3", score: 20 },
];

describe("Ranking page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderRanking = () => {
    return renderWithRouter(
      [
        { path: "/ranking", element: <Ranking /> },
        { path: "/", element: <div data-testid="root"></div> },
      ],
      ["/ranking", "/"],
      0
    );
  };

  it("Renders correctly with players in the ranking", () => {
    vi.spyOn(hooks, "usePlayerRanking").mockImplementation(() => {
      return { playersRanking: rankingMock, updateRanking: () => {} };
    });

    renderRanking();

    const playersInRanking = screen.getAllByTestId(RANKING_PAGE_PLAYER_ID);

    playersInRanking.forEach((player, index) => {
      const playerImage = screen.getByRole("img", {
        name: rankingMock[index].name,
      });
      expect(player).toContainElement(playerImage);
      expect(player).toHaveTextContent(rankingMock[index].name);
      expect(player).toHaveTextContent(rankingMock[index].score.toString());
    });

    expect(screen.queryByTestId(RANKING_PAGE_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(RANKING_PAGE_EMPTY_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId(RANKING_PAGE_GO_BACK_ID)).toBeInTheDocument();
    expect(screen.queryByTestId(RANKING_PAGE_TITLE_ID)).toBeInTheDocument();
  });

  it("Renders correctly without players in the ranking", () => {
    vi.spyOn(hooks, "usePlayerRanking").mockImplementation(() => {
      return { playersRanking: [], updateRanking: () => {} };
    });

    renderRanking();

    expect(screen.queryByTestId(RANKING_PAGE_EMPTY_ID)).toBeInTheDocument();
    expect(
      screen.queryByTestId(RANKING_PAGE_PLAYER_ID)
    ).not.toBeInTheDocument();
  });

  it("Navigates to / when clicking the go to start button", async () => {
    const { user } = renderRanking();

    const goBackButton = screen.getByTestId(RANKING_PAGE_GO_BACK_ID);

    await act(async () => {
      await user.click(goBackButton);
    });

    expect(screen.queryByTestId(RANKING_PAGE_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId("root")).toBeInTheDocument();
  });
});
