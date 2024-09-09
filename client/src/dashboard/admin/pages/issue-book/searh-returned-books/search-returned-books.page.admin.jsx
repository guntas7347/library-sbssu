import { useContext, useEffect, useState } from "react";
import {
  downloadAllReturnedBooks,
  fetchAllReturnedBooks,
} from "../../../hooks/http-requests.hooks.admin";
import CustomTable from "../../../../../components/table/custom-table.component";
import { processData } from "../../../../../utils/functions";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import useQueryParams from "../../../../../components/hooks/useQueryParams.hook";
import Pagination from "../../../../../components/pagination/pagination";

const SearchReturnedBooks = () => {
  const navigate = useNavigate();

  const { queryString } = useQueryParams();
  const { setFeedback } = useContext(SnackBarContext);

  const [rowData, setRowData] = useState([]);

  const [totalPages, setTotalPages] = useState(1);

  const handleFetch = async () => {
    await fetchAllReturnedBooks(queryString)
      .then((res) => {
        setTotalPages(res.totalPages);
        setRowData(
          processData(res.returnedBooksArray, [
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
        if (res.length === 0) {
          setFeedback([1, 2, "No data found"]);
        }
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  const handleDownload = async () => {
    await downloadAllReturnedBooks(queryString)
      .then((res) => {
        setFeedback([1, 1, res]);
      })
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
    <>
      <div>
        <h1 className="text-center font-bold text-3xl my-2">
          Search Returned Books
        </h1>
        <div>
          <div className="flex gap-10 justify-between my-5 bg-white p-5 rounded-3xl">
            <SearchQueriesComponent
              selectFields={[
                {
                  name: "Search All Returned Books",
                  value: "fetchAllReturnedBooks",
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
              "Return Date",
              "Student Roll Number",
              "Student Name",
              "Fine",
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
    </>
  );
};

export default SearchReturnedBooks;
