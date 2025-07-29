import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { useForm } from "../../../hooks/useForm";

const SearchBar = ({
  onFilter = () => {},
  onSearch = () => {},
  enableFilter = true,
  filterStatus = false,
  filterButtonColor = "purple",
  menuOptions = [],
  showDefault = true,
  placeholder = "Search by book title, author, member name, ISBN, or transaction ID...",
}) => {
  const { getToggle, toggle } = useToggle();
  const [selected, setSelected] = useState(0);
  const { formFields, handleChange, resetFormFields } = useForm({ search: "" });

  const handleOptionSelect = (idx) => {
    setSelected(idx);
    toggle();
  };

  const handleSearch = (e) => {
    if ("key" in e && e.key !== "Enter" && e.type !== "click") return;
    const selectedOption = options[selected] || { value: "" };
    onSearch({ name: selectedOption.value, value: formFields.search });
  };

  const options = showDefault
    ? [{ label: "All Categories", value: "all" }, ...menuOptions]
    : menuOptions;

  const handleClear = () => {
    resetFormFields();
    setSelected(0);
    onFilter(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex w-full relative">
            <button
              className="shrink-0 cursor-pointer min-w-1/6 z-1 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
              onClick={toggle}
            >
              {options[selected]?.label || "Select"}
              <ChevronDown className="size-5 ml-2" />
            </button>
            <div
              id="dropdown"
              className={`z-10 top-12 -left-4 ${
                getToggle ? "absolute" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {options.map((li, idx) => (
                  <li key={li.value}>
                    <button
                      type="button"
                      onClick={() => handleOptionSelect(idx)}
                      className="inline-flex cursor-pointer w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {li.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder={placeholder}
                value={formFields.search}
                onKeyUp={handleSearch}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-x-0 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="p-2.5 min-w-14 flex-center border rounded-r-xl border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <Search className="size-5" />
              <span className="sr-only">Search</span>
            </button>
          </div>
          <div className="flex gap-3">
            {enableFilter && (
              <button
                onClick={() => onFilter(!filterStatus)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                  filterStatus
                    ? `bg-${filterButtonColor}-100 border-${filterButtonColor}-300 text-${filterButtonColor}-700 dark:bg-${filterButtonColor}-900/50 dark:border-${filterButtonColor}-600 dark:text-${filterButtonColor}-300`
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <SlidersHorizontal className="w-5 h-5" />
                <span>Filters</span>
              </button>
            )}
            <button
              onClick={handleClear}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <X className="w-5 h-5" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
