import React from "react";
import useInput from "../hooks/use-input";

const SearchBar = ({
  label = "Search",
  search = "Search",
  type = "text",
  name = "search",
  placeholder = label,
  maxLength = 10,
  onClick,
  disabled = false,
}) => {
  const { formField, setField } = useInput({ value: "" });

  const handleSearch = (e) => {
    if (formField.value === "") return;
    if (e.type === "click") onClick(formField.value);
    if (e.type === "keydown" && e.key === "Enter") onClick(formField.value);
  };

  return (
    <div>
      <div className="max-w-md mx-auto">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <div className="relative">
          <div className="absolute  cursor-pointer inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={placeholder}
            label={label}
            type={type}
            name={name}
            onChange={(e) => {
              setField(
                e.target.value.replace(/[^0-9]/g, "").slice(0, maxLength)
              );
            }}
            value={formField.value}
            onKeyDown={handleSearch}
            disabled={disabled}
            autoComplete="off"
            required
          />
          <button
            type="button"
            onClick={handleSearch}
            disabled={disabled}
            className="text-white cursor-pointer absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-20"
          >
            {search}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
