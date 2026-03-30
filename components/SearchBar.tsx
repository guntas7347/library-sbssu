import { Loader2, Search, X } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { useEffect, useCallback } from "react";

const SearchBar2 = ({
  menuOptions = [],
  showDefault = true,
  onSearch = () => {},
  loader = { loading: false, setLoading: () => {} },
  page = 1,
  placeholder = "Search...",
}: {
  menuOptions?: { label: string; value: string }[];
  showDefault?: boolean;
  onSearch?: (data: { filter: string; value: string; page: number }) => void;
  loader?: { loading: boolean; setLoading: (loading: boolean) => void };
  page?: number;
  placeholder?: string;
}) => {
  const { formFields, handleChange, setFields, resetFormFields } = useForm({
    filter: "all",
    search: "",
  });

  const options = showDefault
    ? [{ label: "All Categories", value: "all" }, ...menuOptions]
    : menuOptions;

  // stable search trigger
  const triggerSearch = useCallback(() => {
    loader.setLoading(true);

    onSearch({
      filter: formFields.filter,
      value: formFields.search.trim(),
      page,
    });
  }, [formFields.filter, formFields.search, page]);

  // debounce only search input
  useEffect(() => {
    const debounce = setTimeout(() => {
      triggerSearch();
    }, 500);

    return () => clearTimeout(debounce);
  }, [formFields.search, formFields.filter, page, triggerSearch]);

  // ENTER key only (optional manual trigger)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className="card p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          {loader.loading ? (
            <Loader2 className="absolute animate-spin left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          ) : (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}

          <input
            type="text"
            placeholder={placeholder}
            name="search"
            value={formFields.search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <select
          name="filter"
          onChange={(e) => setFields({ search: "", filter: e.target.value })}
          value={formFields.filter}
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={resetFormFields}
          className="flex max-w-28 items-center space-x-2 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl"
        >
          <X className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar2;
