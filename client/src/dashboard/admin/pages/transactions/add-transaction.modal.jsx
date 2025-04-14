import React, { useContext, useState } from "react";
import server from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import Select from "../../../../components/forms/select-input";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import SearchInput from "../../../../components/forms/search-input";
import useInput from "../../../../components/hooks/use-input";

const AddTransactionModal = ({ onClose }) => {
  const { setFeedback } = useContext(SnackBarContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { formField, handleChange: handleChangeForSearch } = useInput({});

  const [data, setData] = useState([]);
  const { formFields, handleChange } = useForm({
    amount: "",
    transactionType: "CREDIT",
    category: "OTHER",
    remark: "NONE",
    paymentMethod: "CASH",
  });

  const { fullName, balance } = data;
  const {
    category,
    transactionType,
    remark,
    amount,
    paymentMethod,
    receiptNumber,
  } = formFields;

  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     await fetchStudentById(id)
  //       .then((studentDoc) => {
  //         setData(studentDoc);
  //       })
  //       .catch(() => setData({ fullName: "Not Found" }));
  //   };
  //   asyncFunc();
  // }, []);

  const handleSearch = async () => {
    await server.transactions
      .fetchMember(formField.value)
      .then((studentDoc) => {
        setData(studentDoc);
        handleChange({ target: { name: "memberId", value: studentDoc._id } });
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const closingBalance = () => {
    if (transactionType === "CREDIT") return +balance + +amount;
    else return +balance - +amount;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await server.transactions
      .addTransaction(formFields)
      .then((res) => {
        setFeedback([1, 1, res]);
        onClose();
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <div>
        <div
          id="default-modal"
          aria-hidden="true"
          className=" flex inset-0 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Transaction
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 ">
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
                        />
                        <Select
                          label="Transaction Type"
                          name="transactionType"
                          options={["CREDIT", "DEBIT"]}
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
                              value={
                                transactionType === "DEBIT"
                                  ? "N/A"
                                  : paymentMethod
                              }
                              options={["CASH", "ONLINE"]}
                            />
                            <Input
                              label="Reciept Number"
                              onChange={handleChange}
                              name="receiptNumber"
                              value={receiptNumber}
                            />
                          </>
                        )}
                      </>
                    )}
                  </div>{" "}
                  <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTransactionModal;
