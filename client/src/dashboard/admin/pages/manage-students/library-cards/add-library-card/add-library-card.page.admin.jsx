import { useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  allotLibraryCardToStudent,
  fetchStudentByRollNumber,
} from "../../../../hooks/http-requests.hooks.admin";
import { rowsArray } from "../../../../../../utils/functions";
import { Button, Grid } from "@mui/material";
import InputField from "../../../../../../components/forms/input-field/input-field.component";
import AlertDialog from "../../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../../components/feedback/snackbar/snackbar.component";
import CustomTable from "../../../../../../components/table/custom-table.component";
import SnackbarFeedbackCustom from "../../../../../../components/feedback/snackbar/snackbar-full.component";

const AllotLibraryCardPage = () => {
  const [showStudentTable, setShowStudentTable] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    rollNumber: "",
    cardNumber: "",
  });

  const { rollNumber, cardNumber } = formFields;

  const handleFetchStudent = async () => {
    await fetchStudentByRollNumber(rollNumber)
      .then(async (res) => {
        setRowData(
          rowsArray(
            [res],
            ["_id", "rollNumber", "fullName", "program", "batch"]
          )
        );
        setShowStudentTable(true);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const handleSubmit = async () => {
    await allotLibraryCardToStudent(formFields)
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  return (
    <div className="m-5">
      <h2 className="text-center pb-4">Allot Library card to Student</h2>
      <div>
        <Grid container spacing={4}>
          <Grid item>
            <InputField
              label="Student's Roll Number"
              name="rollNumber"
              type="number"
              value={rollNumber}
              disabled={showStudentTable}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleFetchStudent}>
              Fetch Student
            </Button>
          </Grid>
        </Grid>
        {showStudentTable ? (
          <div className="my-3">
            <CustomTable
              columns={["Roll Number", "Name", "Program", "Batch"]}
              rows={rowData}
            />
            <div className="mt-5">
              <Grid container spacing={2}>
                <Grid item>
                  <InputField
                    label="Roll Number"
                    type="number"
                    name="rollNumber"
                    value={rollNumber}
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <InputField
                    label="Card Number"
                    type="text"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => setShowAlertDialog(true)}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <AlertDialog
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleSubmit();
            setShowAlertDialog(false);
          }}
        />
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

export default AllotLibraryCardPage;
