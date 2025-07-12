import React from "react";
import { useState } from "react";

const Input = ({
  label,
  name = label,
  onChange,
  type = "text",
  disabled = false,
  value,
  className = "",
  required = false,
  handleDate = false,
  onEnterKey,
  unLockable = false,
  ...props
}) => {
  const [isDiabled, setIsDiabled] = useState(disabled);
  return (
    <div className={className}>
      <label
        htmlFor="first_name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
        {required && " *"}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onChange}
          value={handleDate ? value.slice(0, 10) : value}
          disabled={isDiabled}
          required={required}
          onKeyDown={(e) => e.key === "Enter" && onEnterKey()}
          {...props}
        />
        {unLockable && (
          <button
            type="button"
            className={`absolute top-0 -end-2.5 ${
              isDiabled ? "c-btn-red" : "c-btn-blue"
            }`}
            onClick={() => {
              setIsDiabled(!isDiabled);
            }}
          >
            {isDiabled ? "Unlock" : "Lock"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
