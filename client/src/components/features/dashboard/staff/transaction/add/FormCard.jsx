import { CreditCard, IndianRupee, Save } from "lucide-react";
import React, { useState } from "react";
import Input from "../../../../../forms/input/Input-2";
import Select from "../../../../../forms/select/Select";
import { useForm } from "../../../../../../hooks/useForm";
import TextArea from "../../../../../forms/input/TextArea";
import Confirmation from "./Confirmation";
import useAlert from "../../../../../../hooks/useAlert";
import useFeedback from "../../../../../../hooks/useFeedback";
import server from "../../../../../../services/server.api";

/**
 * A form for creating a new financial transaction for a member.
 * @param {{ member: object }} props
 */

const FormCard = ({ member = null }) => {
  const { formFields, handleChange, resetFormFields } = useForm({
    transactionType: "",
    category: "",
    amount: "0",
    paymentMethod: "",
    receiptNumber: "",
    remark: "",
  });
  const { showAlert, closeAlert, openAlert } = useAlert();
  const setFeedback = useFeedback();
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!member) return null; // Don't render if no member is selected

  const closingBalance = () => {
    const amount = parseFloat(formFields.amount);
    if (isNaN(amount)) return member.balance.toFixed(2);

    //  Use uppercase to match select options
    if (formFields.transactionType === "DEBIT") {
      return (member.balance - amount).toFixed(2);
    }
    if (formFields.transactionType === "CREDIT") {
      return (member.balance + amount).toFixed(2);
    }
    return member.balance.toFixed(2); // Default to current balance if no type selected
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        memberId: member.id,
        ...formFields,
        amount: parseFloat(formFields.amount), // Ensure amount is a number
      };
      const res = await server.transaction.create(payload);
      setFeedback(1, res);
      resetFormFields();
    } catch (error) {
      setFeedback(2, error.message || "Failed to create transaction.");
    } finally {
      setIsSubmitting(false);
      closeAlert();
    }
  };

  //  Disable button if required fields are missing
  const isFormInvalid =
    !formFields.transactionType ||
    !formFields.category ||
    !formFields.paymentMethod ||
    parseFloat(formFields.amount) <= 0;

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (isFormInvalid) return; // Prevent submission if form is invalid
          openAlert();
        }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <CreditCard className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
          Transaction Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
          <Input label="Member Name" value={member?.fullName ?? ""} readOnly />
          <Input
            label="Membership ID"
            value={member?.membershipId ?? ""}
            readOnly
          />
          <Select
            label="Transaction Type"
            name="transactionType"
            options={[
              { label: "Credit", value: "CREDIT" },
              { label: "Debit", value: "DEBIT" },
            ]}
            required
            onChange={handleChange}
            value={formFields.transactionType}
          />
          <Select
            label="Category"
            name="category"
            options={["late fee", "refund", "membership fee", "other"]} // Use snake_case for consistency
            required
            onChange={handleChange}
            value={formFields.category}
          />
          <Input
            label="Amount"
            name="amount"
            type="number"
            placeholder="0.00"
            SVG={IndianRupee}
            onChange={handleChange}
            value={formFields.amount}
            min="0.01"
            step="0.01"
            required
          />
          <Input
            label="New Balance"
            svg={IndianRupee}
            value={closingBalance()}
            readOnly
          />
          <Select
            label="Payment Method"
            name="paymentMethod"
            options={["sbi collect", "cash", "other"]}
            required
            onChange={handleChange}
            value={formFields.paymentMethod}
          />
          <Input
            label="Receipt Number"
            name="receiptNumber"
            placeholder="e.g., DLU12345, 2358"
            onChange={handleChange}
            required={formFields.transactionType === "CREDIT"}
            value={formFields.receiptNumber}
          />
        </div>
        <TextArea
          label="Remark"
          name="remark"
          placeholder="Enter any notes about this transaction..."
          onChange={handleChange}
          value={formFields.remark}
        />

        <button
          type="submit"
          disabled={isFormInvalid || isSubmitting}
          className="w-full px-6 py-4 mt-5 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-2xl hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <Save className="w-5 h-5" />
          <span>{isSubmitting ? "Processing..." : "Add Transaction"}</span>
        </button>
      </form>
      <Confirmation
        show={showAlert}
        data={formFields}
        member={member}
        onYes={handleSubmit}
        onClose={closeAlert}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default FormCard;
