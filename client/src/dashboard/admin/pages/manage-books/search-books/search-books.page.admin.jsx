import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllBooks } from "../../../hooks/http-requests.hooks.admin";
import { useContext, useEffect, useState } from "react";
import { processDataForBooks } from "../../../../../utils/functions";
import { useNavigate } from "react-router-dom";
import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Pagination from "../../../../../components/pagination/pagination";
import useQueryParams from "../../../../../components/hooks/useQueryParams.hook";

const SearchBooksPage = () => {
  const navigate = useNavigate();
  const { queryString } = useQueryParams();
  const { setFeedback } = useContext(SnackBarContext);

  const [totalPages, setTotalPages] = useState(1);

  const [rowData, setRowData] = useState([]);

  const handleFetch = async () => {
    await fetchAllBooks(queryString)
      .then((res) => {
        if (res.booksArray.length === 0) {
          setFeedback([1, 2, "No Data Found"]);
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

  useEffect(() => {
    handleFetch();
  }, [queryString]);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Search Books</h1>
      <div>
        <div className="flex  justify-between my-5 bg-white p-5 rounded-3xl">
          <SearchQueriesComponent
            selectFields={[
              {
                name: "Search All Books",
                value: "fetchAllBooks",
              },
              {
                name: "Accession Number",
                value: "accessionNumber",
              },
            ]}
          />
        </div>
        <div className="">
          <CustomTable
            columns={[
              "Accession Number",
              "Title",
              "Author",
              "Place And Publishers",
              "Publication Year",
            ]}
            rows={rowData}
            handleRowClick={(e) => navigate(e)}
          />
        </div>
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default SearchBooksPage;
