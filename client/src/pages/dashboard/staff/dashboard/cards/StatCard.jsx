import Spinner from "../../../../../components/feedback/spinner/Spinner";

const StatCard = ({ stat = { change: 0 }, loading = true }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {loading ? <Spinner solo /> : stat.value}
            </p>
            <p
              className={`text-sm mt-2 ${
                stat.change.startsWith("+") ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change} from last month
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/50`}
          >
            <stat.icon
              className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StatCard;
