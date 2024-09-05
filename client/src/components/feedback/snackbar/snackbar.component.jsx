import { useEffect, useState } from "react";
import "./snackbar.styles.css";

const SnackBar = ({ feedback }) => {
  const [feedbackArray, setFeedbackArray] = useState([0, 0, ""]);

  const handleOpen = () => {
    if (feedbackArray[0] === 1) return true;
    else return false;
  };

  const handleSeverity = () => {
    switch (feedbackArray[1]) {
      case 1:
        return "success";
      case 2:
        return "danger";

      default:
        return "info";
    }
  };

  useEffect(() => {
    setFeedbackArray(feedback);
  }, [feedback]);

  return (
    <div
      className={`snackbar z-50 bg-${handleSeverity()} ${
        handleOpen() && "pop-snackbar"
      }`}
    >
      <p>{feedbackArray[2]}</p>
    </div>
  );
};

export default SnackBar;
