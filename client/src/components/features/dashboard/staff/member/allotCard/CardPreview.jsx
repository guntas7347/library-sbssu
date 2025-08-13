import { CreditCard, Save } from "lucide-react";
import React, { useState } from "react";
import AllotCardConfirmation from "./confirmation";
import useFeedback from "../../../../../../hooks/useFeedback";
import useAlert from "../../../../../../hooks/useAlert";
import server from "../../../../../../services/server.api";
import { fromSnakeCase } from "../../../../../../utils/functions";

const CardPreview = ({ cardDetails, onSuccess }) => {
  const { showAlert, openAlert, closeAlert } = useAlert();
  const setFeedback = useFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cardNumber = cardDetails?.cardNumber || "CRD-XX-XXX-XX";
  const cardType = cardDetails?.cardType || "";
  const expiryDate = cardDetails?.expiryDate
    ? new Date(cardDetails.expiryDate).toLocaleDateString("en-US", {
        month: "2-digit",
        year: "2-digit",
      })
    : "MM/YY";

  const handleAllotCard = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        memberId: cardDetails.id,
        ...cardDetails,
      };

      const res = await server.member.allotCard(payload);
      setFeedback(1, res);
      onSuccess(); // Notify parent component of success
    } catch (error) {
      setFeedback(2, error);
    } finally {
      setIsSubmitting(false);
      closeAlert();
    }
  };

  const isFormInvalid =
    !cardDetails?.cardNumber ||
    !cardDetails?.expiryDate ||
    !cardDetails?.cardType;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Card Preview & Action
        </h3>
        <div className="max-w-md mx-auto">
          {/* Card Preview */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="text-white/80 text-sm font-medium">
                SBSSU LIBRARY CARD
              </div>
              <CreditCard className="w-8 h-8 text-white/60" />
            </div>
            <div className="mb-4">
              <div className="text-white font-mono text-lg tracking-wider">
                {cardNumber}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-white/60 text-xs">CARDHOLDER</div>
                <div className="text-white font-semibold">
                  {cardDetails?.fullName?.toUpperCase() ?? "MEMBER NAME"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-xs">VALID THRU</div>
                <div className="text-white font-semibold">{expiryDate}</div>
              </div>
              <div className="text-right">
                <div className="text-white/60 text-xs">Card Type</div>
                <div className="text-white font-semibold">
                  {fromSnakeCase(cardType)}
                </div>
              </div>
            </div>
          </div>

          {/* Allot Button */}
          <button
            type="button"
            onClick={openAlert}
            disabled={isFormInvalid || isSubmitting}
            className="w-full px-6 py-4 mt-6 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-2xl hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? "Allotting Card..." : "Allot New Card"}</span>
          </button>
        </div>
      </div>
      {/* The Confirmation Modal is now managed by this component */}
      <AllotCardConfirmation
        show={showAlert}
        onClose={closeAlert}
        onYes={handleAllotCard}
        member={cardDetails}
        cardDetails={cardDetails}
      />
    </>
  );
};

export default CardPreview;
