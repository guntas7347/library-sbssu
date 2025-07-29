import Table from "../../../../table/Table";
import Actions from "../../../../table/Actions";
import { fromSnakeCase } from "../../../../../utils/functions";
import { Building, CheckCircle, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookTable = ({ data }) => {
  const navigate = useNavigate();

  const architecture = [
    {
      header: "Book Details",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {item.title || "Untitled"}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            by {item.author || "Unknown Author"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center space-x-2">
            <span>ISBN: {item.isbn || "N/A"}</span>
            <span>•</span>
            <span>{item.publicationYear || "Unknown Year"}</span>
          </div>
        </div>
      ),
    },
    {
      header: "Tags",
      render: (item) => (
        <div className="space-y-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
            {fromSnakeCase(item.category || "Book")}
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {fromSnakeCase(item.subcategory || "Book")}
          </div>
        </div>
      ),
    },
    {
      header: "Publication",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Building className="w-4 h-4 mr-1 text-gray-500" />
            {item.placeAndPublishers || "Unknown Publisher"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {item.edition || "Unknown"} edition • {item.pages || "N/A"} pages
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500">
            Location: {item.location || "Unknown"}
          </div>
        </div>
      ),
    },
    {
      header: "Availability",
      render: (item) => (
        <div className="space-y-1">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              item.availability
                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                : "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200"
            }`}
          >
            {item.availability ? (
              <CheckCircle className="w-3 h-3 mr-1" />
            ) : (
              <Clock className="w-3 h-3 mr-1" />
            )}
            {item.availability ? "Available" : "Unavailable"}
          </span>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {item.availableCopies ?? 0}/{item.totalCopies ?? 0} copies
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-900 dark:text-white">
              {item.rating ?? "No rating yet"}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Actions",
      render: (item) => <Actions onView={() => navigate(item.id)} />,
    },
  ];

  return (
    <>
      <Table data={data} architecture={architecture} />
    </>
  );
};

export default BookTable;
