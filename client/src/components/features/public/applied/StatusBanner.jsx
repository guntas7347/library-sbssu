const StatusBanner = () => {
  return (
    <>
      <div className="mb-8 print:hidden">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-green-800 dark:text-green-200">
                Application Submitted Successfully!
              </h2>
              <p className="text-green-700 dark:text-green-300">
                Your library membership application has been received and is
                pending approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusBanner;
