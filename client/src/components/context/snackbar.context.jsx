import { createContext, useEffect, useState } from "react";
import SnackBar from "../feedback/snackbar/snackbar.component";

export const SnackBarContext = createContext({
  feedback: [0, 0, ""],
  setFeedback: () => {},
});

export const SnackbarProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([0, 0, ""]);

  const value = { feedback, setFeedback };

  useEffect(() => {
    console.log("FEEDBACK TRIGGERED");
    if (feedback[0] !== 0 || feedback[1] !== 0 || feedback[2] !== "") {
      setTimeout(() => {
        console.log("Closing Snackbar");
        setFeedback([0, 0, ""]);
      }, 5000);
    }
  }, [feedback]);
  return (
    <>
      <SnackBarContext.Provider value={value}>
        {children}
      </SnackBarContext.Provider>
      <SnackBar feedback={feedback} />
    </>
  );
};
