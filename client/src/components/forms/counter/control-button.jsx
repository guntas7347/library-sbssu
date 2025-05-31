import React, { useState } from "react";

const ControlButtonCounter = ({
  minVal = 0,
  maxValue = 10,
  label = "Choose quantity:",
  message = `Please select a number from ${minVal} to ${maxValue}.`,
  onChange,
  defaultValue = minVal,
}) => {
  const [count, setCount] = useState(+defaultValue);

  const handleIncrement = () => {
    if (count < maxValue) {
      setCount((p) => p + 1);
      onChange(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > minVal) {
      setCount((p) => p - 1);
      onChange(count - 1);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value <= maxValue) {
        setCount(+e.target.value);
        onChange(+e.target.value);
      } else {
        setCount(+maxValue);
        onChange(+maxValue);
      }
    }
  };

  return (
    <div>
      <form className="max-w-xs mx-auto">
        <label
          for="quantity-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            onClick={handleDecrement}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="999"
            value={count}
            onChange={handleChange}
            name="counter"
            required
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        {message !== false && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ControlButtonCounter;
