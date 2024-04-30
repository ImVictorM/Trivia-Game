import { renderWithRouter } from "@/tests/utils";
import {
  LOGIN_PAGE_EMAIL_INPUT_ID,
  LOGIN_PAGE_ID,
  LOGIN_PAGE_NAME_INPUT_ID,
  LOGIN_PAGE_PLAY_BUTTON_ID,
  LOGIN_PAGE_RANKING_BUTTON_ID,
  LOGIN_PAGE_SETTINGS_BUTTON_ID,
} from ".";
import { screen } from "@testing-library/react";
import { LANGUAGE_SELECTOR_COMPONENT_ID } from "./LanguageSelector";
import { RANKING_PAGE_ID } from "../Ranking";
import { SETTINGS_PAGE_ID } from "../GameSettings";
import { TOAST_COMPONENT_ERROR_ICON_ID } from "@/components/Toast";
import { GET_TOKEN_SUCCESS } from "@/tests/mocks/triviaApi";
import * as triviaService from "@/services/triviaApi";
import * as gravatarService from "@/services/gravatarApi";
import { bear } from "@/assets/defaultAvatars";
import { act } from "react-dom/test-utils";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const original = (await importOriginal()) as object;
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("Login page", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const VALID_NAME = "victor";
  const VALID_EMAIL = "victor@email.com";
  it("Renders correctly", () => {
    renderWithRouter(["/"]);

    const logo = screen.queryByRole("img", { name: /trivia/i });
    const nameInput = screen.queryByTestId(LOGIN_PAGE_NAME_INPUT_ID);
    const emailInput = screen.queryByTestId(LOGIN_PAGE_EMAIL_INPUT_ID);
    const languageSelector = screen.queryByTestId(
      LANGUAGE_SELECTOR_COMPONENT_ID
    );
    const startButton = screen.queryByTestId(LOGIN_PAGE_PLAY_BUTTON_ID);
    const rankingButton = screen.queryByTestId(LOGIN_PAGE_RANKING_BUTTON_ID);
    const settingsButton = screen.queryByTestId(LOGIN_PAGE_SETTINGS_BUTTON_ID);

    expect(logo).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(languageSelector).toBeInTheDocument();
    expect(startButton).toBeInTheDocument();
    expect(rankingButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  it("Handles input changes correctly", async () => {
    const { user } = renderWithRouter(["/"]);

    const nameInput = screen.getByTestId(LOGIN_PAGE_NAME_INPUT_ID);
    const emailInput = screen.getByTestId(LOGIN_PAGE_EMAIL_INPUT_ID);
    const playButton = screen.getByTestId(LOGIN_PAGE_PLAY_BUTTON_ID);

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(playButton).toBeDisabled();

    await act(async () => {
      await user.type(nameInput, VALID_NAME);
      await user.type(emailInput, VALID_EMAIL);
    });

    expect(nameInput).toHaveValue(VALID_NAME);
    expect(emailInput).toHaveValue(VALID_EMAIL);
    expect(playButton).toBeEnabled();

    await act(async () => {
      await user.clear(nameInput);
      await user.clear(emailInput);
    });

    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(playButton).toBeDisabled();
  });

  it("Navigate to ranking page when clicking in the ranking button", async () => {
    const { user } = renderWithRouter(["/", "/ranking"]);

    const rankingButton = screen.getByTestId(LOGIN_PAGE_RANKING_BUTTON_ID);

    expect(rankingButton).toHaveAttribute("href", "/ranking");

    await act(async () => {
      await user.click(rankingButton);
    });

    const rankingPage = screen.queryByTestId(RANKING_PAGE_ID);
    const loginPage = screen.queryByTestId(LOGIN_PAGE_ID);

    expect(rankingPage).toBeInTheDocument();
    expect(loginPage).not.toBeInTheDocument();
  });

  it("Navigate to settings page when clicking in the settings button", async () => {
    const { user } = renderWithRouter(["/", "/settings"]);

    const settingsButton = screen.getByTestId(LOGIN_PAGE_SETTINGS_BUTTON_ID);

    expect(settingsButton).toHaveAttribute("href", "/settings");

    await act(async () => {
      await user.click(settingsButton);
    });

    const settingsPage = screen.queryByTestId(SETTINGS_PAGE_ID);
    const loginPage = screen.queryByTestId(LOGIN_PAGE_ID);

    expect(settingsPage).toBeInTheDocument();
    expect(loginPage).not.toBeInTheDocument();
  });

  it("Shows an toast error when there is an error on retriving the player token", async () => {
    vi.spyOn(triviaService, "getTriviaToken").mockRejectedValue(new Error());

    const { user } = renderWithRouter(["/"]);

    const nameInput = screen.getByTestId(LOGIN_PAGE_NAME_INPUT_ID);
    const emailInput = screen.getByTestId(LOGIN_PAGE_EMAIL_INPUT_ID);
    const playButton = screen.getByTestId(LOGIN_PAGE_PLAY_BUTTON_ID);

    await act(async () => {
      await user.type(nameInput, VALID_NAME);
      await user.type(emailInput, VALID_EMAIL);
    });

    await act(async () => {
      await user.click(playButton);
    });

    await screen.findByTestId(TOAST_COMPONENT_ERROR_ICON_ID);
    const errorMessage = screen.queryByText(/error/i);

    expect(errorMessage).toBeInTheDocument();
  });

  it("Sets player data globally and navigate to /game", async () => {
    vi.spyOn(triviaService, "getTriviaToken").mockResolvedValue(
      GET_TOKEN_SUCCESS
    );
    vi.spyOn(gravatarService, "getAvatarImg").mockResolvedValue(bear);

    const { user, store } = renderWithRouter(["/"]);

    const nameInput = screen.getByTestId(LOGIN_PAGE_NAME_INPUT_ID);
    const emailInput = screen.getByTestId(LOGIN_PAGE_EMAIL_INPUT_ID);
    const playButton = screen.getByTestId(LOGIN_PAGE_PLAY_BUTTON_ID);

    await act(async () => {
      await user.type(nameInput, VALID_NAME);
      await user.type(emailInput, VALID_EMAIL);
    });

    await act(async () => {
      await user.click(playButton);
    });

    const playerState = store.getState().player;

    expect(playerState.name).toEqual(VALID_NAME);
    expect(playerState.gravatarImgSrc).not.toEqual("");
    expect(mockNavigate).toHaveBeenCalledOnce();
    expect(mockNavigate).toHaveBeenCalledWith("/game");
  });
});
