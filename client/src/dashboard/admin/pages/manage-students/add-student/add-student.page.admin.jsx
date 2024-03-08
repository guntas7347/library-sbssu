import { useContext, useEffect, useState } from "react";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  createNewStudent,
  fetchSettingsAcademicPrograms,
} from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import Button from "../../../../../components/buttons/button.component";
import "./add-student.styles.scss";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const AddStudentPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [academicPrograms, setAcademicPrograms] = useState([
    { name: "", value: "", branches: [{ name: "", value: "" }] },
  ]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const defaultFormFields = {
    rollNumber: "",
    fullName: "",
    fathersName: "",
    dob: "",
    gender: "",
    category: "",
    program: "",
    specialization: "",
    batch: "",
    email: "",
    phoneNumber: "",
  };

  const { formFields, handleChange, resetFormFields } =
    useForm(defaultFormFields);

  const {
    rollNumber,
    fullName,
    fathersName,
    dob,
    gender,
    category,
    program,
    specialization,
    batch,
    email,
    phoneNumber,
  } = formFields;

  const handleSubmit = async () => {
    await createNewStudent(formFields)
      .then((res) => {
        setFeedback([1, 1, res]);
        resetFormFields();
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const academicPrograms = await fetchSettingsAcademicPrograms();
      setAcademicPrograms(academicPrograms);
    };

    asyncFunc();
  }, []);

  const generateBatchYears = () => {
    const array = [];
    for (
      let i = new Date().getFullYear();
      i >= new Date().getFullYear() - 6;
      i--
    ) {
      array.push({ name: i.toString(), value: i });
    }

    return array;
  };
  const generateSpecialization = () => {
    try {
      const selectedBranch = academicPrograms.find((obj) => {
        return obj.value === program;
      });
      if (selectedBranch) {
        if (Object.hasOwnProperty.call(selectedBranch, "branches"))
          return selectedBranch.branches;
        else return [{ name: "", value: "" }];
      } else return [{ name: "", value: "" }];
    } catch (error) {
      return [{ name: "", value: "" }];
    }
  };

  return (
    <div>
      <h2 className="text-center">Add Student</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAlertDialog(true);
          }}
        >
          <div className="container-add-student">
            <InputField
              label="Roll Number"
              type="number"
              name="rollNumber"
              value={rollNumber}
              onChange={handleChange}
            />

            <InputSelect
              label="Batch"
              name="batch"
              fields={generateBatchYears()}
              value={batch}
              onChange={handleChange}
            />

            <InputField
              label="Name"
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />

            <InputField
              label="Father's Name"
              type="text"
              name="fathersName"
              value={fathersName}
              onChange={handleChange}
            />

            <InputField
              label="Date of Birth"
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
            />

            <InputSelect
              label="Gender"
              name="gender"
              fields={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" },
              ]}
              value={gender}
              onChange={handleChange}
            />

            <InputSelect
              label="Category"
              name="category"
              fields={[
                { name: "General", value: "general" },
                { name: "SC/ST", value: "SCST" },
                { name: "Other", value: "other" },
              ]}
              value={category}
              onChange={handleChange}
            />

            <InputSelect
              label="Program"
              name="program"
              fields={academicPrograms}
              value={program}
              onChange={handleChange}
            />

            <InputSelect
              label="Specialization"
              name="specialization"
              fields={generateSpecialization()}
              value={specialization}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />

            <InputField
              label="Phone Number"
              type="number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </div>
          <div className="submit-button-add-student">
            <button className="my-button" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content="This action can not be undone"
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleSubmit();
            setShowAlertDialog(false);
          }}
        />
      </div>
    </div>
  );
};

export default AddStudentPage;
