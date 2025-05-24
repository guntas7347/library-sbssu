import React from "react";

const TextArea = ({
  label,
  name,
  onChange,
  disabled = false,
  value,
  rows = "4",
  className = "",
  required = false,
  placeholder = "",
}) => {
  return (
    <div className={className}>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label} {required && "*"}
      </label>
      <textarea
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        rows={rows}
        onChange={onChange}
        value={value}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        name={name}
      ></textarea>
    </div>
  );
};

export default TextArea;
