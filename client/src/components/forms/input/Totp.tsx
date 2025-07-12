import React, { useRef, useState } from "react";

interface TotpInputProps {
  onChange?: (code: string) => void;
}

const TotpInput: React.FC<TotpInputProps> = ({ onChange }) => {
  const [values, setValues] = useState(Array(6).fill(""));
  const inputs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newValues = [...values];
    newValues[idx] = value[0];
    setValues(newValues);

    if (value.length === 1 && idx < 5) {
      inputs[idx + 1].current?.focus();
    }

    // Move focus and fill next if user pasted multiple digits
    if (value.length > 1) {
      for (let i = 1; i < value.length && idx + i < 6; i++) {
        newValues[idx + i] = value[i];
        if (inputs[idx + i].current) {
          inputs[idx + i].current!.value = value[i];
        }
      }
      setValues(newValues);
      const nextIdx = Math.min(idx + value.length, 5);
      inputs[nextIdx].current?.focus();
    }

    // Call onChange if all filled
    if (newValues.every((v) => v.length === 1)) {
      onChange?.(newValues.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    // Handle Backspace
    if (e.key === "Backspace") {
      if (values[idx]) {
        const newValues = [...values];
        newValues[idx] = "";
        setValues(newValues);
      } else if (idx > 0) {
        inputs[idx - 1].current?.focus();
        const newValues = [...values];
        newValues[idx - 1] = "";
        setValues(newValues);
      }
    }

    // Handle Ctrl+A / Cmd+A to clear all
    if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A")) {
      e.preventDefault();
      setValues(Array(6).fill(""));
      inputs[0].current?.focus();
      inputs.forEach((ref) => {
        if (ref.current) ref.current.value = "";
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Two-Factor Authentication Code *
      </label>
      <div className="flex justify-center gap-2">
        {inputs.map((ref, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            ref={ref}
            value={values[idx]}
            className="w-10 h-10 text-center border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            onChange={(e) => handleInput(e, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            id={`otp${idx + 1}`}
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="[0-9]*"
            required
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        Enter the 6-digit code from your authenticator app
      </p>
    </div>
  );
};

export default TotpInput;
