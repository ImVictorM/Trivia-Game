import { renderWithProviders } from "@/tests/utils";
import LanguageSelector, { LANGUAGE_SELECTOR_COMPONENT_ID } from ".";
import { act, screen } from "@testing-library/react";
import { constants } from "@/utils";

describe("Login page: Language component", () => {
  it("Renders correctly", () => {
    renderWithProviders(<LanguageSelector />);

    const select = screen.queryByTestId(LANGUAGE_SELECTOR_COMPONENT_ID);
    const options = screen.queryAllByRole("option");

    expect(select).toBeInTheDocument();

    expect(options).toHaveLength(2);

    options.forEach((option) => {
      const optionValue = option.getAttribute("value");
      const language = constants.LANGUAGES.find(
        ({ code }) => code === optionValue
      );
      expect(language).not.toBeUndefined();
      expect(option).toHaveTextContent(language!.name);
    });
  });

  it("Renders with default value of en (english)", () => {
    renderWithProviders(<LanguageSelector />, {
      preloadedState: { language: { code: "en" } },
    });

    const select = screen.getByTestId(LANGUAGE_SELECTOR_COMPONENT_ID);

    expect(select).toHaveValue("en");
  });

  it("Sets the language code globally", async () => {
    const { store, user } = renderWithProviders(<LanguageSelector />, {
      preloadedState: { language: { code: "en" } },
    });

    const select = screen.getByTestId(LANGUAGE_SELECTOR_COMPONENT_ID);

    await act(async () => {
      await user.selectOptions(select, "pt-BR");
    });

    expect(select).toHaveValue("pt-BR");
    expect(store.getState().language.code).toEqual("pt-BR");
  });
});
