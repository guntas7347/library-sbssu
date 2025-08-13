import { Loader, Loader2, Search, X } from "lucide-react";
import { useForm } from "../../../hooks/useForm";
import { useEffect } from "react";

const SearchBar2 = ({
  menuOptions = [],
  showDefault = true,
  onSearch = () => {},
  loader = true,
  page = 1,
}) => {
  const { formFields, handleChange, setFields, resetFormFields } = useForm({
    filter: "all",
    search: "",
  });

  const options = showDefault
    ? [{ label: "All Categories", value: "all" }, ...menuOptions]
    : menuOptions;

  const handleSearch = (e) => {
    if ("key" in e && e.key !== "Enter" && e.type !== "click") return;
    onSearch({ filter: formFields.filter, value: formFields.search, page });
  };

  useEffect(() => {
    loader.setLoading(true);
    const debounce = setTimeout(() => {
      handleSearch({});
    }, 1000);
    return () => clearTimeout(debounce);
  }, [formFields, page]);

  return (
    <>
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <div>
              {loader.loading ? (
                <Loader2 className="absolute animate-spin left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              ) : (
                <Search className="absolute animate-pulse left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              )}
              <input
                type="text"
                placeholder="Search by book title, author, member name, ISBN, or transaction ID..."
                name="search"
                value={formFields.search}
                onChange={handleChange}
                onKeyUp={handleSearch}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2"
              />
            </div>
          </div>
          <div className=" gap-4">
            <select
              name="filter"
              onChange={(e) =>
                setFields({ search: "", filter: e.target.value })
              }
              value={formFields.filter}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={resetFormFields}
            className="flex max-w-28 items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-1 transition-all duration-200"
          >
            <X className="w-5 h-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar2;
