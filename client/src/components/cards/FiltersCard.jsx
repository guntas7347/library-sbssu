import { useForm } from "../../hooks/useForm";

const FiltersCard = ({
  show = false,
  filters = [{ label: "", name: "", options: [{ label: "", value: "" }] }],
  customDate = false,
  onChange = () => {},
}) => {
  const { formFields, handleChange } = useForm();

  const handleFilter = (e) => {
    handleChange(e);
    const { name, value } = e.target;
    onChange({ ...formFields, [name]: value });
  };

  if (!show) return;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Advanced Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filters.map((filter) => {
            return (
              <div key={filter.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {filter.label}
                </label>
                <select
                  name={filter.name}
                  onChange={handleFilter}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                >
                  {filter.options.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </select>
              </div>
            );
          })}
          {customDate && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From Date
                </label>
                <input
                  type="date"
                  value={filters.customDateFrom}
                  // onChange={(e) =>
                  //   handleFilterChange("customDateFrom", e.target.value)
                  // }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To Date
                </label>
                <input
                  type="date"
                  value={filters.customDateTo}
                  // onChange={(e) =>
                  //   handleFilterChange("customDateTo", e.target.value)
                  // }
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default FiltersCard;
