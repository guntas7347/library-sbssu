import { Clock } from "lucide-react";

const PreviousCards = ({ data = { previousCards: [] } }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green";
      case "expired":
        return "red";
      case "issued":
        return "yellow";
      case "blocked":
        return "gray";
      default:
        return "gray";
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Clock className="w-5 h-5 mr-2 text-amber-600 dark:text-amber-400" />
        Previous Cards
      </h3>

      <div className="space-y-3">
        {data?.libraryCards?.map((card) => (
          <div
            key={card.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
          >
            <div>
              <p className="font-mono text-sm text-gray-900 dark:text-white">
                {card.cardNumber}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {card.category} • {card.expiryDate}
              </p>
            </div>
            <span
              className={`px-2 py-1 bg-${getStatusColor(
                card.status
              )}-100 text-${getStatusColor(
                card.status
              )}-800 dark:bg-${getStatusColor(
                card.status
              )}-900/50 dark:text-${getStatusColor(
                card.status
              )}-200 rounded-full text-xs font-medium`}
            >
              {card.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousCards;
