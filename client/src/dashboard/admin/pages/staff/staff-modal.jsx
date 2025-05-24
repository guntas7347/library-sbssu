import React, { useEffect, useState } from "react";
import { useFeedback } from "../../../../components/context/snackbar.context";
import server, { fetchStaffById } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import TextArea from "../../../../components/forms/text-area";
import ModalCloseButton from "../../../../components/buttons/svg-buttons/close-button";
import Spinner from "../../../../components/feedback/spinner/spinner.component";

const StaffModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [staffData, setStaffData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      await server.staff
        .fetch(id)
        .then((res) => {
          const authData = res.authId;
          delete res.authId;
          let s = {
            ...res,
            ...authData,
            rights: authData.rights
              .map((item) => item.toUpperCase())
              .join(", "),
          };
          setStaffData(s);
          setLoading(false);
        })
        .catch((error) => {
          setFeedback([1, 2, error]);
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
                  Staff Details
                </h3>
                <ModalCloseButton onClose={onClose} />
              </div>
              {loading ? (
                <div className="min-h-screen flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <div className="grid gap-6 mb-6 md:grid-cols-2 p-4 md:p-5">
                  <Input
                    disabled={true}
                    label="ID Number"
                    value={staffData.idNumber}
                  />
                  <Input
                    disabled={true}
                    label="Full Name"
                    value={staffData.fullName}
                  />
                  <Input
                    disabled={true}
                    label="Email"
                    value={staffData.email}
                  />
                  <Input
                    disabled={true}
                    label="Phone Number"
                    value={staffData.phoneNumber}
                  />
                  <Input
                    disabled={true}
                    label="Date of Birth"
                    value={
                      staffData.dateOfBirth
                        ? new Date(staffData.dateOfBirth).toLocaleDateString()
                        : ""
                    }
                  />
                  <Input
                    disabled={true}
                    label="Gender"
                    value={staffData.gender}
                  />
                  <TextArea
                    disabled={true}
                    className="UPPERCASE"
                    label="Rights"
                    value={staffData.rights}
                  />
                  <TextArea
                    disabled={true}
                    label="Address"
                    value={staffData.address}
                  />
                  <Input
                    disabled={true}
                    label="Emergency Contact"
                    value={staffData.emergencyContact}
                  />
                  <Input
                    disabled={true}
                    label="Employee ID"
                    value={staffData.employeeId}
                  />
                  <Input
                    disabled={true}
                    label="Department"
                    value={staffData.department}
                  />
                  <Input
                    disabled={true}
                    label="Designation"
                    value={staffData.designation}
                  />
                  <Input
                    disabled={true}
                    label="Joining Date"
                    value={
                      staffData.joiningDate
                        ? new Date(staffData.joiningDate).toLocaleDateString()
                        : ""
                    }
                  />
                  <Input
                    disabled={true}
                    label="Employment Status"
                    value={staffData.employmentStatus}
                  />
                  <Input
                    disabled={true}
                    label="Profile Picture URL"
                    value={staffData.profilePictureURL}
                  />
                </div>
              )}
              {/* <div className="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Mark as Inactive
                  </button>

                  {!getToggle ? (
                    <button onClick={() => toggle()} className="c-btn-blue">
                      Edit
                    </button>
                  ) : (
                    <button
                      // onClick={handleEdit}
                      className="c-btn-blue"
                    >
                      Save Changes
                    </button>
                  )}
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffModal;
