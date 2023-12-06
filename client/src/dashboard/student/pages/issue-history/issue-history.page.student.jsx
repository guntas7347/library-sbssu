import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { sortObjectUsingKeys } from "../../../../utils/functions";
import InputSelect from "../../../../components/forms/input-select/input-select.component";
import InputField from "../../../../components/forms/input-field/input-field.component";
import CustomTable from "../../../../components/table/custom-table.component";
import { useForm } from "../../../../components/forms/use-form-hook/use-form.hook.component";
import { fetchIssueHistory } from "../../hooks/http-requests.hooks.student";

const IssueHistory = () => {
  const [rowData, setRowData] = useState([]);

  const [showDateRangeInputField, setShowDateRangeInputField] = useState(false);

  const { formFields, handleChange, setFormFields } = useForm({
    sortSelect: "fetchAllReturnedBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchIssueHistory(formFields)
      .then((res) => setRowData(rowsArray(res)))
      .catch((err) => console.error(err));
  };
  const rowsArray = (array) => {
    return array.map((obj) => {
      return Object.values(
        sortObjectUsingKeys(obj, [
          "accountNumber",
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
    console.log(e);
  };

  const handleInputSelectChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ [name]: value, sortValue: "" });
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
      <h3 className="m-3">Issued Books History</h3>
      <div>
        <div className="mx-5 d-flex">
          <Grid container spacing={2}>
            <Grid item>
              <InputSelect
                fields={[
                  {
                    name: "Get full histroy",
                    value: "fetchAllReturnedBooks",
                  },
                  { name: "Account Number", value: "accountNumber" },
                  { name: "Fine", value: "fine" },
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
    </div>
  );
};

export default IssueHistory;
