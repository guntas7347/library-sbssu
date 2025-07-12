import { Shield, User } from "lucide-react";
import React from "react";

const title = (data) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-800 dark:from-green-500 dark:to-green-700 rounded-xl flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">
            Member Details
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            ID: {data.membershipId}
          </p>
        </div>
      </div>
    </div>
  );
};

export default title;
