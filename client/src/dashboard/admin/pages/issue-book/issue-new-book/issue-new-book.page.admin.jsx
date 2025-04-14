import { useContext, useState } from "react";

import {
  fetchBookForIssue,
  fetchMemberForIssue,
  issueNewBook,
} from "../../../hooks/http-requests.hooks.admin";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import CustomTableSelect from "../../../../../components/table/custom-table-select.component";
import { rowsArray } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Dialog from "../../../../../components/feedback/dialog/dialog.component";
import QuickAddBook from "../../manage-books/add-book/quick-add";
import Input from "../../../../../components/forms/input";
import QuickSearchMember from "../../members/quick-search.modal";
import IssueConfirmationModal from "./issue-confirmation.modal";

const IssueNewBookPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [showBookTable, setShowBookTable] = useState(false);
  const [showMemberTable, setShowMemberTable] = useState(false);
  const [bookRowData, setBookRowData] = useState([]);
  const [studentRowData, setMemberRowData] = useState([]);

  const [imageUrl, setImgUrl] = useState(null);

  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [selectedAccessionNumber, setSelectedAccessionNumber] = useState("");

  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const [showBookDialog, setShowBookDialog] = useState(false);
  const [showMemberDialog, setShowMemberDialog] = useState(false);

  const { formFields, handleChange } = useForm({
    membershipId: "",
    accessionNumber: "",
    issueDate: new Date(),
  });

  const { membershipId, accessionNumber, issueDate } = formFields;

  const handleFetchBook = async () => {
    await fetchBookForIssue(accessionNumber)
      .then((res) => {
        setShowBookTable(true);
        setBookRowData(
          rowsArray([res], ["title", "author", "accessionNumber", "status"])
        );
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const handleFetchMember = () => {
    fetchMemberForIssue(formFields.membershipId)
      .then((res) => {
        setShowMemberTable(true);
        setImgUrl(res.imageUrl);
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
        fullName: obj.fullName,
        membershipId: obj.membershipId,
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
    const issueBookDetails = {
      accessionNumber: selectedAccessionNumber,
      cardNumber: selectedCardNumber,
      issueDate: formFields.issueDate,
    };
    await issueNewBook(issueBookDetails)
      .then((res) => {
        setFeedback([1, 1, res]);
        handleFetchBook();
        handleFetchMember();
      })
      .catch((err) => setFeedback([1, 2, err]));
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
      <h1 className="text-3xl font-semibold my-5">Issue Book</h1>
      <div className="c-box">
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-4 gap-1">
            <div className="col-span-2 max-w-96">
              <Input
                label="Book's Accession Number"
                name="accessionNumber"
                type="text"
                value={accessionNumber}
                disabled={showBookTable}
                onChange={handleChange}
              />
            </div>
            <button
              className="c-button"
              disabled={showBookTable}
              onClick={handleFetchBook}
            >
              Search Book
            </button>
            <button
              className="c-button"
              disabled={showBookTable}
              onClick={() => setShowBookDialog(true)}
            >
              Quick Add Book
            </button>
          </div>
          <div>
            {showBookTable && (
              <div className="mt-5">
                <CustomTableSelect
                  columns={[
                    "Title",
                    "Author",
                    "Accession Number",
                    "Avalability",
                  ]}
                  rows={bookRowData}
                  onSelect={handleSelect}
                  indexToSelect={2}
                  tableName="booksTable"
                />
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 mt-10">
            <div className="col-span-2 max-w-96">
              <Input
                label="Membership Id"
                name="membershipId"
                type="text"
                value={membershipId}
                disabled={showMemberTable}
                onChange={handleChange}
              />
            </div>
            <button
              className="c-button"
              disabled={showMemberTable}
              onClick={handleFetchMember}
            >
              Search Member
            </button>
            <button
              className="c-button"
              disabled={showMemberTable}
              onClick={() => setShowMemberDialog(true)}
            >
              Quick Search
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
                  imageUrl={imageUrl}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowAlertDialog(true);
            }}
          >
            <div className="grid grid-cols-3 gap-5 items-center justify-center">
              <Input
                disabled
                label="Card Number"
                name="cardNumber"
                value={selectedCardNumber}
              />

              <Input
                disabled
                label="Accession Number"
                name="accessionNumber"
                value={selectedAccessionNumber}
              />

              <Input
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
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                disabled={disableIssueButton()}
                type="submit"
              >
                Issue Now
              </button>
            </div>
          </form>
        </div>
      </div>
      <div></div>
      {showAlertDialog && (
        <IssueConfirmationModal
          onClose={() => setShowAlertDialog(false)}
          accessionNumber={selectedAccessionNumber}
          cardNumber={selectedCardNumber}
          issueDate={issueDate}
          onClick={(e) => {
            e && handleIssueNewBook();
            setShowAlertDialog(false);
          }}
        />
      )}
      {showBookDialog && (
        <QuickAddBook onClose={() => setShowBookDialog(false)} />
      )}
      {/* {showMemberDialog && <QuickSearchMember />} */}
    </>
  );
};

export default IssueNewBookPage;
