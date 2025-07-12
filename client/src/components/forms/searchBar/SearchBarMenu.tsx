import React, { useState } from "react";
import useToggle from "../../../hooks/useToggle";
import { ChevronDown, Search } from "lucide-react";
import { useForm } from "../../../hooks/useForm";

type MenuOption = {
  label: string;
  value: string;
};

type SearchBarMenuProps = {
  onSearch: (params: { name: string; value: string }) => void;
  menuOptions?: MenuOption[];
  showDefault?: Boolean;
};

const SearchBarMenu: React.FC<SearchBarMenuProps> = ({
  onSearch,
  menuOptions = [],
  showDefault = false,
}) => {
  const { getToggle, toggle } = useToggle();
  const [selected, setSelected] = useState(0);
  const { formFields, handleChange } = useForm({ search: "" });

  const options = showDefault
    ? [{ label: "All Categories", value: "all" }, ...menuOptions]
    : menuOptions;

  const handleOptionSelect = (idx: number) => {
    setSelected(idx);
    toggle();
  };

  const handleSearch = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    if ("key" in e && e.key !== "Enter" && e.type !== "click") return;
    const selectedOption = options[selected] || { value: "" };
    onSearch({ name: selectedOption.value, value: formFields.search });
  };

  return (
    <div className="">
      <div className="max-w-lg mx-auto">
        <div className="flex relative">
          <button
            className="shrink-0 cursor-pointer z-1 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search..."
              name="search"
              onChange={handleChange}
              onKeyUp={handleSearch}
              value={formFields.search}
              required
            />
            <button
              type="button"
              onClick={handleSearch}
              className="absolute cursor-pointer top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <Search className="size-5" />
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarMenu;
