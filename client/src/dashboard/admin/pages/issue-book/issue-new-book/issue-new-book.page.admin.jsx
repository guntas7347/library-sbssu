import { useContext, useState } from "react";

import {
  fetchBookByAccessionNumber,
  fetchStudentByRollNumber,
  issueNewBook,
} from "../../../hooks/http-requests.hooks.admin";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import CustomTableSelect from "../../../../../components/table/custom-table-select.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { rowsArray } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import BackdropSpinner from "../../../../../components/feedback/backdrop/backdrop.component";
import Button from "../../../../../components/buttons/button.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

const IssueNewBookPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showBookTable, setShowBookTable] = useState(false);
  const [showStudentTable, setShowStudentTable] = useState(false);
  const [bookRowData, setBookRowData] = useState([]);
  const [studentRowData, setStudentRowData] = useState([]);

  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [selectedAccessionNumber, setSelectedAccessionNumber] = useState("");

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showBackdropSpinner, setShowBackdropSpinner] = useState(false);

  const { formFields, handleChange } = useForm({
    rollNumber: "",
    accessionNumber: "",
    issueDate: new Date(),
  });

  const { rollNumber, accessionNumber, issueDate } = formFields;

  const handleFetchBook = async () => {
    await fetchBookByAccessionNumber(accessionNumber)
      .then((res) => {
        setShowBookTable(true);
        setBookRowData(
          rowsArray(
            [{ ...res, ...res.bookId }],
            ["isbn", "title", "author", "accessionNumber", "status"]
          )
        );
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const handleFetchStuent = () => {
    fetchStudentByRollNumber(formFields.rollNumber)
      .then((res) => {
        setShowStudentTable(true);
        setStudentRowData(
          rowsArray(addLibraryCardsValueToObject(res), [
            "rollNumber",
            "fullName",
            "program",
            "cardNumber",
            "cardStatus",
          ])
        );
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const addLibraryCardsValueToObject = (obj) => {
    const array = [];
    for (let i = 0; i < obj.libraryCards.length; i++) {
      array.push({
        ...obj,
        cardNumber: obj.libraryCards[i].cardNumber,
        cardStatus: obj.libraryCards[i].status,
      });
    }

    return array;
  };

  const handleSelect = (tableName, selectedValue, isChecked) => {
    if (tableName === "studentsTable") {
      if (isChecked) {
        setSelectedCardNumber(selectedValue);
      } else {
        if (selectedCardNumber !== "") setSelectedCardNumber("");
      }
    }
    if (tableName === "booksTable") {
      if (isChecked) {
        setSelectedAccessionNumber(selectedValue);
      } else {
        if (selectedAccessionNumber !== "") setSelectedAccessionNumber("");
      }
    }
  };

  const handleIssueNewBook = async () => {
    setShowBackdropSpinner(true);
    const issueBookDetails = {
      accessionNumber: selectedAccessionNumber,
      cardNumber: selectedCardNumber,
      issueDate: formFields.issueDate,
    };
    await issueNewBook(issueBookDetails)
      .then((res) => {
        setFeedback([1, 1, res]);
        handleFetchBook();
        handleFetchStuent();
      })
      .catch((err) => setFeedback([1, 2, err]));
    setShowBackdropSpinner(false);
  };

  const yesterdayDate = () => {
    return new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * -1)
      .toISOString()
      .split("T")[0];
  };

  const disableIssueButton = () => {
    if (selectedCardNumber !== "" && selectedAccessionNumber !== "") {
      return false;
    } else return true;
  };

  return (
    <div className="text-center">
      <h1 className="page-header">Issue a Book</h1>

      <div className="white-container grid grid-rows-3 gap-0 items-center ">
        <div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              className="w-full"
              label="Book's Accession Number"
              name="accessionNumber"
              type="text"
              value={accessionNumber}
              disabled={showBookTable}
              onChange={handleChange}
            />
            <Button
              disabled={showBookTable}
              onClick={handleFetchBook}
              label="Fetch Book"
            />
          </div>
          <div>
            {showBookTable && (
              <div className="m-5">
                <CustomTableSelect
                  columns={[
                    "ISBN",
                    "Title",
                    "Author",
                    "Accession Number",
                    "Avalability",
                  ]}
                  rows={bookRowData}
                  onSelect={handleSelect}
                  indexToSelect={3}
                  tableName="booksTable"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-5">
            <InputField
              className="w-full"
              label="Student's Roll Number"
              name="rollNumber"
              type="text"
              value={rollNumber}
              disabled={showStudentTable}
              onChange={handleChange}
            />
            <Button
              disabled={showStudentTable}
              onClick={handleFetchStuent}
              label="Fetch Student"
            />
          </div>
          <div>
            {showStudentTable && (
              <div className="m-5">
                <CustomTableSelect
                  columns={[
                    "Roll Number",
                    "Name",
                    "Program",
                    "Card Number",
                    "Avalability",
                  ]}
                  rows={studentRowData}
                  onSelect={handleSelect}
                  indexToSelect={3}
                  tableName="studentsTable"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowAlertDialog(true);
            }}
          >
            <div className="grid grid-cols-3 gap-5">
              <InputField
                disabled
                className="w-full"
                label="Card Number"
                name="cardNumber"
                value={selectedCardNumber}
              />

              <InputField
                disabled
                className="w-full"
                label="Accession Number"
                name="accessionNumber"
                value={selectedAccessionNumber}
              />

              <InputField
                className="w-full"
                label="Issue Date"
                name="issueDate"
                type="date"
                value={issueDate}
                onChange={handleChange}
                max={yesterdayDate()}
                required={false}
              />
            </div>
            <button
              className="my-button mt-5"
              disabled={disableIssueButton()}
              type="submit"
            >
              Issue Now
            </button>
          </form>
        </div>
      </div>

      <div>
        <AlertDialog
          title="Confirm?"
          content={
            <>
              Issue Book:- <br />
              Accession Number: {selectedAccessionNumber} <br />
              Library Card Number: {selectedCardNumber} <br />
              Issue Date: {new Date(issueDate).toDateString()}
            </>
          }
          open={showAlertDialog}
          handleClick={(e) => {
            if (e) handleIssueNewBook();
            setShowAlertDialog(false);
          }}
        />

        <BackdropSpinner open={showBackdropSpinner} />
      </div>
    </div>
  );
};

export default IssueNewBookPage;
