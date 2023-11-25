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

  return { formFields, setFormFields, handleChange, resetFormFields };
};
