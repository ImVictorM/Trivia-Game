import { act, screen } from "@testing-library/react";
import Button, { BUTTON_COMPONENT_ID } from ".";
import { renderWithProviders } from "@/tests/utils";

import { star } from "@/assets/icons";
import { DIALOG_COMPONENT_ID } from "../Dialog";

describe("Button component", () => {
  const defaultLoadingText = "Loading...";

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Renders correctly with minimal configuration", () => {
    renderWithProviders(<Button color="green">Click me</Button>);

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);

    const loadingIcon = screen.queryByRole("img", { name: /loading/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Click me/i);
    expect(button).not.toContainElement(loadingIcon);
  });

  it("Renders loading with default loading text", () => {
    renderWithProviders(
      <Button isLoading={true} color="green">
        Click me
      </Button>
    );

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);
    const loadingIcon = screen.getByRole("img", { name: /loading/i });

    expect(button).not.toHaveTextContent(/Click me/i);
    expect(button).toHaveTextContent(defaultLoadingText);
    expect(button).toContainElement(loadingIcon);
  });

  it("Renders loading with custom loading text", () => {
    renderWithProviders(
      <Button loadingText="It is loading now" isLoading={true} color="green">
        Click me
      </Button>
    );

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);
    const loadingIcon = screen.getByRole("img", { name: /loading/i });

    expect(button).toHaveTextContent(/It is loading now/i);
    expect(button).not.toHaveTextContent(/Click me/i);
    expect(button).not.toHaveTextContent(defaultLoadingText);
    expect(button).toContainElement(loadingIcon);
  });

  it("Renders correctly with a custom icon", () => {
    const customIconName = "custom icon";
    renderWithProviders(
      <Button icon={{ alt: customIconName, src: star }} color="green">
        Click me
      </Button>
    );

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);
    const customIcon = screen.getByRole("img", { name: customIconName });

    expect(button).toContainElement(customIcon);
  });

  it("Does not renders the custom icon when is loading", () => {
    const customIconName = "custom icon";
    renderWithProviders(
      <Button
        isLoading={true}
        icon={{ alt: customIconName, src: star }}
        color="green"
      >
        Click me
      </Button>
    );

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);
    const customIcon = screen.queryByRole("img", { name: customIconName });

    expect(button).not.toContainElement(customIcon);
  });

  it("Opens a dialog when dialog option is defined", async () => {
    const { user } = renderWithProviders(
      <Button
        dialog={{ bodyMessage: "dialog message", title: "dialog" }}
        color="green"
      >
        Click me
      </Button>
    );

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);

    await act(async () => {
      await user.click(button);
    });

    const dialog = screen.getByTestId(DIALOG_COMPONENT_ID);
    expect(dialog).toBeInTheDocument();
  });

  it("Does not open a dialog when option is undefined and fire onClick", async () => {
    const onClickMock = vi.fn();
    const { user } = renderWithProviders(
      <Button color="green" onClick={onClickMock}>
        Click me
      </Button>
    );

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);

    await act(async () => {
      await user.click(button);
    });

    const dialog = screen.queryByTestId(DIALOG_COMPONENT_ID);
    expect(dialog).not.toBeInTheDocument();
    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it("Can extend styles through parent className", () => {
    renderWithProviders(
      <Button color="green" className="style">
        Click me
      </Button>
    );

    const button = screen.getByTestId(BUTTON_COMPONENT_ID);

    expect(button.parentElement).toHaveClass("style");
  });
});
