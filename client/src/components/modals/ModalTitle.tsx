import React from "react";

const ModalTitle = ({
  title = "",
  sub = "",
  svg,
  colorClass = "bg-purple-700",
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 ${colorClass} text-white rounded-xl flex items-center justify-center`}
        >
          {svg}
        </div>
        <div>
          <h1
            className={`text-xl font-bold ${colorClass.replace(
              "bg-",
              "text-"
            )}`}
          >
            {title}
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModalTitle;
