import React, { useEffect } from "react";

const useDebounce = (time = 1000, dependencies = []) => {
  const debounce = (f) => f();

  useEffect(() => {
    const debounce = setTimeout(() => {
      debounce();
    }, time || 1000);
    return () => clearTimeout(debounce);
  }, dependencies);

  return { debounce };
};

export default useDebounce;
