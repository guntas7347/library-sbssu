import { useContext } from "react";
import { ToastContext } from "../contexts/toast.context";

const useFeedback = () => {
  const { setFeedback: sf } = useContext(ToastContext);
  const setFeedback = (s = 3, m) => {
    if (typeof m === "string") sf([1, s, m]);
    else sf([1, s, m.message]);
  };
  return setFeedback;
};

export default useFeedback;
