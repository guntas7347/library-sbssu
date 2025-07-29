import { CheckCircle } from "lucide-react";
import React from "react";

const StatusBanner = ({ data }) => {
  return (
    <>
      {" "}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-800 dark:text-green-200">
                  Active Staff Member
                </h2>
                <p className="text-green-700 dark:text-green-300">
                  Joined {data.joinDate} • Last login {data.lastLogin}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-600 dark:text-green-400">
                Role: {data.role}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                Department: {data.department}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusBanner;
