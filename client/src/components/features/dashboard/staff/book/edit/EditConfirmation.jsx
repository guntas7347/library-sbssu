import ConfirmationModal from "../../../../../modals/confirmation-model";
import { AlertTriangle } from "lucide-react";

const EditConfirmation = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  data = {},
}) => {
  // Check if there are any new accessions to be added.
  const hasNewAccessions =
    data.newAccessions &&
    data.newAccessions.length > 0 &&
    data.newAccessions[0]?.accessionNumber;

  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Confirm Changes to Book"
    >
      <div className="space-y-4">
        {/* Summary of the book being edited */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Summary
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Title</span>
              <span className="font-medium text-gray-900 dark:text-white truncate max-w-xs">
                {data.title}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Author</span>
              <span className="font-medium text-green-600 dark:text-green-400">
                {data.author}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Existing Copies
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {data.accessions?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Conditional warning for adding new accessions */}
        {hasNewAccessions && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-2xl p-4 text-yellow-800 dark:text-yellow-200">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold">
                  You are adding {data.newAccessions.length} new book copies.
                </h4>
                <p className="text-sm mt-1">
                  Please be aware that this action is irreversible. Once added,
                  these new accessions cannot be removed from this screen.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConfirmationModal>
  );
};

export default EditConfirmation;
