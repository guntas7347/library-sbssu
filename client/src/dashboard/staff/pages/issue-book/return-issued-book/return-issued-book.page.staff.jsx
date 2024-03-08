import { Button, Grid } from "@mui/material";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  fetchIssuedBookByAccessionNumber,
  issueBookFine,
  returnIssuedBook,
} from "../../../hooks/http-requests.hooks.admin";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { useState } from "react";
import { formatDate } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar-old.component";

const ReturnIssuedBookPage = () => {
  const [showSubmitConfirmationAlertDialog, setShowAlertDialog] =
    useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [showFineAlertDialog, setShowFineAlertDialog] = useState({
    open: false,
    fineAmount: 0,
  });

  const { formFields, handleChange, resetFormFields } = useForm({
    accessionNumber: "",
  });

  const defaultIssuedBookDoc = {
    title: null,
    ISBN: "",
    author: "",
    accessionNumber: "",
    libraryCard: "",
    issueDate: "",
    name: "",
    program: "",
    rollNumber: "",
  };

  const [issuedBookDoc, setIssuedBookDoc] = useState(defaultIssuedBookDoc);

  const {
    title,
    ISBN,
    author,
    accessionNumber,
    libraryCard,
    issueDate,
    name,
    program,
    rollNumber,
    _id,
  } = issuedBookDoc;

  const handleFetch = async () => {
    await fetchIssuedBookByAccessionNumber({
      accessionNumber: +formFields.accessionNumber,
    })
      .then((res) => {
        setIssuedBookDoc(res);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const returnDate = formatDate();

  const handleReturnBook = async () => {
    await returnIssuedBook({ _id })
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const handleCheckFine = async () => {
    await issueBookFine({ _id })
      .then(async (fine) => {
        if (fine != null) {
          setShowFineAlertDialog({ open: true, fineAmount: fine });
        } else {
          handleReturnBook();
        }
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const handleFineDialoge = async () => {
    await returnIssuedBook({ _id })
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  return (
    <div className="text-center m-5">
      <h1>Return book?</h1>

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
                label="Accession Number"
                name="accessionNumber"
                type="number"
                onChange={handleChange}
                value={formFields.accessionNumber}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleFetch}>
                Fetch
              </Button>
            </Grid>
          </Grid>
        </form>
        <Button onClick={() => resetFormFields()}>clear</Button>
      </div>
      <div>
        <div className="mb-3">
          <SpanningTable
            rows={[
              ["Accession Number", accessionNumber],
              ["Library Card Number", libraryCard],
              ["Issue Date", issueDate],
              ["Book title", title],
              ["Book Author", author],
              ["ISBN", ISBN],
              ["Student Name", name],
              ["Roll Number", rollNumber],
              ["Program", program],
            ]}
          />
        </div>
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowAlertDialog(true);
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <InputField
                  label="Return Date"
                  name="returnDate"
                  value={returnDate}
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item>
                <Button variant="contained" type="submit">
                  Return
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content="This action can not be undone"
          open={showSubmitConfirmationAlertDialog}
          handleClick={(e, f) => {
            if (e) handleCheckFine();
            setShowAlertDialog(false);
          }}
        />
        <AlertDialog
          title="Pay Fine"
          content={`The issuer is subject to fine of ${showFineAlertDialog.fineAmount} for late submit`}
          open={showFineAlertDialog.open}
          agreeMessage="Paid"
          disagreeMessage="Pending"
          handleClick={(e, f) => {
            if (e) handleFineDialoge();
            setShowFineAlertDialog({
              open: false,
              fineAmount: 0,
            });
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

export default ReturnIssuedBookPage;
