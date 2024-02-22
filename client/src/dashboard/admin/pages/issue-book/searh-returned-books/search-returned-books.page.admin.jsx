import { useState } from "react";
import { Button, Grid } from "@mui/material";
import {
  downloadAllReturnedBooks,
  fetchAllReturnedBooks,
} from "../../../hooks/http-requests.hooks.admin";
import InputSelect from "../../../../../components/forms/input-select/input-select.component";
import CustomTable from "../../../../../components/table/custom-table.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import InputField from "../../../../../components/forms/input-field/input-field.component";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";

const SearchReturnedBooks = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
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
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const handleDownload = async () => {
    await downloadAllReturnedBooks(formFields)
      .then((res) => {
        setSnackbarFeedback([1, 1, res]);
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
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
      `/dashboard/admin/issue-books/search-returned-books/view-book/${e}`
    );
  };

  const tableHasData = () => {
    if (rowData.length === 0) return false;
    return true;
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Returned Books</h3>
      <div>
        <div className="mx-5 d-flex">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Search All Returned Books",
                value: "fetchAllReturnedBooks",
                inputField: "none",
              },
              {
                name: "Accession Number",
                value: "accessionNumber",
                inputField: "number",
              },
              {
                name: "Library Card Number",
                value: "cardNumber",
                inputField: "text",
              },
              {
                name: "Current Month",
                value: "currentMonth",
                inputField: "none",
              },
              {
                name: "Date Range",
                value: "dateRange",
                inputField: "text",
              },
            ]}
            selectValue={formFields.sortSelect}
            selectName="sortSelect"
            inputName="sortValue"
            inputValue={formFields.selectValue}
            onChange={handleChange}
          />

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
        <div>
          {tableHasData() && (
            <Button onClick={handleDownload}>Export To Excel</Button>
          )}
        </div>
      </div>
      <div>
        <SnackbarFeedbackCustom
          feedback={showSnackbarFeedback}
          handleClose={setSnackbarFeedback}
        />
      </div>
    </div>
  );
};

export default SearchReturnedBooks;
