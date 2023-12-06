import { useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  createLibraryCard,
  fetchStudentByRollNumber,
} from "../../../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../../../utils/functions";
import { Alert, Button, Grid, Snackbar } from "@mui/material";
import InputField from "../../../../../../components/forms/input-field/input-field.component";
import CustomTableSelect from "../../../../../../components/table/custom-table-select.component";
import AlertDialog from "../../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../../components/feedback/snackbar/snackbar.component";

const AddLibraryCardPage = () => {
  const [showStudentTable, setShowStudentTable] = useState(false);
  const [showCardNumberField, setShowAccountNumberField] = useState(false);

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

  const { rollNumber } = formFields;

  const handleFetchStudent = async () => {
    await fetchStudentByRollNumber(formFields)
      .then(async (res) => {
        setRowData(rowsArray([res]));
        setShowStudentTable(true);
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
  };

  const handleSelect = (_, selectedValue) => {
    if (selectedValue !== null) {
      setShowAccountNumberField(selectedValue);
    } else {
      setShowAccountNumberField(false);
    }
  };

  const handleSubmit = async () => {
    await createLibraryCard(formFields)
      .then((res) => {
        setSnackbarFeedback({ open: true, severity: "success", message: res });
        setShowAccountNumberField(false);
        setShowStudentTable(false);
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["rollNumber", "name", "program", "batch"])
      );
    });
  };

  return (
    <div>
      <br />
      <br />
      <div className="m-5">
        <Grid container spacing={4}>
          <Grid item>
            <InputField
              label="Student's Roll Number"
              name="rollNumber"
              type="number"
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
          <CustomTableSelect
            columns={["Roll Number", "Name", "Program", "Batch"]}
            rows={rowData}
            onSelect={handleSelect}
            indexToSelect={0}
          />
        ) : (
          ""
        )}
        <br />

        {showCardNumberField ? (
          <div>
            <Grid container spacing={2}>
              <Grid item>
                <InputField
                  label="Roll Number"
                  type="text"
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
        ) : (
          ""
        )}
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

export default AddLibraryCardPage;
