import React, { useEffect, useRef } from "react";

type OptionType = string | { label: string; value: string };

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  options?: OptionType[];
  autoFire?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  required,
  onChange,
  options = [""],
  autoFire = true,
  value,
  disabled,
  ...props
}) => {
  const hasAutoSelected = useRef(false);

  useEffect(() => {
    if (
      autoFire &&
      !hasAutoSelected.current &&
      !disabled &&
      options.length > 0 &&
      (value === undefined || value === "" || value === null) &&
      typeof onChange === "function"
    ) {
      hasAutoSelected.current = true;

      const first = options[0];
      const optionValue =
        typeof first === "string"
          ? first.toLowerCase().replace(/\s+/g, "_")
          : first.value;

      const syntheticEvent = {
        target: {
          name,
          value: optionValue,
        },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;

      onChange(syntheticEvent);
    }
  }, [autoFire, disabled, options, value, name, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && " *"}
      </label>
      <select
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
        name={name}
        required={required}
        onChange={onChange}
        value={value}
        disabled={disabled}
        {...props}
      >
        {options.map((option, index) => {
          const label = typeof option === "string" ? option : option.label;
          const val =
            typeof option === "string"
              ? option.toLowerCase().replace(/\s+/g, "_")
              : option.value;

          return (
            <option key={index} value={val}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
