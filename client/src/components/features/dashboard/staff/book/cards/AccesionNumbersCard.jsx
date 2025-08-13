import { ListChecks } from "lucide-react";

const AccessionNumbersCard = ({ data }) => {
  // Safely access the array, defaulting to an empty array
  const accessions = data?.accessions || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <ListChecks className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
          Book Copies ({accessions.length})
        </h4>

        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          {accessions.length > 0 ? (
            accessions.map((accession) => (
              <div
                key={accession?.id} // Use the unique ID for the key
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div>
                  <p className="font-mono font-medium text-gray-900 dark:text-white">
                    Acc. No: {accession?.accessionNumber ?? "N/A"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    Condition: {accession?.condition ?? "Unknown"}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                    accession?.status === "available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                  }`}
                >
                  {accession?.status ?? "Unknown"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
              No copies (accessions) found for this book.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessionNumbersCard;
