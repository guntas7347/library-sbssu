import Table from "../../../../table/Table";
import { fromSnakeCase, imagePathUrl } from "../../../../../utils/functions";
import Actions from "../../../../table/Actions";
import { Book, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReturnTable = ({ data }) => {
  const navigate = useNavigate();

  const architecture = [
    {
      header: "Book Info",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Book className="w-4 h-4 mr-1 text-green-500" />
            {item?.bookTitle || "Title Not Available"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            by {item?.bookAuthor || "Author Not Available"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 font-mono">
            Acc. No: {item?.accessionNumber || "N/A"}
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
            alt={item?.memberName || "Member"}
            className="size-8 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {item?.memberName || "Member Name N/A"}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item?.membershipId || "ID N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Return Details",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm text-gray-900 dark:text-white flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
            {item?.returnDate || "N/A"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Borrowed: {item?.borrowDuration ?? 0} days
          </div>
          <div
            className={`text-xs font-medium ${
              item?.isLate
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            {item?.isLate ? "Returned Late" : "Returned On Time"}
          </div>
        </div>
      ),
    },
    {
      header: "Condition & Fine",
      render: (item) => (
        <div className="space-y-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}
          >
            {fromSnakeCase(item?.condition || "unknown")}
          </span>
          <div
            className={`text-sm font-medium flex items-center ${
              (item?.fine ?? 0) > 0
                ? "text-red-600 dark:text-red-400"
                : "text-green-600 dark:text-green-400"
            }`}
          >
            ₹ {item?.fine ?? 0}
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      render: (item) =>
        // Only render actions if there is an item ID to prevent errors
        item?.id ? (
          <Actions onView={() => navigate(item.id)}></Actions>
        ) : (
          <span className="text-xs text-gray-400">No ID</span>
        ),
    },
  ];

  return (
    <>
      <Table data={data} architecture={architecture} />
    </>
  );
};

export default ReturnTable;
