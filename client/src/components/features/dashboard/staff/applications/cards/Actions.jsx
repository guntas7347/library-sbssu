import { AlertCircle, CheckCircle, Edit } from "lucide-react";

const Actions = ({ handleApprove, handleReject, disabled = false }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Actions
          </h4>
          {/* <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-6">
            <p className="text-gray-700 dark:text-gray-300">
              Application looks complete. Waiting for department verification.
            </p>
          </div> */}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 flex-center disabled:cursor-not-allowed disabled:opacity-30 space-x-2"
              onClick={handleApprove}
              disabled={disabled}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Approve Application</span>
            </button>
            <button
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 flex-center space-x-2 disabled:cursor-not-allowed disabled:opacity-30 "
              onClick={handleReject}
              disabled={disabled}
            >
              <AlertCircle className="w-5 h-5" />
              <span>Reject Application</span>
            </button>
            {/* <button
              disabled
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 flex-center space-x-2"
            >
              <Edit className="w-5 h-5" />
              <span>Request Changes</span>
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Actions;
