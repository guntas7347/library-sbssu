import React, { useEffect, useState } from "react";
import { useFeedback } from "../../../../components/context/snackbar.context";
import server, { fetchStaffById } from "../../hooks/http-requests.hooks.admin";
import Input from "../../../../components/forms/input";
import TextArea from "../../../../components/forms/text-area";
import ModalCloseButton from "../../../../components/buttons/svg-buttons/close-button";
import Spinner from "../../../../components/feedback/spinner/spinner.component";
import { imagePathUrl } from "../../../../utils/functions";

const StaffModal = ({ id, onClose }) => {
  const setFeedback = useFeedback();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.staff.fetch(id);
        const authData = res.p.authId;
        delete res.p.authId;
        let s = {
          ...res.p,
          ...authData,
          rights: authData.rights.map((item) => item.toUpperCase()).join(", "),
        };
        setData(s);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
      }
    })();
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
                    value={data.idNumber}
                  />
                  <Input
                    disabled={true}
                    label="Full Name"
                    value={data.fullName}
                  />
                  <Input disabled={true} label="Email" value={data.email} />
                  <Input
                    disabled={true}
                    label="Phone Number"
                    value={data.phoneNumber}
                  />
                  <Input
                    disabled={true}
                    label="Date of Birth"
                    value={
                      data.dateOfBirth
                        ? new Date(data.dateOfBirth).toLocaleDateString()
                        : ""
                    }
                  />
                  <Input disabled={true} label="Gender" value={data.gender} />
                  <TextArea
                    disabled={true}
                    className="UPPERCASE"
                    label="Rights"
                    value={data.rights}
                  />
                  <TextArea
                    disabled={true}
                    label="Address"
                    value={data.address}
                  />
                  <Input
                    disabled={true}
                    label="Emergency Contact"
                    value={data.emergencyContact}
                  />
                  <Input
                    disabled={true}
                    label="Employee ID"
                    value={data.employeeId}
                  />
                  <Input
                    disabled={true}
                    label="Department"
                    value={data.department}
                  />
                  <Input
                    disabled={true}
                    label="Designation"
                    value={data.designation}
                  />
                  <Input
                    disabled={true}
                    label="Joining Date"
                    value={
                      data.joiningDate
                        ? new Date(data.joiningDate).toLocaleDateString()
                        : ""
                    }
                  />
                  <Input
                    disabled={true}
                    label="Employment Status"
                    value={data.employmentStatus}
                  />
                  <img
                    className="border border-black"
                    crossOrigin="anonymous"
                    src={imagePathUrl(data.imageUrl)}
                    alt="image"
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
