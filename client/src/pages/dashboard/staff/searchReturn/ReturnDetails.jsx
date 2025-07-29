import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BookOpenText,
  CheckCircle,
  AlertCircle,
  Calendar,
  DollarSign,
  Info,
} from "lucide-react";

import server from "../../../../services/server.api";
import useFeedback from "../../../../hooks/useFeedback";
import { imagePathUrl } from "../../../../utils/functions";
import PageHeader from "../../../../components/header/PageHeader";

// Child Component: Status Header
const StatusHeader = ({ data }) => {
  if (!data) return null;

  const isLate = new Date(data.returnDate) > new Date(data.dueDate);
  const statusText = isLate ? "Returned Late" : "Returned On Time";

  return (
    <div
      className={`rounded-2xl p-6 border ${
        isLate
          ? "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700"
          : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isLate ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {isLate ? (
              <AlertCircle className="w-6 h-6 text-white" />
            ) : (
              <CheckCircle className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <h2
              className={`text-xl font-bold ${
                isLate
                  ? "text-red-800 dark:text-red-200"
                  : "text-green-800 dark:text-green-200"
              }`}
            >
              {statusText}
            </h2>
            <p
              className={`flex items-center space-x-2 ${
                isLate
                  ? "text-red-700 dark:text-red-300"
                  : "text-green-700 dark:text-green-300"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>
                Returned on:{" "}
                {data.returnDate
                  ? new Date(data.returnDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Child Component: Main Details Card
const DetailsCard = ({ data, navigate }) => {
  if (!data) return null;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Book Info */}
      <div className="flex items-start space-x-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <img
          src={imagePathUrl("book")}
          alt={data?.book?.title ?? "Book"}
          className="w-16 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
        />
        <div className="flex-1">
          <h3
            onClick={() => navigate(`/staff/dashboard/books/${data?.book?.id}`)}
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
              Acc. No: {data?.book?.accessionNumber ?? "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Member Info */}
      <div className="flex items-center space-x-3 my-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
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
            className="font-semibold hover:cursor-pointer hover:underline text-gray-900 dark:text-white text-sm"
          >
            {data?.member?.fullName ?? "Unknown Member"}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {data?.member?.program ?? "N/A"} • Card:{" "}
            {data?.member?.cardNumber ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Return Details Table */}
      <div className="space-y-2 text-sm">
        <DetailRow
          label="Issue Reference No."
          value={data?.issueRefNumber}
          isMono
        />
        <DetailRow
          label="Issue Date"
          value={
            data?.issueDate ? new Date(data.issueDate).toLocaleString() : "N/A"
          }
        />
        <DetailRow
          label="Due Date"
          value={
            data?.dueDate ? new Date(data.dueDate).toLocaleString() : "N/A"
          }
        />
        <DetailRow
          label="Return Date"
          value={
            data?.returnDate
              ? new Date(data.returnDate).toLocaleString()
              : "N/A"
          }
        />
        <DetailRow label="Issued By" value={data?.issuedBy} />
        <DetailRow label="Returned By" value={data?.returnedBy} />
        <DetailRow
          label="Times Issued (This Copy)"
          value={data?.book?.timesIssued ?? 0}
        />
      </div>
    </div>
  );
};

// Child Component for Fine and Remarks
const FinancialCard = ({ data }) => {
  if (!data) return null;
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-4">
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-green-500" />
          Fine Details
        </h4>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl space-y-2 text-sm">
          <DetailRow
            label="Fine Amount"
            value={`₹${data?.fine?.amount ?? 0}`}
          />
          <DetailRow label="Payment Method" value={data?.fine?.paymentMethod} />
          <DetailRow
            label="Debited On"
            value={
              data?.fine?.paidOn
                ? new Date(data.fine.paidOn).toLocaleString()
                : "N/A"
            }
          />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center">
          <Info className="w-5 h-5 mr-2 text-blue-500" />
          Remarks
        </h4>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl space-y-2 text-sm">
          <DetailRow
            label="At Issue"
            value={data?.remarks?.issue || "No remark."}
          />
          <DetailRow
            label="At Return"
            value={data?.remarks?.return || "No remark."}
          />
        </div>
      </div>
    </div>
  );
};

// Helper for detail rows
const DetailRow = ({ label, value, isMono = false }) => (
  <div className="flex justify-between">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span
      className={`font-medium text-gray-900 dark:text-white ${
        isMono ? "font-mono" : ""
      }`}
    >
      {value ?? "N/A"}
    </span>
  </div>
);

// Main Page Component
const ReturnDetails = () => {
  const setFeedback = useFeedback();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setFeedback(2, "No return ID specified.");
      navigate(-1); // Go back if no ID
      return;
    }
    (async () => {
      try {
        const res = await server.return.fetchReturn(id);
        if (!res.data) {
          throw new Error("Return record not found.");
        }
        setData(res.data);
      } catch (error) {
        setFeedback(2, error.message || "Could not fetch return details.");
        navigate("/staff/dashboard/returns"); // Navigate to a safe page on error
      } finally {
        setLoading(false);
      }
    })();
  }, [id, setFeedback, navigate]);

  if (loading) return null;

  return (
    <div className="min-h-screen space-y-5">
      <PageHeader
        title="Return Details"
        svg={BookOpenText}
        sub="View a complete record of a returned book"
      />
      <StatusHeader data={data} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DetailsCard data={data} navigate={navigate} />
        <FinancialCard data={data} />
      </div>
    </div>
  );
};

export default ReturnDetails;
