import React, { useEffect, useState } from "react";
import Input from "../../../../components/forms/input";
import { fetchTransaction } from "../../hooks/http-requests.hooks.admin";
import ReturnedBookModal from "../issue-book/searh-returned-books/view-book.issue-book.page.admin";

const TransactionModal = ({ id, onClose }) => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState("");

  const {
    createdAt,
    fullName,
    category,
    amount,
    transactionType,
    closingBalance,
    membershipId,
    returnedBookId,
    remark,
    paymentMethod,
  } = data;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchTransaction(id).then((res) => {
        setData(res);
      });
    };
    asyncFunc();
  }, []);

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
                  Transaction Details
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
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <Input
                    disabled={true}
                    label="Name"
                    name="fullName"
                    value={fullName}
                  />
                  <Input
                    disabled={true}
                    label="Membership Id"
                    name="membershipId"
                    value={membershipId}
                  />
                  <Input
                    disabled={true}
                    label="Amount"
                    name="amount"
                    value={amount}
                  />
                  <Input
                    disabled={true}
                    label="Transaction Type"
                    name="transactionType"
                    value={transactionType}
                  />
                  <Input
                    disabled={true}
                    label="Category"
                    name="category"
                    value={category}
                  />
                  <Input
                    disabled={true}
                    label="Remark"
                    name="remark"
                    value={remark}
                  />
                  <Input
                    disabled={true}
                    label="Payment Method"
                    name="paymentMethod"
                    value={paymentMethod}
                  />
                  <Input
                    disabled={true}
                    label="Closing Balance"
                    name="closingBalance"
                    value={closingBalance}
                  />
                  <Input
                    disabled={true}
                    label="Date"
                    name="createdAt"
                    value={new Date(createdAt).toLocaleString()}
                  />
                  {returnedBookId && (
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Returned Book Details
                      </label>
                      <button
                        type="button"
                        onClick={() => setModal(returnedBookId)}
                        className="c-btn-blue"
                      >
                        Open Book Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {modal !== "" ? (
          <ReturnedBookModal id={modal} onClose={() => setModal("")} />
        ) : (
          <div />
        )}
      </div>
    </>
  );
};

export default TransactionModal;
