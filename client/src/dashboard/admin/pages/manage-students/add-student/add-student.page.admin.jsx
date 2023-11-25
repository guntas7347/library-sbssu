import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  createStudent,
  fetchSettingsAcademicPrograms,
} from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";

const AddStudentPage = () => {
  const [academicPrograms, setAcademicPrograms] = useState([
    { name: "", value: "" },
  ]);

  const defaultFormFields = {
    rollNumber: "",
    name: "",
    fathersName: "",
    gender: "male",
    dob: "",
    program: "BTECH",
    specialization: "",
    batch: "",
  };

  const { formFields, handleChange, resetFormFields } =
    useForm(defaultFormFields);

  const { gender, program } = formFields;

  const handleClick = async () => {
    const res = await createStudent(formFields);
    console.log(res);
    resetFormFields();
  };

  useEffect(() => {
    const asyncFunc = async () => {
      const academicPrograms = await fetchSettingsAcademicPrograms();
      setAcademicPrograms(academicPrograms);
    };

    asyncFunc();
  }, []);

  return (
    <div>
      <br />
      <br />
      <div className="m-5">
        <Grid container spacing={2}>
          <Grid item>
            <InputField
              label="Roll Number"
              type="number"
              name="rollNumber"
              InputProps={{ inputProps: {} }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Father's Name"
              type="text"
              name="fathersName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputSelect
              name="gender"
              fields={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" },
              ]}
              value={gender}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Date of Birth"
              type="date"
              name="dob"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <InputSelect
              name="program"
              fields={academicPrograms}
              value={program}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Specialization"
              type="text"
              name="specialization"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Batch"
              type="text"
              name="batch"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Email"
              type="text"
              name="email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <InputField
              label="Phone Number"
              type="number"
              name="phoneNumber"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <br />
        <Button onClick={handleClick} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddStudentPage;
