import React from "react";

const DocumentsSection = ({ data }) => {
  return (
    <>
      {" "}
      {/* Documents */}
      <div className="mb-8">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center print:text-black">
          <svg
            className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400 print:text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
          </svg>
          Submitted Documents
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField label="ID Document" value={data?.idDocument || ""} />
          <InfoField
            label="Enrollment Verification"
            value={data?.enrollmentVerification || ""}
          />
        </div>
      </div>
    </>
  );
};

export default DocumentsSection;
