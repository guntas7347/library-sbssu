import { useState } from "react";
import {
  downloadAllIssuedBooks,
  fetchAllIssuedBooks,
} from "../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../utils/functions";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import IssuedBookModal from "./issued-book-modal";

const SearchIssuedBooks = () => {
  const setFeedback = useFeedback();
  const [rowData, setRowData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState("");
  const [currentFilter, setCurrentFilter] = useState({});

  const handleFetch = async (e) => {
    setCurrentFilter({ ...currentFilter, ...e });

    await fetchAllIssuedBooks({ ...currentFilter, ...e })
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
      .catch((error) => setFeedback([1, 2, error]));
  };

  const handleDownload = async () => {
    await downloadAllIssuedBooks(currentFilter)
      .then((res) => setFeedback([1, 1, res]))
      .catch((error) => setFeedback([1, 2, error]));
  };

  const tableHasData = () => {
    if (rowData.length === 0) return false;
    return true;
  };

  return (
    <>
      <div>
        <div>
          <div className="px-10">
            <h1 className="text-3xl font-semibold my-5">Issued Books</h1>
            <div className="c-box">
              <SearchBarMenu
                onSearch={(e) => {
                  handleFetch(e);
                }}
                menuOptions={[
                  "Accession Number",
                  "Current Month",
                  "Date Range",
                  "Library Card Number",
                ]}
              />
              <div className="my-5">
                <Table
                  cols={[
                    "Accession Number",
                    "Book Title",
                    "Card Number",
                    "Issue Date",
                    "Student Roll Number",
                    "Student Name",
                    "Action",
                  ]}
                  rows={rowData}
                  onClick={(a, e) => setModal(e)}
                  actions={["View"]}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setPage={(e) => {
                    setCurrentPage(e);
                    handleFetch({ page: e });
                  }}
                />
              </div>
              {tableHasData() && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="py-2 px-3 inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <svg
                    className="w-3 h-3 me-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
                    <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
                  </svg>
                  Download
                </button>
              )}
            </div>
            {modal !== "" ? (
              <IssuedBookModal id={modal} onClose={() => setModal("")} />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchIssuedBooks;
