const DocumentUpload = () => {
  return (
    <>
      {" "}
      <div className="space-y-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
            </svg>
            Required Documents
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              ID Document *
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,.pdf"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-300 dark:hover:file:bg-blue-900/70 transition-all duration-200"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload student ID card, Aadhar card or other valid ID.
            </p>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enrollment Verification
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,.pdf"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 dark:file:bg-green-900/50 dark:file:text-green-300 dark:hover:file:bg-green-900/70 transition-all duration-200"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload enrollment letter or transcript (if applicable)
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentUpload;
