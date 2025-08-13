import { Clock } from "lucide-react";

const PreviousCards = ({ data }) => {
  const libraryCards = data?.libraryCards || [];

  const statusStyles = {
    available:
      "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
    expired: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
    issued:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200",
    blocked: "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-200",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
        Previous Cards ({libraryCards.length})
      </h3>
      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
        {libraryCards.length > 0 ? (
          libraryCards.map((card) => (
            <div
              key={card?.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
            >
              <div>
                <p className="font-mono text-sm text-gray-900 dark:text-white">
                  {card?.cardNumber ?? "N/A"}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                  {card?.type ?? "N/A"} • Expires:{" "}
                  {card?.expiry
                    ? new Date(card.expiry).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  statusStyles[card?.status] || statusStyles.blocked
                }`}
              >
                {card?.status ?? "Unknown"}
              </span>
            </div>
          ))
        ) : (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">
            No library cards have been allotted to this member yet.
          </p>
        )}
      </div>
    </div>
  );
};
export default PreviousCards;
