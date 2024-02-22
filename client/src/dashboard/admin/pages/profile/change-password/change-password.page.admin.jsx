import { useState } from "react";
import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";
import { changePassword } from "../../../../http-requests";

const ChangePasswordPage = () => {
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange, resetFormFields } = useForm({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const { currentPassword, newPassword, confirmNewPassword } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formFields);

    if (newPassword !== confirmNewPassword) {
      setSnackbarFeedback({
        open: true,
        severity: "error",
        message: "New Password and Confirm New Password are not same",
      });
    } else {
      await changePassword(formFields)
        .then(({ message }) => {
          resetFormFields();
          setSnackbarFeedback({
            open: true,
            severity: "success",
            message,
          });
        })
        .catch((err) => setSnackbarFeedback([1, 2, err]));
    }
  };

  return (
    <div className="text-center m-3">
      <h5>Change your password</h5>
      <div className="m-5">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item>
              <InputField
                label="Current Password"
                name="currentPassword"
                type="password"
                onChange={handleChange}
                value={currentPassword}
              />
            </Grid>
            <Grid item>
              <InputField
                label="New Password"
                name="newPassword"
                type="password"
                onChange={handleChange}
                value={newPassword}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Confirm New Password"
                name="confirmNewPassword"
                type="password"
                onChange={handleChange}
                value={confirmNewPassword}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div>
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
