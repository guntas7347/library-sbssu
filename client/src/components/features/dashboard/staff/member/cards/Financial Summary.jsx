const FinancialSummary = ({ data }) => {
  // Use optional chaining and nullish coalescing to safely access nested data.
  // This prevents crashes if `financialSummary` or its properties are missing.
  const totalDebits = data?.financialSummary?.totalDebits ?? 0;
  const totalCredits = data?.financialSummary?.totalCredits ?? 0;
  const outstanding = data?.financialSummary?.outstanding ?? 0;

  if (!data) return null;

  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h4 className="font-bold text-gray-900 dark:text-white mb-4">
        Financial Summary
      </h4>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Total Debits</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            ₹{totalDebits}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">
            Total Credits
          </span>
          <span className="font-semibold text-green-600 dark:text-green-400">
            ₹{totalCredits}
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
