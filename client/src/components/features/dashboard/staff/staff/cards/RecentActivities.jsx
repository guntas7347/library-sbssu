import { Activity } from "lucide-react";

const RecentActivities = ({ data }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
            Recent Activities
          </h4>

          <div className="space-y-4">
            {data.rights.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "approval"
                      ? "bg-green-100 dark:bg-green-900/50"
                      : activity.type === "update"
                      ? "bg-blue-100 dark:bg-blue-900/50"
                      : activity.type === "report"
                      ? "bg-purple-100 dark:bg-purple-900/50"
                      : "bg-yellow-100 dark:bg-yellow-900/50"
                  }`}
                >
                  {activity.type === "approval" && (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                  {activity.type === "update" && (
                    <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                  {activity.type === "report" && (
                    <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  )}
                  {activity.type === "create" && (
                    <User className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.details}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentActivities;
