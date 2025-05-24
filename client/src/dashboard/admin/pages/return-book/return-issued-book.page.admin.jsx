import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import {
  fetchIssuedBookByAccessionNumber,
  issueBookFine,
  returnIssuedBook,
} from "../../hooks/http-requests.hooks.admin";
import SpanningTable from "../../../../components/table/spanning-table.component";
import { useState } from "react";
import { formatDate, formatTime } from "../../../../utils/functions";
import Spinner from "../../../../components/feedback/spinner/spinner.component";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Input from "../../../../components/forms/input";
import ReturnBookSearchBar from "./search-bar";
import ReturnConfirmationModal from "./return-confirmation.modal";
import ConfirmationModal from "../../../../components/modals/confirmation-model";
import { UPLOADS_PATH } from "../../../../keys";

const ReturnIssuedBookPage = () => {
  const setFeedback = useFeedback();

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
    imageUrl,
  } = issuedBookDoc;

  const handleFetch = async () => {
    setIsStudentFetching(true);
    await fetchIssuedBookByAccessionNumber(+formFields.accessionNumber)
      .then((res) => {
        setIssuedBookDoc(res);
      })
      .catch((error) => {
        setFeedback([1, 2, error]);
        setIsStudentFetching(false);
      });
  };

  const returnDate = formatDate();

  const handleReturnBook = async () => {
    await returnIssuedBook({ _id })
      .then((res) => {
        setFeedback(1, res);
        resetFormFields();
        setIssuedBookDoc([]);
        setIsStudentFetching(false);
      })
      .catch((error) => {
        setFeedback([1, 2, error]);
      });
  };

  const handleCheckFine = async () => {
    await issueBookFine({ _id })
      .then(async (fine) => {
        if (fine != null) setFine(fine);
        setShowAlertDialog(true);
      })
      .catch((error) => setFeedback([1, 2, error]));
  };

  const isStudentFetched = () => {
    if (issuedBookDoc.length === 0) return false;
    else return true;
  };

  const imagePath = imageUrl
    ? UPLOADS_PATH + imageUrl
    : UPLOADS_PATH + "/sample-user.jpg";
  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Return book?</h1>
      <div className="c-box ">
        <div>
          <ReturnBookSearchBar
            label="Search"
            name="accessionNumber"
            type="number"
            onChange={handleChange}
            value={formFields.accessionNumber}
            placeholder="Accession Number..."
            onClick={handleFetch}
          />
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
                    ["Member Name", fullName],
                    ["Roll Number", rollNumber],
                  ]}
                  imageUrl={imagePath}
                />
              </div>
              <div className="flex justify-center items-end gap-10">
                <Input
                  label="Return Date"
                  name="returnDate"
                  value={returnDate}
                  disabled
                  style={{ textAlign: "center" }}
                  InputLabelProps={{ shrink: true }}
                />

                <button className="c-btn-blue" onClick={handleCheckFine}>
                  Return
                </button>
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
      </div>
      {ShowAlertDialog && (
        <ConfirmationModal
          onYes={() => handleReturnBook()}
          onClose={() => setShowAlertDialog(false)}
        >
          <div className="grid grid-cols-2 text-start mb-5">
            <span> Accession Number:</span>
            <span> {accessionNumber} </span>
            <span> Fine: </span>
            <span>{fine}</span>
          </div>
        </ConfirmationModal>
      )}
    </div>
  );
};

export default ReturnIssuedBookPage;
