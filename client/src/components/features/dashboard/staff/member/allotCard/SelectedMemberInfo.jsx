import React from "react";
import { imagePathUrl } from "../../../../../../utils/functions";

const SelectedMemberInfo = ({ data = {} }) => {
  console.log(data);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Selected Member
      </h3>
      <div className="flex items-center space-x-4">
        <img
          src={imagePathUrl(data.photo)}
          alt={data.fullName}
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        />
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
            {data.fullName}
          </h4>
          <p className="text-gray-600 dark:text-gray-400">{data.email}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm">
            <span className="text-purple-600 dark:text-purple-400">
              {data.program}
            </span>
            <span className="text-gray-500 dark:text-gray-500">•</span>
            <span className="text-gray-600 dark:text-gray-400">
              {data.memberType}
            </span>
            <span className="text-gray-500 dark:text-gray-500">•</span>
            <span className="text-gray-600 dark:text-gray-400">
              {data.membershipId}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedMemberInfo;
