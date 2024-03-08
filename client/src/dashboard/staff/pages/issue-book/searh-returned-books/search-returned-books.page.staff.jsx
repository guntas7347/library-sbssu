import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { fetchAllReturnedBooks } from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar-old.component";

const SearchReturnedBooks = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const [showDateRangeInputField, setShowDateRangeInputField] = useState(false);

  const { formFields, handleChange, setFormFields } = useForm({
    sortSelect: "fetchAllReturnedBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllReturnedBooks(formFields)
      .then((res) => {
        setRowData(rowsArray(res));
        if (res.length === 0) {
          setSnackbarFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => console.error(err));
  };
  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, [
          "_id",
          "accessionNumber",
          "bookTitle",
          "cardNumber",
          "issueDate",
          "returnDate",
          "rollNumber",
          "studentName",
          "fine",
        ])
      );
    });
  };
  const handleRowClick = (e) => {
    navigate(
      `/dashboard/staff/issue-books/search-returned-books/view-book/${e}`
    );
  };

  const handleInputSelectChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ sortValue: "", [name]: value });
    if (value === "dateRange") setShowDateRangeInputField(true);
    else setShowDateRangeInputField(false);
  };

  const handleChangeForDateRange = (event) => {
    const { name, value } = event.target;
    setFormFields({
      sortSelect: "dateRange",
      sortValue: { ...formFields.sortValue, [name]: value },
    });
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Returned Books</h3>
      <div>
        <div className="mx-5 d-flex">
          <Grid container spacing={2}>
            <Grid item>
              <InputSelect
                fields={[
                  {
                    name: "Search All Returned Books",
                    value: "fetchAllReturnedBooks",
                  },
                  { name: "Accession Number", value: "accessionNumber" },
                  { name: "Fine", value: "fine" },
                  { name: "Current Month", value: "currentMonth" },
                  {
                    name: "Date Range",
                    value: "dateRange",
                  },
                ]}
                value={formFields.sortSelect}
                onChange={handleInputSelectChange}
                name="sortSelect"
              />
            </Grid>
            {showDateRangeInputField ? (
              <>
                <Grid item>
                  <InputField
                    label="Starting Date"
                    name="startingDate"
                    type="date"
                    onChange={handleChangeForDateRange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item>
                  <InputField
                    label="Ending Date"
                    name="endingDate"
                    type="date"
                    onChange={handleChangeForDateRange}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            ) : (
              <Grid item>
                <InputField
                  label="Value"
                  name="sortValue"
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>
          <Button onClick={handleFetch}>Search</Button>
        </div>
        <div className="p-5">
          <CustomTable
            columns={[
              "Accession Number",
              "Book Title",
              "Card Number",
              "Issue Date",
              "Return Date",
              "Student Roll Number",
              "Student Name",
              "Fine",
            ]}
            rows={rowData}
            handleRowClick={handleRowClick}
          />
        </div>
      </div>
      <div>
        <SnackbarFeedback
          open={showSnackbarFeedback.open}
          message={showSnackbarFeedback.message}
          severity={showSnackbarFeedback.severity}
          handleClose={() =>
            setSnackbarFeedback({ open: false, severity: "info", message: "" })
          }
        />
      </div>
    </div>
  );
};

export default SearchReturnedBooks;
