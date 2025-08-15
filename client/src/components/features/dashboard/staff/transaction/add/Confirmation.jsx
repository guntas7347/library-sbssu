// src/components/features/dashboard/staff/transactions/cards/Confirmation.jsx

import ConfirmationModal from "../../../../../modals/confirmation-model";
import { fromSnakeCase } from "../../../../../../utils/functions";

/**
 * A confirmation modal that summarizes a new transaction before creation.
 * @param {{ show: boolean, onClose: function, onYes: function, data: object, member: object, isSubmitting: boolean }} props
 */
const Confirmation = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  data = {},
  member = {},
  isSubmitting = false,
}) => {
  const isDebit = data.transactionType === "DEBIT";
  const amount = data.amount / 100 || 0;
  const previousBalance = member.balance / 100 || 0;
  const newBalance = isDebit
    ? previousBalance - amount
    : previousBalance + amount;

  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Confirm Transaction"
      isLoading={isSubmitting}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Please confirm the following details:
        </h3>
        <div className="space-y-3 text-sm">
          {/* Member Details */}
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Member</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {member?.fullName ?? "N/A"} ({member?.membershipId ?? "N/A"})
            </span>
          </div>

          {/* Category */}
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Category</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">
              {fromSnakeCase(data?.category) ?? "N/A"}
            </span>
          </div>

          {/* Amount */}
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Amount</span>
            <span
              className={`font-bold text-lg ${
                isDebit ? "text-red-500" : "text-green-500"
              }`}
            >
              {isDebit ? "-" : "+"} ₹{amount.toFixed(2)}
            </span>
          </div>

          {!isDebit && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Reciept Number
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {data?.receiptNumber ?? "N/A"}
              </span>
            </div>
          )}

          {/* Remarks */}
          {data?.remark && (
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Remark</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {data?.remark ?? "N/A"}
              </span>
            </div>
          )}

          {/* Balance Change */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Previous Balance
              </span>
              <span className="font-medium text-gray-500 dark:text-gray-300">
                ₹{previousBalance.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                New Balance
              </span>
              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                ₹{newBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default Confirmation;
