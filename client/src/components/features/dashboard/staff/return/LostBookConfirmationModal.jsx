import { Book, User, DollarSign, AlertTriangle, X } from "lucide-react";
import ConfirmationModal from "../../../../modals/confirmation-model";

/**
 * A confirmation modal that summarizes the details of a lost book report before finalizing.
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {function} props.onClose - Function to call when closing the modal.
 * @param {function} props.onYes - Function to call when confirming the action.
 * @param {object} props.data - The data object containing all lost book details.
 * @param {boolean} props.isLoading - Flag to show a loading state on the confirmation button.
 */
const LostBookConfirmationModal = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  data = {},
  isLoading = false,
}) => {
  // Safely extract nested data with fallbacks
  const book = data?.book;
  const member = data?.member;
  const fine = data?.fine;

  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Confirm: Report Book as Lost?"
      isLoading={isLoading}
      confirmButtonVariant="danger" // Use a red button for destructive actions
      confirmButtonText="Yes, Report Lost"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl space-y-4">
        {/* Book & Member Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Book */}
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
          {/* Member */}
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
        </div>

        {/* Fine Details */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <DollarSign className="w-4 h-4 mr-2 text-green-500" />
            Fine to be Levied
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                Fine Amount
              </span>
              <span className="font-bold text-xl text-red-500">
                ₹{fine ? parseFloat(fine).toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        </div>

        {/* Warning Section */}
        <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700 flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-red-900 dark:text-red-100">
              This action cannot be undone.
            </h4>
            <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 mt-2 space-y-1">
              <li>
                The book will be permanently marked as <strong>lost</strong>.
              </li>
              <li>
                The member's account will be fined the amount shown above.
              </li>
              <li>The member's card will be cleared for issuing new books.</li>
            </ul>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default LostBookConfirmationModal;
