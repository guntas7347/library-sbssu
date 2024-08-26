import { useContext, useState } from "react";
import {
  downloadAllIssuedBooks,
  fetchAllIssuedBooks,
} from "../../../hooks/http-requests.hooks.staff";
import CustomTable from "../../../../../components/table/custom-table.component";
import { sortObjectUsingKeys } from "../../../../../utils/functions";
import { useForm } from "../../../../../components/forms/use-form-hook/use-form.hook.component";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";

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
    navigate(`/dashboard/staff/issue-books/search-issued-books/view-book/${e}`);
  };

  const tableHasData = () => {
    if (rowData.length === 0) return false;
    return true;
  };

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">
        Search Issued Books
      </h1>
      <div>
        <div className="grid grid-cols-4 gap-10 my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            className="col-span-3"
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
          <div className="col-span-1 flex flex-row justify-center items-center">
            <button className="my-button " onClick={handleFetch}>
              Submit
            </button>
          </div>
        </div>
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
        <div className="mt-5 flex flex-row justify-center items-center">
          {tableHasData() && (
            <button className="my-button" onClick={handleDownload}>
              Export To Excel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchIssuedBooks;
