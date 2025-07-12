import React, { useState, useCallback, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";

const AdvancedSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recentSearches, setRecentSearches] = useState([]);
  const [error, setError] = useState("");

  const categories = [
    "All",
    "Products",
    "Services",
    "Locations",
    "Articles",
    "Users",
    "Documents",
    "Categories",
  ];

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const handleSearch = useCallback(
    debounce((term) => {
      if (term.trim().length < 2) {
        setError("Search term must be at least 2 characters long");
        return;
      }
      setError("");
      setRecentSearches((prev) => [
        term,
        ...prev.filter((item) => item !== term).slice(0, 4),
      ]);
    }, 500),
    []
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2 flex items-center justify-between rounded-lg bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:opacity-90 transition-opacity"
              aria-label="Select category"
            >
              <span>{selectedCategory}</span>
              <ChevronDown
                className={`transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-2 rounded-lg shadow-lg bg-white dark:bg-gray-700 max-h-60 overflow-y-auto z-10">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 ${
                      selectedCategory === category
                        ? "bg-gray-200 dark:bg-gray-600"
                        : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Search..."
                className="w-full px-4 py-2 pr-24 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
                aria-label="Search input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-16 top-1/2 -translate-y-1/2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:opacity-80 transition-opacity"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-500 dark:bg-blue-600 text-white hover:opacity-90 transition-opacity"
                aria-label="Submit search"
              >
                <Search size={20} />
              </button>
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {recentSearches.length > 0 && (
              <div className="mt-4 p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                <p className="text-sm mb-2 text-gray-600 dark:text-gray-400">
                  Recent Searches:
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchTerm(search)}
                      className="text-sm px-3 py-1 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 hover:opacity-80 transition-opacity"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchBar;
