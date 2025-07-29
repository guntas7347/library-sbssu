import { Book, User, Calendar, DollarSign, Info, FileText } from "lucide-react";
import ConfirmationModal from "../../../../modals/confirmation-model";

/**
 * A confirmation modal that summarizes the details of a book return before finalizing.
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {function} props.onClose - Function to call when closing the modal.
 * @param {function} props.onYes - Function to call when confirming the action.
 * @param {object} props.data - The data object containing all return details.
 * @param {boolean} props.isLoading - Flag to show a loading state on the confirmation button.
 */
const Confirmation = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  data = {},
  isLoading = false,
}) => {
  // Safely extract nested data with fallbacks to prevent crashes
  const book = data?.book;
  const member = data?.member;
  const issue = data?.issue;
  const fine = data?.fine;
  const remark = data?.remark;

  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Confirm: Return Book?"
      isLoading={isLoading}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 space-y-4">
        {/* Book Summary */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <Book className="w-4 h-4 mr-2 text-purple-500" />
            Book
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-1">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {book?.title ?? "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              ID: {book?.accessionNumber ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Member Summary */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            Member
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-1">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {member?.fullName ?? "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ID: {member?.membershipId ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Return Details */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <FileText className="w-4 h-4 mr-2 text-gray-500" />
            Return Details
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1.5" />
                Return Date
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                <DollarSign className="w-3 h-3 mr-1.5" />
                Fine
              </span>
              <span
                className={`font-bold ${
                  fine > 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                ₹{fine?.toFixed(2) ?? "0.00"}
              </span>
            </div>
            <div className="flex justify-between items-start">
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

export default Confirmation;
