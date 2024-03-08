import { useContext, useState } from "react";
import {
  downloadAllIssuedBooks,
  fetchAllIssuedBooks,
} from "../../../hooks/http-requests.hooks.admin";
import CustomTable from "../../../../../components/table/custom-table.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

import "./search-issued-books.styles.admin.scss";
import Button from "../../../../../components/buttons/button.component";

const SearchIssuedBooks = () => {
  const navigate = useNavigate();
  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const { formFields, handleChange } = useForm({
    sortSelect: "fetchAllIssuedBooks",
    sortValue: "",
  });

  const handleFetch = async () => {
    await fetchAllIssuedBooks(formFields)
      .then((res) => {
        setRowData(rowsArray(res));
        if (res.length === 0) {
          setFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const handleDownload = async () => {
    await downloadAllIssuedBooks(formFields)
      .then((res) => setFeedback([1, 1, res]))
      .catch((err) => setFeedback([1, 2, err]));
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
      <h1 className="page-header">Search Issued Books</h1>
      <div>
        <div className="container-searchIssuedBooks white-container">
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
          <Button onClick={handleFetch} label="Search" />
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
        <div className="export-button">
          {tableHasData() && (
            <Button onClick={handleDownload} label="Export To Excel" />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchIssuedBooks;
