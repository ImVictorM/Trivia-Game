import { renderWithTheme } from "@/tests/utils";
import Input from ".";
import { screen } from "@testing-library/react";

describe("Input component", () => {
  it("Renders correctly with value", () => {
    renderWithTheme(
      <Input label="Enter your name" id="name" value="victor" readOnly />
    );

    const input = screen.getByRole("textbox", { name: /enter your name/i });

    expect(input).toHaveValue("victor");
  });

  it("Renders correctly with empty value", () => {
    renderWithTheme(
      <Input label="Enter your name" id="name" value="" readOnly />
    );

    const input = screen.getByRole("textbox", { name: /enter your name/i });

    expect(input).toHaveValue("");
  });
});
