import { Clock } from "lucide-react";
import React from "react";

const StatusBanner = ({ data }) => {
  return (
    <>
      <div className="mb-8">
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
                {data.status.toUpperCase()}
              </h2>
              <p className="text-yellow-700 dark:text-yellow-300">
                Submitted on {new Date(data.createdAt).toDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusBanner;
