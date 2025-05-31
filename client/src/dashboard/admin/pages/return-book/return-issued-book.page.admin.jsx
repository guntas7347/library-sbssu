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
import ConfirmationModal from "../../../../components/modals/confirmation-model";
import { UPLOADS_PATH } from "../../../../keys";
import Button from "../../../../components/buttons/interactive-button";

const ReturnIssuedBookPage = () => {
  const setFeedback = useFeedback();

  const [alert, setAlert] = useState(false);

  const [fine, setFine] = useState(false);
  const [btn, setBtn] = useState(false);

  const { formFields, handleChange } = useForm();
  const [issuedBookDoc, setIssuedBookDoc] = useState({});

  const handleFetch = async () => {
    try {
      const res = await fetchIssuedBookByAccessionNumber(
        formFields.accessionNumber
      );

      setIssuedBookDoc(res.p);
    } catch (error) {
      setFeedback(2, error.m);
    }
  };

  const returnDate = formatDate();

  const handleReturnBook = async () => {
    try {
      const res = await returnIssuedBook(issuedBookDoc._id);
      setFeedback(1, res.m);
      setIssuedBookDoc({});
      setBtn(false);
    } catch (error) {
      setFeedback(2, error.m);
      setBtn(false);
    }
  };

  const handleCheckFine = async () => {
    try {
      setBtn(true);
      const res = await issueBookFine(issuedBookDoc._id);
      if (res != null) setFine(res.p);
      setAlert(true);
    } catch (error) {
      setFeedback(2, error.m);
      setBtn(false);
    }
  };

  const isStudentFetched = () => {
    if (Object.keys(issuedBookDoc).length === 0) return false;
    else return true;
  };

  const imagePath = issuedBookDoc.imageUrl
    ? UPLOADS_PATH + issuedBookDoc.imageUrl
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

        {isStudentFetched() && (
          <>
            <div className="my-5 p-5 flex flex-col justify-center items-center border rounded ">
              <h1 className="pb-5 font-bold text-4xl">Issued Book Details</h1>
              <SpanningTable
                rows={[
                  ["Accession Number", issuedBookDoc.accessionNumber],
                  ["Library Card Number", issuedBookDoc.libraryCard],
                  [
                    "Issue Date",
                    new Date(issuedBookDoc.issueDate).toDateString(),
                  ],
                  ["Due Date", new Date(issuedBookDoc.dueDate).toDateString()],
                  ["Issued Duration", `${issuedBookDoc.issueDuration} days`],
                  ["Issued By", issuedBookDoc.issuedBy],
                  ["Book title", issuedBookDoc.title],
                  ["Book Author", issuedBookDoc.author],
                  ["Member Name", issuedBookDoc.fullName],
                  ["Roll Number", issuedBookDoc.rollNumber],
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

              <Button
                label="Return Book"
                spinner={btn}
                onClick={handleCheckFine}
              />
            </div>
          </>
        )}
      </div>
      <ConfirmationModal
        onYes={handleReturnBook}
        show={alert}
        onClose={(e) => {
          setAlert(false);
          !e && setBtn(false);
        }}
        title="Are you sure of it to Return the below book?"
        table={[
          ["Accession Number", issuedBookDoc.accessionNumber],
          ["Library Card Number", issuedBookDoc.libraryCard],
          ["Issue Date", new Date(issuedBookDoc.issueDate).toDateString()],
          ["Due Date", new Date(issuedBookDoc.dueDate).toDateString()],
          ["Issued Duration", `${issuedBookDoc.issueDuration} days`],
          ["Book title", issuedBookDoc.title],
          ["Member Name", issuedBookDoc.fullName],
          ["Fine", `₹${fine}`],
        ]}
      ></ConfirmationModal>
    </div>
  );
};

export default ReturnIssuedBookPage;
