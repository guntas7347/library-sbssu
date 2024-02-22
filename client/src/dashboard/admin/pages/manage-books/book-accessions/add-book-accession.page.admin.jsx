import { useState } from "react";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { Button, Grid } from "@mui/material";
import CustomTableSelect from "../../../../../components/table/custom-table-select.component";
import {
  createBookAccession,
  fetchAllBooks,
  fetchBookByISBN,
} from "../../../hooks/http-requests.hooks.admin";
import { rowsArray, sortObjectUsingKeys } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { useNavigate } from "react-router-dom";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const AddBookAccessionPage = () => {
  const navigate = useNavigate();

  const [showBookTable, setShowBookTable] = useState(false);

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
    await fetchBookByISBN(isbn)
      .then(async (res) => {
        setRowData(
          rowsArray(
            [res],
            ["_id", "isbn", "title", "author", "publicationYear", "cost"]
          )
        );
        setShowBookTable(true);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const handleCreateBookAccession = async () => {
    await createBookAccession(formFields)
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/manage-books/view-book/${e}`);
  };

  return (
    <div>
      <h2 className="text-center my-4">Add Accession number to Book</h2>
      <div className="mx-3 mx-md-4 mx-lg-5">
        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <InputField
                label="Book's ISBN"
                name="isbn"
                type="text"
                value={isbn}
                disabled={showBookTable}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button disabled={showBookTable} onClick={handleFetchBook}>
                Fetch Book
              </Button>
            </Grid>
          </Grid>
        </div>

        {showBookTable ? (
          <div>
            <CustomTable
              columns={["ISBN", "Title", "Author", "Publication Year", "Price"]}
              rows={rowData}
              handleRowClick={handleRowClick}
            />
            <div className="my-5">
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
                      disabled={showSnackbarFeedback.open}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={showSnackbarFeedback.open}
                      type="submit"
                      variant="contained"
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
        <br />
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content="This action can not be undone"
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleCreateBookAccession();
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

export default AddBookAccessionPage;
