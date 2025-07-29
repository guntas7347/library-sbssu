import React, { useState } from "react";

const useAlert = (defaultState = false) => {
  const [showAlert, setShowAlert] = useState(defaultState);
  const closeAlert = () => setShowAlert(false);
  const openAlert = () => setShowAlert(true);
  return { showAlert, closeAlert, openAlert, setShowAlert };
};

export default useAlert;
