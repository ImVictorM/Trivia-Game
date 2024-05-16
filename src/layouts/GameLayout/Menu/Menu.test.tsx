import { renderWithRouter } from "@/tests/utils";
import Menu, {
  MENU_COMPONENT_END_MATCH_ID,
  MENU_COMPONENT_HAMBURGER_ID,
  MENU_COMPONENT_ID,
  MENU_COMPONENT_SIDEBAR_ID,
  MENU_COMPONENT_SURRENDER_ID,
} from ".";
import { act, screen } from "@testing-library/react";
import { DIALOG_COMPONENT_CONFIRM_BUTTON_ID } from "@/components/Dialog";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const original = (await importOriginal()) as object;
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("Game layout: Menu component", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("Renders correctly", () => {
    renderWithRouter(<Menu />);

    expect(screen.queryByTestId(MENU_COMPONENT_ID)).toBeInTheDocument();
    expect(
      screen.queryByTestId(MENU_COMPONENT_HAMBURGER_ID)
    ).toBeInTheDocument();
    expect(screen.queryByTestId(MENU_COMPONENT_SIDEBAR_ID)).toBeInTheDocument();
    expect(
      screen.queryByTestId(MENU_COMPONENT_END_MATCH_ID)
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId(MENU_COMPONENT_SURRENDER_ID)
    ).toBeInTheDocument();
  });

  it("Toggles blur on body when opening the menu", async () => {
    const { user } = renderWithRouter(<Menu />);

    const hamburgerButton = screen.getByTestId(MENU_COMPONENT_HAMBURGER_ID);

    expect(document.body).not.toHaveClass("blur");

    await act(async () => {
      await user.click(hamburgerButton);
    });

    expect(document.body).toHaveClass("blur");
  });

  it("Navigates to / when surrendering a match", async () => {
    const { user } = renderWithRouter(<Menu />);

    const surrenderButton = screen.getByTestId(MENU_COMPONENT_SURRENDER_ID);

    await act(async () => {
      await user.click(surrenderButton);
    });

    const confirmButton = screen.getByTestId(
      DIALOG_COMPONENT_CONFIRM_BUTTON_ID
    );

    await act(async () => {
      await user.click(confirmButton);
    });

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("Navigates to /feedback when ending a match", async () => {
    const { user } = renderWithRouter(<Menu />);

    const endMatchButton = screen.getByTestId(MENU_COMPONENT_END_MATCH_ID);

    await act(async () => {
      await user.click(endMatchButton);
    });

    const confirmButton = screen.getByTestId(
      DIALOG_COMPONENT_CONFIRM_BUTTON_ID
    );

    await act(async () => {
      await user.click(confirmButton);
    });

    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith("/feedback");
  });
});
