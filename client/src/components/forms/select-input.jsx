import { useEffect, useRef } from "react";

const Select = ({
  disabled = false,
  label,
  name,
  onChange,
  options = [],
  value,
  autoFire = true,
}) => {
  const hasAutoSelected = useRef(false);

  useEffect(() => {
    if (
      autoFire &&
      !hasAutoSelected.current &&
      !disabled &&
      options.length > 0 &&
      !value
    ) {
      hasAutoSelected.current = true;
      onChange({
        target: {
          name,
          value: options[0],
        },
      });
    }
  }, [options, disabled, value]);

  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className="bg-gray-50 border uppercase border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((op, idx) => (
          <option key={idx} value={op} className="uppercase">
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
