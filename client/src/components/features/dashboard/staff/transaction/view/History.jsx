import React from "react";
import { FileText, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const History = ({ data }) => {
  // Use a safe default for the history array
  const history = data || [];

  const typeMap = {
    DEBIT: {
      icon: (
        <ArrowDownCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
      ),
      bg: "bg-red-100 dark:bg-red-900/50",
    },
    CREDIT: {
      icon: (
        <ArrowUpCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      ),
      bg: "bg-green-100 dark:bg-green-900/50",
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-gray-600 dark:text-gray-400" />
          Transaction History
        </h4>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {history.length > 0 ? (
            history.map((entry, index) => {
              const styles = typeMap[entry?.transactionType] || {
                icon: (
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ),
                bg: "bg-gray-100 dark:bg-gray-900/50",
              };

              return (
                <div
                  key={entry?.id || index}
                  className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                >
                  <div
                    className={`w-10 h-10 ${styles.bg} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    {styles.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-900 dark:text-white capitalize">
                        {entry?.category ?? "General Transaction"}
                      </h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {entry?.createdAt
                          ? new Date(entry.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      by {entry?.staff ?? "System"}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
              No transaction history found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
