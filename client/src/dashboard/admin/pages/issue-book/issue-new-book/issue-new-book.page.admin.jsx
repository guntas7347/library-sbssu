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
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Dialog from "../../../../../components/feedback/dialog/dialog.component";
import QuickAddBook from "../../manage-books/add-book/quick-add";

const IssueNewBookPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showBookTable, setShowBookTable] = useState(false);
  const [showMemberTable, setShowMemberTable] = useState(false);
  const [bookRowData, setBookRowData] = useState([]);
  const [studentRowData, setMemberRowData] = useState([]);

  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [selectedAccessionNumber, setSelectedAccessionNumber] = useState("");

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showBackdropSpinner, setShowBackdropSpinner] = useState(false);

  const [showDialog, setShowDialog] = useState(false);

  const { formFields, handleChange } = useForm({
    membershipId: "",
    accessionNumber: "",
    issueDate: new Date(),
  });

  const { membershipId, accessionNumber, issueDate } = formFields;

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
    fetchStudentByRollNumber(formFields.membershipId)
      .then((res) => {
        console.log(res);
        setShowMemberTable(true);
        setMemberRowData(
          rowsArray(addLibraryCardsValueToObject(res), [
            "membershipId",
            "fullName",
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
    <>
      <h1 className="text-center font-bold text-3xl my-2">Issue a Book</h1>
      <div className="bg-white rounded-3xl p-5 grid gap-10">
        <div>
          <div className="flex justify-between gap-5">
            <InputField
              label="Book's Accession Number"
              name="accessionNumber"
              type="text"
              value={accessionNumber}
              disabled={showBookTable}
              onChange={handleChange}
            />
            <button
              className="my-button w-48"
              disabled={showBookTable}
              onClick={handleFetchBook}
            >
              Search Book
            </button>
            <button
              className="my-button w-48"
              disabled={showBookTable}
              onClick={() => setShowDialog(true)}
            >
              Quick Add Book
            </button>
          </div>
          <div>
            {showBookTable && (
              <div className="mt-5">
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
          <div className="flex justify-between gap-5">
            <InputField
              label="Membership Id"
              name="membershipId"
              type="text"
              value={membershipId}
              disabled={showMemberTable}
              onChange={handleChange}
            />
            <button
              className="my-button w-48"
              disabled={showMemberTable}
              onClick={handleFetchStuent}
            >
              Search Member
            </button>
          </div>
          <div>
            {showMemberTable && (
              <div className="mt-5">
                <CustomTableSelect
                  columns={[
                    "Membership Id",
                    "Name",

                    "Card Number",
                    "Avalability",
                  ]}
                  rows={studentRowData}
                  onSelect={handleSelect}
                  indexToSelect={2}
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
            <div className="grid grid-cols-3 gap-5 items-center justify-center">
              <InputField
                disabled
                label="Card Number"
                name="cardNumber"
                value={selectedCardNumber}
              />

              <InputField
                disabled
                label="Accession Number"
                name="accessionNumber"
                value={selectedAccessionNumber}
              />

              <InputField
                label="Issue Date"
                name="issueDate"
                type="date"
                value={issueDate}
                onChange={handleChange}
                max={yesterdayDate()}
                required={false}
              />
            </div>
            <div className="mt-5 flex flex-row justify-center items-center">
              <button
                className="my-button"
                disabled={disableIssueButton()}
                type="submit"
              >
                Issue Now
              </button>
            </div>
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
      {showDialog && (
        <Dialog onClose={() => setShowDialog(false)}>
          <QuickAddBook passSuccess={() => setShowDialog(false)} />
        </Dialog>
      )}
    </>
  );
};

export default IssueNewBookPage;
