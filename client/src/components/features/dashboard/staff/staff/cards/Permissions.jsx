import { CheckCircle, Shield as ShieldIcon } from "lucide-react";

import { fromSnakeCase } from "../../../../../../utils/functions";

const Permissions = ({ data }) => {
  const rights = data?.rights || [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <ShieldIcon className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
          System Permissions
        </h4>
        {rights.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rights.map((permission, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <span className="text-gray-700 dark:text-gray-300 font-medium capitalize">
                  {fromSnakeCase(permission)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 py-4">
            This staff member has no special permissions assigned.
          </p>
        )}
      </div>
    </div>
  );
};

export default Permissions;
