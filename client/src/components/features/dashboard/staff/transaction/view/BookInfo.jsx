import { Book } from "lucide-react";

import { imagePathUrl } from "../../../../../../utils/functions";
import { useNavigate } from "react-router-dom";

const BookInfo = ({ data }) => {
  // A transaction may not be linked to a book (e.g. membership fee)

  const navigate = useNavigate();
  if (!data) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Book className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
          Related Book
        </h4>
        <div className="flex items-start space-x-4">
          <img
            src={imagePathUrl("book")} // Placeholder, should be data?.coverImage if available
            alt={data?.title ?? "Book"}
            className="w-16 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
          />
          <div>
            <h5
              onClick={() =>
                navigate(`/staff/dashboard/search-returns/${data.id}`)
              }
              className="font-semibold hover:cursor-pointer hover:underline text-gray-900 dark:text-white text-sm leading-tight"
            >
              {data?.title ?? "No Title"}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              by {data?.author ?? "Unknown Author"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 font-mono">
              Acc. No: {data?.accessionNumber ?? "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
