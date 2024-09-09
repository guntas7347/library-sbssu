import SearchQueriesComponent from "../../../../../components/forms/search-query/search-query.component";
import { useContext, useEffect, useState } from "react";
import CustomTable from "../../../../../components/table/custom-table.component";
import { fetchAllFines } from "../../../hooks/http-requests.hooks.admin";
import { processData } from "../../../../../utils/functions";
import { useNavigate } from "react-router-dom";
import useQueryParams from "../../../../../components/hooks/useQueryParams.hook";
import { SnackBarContext } from "../../../../../components/context/snackbar.context";
import Pagination from "../../../../../components/pagination/pagination";

const SearchFinesPage = () => {
  const navigate = useNavigate();
  const { queryString } = useQueryParams();

  const { setFeedback } = useContext(SnackBarContext);
  const [totalPages, setTotalPages] = useState(1);

  const [rowData, setRowData] = useState([]);

  const handleFetch = async () => {
    await fetchAllFines(queryString)
      .then((res) => {
        if (res.length === 0) {
          setFeedback([1, 2, "No Data Found"]);
          return;
        }
        setRowData(
          processData(res, [
            "_id",
            "createdAt",
            "rollNumber",
            "fullName",
            "recieptNumber",
            "category",
            "amount",
          ])
        );
      })
      .catch((err) => setFeedback([1, 2, err]));
  };

  useEffect(() => {
    handleFetch();
  }, [queryString]);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-2">Search Fines</h1>
      <div className="flex  justify-between my-5 bg-white p-5 rounded-3xl">
        <SearchQueriesComponent
          selectFields={[
            {
              name: "Search All Fines",
              value: "fetchAllFines",
            },
          ]}
        />
      </div>
      <div className="">
        <CustomTable
          columns={[
            "Date",
            "Roll Number",
            "Student Name",
            "Reciept Number",
            "Category",
            "Amount",
          ]}
          rows={rowData}
          handleRowClick={(e) => navigate(e)}
        />
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default SearchFinesPage;
