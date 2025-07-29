import Actions from "../../../../table/Actions";
import Table from "../../../../table/Table";
import { imagePathUrl } from "../../../../../utils/functions";
import {
  AlertCircle,
  Book,
  CalendarDays,
  CheckCircle,
  Clock,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const IssueSearchTable = ({ data }) => {
  const navigate = useNavigate();

  const architecture = [
    {
      header: "Book Info",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Book className="w-4 h-4 mr-1 text-blue-500" />
            {item?.bookTitle || "Book Title N/A"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            by {item?.bookAuthor || "Author N/A"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Accession: {item?.accessionNumber || "N/A"}
          </div>
        </div>
      ),
    },
    {
      header: "Member Info",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item?.photo)}
            alt={item?.memberName || "N/A"}
            className="size-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {item?.memberName || "Member N/A"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item?.membershipId || "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Issue Details",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-900 dark:text-white flex items-center">
            <CalendarDays className="w-4 h-4 mr-1 text-green-500" />
            {new Date(item?.issueDate).toDateString() || "N/A"}
          </div>
          <div
            className={`text-sm flex items-center ${
              item?.status === "overdue"
                ? "text-red-600 dark:text-red-400"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            <Clock className="w-4 h-4 mr-1" />
            Due: {new Date(item?.dueDate).toDateString() || "N/A"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Issued: {item?.timesIssued ?? 0} times
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      render: (item) => (
        <div className="space-y-1">
          {/* Ensure item.status exists before attempting to access it */}
          <span
            className={`inline-flex uppercase items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item?.status === "active"
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
            }`}
          >
            {item?.status === "active" ? (
              <CheckCircle className="w-3 h-3 mr-1" />
            ) : (
              <AlertCircle className="w-3 h-3 mr-1" />
            )}
            {item?.status || "Unknown"}
          </span>
          {/* Conditional rendering for overdue message */}
          {item?.status === "overdue" && (item?.daysOverdue ?? 0) > 0 && (
            <div className="text-xs text-red-600 dark:text-red-400 font-medium">
              {item?.daysOverdue} days overdue
            </div>
          )}
          {/* Use optional chaining and nullish coalescing for fineAmount */}
          <div
            className={`text-xs font-medium ${
              (item?.fineAmount ?? 0) > 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            Fine: {item?.fineAmount ?? 0}
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      render: (item) =>
        // Ensure item.id exists before passing to setModal
        item?.id ? (
          <Actions onView={() => navigate(item.id)}>
            <button
              className="p-2 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-lg transition-all duration-200"
              type="button"
            >
              <Mail className="w-4 h-4" />
            </button>
          </Actions>
        ) : (
          <span className="text-sm text-gray-500">No Actions (ID missing)</span>
        ),
    },
  ];

  return (
    <>
      <Table data={data} architecture={architecture} />
    </>
  );
};

export default IssueSearchTable;
