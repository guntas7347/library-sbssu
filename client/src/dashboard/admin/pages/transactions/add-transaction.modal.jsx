import React, { useState } from "react";
import server from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import Select from "../../../../components/forms/select-input";
import { useFeedback } from "../../../../components/context/snackbar.context";
import SearchInput from "../../../../components/forms/search-input";
import useInput from "../../../../components/hooks/use-input";
import Modal from "../../../../components/modals/modal.component";
import Button from "../../../../components/buttons/interactive-button";

const AddTransactionModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formField, handleChange: handleChangeForSearch } = useInput({});

  const [data, setData] = useState([]);
  const { formFields, handleChange } = useForm({
    amount: "",
    category: "OTHER",
    remark: "NONE",
  });

  const { fullName, balance } = data;
  const { category, transactionType, remark, amount, receiptNumber } =
    formFields;

  const handleSearch = async () => {
    await server.transactions
      .fetchMember(formField.value)
      .then((studentDoc) => {
        setData(studentDoc);
        handleChange({ target: { name: "memberId", value: studentDoc._id } });
      })
      .catch((error) => {
        setFeedback([1, 2, error]);
      });
  };

  const closingBalance = () => {
    if (transactionType === "CREDIT") return +balance + +amount;
    else return +balance - +amount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formFields.amount === "") return;
    setIsSubmitting(true);
    await server.transactions
      .addTransaction(formFields)
      .then((res) => {
        setFeedback(1, res);
        onClose();
      })
      .catch((error) => {
        setFeedback([1, 2, error]);
        setIsSubmitting(false);
      });
  };

  return (
    <Modal onClose={onClose} title="Add transaction">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <SearchInput
            label="Membership Id"
            name="membershipId"
            value={formField.value}
            onChange={handleChangeForSearch}
            onSearch={handleSearch}
            type="number"
            disabled={data.length !== 0}
          />
          {data.length !== 0 && (
            <>
              <Input
                disabled={true}
                label="Name"
                name="fullName"
                value={fullName}
              />
              <Input
                disabled={true}
                label="Balance"
                name="balance"
                value={Number(balance).toFixed(2)}
              />{" "}
              <Input
                label="Amount"
                name="amount"
                type="number"
                onChange={handleChange}
                value={formFields.amount}
                required={true}
              />
              <Select
                label="Transaction Type"
                name="transactionType"
                options={["CREDIT", "DEBIT"]}
                value={formFields.transactionType}
                onChange={handleChange}
              />{" "}
              <Input
                label="Closing Balance"
                name="closingBalance"
                value={closingBalance().toFixed(2)}
              />
              <Input
                label="Category"
                name="category"
                onChange={handleChange}
                value={category}
              />
              <Input
                label="Remark"
                name="remark"
                onChange={handleChange}
                value={remark}
              />{" "}
              {transactionType === "CREDIT" && (
                <>
                  <Select
                    disabled={transactionType === "DEBIT"}
                    label="Payment Method"
                    name="paymentMethod"
                    onChange={handleChange}
                    value={formFields.paymentMethod}
                    options={["CASH", "ONLINE"]}
                  />
                  <Input
                    label="Reciept Number"
                    onChange={handleChange}
                    name="receiptNumber"
                    value={receiptNumber}
                    required={true}
                  />
                </>
              )}
            </>
          )}
        </div>{" "}
        <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
          <Button
            label="Confirm"
            spinner={isSubmitting}
            passive={false}
            type="submit"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;
