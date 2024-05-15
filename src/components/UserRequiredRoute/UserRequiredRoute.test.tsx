import { renderWithRouter } from "@/tests/utils";
import UserRequiredRoute from ".";
import { ExtendedRenderOptions } from "@/tests/utils/renderWithProviders";
import { bear } from "@/assets/defaultAvatars";
import { screen } from "@testing-library/react";

describe("UserRequiredRoute component", () => {
  const renderComponent = (options?: ExtendedRenderOptions) => {
    return renderWithRouter(
      [
        {
          path: "/initial",
          element: (
            <UserRequiredRoute>
              <div data-testid="component-to-render"></div>
            </UserRequiredRoute>
          ),
        },
        { path: "/", element: <div data-testid="root"></div> },
      ],
      ["/initial", "/"],
      0,
      options
    );
  };

  it("Renders the children component if the player data exists", () => {
    renderComponent({
      preloadedState: {
        player: {
          name: "player 1",
          gravatarImgSrc: bear,
          assertions: 0,
          score: 0,
          token: "token",
        },
      },
    });

    expect(screen.queryByTestId("component-to-render")).toBeInTheDocument();
    expect(screen.queryByTestId("root")).not.toBeInTheDocument();
  });

  it("Navigates to / if player data doesn't exist", () => {
    renderComponent();

    expect(screen.queryByTestId("component-to-render")).not.toBeInTheDocument();
    expect(screen.queryByTestId("root")).toBeInTheDocument();
  });
});
