import { Bounce, ToastContainerProps } from "react-toastify";
import { StyledToastContainer } from "./style";
import "react-toastify/ReactToastify.min.css";

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
      {...props}
    />
  );
}
