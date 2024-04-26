import { renderWithTheme } from "@/tests/utils";
import Dialog from ".";
import { screen } from "@testing-library/react";
import {
  DIALOG_COMPONENT_CLOSE_BUTTON_ID,
  DIALOG_COMPONENT_ID,
  DIALOG_COMPONENT_OVERLAY_ID,
} from "./testId";

describe("Dialog component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Does not show when the option show is false", () => {
    renderWithTheme(
      <Dialog show={false} bodyMessage="Hello!" title="Testing the dialog" />
    );

    const dialog = screen.queryByTestId(DIALOG_COMPONENT_ID);

    expect(dialog).not.toBeInTheDocument();
  });

  it("Does show when the show option is true", () => {
    renderWithTheme(
      <Dialog show={true} bodyMessage="Hello!" title="Testing the dialog" />
    );

    const dialog = screen.queryByTestId(DIALOG_COMPONENT_ID);

    expect(dialog).toBeInTheDocument();
  });

  it("Renders correctly when show options is true", () => {
    renderWithTheme(
      <Dialog show={true} bodyMessage="Hello!" title="Testing the dialog" />
    );

    const title = screen.queryByRole("heading", {
      name: /testing the dialog/i,
    });
    const bodyMessage = screen.queryByText(/hello!/i);
    const confirmButton = screen.queryByRole("button", { name: /confirm/i });
    const cancelButton = screen.queryByRole("button", { name: /cancel/i });
    const closeButton = screen.queryByTestId(DIALOG_COMPONENT_CLOSE_BUTTON_ID);

    expect(title).toBeInTheDocument();
    expect(bodyMessage).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  it("Fires the close method correctly when pressing cancel", async () => {
    const onCloseMock = vi.fn();
    const { user } = renderWithTheme(
      <Dialog
        show={true}
        bodyMessage="Hello!"
        title="Testing the dialog"
        onClose={onCloseMock}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    await user.click(cancelButton);

    expect(onCloseMock).toHaveBeenCalledOnce();
  });

  it('Fires the close method correctly when pressing "X" button', async () => {
    const onCloseMock = vi.fn();

    const { user } = renderWithTheme(
      <Dialog
        show={true}
        bodyMessage="Hello!"
        title="Testing the dialog"
        onClose={onCloseMock}
      />
    );

    const closeButton = screen.getByTestId(DIALOG_COMPONENT_CLOSE_BUTTON_ID);

    await user.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledOnce();
  });

  it("Fires the close method correctly when clicking outside the dialog", async () => {
    const onCloseMock = vi.fn();

    const { user } = renderWithTheme(
      <Dialog
        show={true}
        bodyMessage="Hello!"
        title="Testing the dialog"
        onClose={onCloseMock}
      />
    );

    const dialogOverlay = screen.getByTestId(DIALOG_COMPONENT_OVERLAY_ID);

    await user.click(dialogOverlay);

    expect(onCloseMock).toHaveBeenCalledOnce();
  });

  it("Fires the confirm method when pressing the confirm button", async () => {
    const onConfirmMock = vi.fn();

    const { user } = renderWithTheme(
      <Dialog
        show={true}
        bodyMessage="Hello!"
        title="Testing the dialog"
        onClose={() => {}}
        onConfirm={onConfirmMock}
      />
    );

    const confirmButton = screen.getByRole("button", { name: /confirm/i });

    await user.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledOnce();
  });
});
