import { fetchAllBooks } from "../../hooks/http-requests.hooks.admin";
import { useContext, useState } from "react";
import { processDataForBooks } from "../../../../utils/functions";
import { SnackBarContext } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import BookModal from "./view-book/view-book.page.admin";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";

const SearchBooksPage = () => {
  const { setFeedback } = useContext(SnackBarContext);

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");

  const [currentFilter, setCurrentFilter] = useState({});

  const [rowData, setRowData] = useState([]);

  const handleFetch = async (e) => {
    setCurrentFilter({ ...currentFilter, ...e });

    await fetchAllBooks({ ...currentFilter, ...e })
      .then((res) => {
        if (res.booksArray.length === 0) {
          setFeedback([1, 2, "No Data Found"]);
          setRowData([]);
          return;
        }

        setTotalPages(res.totalPages);
        setRowData(
          processDataForBooks(res.booksArray, [
            "_id",
            "accessionNumber",
            "title",
            "author",
            "placeAndPublishers",
            "publicationYear",
          ])
        );
      })
      .catch((err) => {
        setFeedback([1, 2, err]);
      });
  };

  return (
    <>
      <div>
        <div>
          <div className="px-10">
            <h1 className="text-3xl font-semibold my-5">Books</h1>
            <div className="c-box">
              <SearchBarMenu
                onSearch={(e) => {
                  handleFetch(e);
                }}
                menuOptions={["Accession Number", "Title"]}
              />
              <div className="my-5">
                <Table
                  cols={[
                    "Accession Number",
                    "Title",
                    "Author",
                    "Place And Publishers",
                    "Publication Year",
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
            </div>
            {modal !== "" ? (
              <BookModal id={modal} onClose={() => setModal("")} />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBooksPage;
