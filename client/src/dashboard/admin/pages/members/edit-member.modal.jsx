import { useContext, useEffect } from "react";
import {
  fetchStudentById,
  markInactive,
} from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import Select from "../../../../components/forms/select-input";
import { SnackBarContext } from "../../../../components/context/snackbar.context";

const EditMemberModal = ({ id, onClose }) => {
  const { setFeedback } = useContext(SnackBarContext);

  const { formFields, setFormFields, handleChange } = useForm({ dob: "" });

  const {
    rollNumber,
    fullName,
    fatherName,
    gender,
    dob,
    program,
    specialization,
    batch,
    email,
    category,
    phoneNumber,
    role,
    imageUrl,
  } = formFields;

  useEffect(() => {
    const asyncFunc = async () => {
      await fetchStudentById(id)
        .then((studentDoc) => {
          setFormFields(studentDoc);
        })
        .catch(() => {
          setFormFields({ fullName: "Not Found" });
          setFeedback([1, 2, "Not Found"]);
        });
    };
    asyncFunc();
  }, []);

  const handleInactive = async () => {
    await markInactive(id)
      .then((res) => {
        setFeedback([1, 1, res]);
        //
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
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
                Edit Member
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
                    onChange={handleChange}
                    label="Name"
                    name="fullName"
                    value={fullName}
                  />
                  <Input
                    onChange={handleChange}
                    label="Father's Name"
                    name="fatherName"
                    value={fatherName}
                  />

                  <Input
                    onChange={handleChange}
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
                <Select
                  label="Gender"
                  name="gender"
                  onChange={handleChange}
                  options={["MALE", "FEMALE", "OTHER"]}
                />
                <Input
                  onChange={handleChange}
                  label="Date Of Birth"
                  name="dob"
                  type="date"
                  value={dob.slice(0, 10)}
                />
                <Select
                  label="Category"
                  name="category"
                  onChange={handleChange}
                  options={["GENERAL", "SC/ST", "OTHER"]}
                />
                <Input
                  onChange={handleChange}
                  label="User Type"
                  name="role"
                  value={role}
                />
                <Input
                  onChange={handleChange}
                  label="Academic Program"
                  name="program"
                  value={program}
                />
                <Input
                  onChange={handleChange}
                  label="Batch"
                  name="batch"
                  value={batch}
                />
                <Input
                  onChange={handleChange}
                  label="Email address"
                  name="email"
                  type="email"
                  value={email}
                />
                <Input
                  onChange={handleChange}
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  value={phoneNumber}
                />
              </div>
              <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  onClick={handleInactive}
                >
                  Mark as Inactive
                </button>

                <button
                  type="button"
                  onClick={() => console.log(formFields)}
                  className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
