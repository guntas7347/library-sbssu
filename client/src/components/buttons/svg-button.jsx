import React from "react";

const SvgButton = ({ onClick, svg }) => {
  return (
    <div>
      <button
        className="text-white bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={onClick}
      >
        {svg}
      </button>
    </div>
  );
};

export default SvgButton;
