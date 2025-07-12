import React from "react";

const ProgressBar = ({ value = 50, reverse = false, color = "blue" }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
      <div
        className={`${
          color === "blue" ? "bg-blue-600" : "bg-red-600"
        } h-2.5 rounded-full`}
        style={{ width: `${reverse ? 100 - value : value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
