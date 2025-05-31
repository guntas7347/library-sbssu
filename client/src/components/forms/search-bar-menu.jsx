import React, { useState } from "react";
import useToggle from "../hooks/use-toggle";
import useInput from "../hooks/use-input";
import { fromLowerCamelCase, toLowerCamelCase } from "../../utils/functions";

const SearchBarMenu = ({ onSearch, menuOptions = [] }) => {
  const { getToggle, toggle } = useToggle();

  const [searchType, setSearchType] = useState("allCategories");
  const { formField, handleChange, resetFormField } = useInput({ value: "" });
  const handleButton = (e) => {
    resetFormField();
    setSearchType(e.target.name);
    toggle();
  };

  const handleSearch = (e) => {
    if (e.key !== "Enter" && e.type !== "click") return;
    onSearch({ name: searchType, value: formField.value });
  };

  return (
    <div>
      <div className="max-w-lg mx-auto">
        <div className="flex relative">
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="shrink-0  cursor-pointer z-1 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
            onClick={() => toggle()}
          >
            {fromLowerCamelCase(searchType)}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 top-12 -left-4 ${
              getToggle ? "absolute" : "hidden"
            } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              {" "}
              <li>
                <button
                  type="button"
                  name="allCategories"
                  onClick={handleButton}
                  className="inline-flex  cursor-pointer w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  All Categories
                </button>
              </li>
              {menuOptions.map((li, idx) => {
                return (
                  <li key={idx}>
                    <button
                      type="button"
                      name={toLowerCamelCase(li)}
                      onClick={handleButton}
                      className="inline-flex  cursor-pointer w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {li}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search..."
              name="search"
              onChange={handleChange}
              onKeyUp={handleSearch}
              disabled={searchType === "allCategories"}
              value={formField.value}
              required
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute  cursor-pointer top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
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
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarMenu;
