import { useState } from "react";

const useToggle = (defaultState = false) => {
  const [getToggle, setToggle] = useState(defaultState);
  const toggle = (state?: boolean) => {
    if (state === false || state) setToggle(state);
    else setToggle(!getToggle);
  };
  return { getToggle, toggle };
};

export default useToggle;
