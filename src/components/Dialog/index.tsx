import { closeIcon, straightCheckIcon } from "@/assets/icons";
import { StyledDialog, StyledDialogOverlay } from "./style";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import { useDelayedUnmount } from "@/hooks";

export type DialogProps = {
  show: boolean;
  title: string;
  bodyMessage: string;
  onConfirm?: () => void;
  onClose?: () => void;
};

export const DIALOG_COMPONENT_ID = "dialog-element";
export const DIALOG_COMPONENT_CLOSE_BUTTON_ID = "dialog-element-close-button";
export const DIALOG_COMPONENT_CANCEL_BUTTON_ID = "dialog-element-cancel-button";
export const DIALOG_COMPONENT_CONFIRM_BUTTON_ID =
  "dialog-element-confirm-button";
export const DIALOG_COMPONENT_OVERLAY_ID = "dialog-element-overlay";

export default function Dialog({
  show,
  bodyMessage,
  onConfirm,
  title,
  onClose,
}: DialogProps) {
  const { t } = useTranslation();
  const { shouldRender } = useDelayedUnmount(show, 100);

  return (
    <>
      {shouldRender && (
        <StyledDialogOverlay
          data-testid={DIALOG_COMPONENT_OVERLAY_ID}
          onClick={onClose}
        >
          <StyledDialog
            $shouldAnimateOut={!show}
            data-testid={DIALOG_COMPONENT_ID}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="header">
              <h1 className="title">{title}</h1>
              <button
                data-testid={DIALOG_COMPONENT_CLOSE_BUTTON_ID}
                className="close"
                onClick={onClose}
              >
                <img src={closeIcon} alt={t("close")} />
              </button>
            </header>

            <div className="content">
              <p className="text">{bodyMessage}</p>

              <div className="buttons-wrapper">
                <Button
                  color="red"
                  onClick={onClose}
                  icon={{ src: closeIcon, alt: t("close") }}
                  data-testid={DIALOG_COMPONENT_CANCEL_BUTTON_ID}
                >
                  {t("cancel")}
                </Button>
                <Button
                  color="green"
                  onClick={onConfirm}
                  data-testid={DIALOG_COMPONENT_CONFIRM_BUTTON_ID}
                  icon={{ src: straightCheckIcon, alt: t("check") }}
                >
                  {t("confirm")}
                </Button>
              </div>
            </div>
          </StyledDialog>
        </StyledDialogOverlay>
      )}
    </>
  );
}
