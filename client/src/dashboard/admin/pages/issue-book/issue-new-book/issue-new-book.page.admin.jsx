import { useState } from "react";
import {
  fetchBookByAccessionNumber,
  fetchStudentByRollNumber,
  issueNewBook,
} from "../../../hooks/http-requests.hooks.admin";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { Button, Grid } from "@mui/material";
import CustomTableSelect from "../../../../../components/table/custom-table-select.component";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import TransitionsModal from "../../../../../components/modals/modal.component";
import { rowsArray, sortObjectUsingKeys } from "../../../../../utils/functions";
import AlertDialog from "../../../../../components/feedback/dialog/alert-dialog.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";

const IssueNewBookPage = () => {
  const [showBookTable, setShowBookTable] = useState(false);
  const [showStudentTable, setShowStudentTable] = useState(false);
  const [bookRowData, setBookRowData] = useState([]);
  const [studentRowData, setStudentRowData] = useState([]);

  const [selectedCardNumber, setSelectedCardNumber] = useState(null);
  const [selectedAccessionNumber, setSelectedAccessionNumber] = useState(null);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    issueDate: new Date(),
  });

  const handleFetchBook = async () => {
    setShowBookTable(true);
    await fetchBookByAccessionNumber({
      accessionNumber: formFields.accessionNumber,
    })
      .then((res) => {
        setBookRowData(
          rowsArray(
            [res],
            ["isbn", "title", "author", "accessionNumber", "status"]
          )
        );
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
  };

  const handleFetchStuent = () => {
    setShowStudentTable(true);
    fetchStudentByRollNumber(formFields.rollNumber)
      .then((res) => {
        setStudentRowData(
          rowsArray(addLibraryCardsValueToObject(res), [
            "rollNumber",
            "name",
            "program",
            "cardNumber",
            "cardStatus",
          ])
        );
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
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
        setSelectedCardNumber("");
      }
    }
    if (tableName === "booksTable") {
      if (isChecked) {
        setSelectedAccessionNumber(selectedValue);
      } else {
        setSelectedAccessionNumber("");
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
        setSnackbarFeedback({ open: true, severity: "success", message: res });
        handleFetchBook();
        handleFetchStuent();
      })
      .catch((err) =>
        setSnackbarFeedback({ open: true, severity: "error", message: err })
      );
  };

  return (
    <div className="text-center m-5">
      <h2>Issue a Book</h2>
      <br />
      <br />
      <div>
        <div>
          <Grid container spacing={4}>
            <Grid item>
              <InputField
                label="Book's Accession Number"
                name="accessionNumber"
                type="text"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleFetchBook}>
                Fetch Book
              </Button>
            </Grid>
          </Grid>
          {showBookTable ? (
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
          ) : (
            ""
          )}
        </div>

        <div>
          <br />
          <Grid container spacing={2}>
            <Grid item>
              <InputField
                label="Student's Roll Number"
                name="rollNumber"
                type="text"
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleFetchStuent}>
                Fetch Student
              </Button>
            </Grid>
          </Grid>
          {showStudentTable ? (
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
          ) : (
            ""
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
                <Grid item>
                  <InputField
                    disabled
                    label="Card Number"
                    value={selectedCardNumber}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <InputField
                    disabled
                    label="Accession Number"
                    value={selectedAccessionNumber}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <InputField
                    label="Issue Date"
                    name="issueDate"
                    type="date"
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            </div>
            <div className="m-5">
              <Button variant="contained" type="submit">
                Issue Now
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <AlertDialog
          title="Confirm?"
          content="This action can not be undone"
          open={showAlertDialog}
          handleClick={(e, f) => {
            if (e) handleIssueNewBook();
            setShowAlertDialog(false);
          }}
        />
        <SnackbarFeedback
          open={showSnackbarFeedback.open}
          message={showSnackbarFeedback.message}
          severity={showSnackbarFeedback.severity}
          handleClose={() =>
            setSnackbarFeedback({ open: false, severity: "", message: "" })
          }
        />
      </div>
    </div>
  );
};

export default IssueNewBookPage;
