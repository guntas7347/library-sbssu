import React, { useEffect } from "react";

const TermsOfService = ({ onChange }) => {
  useEffect(() => {
    onChange(false);
  }, []);
  return (
    <>
      {" "}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            required={false}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            I agree to the{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Privacy Policy
            </a>
          </label>
        </div>
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            name="subscribeToUpdates"
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            I would like to receive updates about library events and new
            resources
          </label>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
