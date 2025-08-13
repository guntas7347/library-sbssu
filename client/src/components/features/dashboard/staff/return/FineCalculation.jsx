import { Calculator } from "lucide-react";

const FineCalculation = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
          Fine Calculation
        </h3>

        <div className="space-y-4">
          {issuedBookData.isOverdue && (
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-red-700 dark:text-red-300">
                Overdue Fine ({issuedBookData.daysOverdue} days)
              </span>
              <span className="font-semibold text-red-800 dark:text-red-200">
                ${issuedBookData.calculatedFine}
              </span>
            </div>
          )}

          {returnCondition === "damaged" && (
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <span className="text-yellow-700 dark:text-yellow-300">
                Damage Fine
              </span>
              <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                $10.00
              </span>
            </div>
          )}

          {returnCondition === "lost" && (
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <span className="text-red-700 dark:text-red-300">
                Replacement Cost
              </span>
              <span className="font-semibold text-red-800 dark:text-red-200">
                $50.00
              </span>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                Total Fine
              </span>
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${fineAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom Fine Amount
            </label>
            <div className="relative">
              <input
                type="number"
                // value={fineAmount}
                // onChange={(e) => setFineAmount(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent transition-all duration-200"
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FineCalculation;
