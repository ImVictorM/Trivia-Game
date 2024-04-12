import { ToastContainerProps } from "react-toastify";
import { StyledToastContainer } from "./style";
import "react-toastify/ReactToastify.min.css";

export default function Toast(props: ToastContainerProps) {
  return <StyledToastContainer {...props} />;
}
