import { renderWithRouter } from "@/tests/utils";
import Header, {
  HEADER_COMPONENT_PLAYER_IMAGE_ID,
  HEADER_COMPONENT_PLAYER_NAME_ID,
  HEADER_COMPONENT_PLAYER_SCORE_ID,
} from ".";
import { sizes } from "@/styles/breakpoints";
import { screen } from "@testing-library/react";
import { MENU_COMPONENT_ID } from "../Menu";

describe("Game layout: Header component", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("Renders correctly", () => {
    vi.stubGlobal("innerWidth", sizes.desktopM);

    renderWithRouter(<Header />);

    expect(
      screen.queryByTestId(HEADER_COMPONENT_PLAYER_IMAGE_ID)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(HEADER_COMPONENT_PLAYER_NAME_ID)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(HEADER_COMPONENT_PLAYER_SCORE_ID)
    ).toBeInTheDocument();
    expect(screen.queryByTestId(MENU_COMPONENT_ID)).not.toBeInTheDocument();
  });

  it("Renders the menu when screen size is small", () => {
    vi.stubGlobal("innerWidth", sizes.mobileS);

    renderWithRouter(<Header />);

    expect(screen.queryByTestId(MENU_COMPONENT_ID)).toBeInTheDocument();
  });
});
