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
import { uploadImage } from "../../../http-requests";
import ImageCropper from "../../../../components/forms/image-upload/image-cropper";

const EditStaffModal = ({ onClose, id }) => {
  const setFeedback = useFeedback();

  const [staffData, setStaffData] = useState({});
  const [authData, setAuthData] = useState({});

  const {
    formFields: staffFields,
    handleChange: handleStaffFieldChange,
    setFields,
  } = useForm({}); // for staff

  const { formFields: authFields, handleChange: handleAuthFieldChange } =
    useForm({}); // for auth

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await server.staff.edit(
        { ...staffFields, _id: staffData._id },
        authFields
      );
      setFeedback(1, res.m);
      onClose();
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  const handleChangeStatus = async (e) => {
    try {
      if (confirm(`Mark this staff member as ${e}?`)) {
        await server.staff.changeStatus(staffData._id, e);
        onClose();
      }
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await server.staff.fetch(id);
        const authData = res.p.authId;
        delete res.p.authId;
        delete res.p.createdAt;
        setStaffData(res.p);
        setAuthData(authData);
        setLoading(false);
      } catch (error) {
        setFeedback(2, error.m);
      }
    })();
  }, []);

  if (loading) return <LoadingModal onClose={onClose} title="Edit Staff" />;

  const handleImageUpload = async (formData) => {
    try {
      if (!formData) return setFields("imageUrl", null);

      const res = await uploadImage(formData);
      const data = await res.json();

      if (data.s === "ULD201IMG") {
        setFields("imageUrl", data.p);
        setFeedback(1, data.m);
      } else setFeedback(2, data.m);
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

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
          <ImageCropper
            onUpload={(e) => handleImageUpload(e)}
            label="Profile Picture"
            required={true}
            defaultFileName={staffData.imageUrl}
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
            label="Phone Number"
            name="phoneNumber"
            defaultValue={staffData.phoneNumber}
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
