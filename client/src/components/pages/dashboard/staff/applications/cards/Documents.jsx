import {
  AlertCircle,
  CheckCircle,
  Download,
  Eye,
  FileText,
} from "lucide-react";
import React from "react";

const Documents = ({
  data = {
    documents: [
      {
        name: "Student ID Card",
        type: "ID",
        status: "Verified",
        uploadDate: "2024-01-20",
      },
      {
        name: "Enrollment Letter",
        type: "Enrollment",
        status: "Pending",
        uploadDate: "2024-01-20",
      },
      {
        name: "Transcript",
        type: "Academic",
        status: "Verified",
        uploadDate: "2024-01-20",
      },
    ],
  },
}) => {
  return (
    <>
      {" "}
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
            Submitted Documents
          </h4>

          <div className="space-y-4">
            {data.documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.status === "Verified"
                        ? "bg-green-100 dark:bg-green-900/50"
                        : "bg-yellow-100 dark:bg-yellow-900/50"
                    }`}
                  >
                    {doc.status === "Verified" ? (
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {doc.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {doc.type} • Uploaded {doc.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doc.status === "Verified"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200"
                    }`}
                  >
                    {doc.status}
                  </span>
                  <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
