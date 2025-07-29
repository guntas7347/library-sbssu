import { FileUser } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {" "}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo and Back Button */}
            <div className="flex items-center space-x-4">
              <Link
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                to="/"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                    SBSSU
                  </h1>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    Library Membership
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Already applied?
              </span>
              <Link
                to="/join/applied"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                View Application
              </Link>
            </div>
            <div className="md:hidden text-sm">
              <Link
                to="/join/applied"
                className="flex flex-col px-1 py-2 justify-center items-center hover:bg-gray-100 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                <FileUser className="size-9 " />
                <span className="font-semibold text-sm break-words">
                  View Application
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
