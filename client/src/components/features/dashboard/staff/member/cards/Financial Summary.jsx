import React from "react";

const FinancialSummary = ({ data }) => {
  // Use optional chaining and nullish coalescing to safely access nested data.
  // This prevents crashes if `financialSummary` or its properties are missing.
  const totalFines = data?.financialSummary?.totalFines ?? 0;
  const paid = data?.financialSummary?.paid ?? 0;
  const outstanding = data?.financialSummary?.outstanding ?? 0;

  // Render nothing if the parent component hasn't passed the data prop yet.
  if (!data) {
    return null;
  }

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h4 className="font-bold text-gray-900 dark:text-white mb-4">
        Financial Summary
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Total Fines</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ₹{totalFines}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Paid</span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            ₹{paid}
          </span>
        </div>
        <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
          <span className="text-gray-600 dark:text-gray-400">Outstanding</span>
          <span className="font-semibold text-red-600 dark:text-red-400">
            ₹{outstanding}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
