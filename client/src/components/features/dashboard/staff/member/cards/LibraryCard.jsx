import { useState } from "react";
import { Ban, CreditCard, PauseCircle, PlayCircle } from "lucide-react";

import InfoField from "../../../../../forms/infoField/InfoField-2";
import ConfirmationModal from "../../../../../modals/confirmation-model";
import useAlert from "../../../../../../hooks/useAlert";
import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";
import { fromSnakeCase, imagePathUrl } from "../../../../../../utils/functions";

/**
 * A self-contained, interactive card component for displaying and managing a library card.
 * @param {object} props
 * @param {object} props.data - The complete data for the library card and its member.
 * @param {function} props.onUpdate - A callback function to refresh the parent list after a status change.
 */
const LibraryCard = ({ data, onUpdate = () => {} }) => {
  const { showAlert, openAlert, closeAlert } = useAlert();
  const setFeedback = useFeedback();
  const [action, setAction] = useState(null); // To store the action type ('freeze', 'unfreeze', 'block')
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If data is not yet available, render a placeholder or nothing.
  if (!data) return null;

  const statusStyles = {
    available: {
      header: "bg-green-500",
      tag: "bg-white/20",
    },
    issued: {
      header: "bg-yellow-500",
      tag: "bg-white/20",
    },
    frozen: {
      header: "bg-blue-500",
      tag: "bg-white/20",
    },
    lost: {
      header: "bg-orange-500",
      tag: "bg-white/20",
    },
    blocked: {
      header: "bg-gray-700",
      tag: "bg-white/20",
    },
    expired: {
      header: "bg-red-500",
      tag: "bg-white/20",
    },
  };

  const currentStatus = data?.status ?? "blocked";
  const styles = statusStyles[currentStatus] || statusStyles.blocked;

  const handleActionClick = (selectedAction) => {
    setAction(selectedAction);
    openAlert();
  };

  const handleConfirmAction = async () => {
    if (!action) return;
    setIsSubmitting(true);
    try {
      const res = await server.member.updateCardStatus(action);
      setFeedback(1, res);
      onUpdate();
    } catch (error) {
      setFeedback(2, error);
    } finally {
      setIsSubmitting(false);
      closeAlert();
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-3xl transition-shadow duration-300">
        {/* Card Header */}
        <div className={`${styles.header} p-6 text-white`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={imagePathUrl(data?.photo)}
                alt={data?.fullName ?? "Member"}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <h3 className="font-bold text-lg">{data?.fullName ?? "N/A"}</h3>
                <p className="text-white/80 text-sm">
                  {data?.membershipId ?? "N/A"}
                </p>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${styles.tag} capitalize`}
            >
              {data?.status ?? "Unknown"}
            </span>
          </div>

          {/* Card Visual */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:-translate-y-1 transition-all duration-300 transform">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white/80 text-xs">SBSSU LIBRARY CARD</div>
              <CreditCard className="w-6 h-6 text-white/60" />
            </div>
            <div className="text-white font-mono text-lg tracking-wider mb-2">
              {data?.cardNumber?.replace(/-/g, " ") ?? "N/A"}
            </div>
            <div className="flex justify-between items-end">
              <div>
                <div className="text-white/60 text-xs">VALID THRU</div>
                <div className="text-white text-sm font-medium">
                  {data?.expiry
                    ? new Date(data.expiry).toLocaleDateString("en-US", {
                        month: "2-digit",
                        year: "2-digit",
                      })
                    : "N/A"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-xs">TYPE</div>
                <div className="text-white text-sm font-medium capitalize">
                  {fromSnakeCase(data?.type) ?? "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Card Details & Actions */}
        <div className="p-6">
          <div className="space-y-4">
            <InfoField
              label="Issue Date"
              value={
                data?.createdAt
                  ? new Date(data.createdAt).toDateString()
                  : "N/A"
              }
            />
            <InfoField
              label="Issued By"
              value={data?.staff?.fullName ?? "System"}
            />
            <InfoField
              label="Issue Mode"
              value={data?.autoAlloted ? "Automatic" : "Manual"}
            />
            <InfoField
              label="Last Activity"
              value={
                data?.updatedAt
                  ? new Date(data.updatedAt).toLocaleString()
                  : "N/A"
              }
            />
          </div>

          {/* ✅ IMPROVEMENT: Conditional Action Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            {currentStatus !== "blocked" && (
              <>
                {currentStatus === "frozen" ? (
                  // Unfreeze Button (Blue)
                  <button
                    onClick={() =>
                      handleActionClick({ id: data.id, status: "available" })
                    }
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-all duration-200 font-medium"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span className="text-sm">Unfreeze</span>
                  </button>
                ) : (
                  // Freeze Button (Yellow)
                  <button
                    onClick={() =>
                      handleActionClick({ id: data.id, status: "frozen" })
                    }
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-xl hover:bg-yellow-200 dark:hover:bg-yellow-900/70 transition-all duration-200 font-medium"
                  >
                    <PauseCircle className="w-4 h-4" />
                    <span className="text-sm">Freeze</span>
                  </button>
                )}

                {/* Block Button (Red) */}
                <button
                  onClick={() =>
                    handleActionClick({ id: data.id, status: "blocked" })
                  }
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/70 transition-all duration-200 font-medium"
                >
                  <Ban className="w-4 h-4" />
                  <span className="text-sm">Block</span>
                </button>
              </>
            )}
            {currentStatus === "blocked" && (
              <div className="col-span-2 text-center text-sm p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg">
                This card is permanently blocked.
              </div>
            )}
          </div>
        </div>{" "}
        <ConfirmationModal
          show={showAlert}
          onClose={closeAlert}
          onYes={handleConfirmAction}
          title={`Confirm: ${fromSnakeCase(action?.verb)} Card?`}
          isLoading={isSubmitting}
        >
          <div className="p-4 text-center">
            <p className="text-lg">
              Are you sure you want to change this card's status to{" "}
              <strong className="capitalize">{action?.status}</strong>?
            </p>
            <span className="flex-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 p-2 rounded-lg mt-2">
              <CreditCard /> {data.cardNumber}
            </span>

            {action?.status === "blocked" && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                <h4 className="font-bold text-red-800 dark:text-red-200">
                  Warning!
                </h4>
                <p className="text-sm text-red-700 dark:text-red-300">
                  This action is irreversible. A blocked card cannot be changed
                  back.
                </p>
              </div>
            )}
          </div>
        </ConfirmationModal>
      </div>
    </>
  );
};

export default LibraryCard;
