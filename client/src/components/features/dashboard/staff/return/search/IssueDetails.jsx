import {
  BookMarked,
  Calendar,
  CheckCircle,
  Clock,
  NotebookPen,
  User,
} from "lucide-react";

const IssueDetails = ({ issue }) => {
  // ✅ SAFE: Guard clause prevents crashes if the issue object isn't available.
  if (!issue) return null;

  return (
    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
      <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-3">
        Issue Details
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-purple-700 dark:text-purple-300">
            {/* ✅ SAFE: Check for date before trying to format it */}
            Issued:{" "}
            {issue?.issueDate
              ? new Date(issue.issueDate).toDateString()
              : "N/A"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-purple-700 dark:text-purple-300">
            Due:{" "}
            {issue?.dueDate ? new Date(issue.dueDate).toDateString() : "N/A"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-purple-700 dark:text-purple-300">
            By: {issue?.issuedBy ?? "N/A"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <BookMarked className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-purple-700 dark:text-purple-300">
            ID: {issue?.issueRefNumber ?? "N/A"}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-purple-700 dark:text-purple-300">
            Book condition:{" "}
            <span className="uppercase">{issue?.issueCondition ?? "N/A"}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm mt-3">
        <NotebookPen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        <span className="text-purple-700 dark:text-purple-300">
          Remark: <span>{issue?.issueRemark ?? "None"}</span>
        </span>
      </div>
    </div>
  );
};

export default IssueDetails;
