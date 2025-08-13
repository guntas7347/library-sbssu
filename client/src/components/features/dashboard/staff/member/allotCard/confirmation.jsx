import ConfirmationModal from "../../../../../modals/confirmation-model";
import { User, CreditCard } from "lucide-react";
import { fromSnakeCase } from "../../../../../../utils/functions";

const AllotCardConfirmation = ({
  show = false,
  onClose = () => {},
  onYes = () => {},
  member = {},
  cardDetails = {},
}) => {
  return (
    <ConfirmationModal
      show={show}
      onClose={onClose}
      onYes={onYes}
      title="Confirm: Allot New Card?"
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
              {member?.fullName ?? "N/A"}
            </p>
          </div>
        </div>

        {/* New Card Details */}
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-purple-500" />
            New Card Details
          </h4>
          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Card Number
              </span>
              <span className="font-medium text-gray-900 dark:text-white font-mono">
                {cardDetails?.cardNumber ?? "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Card Type
              </span>
              <span className="font-medium text-gray-900 dark:text-white capitalize">
                {fromSnakeCase(cardDetails?.cardType) ?? "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Expiry Date
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {cardDetails?.expiryDate
                  ? new Date(cardDetails.expiryDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ConfirmationModal>
  );
};

export default AllotCardConfirmation;
