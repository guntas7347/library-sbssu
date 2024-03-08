import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  addNewBook,
  fetchBookDetailsByIsbnApi,
} from "../../../hooks/http-requests.hooks.admin";
import useLengthTrigger from "../../../../../components/forms/hooks/useLengthTrigger/uselengthTrigger.hook.component";
import { useState } from "react";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar-old.component";

const AddBookPage = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange, setFormFields } = useForm({
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

  const { title, author, publisher, publicationYear } = formFields;

  // const handleAutoFetch = async () => {
  //   const { title, publish_date, publishers } = await fetchBookDetailsByIsbnApi(
  //     formFields.ISBN
  //   );

  //   setFormFields({
  //     ...formFields,
  //     title,
  //     publisher: publishers[0],
  //     publicationYear: new Date(publish_date).getFullYear(),
  //   });
  // };

  // useLengthTrigger(formFields.ISBN, 13, handleAutoFetch);

  const handleAddNewBook = async () => {
    await addNewBook(formFields)
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
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
                label="Title"
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Author"
                type="text"
                name="author"
                value={author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="ISBN Number"
                type="number"
                name="isbn"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Place and Publishers"
                type="text"
                name="placeAndPublishers"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Publication Year"
                type="number"
                name="publicationYear"
                value={publicationYear}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Pages"
                type="text"
                name="pages"
                value={publisher}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              <InputField
                label="Volume"
                type="text"
                name="volume"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Source"
                type="text"
                name="source"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Price"
                type="number"
                name="cost"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <InputField
                label="Call Number"
                type="text"
                name="callNumber"
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
            if (e) handleAddNewBook();
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

export default AddBookPage;
