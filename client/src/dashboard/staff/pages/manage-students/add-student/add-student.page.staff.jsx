import { useEffect, useState } from "react";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  createStudent,
  fetchSettingsAcademicPrograms,
} from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import TransitionsModal from "../../../../../components/modals/modal.component";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";

const AddStudentPage = () => {
  const [academicPrograms, setAcademicPrograms] = useState([
    { name: "", value: "" },
  ]);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

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

  const {
    rollNumber,
    name,
    fathersName,
    gender,
    dob,
    program,
    specialization,
  } = formFields;

  const handleSubmit = async () => {
    await createStudent(formFields)
      .then((res) => {
        setSnackbarFeedback({ open: true, severity: "success", message: res });
        // resetFormFields();
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAlertDialog(true);
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <InputField
                label="Roll Number"
                type="number"
                name="rollNumber"
                InputProps={{ inputProps: {} }}
                onChange={handleChange}
                required
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
                type="number"
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
          <Button type="submit" variant="contained">
            Submit
          </Button>
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
        <SnackbarFeedback
          open={showSnackbarFeedback.open}
          message={showSnackbarFeedback.message}
          severity={showSnackbarFeedback.severity}
          handleClose={() =>
            setSnackbarFeedback({ open: false, severity: "", message: "" })
          }
        />
      </div>
    </div>
  );
};

export default AddStudentPage;
