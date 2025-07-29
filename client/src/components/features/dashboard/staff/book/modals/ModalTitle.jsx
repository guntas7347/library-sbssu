import { Book, BookPlus } from "lucide-react";
import React from "react";

export const AddModalTitle = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 rounded-xl flex items-center justify-center">
          <BookPlus className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
            Add New Book
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            Add books to library inventory
          </p>
        </div>
      </div>
    </div>
  );
};

export const ViewModalTitle = (data = {}) => (
  <div className="flex items-center space-x-4">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 rounded-xl flex items-center justify-center">
        <Book className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
          Book Details
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          ID: {data.id}
        </p>
      </div>
    </div>
  </div>
);
