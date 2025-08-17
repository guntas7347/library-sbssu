import { BookMarked, BookX } from "lucide-react";
import React, { useState } from "react";
import server from "../../../../../services/server.api";
import useFeedback from "../../../../../hooks/useFeedback";
import Confirmation from "./Confirmation";
import useAlert from "../../../../../hooks/useAlert";
import LostBookReport from "./LostBookReport";

const Summary = ({ data }) => {
  const setFeedback = useFeedback();
  const [btn, setBtn] = useState(true);
  const { showAlert, closeAlert, openAlert } = useAlert();
  const [showLost, setShowLost] = useState(false);

  const handleReturnBook = async () => {
    try {
      setBtn(false);
      const res = await server.return.return({
        id: data.issue.id,
        returnRemark: data.remark,
      });
      setFeedback(1, res);
    } catch (error) {
      setFeedback(2, error);
      setBtn(true);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BookMarked className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          Return Summary
        </h3>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Book
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              {/* ✅ SAFE: Safely access nested book data */}
              <p>{data?.book?.title ?? "Book title not available"}</p>
              <p>ID: {data?.book?.accessionNumber ?? "N/A"}</p>
            </div>
          </div>

          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
              Member
            </h4>
            <div className="text-sm text-green-700 dark:text-green-300">
              {/* ✅ SAFE: Safely access nested member data */}
              <p>{data?.member?.fullName ?? "Member name not available"}</p>
              <p>ID: {data?.member?.membershipId ?? "N/A"}</p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700">
            <h4 className="font-medium text-amber-900 dark:text-amber-100 mb-2">
              Return Details
            </h4>
            <div className="text-sm text-amber-700 dark:text-amber-300">
              <p>Return Date: {new Date().toDateString()}</p>
              {/* ✅ SAFE: Use fallback for fine and remark */}
              <p>Fine: ₹{data?.fine ?? 0}</p>
              {data?.remark && <p>Remark: {data.remark}</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center mt-5">
        <button
          onClick={openAlert}
          disabled={!btn || showLost}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <BookMarked className="w-6 h-6" />
          <span>Return Book</span>
        </button>

        <button
          onClick={() => setShowLost(!showLost)}
          className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white rounded-2xl hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <BookX className="size-6" />
        </button>
      </div>
      {showLost && <LostBookReport data={data} />}
      <Confirmation
        show={showAlert}
        onYes={handleReturnBook}
        onClose={closeAlert}
        data={data}
        isLoading={!btn}
      />
    </>
  );
};

export default Summary;
