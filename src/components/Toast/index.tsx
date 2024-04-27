import { Bounce, ToastContainerProps } from "react-toastify";
import { StyledToastContainer } from "./style";
import "react-toastify/ReactToastify.min.css";
import { roundedCheckIcon, errorIcon } from "@/assets/icons";
import { useTranslation } from "react-i18next";
import {
  TOAST_COMPONENT_ERROR_ICON_ID,
  TOAST_COMPONENT_SUCCESS_ICON_ID,
} from "./testId";

export default function Toast(props: ToastContainerProps) {
  const { t } = useTranslation();

  return (
    <StyledToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Bounce}
      icon={({ type }) => {
        switch (type) {
          case "error":
            return (
              <img
                src={errorIcon}
                data-testid={TOAST_COMPONENT_ERROR_ICON_ID}
                alt={t("error")}
              />
            );
          case "success":
            return (
              <img
                src={roundedCheckIcon}
                data-testid={TOAST_COMPONENT_SUCCESS_ICON_ID}
                alt={t("success")}
              />
            );
        }
      }}
      {...props}
    />
  );
}
