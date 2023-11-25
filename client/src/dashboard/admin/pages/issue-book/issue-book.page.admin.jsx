import { Button, Grid } from "@mui/material";
import InputField from "../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import CustomTable from "../../../../components/table/custom-table.component";
import TransitionsModal from "../../../../components/modals/modal.component";
import { useState } from "react";
import CustomTableSelect from "../../../../components/table/custom-table-select.component";
import {
  fetchBookByAccountNumber,
  fetchStudentByRollNumber,
} from "../../hooks/http-requests.hooks.admin";
import { sortObjectUsingKeys } from "../../../../utils/functions";

const IssueBookPage = () => {
  const [showBookTable, setShowBookTable] = useState(false);
  const [showStudentTable, setShowStudentTable] = useState(false);
  const [bookRowData, setBookRowData] = useState([]);
  const [studentRowData, setStudentRowData] = useState([]);

  const { formFields, handleChange } = useForm({});

  const handleFetchBook = async () => {
    setShowBookTable(true);
    await fetchBookByAccountNumber({
      accountNumber: formFields.accountNumber,
    }).then((res) => {
      console.log(res);
      setBookRowData(
        rowsArray([res], ["ISBN", "title", "author", "accountNumber", "status"])
      );
    });
  };

  const handleFetchStuent = () => {
    setShowStudentTable(true);
    fetchStudentByRollNumber({ rollNumber: formFields.rollNumber }).then(
      (res) => {
        console.log(res);
        setStudentRowData(
          rowsArray(
            [res],
            ["rollNumber", "name", "program", "accountNumber", "status"]
          )
        );
      }
    );
  };

  const handleSelect = () => {};

  const [modal, setModal] = useState(false);

  const handleSubmit = () => {
    setModal(true);
  };

  const rowsArray = (array, keysArray) => {
    return array.map((obj) => {
      return Object.values(sortObjectUsingKeys(obj, keysArray));
    });
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
                label="Book's Account Number"
                name="accountNumber"
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
                "Account Number",
                "Avalability",
              ]}
              rows={bookRowData}
              onSelect={handleSelect}
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
            />
          ) : (
            ""
          )}
        </div>
        <div className="m-5">
          <Button variant="contained" onClick={handleSubmit}>
            Issue Now
          </Button>
        </div>

        {modal ? (
          <TransitionsModal
            title="Book Issued Successfully"
            body="Book issuance has been successfully processed. The necessary records have been updated, and the book is now marked as issued. If you have any questions or need further assistance, please feel free to contact the library administration. Thank you.
"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default IssueBookPage;
