import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { fetchAllIssuedBooks } from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import SnackbarFeedback from "../../../../../components/feedback/snackbar/snackbar.component";
import { useNavigate } from "react-router-dom";

const SearchIssuedBooks = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange, setFormFields } = useForm({
    sortSelect: "fetchAllIssuedBooks",
    sortValue: "",
  });

  const [showDateRangeInputField, setShowDateRangeInputField] = useState(false);

  const handleFetch = async () => {
    await fetchAllIssuedBooks(formFields).then((res) => {
      setRowData(rowsArray(res));
      if (res.length === 0) {
        setSnackbarFeedback({
          open: true,
          severity: "error",
          message: "No data Found",
        });
      }
    });
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
          "rollNumber",
          "studentName",
        ])
      );
    });
  };
  const handleRowClick = (e) => {
    navigate(`/dashboard/staff/issue-books/search-issued-books/view-book/${e}`);
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
      <h3 className="m-3">Search Issued Books</h3>
      <div>
        <div className="mx-5 d-flex">
          <Grid container spacing={2}>
            <Grid item>
              <InputSelect
                fields={[
                  {
                    name: "Search All Issued Books",
                    value: "fetchAllIssuedBooks",
                  },
                  { name: "Accession Number", value: "accessionNumber" },
                  { name: "Library Card Number", value: "cardNumber" },

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
              "Student Roll Number",
              "Student Name",
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
            setSnackbarFeedback({ open: false, severity: "", message: "" })
          }
        />
      </div>
    </div>
  );
};

export default SearchIssuedBooks;
