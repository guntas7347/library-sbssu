import { Activity, BookOpen, CreditCard, RefreshCw } from "lucide-react";
import React from "react";

const RecentActivities = ({ data }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-indigo-600 dark:text-indigo-400" />
            Recent Activity
          </h4>

          <div className="space-y-4">
            {data.libraryCards.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "issue"
                      ? "bg-blue-100 dark:bg-blue-900/50"
                      : activity.type === "return"
                      ? "bg-green-100 dark:bg-green-900/50"
                      : "bg-yellow-100 dark:bg-yellow-900/50"
                  }`}
                >
                  {activity.type === "issue" && (
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                  {activity.type === "return" && (
                    <RefreshCw className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                  {activity.type === "payment" && (
                    <CreditCard className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.item} • {activity.date}
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
