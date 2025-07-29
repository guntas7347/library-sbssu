import React from "react";
import { Link } from "react-router-dom";

const HeaderButtons = ({ buttons = [] }) => {
  return (
    <>
      <div className="flex gap-4">
        {buttons.map((button) => {
          return (
            <Link
              key={button.to}
              className="p-2 relative rounded-xl group bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800  transition-all duration-200"
              to={`/staff/dashboard/settings/${button.to}`}
            >
              {<button.svg />}
              <div className="absolute -right-5 -bottom-8 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                {button.label}
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default HeaderButtons;
