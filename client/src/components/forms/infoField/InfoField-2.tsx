import React from "react";

const InfoField = ({ label = "", value = "" }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-600 dark:text-gray-400 text-sm">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );
};

export default InfoField;
