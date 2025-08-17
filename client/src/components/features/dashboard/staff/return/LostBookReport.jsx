import { BookX, AlertTriangle, IndianRupee } from "lucide-react";
import LostBookConfirmationModal from "./LostBookConfirmationModal";
import useAlert from "../../../../../hooks/useAlert";
import { useState } from "react";
import { useForm } from "../../../../../hooks/useForm";
import useFeedback from "../../../../../hooks/useFeedback";
import server from "../../../../../services/server.api";

const LostBookReport = ({ data }) => {
  const setFeedback = useFeedback();
  const { showAlert, closeAlert, openAlert } = useAlert();
  const [btn, setBtn] = useState(true);

  const { formFields, setFields } = useForm({ fine: "0" });

  const handleFineChange = (e) => {
    let value = e.target.value;

    // Remove invalid characters (only digits and one dot allowed)
    value = value.replace(/[^0-9.]/g, "");

    // Allow only a single dot
    const parts = value.split(".");
    if (parts.length > 2) {
      value = parts[0] + "." + parts[1];
    }

    // Prevent leading zeros unless it's "0." (for decimals like 0.5)
    if (value.startsWith("0") && !value.startsWith("0.") && value.length > 1) {
      value = value.replace(/^0+/, "");
    }

    // Limit to 2 decimal digits
    if (parts[1]?.length > 2) {
      value = parts[0] + "." + parts[1].slice(0, 2);
    }

    // Check numeric value for max limit (only if it's a valid number)
    if (value && !isNaN(value)) {
      const num = parseFloat(value);
      if (num > 1000000) {
        value = "1000000";
      }
    }

    // Update state (keep as string for money input)
    setFields({ fine: value });
  };

  const handleLostBookReport = async () => {
    try {
      setBtn(false);
      const res = await server.return.reportLost({
        id: data.issue.id,
        returnRemark: data.remark,
        fine: formFields.fine,
      });
      setFeedback(1, res);
    } catch (error) {
      setFeedback(2, error);
      setBtn(true);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <BookX className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
          Book Lost Report
        </h3>

        <div className="space-y-4">
          {/* Book and Member Details */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/20 rounded-xl border border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">
                Book:
              </span>{" "}
              {data.book.title} (ID: {data.book.accessionNumber})
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              <span className="font-semibold text-gray-900 dark:text-white">
                Member:
              </span>{" "}
              {data.member.fullName} (ID: {data.member.membershipId})
            </p>
          </div>

          {/* Fine Input */}
          <div>
            <label
              htmlFor="fine-amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Fine Amount
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <IndianRupee className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fine-amount"
                className="block w-full rounded-xl border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 pl-10 pr-4 py-3 text-gray-900 dark:text-white focus:ring-red-500 focus:border-red-500 transition"
                placeholder="0.00"
                value={formFields.fine}
                onChange={handleFineChange}
              />
            </div>
          </div>

          {/* Warning Box */}
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-700 flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100">
                Action Required
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                The book will be marked as lost. The member will be fined the
                amount entered above. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 items-center mt-5">
        <button
          onClick={openAlert}
          className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 text-white rounded-2xl hover:from-red-700 hover:to-red-800 dark:hover:from-red-600 dark:hover:to-red-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <BookX className="w-6 h-6" />
          <span>Report Lost</span>
        </button>
      </div>

      <LostBookConfirmationModal
        show={showAlert}
        onYes={handleLostBookReport}
        onClose={closeAlert}
        data={{ ...data, ...formFields }}
        isLoading={!btn}
      />
    </>
  );
};

export default LostBookReport;
