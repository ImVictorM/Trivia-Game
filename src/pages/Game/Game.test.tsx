import { renderWithRouter } from "@/tests/utils";

import * as triviaService from "@/services/triviaApi";
import * as utils from "@/utils";
import * as translateService from "@/services/googleTranslateApi";
import {
  GET_QUESTIONS_SUCCESS,
  GET_QUESTION_UNMAPPED,
} from "@/tests/mocks/triviaApi";
import { bear } from "@/assets/defaultAvatars";
import { act, waitForElementToBeRemoved } from "@testing-library/react";
import { screen } from "@testing-library/react";
import { GAME_LOADING_COMPONENT_ID } from "./Loading";
import Game, {
  GAME_PAGE_ID,
  GAME_PAGE_NEXT_BUTTON_ID,
  GAME_PAGE_OPTIONS_ID,
  GAME_PAGE_END_MATCH_BUTTON_ID,
  GAME_PAGE_SURRENDER_BUTTON_ID,
} from ".";
import {
  GAME_QUESTION_CARD_COMPONENT_CATEGORY_ID,
  GAME_QUESTION_CARD_COMPONENT_COUNTDOWN_ID,
  GAME_QUESTION_CARD_COMPONENT_ID,
  GAME_QUESTION_CARD_COMPONENT_TEXT_ID,
} from "./QuestionCard";
import { GAME_ERROR_COMPONENT_ID } from "./GameError";
import { ANSWER_BUTTON_COMPONENT_ID } from "./AnswerButton";
import { sizes } from "@/styles/breakpoints";
import { DIALOG_COMPONENT_CONFIRM_BUTTON_ID } from "@/components/Dialog";
import { RootState } from "@/redux/store";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const original = (await importOriginal()) as object;
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("Game page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  const initialPreloadedState: Partial<RootState> = {
    player: {
      assertions: 0,
      gravatarImgSrc: bear,
      name: "victor f",
      score: 0,
      token: "token",
    },
    language: { code: "en" },
  };

  type RenderOptions = {
    onBeforeRender?: () => void;
    preloadedState?: Partial<RootState>;
  };

  const renderAndWithForLoading = async (options?: RenderOptions) => {
    vi.stubGlobal("innerWidth", sizes.desktopM);

    if (options && options.onBeforeRender) {
      options.onBeforeRender();
    }

    const render = renderWithRouter(
      [
        {
          path: "/game",
          element: <Game />,
        },
      ],
      ["/game"],
      0,
      { preloadedState: options?.preloadedState || initialPreloadedState }
    );

    await waitForElementToBeRemoved(() =>
      screen.getByTestId(GAME_LOADING_COMPONENT_ID)
    );

    return render;
  };

  it("Renders correctly when there is no error", async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );
    const { store } = await renderAndWithForLoading();

    await screen.findByTestId(GAME_PAGE_ID);

    const remainingTime = screen.getByTestId(
      GAME_QUESTION_CARD_COMPONENT_COUNTDOWN_ID
    );
    const errorComponent = screen.queryByTestId(GAME_ERROR_COMPONENT_ID);
    const nextButton = screen.queryByTestId(GAME_PAGE_NEXT_BUTTON_ID);
    const category = screen.getByTestId(
      GAME_QUESTION_CARD_COMPONENT_CATEGORY_ID
    );
    const question = screen.getByTestId(GAME_QUESTION_CARD_COMPONENT_TEXT_ID);
    const answers = screen.getAllByTestId(ANSWER_BUTTON_COMPONENT_ID);

    const firstQuestion = GET_QUESTIONS_SUCCESS.results[0];

    screen.getByTestId(GAME_PAGE_OPTIONS_ID);
    screen.getByTestId(GAME_QUESTION_CARD_COMPONENT_ID);
    screen.getByTestId(GAME_PAGE_SURRENDER_BUTTON_ID);
    screen.getByTestId(GAME_PAGE_END_MATCH_BUTTON_ID);

    expect(question).toHaveTextContent(firstQuestion.question);
    expect(errorComponent).not.toBeInTheDocument();
    expect(nextButton).not.toBeInTheDocument();
    expect(remainingTime).toHaveTextContent("30");
    expect(category).toHaveTextContent(firstQuestion.category);

    const expectedAnswers = [
      firstQuestion.correct_answer,
      ...firstQuestion.incorrect_answers,
    ];

    expectedAnswers.forEach((answer) => {
      const answerInScreen = answers.find((a) =>
        a.textContent?.includes(answer)
      );
      expect(answerInScreen).not.toBeUndefined();
    });

    const player = store.getState().player;
    expect(player.assertions).toEqual(0);
    expect(player.score).toEqual(0);
  });

  it("Renders the GameError component when there is an error fetching the questions", async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTION_UNMAPPED
    );
    await renderAndWithForLoading();

    const game = screen.queryByTestId(GAME_PAGE_ID);
    const gameError = screen.queryByTestId(GAME_ERROR_COMPONENT_ID);

    expect(game).not.toBeInTheDocument();
    expect(gameError).toBeInTheDocument();
  });

  it('Shows the "next" button when selecting an answer', async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );
    const { user } = await renderAndWithForLoading();

    const answers = screen.getAllByTestId(ANSWER_BUTTON_COMPONENT_ID);

    expect(answers).toHaveLength(4);

    const answerToClick = answers[0];

    expect(answerToClick).toBeEnabled();

    await act(async () => {
      await user.click(answerToClick);
    });

    screen.getByTestId(GAME_PAGE_NEXT_BUTTON_ID);
  });

  it("Doesn't render surrender and end match buttons when screen is small", async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );
    await renderAndWithForLoading({
      onBeforeRender: () => {
        vi.stubGlobal("innerWidth", sizes.mobileS);
      },
    });

    const surrenderBtn = screen.queryByTestId(GAME_PAGE_SURRENDER_BUTTON_ID);
    const endMatchBtn = screen.queryByTestId(GAME_PAGE_END_MATCH_BUTTON_ID);

    expect(surrenderBtn).not.toBeInTheDocument();
    expect(endMatchBtn).not.toBeInTheDocument();
  });

  it("Navigates to /feedback when clicking to end game", async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );
    const { user } = await renderAndWithForLoading();

    const endMatchBtn = screen.getByTestId(GAME_PAGE_END_MATCH_BUTTON_ID);

    await act(async () => {
      await user.click(endMatchBtn);
    });

    const dialogConfirmButton = screen.getByTestId(
      DIALOG_COMPONENT_CONFIRM_BUTTON_ID
    );

    await act(async () => {
      await user.click(dialogConfirmButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/feedback");
  });

  it("Navigates to / when clicking the surrender button", async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );
    const { user } = await renderAndWithForLoading();

    const surrenderBtn = screen.getByTestId(GAME_PAGE_SURRENDER_BUTTON_ID);

    await act(async () => {
      await user.click(surrenderBtn);
    });

    const dialogConfirmButton = screen.getByTestId(
      DIALOG_COMPONENT_CONFIRM_BUTTON_ID
    );

    await act(async () => {
      await user.click(dialogConfirmButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("Updates player stats globally when getting an answer correctly", async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );
    vi.spyOn(utils, "calculateScore").mockReturnValueOnce(100);
    const { user, store } = await renderAndWithForLoading();

    const correctAnswer = screen
      .getAllByTestId(ANSWER_BUTTON_COMPONENT_ID)
      .find((button) =>
        button.textContent?.includes(
          GET_QUESTIONS_SUCCESS.results[0].correct_answer
        )
      );

    expect(correctAnswer).toBeInTheDocument();

    await act(async () => {
      await user.click(correctAnswer!);
    });

    expect(store.getState().player.assertions).toEqual(1);
    expect(store.getState().player.score).toEqual(100);
  });

  it("Activates the translate method when language is set to pt-BR", async () => {
    const translateSpy = vi.spyOn(translateService, "tryToTranslate");
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );

    await renderAndWithForLoading({
      preloadedState: {
        ...initialPreloadedState,
        language: { code: "pt-BR" },
      },
    });

    await act(async () => {
      expect(translateSpy).toHaveBeenCalledOnce();
    });
  });

  it("Changes to the next questions correctly", async () => {
    vi.spyOn(triviaService, "getTriviaQuestions").mockResolvedValue(
      GET_QUESTIONS_SUCCESS
    );
    const { user } = await renderAndWithForLoading();

    const firstAnswers = screen.getAllByTestId(ANSWER_BUTTON_COMPONENT_ID)[0];

    await act(async () => {
      await user.click(firstAnswers);
    });

    const nextButton = screen.getByTestId(GAME_PAGE_NEXT_BUTTON_ID);

    await act(async () => {
      await user.click(nextButton);
    });

    const remainingTime = screen.getByTestId(
      GAME_QUESTION_CARD_COMPONENT_COUNTDOWN_ID
    );

    const category = screen.getByTestId(
      GAME_QUESTION_CARD_COMPONENT_CATEGORY_ID
    );
    const question = screen.getByTestId(GAME_QUESTION_CARD_COMPONENT_TEXT_ID);
    const answers = screen.getAllByTestId(ANSWER_BUTTON_COMPONENT_ID);

    const firstQuestion = GET_QUESTIONS_SUCCESS.results[0];
    const secondQuestion = GET_QUESTIONS_SUCCESS.results[1];

    const firstQuestionAnswers = [
      firstQuestion.correct_answer,
      ...firstQuestion.incorrect_answers,
    ];

    const secondQuestionAnswers = [
      secondQuestion.correct_answer,
      ...secondQuestion.incorrect_answers,
    ];

    expect(question).not.toHaveTextContent(firstQuestion.question);
    expect(question).toHaveTextContent(secondQuestion.question);
    expect(category).not.toHaveTextContent(firstQuestion.category);
    expect(category).toHaveTextContent(secondQuestion.category);
    expect(remainingTime).toHaveTextContent("30");

    expect(nextButton).not.toBeInTheDocument();

    firstQuestionAnswers.forEach((answer) => {
      const answerInScreen = answers.find((a) =>
        a.textContent?.includes(answer)
      );
      expect(answerInScreen).toBeUndefined();
    });

    secondQuestionAnswers.forEach((answer) => {
      const answerInScreen = answers.find((a) =>
        a.textContent?.includes(answer)
      );
      expect(answerInScreen).not.toBeUndefined();
    });
  });

  // it("Resets the token when session Token has returned all possible questions for the specified query", async () => {});

  // it("Navigates to / when token is not found", async () => {});

  // it("Tries to fetch questions again if api returns a rate limit response", async () => {});

  // it("Renders error component when an invalid parameter error is returned from the api", async () => {});

  // it("Renders error component when some unexpected error is returned from the api", async () => {});

  // it("Changes to next question when pressing Enter after selecting an answer", async () => {});
});
