import { Bounce, ToastContainerProps } from "react-toastify";
import { StyledToastContainer } from "./style";
import "react-toastify/ReactToastify.min.css";
import { roundedCheckIcon, errorIcon } from "@/assets/icons";

export default function Toast(props: ToastContainerProps) {
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
            return <img src={errorIcon} />;
          case "success":
            return <img src={roundedCheckIcon} />;
        }
      }}
      {...props}
    />
  );
}
