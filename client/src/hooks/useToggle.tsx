import { useState } from "react";

const useToggle = (defaultState: boolean = false) => {
  const [getToggle, setToggle] = useState<boolean>(defaultState);

  const toggle = (stateOrEvent?: boolean | React.SyntheticEvent) => {
    if (typeof stateOrEvent === "boolean") setToggle(stateOrEvent);
    else setToggle((prev) => !prev);
  };

  return { getToggle, toggle };
};

export default useToggle;
