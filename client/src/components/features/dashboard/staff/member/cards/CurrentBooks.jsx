import { AlertCircle, BookOpen } from "lucide-react";
import React from "react";

const CurrentBooks = ({ data }) => {
  // Use optional chaining on `data` and nullish coalescing for a safe default.
  const currentBooks = data?.currentBooks || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
          Current Books ({currentBooks.length})
        </h4>
        <div className="space-y-4">
          {currentBooks.length > 0 ? (
            currentBooks.map((book, index) => (
              <div
                key={book?.id || index} // Prefer a stable ID if available
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      book?.status === "Overdue"
                        ? "bg-red-100 dark:bg-red-900/50"
                        : "bg-green-100 dark:bg-green-900/50"
                    }`}
                  >
                    {book?.status === "Overdue" ? (
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    ) : (
                      <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {book?.title ?? "Untitled Book"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      by {book?.author ?? "Unknown Author"} • Due:{" "}
                      {book?.dueDate ?? "N/A"}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    book?.status === "Overdue"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                      : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                  }`}
                >
                  {book?.status ?? "Unknown"}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No books currently issued.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentBooks;
