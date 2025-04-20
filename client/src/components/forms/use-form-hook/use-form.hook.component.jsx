import { useState } from "react";

export const useForm = (defaultFormFields) => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const setFields = (name, value) => {
    setFormFields({ ...formFields, [name]: value });
  };

  return {
    formFields,
    setFormFields,
    handleChange,
    resetFormFields,
    setFields,
  };
};
