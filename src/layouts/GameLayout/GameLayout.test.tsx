import { renderWithRouter } from "@/tests/utils";
import GameLayout, { GAME_LAYOUT_CONTENT_ID, GAME_LAYOUT_ID } from ".";
import { screen } from "@testing-library/react";
import { HEADER_COMPONENT_ID } from "./Header";

describe("Game layout", () => {
  it("Renders correctly", () => {
    renderWithRouter(
      <GameLayout>
        <div data-testid="layout-content"></div>
      </GameLayout>
    );

    const layout = screen.getByTestId(GAME_LAYOUT_ID);
    const layoutContent = screen.getByTestId(GAME_LAYOUT_CONTENT_ID);
    const layoutHeader = screen.getByTestId(HEADER_COMPONENT_ID);

    expect(layout).toContainElement(layoutContent);
    expect(layout).toContainElement(layoutHeader);
  });
});
