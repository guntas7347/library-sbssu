import { fetchAllBooks } from "../../hooks/http-requests.hooks.admin";
import { useState } from "react";
import { processDataForBooks } from "../../../../utils/functions";
import { useFeedback } from "../../../../components/context/snackbar.context";
import Table from "../../../../components/table/button-table";
import BookModal from "./view-book.modal";
import SearchBarMenu from "../../../../components/forms/search-bar-menu";
import AddBookModal from "./add-book.modal";
import AddAccessionModal from "./add-accession.modal";
import BookButtonSVG from "../../../../components/buttons/svg-buttons/book-svg.button";
import AccessionButtonSVG from "../../../../components/buttons/svg-buttons/accession-svg.button";

const SearchBooksPage = () => {
  const setFeedback = useFeedback();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState(["", ""]);

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
      .catch((error) => {
        setFeedback([1, 2, error]);
      });
  };

  return (
    <>
      <div>
        <div>
          <div className="px-10">
            <h1 className="text-3xl font-semibold my-5">Books</h1>
            <div className="c-box">
              <div class="flex justify-center items-center ">
                <div className="basis-1/3" />
                <div className="basis-1/3">
                  <SearchBarMenu
                    onSearch={(e) => {
                      handleFetch(e);
                    }}
                    menuOptions={["Accession Number", "Title"]}
                  />
                </div>
                <div className="basis-1/3 flex">
                  <div className="ml-auto flex">
                    <AccessionButtonSVG
                      onClick={() => setModal(["Add Accession", ""])}
                    />
                    <BookButtonSVG onClick={() => setModal(["Add Book", ""])} />
                  </div>
                </div>
              </div>
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
                  onClick={(a, e) => setModal([a, e])}
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
            {modal[0] === "View" && (
              <BookModal id={modal[1]} onClose={() => setModal(["", ""])} />
            )}
            {modal[0] === "Add Book" && (
              <AddBookModal onClose={() => setModal(["", ""])} />
            )}
            {modal[0] === "Add Accession" && (
              <AddAccessionModal onClose={() => setModal(["", ""])} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBooksPage;
