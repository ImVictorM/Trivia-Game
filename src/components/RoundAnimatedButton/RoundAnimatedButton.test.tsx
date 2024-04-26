import { renderWithTheme } from "@/tests/utils";
import RoundAnimatedButton from ".";
import { star } from "@/assets/icons";
import { act, screen } from "@testing-library/react";
import { DIALOG_COMPONENT_ID } from "../Dialog/testId";

describe("RoundAnimatedButton component", () => {
  it("Renders correctly", async () => {
    renderWithTheme(
      <RoundAnimatedButton
        icon={{ src: star, alt: "star" }}
        text="Round button"
        color="green"
      />
    );

    const button = screen.getByRole("button");
    const icon = screen.getByRole("img", { name: "star" });

    expect(button).toContainElement(icon);
    expect(button).toHaveTextContent(/Round button/i);
  });

  it("Opens a dialog when dialog option is defined", async () => {
    const { user } = renderWithTheme(
      <RoundAnimatedButton
        icon={{ src: star, alt: "star" }}
        text="Round button"
        dialog={{ bodyMessage: "dialog message", title: "dialog" }}
        color="green"
      />
    );

    const button = screen.getByRole("button");

    await act(async () => {
      await user.click(button);
    });

    const dialog = screen.getByTestId(DIALOG_COMPONENT_ID);
    expect(dialog).toBeInTheDocument();
  });

  it("Does not open a dialog when option is undefined and fire onClick", async () => {
    const onClickMock = vi.fn();
    const { user } = renderWithTheme(
      <RoundAnimatedButton
        icon={{ src: star, alt: "star" }}
        text="Round button"
        color="green"
        onClick={onClickMock}
      />
    );

    const button = screen.getByRole("button");

    await act(async () => {
      await user.click(button);
    });

    const dialog = screen.queryByTestId(DIALOG_COMPONENT_ID);
    expect(dialog).not.toBeInTheDocument();
    expect(onClickMock).toHaveBeenCalledOnce();
  });

  it("Can extend styles through parent className", () => {
    renderWithTheme(
      <RoundAnimatedButton
        icon={{ src: star, alt: "star" }}
        text="Round button"
        dialog={{ bodyMessage: "dialog message", title: "dialog" }}
        color="green"
        className="style"
      />
    );

    const button = screen.getByRole("button");

    expect(button.parentElement).toHaveClass("style");
  });
});
