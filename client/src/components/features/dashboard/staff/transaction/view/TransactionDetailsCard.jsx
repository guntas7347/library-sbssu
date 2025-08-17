import { CreditCard, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import InfoField from "../../../../../forms/infoField/InfoField ";

const TransactionDetailsCard = ({ data }) => {
  if (!data) return null;
  const isDebit = data.transactionType === "DEBIT";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="p-8">
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <CreditCard className="w-6 h-6 mr-3 text-emerald-600 dark:text-emerald-400" />
          Transaction Information
          <span
            className={`ml-2 rounded-lg p-1 text-white text-sm ${
              isDebit ? "bg-red-400" : "bg-green-400"
            }`}
          >
            {data.transactionType}
          </span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoField
            label="Receipt Number"
            value={data?.receiptNumber ?? "N/A"}
          />
          <InfoField
            label="Category"
            value={data?.category ?? "N/A"}
            isCapitalized={true}
          />
          <InfoField
            label="Payment Method"
            value={data?.paymentMethod ?? "N/A"}
            isCapitalized={true}
          />
          <InfoField
            label="Transaction Date"
            value={
              data?.createdAt
                ? new Date(data.createdAt).toLocaleString()
                : "N/A"
            }
          />
          <InfoField
            label="Amount"
            value={
              <span
                className={`font-semibold ${
                  isDebit ? "text-red-600" : "text-green-600"
                }`}
              >
                ₹{data?.amount?.toFixed(2) ?? "0.00"}
              </span>
            }
          />
          <InfoField
            label="Closing Balance"
            value={`₹${data?.closingBalance?.toFixed(2) ?? "0.00"}`}
          />
          <InfoField
            label="Current Balance"
            value={`₹${data?.currentBalance?.toFixed(2) ?? "0.00"}`}
          />
          <InfoField label="Staff" value={data?.issuedBy ?? "N/A"} />
        </div>

        {data?.remark && (
          <div className="mt-6">
            <InfoField label="Notes" value={data.remark} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetailsCard;
