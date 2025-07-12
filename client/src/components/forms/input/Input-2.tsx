import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  required,
  type = "text",
  placeholder,
  onChange,
  ...props
}) => {
  const inputId = props.id || name;
  return (
    <>
      <div className="flex flex-col gap-2">
        <label
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={inputId}
        >
          {label}
          {required && " *"}
        </label>
        <input
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          id={inputId}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />{" "}
      </div>
    </>
  );
};

export default Input;
