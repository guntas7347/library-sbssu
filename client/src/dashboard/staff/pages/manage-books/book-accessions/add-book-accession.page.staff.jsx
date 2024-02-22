import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { Button, Grid } from "@mui/material";
import CustomTableSelect from "../../../../../components/table/custom-table-select.component";
import {
  createBookAccession,
  fetchBookByISBN,
} from "../../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";

const AddBookAccessionPage = () => {
  const [showBookTable, setShowBookTable] = useState(false);

  const [showAccessionNumberField, setShowAccessionNumberField] =
    useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    isbn: "",
    accessionNumber: "",
  });
  const { isbn } = formFields;

  const handleFetchBook = async () => {
    await fetchBookByISBN(formFields).then(async (res) =>
      setRowData(rowsArray([res]))
    );
    setShowBookTable(true);
  };

  const handleSelect = (_, selectedValue) => {
    if (selectedValue !== null) {
      setShowAccessionNumberField(selectedValue);
    } else {
      setShowAccessionNumberField(false);
    }
  };

  const handleCreateBookAccession = async () => {
    await createBookAccession(formFields)
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, [
          "isbn",
          "title",
          "author",
          "publicationYear",
          "cost",
        ])
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
            columns={["ISBN", "Title", "Author", "Publication Year", "Price"]}
            rows={rowData}
            onSelect={handleSelect}
            indexToSelect={0}
          />
        ) : (
          ""
        )}
        <br />

        {showAccessionNumberField ? (
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
                    label="Accession Number"
                    type="number"
                    name="accessionNumber"
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
            if (e) handleCreateBookAccession();
            setShowAlertDialog(false);
          }}
        />
        <SnackbarFeedback
          open={showSnackbarFeedback.open}
          message={showSnackbarFeedback.message}
          severity={showSnackbarFeedback.severity}
          handleClose={() =>
            setSnackbarFeedback({ open: false, severity: "info", message: "" })
          }
        />
      </div>
    </div>
  );
};

export default AddBookAccessionPage;
