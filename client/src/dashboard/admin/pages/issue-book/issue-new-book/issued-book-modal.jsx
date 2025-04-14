import React, { useEffect, useState } from "react";
import { fetchIssuedBook } from "../../../hooks/http-requests.hooks.admin";
import Input from "../../../../../components/forms/input";

const IssuedBookModal = ({ id, onClose }) => {
  const [bookData, setBookData] = useState([]);

  const {
    accessionNumber,
    title,
    author,
    cardNumber,
    issueDate,
    issuedBy,
    rollNumber,
    fullName,
  } = bookData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchIssuedBook(id).then((res) => {
        setBookData(res);
      });
    };
    asyncFunc();
  }, []);

  const customIssued = issueDate?.slice(11, 19) === "00:00:00";

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
                  Issued Book Details
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
                    label="Book Title"
                    name="title"
                    value={title}
                  />
                  <Input
                    disabled={true}
                    label="Author"
                    name="author"
                    value={author}
                  />
                  <Input
                    disabled={true}
                    label="Accession Number"
                    name="accessionNumber"
                    value={accessionNumber}
                  />
                  <Input
                    disabled={true}
                    label="Card Number"
                    name="cardNumber"
                    value={cardNumber}
                  />
                  <Input
                    disabled={true}
                    label={
                      customIssued ? "Issue Date (Custom Issued)" : "Issue Date"
                    }
                    name="issueDate"
                    value={new Date(issueDate).toLocaleString()}
                  />

                  <Input
                    disabled={true}
                    label="Issued By"
                    name="issuedBy"
                    value={issuedBy}
                  />
                  <Input
                    disabled={true}
                    label="Member Name"
                    name="fullName"
                    value={fullName}
                  />
                  <Input
                    disabled={true}
                    label="Member Roll No"
                    name="rollNumber"
                    value={rollNumber}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IssuedBookModal;
