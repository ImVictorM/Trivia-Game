import { closeIcon, straightCheckIcon } from "@/assets/icons";
import { StyledDialog, StyledDialogOverlay } from "./style";
import Button from "../Button";
import { useTranslation } from "react-i18next";

export type DialogProps = {
  show: boolean;
  title: string;
  bodyMessage: string;
  onConfirm?: () => void;
  onClose?: () => void;
};

export default function Dialog({
  show,
  bodyMessage,
  onConfirm,
  title,
  onClose,
}: DialogProps) {
  const { t } = useTranslation();
  return (
    <>
      {show && (
        <StyledDialogOverlay>
          <StyledDialog>
            <header className="header">
              <h1 className="title">{title}</h1>
              <button className="close" onClick={onClose}>
                <img src={closeIcon} alt="close" />
              </button>
            </header>

            <div className="content">
              <p className="text">{bodyMessage}</p>

              <div className="buttons-wrapper">
                <Button
                  color="red"
                  onClick={onClose}
                  icon={{ src: closeIcon, alt: "check" }}
                >
                  {t("cancel")}
                </Button>
                <Button
                  color="green"
                  onClick={onConfirm}
                  icon={{ src: straightCheckIcon, alt: "check" }}
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
