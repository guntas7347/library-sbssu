import { useState } from "react";
import { useForm } from "../../../../../../components/forms/use-form-hook/use-form.hook.component";
import InputField from "../../../../../../components/forms/input-field/input-field.component";
import { Button, Grid } from "@mui/material";
import CustomTableSelect from "../../../../../../components/table/custom-table-select.component";
import {
  createBookAccount,
  fetchBookByISBN,
} from "../../../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../../../utils/functions";
import AlertDialog from "../../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../../components/feedback/snackbar/snackbar.component";

const AddBookAccountPage = () => {
  const [showBookTable, setShowBookTable] = useState(false);

  const [showAccountNumberField, setShowAccountNumberField] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    isbn: "",
    accountNumber: "",
  });
  const { isbn } = formFields;

  const handleFetchBook = async () => {
    await fetchBookByISBN(formFields).then(async (res) =>
      setRowData(rowsArray([res]))
    );
    setShowBookTable(true);
  };

  const handleSelect = (_, selectedValue) => {
    console.log(selectedValue);
    if (selectedValue !== null) {
      setShowAccountNumberField(selectedValue);
    } else {
      setShowAccountNumberField(false);
    }
  };

  const handleCreateBookAccount = async () => {
    await createBookAccount(formFields)
      .then((res) => {
        setSnackbarFeedback({ open: true, severity: "success", message: res });
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, ["ISBN", "title", "author", "genre", "price"])
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
              label="Book's ISBN"
              name="isbn"
              type="text"
              disabled={showBookTable}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleFetchBook}>
              Fetch Book
            </Button>
          </Grid>
        </Grid>
        {showBookTable ? (
          <CustomTableSelect
            columns={["ISBN", "Title", "Author", "Genre", "Price"]}
            rows={rowData}
            onSelect={handleSelect}
            indexToSelect={0}
          />
        ) : (
          ""
        )}
        <br />

        {showAccountNumberField ? (
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowAlertDialog(true);
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <InputField
                    label="ISBN"
                    type="number"
                    name="isbn"
                    value={isbn}
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <InputField
                    label="Account Number"
                    type="number"
                    name="accountNumber"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
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
          handleClick={(e, f) => {
            if (e) handleCreateBookAccount();
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

export default AddBookAccountPage;
