import { renderWithProviders } from "@/tests/utils";
import Loading, {
  GAME_LOADING_COMPONENT_ID,
  GAME_LOADING_COMPONENT_IMAGE_ID,
  GAME_LOADING_COMPONENT_TITLE_ID,
} from ".";
import { screen } from "@testing-library/react";

describe("Game page: Loading component", () => {
  it("Renders correctly", () => {
    renderWithProviders(<Loading />);

    screen.getByTestId(GAME_LOADING_COMPONENT_ID);
    screen.getByTestId(GAME_LOADING_COMPONENT_IMAGE_ID);
    screen.getByTestId(GAME_LOADING_COMPONENT_TITLE_ID);
  });
});
