import React, { useState } from "react";
import Input from "../../../../components/forms/input";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Select from "../../../../components/forms/select-input";
import TextArea from "../../../../components/forms/text-area";
import server from "../../hooks/http-requests.hooks.admin";
import RightsSelector from "./components/rights-selector";
import Button from "../../../../components/buttons/interactive-button";
import ImageCropper from "../../../../components/forms/image-upload/image-cropper";
import { uploadImage } from "../../../http-requests";
import Modal from "../../../../components/modals/modal.component";

const AddStaffModal = ({ onClose }) => {
  const setFeedback = useFeedback();

  const { formFields, handleChange, setFields } = useForm({});
  const [btn, setBtn] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setBtn(true);
    try {
      const res = await server.staff.create(formFields);
      setFeedback(1, res.m);
      onClose();
    } catch (error) {
      setFeedback(2, error.m);
      setBtn(false);
    }
  };

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
    <>
      <Modal onClose={onClose} title="Add staff">
        {" "}
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
              <ImageCropper
                onUpload={(e) => handleImageUpload(e)}
                label="Profile Picture"
                required={true}
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
            <div className="flex">
              <Button
                label="Confirm"
                spinner={btn}
                passive={false}
                type="submit"
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default AddStaffModal;
