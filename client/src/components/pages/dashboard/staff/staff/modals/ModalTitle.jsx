import { Shield } from "lucide-react";
import React from "react";

const title = (data) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-500 dark:to-indigo-700 rounded-xl flex items-center justify-center">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-600 bg-clip-text text-transparent">
            Staff Details
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            ID: {data.idNumber}
          </p>
        </div>
      </div>
    </div>
  );
};

export default title;
