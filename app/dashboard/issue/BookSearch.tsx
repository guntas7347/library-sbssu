import React, { useEffect, useState, useCallback } from "react";
import { Book, Scan, Search } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import {
  getBiblioById,
  getBookByBarcode,
  getItemsByBiblio,
} from "@/lib/koha/books";

const BookSearch = ({
  onSearch = () => {},
}: {
  onSearch: (bookData: any) => void;
}) => {
  const { formFields, handleChange } = useForm({ search: "" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const normalizeBook = (bookData) => {
    return {
      accessionNumber: bookData.biblio_id,
      category: bookData.framework_id,
      status: bookData.circulation_status || "HELLO", // adjust if backend sends real status
      availableCount: 1,
      totalCopies: 1,

      book: {
        title: bookData.title,
        author: bookData.author,
        location: bookData.publication_place,
        coverImage: null,
      },
    };
  };
  const fetchBook = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 1) {
      setData(null);
      setErrorMsg("");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const bookData = await getBookByBarcode(searchQuery);

      if (!bookData) {
        setData(null);
        setErrorMsg("No book found.");
        return;
      }

      setData(bookData);
      onSearch(bookData);
    } catch (error) {
      setData(null);
      setErrorMsg(
        error.message || "Something went wrong while fetching book info.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const searchTerm = formFields.search?.trim();

    const timer = setTimeout(() => {
      fetchBook(searchTerm);
    }, 800);

    return () => clearTimeout(timer);
  }, [formFields.search, fetchBook]);

  return (
    <div className="bg-white dark:bg-gray-800 space-y-5 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 sm:p-8 max-w-lg mx-auto">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center border-b border-gray-100 dark:border-gray-700 pb-4">
        <Book className="w-6 h-6 mr-3 text-purple-600 dark:text-purple-400" />
        Scan Book
      </h3>

      {/* Input */}
      <div className="flex flex-col space-y-1.5 relative">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Accession Number
        </label>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Scan className="h-5 w-5 text-gray-400" />
          </div>

          <input
            type="text"
            name="search"
            value={formFields.search}
            onChange={handleChange}
            placeholder="Enter accession number..."
            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white outline-none"
          />

          {loading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <Search className="h-5 w-5 text-purple-500 animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {errorMsg && !loading && (
        <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-800">
          {errorMsg}
        </div>
      )}

      {/* Book Display */}
      {data && (
        <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-5 border border-purple-100 dark:border-purple-800/50">
          <div className="flex items-start space-x-4">
            {/* Cover */}
            <div className="flex-shrink-0">
              {data?.coverImage ? (
                <img
                  src={data.coverImage}
                  alt={data.title}
                  className="w-20 h-28 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-20 h-28 bg-purple-100 dark:bg-purple-900/50 rounded-lg border flex items-center justify-center">
                  <Book className="w-8 h-8 text-purple-400" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg truncate">
                {data.title || "Untitled"}
              </h4>

              <p className="text-sm text-purple-700 dark:text-purple-400 truncate">
                {data.author || "Unknown Author"}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 mt-3">
                <div>
                  <span className="font-semibold">Barcode:</span>{" "}
                  {data.external_id}
                </div>

                <div>
                  <span className="font-semibold">Cat:</span>{" "}
                  {data.category || "N/A"}
                </div>

                <div>
                  <span className="font-semibold">Loc:</span>{" "}
                  {data.location || "N/A"}
                </div>

                <div>
                  <span className="font-semibold">Copies:</span>{" "}
                  {data.availableCount}/{data.totalCopies}
                </div>
              </div>

              {/* Status */}
              <div className="mt-3">
                <span
                  className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                    data.status === "available"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {data.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;
