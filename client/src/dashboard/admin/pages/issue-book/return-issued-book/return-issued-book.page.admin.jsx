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
import { formatDate, formatTime } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";

const ReturnIssuedBookPage = () => {
  const [ShowAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const [isStudentFetching, setIsStudentFetching] = useState(false);
  const [fine, setFine] = useState(false);
  const { formFields, handleChange, resetFormFields } = useForm({
    accessionNumber: "",
  });
  const [issuedBookDoc, setIssuedBookDoc] = useState([]);
  const {
    title,
    author,
    accessionNumber,
    libraryCard,
    issueDate,
    fullName,
    issuedBy,
    rollNumber,
    _id,
  } = issuedBookDoc;
  console.log(issuedBookDoc);
  const handleFetch = async () => {
    console.log("handlefetch");
    setIsStudentFetching(true);
    await fetchIssuedBookByAccessionNumber(+formFields.accessionNumber)
      .then((res) => {
        setTimeout(() => {
          setIssuedBookDoc(res);
          console.log("triggering");
        }, 1000);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
        setIsStudentFetching(false);
      });
  };

  const returnDate = formatDate();

  const handleReturnBook = async () => {
    console.log("handleReturnBook");
    await returnIssuedBook({ _id })
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
        resetFormFields();
        setIssuedBookDoc([]);
        setIsStudentFetching(false);
      })
      .catch((err) => {
        setSnackbarFeedback([1, 2, err]);
      });
  };

  const handleCheckFine = async () => {
    console.log("handleCheckFine");
    await issueBookFine({ _id })
      .then(async (fine) => {
        if (fine != null) setFine(fine);
        setShowAlertDialog(true);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const isStudentFetched = () => {
    if (issuedBookDoc.length === 0) return false;
    else return true;
  };

  return (
    <div className="text-center m-5">
      <h1>Return book?</h1>

      <div className="my-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFetch();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <InputField
                label="Accession Number"
                name="accessionNumber"
                type="number"
                onChange={handleChange}
                value={formFields.accessionNumber}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <div>
        {isStudentFetching &&
          (isStudentFetched() ? (
            <div>
              <div className="mb-3">
                <SpanningTable
                  rows={[
                    ["Accession Number", accessionNumber],
                    ["Library Card Number", libraryCard],
                    ["Issue Date", formatTime(issueDate)],
                    ["Issued By", issuedBy],
                    ["Book title", title],
                    ["Book Author", author],
                    ["Student Name", fullName],
                    ["Roll Number", rollNumber],
                  ]}
                />
              </div>
              <div className="">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCheckFine();
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3} md={2}>
                      <InputField
                        label="Return Date"
                        name="returnDate"
                        value={returnDate}
                        disabled
                        style={{ textAlign: "center" }}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} md={2}>
                      <Button variant="contained" type="submit">
                        Return
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "50vh",
              }}
            >
              <Spinner />
            </div>
          ))}
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content={
            <>
              Return Book:-
              <br />
              Accession Number: {accessionNumber}
              <br />
              Fine:{" "}
              {fine ? <span style={{ color: "red" }}>₹{fine}</span> : "N/A"}
            </>
          }
          open={ShowAlertDialog}
          handleClick={(e) => {
            if (e) handleReturnBook();
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

export default ReturnIssuedBookPage;
