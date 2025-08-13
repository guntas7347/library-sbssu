// src/components/features/dashboard/staff/member/modals/NoDueConfirmation.jsx

import { User, ShieldAlert } from "lucide-react";
import ConfirmationModal from "../../../../modals/confirmation-model";

const NoDueConfirmation = ({
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
      title="Confirm: Issue No-Due Certificate?"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 space-y-4">
        {/* Member Info */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <User className="w-4 h-4 mr-2 text-blue-500" />
            Member
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {data?.fullName ?? "N/A"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              ID: {data?.membershipId ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Warning Section */}
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <h4 className="font-bold text-red-800 dark:text-red-200 mb-2 flex items-center">
            <ShieldAlert className="w-5 h-5 mr-2" />
            Important Notice
          </h4>
          <p className="text-sm text-red-700 dark:text-red-300">
            This action is final. It will permanently block all of the member's
            library cards and change their status to "Cleared".
          </p>
        </div>

        <p className="text-center text-gray-600 dark:text-gray-400 pt-2">
          Are you sure you want to proceed?
        </p>
      </div>
    </ConfirmationModal>
  );
};

export default NoDueConfirmation;
