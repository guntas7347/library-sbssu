import { createContext, useEffect, useState } from "react";
import SnackBar from "../feedback/snackbar/snackbar.component";

export const SnackBarContext = createContext({
  feedback: [0, 0, ""],
  setFeedback: () => {},
});

export const SnackbarProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([0, 0, ""]);

  const [feedbackArray, setFeedbackArray] = useState([]);

  const value = { feedback, setFeedback };

  const doesFeedbackExists =
    feedback[0] !== 0 || feedback[1] !== 0 || feedback[2] !== "";

  useEffect(() => {
    if (doesFeedbackExists)
      setFeedbackArray(() => [...feedbackArray, feedback]);
  }, [feedback]);

  useEffect(() => {
    if (feedbackArray.length > 0) {
      const timer = setTimeout(
        () => setFeedbackArray(() => feedbackArray.slice(1)),
        5000
      );
      return () => clearTimeout(timer);
    }
  }, [feedbackArray]);

  const checkArraysEquality = (array1, array2) => {
    if (array1.length !== array2.length) return false;
    for (let index = 0; index < array1.length; index++)
      if (array1[index] !== array2[index]) return false;
    return true;
  };

  const handleClose = (index) => {
    let newArr = [
      ...feedbackArray.slice(0, index),
      ...feedbackArray.slice(index + 1),
    ];
    setFeedbackArray(newArr);
  };

  return (
    <>
      <SnackBarContext.Provider value={value}>
        {children}
        <SnackBar feedback={feedback} />

        {feedbackArray.map((feedback, index) => {
          if (checkArraysEquality(feedback, [0, 0, ""])) return;

          const bm = index === 0 ? 80 : (index + 1) * 80;

          return (
            <div
              key={index}
              className="fixed z-[9999]"
              style={{ bottom: `${bm}px` }}
            >
              <SnackBar
                feedback={feedback}
                keyNo={index}
                onClose={handleClose}
              />
            </div>
          );
        })}
      </SnackBarContext.Provider>
    </>
  );
};
