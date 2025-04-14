import { useEffect, useState } from "react";
import { fetchStudentById } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";

const MembersModal = ({ id, onClose }) => {
  const [formFields, setFormFields] = useState({ dob: "", image: null });

  const {
    rollNumber,
    fullName,
    fatherName,
    gender,
    dob,
    program,
    // specialization,
    batch,
    email,
    category,
    phoneNumber,
    // createdAt,
    role,
    imageUrl,
  } = formFields;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchStudentById(id)
        .then((studentDoc) => {
          const libraryCardsString = mergeArrayElementsToString(
            studentDoc.libraryCards.map((libraryCard) => {
              return libraryCard.cardNumber;
            })
          );
          setFormFields({ ...studentDoc, libraryCards: libraryCardsString });
        })
        .catch(() => setFormFields({ fullName: "Not Found" }));
    };
    asyncFunc();
  }, []);

  const mergeArrayElementsToString = (array = []) => {
    let string = "";
    let isFirst = true;

    if (array.length === 0) {
      return "None";
    }

    array.forEach((element) => {
      if (isFirst) {
        string += element;
        isFirst = false;
      } else {
        string += ", " + element;
      }
    });

    return string;
  };

  return (
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
                Member Details
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
                <div className="grid gap-6">
                  <Input
                    disabled={true}
                    label="Name"
                    name="fullName"
                    value={fullName}
                  />
                  <Input
                    disabled={true}
                    label="Father's Name"
                    name="fatherName"
                    value={fatherName}
                  />

                  <Input
                    disabled={true}
                    label="Roll Number"
                    name="rollNumber"
                    value={rollNumber}
                  />
                </div>
                <div className="flex justify-center items-center">
                  <img
                    className="border border-black"
                    src={imageUrl}
                    alt="image"
                  />
                </div>
                <Input
                  disabled={true}
                  label="Gender"
                  name="gender"
                  value={gender}
                />
                <Input
                  disabled={true}
                  label="Date Of Birth"
                  name="dob"
                  type="date"
                  value={dob.slice(0, 10)}
                />
                <Input
                  disabled={true}
                  label="Category"
                  name="category"
                  value={category}
                />
                <Input
                  disabled={true}
                  label="User Type"
                  name="role"
                  value={role}
                />
                <Input
                  disabled={true}
                  label="Academic Program"
                  name="program"
                  value={program}
                />
                <Input
                  disabled={true}
                  label="Batch"
                  name="batch"
                  value={batch}
                />
                <Input
                  disabled={true}
                  label="Email address"
                  name="email"
                  type="email"
                  value={email}
                />
                <Input
                  disabled={true}
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  value={phoneNumber}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersModal;
