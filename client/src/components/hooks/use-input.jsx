import { useState } from "react";

const useInput = (defaultFormField = { value: "" }) => {
  const [formField, setFormField] = useState(defaultFormField);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ name, value });
  };

  const resetFormField = () => {
    setFormField({ value: "" });
  };

  const setField = (value) => {
    setFormField({ value });
  };

  return { formField, handleChange, resetFormField, setField };
};

export default useInput;
