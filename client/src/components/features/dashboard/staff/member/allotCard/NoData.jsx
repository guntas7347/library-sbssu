import { CreditCard } from "lucide-react";
import React from "react";

const NoData = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
      <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Select a Member
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        Choose a member from the list to allot a new library card
      </p>
    </div>
  );
};

export default NoData;
