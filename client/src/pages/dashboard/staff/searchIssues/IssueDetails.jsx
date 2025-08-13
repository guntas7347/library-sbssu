import React, { useEffect, useState } from "react";
import {
  BookOpen,
  AlertCircle,
  CheckCircle,
  Calendar,
  Clock,
} from "lucide-react";

import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import { imagePathUrl } from "../../../../utils/functions";
import PageHeader from "../../../../components/header/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import IssuedBooksPage from "../../../../components/samples/viewIssuedBook";

const IssueDetails = () => {
  const setFeedback = useFeedback();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setFeedback(2, "No issue ID was provided.");
      return;
    }

    (async () => {
      try {
        const res = await server.issue.fetch(id);
        setData(res.data);
      } catch (error) {
        setFeedback(2, error.message || "Failed to fetch issue details.");
      } finally {
        setLoading(false);
      }
    })();
  }, []); // Dependencies ensure this runs correctly

  if (loading) return null;

  if (!data) {
    return (
      <div className="text-center p-8">
        <h3 className="font-semibold">No Data</h3>
        <p className="text-gray-500">Could not load the issue details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-5">
      <PageHeader
        title="Issue Details"
        svg={BookOpen}
        sub="View details of your issued book"
      />
      <StatusHeader data={data} />

      {/* Book & Member Info */}
      <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Book Info */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={imagePathUrl("book")} // Assuming a generic book image
            alt={data?.book?.title ?? "Book"}
            className="w-16 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
          />
          <div className="flex-1">
            <h3
              onClick={() =>
                navigate(`/staff/dashboard/books/${data?.book?.id}`)
              }
              className="font-bold text-gray-900 hover:cursor-pointer hover:underline dark:text-white text-sm leading-tight mb-1"
            >
              {data?.book?.title ?? "No Title"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              by {data?.book?.author ?? "Unknown Author"}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 px-2 py-1 rounded-full capitalize">
                {data?.book?.category ?? "N/A"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                {data?.book?.accessionNumber ?? "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Member Info */}
        <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <img
            src={imagePathUrl(data?.member?.photo)}
            alt={data?.member?.fullName ?? "Member"}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />
          <div className="flex-1">
            <h4
              onClick={() =>
                navigate(`/staff/dashboard/members/${data?.member?.id}`)
              }
              className="font-semibold  hover:cursor-pointer hover:underline text-gray-900 dark:text-white text-sm"
            >
              {data?.member?.fullName ?? "Unknown Member"}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {data?.member?.program ?? "N/A"} • Card:{" "}
              {data?.member?.cardNumber ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Details Table */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Issue Reference No.
            </span>
            <span className="font-medium text-gray-900 dark:text-white font-mono">
              {data?.issueRefNumber ?? "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Issue Date</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data?.issueDate
                ? new Date(data.issueDate).toLocaleString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Due Date</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data?.dueDate ? new Date(data.dueDate).toLocaleString() : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Times Issued
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data?.book?.timesIssued ?? 0}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Issued By</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {data?.issuedBy ?? "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;

const StatusHeader = ({ data }) => {
  if (!data) return null;

  const dueDate = data?.dueDate ? new Date(data.dueDate) : null;
  const isOverdue = dueDate && dueDate < new Date();
  const statusText = isOverdue ? "Overdue" : "Not Overdue";

  return (
    <div
      className={`rounded-2xl p-6 border ${
        isOverdue
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
          : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isOverdue ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isOverdue ? (
              <AlertCircle className="w-6 h-6 text-white" />
            ) : (
              <CheckCircle className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2
              className={`text-xl font-bold ${
                isOverdue
                  ? "text-red-800 dark:text-red-200"
                  : "text-green-800 dark:text-green-200"
              }`}
            >
              {statusText}
            </h2>
            <p
              className={`flex items-center space-x-2 ${
                isOverdue
                  ? "text-red-700 dark:text-red-300"
                  : "text-green-700 dark:text-green-300"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>
                Due on: {dueDate ? dueDate.toLocaleDateString() : "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
