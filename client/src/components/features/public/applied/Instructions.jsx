import React from "react";

const Instructions = () => {
  return (
    <>
      <div className="mb-8 print:hidden">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Next Steps
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-300">
            <li>
              Click the <strong>Print</strong> button below to print this
              application
            </li>
            <li>
              Get the printed application signed by your{" "}
              <strong>Head of Department (HOD)</strong>
            </li>
            <li>Sign the application yourself in the designated area</li>
            <li>
              Submit the signed application to the{" "}
              <strong>Library Office</strong> for final approval
            </li>
            <li>
              You will receive your <strong>Membership Confirmation</strong>{" "}
              email within 3-5* business days after submission
            </li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default Instructions;
