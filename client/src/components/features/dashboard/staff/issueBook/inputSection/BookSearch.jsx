import { Book, Scan } from "lucide-react";
import React, { useEffect, useState } from "react";
import Input from "../../../../../forms/input/Input-2";
import useFeedback from "../../../../../../hooks/useFeedback";
import { useForm } from "../../../../../../hooks/useForm";
import server from "../../../../../../services/server.api";
import { imagePathUrl } from "../../../../../../utils/functions";

const BookSearch = ({ onSelect }) => {
  const setFeedback = useFeedback();
  const { formFields, handleChange } = useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const input = formFields.search?.trim();
    if (!input || isNaN(+input)) return;

    setLoading(true);
    try {
      const { data } = await server.issue.book(input);
      setData(data);
      onSelect?.(data);
    } catch (error) {
      setData(null);
      setFeedback(
        2,
        error.message || "Something went wrong while fetching book info."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch();
    }, 800);
    return () => clearTimeout(debounce);
  }, [formFields.search]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Book className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
        Book Information
      </h3>

      <div className="space-y-4">
        <Input
          label="Accession Number"
          placeholder="Enter Accession Number"
          name="search"
          onChange={handleChange}
          SVG={<Scan />}
        />

        {loading && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Searching...
          </div>
        )}

        {data && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-700">
            <div className="flex items-start space-x-4">
              <img
                src={imagePathUrl(data?.book?.coverImage)}
                alt={data?.book?.title || "Book cover"}
                className="w-16 h-20 object-cover rounded-lg border border-purple-200 dark:border-purple-600"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">
                  {data?.book?.title ?? "Untitled"}
                </h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">
                  by {data?.book?.author ?? "Unknown Author"}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs text-purple-600 dark:text-purple-400">
                  <div>Accession: {data.accessionNumber}</div>
                  <div>Category: {data.category ?? "N/A"}</div>
                  <div>Location: {data?.book?.location ?? "N/A"}</div>
                  <div>
                    Available: {data.availableCount}/{data.totalCopies}
                  </div>
                </div>
                <div className="mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      data.status === "available"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200"
                        : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200"
                    }`}
                  >
                    {data.status?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
