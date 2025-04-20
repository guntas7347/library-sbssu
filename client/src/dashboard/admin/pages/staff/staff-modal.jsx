import React, { useContext, useEffect, useState } from "react";
import useToggle from "../../../../components/hooks/use-toggle";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import { fetchStaffById } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";

const StaffModal = ({ id, onClose }) => {
  const { setFeedback } = useContext(SnackBarContext);

  const { getToggle, toggle } = useToggle(false);

  const [staffData, setStaffData] = useState({ fullName: "", idNumber: null });

  const { fullName, idNumber, email, level, active, createdAt } = staffData;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchStaffById(id)
        .then((res) => setStaffData(res))
        .catch((err) => {
          setFeedback([1, 2, err]);
        });
    };
    asyncFunc();
  }, []);

  const disabled = true;
  const handleChange = () => {};

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
                  Staff Details
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
                    onChange={handleChange}
                    disabled={disabled}
                    label="Name"
                    name="fullName"
                    value={fullName}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Staff Id"
                    name="idNumber"
                    value={idNumber}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Email"
                    name="email"
                    value={email}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Level"
                    name="level"
                    value={level}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Status"
                    name="active"
                    value={active}
                  />
                  <Input
                    onChange={handleChange}
                    disabled={disabled}
                    label="Added On"
                    name="createdAt"
                    value={createdAt}
                    type="date"
                  />
                </div>
                <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Mark as Inactive
                  </button>

                  {!getToggle ? (
                    <button
                      type="button"
                      onClick={() => toggle()}
                      className="c-btn-blue"
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      // onClick={handleEdit}
                      className="c-btn-blue"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffModal;
