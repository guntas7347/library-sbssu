import { Settings } from "lucide-react";
import React from "react";

const DefaultPage = () => {
  return (
    <>
      <div className="text-center mt-30">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Select a Setting
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Choose a setting from header icons above
        </p>
      </div>
    </>
  );
};

export default DefaultPage;
