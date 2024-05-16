import { renderWithProviders } from "@/tests/utils";
import Select from ".";
import { screen } from "@testing-library/react";

describe("Select component", () => {
  it("Can render correctly with a label", () => {
    renderWithProviders(
      <Select id="categories" label="Category" name="categories">
        <option>Category 1</option>
      </Select>
    );

    const select = screen.queryByRole("combobox", {
      name: /category/i,
    });

    expect(select).toBeInTheDocument();
  });

  it("Can render correctly without a label", () => {
    renderWithProviders(
      <Select id="options" name="options">
        <option>Option 1</option>
      </Select>
    );

    const select = screen.queryByRole("combobox");

    expect(select).toBeInTheDocument();
  });
});
