import { useState } from "react";
import server from "../../hooks/http-requests.hooks.admin";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import CustomTableSelect from "../../../../components/table/custom-table-select.component";
import { rowsArray } from "../../../../utils/functions";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Input from "../../../../components/forms/input";
import ConfirmationModal from "../../../../components/modals/confirmation-model";
import SearchBar from "../../../../components/forms/search-bar";
import { UPLOADS_PATH } from "../../../../keys";
import Button from "../../../../components/buttons/interactive-button";

const IssueNewBookPage = () => {
  const setFeedback = useFeedback();

  const [showBookTable, setShowBookTable] = useState(false);
  const [showMemberTable, setShowMemberTable] = useState(false);
  const [bookRowData, setBookRowData] = useState([]);
  const [studentRowData, setMemberRowData] = useState([]);

  const [imageUrl, setImgUrl] = useState(null);

  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [selectedAccessionNumber, setSelectedAccessionNumber] = useState("");

  const [alert, setAlert] = useState(false);

  const [issuing, setIssuing] = useState(false);

  const { formFields, handleChange } = useForm({
    issueDate: new Date(),
  });

  const handleFetchBook = async (acn) => {
    try {
      const res = await server.issue.fetchBookForIssue(acn);
      setBookRowData(
        rowsArray(
          [res],
          ["title", "author", "accessionNumber", "category", "status"]
        )
      );
      setShowBookTable(true);
    } catch (error) {
      setFeedback([1, 2, error]);
    }
  };

  const handleFetchMember = async (membershipId) => {
    try {
      const res = await server.issue.fetchMemberForIssue(membershipId);
      setShowMemberTable(true);

      const imagePath = res.imageUrl
        ? UPLOADS_PATH + res.imageUrl
        : UPLOADS_PATH + "/sample-user.jpg";

      setImgUrl(imagePath);
      setMemberRowData(
        rowsArray(res.data, [
          "membershipId",
          "fullName",
          "cardNumber",
          "category",
          "cardStatus",
        ])
      );
    } catch (error) {
      console.log(error);
      setFeedback(2, error);
    }
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
    setIssuing(true);
    const issueBookDetails = {
      accessionNumber: selectedAccessionNumber,
      cardNumber: selectedCardNumber,
      issueDate: formFields.issueDate,
    };
    try {
      const res = await server.issue.issueNewBook(issueBookDetails);
      setFeedback(1, res);
      setIssuing(false);
    } catch (error) {
      setFeedback(2, error);
      setIssuing(false);
    }
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
          <div className="grid grid-cols-3 gap-1">
            <SearchBar
              label="Accession Number"
              onClick={(e) => handleFetchBook(e)}
              maxLength={5}
              disabled={showBookTable}
            />
          </div>
          <div>
            {showBookTable && (
              <div className="mt-5">
                <CustomTableSelect
                  columns={[
                    "Title",
                    "Author",
                    "Accession Number",
                    "Category",
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

          <hr className="c-hr" />

          <div className="grid grid-cols-3 gap-1">
            <SearchBar
              label="Membership Id"
              onClick={(e) => handleFetchMember(e)}
              maxLength={6}
              disabled={showMemberTable}
            />
          </div>
          <div>
            {showMemberTable && (
              <div className="mt-5">
                <CustomTableSelect
                  columns={[
                    "Membership Id",
                    "Name",
                    "Card Number",
                    "Category",
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

        <hr className="c-hr" />

        <div className="mt-10">
          <form>
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
                onChange={handleChange}
                max={yesterdayDate()}
                required={false}
              />
            </div>
            <div className="mt-5 flex flex-row justify-center items-center">
              <Button
                disabled={disableIssueButton()}
                label="Issue Now"
                spinner={issuing}
                passive={false}
                onClick={() => setAlert(true)}
                type="button"
              />
            </div>
          </form>
        </div>
      </div>

      <ConfirmationModal
        onClose={() => setAlert(false)}
        onYes={handleIssueNewBook}
        title="Are you sure of it to issue book?"
        show={alert}
      >
        <div className="grid grid-cols-2 text-start mb-5">
          <span> Accession Number:</span>
          <span> {selectedAccessionNumber} </span>
          <span> Library Card Number: </span>
          <span> {selectedCardNumber} </span>
          <span> Issue Date: </span>
          <span> {new Date(formFields.issueDate).toDateString()} </span>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default IssueNewBookPage;
