import { AlertCircle, BookOpen, Eye, User } from "lucide-react";
import React from "react";

const CurrentIssues = ({ data }) => {
  // Safely access the array, defaulting to an empty array
  const issues = data?.currentIssues || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
          Current Issues ({issues.length})
        </h4>

        <div className="space-y-4">
          {issues.length > 0 ? (
            issues.map((issue, index) => (
              <div
                key={issue?.id || index} // Prefer stable ID
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      issue?.status === "Overdue"
                        ? "bg-red-100 dark:bg-red-900/50"
                        : "bg-blue-100 dark:bg-blue-900/50"
                    }`}
                  >
                    {issue?.status === "Overdue" ? (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {issue?.memberName ?? "Unknown Member"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {issue?.memberId ?? "N/A"} • Due:{" "}
                      {issue?.dueDate ?? "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      issue?.status === "Overdue"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                    }`}
                  >
                    {issue?.status ?? "Unknown"}
                  </span>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
              This book is not currently issued to any member.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default CurrentIssues;
