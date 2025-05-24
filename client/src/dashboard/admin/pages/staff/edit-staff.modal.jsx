import React, { useEffect, useState } from "react";
import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Select from "../../../../components/forms/select-input";
import TextArea from "../../../../components/forms/text-area";
import server from "../../hooks/http-requests.hooks.admin";
import RightsSelector from "./components/rights-selector";
import LoadingModal from "../../../../components/modals/loading-modal";
import Modal from "../../../../components/modals/modal.component";

const EditStaffModal = ({ onClose, id }) => {
  const setFeedback = useFeedback();

  const [staffData, setStaffData] = useState({});
  const [authData, setAuthData] = useState({});

  const { formFields: staffFields, handleChange: handleStaffFieldChange } =
    useForm({}); // for staff

  const { formFields: authFields, handleChange: handleAuthFieldChange } =
    useForm({}); // for auth

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await server.staff.edit(
        { ...staffFields, _id: staffData._id },
        authFields
      );
      setFeedback(1, res);
      onClose();
    } catch (error) {
      setFeedback(2, error);
    }
  };

  const handleChangeStatus = async (e) => {
    try {
      if (confirm(`Mark this staff member as ${e}?`)) {
        await server.staff.changeStatus(staffData._id, e);
        onClose();
      }
    } catch (error) {
      setFeedback(2, error);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncFunc = async () => {
      await server.staff
        .fetch(id)
        .then((res) => {
          const authData = res.authId;
          delete res.authId;
          delete res.createdAt;
          setStaffData(res);
          setAuthData(authData);
          setLoading(false);
        })
        .catch((error) => {
          setFeedback([1, 2, error]);
        });
    };
    asyncFunc();
  }, []);

  if (loading) return <LoadingModal onClose={onClose} title="Edit Staff" />;

  return (
    <Modal title="Edit Staff" onClose={onClose}>
      <form action="submit" onSubmit={handleUpdate}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            onChange={handleStaffFieldChange}
            label="ID Number"
            name="idNumber"
            type="number"
            required={true}
            defaultValue={staffData.idNumber}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Full Name"
            name="fullName"
            required={true}
            defaultValue={staffData.fullName}
          />
          <Input
            onChange={handleAuthFieldChange}
            label="Email"
            name="email"
            type="email"
            required={true}
            defaultValue={authData.email}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Phone Number"
            name="phoneNumber"
            defaultValue={staffData.phoneNumber}
          />
        </div>
        <hr className="c-hr" />
        <RightsSelector
          onChange={handleAuthFieldChange}
          defaultRights={authData.rights}
        />
        <hr className="c-hr" />
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input
            onChange={handleStaffFieldChange}
            label="Date of Birth"
            name="dateOfBirth"
            type="date"
            defaultValue={staffData.dateOfBirth}
          />
          <Select
            onChange={handleStaffFieldChange}
            label="Gender"
            name="gender"
            options={["Male", "Female", "Other"]}
            defaultValue={staffData.gender}
          />
          <TextArea
            onChange={handleStaffFieldChange}
            label="Address"
            name="address"
            defaultValue={staffData.address}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Emergency Contact"
            name="emergencyContact"
            defaultValue={staffData.emergencyContact}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Employee ID"
            name="employeeId"
            defaultValue={staffData.employeeId}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Department"
            name="department"
            defaultValue={staffData.department}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Designation"
            name="designation"
            defaultValue={staffData.designation}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Joining Date"
            name="joiningDate"
            type="date"
            defaultValue={staffData.joiningDate}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Employment Status"
            name="employmentStatus"
            defaultValue={staffData.employmentStatus}
          />
          <Input
            onChange={handleStaffFieldChange}
            label="Profile Picture URL"
            name="profilePictureURL"
            type="url"
            defaultValue={staffData.profilePictureURL}
          />
        </div>

        <hr className="c-hr" />
        <div className="flex justify-between">
          {authData.active === true ? (
            <button
              type="button"
              className="c-btn-red"
              onClick={() => handleChangeStatus("inactive")}
            >
              Mark as Inactive
            </button>
          ) : (
            <button
              type="button"
              className="c-btn-red"
              onClick={() => handleChangeStatus("active")}
            >
              Mark as Active
            </button>
          )}
          <button type="submit" className="c-btn-blue ">
            Save changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditStaffModal;
