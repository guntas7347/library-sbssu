import { CheckCircle } from "lucide-react";
import React from "react";

const StatusBanner = ({ data }) => {
  if (!data) return null;

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800 dark:text-green-200">
                {/* Use the status from data or fallback */}
                {data?.status ?? "Unknown Status"} Member
              </h2>
              <p className="text-green-700 dark:text-green-300">
                Member since {data?.joinDate ?? "N/A"} • Last active{" "}
                {data?.lastActivity ?? "N/A"}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-600 dark:text-green-400">
              {/* Safely access the number of cards */}
              Cards: {data?.stats?.cardCount ?? 0}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Expires: {data?.expiryDate ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBanner;
