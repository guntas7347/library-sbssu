import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { fetchAllIssuedBooks } from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";

const SearchIssuedBooks = () => {
  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange, setFormFields } = useForm({
    sortSelect: "fetchAllIssuedBooks",
    sortValue: "",
  });

  const [showDateRangeInputField, setShowDateRangeInputField] = useState(false);

  const handleFetch = async () => {
    await fetchAllIssuedBooks(formFields).then((res) =>
      setRowData(rowsArray(res))
    );
  };

  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, [
          "accountNumber",
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
    console.log(e);
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
                  { name: "Account Number", value: "accountNumber" },
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
              "Account Number",
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
    </div>
  );
};

export default SearchIssuedBooks;
