import { CreditCard, Key, Monitor, Settings } from "lucide-react";
import React from "react";

const QuickActions = () => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h4 className="font-bold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h4>
      <div className="space-y-3">
        {/* <Button
          color="purple"
          svg={<CreditCard className="w-5 h-5" />}
          label="Allot New Card"
        /> */}
        {/* <Button
          color="blue"
          svg={<Settings className="w-5 h-5" />}
          label="Edit Permissions"
        />
        <Button
          color="green"
          svg={<Monitor className="w-5 h-5" />}
          label="View Sessions"
        /> */}
      </div>
    </div>
  );
};

export default QuickActions;

const Button = ({ label = "", color = "green", svg, onClick = () => {} }) => {
  return (
    <button
      className={`w-full flex items-center space-x-3 p-3 bg-${color}-50 dark:bg-${color}-900/50 text-${color}-700 dark:text-${color}-300 rounded-xl hover:bg-${color}-100 dark:hover:bg-${color}-900/70 transition-all duration-200`}
      onClick={onClick}
    >
      {svg}
      <span>{label}</span>
    </button>
  );
};
