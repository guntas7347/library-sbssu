import React from "react";
import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Select from "../../../../components/forms/select-input";
import TextArea from "../../../../components/forms/text-area";
import server from "../../hooks/http-requests.hooks.admin";
import RightsSelector from "./components/rights-selector";

const AddStaffModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const { formFields, handleChange, setFields } = useForm({});

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await server.staff.create(formFields);
      setFeedback(1, res);
      onClose();
    } catch (error) {
      setFeedback(2, error);
    }
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
                  Add Staff
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
                <form action="submit" onSubmit={handleCreate}>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <Input
                      onChange={handleChange}
                      label="ID Number"
                      name="idNumber"
                      type="number"
                      required={true}
                    />
                    <Input
                      onChange={handleChange}
                      label="Full Name"
                      name="fullName"
                      required={true}
                    />
                    <Input
                      onChange={handleChange}
                      label="Email"
                      name="email"
                      type="email"
                      required={true}
                    />
                    <Input
                      onChange={(e) => {
                        setFields(
                          "phoneNumber",
                          e.target.value.replace(/[^0-9]/g, "").slice(0, 10)
                        );
                      }}
                      label="Phone Number"
                      value={formFields.phoneNumber}
                    />
                  </div>
                  <hr className="c-hr" />
                  <RightsSelector onChange={handleChange} />
                  <hr className="c-hr" />
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <Input
                      onChange={handleChange}
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                    />
                    <Select
                      onChange={handleChange}
                      label="Gender"
                      name="gender"
                      options={["Male", "Female", "Other"]}
                    ></Select>
                    <TextArea
                      onChange={handleChange}
                      label="Address"
                      name="address"
                    />
                    <Input
                      onChange={handleChange}
                      label="Emergency Contact"
                      name="emergencyContact"
                    />
                    <Input
                      onChange={handleChange}
                      label="Employee ID"
                      name="employeeId"
                    />
                    <Input
                      onChange={handleChange}
                      label="Department"
                      name="department"
                    />
                    <Input
                      onChange={handleChange}
                      label="Designation"
                      name="designation"
                    />
                    <Input
                      onChange={handleChange}
                      label="Joining Date"
                      name="joiningDate"
                      type="date"
                    />
                    <Input
                      onChange={handleChange}
                      label="Employment Status"
                      name="employmentStatus"
                    />
                    <Input
                      onChange={handleChange}
                      label="Profile Picture URL"
                      name="profilePictureURL"
                      type="url"
                    />
                  </div>
                  <hr className="c-hr" />
                  <div className="flex">
                    <button type="submit" className="c-btn-blue ml-auto">
                      Create
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

export default AddStaffModal;
