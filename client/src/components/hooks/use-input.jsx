import { useState } from "react";

const useInput = (defaultFormField) => {
  const [formField, setFormField] = useState(defaultFormField);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormField({ name, value });
  };

  const resetFormField = () => {
    setFormField({ value: "" });
  };

  return { formField, handleChange, resetFormField };
};

export default useInput;
