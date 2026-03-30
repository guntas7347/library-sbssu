import { useState, useCallback, useRef } from "react";

export function useForm(initialValues = {}) {
  // Store initial values in a ref to prevent unnecessary re-renders when resetting
  const initialValuesRef = useRef(initialValues);
  const [formFields, setFormFields] = useState<any>(initialValues);

  // A smart change handler that adapts to the input type
  const handleChange = useCallback((e) => {
    const { name, type, value, checked, files } = e.target;

    let finalValue;

    // Handle different input types automatically
    if (type === "checkbox") {
      finalValue = checked;
    } else if (type === "file") {
      // For single file uploads. Use files instead of files[0] if multiple are needed.
      finalValue = files && files.length > 0 ? files[0] : null;
    } else {
      finalValue = value;
    }

    setFormFields((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }, []);

  // Safe partial updates
  const setFields = useCallback((fields) => {
    setFormFields((prev) => ({
      ...prev,
      ...fields,
    }));
  }, []);

  // Reset to original snapshot
  const resetFormFields = useCallback(() => {
    setFormFields(initialValuesRef.current);
  }, []);

  return {
    formFields,
    handleChange,
    setFields,
    resetFormFields,
    setFormFields, // Exposed for total override control if rarely needed
  };
}
