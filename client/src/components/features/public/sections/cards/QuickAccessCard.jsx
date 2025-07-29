import React from "react";
import { Link } from "react-router-dom";

const QuickAccessCard = ({ item }) => {
  return (
    <>
      <div className="group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center mb-6">
          <div
            className={`w-12 h-12 bg-${item.color}-500 bg-${item.color}-700 dark:bg-${item.color}-400 dark:bg-${item.color}-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
          >
            <item.svg className="w-6 h-6 text-white" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
            {item.title}
          </h4>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">
          {item.sub}
        </p>
        <Link
          to={item.to}
          className={`w-full block text-center px-6 py-4 bg-${item.color}-500 bg-${item.color}-700 dark:bg-${item.color}-500 dark:bg-${item.color}-600 text-white rounded-2xl hover:bg-${item.color}-700 hover:bg-${item.color}-800 dark:hover:bg-${item.color}-600 dark:hover:bg-${item.color}-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
        >
          {item.buttonLabel}
        </Link>
      </div>
    </>
  );
};

export default QuickAccessCard;
