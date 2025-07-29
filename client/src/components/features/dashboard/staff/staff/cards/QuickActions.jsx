import { Key, Monitor, Settings } from "lucide-react";
import React from "react";

const QuickActions = () => {
  return (
    <>
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
        <h4 className="font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h4>
        <div className="space-y-3">
          <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/70 transition-all duration-200">
            <Key className="w-5 h-5" />
            <span>Reset Password</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/70 transition-all duration-200">
            <Settings className="w-5 h-5" />
            <span>Edit Permissions</span>
          </button>
          <button className="w-full flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/70 transition-all duration-200">
            <Monitor className="w-5 h-5" />
            <span>View Sessions</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default QuickActions;
