import { useContext } from "react";
import { ToastContext } from "../contexts/toast.context";

const useFeedback = () => {
  const { showToast } = useContext(ToastContext);
  const setFeedback = (severity = 4, message = "", duration = 5) => {
    if (typeof message === "string") message = { message };
    showToast({
      message: message.message,
      severity,
      duration: duration * 1000,
    });
  };
  return setFeedback;
};

export default useFeedback;
