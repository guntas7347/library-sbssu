import { useState } from "react";
import { Button } from "@mui/material";
import {
  downloadAllIssuedBooks,
  fetchAllIssuedBooks,
} from "../../../hooks/http-requests.hooks.admin";
import CustomTable from "../../../../../components/table/custom-table.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SnackbarFeedbackCustom from "../../../../../components/feedback/snackbar/snackbar-full.component";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";

const SearchIssuedBooks = () => {
  const navigate = useNavigate();

  const [rowData, setRowData] = useState([]);

  const [showSnackbarFeedback, setSnackbarFeedback] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllIssuedBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllIssuedBooks(formFields)
      .then((res) => {
        setRowData(rowsArray(res));
        if (res.length === 0) {
          setSnackbarFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => setSnackbarFeedback([1, 2, err]));
  };

  const handleDownload = async () => {
    await downloadAllIssuedBooks(formFields)
      .then((res) => setSnackbarFeedback([1, 1, res]))
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
          "rollNumber",
          "studentName",
        ])
      );
    });
  };
  const handleRowClick = (e) => {
    navigate(`/dashboard/admin/issue-books/search-issued-books/view-book/${e}`);
  };

  const tableHasData = () => {
    if (rowData.length === 0) return false;
    return true;
  };

  return (
    <div className="text-center">
      <h3 className="m-3">Search Issued Books</h3>
      <div>
        <div className="mx-5 d-flex">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Search All Issued Books",
                value: "fetchAllIssuedBooks",
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
              "Student Roll Number",
              "Student Name",
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

export default SearchIssuedBooks;
