import { renderWithRouter } from "@/tests/utils";
import GameSettings, {
  SETTINGS_PAGE_CATEGORY_COMBO_ID,
  SETTINGS_PAGE_DIFFICULTY_COMBO_ID,
  SETTINGS_PAGE_GO_BACK_ID,
  SETTINGS_PAGE_ID,
  SETTINGS_PAGE_SAVE_ID,
  SETTINGS_PAGE_TITLE_ID,
  SETTINGS_PAGE_TYPE_COMBO_ID,
} from ".";
import { act, screen } from "@testing-library/react";
import { TOAST_COMPONENT_SUCCESS_ICON_ID } from "@/components/Toast";

describe("Game settings page", () => {
  const renderGameSettings = () => {
    return renderWithRouter(
      [
        { path: "/settings", element: <GameSettings /> },
        { path: "/", element: <div data-testid="root"></div> },
      ],
      ["/settings", "/"],
      0
    );
  };

  it("Renders correctly", () => {
    renderGameSettings();

    screen.getByTestId(SETTINGS_PAGE_ID);
    screen.getByTestId(SETTINGS_PAGE_TITLE_ID);

    screen.getByTestId(SETTINGS_PAGE_SAVE_ID);
    screen.getByTestId(SETTINGS_PAGE_GO_BACK_ID);

    const categoryCombo = screen.getByTestId(SETTINGS_PAGE_CATEGORY_COMBO_ID);
    const difficultyCombo = screen.getByTestId(
      SETTINGS_PAGE_DIFFICULTY_COMBO_ID
    );
    const typeCombo = screen.getByTestId(SETTINGS_PAGE_TYPE_COMBO_ID);

    expect(categoryCombo).toHaveValue("-1");
    expect(difficultyCombo).toHaveValue("any");
    expect(typeCombo).toHaveValue("any");
  });

  it("Can change and save settings", async () => {
    const { user } = renderGameSettings();

    const categoryCombo = screen.getByTestId(SETTINGS_PAGE_CATEGORY_COMBO_ID);
    const difficultyCombo = screen.getByTestId(
      SETTINGS_PAGE_DIFFICULTY_COMBO_ID
    );
    const typeCombo = screen.getByTestId(SETTINGS_PAGE_TYPE_COMBO_ID);
    const saveButton = screen.getByTestId(SETTINGS_PAGE_SAVE_ID);

    await act(async () => {
      await user.selectOptions(categoryCombo, "9");
      await user.selectOptions(difficultyCombo, "easy");
      await user.selectOptions(typeCombo, "multiple");
    });

    expect(categoryCombo).toHaveValue("9");
    expect(difficultyCombo).toHaveValue("easy");
    expect(typeCombo).toHaveValue("multiple");

    await act(async () => {
      await user.click(saveButton);
    });

    expect(
      screen.queryByTestId(TOAST_COMPONENT_SUCCESS_ICON_ID)
    ).toBeInTheDocument();
  });

  it("Navigates to / when clicking the go back button", async () => {
    const { user } = renderGameSettings();

    const goBackButton = screen.getByTestId(SETTINGS_PAGE_GO_BACK_ID);

    await act(async () => {
      await user.click(goBackButton);
    });

    expect(screen.queryByTestId(SETTINGS_PAGE_ID)).not.toBeInTheDocument();
    expect(screen.queryByTestId("root")).toBeInTheDocument();
  });
});
