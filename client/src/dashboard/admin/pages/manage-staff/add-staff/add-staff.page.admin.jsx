import { Button, Grid } from "@mui/material";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useState } from "react";
import { createNewStaff } from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";

const AddStaffPage = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    fullName: "",
    role: "STAFF",
  });
  const { idNumber, fullName, email, password, role } = formFields;

  const handleSubmit = async () => {
    await createNewStaff(formFields);
  };

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
                label="ID Number"
                type="number"
                name="idNumber"
                value={idNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Full Name"
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Email"
                type="text"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Password"
                type="text"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputSelect
                name="role"
                fields={[
                  { name: "Staff", value: "STAFF" },
                  { name: "Admin", value: "ADMIN" },
                ]}
                value={role}
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

export default AddStaffPage;
