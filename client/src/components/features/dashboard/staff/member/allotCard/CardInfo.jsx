import React, { useEffect } from "react";
import { CreditCard } from "lucide-react";

import Input from "../../../../../forms/input/Input-2";
import Select from "../../../../../forms/select/Select";
import TextArea from "../../../../../forms/input/TextArea";
import useSetting from "../../../../../../hooks/useSetting";
import Spinner from "../../../../../feedback/spinner/Spinner";

/**
 * A safe and interactive form for inputting new library card details.
 * Uses a read-only input for the prefix and an editable input for the suffix.
 *
 * @param {object} props
 * @param {object} props.formFields - The state object for the form.
 * @param {function} props.setFields - The function to update the parent form state.
 * @param {object} props.data - The member data containing the next card number and expiry date.
 */
const CardInfo = ({ formFields, setFields, data }) => {
  const { data: cardTypeOptions, loading } = useSetting(
    "LIBRARY-CARD-TYPES",
    []
  );

  // This effect runs when the component mounts or when the `data` prop changes.
  // It pre-fills the form with the next available card number and expiry date.
  useEffect(() => {
    if (data?.nextCardNumber) {
      setFields({
        cardNumber: data.nextCardNumber,
        // The date input expects 'YYYY-MM-DD' format, so we slice the ISO string.
        expiryDate: data.newCardExpiryDate?.slice(0, 10),
      });
    }
  }, [data]);

  const cardNumber = formFields?.cardNumber ?? "";
  const prefix = cardNumber.slice(0, 12); // e.g., "CRD-25-015-"
  const suffix = cardNumber.slice(12); // e.g., "08"

  const handleSuffixChange = (e) => {
    const newSuffix = e.target.value;
    // Only allow numeric input and ensure it's not longer than 2 digits
    if (/^\d{0,2}$/.test(newSuffix)) {
      setFields({ cardNumber: `${prefix}${newSuffix}` });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ [name]: value });
  };

  if (loading) {
    return <Spinner message="Loading card types..." />;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
        <CreditCard className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
        New Card Information
      </h3>
      <div className="grid gap-y-4">
        {/* Card Number Input with separate Prefix and Suffix */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Card Number
          </label>
          <div className="flex items-center">
            {/* Read-only input for the prefix */}
            <input
              type="text"
              value={prefix}
              readOnly
              className="w-auto flex-shrink px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-xl font-mono text-gray-500 dark:text-gray-400 focus:outline-none"
            />
            {/* Editable input for the suffix */}
            <input
              type="text"
              value={suffix}
              onChange={handleSuffixChange}
              maxLength="2"
              className="w-full flex-grow px-4 py-3 rounded-r-xl border-t border-r border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              placeholder="01"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Input
            label="Expiry Date"
            name="expiryDate"
            type="date"
            onChange={handleChange}
            value={formFields?.expiryDate ?? ""}
            required
          />
          <Select
            label="Card Type"
            name="cardType"
            options={cardTypeOptions}
            onChange={handleChange}
            required
          />
        </div>
        <TextArea
          label="Notes / Remark"
          name="remark"
          onChange={handleChange}
          value={formFields?.remark ?? ""}
        />
      </div>
    </div>
  );
};

export default CardInfo;
