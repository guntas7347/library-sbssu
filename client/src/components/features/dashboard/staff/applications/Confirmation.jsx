import { User, GraduationCap, Info, CreditCard } from "lucide-react";
import ConfirmationModal from "../../../../modals/confirmation-model";
import { fromSnakeCase } from "../../../../../utils/functions";

/**
 * A confirmation modal that summarizes an data's details before approval.
 * @param {object} props
 * @param {boolean} props.show - Whether the modal is visible.
 * @param {function} props.onClose - Function to call when closing the modal.
 * @param {function} props.onYes - Function to call when confirming the action.
 * @param {object} props.data - The data object containing the data's details.
 */
const ApplicationConfirmation = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  data = {},
}) => {
  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Confirm: Approve Application?"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 space-y-4">
        {/* Applicant Details */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            Applicant Details
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-1">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {data?.fullName ?? "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Roll No: {data?.rollNumber || "Not Provided"}
            </p>
          </div>
        </div>

        {/* Academic Details */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <GraduationCap className="w-4 h-4 mr-2 text-purple-500" />
            Academic Details
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-1">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {fromSnakeCase(data?.program) ?? "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {fromSnakeCase(data?.specialization) ?? "N/A"} • Batch:{" "}
              {data?.batch ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <Info className="w-4 h-4 mr-2 text-gray-500" />
            Additional Info
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Caste</span>
              <span className="font-medium text-gray-900 dark:text-white capitalize">
                {fromSnakeCase(data?.cast) ?? "N/A"}
              </span>
            </div>
          </div>
        </div>

        {/* Allotment Summary */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-green-500" />
            Action Summary
          </h4>
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm text-center">
            <p className="font-medium text-green-800 dark:text-green-200">
              Approving this application will allot{" "}
              <span className="font-bold">{data?.cardLimit ?? 0}</span> library
              cards.
            </p>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default ApplicationConfirmation;
