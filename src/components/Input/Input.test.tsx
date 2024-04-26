import { renderWithTheme } from "@/tests/utils";
import Input from ".";
import { screen } from "@testing-library/react";

describe("Input component", () => {
  it("Renders correctly", () => {
    renderWithTheme(<Input label="Enter your name" id="name" value="victor" />);

    const input = screen.getByRole("textbox", { name: /enter your name/i });

    expect(input).toHaveValue("victor");
  });
});
