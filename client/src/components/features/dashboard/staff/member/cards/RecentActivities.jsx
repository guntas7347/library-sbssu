import { Activity, BookOpen, CreditCard, RefreshCw } from "lucide-react";

import { useNavigate } from "react-router-dom";

const RecentActivities = ({ data }) => {
  // Use optional chaining on `data` and nullish coalescing for a safe default.
  const activities = data?.recentActivities || [];

  const iconMap = {
    issue: <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    return: (
      <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
    ),
    payment: (
      <CreditCard className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
    ),
  };

  const bgMap = {
    issue: "bg-blue-100 dark:bg-blue-900/50",
    return: "bg-green-100 dark:bg-green-900/50",
    payment: "bg-yellow-100 dark:bg-yellow-900/50",
  };

  const navigate = useNavigate();

  const goTo = (type, id) => {
    switch (type) {
      case "issue":
        navigate(`/staff/dashboard/search-issued/${id}`);
        break;

      case "return":
        navigate(`/staff/dashboard/search-returns/${id}`);
        break;

      case "payment":
        navigate("");
        break;

      default:
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <Activity className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
          Recent Activity
        </h4>
        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <div
                key={activity?.id || index} // Prefer a stable ID if available
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    bgMap[activity?.type] || "bg-gray-100 dark:bg-gray-600"
                  }`}
                >
                  {iconMap[activity?.type] || <Activity className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p
                    onClick={() => goTo(activity?.type, activity?.id)}
                    className="font-medium inline-block hover:cursor-pointer hover:underline text-gray-900 dark:text-white"
                  >
                    {activity?.action ?? "Unknown Action"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity?.item ?? "N/A"} • {activity?.date ?? "No date"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No recent activities found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
