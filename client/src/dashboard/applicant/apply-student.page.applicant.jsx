import AlertDialog from "../../components/feedback/dialog/alert-dialog.component";
import { useContext, useEffect, useState } from "react";
import { fetchSettingsAcademicPrograms } from "../admin/hooks/http-requests.hooks.admin";
import { useForm } from "../../components/forms/use-form-hook/use-form.hook.component";
import { createApplication } from "../http-requests";
import { SnackBarContext } from "../../components/context/snackbar.context";

const InputField = (props) => {
  return (
    <div className="flex flex-row gap-5 justify-between">
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input className="border border-black px-1 w-48" required {...props} />
    </div>
  );
};
const InputSelect = (props) => {
  const { fields, onChange, label } = props;
  return (
    <div className="flex flex-row justify-between">
      <label htmlFor="">{label}</label>
      <select
        required
        className="border border-black px-1 w-48"
        onChange={onChange}
        defaultValue={fields[0].value}
        {...props}
      >
        <option value="" disabled>
          --select an option--
        </option>
        {fields.map((menuItem, index) => (
          <option key={index} value={menuItem.value}>
            {menuItem.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const ApplyStudentPage = () => {
  const { setFeedback } = useContext(SnackBarContext);
  const [academicPrograms, setAcademicPrograms] = useState([
    { name: "", value: "", branches: [{ name: "", value: "" }] },
  ]);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const defaultFormFields = {
    rollNumber: "",
    fullName: "",
    fathersName: "",
    gender: "",
    category: "",
    dob: "",
    program: "",
    specialization: "",
    batch: "",
    phoneNumber: "",
    role: "STUDENT",
  };
  const { formFields, handleChange } = useForm(defaultFormFields);
  const {
    rollNumber,
    fullName,
    fathersName,
    gender,
    dob,
    category,
    program,
    specialization,
    batch,
    phoneNumber,
    role,
  } = formFields;

  const handleSubmit = async () => {
    await createApplication(formFields)
      .then((res) => {
        console.log(res);
        setFeedback([1, 1, res.message]);
        window.location.reload();
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

  const maxDobDate = () => {
    return new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365 * 16)
      .toISOString()
      .split("T")[0];
  };

  return (
    <div className="text-center md:px-10 px-2">
      <h2 className="text-3xl font-bold my-5">Apply for Library Membership</h2>
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
                { name: "Student", value: "STUDENT" },
                { name: "Teacher", value: "TEACHER" },
                { name: "Other", value: "OTHER" },
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
            {role === "STUDENT" ? (
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

export default ApplyStudentPage;
