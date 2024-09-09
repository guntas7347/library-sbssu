import { useContext, useEffect, useState } from "react";
import {
  downloadAllIssuedBooks,
  fetchAllIssuedBooks,
} from "../../../hooks/http-requests.hooks.admin";
import CustomTable from "../../../../../components/table/custom-table.component";
import {
  processData,
  sortObjectUsingKeys,
} from "../../../../../utils/functions";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Pagination from "../../../../../components/pagination/pagination";
import useQueryParams from "../../../../../components/hooks/useQueryParams.hook";

const SearchIssuedBooks = () => {
  const { queryString } = useQueryParams();
  const navigate = useNavigate();
  const { setFeedback } = useContext(SnackBarContext);

  const [totalPages, setTotalPages] = useState(1);

  const [rowData, setRowData] = useState([]);

  const handleFetch = async () => {
    await fetchAllIssuedBooks(queryString)
      .then((res) => {
        setTotalPages(res.totalPages);
        setRowData(
          processData(res.issuedBooksArray, [
            "_id",
            "accessionNumber",
            "bookTitle",
            "cardNumber",
            "issueDate",
            "rollNumber",
            "studentName",
          ])
        );
        if (res.length === 0) setFeedback([1, 2, "No data found"]);
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const handleDownload = async () => {
    await downloadAllIssuedBooks()
      .then((res) => setFeedback([1, 1, res]))
      .catch((err) => setFeedback([1, 2, err]));
  };

  const tableHasData = () => {
    if (rowData.length === 0) return false;
    return true;
  };

  useEffect(() => {
    handleFetch();
  }, [queryString]);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">
        Search Issued Books
      </h1>
      <div>
        <div className="flex gap-10 justify-between my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Search All Issued Books",
                value: "fetchAllIssuedBooks",
              },
              {
                name: "Accession Number",
                value: "accessionNumber",
              },
              {
                name: "Library Card Number",
                value: "cardNumber",
              },
              {
                name: "Current Month",
                value: "currentMonth",
              },
              {
                name: "Date Range",
                value: "dateRange",
              },
            ]}
          />
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
          handleRowClick={(e) => navigate(`view-book/${e}`)}
        />
        <div className="mt-5 flex flex-row gap-10 justify-center items-center">
          {tableHasData() && (
            <button className="my-button" onClick={handleDownload}>
              Export To Excel
            </button>
          )}
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default SearchIssuedBooks;
