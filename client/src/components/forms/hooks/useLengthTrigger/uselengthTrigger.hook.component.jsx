import { useRef } from "react";

const useLengthTrigger = (value, length, callBackFunction) => {
  const trigger = useRef(true);

  if (trigger.current) {
    if (value.length >= length) {
      callBackFunction();
      trigger.current = false;
    }
  } else {
    if (value.length < length) {
      trigger.current = true;
    }
  }
  return;
};

export default useLengthTrigger;
