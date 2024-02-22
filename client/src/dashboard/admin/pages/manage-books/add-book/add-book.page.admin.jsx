import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { addNewBook } from "../../../hooks/http-requests.hooks.admin";
import { useState } from "react";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";

const AddBookPage = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    isbn: "",
    title: "",
    author: "",
    placeAndPublishers: "",
    publicationYear: "",
    pages: "",
    volume: "",
    source: "",
    cost: "",
    callNumber: "",
  });

  const {
    title,
    author,
    isbn,
    volume,
    pages,
    source,
    cost,
    callNumber,
    publicationYear,
    placeAndPublishers,
  } = formFields;

  const handleAddNewBook = async () => {
    console.log(formFields);
    await addNewBook(formFields)
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  return (
    <div>
      <h2 className="text-center my-4">Add New Book</h2>
      <div className="mx-3 mx-md-4 mx-lg-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowAlertDialog(true);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Author"
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="ISBN Number"
                type="number"
                name="isbn"
                value={isbn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Place and Publishers"
                type="text"
                name="placeAndPublishers"
                value={placeAndPublishers}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Publication Year"
                type="number"
                name="publicationYear"
                value={publicationYear}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Pages"
                type="number"
                name="pages"
                value={pages}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Volume"
                type="text"
                name="volume"
                value={volume}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Source"
                type="text"
                name="source"
                value={source}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Price"
                type="number"
                name="cost"
                value={cost}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <InputField
                label="Call Number"
                type="number"
                name="callNumber"
                value={callNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Button fullWidth type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div>
        <AlertDialog
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleAddNewBook();
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

export default AddBookPage;
