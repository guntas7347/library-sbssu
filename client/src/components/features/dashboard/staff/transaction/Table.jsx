import React from "react";
import Table from "../../../../table/Table";
import { fromSnakeCase, imagePathUrl } from "../../../../../utils/functions";
import {
  Book,
  Calendar,
  CheckCircle,
  Clock,
  Tag,
  TrendingDown,
  TrendingUp,
  User,
  Wallet,
  XCircle,
} from "lucide-react";
import Actions from "../../../../table/Actions";
import { useNavigate } from "react-router-dom";
import GenderIcon from "../../../../blocks/genderIcon/GenderIcon";

const TransactionsTable = ({ data }) => {
  const navigate = useNavigate();

  const architecture = [
    {
      header: "Member Details",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <img
            src={imagePathUrl(item?.memberPhoto)}
            alt={item?.memberName ?? "Member"}
            className="size-10 rounded-full object-cover border border-gray-200 dark:border-gray-600"
          />
          <div>
            <div className="text-sm flex gap-1 font-medium text-gray-900 dark:text-white">
              {item?.memberName ?? "Unknown Member"}
              <GenderIcon gender={item.gender || "female"} />
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {item?.membershipId ?? "N/A"}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Transaction",
      render: (item) => {
        const isCredit = item?.transactionType === "CREDIT";
        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              {isCredit ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${
                  isCredit
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isCredit ? "+" : "-"}₹{item?.amount?.toFixed(2) ?? "0.00"}
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {item?.transactionDate
                ? new Date(item.transactionDate).toLocaleDateString()
                : "N/A"}
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
              {item?.receiptNumber ?? "N/A"}
            </div>
          </div>
        );
      },
    },
    {
      header: "Category",
      render: (item) => (
        <div className="space-y-1">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 capitalize">
            <Tag className="w-3 h-3 mr-1" />
            {fromSnakeCase(item?.category) ?? "General"}
          </span>
          {item?.bookTitle && (
            <div className="text-xs text-gray-500 dark:text-gray-500 flex items-center pt-1">
              <Book className="w-3 h-3 mr-1 flex-shrink-0" />
              <span className="truncate">{item.bookTitle}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Balance",
      render: (item) => (
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
            <Wallet className="w-4 h-4 mr-1 text-purple-500" />₹
            {item?.closingBalance?.toFixed(2) ?? "0.00"}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Prev: ₹{item?.previousBalance?.toFixed(2) ?? "0.00"}
          </div>
        </div>
      ),
    },
    {
      header: "Processed By",
      render: (item) => (
        <div className="text-sm font-medium text-gray-900 dark:text-white flex items-center">
          <User className="w-4 h-4 mr-1 text-gray-500" />
          {item?.processedBy ?? "System"}
        </div>
      ),
    },
    {
      header: "Actions",
      render: (item) =>
        item?.id ? (
          <Actions onView={() => navigate(item.id)} />
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

export default TransactionsTable;
