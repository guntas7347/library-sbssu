import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  fetchIssuedBookByAccessionNumber,
  issueBookFine,
  returnIssuedBook,
} from "../../../hooks/http-requests.hooks.admin";
import SpanningTable from "../../../../../components/table/spanning-table.component";
import { useContext, useState } from "react";
import { formatDate, formatTime } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import Spinner from "../../../../../components/feedback/spinner/spinner.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const ReturnIssuedBookPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [ShowAlertDialog, setShowAlertDialog] = useState(false);

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
  const handleFetch = async () => {
    setIsStudentFetching(true);
    await fetchIssuedBookByAccessionNumber(+formFields.accessionNumber)
      .then((res) => {
        setTimeout(() => {
          setIssuedBookDoc(res);
          console.log("triggering");
        }, 1000);
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
        setIsStudentFetching(false);
      });
  };

  const returnDate = formatDate();

  const handleReturnBook = async () => {
    console.log("handleReturnBook");
    await returnIssuedBook({ _id })
      .then((res) => {
        setFeedback([1, 1, res]);
        resetFormFields();
        setIssuedBookDoc([]);
        setIsStudentFetching(false);
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  const handleCheckFine = async () => {
    console.log("handleCheckFine");
    await issueBookFine({ _id })
      .then(async (fine) => {
        if (fine != null) setFine(fine);
        setShowAlertDialog(true);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const isStudentFetched = () => {
    if (issuedBookDoc.length === 0) return false;
    else return true;
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Return book?</h1>
      <div className="bg-white rounded-3xl p-5 grid grid-cols-2 gap-10">
        <InputField
          label="Accession Number"
          name="accessionNumber"
          type="number"
          onChange={handleChange}
          value={formFields.accessionNumber}
        />

        <div className="flex flex-row justify-center items-center">
          <button className="my-button" onClick={handleFetch}>
            Search
          </button>
        </div>
      </div>

      {isStudentFetching &&
        (isStudentFetched() ? (
          <>
            <div className="my-5">
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
            <div className="bg-white rounded-3xl p-5 grid grid-cols-2">
              <div>
                <InputField
                  label="Return Date"
                  name="returnDate"
                  value={returnDate}
                  disabled
                  style={{ textAlign: "center" }}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div className="flex flex-row justify-center items-center">
                <button className="my-button" onClick={handleCheckFine}>
                  Return
                </button>
              </div>
            </div>
          </>
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
      </div>
      {/* <SnackBar feedback={showSnackbarFeedback} /> */}
    </div>
  );
};

export default ReturnIssuedBookPage;
