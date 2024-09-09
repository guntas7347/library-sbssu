import { useContext, useEffect, useState } from "react";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  createNewStudent,
  fetchSettingsAcademicPrograms,
} from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
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
    role: "STUDENT UG",
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
    role,
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
      <h1 className="text-center font-bold text-3xl my-2">Add Member</h1>
      <div className="bg-white p-5 rounded-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAlertDialog(true);
          }}
        >
          <div className="grid md:grid-cols-2 gap-x-10 gap-5 justify-center items-center">
            <InputSelect
              label="User Type"
              name="role"
              fields={[
                { name: "STUDENT UG", value: "STUDENT UG" },
                { name: "STUDENT PG", value: "STUDENT PG" },
                { name: "TEACHER REGULAR", value: "TEACHER REGULAR" },
                { name: "TEACHER ADHOC", value: "TEACHER ADHOC" },
                { name: "NON TEACHING STAFF", value: "NON TEACHING STAFF" },
              ]}
              value={role}
              onChange={handleChange}
            />
            <InputField
              label="Roll Number"
              type="number"
              name="rollNumber"
              value={rollNumber}
              onChange={handleChange}
              required={false}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 6);
              }}
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
            {role === "STUDENT UG" || role === "STUDENT PG" ? (
              <>
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
              </>
            ) : (
              <>
                <InputSelect
                  label="Desigination"
                  name="program"
                  fields={[{ name: "Professor", value: "Professor" }]}
                  value={program}
                  onChange={handleChange}
                />
                <InputField
                  label="Specialization"
                  name="specialization"
                  type="text"
                  value={specialization}
                  onChange={handleChange}
                />
              </>
            )}
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
          <div className="mt-5">
            <button className="my-button " type="submit">
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
