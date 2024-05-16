import { renderWithProviders } from "@/tests/utils";
import Toast, {
  TOAST_COMPONENT_ERROR_ICON_ID,
  TOAST_COMPONENT_SUCCESS_ICON_ID,
} from ".";
import { toast } from "react-toastify";
import { act, screen } from "@testing-library/react";

describe("Toast component", async () => {
  it("Render the correctly icon if the toast type is error", () => {
    renderWithProviders(<Toast />);

    act(() => {
      toast.error("some error");
    });

    const errorIcon = screen.queryByTestId(TOAST_COMPONENT_ERROR_ICON_ID);
    const errorMessage = screen.queryByText(/some error/i);

    expect(errorIcon).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it("Render the correctly icon if the toast type is success", () => {
    renderWithProviders(<Toast />);

    act(() => {
      toast.success("success message");
    });

    const successIcon = screen.queryByTestId(TOAST_COMPONENT_SUCCESS_ICON_ID);
    const successMessage = screen.queryByText(/success message/i);

    expect(successIcon).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
  });
});
