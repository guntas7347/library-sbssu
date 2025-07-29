import React from "react";
import ConfirmationModal from "../../../../../modals/confirmation-model"; // Assuming this is the correct path
import { Book, User, Calendar, Clock, Info } from "lucide-react";
import { fromSnakeCase } from "../../../../../../utils/functions";

/**
 * A confirmation modal that summarizes the details of a book issue before finalizing.
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {function} props.onClose - Function to call when closing the modal.
 * @param {function} props.onYes - Function to call when confirming the action.
 * @param {object} props.data - The data object containing all issue details.
 * @param {boolean} props.isLoading - Flag to show a loading state on the confirmation button.
 */
const IssueConfirmation = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  data = {},
}) => {
  // Safely extract nested data with fallbacks
  const member = data?.member;
  const book = data?.book;
  const duration = data?.duration ?? 0;
  const issueCondition = data?.issueCondition;
  const remark = data?.remark;

  // Calculate the due date for display
  const issueDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(issueDate.getDate() + duration);

  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Confirm: Issue Book?"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 space-y-4">
        {/* Member Summary */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            Member
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-1">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {member?.fullName ?? "N/A"} ({member?.membershipId ?? "N/A"})
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Card: {member?.cardNumber ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Book Summary */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <Book className="w-4 h-4 mr-2 text-purple-500" />
            Book
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-1">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {book?.book?.title ?? "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              ID: {book?.accessionNumber ?? "N/A"} •{" "}
              <span className="capitalize">{book?.category ?? "N/A"}</span>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Book Condition:{" "}
              <span className="font-medium capitalize">
                {fromSnakeCase(issueCondition) ?? "N/A"}
              </span>
            </p>
          </div>
        </div>

        {/* Duration & Remark */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-amber-500" />
            Duration & Remark
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Issue Date
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {issueDate.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Duration</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {duration} days
              </span>
            </div>
            <div className="flex justify-between items-center font-bold">
              <span className="text-gray-600 dark:text-gray-400">Due Date</span>
              <span className="text-blue-600 dark:text-blue-400">
                {dueDate.toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-start pt-1 border-t border-gray-200 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-400 flex items-center pt-1">
                <Info className="w-3 h-3 mr-1.5" />
                Remark
              </span>
              <span className="font-medium text-gray-900 dark:text-white text-right max-w-xs break-words">
                {remark || "No remark provided."}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default IssueConfirmation;
