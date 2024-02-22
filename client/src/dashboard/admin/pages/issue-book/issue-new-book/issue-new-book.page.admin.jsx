import { useState } from "react";
import {
  fetchBookByAccessionNumber,
  fetchStudentByRollNumber,
  issueNewBook,
} from "../../../hooks/http-requests.hooks.admin";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { Grid } from "@mui/material";
import CustomTableSelect from "../../../../../components/table/custom-table-select.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { rowsArray } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";
import BackdropSpinner from "../../../../../components/feedback/backdrop/backdrop.component";
import Button from "../../../../../components/buttons/button.component";

const IssueNewBookPage = () => {
  const [showBookTable, setShowBookTable] = useState(false);
  const [showStudentTable, setShowStudentTable] = useState(false);
  const [bookRowData, setBookRowData] = useState([]);
  const [studentRowData, setStudentRowData] = useState([]);

  const [selectedCardNumber, setSelectedCardNumber] = useState("");
  const [selectedAccessionNumber, setSelectedAccessionNumber] = useState("");

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showBackdropSpinner, setShowBackdropSpinner] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

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
      .catch((err) => setSnackbarFeedback([1, 2, err]));
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
      .catch((err) => setSnackbarFeedback([1, 2, err]));
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
        setSnackbarFeedback([1, 1, res]);
        handleFetchBook();
        handleFetchStuent();
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
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
    <div className="text-center m-5">
      <h2>Issue a Book</h2>
      <br />
      <br />
      <div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <InputField
                label="Book's Accession Number"
                name="accessionNumber"
                type="text"
                value={accessionNumber}
                disabled={showBookTable}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button
                disabled={showBookTable}
                onClick={handleFetchBook}
                label="Fetch Book"
              />
            </Grid>
          </Grid>

          {showBookTable && (
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
          )}
        </div>

        <div>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <InputField
                label="Student's Roll Number"
                name="rollNumber"
                type="text"
                value={rollNumber}
                disabled={showStudentTable}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Button
                disabled={showStudentTable}
                onClick={handleFetchStuent}
                label="Fetch Student"
              />
            </Grid>
          </Grid>
          {showStudentTable && (
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
          )}
        </div>
        <br />
        <br />
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowAlertDialog(true);
            }}
          >
            <div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    disabled
                    label="Card Number"
                    value={selectedCardNumber}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    disabled
                    label="Accession Number"
                    value={selectedAccessionNumber}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <InputField
                    label="Issue Date"
                    name="issueDate"
                    type="date"
                    value={issueDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      max: yesterdayDate(),
                    }}
                    required={false}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="m-5">
              <Button
                disabled={disableIssueButton()}
                type="submit"
                label="Issue Now"
              />
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
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
        <BackdropSpinner open={showBackdropSpinner} />
      </div>
    </div>
  );
};

export default IssueNewBookPage;
