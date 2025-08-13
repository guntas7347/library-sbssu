import { Activity, BookOpen, UserPlus } from "lucide-react";

const ActivityHistory = ({ data }) => {
  const activities = data || [];
  const iconMap = {
    book_issue: <BookOpen className="w-5 h-5 text-blue-500" />,
    member_approval: <UserPlus className="w-5 h-5 text-green-500" />,
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border p-8">
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Activity className="w-6 h-6 mr-3 text-indigo-500" />
        Recent Activity
      </h4>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {activities.length > 0 ? (
          activities.map((act) => (
            <div
              key={act.id}
              className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-900/50 rounded-full flex items-center justify-center">
                {iconMap[act.type] || <Activity />}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {act.description}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(act.date).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">
            No recent activity found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;
