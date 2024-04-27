import LinkButton from ".";
import { screen } from "@testing-library/react";
import { star } from "@/assets/icons";
import { renderWithProviders } from "@/tests/utils/";

describe("LinkButton component", () => {
  it("Renders correctly with minimal options", () => {
    renderWithProviders(
      <LinkButton color="green" to="/">
        Click me
      </LinkButton>
    );

    const link = screen.queryByRole("link", { name: /click me/i });

    expect(link).toBeInTheDocument();
  });

  it("Renders correctly with an icon", () => {
    renderWithProviders(
      <LinkButton color="green" to="/" icon={{ src: star, alt: "star" }}>
        Click me
      </LinkButton>
    );

    const link = screen.getByRole("link", { name: /click me/i });
    const icon = screen.getByRole("img", { name: "star" });

    expect(link).toContainElement(icon);
  });

  it("Can extend styles through parent className", () => {
    renderWithProviders(
      <LinkButton
        className="style"
        color="green"
        to="/"
        icon={{ src: star, alt: "star" }}
      >
        Click me
      </LinkButton>
    );
    const link = screen.getByRole("link", { name: /click me/i });

    expect(link.parentElement).toHaveClass("style");
  });
});
